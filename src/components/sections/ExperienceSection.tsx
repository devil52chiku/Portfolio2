import React, { useState } from 'react';
import { Briefcase, MapPin, Calendar, ChevronRight, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Internship' | 'Freelance';
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

const experiences: Experience[] = [
  {
    id: 1,
    title: 'Full-Stack Developer Intern',
    company: 'Elewayte by  Realtekh Software Services Pvt Ltd',
    location: 'Bengaluru, India',
    type: 'Internship',
    startDate: 'Feb 2025',
    endDate: 'Present',
    description: 'Leading development of enterprise-scale web applications using modern technologies.',
    achievements: [
      'Architected microservices handling 1M+ daily requests',
      'Reduced page load time by 60% through optimization',
      'Undertook end-to-end project ownership from design to deployment'
      ,
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'],
  },
  {
    id: 2,
    title: 'Full-Stack Developer',
    company: 'Freelance',
    location: 'Remote',
    type: 'Full-time',
    startDate: 'Dec 2025',
    endDate: 'Present',
    description: 'Built responsive web applications with focus on performance and user experience.',
    achievements: [
      'Developed component library used across projects',
      'Improved accessibility score from 65 to 98',
      'Implemented real-time collaboration features',
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
  },
  {
    id: 3,
    title: 'Technical Marketing Manager',
    company: 'Unirey Electronics',
    location: 'Bengaluru, India',
    type: 'Full-time',
    startDate: 'Jan 2023',
    endDate: 'Oct 2025',
    description: 'Managed technical marketing initiatives and contributed to client projects while learning modern web development practices.',
    achievements: [
      'Spearheaded digital marketing campaigns increasing lead generation by 40%',
      'Learned agile development methodology',
      'Collaborated with developers to understand product features for marketing content',
    ],
    technologies: ['Ms Excel', 'Zoom', 'Outlook', 'Word', 'PowerPoint'],
  },
];

const typeColors: Record<Experience['type'], string> = {
  'Full-time': 'bg-green-500/20 text-green-400 border-green-500/30',
  'Part-time': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Internship': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'Freelance': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
};

const ExperienceCard: React.FC<{ exp: Experience; index: number; isLast: boolean }> = ({
  exp,
  index,
  isLast,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative flex gap-6">
      {/* Timeline */}
      <div className="hidden md:flex flex-col items-center">
        {/* Dot */}
        <div
          className={cn(
            "relative w-4 h-4 rounded-full border-2 transition-all duration-300 z-10",
            isHovered
              ? "border-accent bg-accent scale-125 shadow-[0_0_15px_rgba(0,255,170,0.5)]"
              : "border-muted-foreground bg-background"
          )}
        >
          {/* Pulse effect */}
          {index === 0 && (
            <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-30" />
          )}
        </div>
        {/* Line */}
        {!isLast && (
          <div className="w-0.5 flex-1 bg-gradient-to-b from-accent/50 via-muted-foreground/30 to-transparent" />
        )}
      </div>

      {/* Card */}
      <div
        className="flex-1 pb-8 group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={cn(
            "relative p-6 glass rounded-2xl border border-border/50 transition-all duration-500 cursor-pointer",
            "hover:border-accent/50 hover:shadow-[0_0_40px_rgba(0,255,170,0.1)]",
            isHovered && "translate-x-2"
          )}
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            transform: isHovered ? 'perspective(1000px) rotateY(-2deg) translateX(8px)' : 'perspective(1000px) rotateY(0deg)',
          }}
        >
          {/* Glowing border on hover */}
          <div
            className={cn(
              "absolute -inset-px rounded-2xl bg-gradient-to-r from-accent via-primary to-pink-500 opacity-0 transition-opacity duration-500 -z-10",
              isHovered && "opacity-20"
            )}
          />

          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-bold group-hover:text-accent transition-colors">
                  {exp.title}
                </h3>
                <span className={cn("px-2 py-0.5 text-xs rounded-full border", typeColors[exp.type])}>
                  {exp.type}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Building2 className="w-4 h-4 text-accent" />
                  {exp.company}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {exp.location}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground font-mono">
              <Calendar className="w-4 h-4" />
              {exp.startDate} - {exp.endDate}
            </div>
          </div>

          {/* Description */}
          <p className="text-muted-foreground mb-4">{exp.description}</p>

          {/* Expandable content */}
          <div
            className={cn(
              "grid transition-all duration-500",
              isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            )}
          >
            <div className="overflow-hidden">
              {/* Achievements */}
              <div className="mb-4 pt-4 border-t border-border/50">
                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-accent" />
                  Key Achievements
                </h4>
                <ul className="space-y-2 ml-6">
                  {exp.achievements.map((achievement, i) => (
                    <li
                      key={i}
                      className="text-sm text-muted-foreground relative before:content-['▹'] before:absolute before:-left-4 before:text-accent"
                    >
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 pt-2">
            {exp.technologies.map((tech) => (
              <span
                key={tech}
                className={cn(
                  "px-2 py-1 text-xs bg-secondary/50 rounded-full text-muted-foreground border border-border/50",
                  "hover:border-accent/50 hover:text-accent transition-all duration-300"
                )}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Expand indicator */}
          <div className="absolute bottom-2 right-4 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
            {isExpanded ? 'Click to collapse' : 'Click to expand'}
          </div>

          {/* 3D shine effect */}
          <div
            className={cn(
              "absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 pointer-events-none",
              isHovered && "opacity-100"
            )}
          />
        </div>
      </div>
    </div>
  );
};

const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <ScrollReveal variant="fade-up" triggerOnce={false}>
          <div className="text-center mb-16">
            <span className="text-accent text-sm font-mono uppercase tracking-wider">
              {`> experience.timeline()`}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mt-4">
              <Briefcase className="inline-block w-10 h-10 mr-3 text-accent" />
              Work <span className="gradient-text glitch-hover" data-text="Experience">Experience</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto font-mono text-sm">
              {`// My professional journey and career milestones`}
            </p>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto">
          {experiences.map((exp, index) => (
            <ScrollReveal key={exp.id} variant="fade-left" delay={index * 150} triggerOnce={false}>
              <ExperienceCard exp={exp} index={index} isLast={index === experiences.length - 1} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
