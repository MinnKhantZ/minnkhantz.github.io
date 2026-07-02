import { useRef, useEffect } from 'react';

const COLORS = ['#a855f7', '#06b6d4', '#64748b'] as const;

function weightedColor(): string {
  const r = Math.random();
  return r > 0.8 ? COLORS[0] : r > 0.5 ? COLORS[1] : COLORS[2];
}

class Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  color: string;
  density: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.baseX = x;
    this.baseY = y;
    this.size = Math.random() * 2 + 1;
    this.color = weightedColor();
    this.density = Math.random() * 30 + 15;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }

  update(mx: number | null, my: number | null, radius: number) {
    if (mx !== null && my !== null) {
      const dx = mx - this.x;
      const dy = my - this.y;
      const distSq = dx * dx + dy * dy;

      if (distSq < radius * radius && distSq > 0) {
        const dist = Math.sqrt(distSq);
        const force = ((radius - dist) / radius) * this.density * 0.7;
        this.x -= (dx / dist) * force;
        this.y -= (dy / dist) * force;
      } else {
        if (this.x !== this.baseX) this.x -= (this.x - this.baseX) / 15;
        if (this.y !== this.baseY) this.y -= (this.y - this.baseY) / 15;
      }
    } else {
      if (this.x !== this.baseX) this.x -= (this.x - this.baseX) / 20;
      if (this.y !== this.baseY) this.y -= (this.y - this.baseY) / 20;
    }
  }
}

export default function CanvasParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let particles: Particle[] = [];
    let mouseX: number | null = null;
    let mouseY: number | null = null;
    const mouseRadius = 120;

    const initParticles = (w: number, h: number) => {
      const count = Math.min((w * h) / 8000, 180);
      particles = Array.from({ length: count }, () => new Particle(Math.random() * w, Math.random() * h));
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles(w, h);
    };

    let resizeTimer: ReturnType<typeof setTimeout>;
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    };

    const animate = () => {
      const dpr = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update(mouseX, mouseY, mouseRadius);
        particles[i].draw(ctx);
      }

      const maxDist = 100;
      const maxDistSq = maxDist * maxDist;

      for (let i = 0; i < particles.length; i++) {
        const pi = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const pj = particles[j];
          const dx = pi.x - pj.x;
          const dy = pi.y - pj.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            ctx.strokeStyle = `rgba(99,102,241,${(1 - dist / maxDist) * 0.12})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(pi.x, pi.y);
            ctx.lineTo(pj.x, pj.y);
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(animate);
    };

    const onMove = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY; };
    const onLeave = () => { mouseX = null; mouseY = null; };

    window.addEventListener('resize', debouncedResize);
    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);

    resize();
    animate();

    return () => {
      window.removeEventListener('resize', debouncedResize);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(animId);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0"
    />
  );
}
