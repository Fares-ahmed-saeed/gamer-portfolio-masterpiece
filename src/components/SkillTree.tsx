import { Code, Database, Palette, Zap, Brain, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Skill {
  name: string;
  level: number;
  maxLevel: number;
  icon: React.ElementType;
  experience: number;
  category: "frontend" | "backend" | "design" | "tools";
}

const skills: Skill[] = [
  { name: "React.js", level: 9, maxLevel: 10, icon: Code, experience: 90, category: "frontend" },
  { name: "TypeScript", level: 8, maxLevel: 10, icon: Code, experience: 85, category: "frontend" },
  { name: "Node.js", level: 7, maxLevel: 10, icon: Database, experience: 75, category: "backend" },
  { name: "UI/UX Design", level: 6, maxLevel: 10, icon: Palette, experience: 65, category: "design" },
  { name: "Next.js", level: 8, maxLevel: 10, icon: Globe, experience: 80, category: "frontend" },
  { name: "MongoDB", level: 7, maxLevel: 10, icon: Database, experience: 70, category: "backend" },
];

const categoryColors = {
  frontend: "primary",
  backend: "secondary", 
  design: "accent",
  tools: "neon-orange"
};

export function SkillTree() {
  return (
    <Card className="gaming-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-glow">
          <Brain className="w-6 h-6 text-primary" />
          Skill Tree
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {skills.map((skill, index) => (
          <div key={skill.name} className="group relative">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-smooth">
              <div className="relative">
                <div className={`w-10 h-10 rounded-lg bg-${categoryColors[skill.category]} flex items-center justify-center glow-${categoryColors[skill.category]}`}>
                  <skill.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <Badge 
                  variant="secondary" 
                  className="absolute -top-2 -right-2 text-xs h-5 w-5 rounded-full p-0 flex items-center justify-center"
                >
                  {skill.level}
                </Badge>
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {skill.level}/{skill.maxLevel}
                  </span>
                </div>
                
                <div className="skill-bar">
                  <div 
                    className="skill-fill" 
                    style={{ width: `${skill.experience}%` }}
                  />
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-xs text-muted-foreground">EXP</div>
                <div className="font-mono text-sm text-primary">{skill.experience}%</div>
              </div>
            </div>
            
            {/* Connection lines between skills */}
            {index < skills.length - 1 && (
              <div className="absolute left-5 top-full w-px h-4 bg-border"></div>
            )}
          </div>
        ))}
        
        <div className="flex gap-2 pt-4 border-t border-border">
          <Badge variant="outline" className="text-primary border-primary">Frontend</Badge>
          <Badge variant="outline" className="text-secondary border-secondary">Backend</Badge>
          <Badge variant="outline" className="text-accent border-accent">Design</Badge>
        </div>
      </CardContent>
    </Card>
  );
}