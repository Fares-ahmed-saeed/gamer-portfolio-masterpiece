
import React from 'react';
import { Code, Database, Palette, Zap, Brain, Globe, Star, Trophy, Target, Rocket, Shield, Cpu } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SkillTree } from './SkillTree';
import { useState } from 'react';

const skills = [
  { 
    name: "React.js", 
    level: 9, 
    maxLevel: 10, 
    icon: Code, 
    experience: 90, 
    category: "frontend", 
    description: "إطار عمل JavaScript قوي لبناء واجهات المستخدم التفاعلية",
    projects: 25,
    hoursExperience: 1200,
    certifications: ["React Developer", "Advanced React Patterns"]
  },
  { 
    name: "TypeScript", 
    level: 8, 
    maxLevel: 10, 
    icon: Code, 
    experience: 85, 
    category: "frontend", 
    description: "لغة برمجة قوية مع نظام الأنواع المتقدم",
    projects: 20,
    hoursExperience: 800,
    certifications: ["TypeScript Expert"]
  },
  { 
    name: "Node.js", 
    level: 7, 
    maxLevel: 10, 
    icon: Database, 
    experience: 75, 
    category: "backend", 
    description: "بيئة تشغيل JavaScript لتطوير الخوادم",
    projects: 15,
    hoursExperience: 600,
    certifications: ["Node.js Professional"]
  },
  { 
    name: "UI/UX Design", 
    level: 6, 
    maxLevel: 10, 
    icon: Palette, 
    experience: 65, 
    category: "design", 
    description: "تصميم واجهات المستخدم وتجربة المستخدم",
    projects: 18,
    hoursExperience: 400,
    certifications: ["UX Designer", "Figma Expert"]
  },
  { 
    name: "Next.js", 
    level: 8, 
    maxLevel: 10, 
    icon: Globe, 
    experience: 80, 
    category: "frontend", 
    description: "إطار عمل React للتطبيقات الإنتاجية",
    projects: 12,
    hoursExperience: 500,
    certifications: ["Next.js Developer"]
  },
  { 
    name: "MongoDB", 
    level: 7, 
    maxLevel: 10, 
    icon: Database, 
    experience: 70, 
    category: "backend", 
    description: "قاعدة بيانات NoSQL مرنة",
    projects: 10,
    hoursExperience: 350,
    certifications: ["MongoDB Professional"]
  },
  { 
    name: "Python", 
    level: 8, 
    maxLevel: 10, 
    icon: Cpu, 
    experience: 82, 
    category: "backend", 
    description: "لغة برمجة متعددة الاستخدامات للذكاء الاصطناعي",
    projects: 22,
    hoursExperience: 900,
    certifications: ["Python Expert", "AI Developer"]
  },
  { 
    name: "Docker", 
    level: 6, 
    maxLevel: 10, 
    icon: Shield, 
    experience: 60, 
    category: "tools", 
    description: "تقنية الحاويات لنشر التطبيقات",
    projects: 8,
    hoursExperience: 250,
    certifications: ["Docker Certified"]
  },
];

const categoryColors = {
  frontend: "primary",
  backend: "secondary", 
  design: "accent",
  tools: "neon-orange"
};

const categoryInfo = {
  frontend: {
    icon: Code,
    title: "Frontend Development",
    description: "بناء واجهات المستخدم التفاعلية",
    totalProjects: 57,
    totalHours: 2000
  },
  backend: {
    icon: Database,
    title: "Backend Development",
    description: "تطوير الخوادم وقواعد البيانات",
    totalProjects: 35,
    totalHours: 1250
  },
  design: {
    icon: Palette,
    title: "UI/UX Design",
    description: "التصميم الإبداعي والمرئي",
    totalProjects: 18,
    totalHours: 400
  },
  tools: {
    icon: Shield,
    title: "DevOps & Tools",
    description: "أدوات التطوير والنشر",
    totalProjects: 8,
    totalHours: 250
  }
};

export function GameSkillsArea() {
  const [showTree, setShowTree] = useState(false);
  const totalProjects = skills.reduce((sum, skill) => sum + skill.projects, 0);
  const totalHours = skills.reduce((sum, skill) => sum + skill.hoursExperience, 0);
  const totalCertifications = skills.reduce((sum, skill) => sum + skill.certifications.length, 0);

  return (
    <Card className="gaming-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-glow text-2xl animate-fade-in">
          <Brain className="w-8 h-8 text-primary animate-pulse" />
          🎯 Skills Arena - Master Zone
        </CardTitle>
        <p className="text-muted-foreground animate-slide-in-right">
          مرحباً بكم في ساحة المهارات! استكشف خبرتي التقنية ومستوى إتقاني لكل مهارة
        </p>
        <div className="flex gap-2 mt-4">
          <Button variant={showTree ? 'outline' : 'gaming'} onClick={() => setShowTree(false)}>
            عرض المهارات كمستويات
          </Button>
          <Button variant={showTree ? 'gaming' : 'outline'} onClick={() => setShowTree(true)}>
            عرض شجرة المهارات
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        {showTree ? (
          <SkillTree />
        ) : (
          <>
            {/* Overall Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gradient-primary/10 rounded-lg border border-primary/20 animate-scale-in">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary animate-bounce">{totalProjects}</div>
                <div className="text-sm text-muted-foreground">إجمالي المشاريع</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary animate-bounce" style={{ animationDelay: '0.1s' }}>{totalHours}</div>
                <div className="text-sm text-muted-foreground">ساعات الخبرة</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent animate-bounce" style={{ animationDelay: '0.2s' }}>{totalCertifications}</div>
                <div className="text-sm text-muted-foreground">الشهادات</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-neon-pink animate-bounce" style={{ animationDelay: '0.3s' }}>{skills.length}</div>
                <div className="text-sm text-muted-foreground">المهارات</div>
              </div>
            </div>

            {/* Skills Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <div key={skill.name} className="group relative animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex items-start gap-4 p-6 rounded-lg bg-muted/50 hover:bg-muted transition-smooth border border-border hover:border-primary/50 hover:scale-105 hover:shadow-lg">
                    <div className="relative">
                      <div className={`w-14 h-14 rounded-lg bg-${categoryColors[skill.category]} flex items-center justify-center glow-${categoryColors[skill.category]} group-hover:animate-bounce`}>
                        <skill.icon className="w-7 h-7 text-primary-foreground" />
                      </div>
                      <Badge 
                        variant="secondary" 
                        className="absolute -top-2 -right-2 text-xs h-6 w-6 rounded-full p-0 flex items-center justify-center font-bold animate-pulse"
                      >
                        {skill.level}
                      </Badge>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg group-hover:text-primary transition-colors text-wrap-safe">{skill.name}</h3>
                        <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                          {Array.from({ length: skill.level }).map((_, i) => (
                            <Star 
                              key={i} 
                              className="w-3 h-3 fill-accent text-accent animate-twinkle" 
                              style={{ animationDelay: `${i * 0.1}s` }}
                            />
                          ))}
                          {Array.from({ length: skill.maxLevel - skill.level }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 text-muted-foreground" />
                          ))}
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{skill.description}</p>
                      
                      <div className="skill-bar mb-3">
                        <div 
                          className="skill-fill relative group-hover:animate-pulse" 
                          style={{ width: `${skill.experience}%` }}
                        >
                          <div className="absolute right-2 top-0 h-full flex items-center">
                            <span className="text-xs font-bold text-primary-foreground">
                              {skill.experience}%
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Trophy className="w-3 h-3" />
                          <span>{skill.projects} مشروع</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Target className="w-3 h-3" />
                          <span>{skill.hoursExperience} ساعة</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {skill.certifications.map((cert, certIndex) => (
                          <Badge 
                            key={cert} 
                            variant="outline" 
                            className="text-xs hover:scale-110 transition-transform animate-fade-in"
                            style={{ animationDelay: `${certIndex * 0.1}s` }}
                          >
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced Skill Categories */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-border">
              {Object.entries(categoryInfo).map(([key, category], index) => (
                <div key={key} className="text-center animate-fade-in" style={{ animationDelay: `${0.5 + index * 0.1}s` }}>
                  <div className={`w-16 h-16 bg-${categoryColors[key]}/20 rounded-full flex items-center justify-center mx-auto mb-3 glow-${categoryColors[key]} hover:animate-bounce cursor-pointer group`}>
                    <category.icon className={`w-8 h-8 text-${categoryColors[key]} group-hover:scale-110 transition-transform`} />
                  </div>
                  <h3 className={`font-bold text-${categoryColors[key]} mb-1`}>{category.title}</h3>
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{category.description}</p>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>{category.totalProjects} مشروع</div>
                    <div>{category.totalHours} ساعة</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4 animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <Button variant="gaming" className="flex-1 hover:scale-105 transition-transform">
                <Zap className="w-4 h-4 animate-pulse" />
                تحدي المهارات
              </Button>
              <Button variant="neon" className="flex-1 hover:scale-105 transition-transform">
                <Brain className="w-4 h-4 animate-pulse" />
                اختبار القدرات
              </Button>
              <Button variant="outline" className="flex-1 hover:scale-105 transition-transform">
                <Rocket className="w-4 h-4 animate-pulse" />
                مهارات جديدة
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
