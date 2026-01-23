import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, ArrowLeft, Filter, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThemeProvider } from '@/contexts/ThemeContext';
import ThemeToggle from '@/components/ui/ThemeToggle';

// Matrix code rain characters (code-related symbols)
const CODE_CHARS = [
  '{', '}', '(', ')', '[', ']', '<', '>', '/', '\\', '|', '-', '+', '=', '*', '&', '%', '$', '#', '@', '!',
  'const', 'let', 'var', 'if', 'else', 'for', 'while', 'return', 'function', 'class', 'import', 'export',
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
  '=>', '&&', '||', '===', '!==', '++', '--', '::', '->', '<?', '?>', '<!--', '-->'
];

const MatrixCodeRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);
    const chars: string[] = Array(columns).fill('').map(() => 
      CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)]
    );

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Get current theme
        const isDark = document.documentElement.classList.contains('dark');
        
        // Gradient effect - brighter at the head
        const gradient = ctx.createLinearGradient(0, drops[i] * fontSize - 50, 0, drops[i] * fontSize);
        if (isDark) {
          gradient.addColorStop(0, 'rgba(0, 255, 170, 0)');
          gradient.addColorStop(0.5, 'rgba(0, 255, 170, 0.5)');
          gradient.addColorStop(1, 'rgba(0, 255, 170, 1)');
        } else {
          gradient.addColorStop(0, 'rgba(99, 102, 241, 0)');
          gradient.addColorStop(0.5, 'rgba(99, 102, 241, 0.3)');
          gradient.addColorStop(1, 'rgba(99, 102, 241, 0.8)');
        }
        
        ctx.fillStyle = gradient;
        
        const char = chars[i];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        // Randomly change the character
        if (Math.random() > 0.95) {
          chars[i] = CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
        }

        // Reset drop to top with random delay
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-30"
    />
  );
};
const allProjects = [
  {
    id: 1,
    title: 'PetNest India',
    category: 'Full Stack',
    description: 'A modern e-commerce solution with real-time inventory, payment processing, and admin dashboard.',
    image: 'petnest.png',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    demoUrl: 'https://petnestindia.netlify.app/',
    githubUrl: 'https://github.com/devil52chiku/pet-nest-hub.git',
  },
  {
    id: 2,
    title: 'PlantWorld',
    category: 'Full Stack',
    description: 'An online plant store with dynamic product listings, user reviews, and a personalized shopping experience.',
    image: 'plantworld.png',
    tags: ['Typescript', 'Node.js', 'PostgreSQL', 'TailwindCSS'],
    demoUrl: 'https://plantworldindia.netlify.app',
    githubUrl: 'https://github.com/devil52chiku/plantworld.git',
  },
  {
    id: 3,
    title: 'Asus Service Center',
    category: 'UI/UX',
    description: 'A sleek service center website for ASUS with interactive features and 3D product showcases.',
    image: '/asus.png',
    tags: ['React', 'Three.js', 'TailwindCSS', 'ShadcnUI'],
    demoUrl: 'https://asusservice.netlify.app',
    githubUrl: 'https://github.com/jr777pal/ASUS.git',
  },
  {
    id: 4,
    title: 'Calculator Pro',
    category: 'Web App',
    description: 'A feature-rich calculator app with scientific functions, history tracking, and a user-friendly interface.',
    image: '/calculator.png',
    tags: ['React', 'RESTAPI', 'TailwindCSS'],
    demoUrl: 'https://calculatorproapp.netlify.app/',
    githubUrl: 'https://github.com/jr777pal/Calculator-Pro',
  },
  {
    id: 5,
    title: 'Teachers On Duty',
    category: 'Web App',
    description: 'A real time teacher booking for tution classes with interactive dashboard and analytics.',
    image: '/teachersonduty.png',
    tags: ['HTML', 'CSS', 'JavaScript', 'PHP'],
    demoUrl: 'https://teachersonduty.netlify.app/',
    githubUrl: 'https://github.com/jr777pal/Teacher-s-On-Duty',
  },
  {
    id: 6,
    title: 'Restraunt Menu',
    category: 'Frontend',
    description: 'A modern restaurant menu app with dynamic categories, item customization, and seamless ordering.',
    image: '/quickfoodz.png',
    tags: ['HTML', 'CSS', 'JavaScript'],
    demoUrl: 'https://quickfoodz.netlify.app/',
    githubUrl: 'https://github.com/jr777pal/Quick-Foodz',
  },
];

const categories = ['All', 'Full Stack', 'Frontend', 'Web App', 'UI/UX'];

const ProjectCard: React.FC<{ project: typeof allProjects[0]; index: number }> = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative"
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect */}
      <div className={cn(
        "absolute -inset-1 bg-gradient-to-r from-accent via-primary to-pink-500 rounded-xl blur-lg transition-opacity duration-500",
        isHovered ? "opacity-50" : "opacity-0"
      )} />
      
      <div className="relative glass rounded-xl overflow-hidden border border-border/50 group-hover:border-accent/50 transition-all duration-500">
        {/* Image with 3D tilt effect */}
        <div className="relative h-48 overflow-hidden perspective-1000">
          <img
            src={project.image}
            alt={project.title}
            className={cn(
              "w-full h-full object-cover transition-all duration-700",
              isHovered && "scale-110 rotate-1"
            )}
          />
          {/* Holographic overlay */}
          <div className={cn(
            "absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-primary/20 transition-opacity duration-500",
            isHovered ? "opacity-100" : "opacity-0"
          )} />
          
          {/* Scan line effect */}
          <div className={cn(
            "absolute inset-0 overflow-hidden",
            isHovered && "animate-scan-line"
          )}>
            <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />
          </div>
          
          {/* Category badge */}
          <div className="absolute top-4 left-4 px-3 py-1 glass rounded-full text-xs font-medium text-accent border border-accent/30">
            {project.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <h3 className="text-xl font-bold group-hover:text-accent transition-colors flex items-center gap-2">
            <span className="text-accent opacity-50">&lt;</span>
            {project.title}
            <span className="text-accent opacity-50">/&gt;</span>
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {project.description}
          </p>

          {/* Tags with hover effect */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, i) => (
              <span
                key={tag}
                className={cn(
                  "px-2 py-1 text-xs bg-secondary/50 rounded-full text-muted-foreground border border-border/50",
                  "hover:border-accent/50 hover:text-accent transition-all duration-300 cursor-default",
                  "hover:scale-105 hover:shadow-glow"
                )}
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              size="sm"
              className="flex-1 bg-gradient-to-r from-accent to-primary text-primary-foreground hover:opacity-90 group/btn"
              onClick={() => window.open(project.demoUrl, '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
              Live Demo
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex-1 hover:border-accent/50 group/btn"
              onClick={() => window.open(project.githubUrl, '_blank')}
            >
              <Github className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
              Code
            </Button>
          </div>
        </div>

        {/* Corner decoration */}
        <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
          <div className={cn(
            "absolute -right-8 -top-8 w-16 h-16 bg-gradient-to-br from-accent/30 to-transparent rotate-45 transition-all duration-500",
            isHovered && "scale-150"
          )} />
        </div>
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = allProjects.filter(project => {
    const matchesCategory = activeCategory === 'All' || project.category === activeCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background relative overflow-hidden">
        {/* Matrix code rain background */}
        <MatrixCodeRain />
        
        {/* Background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(var(--accent-rgb),0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--accent-rgb),0.03)_1px,transparent_1px)] bg-[size:50px_50px] z-[1]" />
        
        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse z-[1]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse z-[1]" style={{ animationDelay: '1s' }} />

        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 glass py-4">
          <div className="container mx-auto px-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home</span>
            </Link>
            <ThemeToggle />
          </div>
        </header>

        <main className="container mx-auto px-4 pt-24 pb-16 relative z-10">
          {/* Page header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-4">
              <span className="text-accent font-mono text-sm">&lt;projects&gt;</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              All <span className="gradient-text">Projects</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore my complete portfolio of work, from full-stack applications to innovative solutions.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search projects or technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 glass border-border/50 focus:border-accent/50"
              />
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                    activeCategory === category
                      ? "bg-gradient-to-r from-accent to-primary text-primary-foreground"
                      : "glass text-muted-foreground hover:text-foreground hover:border-accent/50"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Projects grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No projects found matching your criteria.</p>
            </div>
          )}
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Projects;
