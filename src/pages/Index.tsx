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

const Portfolio: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-background overflow-hidden">
        {/* Theme transition overlay */}
        <ThemeTransition />

        {/* Cursor glow effect */}
        <CursorGlow />

        {/* Navigation */}
        <Navbar />

        {/* Main content */}
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </main>

        {/* Footer */}
        <FooterSection />
      </div>
    </ThemeProvider>
  );
};

export default Portfolio;
