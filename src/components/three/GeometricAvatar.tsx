import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const GeometricAvatar: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const rotateX = (e.clientY - centerY) / 30;
      const rotateY = (e.clientX - centerX) / 30;
      setRotation({ x: -rotateX, y: rotateY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-80 h-80 md:w-96 md:h-96 perspective-1000"
    >
      {/* Background glows */}
      <div className="absolute -inset-10 bg-accent/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -inset-5 bg-primary/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Main 3D container */}
      <div
        className="relative w-full h-full preserve-3d transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      >
        {/* Rotating rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="absolute w-full h-full border-2 border-accent/30 rounded-full animate-spin-slow"
            style={{ transform: 'rotateX(70deg)' }}
          />
          <div 
            className="absolute w-[90%] h-[90%] border border-primary/30 rounded-full"
            style={{ 
              transform: 'rotateX(70deg) rotateZ(45deg)',
              animation: 'spin 25s linear infinite reverse'
            }}
          />
          <div 
            className="absolute w-[80%] h-[80%] border border-pink-500/30 rounded-full"
            style={{ 
              transform: 'rotateX(70deg) rotateZ(-30deg)',
              animation: 'spin 30s linear infinite'
            }}
          />
        </div>

        {/* Laptop */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative preserve-3d" style={{ transform: 'rotateX(-10deg)' }}>
            {/* Screen */}
            <div 
              className="relative w-48 h-32 bg-card border border-border rounded-t-lg overflow-hidden"
              style={{ transform: 'translateZ(20px)' }}
            >
              {/* Screen glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-primary/20 to-pink-500/20" />
              
              {/* Code lines */}
              <div className="p-3 font-mono text-[10px] space-y-1">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="flex gap-2 animate-fade-up"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  >
                    <span className="text-accent">{i + 1}</span>
                    <div
                      className={cn(
                        "h-2 rounded",
                        i % 3 === 0 ? "bg-primary/40 w-20" :
                        i % 3 === 1 ? "bg-accent/40 w-16" :
                        "bg-pink-500/40 w-12"
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Keyboard base */}
            <div 
              className="w-52 h-4 bg-secondary rounded-b-lg border-x border-b border-border"
              style={{ 
                transform: 'rotateX(-80deg) translateY(-2px)',
                transformOrigin: 'top'
              }}
            />
          </div>
        </div>

        {/* Orbiting particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full"
            style={{
              animation: `orbit ${10 + i * 3}s linear infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          >
            <div 
              className={cn(
                "w-full h-full rounded-full animate-pulse",
                i % 3 === 0 ? "bg-accent" :
                i % 3 === 1 ? "bg-primary" :
                "bg-pink-500"
              )}
            />
          </div>
        ))}

        {/* Floating code symbols */}
        {['</>', '/>', '{ }', '( )'].map((symbol, i) => (
          <div
            key={symbol}
            className="absolute text-primary/40 font-mono text-sm animate-float"
            style={{
              top: `${20 + i * 20}%`,
              left: i % 2 === 0 ? '5%' : '85%',
              animationDelay: `${i * 0.5}s`,
            }}
          >
            {symbol}
          </div>
        ))}

        {/* Data streams */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 w-1 h-1"
            style={{
              animation: `pulse 2s ease-in-out infinite`,
              animationDelay: `${i * 0.25}s`,
            }}
          >
            <div
              className={cn(
                "w-2 h-2 rounded-full animate-ping",
                i % 3 === 0 ? "bg-accent" :
                i % 3 === 1 ? "bg-primary" :
                "bg-pink-500"
              )}
              style={{
                transform: `rotate(${i * 45}deg) translateX(60px)`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeometricAvatar;
