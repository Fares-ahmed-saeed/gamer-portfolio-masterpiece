import { ExternalLink, Star, Clock, CheckCircle2, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Quest {
  id: string;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Legendary";
  status: "completed" | "in-progress" | "locked";
  rewards: number;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
}

const quests: Quest[] = [
  {
    id: "1",
    title: "E-Commerce Empire",
    description: "قام ببناء متجر إلكتروني كامل بنظام دفع وإدارة المخزون",
    difficulty: "Legendary",
    status: "completed",
    rewards: 1500,
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    demoUrl: "#",
    githubUrl: "#"
  },
  {
    id: "2", 
    title: "Social Media Dashboard",
    description: "لوحة تحكم لإدارة وسائل التواصل الاجتماعي مع Analytics",
    difficulty: "Hard",
    status: "completed",
    rewards: 1200,
    technologies: ["Next.js", "TypeScript", "Prisma", "Charts"],
    demoUrl: "#",
    githubUrl: "#"
  },
  {
    id: "3",
    title: "Task Management System",
    description: "نظام إدارة المهام مع فرق العمل والتقويم",
    difficulty: "Medium",
    status: "in-progress",
    rewards: 800,
    technologies: ["React", "Firebase", "Tailwind", "DnD"],
  },
  {
    id: "4",
    title: "AI Chat Bot",
    description: "روبوت محادثة ذكي باستخدام تقنيات الذكاء الاصطناعي",
    difficulty: "Legendary",
    status: "locked",
    rewards: 2000,
    technologies: ["OpenAI", "WebSocket", "Redis", "Docker"],
  }
];

const difficultyColors = {
  "Easy": "accent",
  "Medium": "primary", 
  "Hard": "secondary",
  "Legendary": "neon-orange"
};

const statusIcons = {
  "completed": CheckCircle2,
  "in-progress": Clock,
  "locked": Target
};

export function QuestBoard() {
  return (
    <Card className="gaming-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-glow">
          <Target className="w-6 h-6 text-primary" />
          Quest Board - المشاريع
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {quests.map((quest) => {
          const StatusIcon = statusIcons[quest.status];
          const isLocked = quest.status === "locked";
          
          return (
            <div 
              key={quest.id} 
              className={`relative p-4 rounded-lg border transition-smooth ${
                isLocked 
                  ? "bg-muted/30 border-muted opacity-60" 
                  : "bg-card border-border hover:border-primary hover:glow-primary"
              }`}
            >
              {/* Quest Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <StatusIcon className={`w-5 h-5 ${
                    quest.status === "completed" ? "text-accent" :
                    quest.status === "in-progress" ? "text-primary" :
                    "text-muted-foreground"
                  }`} />
                  
                  <div>
                    <h3 className="font-bold text-lg">{quest.title}</h3>
                    <p className="text-sm text-muted-foreground">{quest.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="outline" 
                    className={`border-${difficultyColors[quest.difficulty]} text-${difficultyColors[quest.difficulty]}`}
                  >
                    {quest.difficulty}
                  </Badge>
                  
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Reward</div>
                    <div className="font-bold text-accent flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      {quest.rewards} XP
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Technologies */}
              <div className="flex flex-wrap gap-1 mb-3">
                {quest.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
              
              {/* Action Buttons */}
              {!isLocked && (
                <div className="flex gap-2">
                  {quest.demoUrl && (
                    <Button variant="gaming" size="sm">
                      <ExternalLink className="w-4 h-4" />
                      عرض المشروع
                    </Button>
                  )}
                  {quest.githubUrl && (
                    <Button variant="neon" size="sm">
                      <ExternalLink className="w-4 h-4" />
                      Github
                    </Button>
                  )}
                  {quest.status === "in-progress" && (
                    <Button variant="quest" size="sm">
                      <Clock className="w-4 h-4" />
                      قيد التطوير
                    </Button>
                  )}
                </div>
              )}
              
              {/* Completion indicator */}
              {quest.status === "completed" && (
                <div className="absolute top-2 right-2 w-3 h-3 bg-accent rounded-full animate-glow-pulse"></div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}