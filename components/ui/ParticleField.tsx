'use client';

import { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: number;
};

const COLORS = [
  { h: 210, s: 90, l: 55 }, // blue
  { h: 178, s: 85, l: 50 }, // teal
  { h: 130, s: 60, l: 55 }, // green
  { h: 45,  s: 90, l: 55 }, // yellow
  { h: 24,  s: 90, l: 55 }, // orange
  { h: 5,   s: 85, l: 58 }, // red
];

export function ParticleField({
  density = 60,
  className = '',
  connect = true,
  speed = 0.25,
}: {
  density?: number;
  className?: string;
  connect?: boolean;
  speed?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let w = 0, h = 0;
    let mouseX = -9999, mouseY = -9999;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.floor((w * h) / 18000 * (density / 60));
      particles = Array.from({ length: count }, () => {
        const c = COLORS[Math.floor(Math.random() * COLORS.length)];
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          r: Math.random() * 1.5 + 0.5,
          hue: c.h,
        };
      });
    };

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    const onLeave = () => { mouseX = -9999; mouseY = -9999; };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist2 = dx * dx + dy * dy;
        if (dist2 < 14400) {
          const f = (1 - Math.sqrt(dist2) / 120) * 0.05;
          p.vx -= dx * f * 0.01;
          p.vy -= dy * f * 0.01;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.995;
        p.vy *= 0.995;

        if (p.x < 0) p.x = w;
        else if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        else if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, 85%, 60%, 0.8)`;
        ctx.shadowColor = `hsla(${p.hue}, 85%, 60%, 0.6)`;
        ctx.shadowBlur = 8;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      if (connect) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const a = particles[i];
            const b = particles[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < 14400) {
              const alpha = (1 - Math.sqrt(d2) / 120) * 0.15;
              ctx.strokeStyle = `hsla(${(a.hue + b.hue) / 2}, 70%, 60%, ${alpha})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
      }

      animRef.current = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouse);
    window.addEventListener('mouseleave', onLeave);
    tick();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, [density, connect, speed]);

  return (
    <canvas
      ref={ref}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
}
