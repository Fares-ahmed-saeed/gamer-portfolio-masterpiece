
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Rocket, Star, Zap, Globe, Code, Trophy } from 'lucide-react';

export function HeroSection() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-background/60"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="mb-8 animate-fade-in">
          <Badge variant="outline" className="mb-4 animate-pulse">
            <Star className="w-4 h-4 mr-2" />
            Professional Developer Since 2022
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-glow">
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-gradient">
              Fares Ahmed
            </span>
          </h1>
          
          <h2 className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-6 animate-slide-in-right">
            Full Stack Developer & Digital Creator
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.5s' }}>
            Building the future with cutting-edge technologies. 
            <span className="text-primary font-semibold">3+ years</span> of experience in creating 
            innovative web solutions and digital experiences.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <div className="text-center animate-scale-in" style={{ animationDelay: '0.6s' }}>
            <div className="text-3xl font-bold text-primary mb-2">3+</div>
            <div className="text-sm text-muted-foreground">Years Experience</div>
          </div>
          <div className="text-center animate-scale-in" style={{ animationDelay: '0.7s' }}>
            <div className="text-3xl font-bold text-accent mb-2">50+</div>
            <div className="text-sm text-muted-foreground">Projects Completed</div>
          </div>
          <div className="text-center animate-scale-in" style={{ animationDelay: '0.8s' }}>
            <div className="text-3xl font-bold text-secondary mb-2">15+</div>
            <div className="text-sm text-muted-foreground">Technologies</div>
          </div>
          <div className="text-center animate-scale-in" style={{ animationDelay: '0.9s' }}>
            <div className="text-3xl font-bold text-neon-pink mb-2">100%</div>
            <div className="text-sm text-muted-foreground">Client Satisfaction</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: '1s' }}>
          <Button size="lg" variant="gaming" className="group">
            <Rocket className="w-5 h-5 mr-2 group-hover:animate-bounce" />
            Explore Projects
          </Button>
          <Button size="lg" variant="neon" className="group">
            <Code className="w-5 h-5 mr-2 group-hover:animate-pulse" />
            View Skills
          </Button>
          <Button size="lg" variant="outline" className="group">
            <Globe className="w-5 h-5 mr-2 group-hover:animate-spin" />
            Contact Me
          </Button>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-10 left-10 animate-float">
          <div className="w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
        </div>
        <div className="absolute bottom-10 right-10 animate-float" style={{ animationDelay: '2s' }}>
          <div className="w-16 h-16 bg-accent/10 rounded-full blur-xl"></div>
        </div>
        <div className="absolute top-1/2 left-4 animate-float" style={{ animationDelay: '1s' }}>
          <Trophy className="w-8 h-8 text-secondary/30" />
        </div>
        <div className="absolute top-1/4 right-8 animate-float" style={{ animationDelay: '3s' }}>
          <Zap className="w-6 h-6 text-primary/30" />
        </div>
      </div>
    </div>
  );
}
