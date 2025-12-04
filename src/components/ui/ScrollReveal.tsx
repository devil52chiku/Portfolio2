import React from 'react';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

type AnimationVariant = 
  | 'fade-up' 
  | 'fade-down' 
  | 'fade-left' 
  | 'fade-right' 
  | 'zoom-in' 
  | 'zoom-out'
  | 'flip-up'
  | 'flip-left'
  | 'slide-up'
  | 'slide-down';

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
}

const animations: Record<AnimationVariant, { initial: string; animate: string }> = {
  'fade-up': {
    initial: 'opacity-0 translate-y-8',
    animate: 'opacity-100 translate-y-0',
  },
  'fade-down': {
    initial: 'opacity-0 -translate-y-8',
    animate: 'opacity-100 translate-y-0',
  },
  'fade-left': {
    initial: 'opacity-0 translate-x-8',
    animate: 'opacity-100 translate-x-0',
  },
  'fade-right': {
    initial: 'opacity-0 -translate-x-8',
    animate: 'opacity-100 translate-x-0',
  },
  'zoom-in': {
    initial: 'opacity-0 scale-90',
    animate: 'opacity-100 scale-100',
  },
  'zoom-out': {
    initial: 'opacity-0 scale-110',
    animate: 'opacity-100 scale-100',
  },
  'flip-up': {
    initial: 'opacity-0 rotateX-90',
    animate: 'opacity-100 rotateX-0',
  },
  'flip-left': {
    initial: 'opacity-0 rotateY-90',
    animate: 'opacity-100 rotateY-0',
  },
  'slide-up': {
    initial: 'opacity-0 translate-y-16',
    animate: 'opacity-100 translate-y-0',
  },
  'slide-down': {
    initial: 'opacity-0 -translate-y-16',
    animate: 'opacity-100 translate-y-0',
  },
};

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 700,
  className,
  threshold = 0.1,
}) => {
  const { ref, isVisible } = useScrollAnimation({ threshold });
  const animation = animations[variant];

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all',
        isVisible ? animation.animate : animation.initial,
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
