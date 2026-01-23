import React, { useState } from 'react';
import { GraduationCap, Calendar, MapPin, ChevronRight, BookOpen, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface EducationItem {
  id: number;
  degree: string;
  institution: string;
  field: string;
  startYear: string;
  endYear: string;
  location: string;
  type: 'University' | 'School' | 'Certification' | 'Bootcamp';
  description?: string;
  highlights?: string[];
  courses?: string[];
}

const educationData: EducationItem[] = [
  {
    id: 1,
    degree: "Bachelor of Technology",
    institution: "Bangalore College of Engineering and Technology",
    field: "Computer Science / Information Technology",
    startYear: "2022",
    endYear: "2026",
    location: "Bengaluru, India",
    type: "University",
    description: "Specialized in Web Development, Machine Learning and Software Engineering",
    highlights: [
      "CGPA: 8.2",
      "Dean's List - All Semesters",
      "President of Tech Club"
    ],
    courses: ["Data Structures", "Algorithms", "Web Development", "Machine Learning"]
  },
  {
    id: 2,
    degree: "CHSE (Class 12th)",
    institution: "Mothers International Higher Secondary School",
    field: "Science Stream",
    startYear: "2020",
    endYear: "2022",
    location: "Berhampur, India",
    type: "School",
    highlights: [
      "Percentage: 71%",
      "College Union President"
    ],
    courses: ["Physics", "Chemistry", "Mathematics", "Computer Science"]
  }
];

const typeColors: Record<EducationItem['type'], string> = {
  'University': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'School': 'bg-green-500/20 text-green-400 border-green-500/30',
  'Certification': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'Bootcamp': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
};

const EducationCard: React.FC<{ edu: EducationItem; index: number; isLast: boolean }> = ({
  edu,
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
          {/* Pulse effect for current education */}
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
                  {edu.degree}
                </h3>
                <span className={cn("px-2 py-0.5 text-xs rounded-full border", typeColors[edu.type])}>
                  {edu.type}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <GraduationCap className="w-4 h-4 text-accent" />
                  {edu.institution}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {edu.location}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground font-mono">
              <Calendar className="w-4 h-4" />
              {edu.startYear} - {edu.endYear}
            </div>
          </div>

          {/* Field of study */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/50 rounded-full text-sm text-muted-foreground mb-4">
            <BookOpen className="w-4 h-4 text-accent" />
            {edu.field}
          </div>

          {/* Description */}
          {edu.description && (
            <p className="text-muted-foreground mb-4">{edu.description}</p>
          )}

          {/* Expandable content */}
          <div
            className={cn(
              "grid transition-all duration-500",
              isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            )}
          >
            <div className="overflow-hidden">
              {/* Highlights */}
              {edu.highlights && edu.highlights.length > 0 && (
                <div className="mb-4 pt-4 border-t border-border/50">
                  <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <Award className="w-4 h-4 text-accent" />
                    Achievements
                  </h4>
                  <ul className="space-y-2 ml-6">
                    {edu.highlights.map((highlight, i) => (
                      <li
                        key={i}
                        className="text-sm text-muted-foreground relative before:content-['▹'] before:absolute before:-left-4 before:text-accent"
                      >
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Courses */}
              {edu.courses && edu.courses.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-accent" />
                    Key Courses
                  </h4>
                  <div className="flex flex-wrap gap-2 ml-6">
                    {edu.courses.map((course) => (
                      <span
                        key={course}
                        className="px-2 py-1 text-xs bg-accent/10 rounded-full text-accent border border-accent/30"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
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

const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <ScrollReveal variant="fade-up" triggerOnce={false}>
          <div className="text-center mb-16">
            <span className="text-accent text-sm font-mono uppercase tracking-wider">
              {`> education.timeline()`}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mt-4">
              <GraduationCap className="inline-block w-10 h-10 mr-3 text-accent" />
              Educational <span className="gradient-text glitch-hover" data-text="Background">Background</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto font-mono text-sm">
              {`// My academic journey and the knowledge that shaped my career`}
            </p>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto">
          {educationData.map((edu, index) => (
            <ScrollReveal key={edu.id} variant="fade-left" delay={index * 150} triggerOnce={false}>
              <EducationCard edu={edu} index={index} isLast={index === educationData.length - 1} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
