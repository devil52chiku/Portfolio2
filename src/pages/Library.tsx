import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Book, Code, Cpu, Database, Globe, Layers, Package, Sparkles, Terminal, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/contexts/ThemeContext';
import ThemeToggle from '@/components/ui/ThemeToggle';

const libraries = [
  {
    category: 'Frontend',
    icon: Globe,
    items: [
      { name: 'React', version: '18.3.1', description: 'UI component library', color: 'from-cyan-500 to-blue-500' },
      { name: 'Tailwind CSS', version: '3.4', description: 'Utility-first CSS framework', color: 'from-teal-500 to-cyan-500' },
      { name: 'Framer Motion', version: '11.0', description: 'Animation library', color: 'from-purple-500 to-pink-500' },
      { name: 'Three.js', version: '0.161', description: '3D graphics library', color: 'from-orange-500 to-red-500' },
    ]
  },
  {
    category: 'Backend',
    icon: Terminal,
    items: [
      { name: 'Node.js', version: '20.x', description: 'JavaScript runtime', color: 'from-green-500 to-emerald-500' },
      { name: 'Express', version: '4.18', description: 'Web framework', color: 'from-gray-500 to-slate-500' },
      { name: 'PostgreSQL', version: '16', description: 'Relational database', color: 'from-blue-500 to-indigo-500' },
      { name: 'Redis', version: '7.2', description: 'In-memory data store', color: 'from-red-500 to-orange-500' },
    ]
  },
  {
    category: 'DevOps',
    icon: Cpu,
    items: [
      { name: 'Docker', version: '24.0', description: 'Containerization', color: 'from-blue-500 to-cyan-500' },
      { name: 'Kubernetes', version: '1.28', description: 'Container orchestration', color: 'from-blue-600 to-indigo-600' },
      { name: 'GitHub Actions', version: 'latest', description: 'CI/CD automation', color: 'from-gray-600 to-slate-600' },
      { name: 'Terraform', version: '1.6', description: 'Infrastructure as code', color: 'from-purple-600 to-violet-600' },
    ]
  },
  {
    category: 'Tools',
    icon: Package,
    items: [
      { name: 'TypeScript', version: '5.3', description: 'Type-safe JavaScript', color: 'from-blue-500 to-blue-700' },
      { name: 'Vite', version: '5.0', description: 'Build tool', color: 'from-yellow-500 to-orange-500' },
      { name: 'ESLint', version: '8.56', description: 'Code linting', color: 'from-purple-500 to-indigo-500' },
      { name: 'Prettier', version: '3.2', description: 'Code formatting', color: 'from-pink-500 to-rose-500' },
    ]
  },
];

const LibraryCard: React.FC<{ 
  item: { name: string; version: string; description: string; color: string }; 
  index: number;
}> = ({ item, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* 3D rotation effect */}
      <div 
        className="relative glass rounded-xl p-4 border border-border/50 transition-all duration-500 hover:border-accent/50"
        style={{
          transform: isHovered ? 'perspective(1000px) rotateX(-5deg) rotateY(5deg) scale(1.02)' : 'perspective(1000px)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Glow */}
        <div className={cn(
          "absolute -inset-1 rounded-xl blur-lg transition-opacity duration-500",
          `bg-gradient-to-r ${item.color}`,
          isHovered ? "opacity-30" : "opacity-0"
        )} />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-foreground group-hover:text-accent transition-colors">
              {item.name}
            </h4>
            <span className={cn(
              "text-xs px-2 py-1 rounded-full bg-gradient-to-r text-white",
              item.color
            )}>
              v{item.version}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{item.description}</p>
          
          {/* Progress bar animation */}
          <div className="mt-3 h-1 bg-secondary/50 rounded-full overflow-hidden">
            <div 
              className={cn(
                "h-full bg-gradient-to-r rounded-full transition-all duration-1000",
                item.color,
                isHovered ? "w-full" : "w-0"
              )}
            />
          </div>
        </div>

        {/* Floating particles */}
        {isHovered && (
          <>
            <div className="absolute top-2 right-2 w-1 h-1 bg-accent rounded-full animate-ping" />
            <div className="absolute bottom-4 left-4 w-1 h-1 bg-primary rounded-full animate-ping" style={{ animationDelay: '0.2s' }} />
          </>
        )}
      </div>
    </div>
  );
};

const CategorySection: React.FC<{ 
  category: typeof libraries[0]; 
  index: number;
}> = ({ category, index }) => {
  const Icon = category.icon;
  
  return (
    <div className="mb-12 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 glass rounded-xl border border-accent/30 group hover:scale-110 transition-transform">
          <Icon className="w-6 h-6 text-accent" />
        </div>
        <h3 className="text-2xl font-bold">
          <span className="text-accent opacity-50">{'{ '}</span>
          {category.category}
          <span className="text-accent opacity-50">{' }'}</span>
        </h3>
        <div className="flex-1 h-px bg-gradient-to-r from-accent/50 to-transparent" />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {category.items.map((item, i) => (
          <LibraryCard key={item.name} item={item} index={i} />
        ))}
      </div>
    </div>
  );
};

const Library: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          {/* Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(var(--accent-rgb),0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--accent-rgb),0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
          
          {/* Floating code symbols */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute text-accent/10 font-mono text-4xl animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${5 + Math.random() * 5}s`,
                }}
              >
                {['<>', '/>', '{}', '[]', '()', '=>', '&&', '||'][i % 8]}
              </div>
            ))}
          </div>

          {/* Glowing orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 glass py-4">
          <div className="container mx-auto px-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home</span>
            </Link>
            <ThemeToggle />
          </div>
        </header>

        <main className="container mx-auto px-4 pt-24 pb-16 relative z-10">
          {/* Page header with 3D effect */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-4 animate-bounce-slow">
              <Book className="w-4 h-4 text-accent" />
              <span className="text-accent font-mono text-sm">tech_stack.json</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              My <span className="gradient-text">Tech Library</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A curated collection of tools, frameworks, and technologies I use to build amazing things.
            </p>

            {/* Stats */}
            <div className="flex justify-center gap-8 mt-8">
              {[
                { label: 'Technologies', value: '16+', icon: Layers },
                { label: 'Categories', value: '4', icon: Database },
                { label: 'Years Experience', value: '5+', icon: Sparkles },
              ].map((stat, i) => (
                <div key={stat.label} className="glass px-6 py-4 rounded-xl border border-border/50 hover:border-accent/50 transition-all hover:scale-105 group">
                  <stat.icon className="w-5 h-5 text-accent mx-auto mb-2 group-hover:animate-pulse" />
                  <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Library sections */}
          {libraries.map((category, index) => (
            <CategorySection key={category.category} category={category} index={index} />
          ))}
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Library;
