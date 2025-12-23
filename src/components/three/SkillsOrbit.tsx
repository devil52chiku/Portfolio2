import React from 'react';
import { cn } from '@/lib/utils';

const skills = [
  { name: 'React', color: 'text-cyan-400', bg: 'bg-cyan-400/20', angle: 0 },
  { name: 'Three.js', color: 'text-purple-400', bg: 'bg-purple-400/20', angle: 45 },
  { name: 'Node.js', color: 'text-green-400', bg: 'bg-green-400/20', angle: 90 },
  { name: 'TypeScript', color: 'text-blue-400', bg: 'bg-blue-400/20', angle: 135 },
  { name: 'Python', color: 'text-yellow-400', bg: 'bg-yellow-400/20', angle: 180 },
  { name: 'AWS', color: 'text-orange-400', bg: 'bg-orange-400/20', angle: 225 },
  { name: 'Docker', color: 'text-sky-400', bg: 'bg-sky-400/20', angle: 270 },
  { name: 'GraphQL', color: 'text-pink-400', bg: 'bg-pink-400/20', angle: 315 },
];

const SkillsOrbit: React.FC = () => {
  const radius = 140;

  return (
    <div className="relative w-80 h-80 md:w-96 md:h-96">
      {/* Background glow */}
      <div className="absolute inset-0 bg-accent/10 rounded-full blur-3xl" />

      {/* Orbit rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute w-full h-full border border-dashed border-border/30 rounded-full animate-spin-slow" />
        <div 
          className="absolute w-[85%] h-[85%] border border-border/20 rounded-full"
          style={{ animation: 'spin 30s linear infinite reverse' }}
        />
        <div 
          className="absolute w-[70%] h-[70%] border border-border/10 rounded-full"
          style={{ animation: 'spin 25s linear infinite' }}
        />
      </div>

      {/* Center core */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Core glow */}
          <div className="absolute -inset-4 bg-accent/30 rounded-full blur-xl animate-pulse" />
          
          {/* Core */}
          <div className="relative w-20 h-20 rounded-full glass flex items-center justify-center border-2 border-accent/50">
            <span className="text-3xl">💻</span>
          </div>
        </div>
      </div>

      {/* Skill nodes */}
      {skills.map((skill, index) => {
        const angleRad = (skill.angle * Math.PI) / 180;
        const x = Math.cos(angleRad) * radius;
        const y = Math.sin(angleRad) * radius;

        return (
          <div
            key={skill.name}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
            }}
          >
            <div
              className={cn(
                "relative group cursor-pointer",
                "animate-float"
              )}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Node glow */}
              <div className={cn(
                "absolute -inset-2 rounded-full blur-md opacity-50 group-hover:opacity-100 transition-opacity",
                skill.bg
              )} />

              {/* Node */}
              <div className={cn(
                "relative px-3 py-2 rounded-full glass",
                "border border-border/50 group-hover:border-accent/50",
                "transform transition-all duration-300",
                "group-hover:scale-110 group-hover:-translate-y-1"
              )}>
                <span className={cn("text-xs font-medium", skill.color)}>
                  {skill.name}
                </span>
              </div>

              {/* Decorative elements per skill */}
              {skill.name === 'React' && (
                <div className="absolute -inset-4 pointer-events-none">
                  {[0, 60, 120].map((deg) => (
                    <div
                      key={deg}
                      className="absolute top-1/2 left-1/2 w-8 h-8 border border-cyan-400/30 rounded-full"
                      style={{
                        transform: `translate(-50%, -50%) rotate(${deg}deg)`,
                        animation: 'spin 3s linear infinite',
                      }}
                    />
                  ))}
                </div>
              )}

              {skill.name === 'Three.js' && (
                <div 
                  className="absolute -top-1 -right-1 w-4 h-4 bg-purple-400/50"
                  style={{
                    animation: 'spin 4s linear infinite',
                    clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                  }}
                />
              )}

              {skill.name === 'Node.js' && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-ping" />
              )}
            </div>
          </div>
        );
      })}

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className={cn(
            "absolute w-1 h-1 rounded-full",
            i % 3 === 0 ? "bg-accent/60" :
            i % 3 === 1 ? "bg-primary/60" :
            "bg-pink-500/60"
          )}
          style={{
            top: `${20 + Math.random() * 60}%`,
            left: `${20 + Math.random() * 60}%`,
            animation: `float ${5 + Math.random() * 5}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  );
};

export default SkillsOrbit;
