'use client';

import { useEffect, useState, useRef } from 'react';

interface WaterDrop {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speedX: number;
  speedY: number;
}

export function CursorWaterEffect() {
  const [drops, setDrops] = useState<WaterDrop[]>([]);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const isMovingRef = useRef(false);
  const lastMoveTimeRef = useRef(0);
  const hasDropsRef = useRef(false);

  useEffect(() => {
    let animationFrameId: number | null = null;
    let lastDropTime = 0;
    const dropInterval = 20; // Create drop every 50ms (faster)
    const movementStopDelay = 150; // Consider stopped after 150ms

    const handleMouseMove = (e: MouseEvent) => {
      lastMousePosRef.current = { ...mousePosRef.current };
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      lastMoveTimeRef.current = Date.now();
      
      if (!isMovingRef.current) {
        isMovingRef.current = true;
        // Restart animation if it was stopped
        if (animationFrameId === null) {
          animationFrameId = requestAnimationFrame(animate);
        }
      }
    };

    const animate = (currentTime: number) => {
      const now = Date.now();
      const timeSinceLastMove = now - lastMoveTimeRef.current;
      
      // Update moving state
      if (timeSinceLastMove > movementStopDelay && isMovingRef.current) {
        isMovingRef.current = false;
      }

      // Only create drops when cursor is actively moving
      if (isMovingRef.current && currentTime - lastDropTime > dropInterval) {
        const dx = mousePosRef.current.x - lastMousePosRef.current.x;
        const dy = mousePosRef.current.y - lastMousePosRef.current.y;
        const velocity = Math.sqrt(dx * dx + dy * dy);

        // Only create drops if there's actual movement
        if (velocity > 0.5) {
          const newDrop: WaterDrop = {
            id: Date.now() + Math.random(),
            x: mousePosRef.current.x,
            y: mousePosRef.current.y,
            size: Math.random() * 5 + 2,
            opacity: 0.7,
            speedX: (Math.random() - 0.5) * 0.1,
            speedY: Math.random() * 0.5 + 0.1,
          };
          
          setDrops(prev => {
            const updated = [...prev.slice(-25), newDrop];
            hasDropsRef.current = updated.length > 0;
            return updated;
          });
          lastDropTime = currentTime;
        }
      }

      // Update existing drops
      setDrops(prev => {
        const updated = prev
          .map(drop => ({
            ...drop,
            x: drop.x + drop.speedX,
            y: drop.y + drop.speedY,
            opacity: drop.opacity - 0.015, // Faster fade
            speedY: drop.speedY + 0.02,
          }))
          .filter(drop => drop.opacity > 0);

        hasDropsRef.current = updated.length > 0;
        return updated;
      });

      // Continue animation only if moving or if drops exist
      if (isMovingRef.current || hasDropsRef.current) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        animationFrameId = null;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {drops.map(drop => (
        <div
          key={drop.id}
          className="absolute rounded-full bg-blue-400"
          style={{
            left: drop.x,
            top: drop.y,
            width: drop.size,
            height: drop.size,
            opacity: drop.opacity,
            transform: 'translate(-50%, -50%)',
            boxShadow: `0 0 ${drop.size}px rgba(59, 130, 246, ${drop.opacity * 0.5})`,
          }}
        />
      ))}
    </div>
  );
}

