import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative w-14 h-14 rounded-full",
        "bg-secondary/50 hover:bg-secondary",
        "border border-border/50",
        "flex items-center justify-center",
        "transition-all duration-500 ease-out",
        "hover:scale-110 hover:shadow-lg",
        "group overflow-hidden"
      )}
      aria-label="Toggle theme"
    >
      <div className="relative w-6 h-6">
        <Sun
          className={cn(
            "absolute inset-0 w-6 h-6 text-amber-500",
            "transition-all duration-500 ease-out",
            isDark
              ? "opacity-0 scale-0 rotate-180"
              : "opacity-100 scale-100 rotate-0"
          )}
        />
        <Moon
          className={cn(
            "absolute inset-0 w-6 h-6 text-primary",
            "transition-all duration-500 ease-out",
            isDark
              ? "opacity-100 scale-100 rotate-0"
              : "opacity-0 scale-0 -rotate-180"
          )}
        />
      </div>
      
      {/* Glow effect */}
      <div
        className={cn(
          "absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300",
          isDark
            ? "bg-primary/20"
            : "bg-amber-500/20"
        )}
      />
    </button>
  );
};

export default ThemeToggle;
