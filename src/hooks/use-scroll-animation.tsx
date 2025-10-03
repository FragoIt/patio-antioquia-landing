import { useEffect, useState, useRef } from 'react';
import { animationConfig, prefersReducedMotion, performanceUtils } from '@/lib/animation-config';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  const {
    threshold = animationConfig.scrollReveal.threshold,
    rootMargin = animationConfig.scrollReveal.rootMargin,
    triggerOnce = animationConfig.scrollReveal.triggerOnce
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Check if user prefers reduced motion
    if (prefersReducedMotion()) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            setHasAnimated(true);
          }
        } else if (!triggerOnce && !hasAnimated) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce, hasAnimated]);

  return { ref: elementRef, isVisible };
};

export const useStaggeredScrollAnimation = (itemCount: number, staggerDelay: number = animationConfig.stagger.normal) => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check if user prefers reduced motion
    if (prefersReducedMotion()) {
      setVisibleItems(Array.from({ length: itemCount }, (_, i) => i));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Animate items with stagger effect
          Array.from({ length: itemCount }, (_, i) => i).forEach((index) => {
            setTimeout(() => {
              setVisibleItems(prev => [...new Set([...prev, index])]);
            }, index * staggerDelay * 1000);
          });
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(container);

    return () => {
      observer.unobserve(container);
    };
  }, [itemCount, staggerDelay]);

  return { ref: containerRef, visibleItems };
};