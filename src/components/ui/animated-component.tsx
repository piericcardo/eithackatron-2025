import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface AnimatedComponentProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'none';
}

export function AnimatedComponent({ 
  children, 
  className = "", 
  delay = 0,
  direction = 'up'
}: AnimatedComponentProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const getInitialPosition = () => {
    switch (direction) {
      case 'left':
        return { opacity: 0, x: -100, y: 0 };
      case 'right':
        return { opacity: 0, x: 100, y: 0 };
      case 'up':
        return { opacity: 0, x: 0, y: 50 };
      case 'none':
        return { opacity: 0, x: 0, y: 0 };
      default:
        return { opacity: 0, x: 0, y: 50 };
    }
  };

  const getAnimatePosition = () => {
    if (isInView) {
      return { opacity: 1, x: 0, y: 0 };
    }
    return getInitialPosition();
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitialPosition()}
      animate={getAnimatePosition()}
      transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
} 