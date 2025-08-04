import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const rotatingWords = ['creator', 'brand', 'artist', 'influencer', 'agency', 'designer'];

export const HeroContent = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
        setIsVisible(true);
      }, 200);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center max-w-4xl mx-auto px-6 animate-fade-in-up">
      {/* Main Headline */}
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
        <span className="block text-foreground mb-4">
          Collaborate with your
        </span>
        <span className="block text-primary relative">
          favorite{' '}
          <span 
            className={`inline-block transition-all duration-300 ${
              isVisible ? 'opacity-100 transform-none' : 'opacity-0 transform translate-y-2'
            }`}
            style={{
              background: 'linear-gradient(45deg, hsl(var(--primary)), hsl(var(--accent)))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {rotatingWords[currentWordIndex]}
          </span>
        </span>
      </h1>

      {/* Description */}
      <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
        The ultimate launchpad for creators to find collaborators, 
        create stunning assets, and bring their wildest creative visions to life.
      </p>

      {/* CTA Button */}
      <div className="space-y-6">
        <Button 
          size="lg" 
          className="text-lg px-12 py-6 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-primary/25"
        >
          Create your Muse
        </Button>
        
        <p className="text-sm text-muted-foreground">
          Join thousands of creators worldwide
        </p>
      </div>

      {/* Feature Highlights */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {[
          {
            title: 'Find Collaborators',
            description: 'Connect with talented creators across all mediums',
            icon: '🤝'
          },
          {
            title: 'Create Together',
            description: 'Build campaigns, films, fashion, and more',
            icon: '✨'
          },
          {
            title: 'Launch Ideas',
            description: 'Turn your creative vision into reality',
            icon: '🚀'
          }
        ].map((feature, index) => (
          <div 
            key={index}
            className="bg-card/30 backdrop-blur-sm border border-border/20 rounded-2xl p-6 transition-all duration-300 hover:bg-card/50 hover:border-border/40"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {feature.title}
            </h3>
            <p className="text-muted-foreground text-sm">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};