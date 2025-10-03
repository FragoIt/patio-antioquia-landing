import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface AutoPlayVideoProps {
  src: string;
  poster?: string;
  className?: string;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  autoPlay?: boolean; // default true (managed via IntersectionObserver)
  ariaLabel?: string;
  fallbackImage?: string; // if connection is poor or motion reduced
  showControlsOnHover?: boolean;
  overlayGradient?: boolean;
}

const connectionOK = () => {
  // Basic heuristic: allow playback unless extremely slow connection
  const nav: any = navigator;
  if (nav?.connection?.effectiveType) {
    return !['slow-2g', '2g'].includes(nav.connection.effectiveType);
  }
  return true;
};

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const AutoPlayVideo = ({
  src,
  poster,
  className,
  loop = true,
  muted = true,
  playsInline = true,
  autoPlay = true,
  ariaLabel = 'Video ambiente',
  fallbackImage,
  showControlsOnHover = false,
  overlayGradient = true,
}: AutoPlayVideoProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [canPlay, setCanPlay] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion() || !connectionOK()) {
      setCanPlay(false);
      return;
    }
    setCanPlay(true);
  }, []);

  useEffect(() => {
    if (!autoPlay || !videoRef.current) return;
    const el = videoRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [autoPlay]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (isVisible && canPlay) {
      const playPromise = el.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {/* ignore autoplay block */});
      }
    } else {
      el.pause();
    }
  }, [isVisible, canPlay]);

  if (!canPlay && fallbackImage) {
    return (
      <div className={cn('relative overflow-hidden', className)} aria-label={ariaLabel} role="img">
        <img
          src={fallbackImage}
          alt={ariaLabel}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
        {overlayGradient && <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/50 pointer-events-none" />}
      </div>
    );
  }

  return (
    <div
      className={cn('relative group overflow-hidden', className)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        // Controls only when explicitly requested or on hover
        controls={showControlsOnHover && hover}
        aria-label={ariaLabel}
        className={cn('w-full h-full object-cover transition-opacity duration-700', !isVisible && 'opacity-70')}
        preload="metadata"
      />
      {overlayGradient && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/50" />
      )}
      {/* Accessibility fallback note (visually hidden) */}
      <span className="sr-only">Video de ambiente reproducido automáticamente cuando es visible.</span>
    </div>
  );
};

export default AutoPlayVideo;
