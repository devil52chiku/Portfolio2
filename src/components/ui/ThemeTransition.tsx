import React, { useEffect, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

const ThemeTransition: React.FC = () => {
  const { isDark, isTransitioning } = useTheme();
  const [transitioningToDark, setTransitioningToDark] = useState<boolean | null>(null);

  useEffect(() => {
    if (isTransitioning) {
      // When transition starts, we're going TO the opposite of current state
      // Since isDark hasn't changed yet during the transition animation,
      // we want to show the effect for the theme we're going TO
      setTransitioningToDark(!isDark);
    }
  }, [isTransitioning, isDark]);

  if (!isTransitioning || transitioningToDark === null) return null;

  return (
    <div className="theme-transition-overlay">
      {/* Background overlay */}
      <div 
        className="absolute inset-0 transition-opacity duration-500"
        style={{ opacity: 0.3 }}
      />
      
      {/* Moon effect (transitioning TO dark) */}
      {transitioningToDark && (
        <div className="moon-effect relative">
          {/* Moon body */}
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 shadow-2xl">
              {/* Moon craters */}
              <div className="absolute top-4 left-6 w-6 h-6 rounded-full bg-slate-400/50" />
              <div className="absolute top-12 right-8 w-4 h-4 rounded-full bg-slate-400/40" />
              <div className="absolute bottom-8 left-10 w-8 h-8 rounded-full bg-slate-400/30" />
              <div className="absolute bottom-4 right-6 w-3 h-3 rounded-full bg-slate-400/50" />
            </div>
            {/* Moon glow */}
            <div className="absolute -inset-4 rounded-full bg-slate-300/30 blur-xl animate-pulse" />
            <div className="absolute -inset-8 rounded-full bg-primary/20 blur-2xl" />
          </div>
          
          {/* Stars */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-foreground/80 rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 200 - 100}px`,
                left: `${Math.random() * 200 - 100}px`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random()}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Sun effect (transitioning TO light) */}
      {!transitioningToDark && (
        <div className="sun-effect relative">
          {/* Sun body */}
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-300 via-orange-400 to-amber-500 shadow-2xl" />
            
            {/* Sun rays */}
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 w-2 h-16 bg-gradient-to-t from-amber-400 to-transparent rounded-full origin-bottom"
                style={{
                  transform: `translate(-50%, -100%) rotate(${i * 30}deg)`,
                }}
              />
            ))}
            
            {/* Sun glow */}
            <div className="absolute -inset-4 rounded-full bg-amber-400/50 blur-xl animate-pulse" />
            <div className="absolute -inset-8 rounded-full bg-orange-400/30 blur-2xl" />
            <div className="absolute -inset-12 rounded-full bg-yellow-400/20 blur-3xl" />
          </div>
          
          {/* Light particles */}
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-amber-300/80 rounded-full animate-ping"
              style={{
                top: `${Math.random() * 200 - 100}px`,
                left: `${Math.random() * 200 - 100}px`,
                animationDelay: `${Math.random() * 1}s`,
                animationDuration: `${0.5 + Math.random()}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeTransition;
