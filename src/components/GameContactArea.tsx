
import React, { useState } from 'react';
import { Mail, Github, Linkedin, MessageCircle, MapPin, Phone, Send, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const contactMethods = [
  {
    name: "Email",
    value: "faresahmed2004424@gmail.com",
    icon: Mail,
    action: "mailto:faresahmed2004424@gmail.com",
    color: "primary",
    status: "Available Now"
  },
  {
    name: "GitHub",
    value: "github.com/Fares-ahmed-saeed",
    icon: Github,
    action: "https://github.com/Fares-ahmed-saeed",
    color: "secondary",
    status: "Active"
  },
  {
    name: "LinkedIn",
    value: "linkedin.com/in/fares-ahmed-31aa70356",
    icon: Linkedin,
    action: "https://www.linkedin.com/in/fares-ahmed-31aa70356/",
    color: "accent",
    status: "Updated"
  },
  {
    name: "WhatsApp",
    value: "+20 XXX XXX XXXX",
    icon: MessageCircle,
    action: "https://wa.me/20xxxxxxxxx",
    color: "neon-blue",
    status: "24/7 Available"
  }
];

export function GameContactArea() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Contact Methods */}
      <Card className="gaming-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-glow text-xl animate-fade-in">
            <MessageCircle className="w-6 h-6 text-primary animate-pulse" />
            📞 Communication Hub
          </CardTitle>
          <p className="text-muted-foreground animate-slide-in-right">
            Ready to join your next project! Choose your preferred communication method
          </p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Contact Methods Grid */}
          <div className="grid gap-3">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              
              return (
                <div 
                  key={method.name}
                  className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-smooth group cursor-pointer border border-border hover:border-primary/30 hover:scale-105 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => window.open(method.action, '_blank')}
                >
                  <div className={`w-12 h-12 rounded-lg bg-${method.color}/20 flex items-center justify-center glow-${method.color} group-hover:scale-110 transition-bounce border border-${method.color}/30 group-hover:animate-pulse`}>
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="font-medium text-lg group-hover:text-primary transition-colors">{method.name}</div>
                    <div className="text-sm text-muted-foreground">{method.value}</div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-xs text-accent font-medium animate-pulse">{method.status}</div>
                    <div className="opacity-0 group-hover:opacity-100 transition-smooth">
                      <div className="w-2 h-2 bg-accent rounded-full animate-ping"></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Location & Availability */}
          <div className="border-t border-border pt-4 space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground animate-fade-in">
              <MapPin className="w-4 h-4 animate-pulse" />
              <span>Egypt, Cairo - Local Time: GMT+2</span>
            </div>
            
            <div className="bg-gradient-primary p-4 rounded-lg text-center animate-bounce-slow">
              <div className="text-primary-foreground font-bold mb-1 animate-glow-text">
                💼 Available for Work
              </div>
              <div className="text-primary-foreground/80 text-sm">
                Ready to develop your next project with cutting-edge technologies
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Form */}
      <Card className="gaming-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-glow text-xl animate-fade-in">
            <Send className="w-6 h-6 text-primary animate-pulse" />
            ✉️ Send Quick Message
          </CardTitle>
          <p className="text-muted-foreground animate-slide-in-right">
            Send me a direct message and I'll respond as soon as possible
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="animate-scale-in" style={{ animationDelay: '0.2s' }}>
                <label className="text-sm font-medium mb-2 block">Name</label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  className="bg-muted/50 border-border focus:border-primary hover:scale-105 transition-transform"
                />
              </div>
              <div className="animate-scale-in" style={{ animationDelay: '0.3s' }}>
                <label className="text-sm font-medium mb-2 block">Email</label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="email@example.com"
                  className="bg-muted/50 border-border focus:border-primary hover:scale-105 transition-transform"
                />
              </div>
            </div>

            <div className="animate-scale-in" style={{ animationDelay: '0.4s' }}>
              <label className="text-sm font-medium mb-2 block">Subject</label>
              <Input
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Message Subject"
                className="bg-muted/50 border-border focus:border-primary hover:scale-105 transition-transform"
              />
            </div>

            <div className="animate-scale-in" style={{ animationDelay: '0.5s' }}>
              <label className="text-sm font-medium mb-2 block">Message</label>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Write your message here..."
                rows={4}
                className="bg-muted/50 border-border focus:border-primary resize-none hover:scale-105 transition-transform"
              />
            </div>

            <div className="flex gap-2 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <Button type="submit" variant="gaming" className="flex-1 hover:scale-105 transition-transform">
                <Send className="w-4 h-4 animate-pulse" />
                Send Message
              </Button>
              <Button type="button" variant="neon" className="flex-1 hover:scale-105 transition-transform">
                <Phone className="w-4 h-4 animate-pulse" />
                Quick Call
              </Button>
            </div>
          </form>

          {/* Response Time */}
          <div className="mt-6 p-3 bg-accent/10 rounded-lg border border-accent/20 animate-pulse">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-accent rounded-full animate-ping"></div>
              <span className="text-accent font-medium">Expected Response Time: 2-4 hours</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
