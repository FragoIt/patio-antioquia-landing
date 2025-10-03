import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
}

export const AnimatedButton = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
}: AnimatedButtonProps) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  const variantClasses = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary shadow-md hover:shadow-lg',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-secondary shadow-sm hover:shadow-md',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground focus:ring-primary shadow-sm hover:shadow-md',
  };
  
  const sizeClasses = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 py-2',
    lg: 'h-12 px-8 text-lg',
  };

  return (
    <motion.button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      whileHover={{ 
        scale: 1.02,
        y: -1,
      }}
      whileTap={{ 
        scale: 0.98,
        y: 0,
      }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 17,
        mass: 0.8
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
};

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  hoverScale?: number;
  hoverY?: number;
}

export const AnimatedCard = ({
  children,
  className,
  hoverScale = 1.02,
  hoverY = -4,
}: AnimatedCardProps) => {
  return (
    <motion.div
      className={cn(
        'bg-card text-card-foreground rounded-lg border shadow-sm transition-all duration-300',
        className
      )}
      whileHover={{
        scale: hoverScale,
        y: hoverY,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    >
      {children}
    </motion.div>
  );
};

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
}

export const FadeIn = ({
  children,
  className,
  delay = 0,
  direction = 'up',
  distance = 30,
}: FadeInProps) => {
  const directionOffset = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  };

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        ...directionOffset[direction],
      }}
      animate={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.25, 0.25, 0.75],
      }}
    >
      {children}
    </motion.div>
  );
};

interface StaggeredContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export const StaggeredContainer = ({
  children,
  className,
  staggerDelay = 0.1,
}: StaggeredContainerProps) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

export const StaggeredItem = ({ 
  children, 
  className 
}: { 
  children: ReactNode; 
  className?: string;
}) => {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: {
          opacity: 0,
          y: 30,
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: [0.25, 0.25, 0.25, 0.75],
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};