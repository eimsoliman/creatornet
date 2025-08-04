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
    <div className="text-center max-w-4xl mx-auto px-6 animate-fade-in-up pointer-events-auto">
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
              textShadow: '0 0 30px currentColor',
            }}
          >
            {rotatingWords[currentWordIndex]}
          </span>
        </span>
      </h1>

      {/* CTA Button */}
      <div className="space-y-6">
        <Button 
          size="lg" 
          className="text-lg px-12 py-6 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold neon-glow transition-all duration-300 hover:scale-105"
        >
          Create your Muse
        </Button>
        
        <p className="text-sm text-muted-foreground">
          Join thousands of creators worldwide
        </p>
      </div>
    </div>
  );
};