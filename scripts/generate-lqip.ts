/*
  LQIP Generator Script
  ---------------------
  Usage: ts-node scripts/generate-lqip.ts (or add an npm script)
  - Scans imageAssets import list (static) by reading asset-manifest file.
  - Generates tiny blurred base64 previews (default width=24px) using sharp.
  - Outputs JSON map at src/lib/lqip-map.json { [id]: dataUrl }.
  Notes:
  - Requires: npm i -D sharp
  - Re-run when adding new images.
*/

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import crypto from 'crypto';

const ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT, 'src');
const ASSETS_DIR = path.join(SRC_DIR, 'assets');
const MANIFEST_PATH = path.join(SRC_DIR, 'lib', 'asset-manifest.ts');
const OUTPUT_PATH = path.join(SRC_DIR, 'lib', 'lqip-map.json');
const CACHE_PATH = path.join(SRC_DIR, 'lib', '.lqip-cache.json');
const META_PATH = path.join(SRC_DIR, 'lib', 'image-metrics.json');

interface CacheEntry {
  hash: string; // hash of file stats (mtime+size) or content
  lqip: string;
  width: number;
  height: number;
}

type CacheMap = Record<string, CacheEntry>;

const loadCache = (): CacheMap => {
  try {
    return JSON.parse(fs.readFileSync(CACHE_PATH, 'utf-8')) as CacheMap;
  } catch {
    return {};
  }
};

const saveCache = (cache: CacheMap) => {
  fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2));
};

const fileHash = (abs: string) => {
  const stat = fs.statSync(abs);
  const h = crypto.createHash('sha1');
  h.update(String(stat.mtimeMs));
  h.update(String(stat.size));
  return h.digest('hex').slice(0, 16);
};

// Very lightweight parser: find lines like import IDENT from '@/assets/file.jpg'
const manifestContent = fs.readFileSync(MANIFEST_PATH, 'utf-8');

// Extract mapping from variable name to relative asset filepath
const importRegex = /import\s+(\w+)\s+from\s+['"]@\/assets\/(.+?)['"];?/g;
const varToFile: Record<string, string> = {};
let match: RegExpExecArray | null;
while ((match = importRegex.exec(manifestContent))) {
  varToFile[match[1]] = match[2];
}

// Extract imageAssets array block and parse id->src variable references
const imageArrayMatch = manifestContent.match(/export const imageAssets: ImageAsset\[] = \[(.|\n)*?];/);
if (!imageArrayMatch) {
  console.error('Could not locate imageAssets array in manifest.');
  process.exit(1);
}

const imageArrayContent = imageArrayMatch[0];
// Find objects with src: VAR_NAME
const entryRegex = /{[^}]*id:\s*'([^']+)'[^}]*src:\s*(\w+)[^}]*}/g;
interface EntryRef { id: string; varName: string }
const entries: EntryRef[] = [];
while ((match = entryRegex.exec(imageArrayContent))) {
  entries.push({ id: match[1], varName: match[2] });
}

(async () => {
  const cache = loadCache();
  const result: Record<string, string> = {};
  const metrics: Record<string, { width: number; height: number }> = {};

  for (const { id, varName } of entries) {
    const rel = varToFile[varName];
    if (!rel) continue; // skip non-file refs
    const abs = path.join(ASSETS_DIR, rel);
    if (!fs.existsSync(abs)) {
      console.warn('File missing for', id, abs);
      continue;
    }
    const h = fileHash(abs);
    const cached = cache[id];
    if (cached && cached.hash === h) {
      result[id] = cached.lqip;
      metrics[id] = { width: cached.width, height: cached.height };
      console.log('Cached LQIP for', id);
      continue;
    }
    try {
      const base = sharp(abs);
      const meta = await base.metadata();
      const img = base.resize({ width: 24 }).blur();
      let data: Buffer;
      let dataUrl: string;
      try {
        data = await img.avif({ quality: 30, effort: 0 }).toBuffer();
        dataUrl = `data:image/avif;base64,${data.toString('base64')}`;
      } catch {
        const jpeg = await img.jpeg({ quality: 40 }).toBuffer();
        dataUrl = `data:image/jpeg;base64,${jpeg.toString('base64')}`;
      }
      result[id] = dataUrl;
      metrics[id] = { width: meta.width || 0, height: meta.height || 0 };
      cache[id] = {
        hash: h,
        lqip: dataUrl,
        width: meta.width || 0,
        height: meta.height || 0,
      };
      console.log('Generated LQIP for', id);
    } catch (e) {
      console.error('Failed LQIP for', id, e);
    }
  }
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(result, null, 2));
  fs.writeFileSync(META_PATH, JSON.stringify(metrics, null, 2));
  saveCache(cache);
  console.log('LQIP map written to', OUTPUT_PATH);
  console.log('Image metrics written to', META_PATH);
})();
