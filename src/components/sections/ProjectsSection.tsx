import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, Users, Clock, TrendingUp, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import ScrollReveal from '@/components/ui/ScrollReveal';

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    category: 'Full Stack',
    description: 'A modern e-commerce solution with real-time inventory, payment processing, and admin dashboard.',
    longDescription: 'Built with Next.js and Stripe integration, featuring real-time inventory management, secure checkout, and comprehensive analytics dashboard.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    stats: { users: '10K+', uptime: '99.9%', revenue: '$500K' },
    demoUrl: '#',
    githubUrl: '#',
  },
  {
    id: 2,
    title: 'AI Task Manager',
    category: 'SaaS',
    description: 'Smart task management with AI-powered prioritization and natural language processing.',
    longDescription: 'Leveraging OpenAI GPT-4 for intelligent task categorization, deadline suggestions, and automated workflow optimization.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&auto=format&fit=crop',
    tags: ['TypeScript', 'OpenAI', 'Redis', 'Docker'],
    stats: { users: '5K+', uptime: '99.5%', tasks: '1M+' },
    demoUrl: '#',
    githubUrl: '#',
  },
  {
    id: 3,
    title: 'Real-time Analytics',
    category: 'Dashboard',
    description: 'Live data visualization dashboard with customizable widgets and real-time updates.',
    longDescription: 'WebSocket-powered dashboard delivering sub-second latency data visualization with interactive charts and exportable reports.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop',
    tags: ['React', 'D3.js', 'WebSocket', 'AWS'],
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

  return (
    <div
      className="perspective-1000 h-[420px] cursor-pointer group"
      onClick={() => setIsFlipped(!isFlipped)}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div
        className={cn(
          "relative w-full h-full transition-transform duration-700 preserve-3d",
          isFlipped && "rotate-y-180"
        )}
      >
        {/* Front side */}
        <div className="absolute inset-0 backface-hidden">
          <div className="relative h-full glass rounded-xl overflow-hidden border border-border/50 group-hover:border-accent/30 transition-colors">
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Scan line effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Category badge */}
              <div className="absolute top-4 left-4 px-3 py-1 glass rounded-full text-xs font-medium text-accent">
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
        <ScrollReveal variant="fade-up">
          <div className="text-center mb-16">
            <span className="text-accent text-sm font-medium uppercase tracking-wider">
              My Work
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mt-4">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              A selection of projects that showcase my skills and passion for building
              exceptional digital experiences.
            </p>
          </div>
        </ScrollReveal>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ScrollReveal key={project.id} variant="fade-up" delay={index * 150}>
              <ProjectCard project={project} index={index} />
            </ScrollReveal>
          ))}
        </div>

        {/* View all button */}
        <ScrollReveal variant="zoom-in" delay={400}>
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
