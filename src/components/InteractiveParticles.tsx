
import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
  type: 'spark' | 'energy' | 'magic' | 'cosmic';
}

export const InteractiveParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0, isMoving: false });
  const [isActive, setIsActive] = useState(false);

  const particleTypes = {
    spark: {
      colors: ['hsl(45, 100%, 70%)', 'hsl(30, 100%, 65%)', 'hsl(60, 100%, 75%)'],
      size: () => Math.random() * 3 + 1,
      life: () => Math.random() * 30 + 20
    },
    energy: {
      colors: ['hsl(180, 100%, 60%)', 'hsl(200, 100%, 70%)', 'hsl(160, 100%, 65%)'],
      size: () => Math.random() * 4 + 2,
      life: () => Math.random() * 40 + 30
    },
    magic: {
      colors: ['hsl(280, 100%, 70%)', 'hsl(320, 100%, 75%)', 'hsl(260, 100%, 65%)'],
      size: () => Math.random() * 5 + 2,
      life: () => Math.random() * 50 + 40
    },
    cosmic: {
      colors: ['hsl(120, 100%, 60%)', 'hsl(90, 100%, 65%)', 'hsl(150, 100%, 70%)'],
      size: () => Math.random() * 6 + 3,
      life: () => Math.random() * 60 + 50
    }
  };

  const createParticle = (x: number, y: number, type: keyof typeof particleTypes = 'energy') => {
    const config = particleTypes[type];
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 3 + 1;
    
    return {
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: config.size(),
      color: config.colors[Math.floor(Math.random() * config.colors.length)],
      life: config.life(),
      maxLife: config.life(),
      type
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const updateParticles = () => {
      particlesRef.current = particlesRef.current.filter(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life--;
        
        // Gravity and air resistance
        particle.vy += 0.05;
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        return particle.life > 0;
      });
    };

    const drawParticles = () => {
      particlesRef.current.forEach(particle => {
        const alpha = particle.life / particle.maxLife;
        const size = particle.size * alpha;

        // Draw particle glow
        ctx.beginPath();
        ctx.fillStyle = particle.color.replace(')', ', 0.3)').replace('hsl', 'hsla');
        ctx.globalAlpha = alpha * 0.5;
        ctx.arc(particle.x, particle.y, size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Draw particle core
        ctx.beginPath();
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = alpha;
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
        ctx.fill();

        // Draw particle trail based on type
        if (particle.type === 'magic') {
          ctx.beginPath();
          ctx.strokeStyle = particle.color;
          ctx.lineWidth = size * 0.5;
          ctx.globalAlpha = alpha * 0.3;
          ctx.moveTo(particle.x - particle.vx * 5, particle.y - particle.vy * 5);
          ctx.lineTo(particle.x, particle.y);
          ctx.stroke();
        }
      });
    };

    const drawMouseEffect = () => {
      if (!isActive) return;

      const gradient = ctx.createRadialGradient(
        mouseRef.current.x, 
        mouseRef.current.y, 
        0, 
        mouseRef.current.x, 
        mouseRef.current.y, 
        100
      );
      gradient.addColorStop(0, 'hsla(180, 100%, 60%, 0.2)');
      gradient.addColorStop(0.5, 'hsla(280, 100%, 70%, 0.1)');
      gradient.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.globalAlpha = 0.8;
      ctx.arc(mouseRef.current.x, mouseRef.current.y, 100, 0, Math.PI * 2);
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      updateParticles();
      drawMouseEffect();
      drawParticles();
      
      animationRef.current = requestAnimationFrame(animate);
    };

    let lastMouseTime = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.isMoving = true;
      setIsActive(true);

      const now = Date.now();
      if (now - lastMouseTime > 50) { // Throttle particle creation
        const particleCount = Math.random() * 3 + 2;
        for (let i = 0; i < particleCount; i++) {
          const types: (keyof typeof particleTypes)[] = ['spark', 'energy', 'magic', 'cosmic'];
          const randomType = types[Math.floor(Math.random() * types.length)];
          particlesRef.current.push(createParticle(
            e.clientX + (Math.random() - 0.5) * 20,
            e.clientY + (Math.random() - 0.5) * 20,
            randomType
          ));
        }
        lastMouseTime = now;
      }

      setTimeout(() => {
        mouseRef.current.isMoving = false;
        setTimeout(() => setIsActive(false), 1000);
      }, 100);
    };

    const handleClick = (e: MouseEvent) => {
      // Create burst effect on click
      for (let i = 0; i < 15; i++) {
        particlesRef.current.push(createParticle(
          e.clientX + (Math.random() - 0.5) * 40,
          e.clientY + (Math.random() - 0.5) * 40,
          'cosmic'
        ));
      }
    };

    resizeCanvas();
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    window.addEventListener('resize', resizeCanvas);
    
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-10"
    />
  );
};
