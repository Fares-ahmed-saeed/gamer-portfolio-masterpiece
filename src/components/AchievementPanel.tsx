import { Trophy, Award, Medal, Crown, Star, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
  unlocked: boolean;
  date?: string;
  progress?: number;
  maxProgress?: number;
}

const achievements: Achievement[] = [
  {
    id: "1",
    title: "Code Master",
    description: "أكمل 10 مشاريع بنجاح",
    icon: Crown,
    rarity: "Legendary",
    unlocked: true,
    date: "2024"
  },
  {
    id: "2",
    title: "React Ninja",
    description: "أتقن مكتبة React.js",
    icon: Star,
    rarity: "Epic",
    unlocked: true,
    date: "2023"
  },
  {
    id: "3",
    title: "Full Stack Warrior",
    description: "طور تطبيقات Full Stack",
    icon: Trophy,
    rarity: "Epic", 
    unlocked: true,
    date: "2024"
  },
  {
    id: "4",
    title: "Bug Hunter",
    description: "اصلح 100 خطأ برمجي",
    icon: Zap,
    rarity: "Rare",
    unlocked: true,
    date: "2024"
  },
  {
    id: "5",
    title: "Speed Coder",
    description: "أكمل مشروع في أقل من أسبوع",
    icon: Medal,
    rarity: "Rare",
    unlocked: false,
    progress: 3,
    maxProgress: 7
  },
  {
    id: "6",
    title: "Team Player",
    description: "اعمل في فريق تطوير",
    icon: Award,
    rarity: "Common",
    unlocked: false,
    progress: 1,
    maxProgress: 3
  }
];

const rarityColors = {
  "Common": "muted-foreground",
  "Rare": "primary",
  "Epic": "secondary", 
  "Legendary": "accent"
};

const rarityBorders = {
  "Common": "border-muted",
  "Rare": "border-primary",
  "Epic": "border-secondary",
  "Legendary": "border-accent"
};

export function AchievementPanel() {
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;
  const completionRate = Math.round((unlockedCount / totalCount) * 100);

  return (
    <Card className="gaming-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-glow">
          <Trophy className="w-6 h-6 text-accent" />
          الإنجازات
        </CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{unlockedCount}/{totalCount} مكتمل</span>
          <div className="flex-1 skill-bar">
            <div 
              className="h-full bg-accent transition-all duration-1000" 
              style={{ width: `${completionRate}%` }}
            />
          </div>
          <span className="text-accent font-bold">{completionRate}%</span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {achievements.map((achievement) => {
          const IconComponent = achievement.icon;
          
          return (
            <div 
              key={achievement.id}
              className={`relative p-3 rounded-lg border-2 transition-smooth ${
                achievement.unlocked 
                  ? `${rarityBorders[achievement.rarity]} bg-card hover:glow-${rarityColors[achievement.rarity]}` 
                  : "border-muted bg-muted/20 opacity-60"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`relative p-2 rounded-lg ${
                  achievement.unlocked 
                    ? `bg-${rarityColors[achievement.rarity]} text-${rarityColors[achievement.rarity]}-foreground` 
                    : "bg-muted text-muted-foreground"
                }`}>
                  <IconComponent className="w-5 h-5" />
                  
                  {achievement.unlocked && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-glow-pulse"></div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold">{achievement.title}</h4>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        achievement.unlocked 
                          ? `text-${rarityColors[achievement.rarity]} border-${rarityColors[achievement.rarity]}` 
                          : "text-muted-foreground border-muted"
                      }`}
                    >
                      {achievement.rarity}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">
                    {achievement.description}
                  </p>
                  
                  {achievement.unlocked && achievement.date && (
                    <p className="text-xs text-accent">تم الإنجاز في {achievement.date}</p>
                  )}
                  
                  {!achievement.unlocked && achievement.progress && achievement.maxProgress && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">التقدم</span>
                        <span className="text-primary">{achievement.progress}/{achievement.maxProgress}</span>
                      </div>
                      <div className="skill-bar">
                        <div 
                          className="h-full bg-primary transition-all duration-1000" 
                          style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}