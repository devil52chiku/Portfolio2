import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Quote, Terminal, Code2, Braces } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sonali Priyadarshani",
    role: "Director",
    company: "Unirey Electronics",
    content: "Exceptional developer with deep understanding of modern web technologies. Delivered our project ahead of schedule with outstanding quality.",
    avatar: "AC"
  },
  {
    id: 2,
    name: "Farook Khan",
    role: "Founder & CEO",
    company: "Loyal-Tech",
    content: "Working with this developer was a game-changer. The attention to detail and technical expertise exceeded all expectations.",
    avatar: "SM"
  },
  {
    id: 3,
    name: "Abhijit Mohanty",
    role: "Marketing Manager",
    company: "Evolute",
    content: "A true full-stack wizard. From complex backend systems to stunning frontends, every aspect was handled with precision.",
    avatar: "DP"
  },
  {
    id: 4,
    name: "Vineet Rangdal",
    role: "Lead Developer",
    company: "StartupXYZ",
    content: "Perfect collaboration between design and development. Every animation and interaction was implemented flawlessly.",
    avatar: "EJ"
  }
];

const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: false });

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
        setIsAnimating(false);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index: number) => {
    if (index !== activeIndex) {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveIndex(index);
        setIsAnimating(false);
      }, 300);
    }
  };

  return (
    <section 
      ref={ref}
      className="py-20 relative overflow-hidden"
    >
      {/* Hacking Theme Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 text-primary font-mono text-xs animate-pulse">
          {`> initializing testimonials_module...`}
        </div>
        <div className="absolute top-20 right-20 text-primary font-mono text-xs animate-pulse delay-100">
          {`[SUCCESS] client_reviews.loaded()`}
        </div>
        <div className="absolute bottom-20 left-20 text-primary font-mono text-xs animate-pulse delay-200">
          {`>>> processing feedback_data...`}
        </div>
      </div>

      {/* Floating Code Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <Terminal className={cn(
          "absolute top-16 left-[10%] w-6 h-6 text-primary/20 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0 rotate-0" : "opacity-0 -translate-y-10 -rotate-45"
        )} />
        <Code2 className={cn(
          "absolute top-32 right-[15%] w-8 h-8 text-primary/20 transition-all duration-700 delay-100",
          isVisible ? "opacity-100 translate-y-0 rotate-0" : "opacity-0 -translate-y-10 rotate-45"
        )} />
        <Braces className={cn(
          "absolute bottom-32 left-[20%] w-7 h-7 text-primary/20 transition-all duration-700 delay-200",
          isVisible ? "opacity-100 translate-y-0 rotate-0" : "opacity-0 translate-y-10 -rotate-45"
        )} />
      </div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className={cn(
          "text-center mb-16 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-4">
            <Terminal className="w-4 h-4 text-primary" />
            <span className="text-sm font-mono text-primary">{`> client.feedback()`}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Client </span>
            <span className="gradient-text glitch-hover" data-text="Testimonials">Testimonials</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-mono text-sm">
            {`// What clients say about working with me`}
          </p>
        </div>

        {/* Main Testimonial Card */}
        <div className={cn(
          "max-w-4xl mx-auto transition-all duration-700 delay-200",
          isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"
        )}>
          <div className="relative perspective-1000">
            <div className={cn(
              "relative bg-card/50 backdrop-blur-xl border border-primary/20 rounded-2xl p-8 md:p-12 transition-all duration-300 transform-gpu",
              isAnimating ? "opacity-0 scale-95 rotate-y-5" : "opacity-100 scale-100 rotate-y-0",
              "hover:border-primary/40 hover:shadow-[0_0_30px_rgba(0,255,255,0.15)]"
            )}>
              {/* Terminal Header */}
              <div className="absolute top-0 left-0 right-0 h-10 bg-card/80 rounded-t-2xl border-b border-primary/20 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <span className="ml-4 font-mono text-xs text-muted-foreground">testimonial_{activeIndex + 1}.json</span>
              </div>

              {/* Quote Icon */}
              <div className="absolute -top-6 left-8 w-12 h-12 bg-gradient-to-br from-primary to-primary/50 rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
                <Quote className="w-6 h-6 text-primary-foreground" />
              </div>

              {/* Content */}
              <div className="pt-8">
                <p className="text-lg md:text-xl text-foreground/90 leading-relaxed mb-8 font-mono">
                  <span className="text-primary">{`"`}</span>
                  {testimonials[activeIndex].content}
                  <span className="text-primary">{`"`}</span>
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center font-bold text-primary-foreground text-lg shadow-lg shadow-primary/20">
                    {testimonials[activeIndex].avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{testimonials[activeIndex].name}</h4>
                    <p className="text-sm text-muted-foreground font-mono">
                      {testimonials[activeIndex].role} <span className="text-primary">@</span> {testimonials[activeIndex].company}
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute bottom-4 right-4 font-mono text-xs text-primary/30">
                {`// ${activeIndex + 1}/${testimonials.length}`}
              </div>
            </div>

            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 rounded-2xl blur-xl opacity-50 -z-10" />
          </div>
        </div>

        {/* Navigation Dots */}
        <div className={cn(
          "flex justify-center gap-3 mt-8 transition-all duration-700 delay-300",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        )}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={cn(
                "relative h-3 rounded-full transition-all duration-300 group",
                index === activeIndex ? "w-8 bg-primary" : "w-3 bg-primary/30 hover:bg-primary/50"
              )}
            >
              {index === activeIndex && (
                <span className="absolute inset-0 bg-primary rounded-full animate-ping opacity-30" />
              )}
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-mono text-primary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                [{index + 1}]
              </span>
            </button>
          ))}
        </div>

        {/* Side Cards Preview */}
        <div className={cn(
          "hidden lg:flex justify-center gap-6 mt-12 transition-all duration-700 delay-400",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              onClick={() => handleDotClick(index)}
              className={cn(
                "relative w-64 p-4 rounded-xl border cursor-pointer transition-all duration-300 transform-gpu",
                index === activeIndex 
                  ? "bg-primary/10 border-primary/40 scale-105 shadow-lg shadow-primary/20" 
                  : "bg-card/30 border-border/50 hover:border-primary/30 hover:bg-card/50 hover:scale-102"
              )}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-colors",
                  index === activeIndex 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted text-muted-foreground"
                )}>
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground font-mono">{testimonial.company}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">{testimonial.content}</p>
              
              {index === activeIndex && (
                <div className="absolute -inset-px bg-gradient-to-r from-primary/50 to-primary/20 rounded-xl -z-10 blur-sm" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
