'use client';

import { useEffect, useRef } from 'react';

interface Logo {
  name: string;
  image?: string;
  text?: string;
}

interface ScrollingLogosProps {
  logos: Logo[];
  speed?: number;
}

export function ScrollingLogos({ logos, speed = 30 }: ScrollingLogosProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;
    let scrollPosition = 0;

    const scroll = () => {
      scrollPosition += 0.5;
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }
      scrollContainer.scrollLeft = scrollPosition;
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Duplicate logos for seamless loop
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className="w-full overflow-hidden">
      <div 
        ref={scrollRef}
        className="flex gap-12 overflow-x-hidden scrollbar-hide py-6"
        style={{ 
          scrollBehavior: 'auto',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {duplicatedLogos.map((logo, index) => (
          <div
            key={`${logo.name}-${index}`}
            className="flex-shrink-0 flex items-center justify-center px-6"
            style={{ minWidth: '200px' }}
          >
            {logo.image ? (
              <img
                src={logo.image}
                alt={logo.name}
                className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
              />
            ) : (
              <div className="text-xl font-bold text-gray-400 hover:text-gray-600 transition-colors">
                {logo.text || logo.name}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

