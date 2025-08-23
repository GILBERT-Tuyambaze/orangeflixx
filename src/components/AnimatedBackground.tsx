import { useEffect, useState } from 'react';

export default function AnimatedBackground() {
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, speed: number}>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      speed: Math.random() * 3 + 1
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Animated particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-orange-500/10 to-yellow-500/10 animate-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.id * 0.2}s`,
            animationDuration: `${particle.speed}s`
          }}
        />
      ))}
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-900/5 via-transparent to-yellow-900/5 animate-gradient-shift gradient-animated"></div>
      
      {/* Matrix rain effect */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px bg-gradient-to-b from-orange-500/20 via-orange-500/10 to-transparent animate-matrix-rain"
            style={{
              left: `${i * 7}%`,
              height: '100px',
              animationDelay: `${i * 0.3}s`,
              animationDuration: '4s'
            }}
          />
        ))}
      </div>
      
      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-20 w-16 h-16 border border-orange-500/20 rounded-full animate-spin" style={{animationDuration: '20s'}}></div>
      <div className="absolute top-40 right-40 w-12 h-12 bg-yellow-500/10 rotate-45 animate-bounce"></div>
      <div className="absolute bottom-32 left-32 w-8 h-8 border border-orange-500/30 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-20 h-20 border-2 border-yellow-500/20 rounded-full animate-ping" style={{animationDuration: '3s'}}></div>
    </div>
  );
}