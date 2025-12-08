import React, { useState, useEffect, useRef } from 'react';

const IntroScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'show' | 'glitch' | 'fade'>('show');
  const bladeAudioRef = useRef<HTMLAudioElement | null>(null);
  const swordAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const timers = [
      // Show text for 1 second, then start glitch
      setTimeout(() => {
        setPhase('glitch');
        // Play both sound effects
        if (bladeAudioRef.current) {
          bladeAudioRef.current.volume = 0.4;
          bladeAudioRef.current.play().catch(() => {});
        }
        if (swordAudioRef.current) {
          swordAudioRef.current.volume = 0.3;
          swordAudioRef.current.play().catch(() => {});
        }
      }, 1000),
      // Fade out after glitch
      setTimeout(() => setPhase('fade'), 2200),
      // Complete
      setTimeout(() => onComplete(), 2700),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-background flex items-center justify-center transition-opacity duration-500 ${
        phase === 'fade' ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Audio elements - using free sound effect URLs */}
      <audio
        ref={bladeAudioRef}
        src="https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3"
        preload="auto"
      />
      <audio
        ref={swordAudioRef}
        src="https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3"
        preload="auto"
      />

      {/* Laser cut effects during glitch */}
      {phase === 'glitch' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Horizontal laser cuts */}
          {[...Array(6)].map((_, i) => (
            <div
              key={`laser-h-${i}`}
              className="absolute h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent animate-laser-horizontal"
              style={{
                top: `${15 + i * 14}%`,
                left: '-100%',
                width: '200%',
                animationDelay: `${i * 0.08}s`,
                boxShadow: '0 0 20px hsl(var(--accent)), 0 0 40px hsl(var(--accent))',
              }}
            />
          ))}
          {/* Diagonal laser cuts */}
          {[...Array(4)].map((_, i) => (
            <div
              key={`laser-d-${i}`}
              className="absolute h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent animate-laser-diagonal"
              style={{
                top: `${20 + i * 20}%`,
                left: '-100%',
                width: '250%',
                transform: `rotate(${-25 + i * 15}deg)`,
                animationDelay: `${0.1 + i * 0.1}s`,
                boxShadow: '0 0 15px hsl(var(--primary)), 0 0 30px hsl(var(--primary))',
              }}
            />
          ))}
          {/* Spark particles */}
          {[...Array(30)].map((_, i) => (
            <div
              key={`spark-${i}`}
              className="absolute w-1 h-1 bg-accent rounded-full animate-spark-burst"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.6}s`,
                boxShadow: '0 0 6px hsl(var(--accent))',
              }}
            />
          ))}
        </div>
      )}

      {/* Welcome text */}
      <div className="relative text-center select-none">
        {/* WELCOME TO MY - glitches right to left */}
        <h1
          className={`text-3xl md:text-5xl lg:text-7xl font-black tracking-[0.2em] uppercase mb-4 text-foreground transition-all duration-200 ${
            phase === 'glitch' ? 'animate-glitch-rtl' : ''
          }`}
          style={{ fontFamily: "'Orbitron', 'Rajdhani', sans-serif" }}
        >
          WELCOME TO MY
        </h1>

        {/* PORTFOLIO - glitches left to right */}
        <h1
          className={`text-4xl md:text-6xl lg:text-8xl font-black tracking-[0.3em] uppercase gradient-text transition-all duration-200 ${
            phase === 'glitch' ? 'animate-glitch-ltr' : ''
          }`}
          style={{ fontFamily: "'Orbitron', 'Rajdhani', sans-serif" }}
        >
          PORTFOLIO
        </h1>

        {/* Glitch overlay layers */}
        {phase === 'glitch' && (
          <>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h1
                className="text-3xl md:text-5xl lg:text-7xl font-black tracking-[0.2em] uppercase mb-4 text-accent opacity-60 animate-glitch-layer-1"
                style={{ fontFamily: "'Orbitron', 'Rajdhani', sans-serif" }}
              >
                WELCOME TO MY
              </h1>
              <h1
                className="text-4xl md:text-6xl lg:text-8xl font-black tracking-[0.3em] uppercase text-pink-500 opacity-60 animate-glitch-layer-1"
                style={{ fontFamily: "'Orbitron', 'Rajdhani', sans-serif" }}
              >
                PORTFOLIO
              </h1>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h1
                className="text-3xl md:text-5xl lg:text-7xl font-black tracking-[0.2em] uppercase mb-4 text-pink-500 opacity-60 animate-glitch-layer-2"
                style={{ fontFamily: "'Orbitron', 'Rajdhani', sans-serif" }}
              >
                WELCOME TO MY
              </h1>
              <h1
                className="text-4xl md:text-6xl lg:text-8xl font-black tracking-[0.3em] uppercase text-accent opacity-60 animate-glitch-layer-2"
                style={{ fontFamily: "'Orbitron', 'Rajdhani', sans-serif" }}
              >
                PORTFOLIO
              </h1>
            </div>
          </>
        )}
      </div>

      {/* Scanlines overlay */}
      <div className="absolute inset-0 bg-scanlines opacity-5 pointer-events-none" />
    </div>
  );
};

export default IntroScreen;
