'use client';

import { useEffect, useRef } from 'react';

/**
 * Rising gold dust canvas — subtle ambient particles drifting up.
 * Respects prefers-reduced-motion + prefers-reduced-data.
 */
export function GoldDust() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lowData =
      'connection' in navigator &&
      typeof (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
        ?.saveData === 'boolean' &&
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reduced || lowData) return;

    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.max(1, Math.min(2, devicePixelRatio || 1));
    type P = {
      x: number;
      y: number;
      r: number;
      vy: number;
      a: number;
      maxA: number;
      life: number;
      maxLife: number;
      drift: number;
      ds: number;
    };
    let particles: P[] = [];

    function resize() {
      if (!canvas || !ctx) return;
      canvas.width = innerWidth * dpr;
      canvas.height = innerHeight * dpr;
      canvas.style.width = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function spawn() {
      particles.push({
        x: Math.random() * innerWidth,
        y: innerHeight + 10,
        r: 0.5 + Math.random() * 1.5,
        vy: -(0.2 + Math.random() * 0.5),
        a: 0,
        maxA: 0.15 + Math.random() * 0.3,
        life: 0,
        maxLife: 400 + Math.random() * 400,
        drift: Math.random() * Math.PI * 2,
        ds: 0.01 + Math.random() * 0.02,
      });
    }

    let raf = 0;
    function loop() {
      if (!ctx) return;
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      if (Math.random() < 0.25 && particles.length < 50) spawn();
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        if (!p) continue;
        p.life++;
        p.drift += p.ds;
        p.x += Math.sin(p.drift) * 0.3;
        p.y += p.vy;
        if (p.life < 80) p.a = (p.life / 80) * p.maxA;
        else if (p.life > p.maxLife - 80) p.a = ((p.maxLife - p.life) / 80) * p.maxA;
        else p.a = p.maxA;
        if (p.life > p.maxLife || p.y < -10) {
          particles.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.fillStyle = `rgba(244, 208, 107, ${p.a})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(244, 208, 107, ${p.a * 0.8})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      raf = requestAnimationFrame(loop);
    }

    addEventListener('resize', resize);
    resize();
    loop();
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('resize', resize);
      particles = [];
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="fixed inset-0 -z-0 pointer-events-none"
    />
  );
}
