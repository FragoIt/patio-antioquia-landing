import { useEffect, useState, useRef } from 'react';
import { prefersReducedMotion, performanceUtils } from '@/lib/animation-config';

interface UseParallaxOptions {
  speed?: number;
  enableOnMobile?: boolean;
}

export const useParallax = (options: UseParallaxOptions = {}) => {
  const [offset, setOffset] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);

  const {
    speed = 0.5,
    enableOnMobile = false
  } = options;

  useEffect(() => {
    // Check if user prefers reduced motion
    if (prefersReducedMotion()) return;

    // Disable on mobile devices unless explicitly enabled
    const isMobile = performanceUtils.isMobile();
    if (isMobile && !enableOnMobile) return;

    const handleScroll = () => {
      const element = elementRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      const rate = scrolled * speed;

      // Only apply parallax when element is in viewport
      if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
        setOffset(rate);
      }
    };

    // Throttle scroll events for better performance using requestAnimationFrame
    const optimizedHandleScroll = performanceUtils.throttle(handleScroll, 16); // ~60fps

    window.addEventListener('scroll', optimizedHandleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', optimizedHandleScroll);
    };
  }, [speed, enableOnMobile]);

  return { ref: elementRef, offset };
};