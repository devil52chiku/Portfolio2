import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import ThemeTransition from '@/components/ui/ThemeTransition';
import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ContactSection from '@/components/sections/ContactSection';
import FooterSection from '@/components/sections/FooterSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import ParticleBackground from '@/components/three/ParticleBackground';
import IntroScreen from '@/components/ui/IntroScreen';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';
import LikeButton from '@/components/ui/LikeButton';

const CursorGlow: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <div
        className="absolute w-96 h-96 rounded-full bg-accent/10 blur-3xl transition-transform duration-75"
        style={{
          transform: `translate(${position.x - 192}px, ${position.y - 192}px)`,
        }}
      />
    </div>
  );
};

// Matrix-style falling code effect
const MatrixRain: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.03]">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute top-0 text-primary font-mono text-xs animate-matrix-fall"
          style={{
            left: `${i * 5}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${10 + Math.random() * 10}s`
          }}
        >
          {Array.from({ length: 30 }).map((_, j) => (
            <div key={j} className="opacity-80">
              {String.fromCharCode(0x30A0 + Math.random() * 96)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const Portfolio: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true); // Always show intro for testing
  const [isLoading, setIsLoading] = useState(true);
  const [contentReady, setContentReady] = useState(false);

  const handleIntroComplete = () => {
    localStorage.setItem('portfolio_visited', 'true');
    setShowIntro(false);
  };

  useEffect(() => {
    // If intro is shown, wait for it to complete before showing loading
    if (!showIntro) {
      // Show loading skeleton briefly
      const loadingTimer = setTimeout(() => {
        setIsLoading(false);
        // Small delay before showing content with animation
        setTimeout(() => setContentReady(true), 100);
      }, 1200);
      return () => clearTimeout(loadingTimer);
    }
  }, [showIntro]);

  // When intro completes, trigger loading phase
  useEffect(() => {
    if (!showIntro && isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        setTimeout(() => setContentReady(true), 100);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [showIntro, isLoading]);

  return (
    <ThemeProvider>
      {/* Intro Screen */}
      {showIntro && <IntroScreen onComplete={handleIntroComplete} />}
      
      {/* Loading Skeleton */}
      {!showIntro && isLoading && <LoadingSkeleton />}

      <div className={`relative min-h-screen bg-background overflow-hidden transition-opacity duration-500 ${contentReady || (!showIntro && !isLoading) ? 'opacity-100' : 'opacity-0'}`}>
        {/* Matrix rain background */}
        <MatrixRain />
        
        {/* Interactive particle background */}
        <ParticleBackground />
        
        {/* Theme transition overlay */}
        <ThemeTransition />

        {/* Cursor glow effect */}
        <CursorGlow />

        {/* Scan line effect */}
        <div className="fixed inset-0 pointer-events-none z-50 bg-scanlines opacity-[0.02]" />

        {/* Navigation */}
        <Navbar />

        {/* Main content */}
        <main className="relative z-10">
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <TestimonialsSection />
          <ContactSection />
        </main>

        {/* Footer */}
        <FooterSection />

        {/* Like Button */}
        <LikeButton />
      </div>
    </ThemeProvider>
  );
};

export default Portfolio;
