import React from 'react';

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[99] overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,170,0.10),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.09),transparent_30%)]" />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(148,163,184,0.16) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.16) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      <div className="relative flex h-full min-h-screen flex-col animate-fade-in">
        <div className="border-b border-border/40 bg-card/30 px-4 py-4 backdrop-blur-xl md:px-6">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <div className="h-8 w-40 rounded-full bg-gradient-to-r from-accent/25 via-primary/25 to-pink-500/25 animate-pulse" />
            <div className="hidden gap-4 md:flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-4 w-16 rounded-full bg-muted/70 animate-pulse"
                  style={{ animationDelay: `${i * 0.08}s` }}
                />
              ))}
            </div>
            <div className="h-8 w-8 rounded-full bg-muted/70 animate-pulse" />
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center px-4 py-10 md:px-6">
          <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-6 text-center lg:text-left">
              <div className="inline-flex h-8 w-44 rounded-full bg-muted/80 animate-pulse" />
              <div className="space-y-3">
                <div className="mx-auto h-14 w-72 rounded-2xl bg-muted/80 animate-pulse lg:mx-0" />
                <div className="mx-auto h-20 w-full max-w-xl rounded-2xl bg-gradient-to-r from-accent/20 via-primary/20 to-pink-500/20 animate-pulse lg:mx-0" />
              </div>
              <div className="mx-auto h-6 w-72 rounded-full bg-muted/70 animate-pulse lg:mx-0" />
              <div className="space-y-3">
                <div className="mx-auto h-4 w-full max-w-2xl rounded-full bg-muted/80 animate-pulse lg:mx-0" />
                <div className="mx-auto h-4 w-5/6 max-w-xl rounded-full bg-muted/80 animate-pulse lg:mx-0" />
              </div>

              <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
                <div className="h-12 w-36 rounded-xl bg-gradient-to-r from-accent/30 via-primary/30 to-pink-500/30 animate-pulse" />
                <div className="h-12 w-36 rounded-xl bg-muted/70 animate-pulse" />
              </div>

              <div className="flex flex-wrap justify-center gap-3 pt-4 lg:justify-start">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-12 w-24 rounded-full bg-muted/70 animate-pulse"
                    style={{ animationDelay: `${i * 0.12}s` }}
                  />
                ))}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-accent/15 via-primary/10 to-pink-500/10 blur-3xl" />
              <div className="rounded-[2rem] border border-border/50 bg-card/55 p-6 backdrop-blur-2xl md:p-8">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-500/60" />
                    <span className="h-3 w-3 rounded-full bg-amber-400/60" />
                    <span className="h-3 w-3 rounded-full bg-emerald-400/60" />
                  </div>
                  <div className="h-4 w-28 rounded-full bg-muted/70 animate-pulse" />
                </div>

                <div className="relative mx-auto h-64 w-64 md:h-72 md:w-72">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/20 via-primary/10 to-pink-500/10 animate-pulse" />
                  <div className="absolute inset-6 rounded-full border border-dashed border-accent/30 animate-spin" style={{ animationDuration: '14s' }} />
                  <div className="absolute inset-12 rounded-full border border-dashed border-primary/20 animate-spin" style={{ animationDuration: '18s', animationDirection: 'reverse' }} />
                  <div className="absolute inset-16 rounded-[2rem] bg-muted/50 animate-pulse" />
                  <div className="absolute inset-0 rounded-full bg-accent/10 blur-2xl" />
                </div>

                <div className="mt-6 space-y-3">
                  <div className="h-3 w-1/2 rounded-full bg-muted/70 animate-pulse" />
                  <div className="h-3 w-5/6 rounded-full bg-muted/70 animate-pulse" />
                  <div className="h-3 w-2/3 rounded-full bg-muted/70 animate-pulse" />
                </div>

                <div className="mt-6 h-2 overflow-hidden rounded-full bg-secondary/40">
                  <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-accent via-primary to-pink-500 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3">
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-2 w-2 animate-bounce rounded-full bg-accent" style={{ animationDelay: `${i * 0.14}s` }} />
            ))}
          </div>
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-muted-foreground">loading experience</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
