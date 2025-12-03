import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  type: 'bracket' | 'code' | 'binary' | 'orb';
  content?: string;
}

const codeSnippets = ['const', 'function()', 'return', '=>', '{ }', '[ ]', '</>', 'async', 'await'];
const binaryChars = ['0', '1'];

const FloatingShapes: React.FC = () => {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    const newElements: FloatingElement[] = [];
    
    // Code snippets
    for (let i = 0; i < 8; i++) {
      newElements.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 14 + Math.random() * 8,
        duration: 15 + Math.random() * 10,
        delay: Math.random() * 5,
        type: 'code',
        content: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
      });
    }

    // Binary streams
    for (let i = 0; i < 4; i++) {
      newElements.push({
        id: 100 + i,
        x: 10 + i * 25,
        y: Math.random() * 100,
        size: 12,
        duration: 20 + Math.random() * 10,
        delay: Math.random() * 3,
        type: 'binary',
      });
    }

    // Floating brackets
    for (let i = 0; i < 4; i++) {
      newElements.push({
        id: 200 + i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 60 + Math.random() * 40,
        duration: 20 + Math.random() * 15,
        delay: Math.random() * 5,
        type: 'bracket',
        content: i % 2 === 0 ? '{' : '}',
      });
    }

    // Glow orbs
    for (let i = 0; i < 5; i++) {
      newElements.push({
        id: 300 + i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 100 + Math.random() * 200,
        duration: 25 + Math.random() * 15,
        delay: Math.random() * 5,
        type: 'orb',
      });
    }

    setElements(newElements);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Grid background */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {elements.map((el) => {
        if (el.type === 'code') {
          return (
            <div
              key={el.id}
              className={cn(
                "absolute font-mono text-primary/20 animate-float",
                "select-none"
              )}
              style={{
                left: `${el.x}%`,
                top: `${el.y}%`,
                fontSize: `${el.size}px`,
                animationDuration: `${el.duration}s`,
                animationDelay: `${el.delay}s`,
              }}
            >
              {el.content}
            </div>
          );
        }

        if (el.type === 'binary') {
          return (
            <div
              key={el.id}
              className="absolute font-mono text-accent/15 flex flex-col gap-1"
              style={{
                left: `${el.x}%`,
                top: `${el.y}%`,
                fontSize: `${el.size}px`,
                animation: `float ${el.duration}s ease-in-out infinite`,
                animationDelay: `${el.delay}s`,
              }}
            >
              {[...Array(15)].map((_, i) => (
                <span key={i} className="animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}>
                  {binaryChars[Math.floor(Math.random() * 2)]}
                </span>
              ))}
            </div>
          );
        }

        if (el.type === 'bracket') {
          return (
            <div
              key={el.id}
              className="absolute font-mono text-primary/10 animate-float-slow"
              style={{
                left: `${el.x}%`,
                top: `${el.y}%`,
                fontSize: `${el.size}px`,
                animationDuration: `${el.duration}s`,
                animationDelay: `${el.delay}s`,
              }}
            >
              {el.content}
            </div>
          );
        }

        if (el.type === 'orb') {
          return (
            <div
              key={el.id}
              className={cn(
                "absolute rounded-full blur-3xl animate-pulse",
                el.id % 3 === 0 ? "bg-accent/10" : el.id % 3 === 1 ? "bg-primary/10" : "bg-pink-500/10"
              )}
              style={{
                left: `${el.x}%`,
                top: `${el.y}%`,
                width: `${el.size}px`,
                height: `${el.size}px`,
                animationDuration: `${el.duration}s`,
                animationDelay: `${el.delay}s`,
              }}
            />
          );
        }

        return null;
      })}

      {/* Terminal window (reduced opacity) */}
      <div 
        className="absolute top-1/4 right-[10%] w-64 glass rounded-lg opacity-20 hidden lg:block"
        style={{ animation: 'float 20s ease-in-out infinite' }}
      >
        <div className="flex gap-2 p-3 border-b border-border/50">
          <div className="w-3 h-3 rounded-full bg-destructive/60" />
          <div className="w-3 h-3 rounded-full bg-amber-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        <div className="p-4 font-mono text-xs text-foreground/60">
          <div className="overflow-hidden">
            <span className="text-accent">&gt;</span> Hello, World!
            <span className="animate-pulse">|</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingShapes;
