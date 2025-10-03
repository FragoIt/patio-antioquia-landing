import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation, useStaggeredScrollAnimation } from '@/hooks/use-scroll-animation';
import { cn } from '@/lib/utils';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  delay?: number;
  duration?: number;
  threshold?: number;
  triggerOnce?: boolean;
}

export const ScrollReveal = ({
  children,
  className,
  direction = 'up',
  distance = 50,
  delay = 0,
  duration = 0.8,
  threshold = 0.1,
  triggerOnce = true,
}: ScrollRevealProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold, triggerOnce });

  const directionOffset = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        ...directionOffset[direction],
      }}
      animate={isVisible ? {
        opacity: 1,
        x: 0,
        y: 0,
      } : {
        opacity: 0,
        ...directionOffset[direction],
      }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.25, 0.25, 0.75],
      }}
    >
      {children}
    </motion.div>
  );
};

interface StaggeredScrollRevealProps {
  children: ReactNode[];
  className?: string;
  itemClassName?: string;
  staggerDelay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  duration?: number;
}

export const StaggeredScrollReveal = ({
  children,
  className,
  itemClassName,
  staggerDelay = 0.15,
  direction = 'up',
  distance = 50,
  duration = 0.8,
}: StaggeredScrollRevealProps) => {
  const { ref, visibleItems } = useStaggeredScrollAnimation(children.length, staggerDelay);

  const directionOffset = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  };

  return (
    <div ref={ref} className={cn('grid gap-6', className)}>
      {children.map((child, index) => (
        <motion.div
          key={index}
          className={itemClassName}
          initial={{
            opacity: 0,
            ...directionOffset[direction],
          }}
          animate={visibleItems.includes(index) ? {
            opacity: 1,
            x: 0,
            y: 0,
          } : {
            opacity: 0,
            ...directionOffset[direction],
          }}
          transition={{
            duration,
            ease: [0.25, 0.25, 0.25, 0.75],
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
};