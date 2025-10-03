import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useParallax } from '@/hooks/use-parallax';
import { cn } from '@/lib/utils';

interface ParallaxProps {
  children: ReactNode;
  speed?: number;
  className?: string;
  enableOnMobile?: boolean;
}

export const Parallax = ({
  children,
  speed = 0.5,
  className,
  enableOnMobile = false,
}: ParallaxProps) => {
  const { ref, offset } = useParallax({ speed, enableOnMobile });

  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      <motion.div
        style={{
          transform: `translateY(${offset}px)`,
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number;
  className?: string;
  enableOnMobile?: boolean;
}

export const ParallaxImage = ({
  src,
  alt,
  speed = 0.3,
  className,
  enableOnMobile = false,
}: ParallaxImageProps) => {
  const { ref, offset } = useParallax({ speed, enableOnMobile });

  return (
    <div ref={ref} className={cn('relative overflow-hidden parallax-image-container', className)}>
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover will-change-transform"
        style={{
          // Slightly smaller base scale so the image feels farther (less in-your-face zoom)
          transform: `translateY(${offset}px) scale(1.03)`,
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
      />
    </div>
  );
};