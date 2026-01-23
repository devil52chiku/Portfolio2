import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

// Floating particles component
const FloatingParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      hue: number;
    }

    const particles: Particle[] = [];
    const particleCount = 80;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        hue: 160 + Math.random() * 40,
      });
    }

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `hsla(170, 100%, 50%, ${0.15 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawConnections();

      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particle.hue}, 100%, 60%, ${particle.opacity})`;
        ctx.fill();

        // Glow effect
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particle.hue}, 100%, 60%, ${particle.opacity * 0.3})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0" style={{ zIndex: 0 }} />;
};

// Animated code lines in background
const CodeLines: React.FC = () => {
  const lines = [
    'const developer = new FullStackDev();',
    'await developer.initialize();',
    'import { creativity, passion } from "core";',
    'function buildAmazingThings() { ... }',
    'export default Portfolio;',
    '// Loading modules...',
    'npm run create-awesome',
    'git commit -m "Making magic happen"',
  ];

  return (
    <div className="absolute inset-0 overflow-hidden opacity-10 font-mono text-xs pointer-events-none">
      {lines.map((line, i) => (
        <div
          key={i}
          className="absolute whitespace-nowrap text-accent animate-pulse"
          style={{
            top: `${10 + i * 12}%`,
            left: `${-20 + (i % 3) * 10}%`,
            animationDelay: `${i * 0.3}s`,
            transform: `rotate(-5deg)`,
          }}
        >
          {line}
        </div>
      ))}
    </div>
  );
};

// Glitch text effect component
const GlitchText: React.FC<{ text: string; className?: string }> = ({ text, className }) => {
  return (
    <div className={cn("relative inline-block", className)}>
      <span className="relative z-10">{text}</span>
      <span
        className="absolute top-0 left-0 -translate-x-[2px] translate-y-[2px] text-cyan-500 opacity-70 animate-pulse"
        style={{ clipPath: 'inset(0 0 50% 0)' }}
        aria-hidden="true"
      >
        {text}
      </span>
      <span
        className="absolute top-0 left-0 translate-x-[2px] -translate-y-[2px] text-pink-500 opacity-70 animate-pulse"
        style={{ clipPath: 'inset(50% 0 0 0)', animationDelay: '0.1s' }}
        aria-hidden="true"
      >
        {text}
      </span>
    </div>
  );
};

// Terminal boot sequence
const TerminalBoot: React.FC<{ progress: number }> = ({ progress }) => {
  const [lines, setLines] = useState<string[]>([]);
  const bootSequence = [
    { text: '> Initializing system...', delay: 0 },
    { text: '> Loading neural networks... ████████ 100%', delay: 400 },
    { text: '> Compiling creativity modules...', delay: 800 },
    { text: '> Establishing connection...', delay: 1200 },
    { text: '> Rendering portfolio...', delay: 1600 },
    { text: '> Welcome, visitor.', delay: 2000 },
  ];

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    bootSequence.forEach(({ text, delay }) => {
      const timer = setTimeout(() => {
        setLines((prev) => [...prev, text]);
      }, delay);
      timers.push(timer);
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="absolute bottom-8 left-8 font-mono text-xs text-accent/60 space-y-1 hidden md:block">
      {lines.map((line, i) => (
        <div
          key={i}
          className="animate-fade-in"
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          {line}
        </div>
      ))}
      <div className="animate-pulse">_</div>
    </div>
  );
};

// Hexagon grid background
const HexGrid: React.FC = () => {
  return (
    <div className="absolute inset-0 opacity-5">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
            <polygon
              points="24.8,22 37.3,29.2 37.3,43.7 24.8,50.9 12.3,43.7 12.3,29.2"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-accent"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexagons)" />
      </svg>
    </div>
  );
};

// Circular progress ring
const ProgressRing: React.FC<{ progress: number }> = ({ progress }) => {
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg className="w-32 h-32 md:w-40 md:h-40 transform -rotate-90" viewBox="0 0 100 100">
      {/* Background ring */}
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-border/30"
      />
      {/* Progress ring */}
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="url(#gradient)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        className="transition-all duration-100 ease-linear"
        style={{ filter: 'drop-shadow(0 0 8px rgba(0, 255, 170, 0.5))' }}
      />
      {/* Gradient definition */}
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00ffaa" />
          <stop offset="50%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const IntroScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'complete' | 'exit'>('loading');
  const [skipIntro, setSkipIntro] = useState(false);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem('introSeen');
    if (hasSeen) {
      setSkipIntro(true);
      onComplete();
    }
  }, [onComplete]);

  useEffect(() => {
    if (skipIntro) return;

    const duration = 2800;
    const interval = 30;
    const steps = duration / interval;
    const increment = 100 / steps;

    let currentProgress = 0;
    const timer = setInterval(() => {
      currentProgress += increment;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(timer);
        setPhase('complete');
        setTimeout(() => {
          setPhase('exit');
          setTimeout(() => {
            sessionStorage.setItem('introSeen', 'true');
            onComplete();
          }, 600);
        }, 400);
      }
      setProgress(currentProgress);
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete, skipIntro]);

  if (skipIntro) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] bg-background flex items-center justify-center transition-all duration-600",
        phase === 'exit' && "opacity-0 scale-110"
      )}
    >
      {/* Animated background layers */}
      <FloatingParticles />
      <HexGrid />
      <CodeLines />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: '0.5s' }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: '1s' }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center select-none">
        {/* Progress ring with percentage */}
        <div className="relative inline-flex items-center justify-center mb-8">
          <ProgressRing progress={progress} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl md:text-3xl font-bold font-mono text-foreground">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Name with glitch effect */}
        <div className="mb-4">
          <GlitchText
            text="JYOTI RANJAN PAL"
            className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-wider"
          />
        </div>

        {/* Tagline */}
        <div className="overflow-hidden">
          <p
            className={cn(
              "text-lg md:text-xl text-muted-foreground font-mono tracking-widest transition-all duration-500",
              phase === 'loading' ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            )}
          >
            {'< FULL-STACK DEVELOPER />'}
          </p>
        </div>

        {/* Animated dots */}
        <div className="flex justify-center gap-2 mt-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-accent animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>

        {/* Skip button */}
        <button
          onClick={() => {
            sessionStorage.setItem('introSeen', 'true');
            onComplete();
          }}
          className="mt-8 text-xs text-muted-foreground/50 hover:text-accent transition-colors font-mono"
        >
          [ SKIP INTRO ]
        </button>
      </div>

      {/* Terminal boot sequence */}
      <TerminalBoot progress={progress} />

      {/* Corner decorations */}
      <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-accent/30" />
      <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-accent/30" />
      <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-accent/30" />
      <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-accent/30" />

      {/* Scan line overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
        }}
      />
    </div>
  );
};

export default IntroScreen;