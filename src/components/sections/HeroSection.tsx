import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Code2, Braces, Github, Linkedin, Mail, ChevronDown } from 'lucide-react';
import GeometricAvatar from '@/components/three/GeometricAvatar';
import FloatingShapes from '@/components/three/FloatingShapes';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
const roles = ['Full-Stack Developer', 'UI/UX Designer', 'Problem Solver', 'Creative Coder'];
const HeroSection: React.FC = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  useEffect(() => {
    const role = roles[currentRole];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < role.length) {
          setDisplayedText(role.slice(0, displayedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(displayedText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentRole(prev => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 50 : 100);
    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentRole]);
  return <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <FloatingShapes />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text content */}
          <div className="flex-1 text-center lg:text-left space-y-6">
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
              </span>
              <span className="text-sm text-muted-foreground">Available for work</span>
            </div>

            {/* Background code symbols - positioned behind text */}
            <div className="absolute -left-8 -top-4 text-accent/10 font-mono text-6xl md:text-8xl select-none pointer-events-none -z-10">
              &gt;_
            </div>
            <div className="absolute -right-4 top-1/2 text-primary/10 font-mono text-5xl md:text-7xl select-none pointer-events-none -z-10">
              &lt;/&gt;
            </div>
            <div className="absolute left-1/4 -bottom-8 text-pink-500/10 font-mono text-5xl md:text-7xl select-none pointer-events-none -z-10">
              {'{ }'}
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight relative z-10">
              <span className="block text-foreground">Hi, I'm</span>
              <span data-text="Alex Chen" className="gradient-text glitch-hover inline-block text-6xl font-mono">
                Jyoti Ranjan Pal  
              </span>
            </h1>

            {/* Typewriter effect */}
            <div className="h-12 flex items-center justify-center lg:justify-start">
              <span className="text-xl md:text-2xl text-muted-foreground">
                {displayedText}
                <span className="animate-pulse text-accent">|</span>
              </span>
            </div>

            <p className="text-muted-foreground text-lg max-w-xl mx-auto lg:mx-0">
              Building beautiful, performant web experiences with modern technologies.
              Passionate about clean code and innovative solutions.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link to="/projects">
                <Button size="lg" className="relative overflow-hidden group bg-gradient-to-r from-accent via-primary to-pink-500 hover:opacity-90 text-primary-foreground btn-glitch">
                  <span className="relative z-10">View Projects</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-pink-500 to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Button>
              </Link>
              
              <a 
                href="https://drive.google.com/uc?id=1r-WPfzCWmEDmz8khZcsB36kTjA2BPM-O"
                download
              >
                <Button variant="outline" size="lg" className="gradient-border bg-background hover:bg-secondary/50 btn-glitch">
                  Download CV
                </Button>
              </a>
            </div>

            {/* Social links */}
            <div className="flex gap-4 justify-center lg:justify-start pt-4">
              {[{
              icon: Github,
              href: 'https://github.com/jr777pal',
              label: 'GitHub'
            }, {
              icon: Linkedin,
              href: 'https://www.linkedin.com/in/jyoti-ranjan-pal-994821385/',
              label: 'LinkedIn'
            }, {
              icon: Mail,
              href: 'mailto:jyotiranjanpal777@gmail.com',
              label: 'Email'
            }].map(({
              icon: Icon,
              href,
              label
            }) => <a key={label} href={href} className={cn("relative w-12 h-12 rounded-full glass", "flex items-center justify-center", "group overflow-hidden", "hover:scale-110 transition-transform duration-300")} aria-label={label}>
                  <Icon className="w-5 h-5 text-foreground group-hover:text-accent transition-colors" />
                  <div className="absolute inset-0 border-2 border-transparent rounded-full group-hover:border-accent/50 animate-rotate-border" style={{
                borderImage: 'linear-gradient(135deg, hsl(var(--accent)), hsl(var(--primary)), transparent) 1',
                opacity: 0
              }} />
                </a>)}
            </div>
          </div>

          {/* 3D Avatar */}
          <div className="flex-1 flex justify-center">
            <GeometricAvatar />
          </div>
        </div>

        {/* Floating tech icons */}
        <div className="hidden lg:flex absolute bottom-32 left-10 gap-8">
          {[Terminal, Code2, Braces].map((Icon, i) => <div key={i} className={cn("p-4 glass rounded-xl animate-float", i === 1 && "animate-float-delayed")} style={{
          animationDelay: `${i * 0.5}s`
        }}>
              <Icon className="w-8 h-8 text-accent" />
            </div>)}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-sm text-muted-foreground">Scroll</span>
          <ChevronDown className="w-6 h-6 text-accent animate-bounce-slow" />
        </div>
      </div>
    </section>;
};
export default HeroSection;