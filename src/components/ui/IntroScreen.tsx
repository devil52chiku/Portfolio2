import React, { useState, useEffect, useRef } from 'react';

const IntroScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'text' | 'glitch' | 'blades' | 'fade'>('text');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Phase timing
    const timers = [
      setTimeout(() => setPhase('glitch'), 2000),
      setTimeout(() => {
        setPhase('blades');
        // Play blade sound
        if (audioRef.current) {
          audioRef.current.volume = 0.3;
          audioRef.current.play().catch(() => {});
        }
      }, 3500),
      setTimeout(() => setPhase('fade'), 5000),
      setTimeout(() => onComplete(), 5500),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-background flex items-center justify-center transition-opacity duration-500 ${
        phase === 'fade' ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Audio element for blade sound */}
      <audio
        ref={audioRef}
        src="https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3"
        preload="auto"
      />

      {/* Blade cuts */}
      {(phase === 'blades' || phase === 'fade') && (
        <>
          <div className="absolute inset-0 overflow-hidden">
            {/* Diagonal blade cuts */}
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute h-1 bg-gradient-to-r from-transparent via-accent to-transparent animate-blade-cut"
                style={{
                  top: `${15 + i * 18}%`,
                  left: '-100%',
                  width: '200%',
                  transform: `rotate(${-15 + i * 8}deg)`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
            {/* Spark effects */}
            {[...Array(20)].map((_, i) => (
              <div
                key={`spark-${i}`}
                className="absolute w-1 h-1 bg-accent rounded-full animate-spark"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 0.5}s`,
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* Welcome text */}
      <div className="relative text-center">
        <h1
          className={`text-4xl md:text-6xl lg:text-8xl font-bold font-mono tracking-wider transition-all duration-300 ${
            phase === 'glitch' || phase === 'blades' || phase === 'fade'
              ? 'intro-glitch-out'
              : ''
          }`}
        >
          <span className="block text-foreground">WELCOME TO MY</span>
          <span className="block gradient-text mt-2">PORTFOLIO</span>
        </h1>

        {/* Glitch layers */}
        {phase === 'glitch' && (
          <>
            <h1 className="absolute inset-0 text-4xl md:text-6xl lg:text-8xl font-bold font-mono tracking-wider text-accent opacity-70 intro-glitch-1">
              <span className="block">WELCOME TO MY</span>
              <span className="block mt-2">PORTFOLIO</span>
            </h1>
            <h1 className="absolute inset-0 text-4xl md:text-6xl lg:text-8xl font-bold font-mono tracking-wider text-pink-500 opacity-70 intro-glitch-2">
              <span className="block">WELCOME TO MY</span>
              <span className="block mt-2">PORTFOLIO</span>
            </h1>
          </>
        )}
      </div>

      {/* Scanlines overlay */}
      <div className="absolute inset-0 bg-scanlines opacity-5 pointer-events-none" />
    </div>
  );
};

export default IntroScreen;
