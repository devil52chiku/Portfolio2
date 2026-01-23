import React, { useState } from 'react';
import { Award, ExternalLink, Calendar, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface Certification {
  id: number;
  title: string;
  issuer: string;
  date: string;
  credentialUrl: string;
  skills: string[];
  logo: string;
}

const certifications: Certification[] = [
  {
    id: 1,
    title: 'Generative AI Mastermind',
    issuer: 'Outskill',
    date: 'Nov 2025',
    credentialUrl: 'https://learners.outskill.com/certificate/9438e2f6-ec9c-4f38-98b7-b8f4b5d03ba7',
    skills: ['Gen AI', 'Prompt Engineering', 'Security'],
    logo: '☁️',
  }
];

const CertificationCard: React.FC<{ cert: Certification; index: number }> = ({ cert, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 25;
    const y = (e.clientY - rect.top - rect.height / 2) / 25;
    setMousePos({ x, y });
  };

  return (
    <div
      className="group perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: 0, y: 0 });
      }}
      onMouseMove={handleMouseMove}
    >
      <div
        className={cn(
          "relative p-6 glass rounded-2xl border border-border/50 transition-all duration-300",
          "hover:border-accent/50 hover:shadow-[0_0_30px_rgba(0,255,170,0.15)]"
        )}
        style={{
          transform: isHovered
            ? `rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg) translateZ(10px)`
            : 'rotateY(0deg) rotateX(0deg) translateZ(0px)',
          transition: 'transform 0.1s ease-out',
        }}
      >
        {/* Glow effect */}
        <div
          className={cn(
            "absolute -inset-1 bg-gradient-to-r from-accent via-primary to-pink-500 rounded-2xl blur-lg transition-opacity duration-500 -z-10",
            isHovered ? "opacity-30" : "opacity-0"
          )}
        />

        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className="text-4xl">{cert.logo}</div>
          <div className="flex-1">
            <h3 className="font-bold text-lg group-hover:text-accent transition-colors">
              {cert.title}
            </h3>
            <p className="text-sm text-muted-foreground">{cert.issuer}</p>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3" />
            {cert.date}
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {cert.skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-secondary/50 rounded-full text-muted-foreground"
            >
              <CheckCircle2 className="w-3 h-3 text-accent" />
              {skill}
            </span>
          ))}
        </div>

        {/* View credential button */}
        <Button
          size="sm"
          variant="ghost"
          className="w-full group/btn hover:bg-accent/10"
          onClick={() => window.open(cert.credentialUrl, '_blank')}
        >
          <ExternalLink className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
          View Credential
        </Button>

        {/* Corner decoration */}
        <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-2xl">
          <div
            className={cn(
              "absolute -right-8 -top-8 w-16 h-16 bg-gradient-to-br from-accent/20 to-transparent rotate-45 transition-all duration-500",
              isHovered && "scale-150"
            )}
          />
        </div>
      </div>
    </div>
  );
};

const CertificationsSection: React.FC = () => {
  return (
    <section id="certifications" className="py-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <ScrollReveal variant="fade-up" triggerOnce={false}>
          <div className="text-center mb-16">
            <span className="text-accent text-sm font-mono uppercase tracking-wider">
              {`> certifications.list()`}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mt-4">
              <Award className="inline-block w-10 h-10 mr-3 text-accent" />
              <span className="gradient-text glitch-hover" data-text="Certifications">Certifications</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto font-mono text-sm">
              {`// Professional certifications and achievements`}
            </p>
          </div>
        </ScrollReveal>

        {/* Certifications grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {certifications.map((cert, index) => (
            <ScrollReveal key={cert.id} variant="fade-up" delay={index * 100} triggerOnce={false}>
              <CertificationCard cert={cert} index={index} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
