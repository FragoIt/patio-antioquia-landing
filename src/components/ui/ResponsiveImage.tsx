import { useState } from 'react';
import { cn } from '@/lib/utils';
import { getAssetById, ImageAsset } from '@/lib/asset-manifest';

interface ResponsiveImageProps {
  asset: string | ImageAsset;
  className?: string;
  priority?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  rounded?: boolean;
}

export const ResponsiveImage = ({
  asset,
  className,
  priority = false,
  objectFit = 'cover',
  rounded = true,
}: ResponsiveImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const data = typeof asset === 'string' ? getAssetById(asset) : asset;

  if (!data) return null;

  const { src, alt, aspectRatio, lqip, width, height } = data;

  return (
    <div
      className={cn('relative overflow-hidden group bg-neutral-200/30 dark:bg-neutral-800/30', rounded && 'rounded-lg', className)}
      style={aspectRatio ? { aspectRatio: `${aspectRatio}` } : undefined}
    >
      {lqip && (
        <div
          className={cn(
            'absolute inset-0 transition-opacity duration-500 ease-out',
            loaded ? 'opacity-0' : 'opacity-100'
          )}
          style={{
            backgroundImage: `url(${lqip})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(12px) saturate(1.1)',
            transform: 'scale(1.05)'
          }}
          aria-hidden
        />
      )}
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        // Note: fetchPriority may not yet be recognized in older TS DOM libs.
        // @ts-ignore
        fetchPriority={priority ? 'high' : undefined}
        onLoad={() => setLoaded(true)}
        width={width}
        height={height}
        className={cn(
          'w-full h-full transition-all duration-700',
          objectFit === 'cover' && 'object-cover',
          objectFit === 'contain' && 'object-contain',
          !loaded && 'scale-105 blur-sm',
          loaded && 'blur-0 scale-100'
        )}
      />
      {/* Optional overlay for hover subtle effect */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-10 bg-black transition-opacity" />
    </div>
  );
};

export default ResponsiveImage;
