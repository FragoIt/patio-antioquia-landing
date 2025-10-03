// CommonJS fallback LQIP generator (no TypeScript runtime needed)
// Run with: npm run lqip
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT, 'src');
const ASSETS_DIR = path.join(SRC_DIR, 'assets');
const MANIFEST_PATH = path.join(SRC_DIR, 'lib', 'asset-manifest.ts');
const OUTPUT_PATH = path.join(SRC_DIR, 'lib', 'lqip-map.json');
const CACHE_PATH = path.join(SRC_DIR, 'lib', '.lqip-cache.json');
const META_PATH = path.join(SRC_DIR, 'lib', 'image-metrics.json');

function loadCache() {
  try { return JSON.parse(fs.readFileSync(CACHE_PATH, 'utf-8')); } catch { return {}; }
}
function saveCache(c) { fs.writeFileSync(CACHE_PATH, JSON.stringify(c, null, 2)); }
function fileHash(abs) {
  const stat = fs.statSync(abs);
  const h = crypto.createHash('sha1');
  h.update(String(stat.mtimeMs));
  h.update(String(stat.size));
  return h.digest('hex').slice(0, 16);
}

const manifestContent = fs.readFileSync(MANIFEST_PATH, 'utf-8');
const importRegex = /import\s+(\w+)\s+from\s+['"]@\/assets\/(.+?)['"];?/g;
const varToFile = {};
let match;
while ((match = importRegex.exec(manifestContent))) { varToFile[match[1]] = match[2]; }

const imageArrayMatch = manifestContent.match(/export const imageAssets: ImageAsset\[] = \[(.|\n)*?];/);
if (!imageArrayMatch) {
  console.error('Could not locate imageAssets array in manifest.');
  process.exit(1);
}
const imageArrayContent = imageArrayMatch[0];
const entryRegex = /{[^}]*id:\s*'([^']+)'[^}]*src:\s*(\w+)[^}]*}/g;
const entries = [];
while ((match = entryRegex.exec(imageArrayContent))) entries.push({ id: match[1], varName: match[2] });

(async () => {
  const cache = loadCache();
  const result = {};
  const metrics = {};
  for (const { id, varName } of entries) {
    const rel = varToFile[varName];
    if (!rel) continue;
    const abs = path.join(ASSETS_DIR, rel);
    if (!fs.existsSync(abs)) { console.warn('Missing file', id); continue; }
    const h = fileHash(abs);
    const cached = cache[id];
    if (cached && cached.hash === h) {
      result[id] = cached.lqip;
      metrics[id] = { width: cached.width, height: cached.height };
      console.log('Cached', id);
      continue;
    }
    try {
      const base = sharp(abs);
      const meta = await base.metadata();
      const tiny = base.resize({ width: 24 }).blur();
      let dataUrl;
      try {
        const avifBuf = await tiny.avif({ quality: 30, effort: 0 }).toBuffer();
        dataUrl = `data:image/avif;base64,${avifBuf.toString('base64')}`;
      } catch {
        const jpgBuf = await tiny.jpeg({ quality: 40 }).toBuffer();
        dataUrl = `data:image/jpeg;base64,${jpgBuf.toString('base64')}`;
      }
      result[id] = dataUrl;
      metrics[id] = { width: meta.width || 0, height: meta.height || 0 };
      cache[id] = { hash: h, lqip: dataUrl, width: meta.width || 0, height: meta.height || 0 };
      console.log('Generated', id);
    } catch (e) {
      console.error('Error generating', id, e.message);
    }
  }
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(result, null, 2));
  fs.writeFileSync(META_PATH, JSON.stringify(metrics, null, 2));
  saveCache(cache);
  console.log('Done. LQIP:', OUTPUT_PATH);
})();