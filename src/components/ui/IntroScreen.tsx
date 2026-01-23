import React, { useState, useEffect, useRef } from 'react';

const MatrixRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Matrix-style characters with code symbols
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>/{}[]()=+-*&%$#@!;:.,?|\\~`';
    const charArray = chars.split('');
    const fontSize = 25;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Cyan/green code-style colors
        const hue = 160 + Math.random() * 40; // Cyan to green range
        ctx.fillStyle = `hsl(${hue}, 100%, ${40 + Math.random() * 30}%)`;

        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

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
      className="absolute inset-0 opacity-20"
      style={{ zIndex: 0 }}
    />
  );
};

const IntroScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [textFade, setTextFade] = useState(false);
  const [skipIntro, setSkipIntro] = useState(false);

  useEffect(() => {
    // If user has already seen the intro this session, skip showing it again
    const hasSeen = sessionStorage.getItem('introSeen');
    if (hasSeen) {
      setSkipIntro(true);
      onComplete();
    }
  }, [onComplete]);

  useEffect(() => {
    if (skipIntro) return;

    // Start loading animation immediately
    const duration = 3000; // 3 seconds
    const interval = 50; // Update every 50ms
    const steps = duration / interval;
    const increment = 100 / steps;
    
    let currentProgress = 0;
    const timer = setInterval(() => {
      currentProgress += increment;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(timer);
        // After loading completes, fade the text slightly
        setTimeout(() => {
          setTextFade(true);
          // Complete the intro after fade
          setTimeout(() => {
            sessionStorage.setItem('introSeen', 'true');
            onComplete();
          }, 500);
        }, 200);
      }
      setProgress(currentProgress);
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete, skipIntro]);

  if (skipIntro) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-background flex items-center justify-center">
      {/* Matrix rain background */}
      <MatrixRain />
      
      <div className="text-center select-none relative z-10">
        {/* Welcome text */}
     <h1
  className={`text-4xl md:text-6xl lg:text-7xl font-medium tracking-normal mb-8
  text-cyan-500 transition-opacity duration-400 ${
    textFade ? 'opacity-40' : 'opacity-100'
  }`}
>
  WELCOME TO MY PORTFOLIO
</h1>
        {/* Loading bar */}
        <div className="w-80 md:w-96 mx-auto">
          <div className="h-2 bg-muted rounded-full overflow-hidden border border-border">
            <div
              className="h-full bg-primary transition-all duration-100 ease-linear rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroScreen;