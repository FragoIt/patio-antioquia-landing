// Central manifest for media assets (Phase 1 minimal version)
// Later can be extended with variants (avif/webp) and lqip.

import heroBackground from '@/assets/hero-background.jpg';
import lqipMap from './lqip-map.json';
import imageMetrics from './image-metrics.json';
// Video & poster media (Phase 2 extension)
import videoPoster1 from '@/assets/reelsvideo.io_1759436709690.jpeg';
import videoPoster2 from '@/assets/reelsvideo.io_1759436750657.jpeg';
import ambientVideo1 from '@/assets/reelsvideo.io_1759436726509.mp4';
import ambientVideo2 from '@/assets/reelsvideo.io_1759436745121.mp4';
import ambientVideo3 from '@/assets/reelsvideo.io_1759436764905.mp4';
import CR1 from '@/assets/Carta-Restaurante_1.jpg';
import CR2 from '@/assets/Carta-Restaurante_2.jpg';
import CR3 from '@/assets/Carta-Restaurante_3.jpg';
import CR5 from '@/assets/Carta-Restaurante_5.jpg';
import CR10 from '@/assets/Carta-Restaurante_10.jpg';
import CR12 from '@/assets/Carta-Restaurante_12.jpg';
import CR15 from '@/assets/Carta-Restaurante_15.jpg';
import CR17 from '@/assets/Carta-Restaurante_17.jpg';
import CR21 from '@/assets/Carta-Restaurante_21.jpg';
import CR31 from '@/assets/Carta-Restaurante_31.jpg';
import CR32 from '@/assets/Carta-Restaurante_32.jpg';
import CR33 from '@/assets/Carta-Restaurante_33.jpg';
import CR35 from '@/assets/Carta-Restaurante_35.jpg';
import CR7 from '@/assets/Carta-Restaurante_7.jpg';
import P1 from '@/assets/Portafolio_1.jpg';
import P2 from '@/assets/Portafolio_2.jpg';
import P3 from '@/assets/Portafolio_3.jpg';
import P4 from '@/assets/Portafolio_4.jpg';
import P5 from '@/assets/Portafolio_5.jpg';
import P6 from '@/assets/Portafolio_6.jpg';
import P9 from '@/assets/Portafolio_9.jpg';
import P10 from '@/assets/Portafolio_10.jpg';
import P11 from '@/assets/Portafolio_11.jpg';
import P12 from '@/assets/Portafolio_12.jpg';

export type AssetCategory =
  | 'hero'
  | 'plato'
  | 'ambiente'
  | 'bebida'
  | 'proceso'
  | 'experiencia'
  | 'decorativo';

export interface ImageAsset {
  id: string;
  category: AssetCategory;
  src: string;
  alt: string;
  priority?: boolean;
  aspectRatio?: number; // width / height
  tags?: string[];
  // low-quality placeholder (data URL) injected post-build by lqip-map
  lqip?: string;
  width?: number;
  height?: number;
}

export interface VideoAsset {
  id: string;
  /** Category maps to storytelling position (we reuse 'experiencia' for now) */
  category: AssetCategory;
  /** mp4 source (H.264) – future: extend with webm/av1 variants */
  src: string;
  /** Poster image displayed before play / as fallback */
  poster?: string;
  /** Accessible label (maps to aria-label) */
  alt: string;
  /** If true we might prioritize loading (rare – keep false by default) */
  priority?: boolean;
  /** Loop ambient video (default true in component) */
  loop?: boolean;
  /** Additional descriptive tags */
  tags?: string[];
}

export const imageAssets: ImageAsset[] = [
  
  {
    id: 'hero-primary',
    category: 'hero',
    src: P11,
    alt: 'Ambiente nocturno elegante con iluminación dramática y atmósfera íntima',
    tags: ['nocturno', 'elegante', 'atmosférico', 'premium'],
    priority: true,
  },
  // Platos principales (destacados iniciales)
  {
    id: 'plato-1',
    category: 'plato',
    src: CR10,
    alt: 'Parrilla mixta con cortes selectos y guarniciones tradicionales',
    aspectRatio: 4 / 5,
  },
  {
    id: 'plato-2',
    category: 'plato',
    src: CR2,
    alt: 'Arepas artesanales acompañadas de guarniciones frescas',
    aspectRatio: 4 / 5,
  },
  {
    id: 'plato-3',
    category: 'plato',
    src: CR12,
    alt: 'Filete de pescado a la plancha con camarones y salsa',
    aspectRatio: 4 / 5,
  },
  {
    id: 'plato-4',
    category: 'plato',
    src: CR5,
    alt: 'Selección de entradas sobre tabla rústica de madera',
    aspectRatio: 4 / 5,
  },
  // Extensión “ver más”
  { id: 'plato-5', category: 'plato', src: CR10, alt: 'Plato tradicional con acentos contemporáneos', aspectRatio: 4 / 5 },
  { id: 'plato-6', category: 'plato', src: CR12, alt: 'Presentación elegante de cocina local', aspectRatio: 4 / 5 },
  { id: 'plato-7', category: 'plato', src: CR15, alt: 'Ensalada fresca con vegetales verdes y aderezo ligero', aspectRatio: 4 / 5 },
  { id: 'plato-8', category: 'plato', src: CR17, alt: 'Preparación vegetal saludable y colorida', aspectRatio: 4 / 5 },

  // Ambiente / experiencia
  { id: 'ambiente-1', category: 'ambiente', src: P2, alt: 'Comensales compartiendo mesa larga en interior cálido', aspectRatio: 3 / 2 },
  { id: 'ambiente-2', category: 'ambiente', src: P9, alt: 'Grupo social disfrutando al anochecer en terraza', aspectRatio: 3 / 2 },
  { id: 'ambiente-3', category: 'ambiente', src: P12, alt: 'Vista general del espacio gastronómico con movimiento', aspectRatio: 3 / 2 },

  // Coctelería / bebidas
  { id: 'bebida-1', category: 'bebida', src: P4, alt: 'Coctel artesanal cítrico sobre barra iluminada', aspectRatio: 4 / 5 },
  { id: 'bebida-2', category: 'bebida', src: P6, alt: 'Coctel con garnish fresco preparado en barra', aspectRatio: 4 / 5 },
  { id: 'bebida-3', category: 'bebida', src: CR7, alt: 'Coctel rojo intenso con romero aromático', aspectRatio: 4 / 5 },

  // Fondo testimonios (ambiente suave)
  { id: 'ambiente-blur-base', category: 'ambiente', src: P5, alt: 'Fondo difuminado de interior cálido', aspectRatio: 16 / 9 },

  // Proceso / cocina (potencial sección futura)
  { id: 'proceso-1', category: 'proceso', src: CR31, alt: 'Proceso culinario mostrando preparación artesanal', aspectRatio: 4 / 5 },
  { id: 'proceso-2', category: 'proceso', src: CR32, alt: 'Detalle de cocción en cocina profesional', aspectRatio: 4 / 5 },
  { id: 'proceso-3', category: 'proceso', src: CR33, alt: 'Chef trabajando una preparación en avance', aspectRatio: 4 / 5 },
  { id: 'proceso-4', category: 'proceso', src: CR35, alt: 'Manos emplatando con precisión final', aspectRatio: 4 / 5 },

  // Extra / variantes hero potenciales
  { id: 'hero-alt-1', category: 'hero', src: P10, alt: 'Vista del espacio lista para evento especial', aspectRatio: 16 / 9, tags: ['evento','disposición'] },
  { id: 'hero-alt-2', category: 'hero', src: P11, alt: 'Ambiente nocturno elegante iluminado', aspectRatio: 16 / 9, tags: ['nocturno','luces'] },
  { id: 'decor-faq', category: 'decorativo', src: CR21, alt: 'Elemento decorativo gastronómico', aspectRatio: 3 / 4 },
  { id: 'textura-suave', category: 'decorativo', src: P3, alt: 'Textura cálida sutil', aspectRatio: 3 / 2 },
];

// Merge lqip placeholders if available
if (lqipMap) {
  imageAssets.forEach(img => {
    const anyMap: Record<string, string> = lqipMap as any;
    if (anyMap[img.id]) {
      img.lqip = anyMap[img.id];
    }
  });
}

if (imageMetrics) {
  imageAssets.forEach(img => {
    const anyMetrics: Record<string, { width: number; height: number }> = imageMetrics as any;
    if (anyMetrics[img.id]) {
      img.width = anyMetrics[img.id].width;
      img.height = anyMetrics[img.id].height;
      if (!img.aspectRatio && img.width && img.height) {
        img.aspectRatio = img.width / img.height;
      }
    }
  });
}

// Ambient / experience looping videos (initial minimal set)
export const videoAssets: VideoAsset[] = [
  {
    id: 'exp-video-1',
    category: 'experiencia',
    src: ambientVideo1,
    poster: videoPoster1,
    alt: 'Ambiente animado de clientes disfrutando en el patio',
    tags: ['ambiente', 'social', 'loop'],
  },
  {
    id: 'exp-video-2',
    category: 'experiencia',
    src: ambientVideo2,
    poster: videoPoster2,
    alt: 'Detalle cercano de coctelería y manos preparando bebida',
    tags: ['coctel', 'detalle', 'loop'],
  },
  {
    id: 'exp-video-3',
    category: 'experiencia',
    src: ambientVideo3,
    poster: videoPoster1, // reuse first poster until a third poster is provided
    alt: 'Ambiente general con movimiento de luces y comensales',
    tags: ['ambiente', 'general', 'loop'],
  },
];

export const getAssetsByCategory = (category: AssetCategory) =>
  imageAssets.filter(a => a.category === category);

export const getAssetById = (id: string) => imageAssets.find(a => a.id === id);

export const getVideoAssets = (category?: AssetCategory) =>
  category ? videoAssets.filter(v => v.category === category) : videoAssets;

export const getVideoAssetById = (id: string) => videoAssets.find(v => v.id === id);
