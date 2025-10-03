// Animation configuration and optimization utilities
export const animationConfig = {
  // Default durations
  durations: {
    fast: 0.3,
    normal: 0.6,
    slow: 0.8,
  },
  
  // Easing functions
  easing: {
    bounce: [0.68, -0.55, 0.265, 1.55],
    smooth: [0.25, 0.25, 0.25, 0.75],
    sharp: [0.4, 0, 0.2, 1],
    easeOut: [0, 0, 0.2, 1],
  },
  
  // Spring configurations
  spring: {
    smooth: { type: "spring", stiffness: 300, damping: 20 },
    bouncy: { type: "spring", stiffness: 400, damping: 17 },
    gentle: { type: "spring", stiffness: 100, damping: 15 },
  },
  
  // Scroll reveal configurations
  scrollReveal: {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    triggerOnce: true,
  },
  
  // Stagger delays
  stagger: {
    fast: 0.1,
    normal: 0.15,
    slow: 0.2,
  },
  
  // Parallax speeds
  parallax: {
    slow: 0.3,
    normal: 0.5,
    fast: 0.7,
  },
};

// Check if user prefers reduced motion
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Get optimized animation settings based on user preferences
export const getAnimationSettings = (settings: any) => {
  if (prefersReducedMotion()) {
    return {
      ...settings,
      duration: Math.min(settings.duration || 0.3, 0.2),
      delay: 0,
      animate: { opacity: 1 },
      initial: { opacity: 0 },
    };
  }
  return settings;
};

// Force GPU acceleration
export const gpuAcceleration = {
  transform: 'translateZ(0)',
  backfaceVisibility: 'hidden' as const,
  perspective: 1000,
};

// Performance monitoring utilities
export const performanceUtils = {
  // Throttle function for scroll events
  throttle: (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    let lastExecTime = 0;
    
    return function (this: any, ...args: any[]) {
      const currentTime = Date.now();
      
      if (currentTime - lastExecTime > delay) {
        func.apply(this, args);
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(this, args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  },

  // Debounce function for resize events
  debounce: (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    
    return function (this: any, ...args: any[]) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  },

  // Check if device is mobile
  isMobile: () => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  },

  // Check if device has touch capability
  isTouchDevice: () => {
    if (typeof window === 'undefined') return false;
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  },
};

// Animation variants for common patterns
export const animationVariants = {
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
  },
  
  fadeInDown: {
    initial: { opacity: 0, y: -30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 30 },
  },
  
  fadeInLeft: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 30 },
  },
  
  fadeInRight: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
  },
  
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  },
  
  slideUp: {
    initial: { y: "100%" },
    animate: { y: 0 },
    exit: { y: "100%" },
  },
  
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  
  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
};