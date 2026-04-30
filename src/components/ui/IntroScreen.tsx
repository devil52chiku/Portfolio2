import React, { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const FloatingParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();

    type Particle = {
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      alpha: number;
      hue: number;
    };

    const particles: Particle[] = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2.5 + 0.6,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.45 + 0.08,
      hue: 160 + Math.random() * 60,
    }));

    let animationId = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 140) {
            ctx.beginPath();
            ctx.strokeStyle = `hsla(170, 100%, 60%, ${0.16 * (1 - distance / 140)})`;
            ctx.lineWidth = 0.7;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      for (const particle of particles) {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < -20) particle.x = canvas.width + 20;
        if (particle.x > canvas.width + 20) particle.x = -20;
        if (particle.y < -20) particle.y = canvas.height + 20;
        if (particle.y > canvas.height + 20) particle.y = -20;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particle.hue}, 100%, 65%, ${particle.alpha})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particle.hue}, 100%, 65%, ${particle.alpha * 0.18})`;
        ctx.fill();
      }

      animationId = window.requestAnimationFrame(render);
    };

    animationId = window.requestAnimationFrame(render);

    window.addEventListener('resize', resize);

    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
};

const TechGrid: React.FC = () => (
  <div
    className="absolute inset-0 opacity-[0.08]"
    style={{
      backgroundImage:
        'linear-gradient(to right, rgba(148,163,184,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.18) 1px, transparent 1px)',
      backgroundSize: '72px 72px',
      maskImage: 'radial-gradient(circle at center, black 35%, transparent 90%)',
      WebkitMaskImage: 'radial-gradient(circle at center, black 35%, transparent 90%)',
    }}
  />
);

const CodeStream: React.FC = () => {
  const lines = useMemo(
    () => [
      'const portfolio = await buildExperience();',
      'useCreativeDirection();',
      'deploy({ performance: "high", style: "elegant" });',
      'renderUI({ motion: "smooth", vibe: "tech" });',
      'export default Developer;',
    ],
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none opacity-10 font-mono text-[11px] tracking-widest">
      {lines.map((line, index) => (
        <div
          key={line}
          className="absolute whitespace-nowrap text-accent/80 animate-pulse"
          style={{
            top: `${14 + index * 14}%`,
            left: `${-10 + (index % 2) * 18}%`,
            transform: `rotate(${index % 2 === 0 ? -6 : 4}deg)`,
            animationDelay: `${index * 0.35}s`,
          }}
        >
          {line}
        </div>
      ))}
    </div>
  );
};

const ProgressRing: React.FC<{ progress: number }> = ({ progress }) => {
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg className="h-36 w-36 md:h-44 md:w-44 -rotate-90 drop-shadow-[0_0_24px_rgba(0,255,170,0.18)]" viewBox="0 0 100 100">
      <defs>
        <linearGradient id="intro-ring" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00ffaa" />
          <stop offset="50%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r={radius} fill="none" stroke="currentColor" strokeWidth="2" className="text-border/30" />
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="none"
        stroke="url(#intro-ring)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        className="transition-[stroke-dashoffset] duration-75 ease-linear"
      />
      <circle cx="50" cy="50" r="34" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary/20" strokeDasharray="1 5" />
    </svg>
  );
};

const GlitchText: React.FC<{ text: string; className?: string }> = ({ text, className }) => (
  <div className={cn('relative inline-block', className)}>
    <span className="relative z-10">{text}</span>
    <span
      className="absolute inset-0 translate-x-[1.5px] translate-y-[1.5px] text-cyan-400/70"
      style={{ clipPath: 'inset(0 0 50% 0)' }}
      aria-hidden="true"
    >
      {text}
    </span>
    <span
      className="absolute inset-0 -translate-x-[1.5px] -translate-y-[1.5px] text-pink-400/70"
      style={{ clipPath: 'inset(50% 0 0 0)' }}
      aria-hidden="true"
    >
      {text}
    </span>
  </div>
);

const IntroScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'exit'>('loading');
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

    const duration = 2600;
    const interval = 30;
    const step = 100 / (duration / interval);
    let current = 0;

    const timer = window.setInterval(() => {
      current = Math.min(100, current + step);
      setProgress(current);

      if (current >= 100) {
        window.clearInterval(timer);
        window.setTimeout(() => {
          setPhase('exit');
          window.setTimeout(() => {
            sessionStorage.setItem('introSeen', 'true');
            onComplete();
          }, 450);
        }, 350);
      }
    }, interval);

    return () => window.clearInterval(timer);
  }, [onComplete, skipIntro]);

  if (skipIntro) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-[100] overflow-hidden bg-background transition-all duration-500',
        phase === 'exit' && 'opacity-0 scale-[1.03]'
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,170,0.12),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.10),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(236,72,153,0.08),transparent_30%)]" />
      <FloatingParticles />
      <TechGrid />
      <CodeStream />

      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent_30%,rgba(255,255,255,0.02))]" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10">
        <div className="grid w-full max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-card/40 px-4 py-2 backdrop-blur-xl shadow-[0_0_30px_rgba(0,255,170,0.08)]">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent/90">
                initializing portfolio experience
              </span>
            </div>

            <div className="space-y-4">
              <p className="font-mono text-sm uppercase tracking-[0.4em] text-muted-foreground/80">
                tech • design • motion
              </p>
              <h1 className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
                <GlitchText text="Jyoti Ranjan Pal" className="gradient-text" />
              </h1>
              <p className="mx-auto max-w-2xl text-base text-muted-foreground/90 md:text-lg lg:mx-0">
                Full-stack developer crafting elegant interfaces, interactive experiences, and polished digital products with a clean futuristic feel.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
              {['React', 'TypeScript', 'Tailwind', 'Node.js', 'UI Motion'].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border/60 bg-card/40 px-4 py-2 text-xs font-mono text-muted-foreground backdrop-blur-md"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ['01', 'Portfolio booting'],
                ['02', 'Interactive UI'],
                ['03', 'Tech-forward visuals'],
              ].map(([num, label]) => (
                <div key={num} className="rounded-2xl border border-border/50 bg-card/50 p-4 text-left backdrop-blur-xl">
                  <div className="mb-2 font-mono text-xs tracking-[0.35em] text-accent">{num}</div>
                  <div className="text-sm text-muted-foreground">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-accent/15 via-primary/10 to-pink-500/10 blur-3xl" />
            <div className="rounded-[2rem] border border-white/10 bg-card/55 p-6 shadow-[0_0_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl md:p-8">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-500/70" />
                  <span className="h-3 w-3 rounded-full bg-amber-400/70" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">boot_sequence.log</span>
              </div>

              <div className="relative flex flex-col items-center justify-center py-4">
                <div className="absolute inset-0 rounded-full bg-accent/10 blur-3xl" />
                <div className="relative">
                  <ProgressRing progress={progress} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="font-mono text-3xl font-semibold text-foreground md:text-4xl">{Math.round(progress)}%</span>
                    <span className="mt-2 font-mono text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
                      loading
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3 font-mono text-xs text-muted-foreground">
                {[
                  '> loading creative modules',
                  '> activating motion layer',
                  '> syncing responsive sections',
                  '> preparing elegant interface',
                ].map((line, index) => (
                  <div key={line} className="flex items-center gap-3">
                    <span className="text-accent">◆</span>
                    <span style={{ animationDelay: `${index * 0.18}s` }} className="animate-pulse">
                      {line}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 h-2 overflow-hidden rounded-full bg-secondary/40">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-accent via-primary to-pink-500 transition-all duration-75"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <button
                onClick={() => {
                  sessionStorage.setItem('introSeen', 'true');
                  onComplete();
                }}
                className="mt-6 w-full rounded-xl border border-border/60 bg-background/40 px-4 py-3 font-mono text-xs uppercase tracking-[0.35em] text-muted-foreground transition-colors hover:border-accent/40 hover:text-accent"
              >
                skip intro
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.25) 2px, rgba(255,255,255,0.25) 4px)',
        }}
      />
    </div>
  );
};

export default IntroScreen;