
import React from 'react';
import { Rocket } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InteractiveProjectViewer } from './InteractiveProjectViewer';

export function GameProjectsArea() {
  return (
    <Card className="gaming-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-glow text-2xl animate-fade-in">
          <Rocket className="w-8 h-8 text-primary animate-pulse" />
          🏭 Projects Factory - مركز الابتكار التفاعلي
        </CardTitle>
        <p className="text-muted-foreground animate-slide-in-right">
          مرحباً بكم في مصنع المشاريع التفاعلي! استكشف المشاريع بطريقة تفاعلية جديدة
        </p>
      </CardHeader>
      
      <CardContent>
        <InteractiveProjectViewer />
      </CardContent>
    </Card>
  );
}
