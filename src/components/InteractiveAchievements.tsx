
import React, { useState, useEffect } from 'react';
import { Trophy, Star, Zap, Target, Award, Crown, Medal, Gift } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  category: string;
  points: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  unlockedAt?: Date;
  requirements: string[];
}

const achievements: Achievement[] = [
  {
    id: 'explorer',
    title: 'مستكشف المجرة',
    description: 'قم بزيارة جميع الأقسام في الموقع',
    icon: Trophy,
    category: 'exploration',
    points: 100,
    rarity: 'common',
    progress: 4,
    maxProgress: 6,
    unlocked: false,
    requirements: ['زيارة قسم المهارات', 'زيارة قسم المشاريع', 'زيارة قسم الإنجازات']
  },
  {
    id: 'developer',
    title: 'مطور محترف',
    description: 'استكشف 10 مشاريع مختلفة',
    icon: Crown,
    category: 'projects',
    points: 250,
    rarity: 'rare',
    progress: 7,
    maxProgress: 10,
    unlocked: false,
    requirements: ['فتح 10 مشاريع', 'قضاء 5 دقائق في قسم المشاريع']
  },
  {
    id: 'speed_runner',
    title: 'عداء سريع',
    description: 'استكشف الموقع في أقل من دقيقتين',
    icon: Zap,
    category: 'speed',
    points: 150,
    rarity: 'epic',
    progress: 1,
    maxProgress: 1,
    unlocked: true,
    unlockedAt: new Date('2024-01-15'),
    requirements: ['إكمال الجولة في أقل من 120 ثانية']
  },
  {
    id: 'master',
    title: 'سيد التقنية',
    description: 'اكتشف جميع المهارات المتاحة',
    icon: Medal,
    category: 'skills',
    points: 500,
    rarity: 'legendary',
    progress: 15,
    maxProgress: 20,
    unlocked: false,
    requirements: ['فتح جميع أقسام المهارات', 'قضاء 10 دقائق في استكشاف المهارات']
  }
];

const rarityColors = {
  common: 'from-gray-400 to-gray-600',
  rare: 'from-blue-400 to-blue-600',
  epic: 'from-purple-400 to-purple-600',
  legendary: 'from-yellow-400 to-orange-500'
};

const rarityGlow = {
  common: 'shadow-gray-400/20',
  rare: 'shadow-blue-400/30',
  epic: 'shadow-purple-400/40',
  legendary: 'shadow-yellow-400/50'
};

export function InteractiveAchievements() {
  const [selectedAchievement, setSelectedAchievement] = useState<string | null>(null);
  const [userPoints, setUserPoints] = useState(850);
  const [newlyUnlocked, setNewlyUnlocked] = useState<string[]>([]);

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalPoints = achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.points, 0);

  useEffect(() => {
    // Simulate achievement checking
    const checkAchievements = () => {
      achievements.forEach(achievement => {
        if (!achievement.unlocked && achievement.progress >= achievement.maxProgress) {
          achievement.unlocked = true;
          achievement.unlockedAt = new Date();
          setNewlyUnlocked(prev => [...prev, achievement.id]);
          
          // Remove from newly unlocked after 3 seconds
          setTimeout(() => {
            setNewlyUnlocked(prev => prev.filter(id => id !== achievement.id));
          }, 3000);
        }
      });
    };

    const interval = setInterval(checkAchievements, 1000);
    return () => clearInterval(interval);
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'exploration': return Target;
      case 'projects': return Award;
      case 'speed': return Zap;
      case 'skills': return Star;
      default: return Trophy;
    }
  };

  return (
    <div className="space-y-6">
      {/* Achievement Stats Dashboard */}
      <Card className="gaming-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Trophy className="w-8 h-8 text-primary" />
            لوحة الإنجازات التفاعلية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-primary/10 rounded-lg">
              <div className="text-3xl font-bold text-primary">{unlockedCount}</div>
              <div className="text-sm text-muted-foreground">إنجازات مفتوحة</div>
            </div>
            <div className="text-center p-4 bg-secondary/10 rounded-lg">
              <div className="text-3xl font-bold text-secondary">{totalPoints}</div>
              <div className="text-sm text-muted-foreground">نقاط مكتسبة</div>
            </div>
            <div className="text-center p-4 bg-accent/10 rounded-lg">
              <div className="text-3xl font-bold text-accent">{Math.round((unlockedCount / achievements.length) * 100)}%</div>
              <div className="text-sm text-muted-foreground">نسبة الإكمال</div>
            </div>
            <div className="text-center p-4 bg-muted/10 rounded-lg">
              <div className="text-3xl font-bold">{achievements.length - unlockedCount}</div>
              <div className="text-sm text-muted-foreground">إنجازات متبقية</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((achievement) => {
          const IconComponent = achievement.icon;
          const CategoryIcon = getCategoryIcon(achievement.category);
          const isNewlyUnlocked = newlyUnlocked.includes(achievement.id);
          
          return (
            <Card
              key={achievement.id}
              className={`gaming-card cursor-pointer transition-all duration-300 hover:scale-105 ${
                achievement.unlocked ? 'ring-2 ring-primary/50' : 'opacity-75'
              } ${isNewlyUnlocked ? 'animate-pulse ring-4 ring-yellow-400' : ''} ${
                selectedAchievement === achievement.id ? 'ring-2 ring-accent' : ''
              } ${rarityGlow[achievement.rarity]}`}
              onClick={() => setSelectedAchievement(
                selectedAchievement === achievement.id ? null : achievement.id
              )}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${rarityColors[achievement.rarity]} flex items-center justify-center`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {achievement.points} نقطة
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>التقدم</span>
                    <span>{achievement.progress}/{achievement.maxProgress}</span>
                  </div>
                  <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-2" />
                </div>

                <div className="flex items-center justify-between mt-3">
                  <Badge className={`bg-gradient-to-r ${rarityColors[achievement.rarity]} text-white border-0`}>
                    {achievement.rarity}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <CategoryIcon className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{achievement.category}</span>
                  </div>
                </div>

                {selectedAchievement === achievement.id && (
                  <div className="mt-4 pt-4 border-t border-border animate-fade-in">
                    <h4 className="font-semibold text-sm mb-2">المتطلبات:</h4>
                    <ul className="space-y-1">
                      {achievement.requirements.map((req, index) => (
                        <li key={index} className="text-xs text-muted-foreground flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          {req}
                        </li>
                      ))}
                    </ul>
                    {achievement.unlocked && achievement.unlockedAt && (
                      <div className="mt-2 text-xs text-accent">
                        تم الفتح في: {achievement.unlockedAt.toLocaleDateString('ar')}
                      </div>
                    )}
                  </div>
                )}

                {isNewlyUnlocked && (
                  <div className="absolute -top-2 -right-2">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-ping">
                      <Gift className="w-4 h-4 text-yellow-900" />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Achievement Categories */}
      <Card className="gaming-card">
        <CardHeader>
          <CardTitle>فئات الإنجازات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['exploration', 'projects', 'speed', 'skills'].map((category) => {
              const CategoryIcon = getCategoryIcon(category);
              const categoryAchievements = achievements.filter(a => a.category === category);
              const unlockedInCategory = categoryAchievements.filter(a => a.unlocked).length;
              
              return (
                <div key={category} className="text-center p-4 bg-muted/5 rounded-lg">
                  <CategoryIcon className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <h4 className="font-semibold text-sm mb-1">{category}</h4>
                  <p className="text-xs text-muted-foreground">
                    {unlockedInCategory}/{categoryAchievements.length} مكتمل
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
