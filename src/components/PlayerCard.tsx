import { User, Trophy, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface PlayerCardProps {
  name: string;
  title: string;
  level: number;
  xp: number;
  maxXp: number;
}

export function PlayerCard({ name, title, level, xp, maxXp }: PlayerCardProps) {
  const xpPercentage = (xp / maxXp) * 100;

  return (
    <Card className="gaming-card relative overflow-hidden">
      <div className="absolute inset-0 gradient-hero opacity-20"></div>
      <CardContent className="relative p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center glow-primary">
              <User className="w-8 h-8 text-primary-foreground" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center text-xs font-bold text-accent-foreground animate-glow-pulse">
              {level}
            </div>
          </div>
          
          <div className="flex-1">
            <h2 className="text-xl font-bold text-glow text-primary">{name}</h2>
            <p className="text-muted-foreground">{title}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-accent" />
            <span className="text-accent font-bold">Lvl {level}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Experience</span>
            <span className="text-primary font-mono">{xp}/{maxXp} XP</span>
          </div>
          
          <div className="skill-bar">
            <div 
              className="skill-fill" 
              style={{ width: `${xpPercentage}%` }}
            />
          </div>
        </div>
        
        <div className="flex gap-2 mt-4">
          <Button variant="gaming" size="sm" className="flex-1">
            <Star className="w-4 h-4" />
            View Stats
          </Button>
          <Button variant="neon" size="sm" className="flex-1">
            <Zap className="w-4 h-4" />
            Power Up
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}