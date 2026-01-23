import React from 'react';
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: Github, href: 'https://github.com/jr777pal', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/jyoti-ranjan-pal-994821385/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:jyotiranjanpal777@gmail.com', label: 'Email' },
];

const FooterSection: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative pt-16 pb-8 overflow-hidden">
      {/* Gradient border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />

      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Logo & description */}
          <div className="space-y-4">
            <a href="#home" className="text-2xl font-bold gradient-text inline-block">&lt;Jyoti Ranjan /&gt;</a>
            <p className="text-muted-foreground text-sm max-w-xs">
              Building beautiful, performant web experiences with modern technologies
              and a passion for clean code.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col items-center">
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-muted-foreground hover:text-accent transition-colors text-sm"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Social links */}
          <div className="flex flex-col items-center md:items-end">
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className={cn(
                    "w-10 h-10 rounded-full glass",
                    "flex items-center justify-center",
                    "hover:scale-110 hover:bg-accent/20 transition-all duration-300",
                    "group"
                  )}
                  aria-label={label}
                >
                  <Icon className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border mb-8" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {currentYear} Jyoti Ranjan Pal. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with <Heart className="w-4 h-4 text-destructive fill-destructive" /> using React & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
