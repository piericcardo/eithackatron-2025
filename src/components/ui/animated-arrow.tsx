'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useMemo, useId } from 'react';

interface AnimatedArrowProps {
  direction: 'right' | 'left';
  className?: string;
  color?: string;
  animated?: boolean;
}

export function AnimatedArrow({ 
  direction, 
  className = '', 
  color = 'blue-300',
  animated = true 
}: AnimatedArrowProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // Use React's useId for SSR-safe unique IDs (consistent between server and client)
  const reactId = useId();
  const gradientId = useMemo(() => `arrow-gradient-${direction}-${reactId}`, [direction, reactId]);

  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1.2, ease: [0.42, 0, 0.58, 1] as any },
        opacity: { duration: 0.4 },
      },
    },
  };

  // Continuous pulse animation for water droplet
  const pulseVariants = {
    pulse: {
      scale: [1, 1.3, 1],
      opacity: [0.6, 0.9, 0.6],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: [0.42, 0, 0.58, 1] as any,
      },
    },
  };

  if (direction === 'right') {
    return (
      <div ref={ref} className={`hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 ${className}`}>
        <svg width="120" height="120" viewBox="0 0 120 120" className={`text-${color}`}>
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.8" />
            </linearGradient>
            {/* Add glow filter for enhanced effect */}
            <filter id={`glow-${gradientId}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          {/* Main arrow line with wave */}
          <motion.path
            d="M20 60 Q40 50, 60 60 T100 60"
            stroke={`url(#${gradientId})`}
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            filter={`url(#glow-${gradientId})`}
            variants={animated ? pathVariants : undefined}
            initial={animated ? "hidden" : undefined}
            animate={animated && isInView ? "visible" : undefined}
          />
          {/* Arrowhead top */}
          <motion.path
            d="M90 50 L105 60"
            stroke={`url(#${gradientId})`}
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            filter={`url(#glow-${gradientId})`}
            variants={animated ? pathVariants : undefined}
            initial={animated ? "hidden" : undefined}
            animate={animated && isInView ? "visible" : undefined}
          />
          {/* Arrowhead bottom */}
          <motion.path
            d="M90 70 L105 60"
            stroke={`url(#${gradientId})`}
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            filter={`url(#glow-${gradientId})`}
            variants={animated ? pathVariants : undefined}
            initial={animated ? "hidden" : undefined}
            animate={animated && isInView ? "visible" : undefined}
          />
          {/* Water droplet accent with continuous pulse */}
          <motion.circle
            cx="60"
            cy="60"
            r="3"
            fill="currentColor"
            initial={{ scale: 0 }}
            animate={
              isInView && animated
                ? { scale: [0, 1.2, 1], opacity: [0, 0.8, 0.6] }
                : isInView
                ? "pulse"
                : { scale: 0 }
            }
            variants={pulseVariants}
            transition={{ duration: 0.8, delay: animated ? 1 : 0 }}
          />
        </svg>
      </div>
    );
  }

  // Left direction arrow
  return (
    <div ref={ref} className={`hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 ${className}`}>
      <svg width="120" height="120" viewBox="0 0 120 120" className={`text-${color}`}>
        <defs>
          <linearGradient id={gradientId} x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.8" />
          </linearGradient>
          {/* Add glow filter for enhanced effect */}
          <filter id={`glow-${gradientId}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        {/* Main arrow line with wave */}
        <motion.path
          d="M100 60 Q80 50, 60 60 T20 60"
          stroke={`url(#${gradientId})`}
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          filter={`url(#glow-${gradientId})`}
          variants={animated ? pathVariants : undefined}
          initial={animated ? "hidden" : undefined}
          animate={animated && isInView ? "visible" : undefined}
        />
        {/* Arrowhead top */}
        <motion.path
          d="M30 50 L15 60"
          stroke={`url(#${gradientId})`}
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          filter={`url(#glow-${gradientId})`}
          variants={animated ? pathVariants : undefined}
          initial={animated ? "hidden" : undefined}
          animate={animated && isInView ? "visible" : undefined}
        />
        {/* Arrowhead bottom */}
        <motion.path
          d="M30 70 L15 60"
          stroke={`url(#${gradientId})`}
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          filter={`url(#glow-${gradientId})`}
          variants={animated ? pathVariants : undefined}
          initial={animated ? "hidden" : undefined}
          animate={animated && isInView ? "visible" : undefined}
        />
        {/* Water droplet accent with continuous pulse */}
        <motion.circle
          cx="60"
          cy="60"
          r="3"
          fill="currentColor"
          initial={{ scale: 0 }}
          animate={
            isInView && animated
              ? { scale: [0, 1.2, 1], opacity: [0, 0.8, 0.6] }
              : isInView
              ? "pulse"
              : { scale: 0 }
          }
          variants={pulseVariants}
          transition={{ duration: 0.8, delay: animated ? 1 : 0 }}
        />
      </svg>
    </div>
  );
}

