import React, { useState, useRef, useEffect } from 'react';

const MatrixRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>{}[]!@#$%^&*';
    const charArray = chars.split('');
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'hsl(190, 95%, 50%)';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Random color variation between cyan and purple
        if (Math.random() > 0.5) {
          ctx.fillStyle = `hsl(${190 + Math.random() * 90}, 95%, ${50 + Math.random() * 20}%)`;
        }

        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 35);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 opacity-40"
      style={{ zIndex: 0 }}
    />
  );
};

const IntroScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'waiting' | 'show' | 'glitch' | 'fade'>('waiting');
  const glitchAudioRef = useRef<HTMLAudioElement | null>(null);
  const typeAudioRef = useRef<HTMLAudioElement | null>(null);
  const cyberAudioRef = useRef<HTMLAudioElement | null>(null);

  const startIntro = () => {
    setPhase('show');
    
    // Play typing sound during text reveal
    if (typeAudioRef.current) {
      typeAudioRef.current.volume = 0.3;
      typeAudioRef.current.play().catch(console.error);
    }
    
    // Start the animation sequence
    setTimeout(() => {
      setPhase('glitch');
      // Stop typing, play glitch sounds
      if (typeAudioRef.current) {
        typeAudioRef.current.pause();
      }
      if (glitchAudioRef.current) {
        glitchAudioRef.current.volume = 0.5;
        glitchAudioRef.current.play().catch(console.error);
      }
      setTimeout(() => {
        if (cyberAudioRef.current) {
          cyberAudioRef.current.volume = 0.4;
          cyberAudioRef.current.play().catch(console.error);
        }
      }, 150);
    }, 800);
    
    // Fade out after glitch
    setTimeout(() => setPhase('fade'), 2000);
    // Complete
    setTimeout(() => onComplete(), 2500);
  };

  return (
    <div
      className={`fixed inset-0 z-[100] bg-background flex items-center justify-center transition-opacity duration-500 ${
        phase === 'fade' ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Matrix rain background - always visible */}
      <MatrixRain />

      {/* Audio elements - cyber/hacking sounds */}
      <audio
        ref={typeAudioRef}
        src="https://cdn.freesound.org/previews/256/256541_4772965-lq.mp3"
        preload="auto"
      />
      <audio
        ref={glitchAudioRef}
        src="https://cdn.freesound.org/previews/560/560443_7549498-lq.mp3"
        preload="auto"
      />
      <audio
        ref={cyberAudioRef}
        src="https://cdn.freesound.org/previews/253/253886_4597795-lq.mp3"
        preload="auto"
      />

      {/* Waiting phase - Click to enter */}
      {phase === 'waiting' && (
        <button
          onClick={startIntro}
          className="group relative z-10 px-12 py-6 text-2xl md:text-3xl font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:scale-105"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          <span className="relative z-10 gradient-text">CLICK TO ENTER</span>
          <div className="absolute inset-0 border-2 border-primary/50 rounded-lg group-hover:border-primary transition-colors" />
          <div className="absolute inset-0 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors" />
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      )}

      {/* Blade slash effects during glitch */}
      {phase === 'glitch' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
          {/* Diagonal blade slashes - like sword cuts */}
          {[...Array(5)].map((_, i) => (
            <div
              key={`slash-${i}`}
              className="absolute animate-blade-slash"
              style={{
                top: `${10 + i * 18}%`,
                left: '-10%',
                width: '120%',
                height: '4px',
                transform: `rotate(${-15 + i * 8}deg)`,
                animationDelay: `${i * 0.12}s`,
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 20%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.1) 80%, transparent 100%)',
                boxShadow: '0 0 30px rgba(255,255,255,0.8), 0 0 60px hsl(190, 95%, 50%), 0 0 90px hsl(280, 87%, 65%)',
              }}
            />
          ))}
          
          {/* Cross slashes */}
          {[...Array(3)].map((_, i) => (
            <div
              key={`cross-${i}`}
              className="absolute animate-blade-slash-reverse"
              style={{
                top: `${25 + i * 25}%`,
                right: '-10%',
                width: '120%',
                height: '3px',
                transform: `rotate(${15 - i * 10}deg)`,
                animationDelay: `${0.3 + i * 0.15}s`,
                background: 'linear-gradient(270deg, transparent 0%, rgba(255,255,255,0.1) 20%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.1) 80%, transparent 100%)',
                boxShadow: '0 0 25px rgba(255,255,255,0.7), 0 0 50px hsl(280, 87%, 65%), 0 0 75px hsl(320, 87%, 60%)',
              }}
            />
          ))}

          {/* Digital fragments/sparks */}
          {[...Array(40)].map((_, i) => (
            <div
              key={`spark-${i}`}
              className="absolute rounded-sm animate-metal-spark"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
                animationDelay: `${0.2 + Math.random() * 0.5}s`,
                background: i % 3 === 0 ? 'hsl(190, 95%, 60%)' : i % 3 === 1 ? 'hsl(280, 87%, 65%)' : '#fff',
                boxShadow: `0 0 ${4 + Math.random() * 8}px currentColor`,
              }}
            />
          ))}

          {/* Screen flash on impact */}
          <div 
            className="absolute inset-0 bg-white animate-screen-flash"
            style={{ animationDelay: '0.1s' }}
          />
        </div>
      )}

      {/* Welcome text - shown during 'show' and 'glitch' phases */}
      {(phase === 'show' || phase === 'glitch') && (
        <div className="relative text-center select-none z-10">
          {/* WELCOME TO MY - glitches right to left */}
          <h1
            className={`text-3xl md:text-5xl lg:text-7xl font-black tracking-[0.2em] uppercase mb-4 text-foreground transition-all duration-200 ${
              phase === 'glitch' ? 'animate-glitch-rtl' : 'animate-fade-up'
            }`}
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            WELCOME TO MY
          </h1>

          {/* PORTFOLIO - glitches left to right */}
          <h1
            className={`text-4xl md:text-6xl lg:text-8xl font-black tracking-[0.3em] uppercase gradient-text transition-all duration-200 ${
              phase === 'glitch' ? 'animate-glitch-ltr' : 'animate-fade-up'
            }`}
            style={{ fontFamily: "'Orbitron', sans-serif", animationDelay: '0.1s' }}
          >
            PORTFOLIO
          </h1>

          {/* Glitch overlay layers */}
          {phase === 'glitch' && (
            <>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <h1
                  className="text-3xl md:text-5xl lg:text-7xl font-black tracking-[0.2em] uppercase mb-4 text-accent opacity-60 animate-glitch-layer-1"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  WELCOME TO MY
                </h1>
                <h1
                  className="text-4xl md:text-6xl lg:text-8xl font-black tracking-[0.3em] uppercase opacity-60 animate-glitch-layer-1"
                  style={{ fontFamily: "'Orbitron', sans-serif", color: 'hsl(320, 87%, 60%)' }}
                >
                  PORTFOLIO
                </h1>
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <h1
                  className="text-3xl md:text-5xl lg:text-7xl font-black tracking-[0.2em] uppercase mb-4 opacity-60 animate-glitch-layer-2"
                  style={{ fontFamily: "'Orbitron', sans-serif", color: 'hsl(320, 87%, 60%)' }}
                >
                  WELCOME TO MY
                </h1>
                <h1
                  className="text-4xl md:text-6xl lg:text-8xl font-black tracking-[0.3em] uppercase text-accent opacity-60 animate-glitch-layer-2"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  PORTFOLIO
                </h1>
              </div>
            </>
          )}
        </div>
      )}

      {/* Scanlines overlay */}
      <div className="absolute inset-0 bg-scanlines opacity-5 pointer-events-none z-30" />
    </div>
  );
};

export default IntroScreen;