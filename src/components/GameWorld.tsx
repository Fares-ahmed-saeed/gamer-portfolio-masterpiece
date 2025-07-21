import React, { useState, useEffect, useCallback } from 'react';
import { Car } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GameSkillsArea } from './GameSkillsArea';
import { GameProjectsArea } from './GameProjectsArea';
import { GameContactArea } from './GameContactArea';
import { GameAchievementsArea } from './GameAchievementsArea';
import { AdvancedSpaceBackground } from './AdvancedSpaceBackground';
import { InteractiveParticles } from './InteractiveParticles';

interface Position {
  x: number;
  y: number;
}

interface GameArea {
  id: string;
  name: string;
  position: Position;
  size: { width: number; height: number };
  color: string;
  icon: string;
  description: string;
  bgGradient: string;
}

const gameAreas: GameArea[] = [
  {
    id: 'skills',
    name: 'Skills Arena',
    position: { x: 5, y: 25 },
    size: { width: 18, height: 14 },
    color: 'bg-primary/20 border-primary shadow-primary/30',
    icon: '🎯',
    description: 'Master technical skills and unlock abilities',
    bgGradient: 'from-primary/10 via-primary/5 to-transparent'
  },
  {
    id: 'projects',
    name: 'Projects Factory',
    position: { x: 28, y: 20 },
    size: { width: 20, height: 16 },
    color: 'bg-secondary/20 border-secondary shadow-secondary/30',
    icon: '🏭',
    description: 'Explore innovative projects and solutions',
    bgGradient: 'from-secondary/10 via-secondary/5 to-transparent'
  },
  {
    id: 'achievements',
    name: 'Hall of Fame',
    position: { x: 55, y: 30 },
    size: { width: 17, height: 14 },
    color: 'bg-accent/20 border-accent shadow-accent/30',
    icon: '🏆',
    description: 'Celebrate milestones and achievements',
    bgGradient: 'from-accent/10 via-accent/5 to-transparent'
  },
  {
    id: 'contact',
    name: 'Communication Hub',
    position: { x: 12, y: 55 },
    size: { width: 19, height: 14 },
    color: 'bg-neon-pink/20 border-neon-pink shadow-neon-pink/30',
    icon: '📞',
    description: 'Connect and collaborate opportunities',
    bgGradient: 'from-neon-pink/10 via-neon-pink/5 to-transparent'
  },
  {
    id: 'experience',
    name: 'Experience Galaxy',
    position: { x: 38, y: 60 },
    size: { width: 23, height: 16 },
    color: 'bg-neon-blue/20 border-neon-blue shadow-neon-blue/30',
    icon: '🌟',
    description: 'Journey through professional experiences',
    bgGradient: 'from-neon-blue/10 via-neon-blue/5 to-transparent'
  },
  {
    id: 'education',
    name: 'Learning Cosmos',
    position: { x: 68, y: 55 },
    size: { width: 19, height: 12 },
    color: 'bg-neon-orange/20 border-neon-orange shadow-neon-orange/30',
    icon: '🎓',
    description: 'Discover educational journeys and knowledge',
    bgGradient: 'from-neon-orange/10 via-neon-orange/5 to-transparent'
  }
];

export function GameWorld() {
  const [carPosition, setCarPosition] = useState<Position>({ x: 2, y: 8 });
  const [currentArea, setCurrentArea] = useState<string | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [showAreaContent, setShowAreaContent] = useState(false);
  const [worldSize, setWorldSize] = useState({ width: 100, height: 70 });

  const moveSpeed = 2;

  // Update world size based on screen size
  useEffect(() => {
    const updateWorldSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      if (width < 640) { // mobile
        setWorldSize({ width: 90, height: 60 });
      } else if (width < 1024) { // tablet
        setWorldSize({ width: 100, height: 70 });
      } else { // desktop
        setWorldSize({ width: 100, height: 70 });
      }
    };

    updateWorldSize();
    window.addEventListener('resize', updateWorldSize);
    return () => window.removeEventListener('resize', updateWorldSize);
  }, []);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (!gameStarted || showAreaContent) return;

    const { key } = event;
    event.preventDefault();
    
    setCarPosition(prev => {
      let newX = prev.x;
      let newY = prev.y;

      switch (key.toLowerCase()) {
        case 'arrowright':
        case 'd':
          newX = Math.min(prev.x + moveSpeed, worldSize.width - 8);
          break;
        case 'arrowleft':
        case 'a':
          newX = Math.max(prev.x - moveSpeed, 0);
          break;
        case 'arrowup':
        case 'w':
          newY = Math.max(prev.y - moveSpeed, 0);
          break;
        case 'arrowdown':
        case 's':
          newY = Math.min(prev.y + moveSpeed, worldSize.height - 8);
          break;
        case 'enter':
          if (currentArea) {
            setShowAreaContent(true);
          }
          break;
        case 'escape':
          setShowAreaContent(false);
          break;
      }

      return { x: newX, y: newY };
    });
  }, [gameStarted, showAreaContent, currentArea, moveSpeed, worldSize]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    if (!gameStarted || showAreaContent) return;

    // Check if car is in any area
    const inArea = gameAreas.find(area => {
      const carCenterX = carPosition.x + 4;
      const carCenterY = carPosition.y + 4;
      
      return (
        carCenterX >= area.position.x &&
        carCenterX <= area.position.x + area.size.width &&
        carCenterY >= area.position.y &&
        carCenterY <= area.position.y + area.size.height
      );
    });

    setCurrentArea(inArea ? inArea.id : null);
  }, [carPosition, gameStarted, showAreaContent]);

  const startGame = () => {
    setGameStarted(true);
    setShowInstructions(false);
  };

  const closeAreaContent = () => {
    setShowAreaContent(false);
  };

  const renderAreaContent = () => {
    if (!currentArea) return null;

    const contentClass = "space-content-container";

    switch (currentArea) {
      case 'skills':
        return (
          <div className={contentClass}>
            <GameSkillsArea />
          </div>
        );
      case 'projects':
        return (
          <div className={contentClass}>
            <GameProjectsArea />
          </div>
        );
      case 'achievements':
        return (
          <div className={contentClass}>
            <GameAchievementsArea />
          </div>
        );
      case 'contact':
        return (
          <div className={contentClass}>
            <GameContactArea />
          </div>
        );
      case 'experience':
        return (
          <div className={contentClass}>
            <Card className="space-themed-card">
              <CardContent className="p-8 space-y-8">
                <div className="text-center space-y-4">
                  <div className="text-6xl animate-float">🌟</div>
                  <h2 className="text-4xl font-bold gradient-text animate-glow-text">
                    Professional Experience Galaxy
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in">
                    Journey through my professional experiences across different dimensions of technology and innovation
                  </p>
                </div>
                
                <div className="grid gap-8 max-w-4xl mx-auto">
                  <div className="experience-card group animate-scale-in">
                    <div className="flex items-start gap-6">
                      <div className="experience-icon">
                        <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-2xl animate-pulse">
                          🚀
                        </div>
                      </div>
                      <div className="flex-1 space-y-4">
                        <div className="space-y-2">
                          <h3 className="text-2xl font-bold text-primary animate-fade-in">Senior Full Stack Developer</h3>
                          <p className="text-accent font-semibold animate-slide-in-right">TechNova Solutions | 2022 - 2025</p>
                        </div>
                        <p className="text-muted-foreground leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
                          Leading the development of cutting-edge web applications using React, Node.js, and cloud technologies. 
                          Architected scalable microservices handling millions of users daily. Mentored junior developers and 
                          implemented best practices for code quality and performance optimization.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {["React", "Node.js", "AWS", "MongoDB", "TypeScript"].map((tech, index) => (
                            <span key={tech} className="skill-tag animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="experience-card group animate-scale-in" style={{ animationDelay: '0.2s' }}>
                    <div className="flex items-start gap-6">
                      <div className="experience-icon">
                        <div className="w-16 h-16 rounded-full bg-gradient-secondary flex items-center justify-center text-2xl animate-pulse">
                          💻
                        </div>
                      </div>
                      <div className="flex-1 space-y-4">
                        <div className="space-y-2">
                          <h3 className="text-2xl font-bold text-secondary animate-fade-in">Frontend Developer</h3>
                          <p className="text-accent font-semibold animate-slide-in-right">Creative Digital Agency | 2022 - 2025</p>
                        </div>
                        <p className="text-muted-foreground leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
                          Designed and developed responsive, interactive user interfaces for high-profile clients. 
                          Collaborated with design teams to create pixel-perfect implementations and optimized 
                          user experiences across multiple devices and browsers.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {["React", "Vue.js", "Sass", "JavaScript", "Figma"].map((tech, index) => (
                            <span key={tech} className="skill-tag animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="experience-card group animate-scale-in" style={{ animationDelay: '0.4s' }}>
                    <div className="flex items-start gap-6">
                      <div className="experience-icon">
                        <div className="w-16 h-16 rounded-full bg-gradient-accent flex items-center justify-center text-2xl animate-pulse">
                          🎯
                        </div>
                      </div>
                      <div className="flex-1 space-y-4">
                        <div className="space-y-2">
                          <h3 className="text-2xl font-bold text-accent animate-fade-in">Junior Web Developer</h3>
                          <p className="text-accent font-semibold animate-slide-in-right">StartupTech Inc. | 2022 - 2025</p>
                        </div>
                        <p className="text-muted-foreground leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
                          Started my professional journey in web development, working on various projects from 
                          simple landing pages to complex web applications. Gained valuable experience in 
                          full-stack development and agile methodologies.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {["HTML/CSS", "JavaScript", "PHP", "MySQL", "Git"].map((tech, index) => (
                            <span key={tech} className="skill-tag animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case 'education':
        return (
          <div className={contentClass}>
            <Card className="space-themed-card">
              <CardContent className="p-8 space-y-8">
                <div className="text-center space-y-4">
                  <div className="text-6xl animate-float">🎓</div>
                  <h2 className="text-4xl font-bold gradient-text animate-glow-text">
                    Learning Cosmos & Knowledge Universe
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in">
                    Explore my educational journey and continuous learning adventures across the cosmos of knowledge
                  </p>
                </div>
                
                <div className="grid gap-8 max-w-4xl mx-auto">
                  <div className="education-card group animate-scale-in">
                    <div className="flex items-start gap-6">
                      <div className="education-icon">
                        <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-2xl animate-pulse">
                          🏛️
                        </div>
                      </div>
                      <div className="flex-1 space-y-4">
                        <div className="space-y-2">
                          <h3 className="text-2xl font-bold text-primary animate-fade-in">Bachelor of Computer Science</h3>
                          <p className="text-accent font-semibold animate-slide-in-right">University of Technology | 2022 - 2025</p>
                          <div className="inline-block px-3 py-1 bg-primary/20 rounded-full text-primary text-sm font-bold animate-pulse">
                            Magna Cum Laude - GPA: 3.8/4.0
                          </div>
                        </div>
                        <p className="text-muted-foreground leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
                          Comprehensive study in software engineering, algorithms, data structures, and computer systems. 
                          Specialized in web development and artificial intelligence. Completed capstone project on 
                          machine learning applications in web development.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {["Software Engineering", "Data Structures", "Algorithms", "Database Systems", "AI/ML"].map((tech, index) => (
                            <span key={tech} className="skill-tag animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="education-card group animate-scale-in" style={{ animationDelay: '0.2s' }}>
                    <div className="flex items-start gap-6">
                      <div className="education-icon">
                        <div className="w-16 h-16 rounded-full bg-gradient-secondary flex items-center justify-center text-2xl animate-pulse">
                          ☁️
                        </div>
                      </div>
                      <div className="flex-1 space-y-4">
                        <div className="space-y-2">
                          <h3 className="text-2xl font-bold text-secondary animate-fade-in">AWS Solutions Architect Professional</h3>
                          <p className="text-accent font-semibold animate-slide-in-right">Amazon Web Services | 2022 - 2025</p>
                          <div className="inline-block px-3 py-1 bg-secondary/20 rounded-full text-secondary text-sm font-bold animate-pulse">
                            Certified Professional
                          </div>
                        </div>
                        <p className="text-muted-foreground leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
                          Advanced certification in designing and deploying scalable, highly available systems on AWS. 
                          Expertise in cloud architecture, security, and cost optimization strategies.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {["Cloud Architecture", "AWS Services", "DevOps", "Security"].map((tech, index) => (
                            <span key={tech} className="skill-tag animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="education-card group animate-scale-in" style={{ animationDelay: '0.4s' }}>
                    <div className="flex items-start gap-6">
                      <div className="education-icon">
                        <div className="w-16 h-16 rounded-full bg-gradient-accent flex items-center justify-center text-2xl animate-pulse">
                          🌐
                        </div>
                      </div>
                      <div className="flex-1 space-y-4">
                        <div className="space-y-2">
                          <h3 className="text-2xl font-bold text-accent animate-fade-in">Full Stack Web Development Bootcamp</h3>
                          <p className="text-accent font-semibold animate-slide-in-right">Tech Academy Institute | 2022 - 2025</p>
                          <div className="inline-block px-3 py-1 bg-accent/20 rounded-full text-accent text-sm font-bold animate-pulse">
                            Top Graduate
                          </div>
                        </div>
                        <p className="text-muted-foreground leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
                          Intensive 6-month program covering modern web development technologies and best practices. 
                          Hands-on projects with real-world applications and collaborative development experience.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {["MERN Stack", "RESTful APIs", "Agile Development", "Testing"].map((tech, index) => (
                            <span key={tech} className="skill-tag animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="education-card group animate-scale-in" style={{ animationDelay: '0.6s' }}>
                    <div className="flex items-start gap-6">
                      <div className="education-icon">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neon-pink to-neon-blue flex items-center justify-center text-2xl animate-pulse">
                          📚
                        </div>
                      </div>
                      <div className="flex-1 space-y-4">
                        <div className="space-y-2">
                          <h3 className="text-2xl font-bold text-neon-pink animate-fade-in">Continuous Learning Journey</h3>
                          <p className="text-accent font-semibold animate-slide-in-right">Online Platforms & Communities | 2022 - 2025</p>
                        </div>
                        <p className="text-muted-foreground leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
                          Constantly expanding knowledge through online courses, tech conferences, and open-source contributions. 
                          Active participant in developer communities and always exploring emerging technologies.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {["Coursera", "Udemy", "freeCodeCamp", "GitHub", "Stack Overflow"].map((tech, index) => (
                            <span key={tech} className="skill-tag animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Advanced Space Background */}
      <AdvancedSpaceBackground />
      
      {/* Interactive Particles */}
      <InteractiveParticles />

      {/* Instructions Overlay */}
      {showInstructions && (
        <div className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="gaming-card max-w-md w-full animate-scale-in">
            <CardContent className="p-4 sm:p-6 text-center space-y-4">
              <div className="text-4xl mb-4 animate-bounce">🎮</div>
              <h2 className="text-xl sm:text-2xl font-bold gradient-primary bg-clip-text text-transparent">
                Welcome to My Digital Universe!
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                Navigate through space using arrow keys or WASD to explore different cosmic areas in my interactive portfolio
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-primary/20 rounded border text-center text-xs">↑</span>
                  <span>or W to move up</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-primary/20 rounded border text-center text-xs">↓</span>
                  <span>or S to move down</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-primary/20 rounded border text-center text-xs">←</span>
                  <span>or A to move left</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-primary/20 rounded border text-center text-xs">→</span>
                  <span>or D to move right</span>
                </div>
              </div>
              <div className="text-xs text-accent">
                💡 Press ENTER to explore area • Press ESC to exit and return
              </div>
              <Button variant="gaming" onClick={startGame} className="w-full">
                🚀 Begin Cosmic Journey
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Area Content Modal */}
      {showAreaContent && currentArea && (
        <div className="fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex items-center justify-center p-2 sm:p-4">
          <div className="max-w-6xl w-full max-h-[95vh] overflow-hidden">
            {renderAreaContent()}
            <div className="text-center mt-6">
              <Button 
                variant="outline" 
                onClick={closeAreaContent}
                className="bg-card/80 border-primary/50 hover:bg-primary/20 hover:border-primary animate-pulse"
              >
                🚀 Return to Cosmic Map (Press ESC)
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Game World */}
      <div className="relative w-full h-screen overflow-hidden" tabIndex={0}>
        {/* Enhanced Game Areas */}
        {gameAreas.map(area => (
          <div
            key={area.id}
            className={`absolute border-2 rounded-xl ${area.color} backdrop-blur-md transition-all duration-500 cursor-pointer shadow-2xl overflow-hidden ${
              currentArea === area.id ? 
                'scale-110 z-20 animate-cosmic-glow border-4 shadow-current/50' : 
                'hover:scale-105 hover:shadow-lg'
            }`}
            style={{
              left: `${area.position.x}%`,
              top: `${area.position.y}%`,
              width: `${area.size.width}%`,
              height: `${area.size.height}%`,
              background: `linear-gradient(135deg, ${area.bgGradient})`
            }}
            onClick={() => {
              if (currentArea === area.id) {
                setShowAreaContent(true);
              }
            }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center p-2 sm:p-4 text-center">
              <div className="text-2xl sm:text-3xl mb-2 animate-bounce-slow hover:animate-spin transition-all duration-300">
                {area.icon}
              </div>
              <div className="text-xs sm:text-sm font-bold leading-tight mb-1 text-glow px-1">
                {area.name}
              </div>
              <div className="text-[10px] sm:text-xs text-center text-muted-foreground/80 leading-tight px-1 line-clamp-2">
                {area.description}
              </div>
            </div>
            
            {currentArea === area.id && (
              <div className="absolute -top-24 sm:-top-28 left-1/2 transform -translate-x-1/2 bg-card/90 border-2 border-primary rounded-xl p-3 sm:p-4 text-sm whitespace-nowrap animate-cosmic-popup shadow-2xl z-30 max-w-xs backdrop-blur-sm">
                <div className="text-primary font-bold mb-2 animate-glow-text text-center text-xs sm:text-sm">Press ENTER to explore</div>
                <div className="text-muted-foreground text-xs text-center leading-relaxed px-2">{area.description}</div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-transparent border-t-primary"></div>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Enhanced Spaceship Car */}
        <div
          className="absolute w-12 h-12 sm:w-16 sm:h-16 transition-all duration-200 ease-out z-30"
          style={{
            left: `${carPosition.x}%`,
            top: `${carPosition.y}%`
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-primary via-secondary to-accent rounded-full flex items-center justify-center shadow-2xl border-4 border-primary/50 animate-cosmic-pulse">
            <div className="relative">
              <Car className="w-6 h-6 sm:w-8 sm:h-8 text-primary-foreground animate-hover-float" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full animate-ping"></div>
              <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-secondary rounded-full animate-pulse"></div>
            </div>
          </div>
          
          {/* Spaceship Trail */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-r from-primary/50 to-transparent rounded-full blur-sm animate-trail -z-10"></div>
        </div>

        {/* Game UI */}
        <div className="absolute top-2 sm:top-4 left-2 sm:left-4 space-y-2">
          <Card className="gaming-card bg-card/80 backdrop-blur-sm">
            <CardContent className="p-2 sm:p-3">
              <div className="text-xs sm:text-sm font-bold text-primary animate-pulse">🚀 Cosmic Explorer Active</div>
              <div className="text-xs text-muted-foreground">
                Position: X:{Math.round(carPosition.x)} Y:{Math.round(carPosition.y)}
              </div>
              {currentArea && (
                <div className="text-xs text-accent animate-pulse">
                  🌟 Current Sector: {gameAreas.find(a => a.id === currentArea)?.name}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
          <Card className="gaming-card bg-card/80 backdrop-blur-sm">
            <CardContent className="p-2 sm:p-3">
              <div className="text-xs font-bold text-primary mb-2 animate-pulse">🗺️ Cosmic Map</div>
              <div className="w-24 h-16 sm:w-32 sm:h-20 bg-muted/50 rounded relative border border-primary/30">
                {gameAreas.map(area => (
                  <div
                    key={area.id}
                    className={`absolute rounded-sm transition-all ${
                      currentArea === area.id ? 'bg-primary scale-125 animate-pulse' : 'bg-muted-foreground/60'
                    }`}
                    style={{
                      left: `${area.position.x}%`,
                      top: `${area.position.y}%`,
                      width: `${Math.max(6, area.size.width * 0.6)}%`,
                      height: `${Math.max(4, area.size.height * 0.6)}%`
                    }}
                  />
                ))}
                <div
                  className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-accent rounded-full animate-ping shadow-lg border border-accent/50"
                  style={{
                    left: `${carPosition.x}%`,
                    top: `${carPosition.y}%`
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4">
          <Card className="gaming-card bg-card/80 backdrop-blur-sm">
            <CardContent className="p-2 sm:p-3">
              <div className="text-xs space-y-1">
                <div className="text-primary font-bold animate-pulse">🎮 Navigation Guide:</div>
                <div className="text-muted-foreground">Arrow keys or WASD to navigate</div>
                <div className="text-muted-foreground">ENTER to explore • ESC to return</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mobile Controls */}
        <div className="absolute bottom-2 right-2 sm:hidden">
          <div className="grid grid-cols-3 gap-1 bg-card/80 backdrop-blur-sm rounded-lg p-2 border border-primary/30">
            <div></div>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-8 h-8 p-0 bg-primary/20 border-primary/50 hover:bg-primary/40"
              onTouchStart={(e) => {
                e.preventDefault();
                handleKeyPress({ key: 'ArrowUp', preventDefault: () => {}, toLowerCase: () => 'arrowup' } as any);
              }}
            >
              ↑
            </Button>
            <div></div>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-8 h-8 p-0 bg-primary/20 border-primary/50 hover:bg-primary/40"
              onTouchStart={(e) => {
                e.preventDefault();
                handleKeyPress({ key: 'ArrowLeft', preventDefault: () => {}, toLowerCase: () => 'arrowleft' } as any);
              }}
            >
              ←
            </Button>
            <Button 
              variant="gaming" 
              size="sm" 
              className="w-8 h-8 p-0"
              onTouchStart={(e) => {
                e.preventDefault();
                if (currentArea) {
                  setShowAreaContent(true);
                }
              }}
            >
              ✓
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-8 h-8 p-0 bg-primary/20 border-primary/50 hover:bg-primary/40"
              onTouchStart={(e) => {
                e.preventDefault();
                handleKeyPress({ key: 'ArrowRight', preventDefault: () => {}, toLowerCase: () => 'arrowright' } as any);
              }}
            >
              →
            </Button>
            <div></div>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-8 h-8 p-0 bg-primary/20 border-primary/50 hover:bg-primary/40"
              onTouchStart={(e) => {
                e.preventDefault();
                handleKeyPress({ key: 'ArrowDown', preventDefault: () => {}, toLowerCase: () => 'arrowdown' } as any);
              }}
            >
              ↓
            </Button>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
