
import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  z: number;
  prevZ: number;
  size: number;
  color: string;
  speed: number;
  twinkle: number;
}

interface Planet {
  x: number;
  y: number;
  size: number;
  color: string;
  rotationSpeed: number;
  orbitRadius: number;
  orbitAngle: number;
  orbitSpeed: number;
  glow: number;
}

export const AdvancedSpaceBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const planetsRef = useRef<Planet[]>([]);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initStars = () => {
      starsRef.current = [];
      for (let i = 0; i < 200; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 1000,
          prevZ: Math.random() * 1000,
          size: Math.random() * 1.5 + 0.5,
          color: `hsl(${Math.random() * 60 + 200}, 70%, ${Math.random() * 30 + 70}%)`,
          speed: Math.random() * 0.5 + 0.2,
          twinkle: Math.random() * Math.PI * 2
        });
      }
    };

    const initPlanets = () => {
      planetsRef.current = [];
      const gentleColors = [
        'hsl(210, 60%, 70%)', // Soft blue
        'hsl(270, 50%, 75%)', // Gentle purple
        'hsl(180, 55%, 65%)', // Calm cyan
        'hsl(300, 45%, 70%)', // Soft pink
        'hsl(240, 60%, 80%)', // Light blue
      ];

      for (let i = 0; i < 5; i++) {
        planetsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 40 + 15,
          color: gentleColors[Math.floor(Math.random() * gentleColors.length)],
          rotationSpeed: Math.random() * 0.01 + 0.003,
          orbitRadius: Math.random() * 150 + 80,
          orbitAngle: Math.random() * Math.PI * 2,
          orbitSpeed: Math.random() * 0.008 + 0.002,
          glow: Math.random() * 0.5 + 0.3
        });
      }
    };

    const drawStars = (time: number) => {
      starsRef.current.forEach(star => {
        star.twinkle += 0.02;
        const twinkleAlpha = (Math.sin(star.twinkle) + 1) * 0.5;
        
        ctx.beginPath();
        ctx.fillStyle = star.color;
        ctx.globalAlpha = 0.3 + twinkleAlpha * 0.7;
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Gentle glow
        ctx.beginPath();
        ctx.fillStyle = star.color;
        ctx.globalAlpha = 0.1 + twinkleAlpha * 0.2;
        ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const drawPlanets = (time: number) => {
      planetsRef.current.forEach((planet, index) => {
        // Update orbit position gently
        planet.orbitAngle += planet.orbitSpeed;
        const baseX = planet.x;
        const baseY = planet.y;
        
        const x = baseX + Math.cos(planet.orbitAngle) * planet.orbitRadius * 0.2;
        const y = baseY + Math.sin(planet.orbitAngle) * planet.orbitRadius * 0.2;

        // Gentle mouse interaction
        const dx = mouseRef.current.x - x;
        const dy = mouseRef.current.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - distance / 300) * 0.3;

        // Soft glow
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, planet.size * 1.5);
        gradient.addColorStop(0, planet.color);
        gradient.addColorStop(0.6, planet.color.replace(')', ', 0.4)').replace('hsl', 'hsla'));
        gradient.addColorStop(1, 'transparent');
        
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.globalAlpha = 0.4 + influence * 0.3;
        ctx.arc(x, y, planet.size * 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Planet body
        const planetGradient = ctx.createRadialGradient(
          x - planet.size * 0.3, 
          y - planet.size * 0.3, 
          0, 
          x, 
          y, 
          planet.size
        );
        planetGradient.addColorStop(0, planet.color);
        planetGradient.addColorStop(1, planet.color.replace('70%)', '50%)'));

        ctx.beginPath();
        ctx.fillStyle = planetGradient;
        ctx.globalAlpha = 0.6 + influence * 0.2;
        ctx.arc(x, y, planet.size * (1 + influence * 0.05), 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const drawNebula = () => {
      // Gentle nebula clouds
      const gradient1 = ctx.createRadialGradient(
        canvas.width * 0.3, 
        canvas.height * 0.2, 
        0, 
        canvas.width * 0.3, 
        canvas.height * 0.2, 
        canvas.width * 0.6
      );
      gradient1.addColorStop(0, 'hsla(240, 60%, 80%, 0.08)');
      gradient1.addColorStop(0.4, 'hsla(210, 70%, 75%, 0.04)');
      gradient1.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.fillStyle = gradient1;
      ctx.globalAlpha = 0.5;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Second gentle nebula
      const gradient2 = ctx.createRadialGradient(
        canvas.width * 0.7, 
        canvas.height * 0.8, 
        0, 
        canvas.width * 0.7, 
        canvas.height * 0.8, 
        canvas.width * 0.5
      );
      gradient2.addColorStop(0, 'hsla(270, 50%, 75%, 0.06)');
      gradient2.addColorStop(0.5, 'hsla(300, 60%, 70%, 0.03)');
      gradient2.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.fillStyle = gradient2;
      ctx.globalAlpha = 0.4;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const animate = (time: number) => {
      // Gentle dark background
      ctx.fillStyle = 'hsl(220, 30%, 6%)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawNebula();
      drawStars(time);
      // drawPlanets(time); // Removed to disable moving circles

      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleResize = () => {
      resizeCanvas();
      initStars();
      initPlanets();
    };

    resizeCanvas();
    initStars();
    initPlanets();
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: 'radial-gradient(ellipse at center, hsl(220, 30%, 6%) 0%, hsl(240, 40%, 4%) 40%, hsl(260, 50%, 2%) 100%)' }}
    />
  );
};
