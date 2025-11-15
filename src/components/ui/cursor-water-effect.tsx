'use client';

import { useEffect, useState } from 'react';

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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    let animationFrameId: number;
    let lastDropTime = 0;
    let movementTimeout: NodeJS.Timeout;
    const dropInterval = 80; // Create drop every 80ms (slower)

    const handleMouseMove = (e: MouseEvent) => {
      setLastMousePos({ ...mousePos });
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsMoving(true);

      // Reset movement flag after 100ms of no movement
      clearTimeout(movementTimeout);
      movementTimeout = setTimeout(() => {
        setIsMoving(false);
      }, 100);
    };

    const animate = (currentTime: number) => {
      // Only create drops when cursor is moving
      if (isMoving && currentTime - lastDropTime > dropInterval) {
        // Calculate movement direction
        const dx = mousePos.x - lastMousePos.x;
        const dy = mousePos.y - lastMousePos.y;
        const velocity = Math.sqrt(dx * dx + dy * dy);

        // Only create drops if there's actual movement
        if (velocity > 0.5) {
          const newDrop: WaterDrop = {
            id: Date.now() + Math.random(),
            x: mousePos.x,
            y: mousePos.y,
            size: Math.random() * 5 + 2,
            opacity: 0.7,
            speedX: (Math.random() - 0.5) * 0.1, // Much slower horizontal movement
            speedY: Math.random() * 0.5 + 0.1,    // Much slower vertical movement
          };
          
          setDrops(prev => [...prev.slice(-25), newDrop]); // Keep last 25 drops
          lastDropTime = currentTime;
        }
      }

      // Update existing drops (slower movement)
      setDrops(prev =>
        prev
          .map(drop => ({
            ...drop,
            x: drop.x + drop.speedX,
            y: drop.y + drop.speedY,
            opacity: drop.opacity - 0.008, // Slower fade
            speedY: drop.speedY + 0.02,    // Gentler gravity
          }))
          .filter(drop => drop.opacity > 0)
      );

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(movementTimeout);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePos.x, mousePos.y, lastMousePos.x, lastMousePos.y, isMoving]);

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

