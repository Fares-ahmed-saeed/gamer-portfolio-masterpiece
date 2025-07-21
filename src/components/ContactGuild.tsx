import { Mail, Github, Linkedin, MessageCircle, MapPin, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const contactMethods = [
  {
    name: "البريد الإلكتروني",
    value: "developer@example.com",
    icon: Mail,
    action: "mailto:developer@example.com",
    color: "primary"
  },
  {
    name: "GitHub",
    value: "github.com/developer",
    icon: Github,
    action: "https://github.com",
    color: "secondary"
  },
  {
    name: "LinkedIn",
    value: "linkedin.com/in/developer",
    icon: Linkedin,
    action: "https://linkedin.com",
    color: "accent"
  },
  {
    name: "واتساب",
    value: "+20 XXX XXX XXXX",
    icon: MessageCircle,
    action: "https://wa.me/20xxxxxxxxx",
    color: "neon-blue"
  }
];

export function ContactGuild() {
  return (
    <Card className="gaming-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-glow">
          <MessageCircle className="w-6 h-6 text-primary" />
          اتصل بالمطور
        </CardTitle>
        <p className="text-muted-foreground">جاهز للانضمام إلى مشروعك القادم!</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid gap-3">
          {contactMethods.map((method) => {
            const IconComponent = method.icon;
            
            return (
              <div 
                key={method.name}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-smooth group cursor-pointer"
                onClick={() => window.open(method.action, '_blank')}
              >
                <div className={`w-10 h-10 rounded-lg bg-${method.color} flex items-center justify-center glow-${method.color} group-hover:scale-110 transition-bounce`}>
                  <IconComponent className="w-5 h-5 text-primary-foreground" />
                </div>
                
                <div className="flex-1">
                  <div className="font-medium">{method.name}</div>
                  <div className="text-sm text-muted-foreground">{method.value}</div>
                </div>
                
                <div className="opacity-0 group-hover:opacity-100 transition-smooth">
                  <div className="w-2 h-2 bg-accent rounded-full animate-glow-pulse"></div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="border-t border-border pt-4 space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>مصر، القاهرة</span>
          </div>
          
          <div className="flex gap-2">
            <Button variant="gaming" className="flex-1">
              <Mail className="w-4 h-4" />
              إرسال رسالة
            </Button>
            <Button variant="neon" className="flex-1">
              <Phone className="w-4 h-4" />
              اتصال سريع
            </Button>
          </div>
        </div>
        
        <div className="bg-gradient-primary p-4 rounded-lg text-center">
          <div className="text-primary-foreground font-bold mb-1">
            💼 متاح للعمل الآن
          </div>
          <div className="text-primary-foreground/80 text-sm">
            جاهز لتطوير مشروعك القادم بأحدث التقنيات
          </div>
        </div>
      </CardContent>
    </Card>
  );
}