import React, { useState } from 'react';
import { Monitor, Server, Database, Cloud } from 'lucide-react';
import SkillsOrbit from '@/components/three/SkillsOrbit';
import { cn } from '@/lib/utils';
import ScrollReveal from '@/components/ui/ScrollReveal';

const categories = [
  {
    id: 'frontend',
    name: 'Frontend',
    icon: Monitor,
    skills: [
      { name: 'React', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Next.js', level: 85 },
      { name: 'Tailwind CSS', level: 92 },
    ],
  },
  {
    id: 'backend',
    name: 'Backend',
    icon: Server,
    skills: [
      { name: 'Node.js', level: 88 },
      { name: 'Python', level: 80 },
      { name: 'Express', level: 85 },
      { name: 'GraphQL', level: 78 },
    ],
  },
  {
    id: 'database',
    name: 'Database',
    icon: Database,
    skills: [
      { name: 'PostgreSQL', level: 85 },
      { name: 'MongoDB', level: 82 },
      { name: 'Redis', level: 75 },
      { name: 'Prisma', level: 80 },
    ],
  },
  {
    id: 'cloud',
    name: 'Cloud',
    icon: Cloud,
    skills: [
      { name: 'AWS', level: 80 },
      { name: 'Docker', level: 85 },
      { name: 'Vercel', level: 90 },
      { name: 'CI/CD', level: 82 },
    ],
  },
];

const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('frontend');

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/50 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <ScrollReveal variant="fade-up">
          <div className="text-center mb-16">
            <span className="text-accent text-sm font-medium uppercase tracking-wider">
              My Expertise
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mt-4">
              Skills & <span className="gradient-text">Technologies</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Skills orbit visualization */}
          <ScrollReveal variant="zoom-in" delay={200}>
            <div className="flex justify-center order-2 lg:order-1">
              <SkillsOrbit />
            </div>
          </ScrollReveal>

          {/* Skills cards */}
          <ScrollReveal variant="fade-left" delay={100}>
            <div className="space-y-6 order-1 lg:order-2">
              {/* Category tabs */}
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={cn(
                      "px-4 py-2 rounded-lg font-medium transition-all duration-300",
                      "flex items-center gap-2 hover:scale-105",
                      activeCategory === cat.id
                        ? "bg-gradient-to-r from-accent to-primary text-primary-foreground"
                        : "glass hover:bg-secondary/50"
                    )}
                  >
                    <cat.icon className="w-4 h-4" />
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Skills grid */}
              <div className="glass p-6 rounded-xl hover:shadow-xl transition-shadow duration-500">
                {categories
                  .filter((cat) => cat.id === activeCategory)
                  .map((cat) => (
                    <div key={cat.id} className="space-y-4">
                      {/* Animated category icon */}
                      <div className="flex items-center gap-3 mb-6">
                        <div className="relative group">
                          <div className="absolute inset-0 bg-accent/30 rounded-lg blur-md animate-pulse" />
                          <div className="relative p-3 glass rounded-lg group-hover:rotate-12 transition-transform duration-300">
                            <cat.icon className="w-8 h-8 text-accent" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{cat.name} Development</h3>
                          <p className="text-sm text-muted-foreground">Core technologies I work with</p>
                        </div>
                      </div>

                      {/* Skills list */}
                      {cat.skills.map((skill, index) => (
                        <div
                          key={skill.name}
                          className="group hover:translate-x-1 transition-transform"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <div className="flex justify-between mb-2">
                            <span className="font-medium group-hover:text-accent transition-colors">
                              {skill.name}
                            </span>
                            <span className="text-muted-foreground">{skill.level}%</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-accent to-primary rounded-full transition-all duration-1000 ease-out group-hover:shadow-glow"
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
