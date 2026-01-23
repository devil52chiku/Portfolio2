import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, Users, Clock, TrendingUp, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import ScrollReveal from '@/components/ui/ScrollReveal';

const projects = [
  {
    id: 1,
    title: 'PlantWorld',
    category: 'Full Stack',
    description: 'A modern e-commerce solution with real-time inventory, payment processing, and admin dashboard.',
    longDescription: 'Built with Next.js and Stripe integration, featuring real-time inventory management, secure checkout, and comprehensive analytics dashboard.',
    image: 'plantworld.png',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Three.js'],
    stats: { users: '10K+', uptime: '99.9%', revenue: '$500K' },
    demoUrl: '#',
    githubUrl: '#',
  },
  {
    id: 2,
    title: 'PetNest',
    category: 'Full Stack',
    description: 'A pet buying and adoption platform with AI-powered recommendations and seamless user experience.',
    longDescription: 'Your trusted home for finding, adopting, and caring for happy, healthy pets.Connecting loving families with pets and everything they need to thrive.',
    image: '/petnest.png',
    tags: ['TypeScript', 'Node.js', 'PostgreSQL', 'Three.js'],
    stats: { users: '5K+', uptime: '99.5%', tasks: '1M+' },
    demoUrl: '#',
    githubUrl: '#',
  },
  {
    id: 3,
    title: 'Asus Service Center',
    category: 'UI/UX',
    description: 'Live data visualization dashboard with customizable widgets and real-time updates.',
    longDescription: 'WebSocket-powered dashboard delivering sub-second latency data visualization with interactive charts and exportable reports.',
    image: '/asus.png',
    tags: ['React', 'Three.js', 'Tailwind CSS', 'Vite'],
    stats: { users: '2K+', uptime: '99.8%', dataPoints: '50M' },
    demoUrl: '#',
    githubUrl: '#',
  },
];

const ProjectCard: React.FC<{
  project: typeof projects[0];
  index: number;
}> = ({ project, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isFlipped) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 15;
    const y = (e.clientY - rect.top - rect.height / 2) / 15;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div
      className="perspective-1000 h-[420px] cursor-pointer group"
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* 3D Glow effect */}
      <div
        className={cn(
          "absolute -inset-2 bg-gradient-to-r from-accent via-primary to-pink-500 rounded-2xl blur-xl transition-opacity duration-500 -z-10",
          isHovered && !isFlipped ? "opacity-40" : "opacity-0"
        )}
      />
      <div
        className={cn(
          "relative w-full h-full transition-all duration-300 preserve-3d",
          isFlipped && "rotate-y-180"
        )}
        style={{
          transform: isFlipped
            ? 'rotateY(180deg)'
            : `rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg) translateZ(${isHovered ? 20 : 0}px)`,
          transition: isFlipped ? 'transform 0.7s' : 'transform 0.1s ease-out',
        }}
      >
        {/* Front side */}
        <div className="absolute inset-0 backface-hidden">
          <div className="relative h-full glass rounded-xl overflow-hidden border border-border/50 group-hover:border-accent/50 transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(0,255,170,0.2)]">
            {/* 3D Shine overlay */}
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 pointer-events-none z-20",
                isHovered && "opacity-100"
              )}
              style={{
                background: isHovered
                  ? `radial-gradient(circle at ${50 + mousePos.x * 3}% ${50 + mousePos.y * 3}%, rgba(255,255,255,0.15) 0%, transparent 50%)`
                  : undefined,
              }}
            />
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Holographic scan line effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div
                className={cn(
                  "absolute inset-x-0 h-20 bg-gradient-to-b from-accent/20 to-transparent transition-all duration-700",
                  isHovered ? "top-0 opacity-100" : "-top-20 opacity-0"
                )}
              />
              
              {/* Category badge with glow */}
              <div className="absolute top-4 left-4 px-3 py-1 glass rounded-full text-xs font-medium text-accent border border-accent/30 shadow-[0_0_10px_rgba(0,255,170,0.3)]">
                {project.category}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-bold group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm line-clamp-2">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs bg-secondary rounded-full text-muted-foreground group-hover:scale-105 transition-transform"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Flip hint */}
              <p className="text-xs text-muted-foreground text-center pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                Click to see details
              </p>
            </div>
          </div>
        </div>

        {/* Back side */}
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <div className="relative h-full glass rounded-xl overflow-hidden border border-accent/30 p-6 flex flex-col">
            {/* Corner glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 blur-3xl" />

            <h3 className="text-xl font-bold gradient-text mb-4">{project.title}</h3>
            <p className="text-muted-foreground text-sm flex-1">
              {project.longDescription}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 my-6">
              {Object.entries(project.stats).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="text-lg font-bold text-accent">{value}</div>
                  <div className="text-xs text-muted-foreground capitalize">{key}</div>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <Button
                size="sm"
                className="flex-1 bg-gradient-to-r from-accent to-primary text-primary-foreground"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(project.demoUrl, '_blank');
                }}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex-1"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(project.githubUrl, '_blank');
                }}
              >
                <Github className="w-4 h-4 mr-2" />
                Code
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <ScrollReveal variant="fade-up" triggerOnce={false}>
          <div className="text-center mb-16">
            <span className="text-accent text-sm font-mono uppercase tracking-wider">
              {`> projects.fetch()`}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mt-4">
              Featured <span className="gradient-text glitch-hover" data-text="Projects">Projects</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto font-mono text-sm">
              {`// A selection of projects that showcase my skills`}
            </p>
          </div>
        </ScrollReveal>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ScrollReveal key={project.id} variant="fade-up" delay={index * 150} triggerOnce={false}>
              <ProjectCard project={project} index={index} />
            </ScrollReveal>
          ))}
        </div>

        {/* View all button */}
        <ScrollReveal variant="zoom-in" delay={400} triggerOnce={false}>
          <div className="text-center mt-12">
            <Link to="/projects">
              <Button
                variant="outline"
                size="lg"
                className="gradient-border bg-background hover:bg-secondary/50 group"
              >
                View All Projects
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ProjectsSection;
