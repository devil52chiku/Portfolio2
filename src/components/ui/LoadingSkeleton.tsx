import React from 'react';

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[99] bg-background flex flex-col animate-fade-in">
      {/* Navbar skeleton */}
      <div className="h-16 border-b border-border/50 flex items-center justify-between px-6">
        <div className="h-8 w-32 rounded-md bg-muted animate-pulse" />
        <div className="hidden md:flex gap-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-4 w-16 rounded bg-muted animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
          ))}
        </div>
        <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
      </div>

      {/* Hero section skeleton */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12">
          {/* Text content skeleton */}
          <div className="flex-1 space-y-6">
            {/* Status badge */}
            <div className="h-8 w-40 rounded-full bg-muted animate-pulse" />
            
            {/* Title */}
            <div className="space-y-3">
              <div className="h-12 w-48 rounded-lg bg-muted animate-pulse" />
              <div className="h-16 w-72 rounded-lg bg-gradient-to-r from-accent/20 via-primary/20 to-pink-500/20 animate-pulse" />
            </div>

            {/* Typewriter */}
            <div className="h-8 w-56 rounded bg-muted animate-pulse" />

            {/* Description */}
            <div className="space-y-2">
              <div className="h-4 w-full max-w-lg rounded bg-muted animate-pulse" />
              <div className="h-4 w-3/4 max-w-md rounded bg-muted animate-pulse" />
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <div className="h-12 w-36 rounded-lg bg-gradient-to-r from-accent/30 via-primary/30 to-pink-500/30 animate-pulse" />
              <div className="h-12 w-36 rounded-lg bg-muted animate-pulse" />
            </div>

            {/* Social links */}
            <div className="flex gap-4 pt-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 w-12 rounded-full bg-muted animate-pulse" style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          </div>

          {/* Avatar skeleton */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/20 via-primary/20 to-pink-500/20 animate-pulse" />
              <div className="absolute inset-4 rounded-xl bg-muted/50 animate-pulse" style={{ animationDelay: '0.2s' }} />
              {/* Orbiting rings */}
              <div className="absolute inset-0 border-2 border-dashed border-accent/30 rounded-full animate-spin" style={{ animationDuration: '8s' }} />
              <div className="absolute inset-8 border border-dashed border-primary/20 rounded-full animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Loading indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-accent animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
        <span className="text-sm text-muted-foreground font-mono">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
