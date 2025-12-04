import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Book, Cloud } from 'lucide-react';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "glass py-3 shadow-lg"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="text-2xl font-bold gradient-text">
          &lt;Dev /&gt;
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                "relative text-muted-foreground hover:text-foreground",
                "transition-colors duration-300",
                "after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5",
                "after:bg-gradient-to-r after:from-accent after:to-primary",
                "after:transition-all after:duration-300",
                "hover:after:w-full"
              )}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Theme Toggle, Library & Mobile Menu Button */}
        <div className="flex items-center gap-2">
          <Link to="/library">
            <Button
              variant="ghost"
              size="sm"
              className="hidden md:flex items-center gap-2 glass border border-border/50 hover:border-accent/50 hover:bg-secondary/50"
            >
              <Book className="w-4 h-4 text-accent" />
              <span className="text-sm">Library</span>
            </Button>
          </Link>
          
          <ThemeToggle />
          
          <button
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden absolute top-full left-0 right-0 glass overflow-hidden transition-all duration-300",
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-muted-foreground hover:text-foreground transition-colors py-2 border-b border-border/50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <Link
            to="/library"
            className="text-muted-foreground hover:text-foreground transition-colors py-2 border-b border-border/50 flex items-center gap-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Book className="w-4 h-4 text-accent" />
            Library
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
