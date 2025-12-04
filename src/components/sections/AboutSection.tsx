import React from 'react';
import { Sparkles, Code, Palette, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import ScrollReveal from '@/components/ui/ScrollReveal';

const highlights = [
  {
    icon: Code,
    title: 'Clean Code',
    description: 'Writing maintainable, scalable, and well-documented code that stands the test of time.',
  },
  {
    icon: Palette,
    title: 'Design Driven',
    description: 'Crafting pixel-perfect interfaces with attention to every detail and user experience.',
  },
  {
    icon: Zap,
    title: 'Performance',
    description: 'Optimizing for speed and efficiency to deliver lightning-fast experiences.',
  },
];

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <ScrollReveal variant="fade-up">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-accent mb-4">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-medium uppercase tracking-wider">About Me</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Passionate about creating
              <span className="gradient-text block mt-2">digital experiences</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Content grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Bio */}
          <ScrollReveal variant="fade-right" delay={100}>
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                With over 5 years of experience in web development, I specialize in building 
                modern, responsive applications using React, TypeScript, and Node.js. My 
                journey began with a curiosity about how things work on the web, and has 
                evolved into a passion for creating seamless user experiences.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I believe in the power of clean code and thoughtful design. Every project 
                is an opportunity to learn something new and push the boundaries of what's 
                possible. When I'm not coding, you'll find me exploring new technologies, 
                contributing to open source, or sharing knowledge with the community.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-6">
                {[
                  { number: '5+', label: 'Years Experience' },
                  { number: '50+', label: 'Projects Completed' },
                  { number: '30+', label: 'Happy Clients' },
                ].map((stat, index) => (
                  <ScrollReveal key={stat.label} variant="zoom-in" delay={200 + index * 100}>
                    <div className="text-center">
                      <div className="text-3xl md:text-4xl font-bold gradient-text">{stat.number}</div>
                      <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Highlight cards */}
          <div className="space-y-4">
            {highlights.map((item, index) => (
              <ScrollReveal key={item.title} variant="fade-left" delay={100 + index * 150}>
                <div
                  className={cn(
                    "group glass p-6 rounded-xl",
                    "transform transition-all duration-300",
                    "hover:-translate-y-1 hover:shadow-xl hover:scale-[1.02]",
                    "border border-transparent hover:border-accent/30"
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "p-3 rounded-lg",
                      "bg-gradient-to-br from-accent/20 to-primary/20",
                      "group-hover:from-accent/30 group-hover:to-primary/30",
                      "transition-colors duration-300",
                      "group-hover:rotate-6 group-hover:scale-110"
                    )}>
                      <item.icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
