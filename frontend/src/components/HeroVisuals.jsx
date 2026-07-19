import React, { useEffect, useRef } from 'react';

/**
 * Advanced interactive neural-field background for the full hero.
 * - Multi-depth particles with parallax
 * - Mouse attract / energize + connection highlighting
 * - Click ripples that travel through the network
 * - Flowing energy along edges near the cursor
 * - Soft bloom trail following the pointer
 */
export default function HeroBackground({ onPointer, onPulse }) {
  const canvasRef = useRef(null);
  const onPointerRef = useRef(onPointer);
  const onPulseRef = useRef(onPulse);
  onPointerRef.current = onPointer;
  onPulseRef.current = onPulse;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    const parent = canvas.parentElement;

    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let time = 0;

    const mouse = {
      x: 0.5,
      y: 0.45,
      tx: 0.5,
      ty: 0.45,
      active: false,
      down: false
    };

    const ripples = [];
    const bursts = [];

    const COUNT = 95;
    const particles = Array.from({ length: COUNT }, (_, i) => {
      const depth = 0.35 + Math.random() * 0.65;
      return {
        id: i,
        x: Math.random(),
        y: Math.random(),
        ox: 0,
        oy: 0,
        vx: (Math.random() - 0.5) * 0.00045,
        vy: (Math.random() - 0.5) * 0.00045,
        depth,
        pulse: Math.random() * Math.PI * 2,
        energy: 0
      };
    });

    const resize = () => {
      const box = parent.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = box.width;
      h = box.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const toLocal = (e) => {
      const box = parent.getBoundingClientRect();
      return {
        x: (e.clientX - box.left) / box.width,
        y: (e.clientY - box.top) / box.height
      };
    };

    const onMove = (e) => {
      const p = toLocal(e);
      mouse.tx = p.x;
      mouse.ty = p.y;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
      mouse.down = false;
      onPointerRef.current?.({ x: 0.5, y: 0.45, energy: 0, active: false });
    };
    const onDown = (e) => {
      const p = toLocal(e);
      mouse.down = true;
      mouse.tx = p.x;
      mouse.ty = p.y;
      ripples.push({ x: p.x, y: p.y, r: 0, life: 0.9, max: 0.42 });
      bursts.push({ x: p.x, y: p.y, life: 1 });
      onPulseRef.current?.({ x: p.x, y: p.y });
      // energize nearby nodes
      particles.forEach((n) => {
        const dx = (n.x - p.x) * w;
        const dy = (n.y - p.y) * h;
        const dist = Math.hypot(dx, dy);
        if (dist < 180) {
          n.energy = Math.min(1, n.energy + (1 - dist / 180));
          const force = (1 - dist / 180) * 0.012;
          n.vx += (dx / (dist || 1)) * force;
          n.vy += (dy / (dist || 1)) * force;
        }
      });
    };
    const onUp = () => { mouse.down = false; };

    resize();
    window.addEventListener('resize', resize);
    parent.addEventListener('mousemove', onMove);
    parent.addEventListener('mouseleave', onLeave);
    parent.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    const linkDist = () => Math.min(150, Math.max(100, w * 0.11));

    const draw = () => {
      time += 0.016;
      // smooth mouse
      mouse.x += (mouse.tx - mouse.x) * 0.12;
      mouse.y += (mouse.ty - mouse.y) * 0.12;

      // backdrop
      const g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, '#040d2a');
      g.addColorStop(0.45, '#0b2a8f');
      g.addColorStop(1, '#061a4a');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // soft radial wash following cursor
      const wash = ctx.createRadialGradient(
        mouse.x * w, mouse.y * h, 0,
        mouse.x * w, mouse.y * h, Math.max(w, h) * 0.45
      );
      wash.addColorStop(0, 'rgba(251,191,36,0.16)');
      wash.addColorStop(0.35, 'rgba(59,130,246,0.12)');
      wash.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = wash;
      ctx.fillRect(0, 0, w, h);

      // physics + energy decay
      particles.forEach((p) => {
        p.pulse += 0.03 + p.depth * 0.01;
        p.energy *= 0.96;

        // gentle wander
        p.vx += Math.sin(time * 0.7 + p.id) * 0.00001;
        p.vy += Math.cos(time * 0.6 + p.id * 1.3) * 0.00001;

        // mouse attract / swirl when active
        if (mouse.active) {
          const dx = (mouse.x - p.x) * w;
          const dy = (mouse.y - p.y) * h;
          const dist = Math.hypot(dx, dy) || 1;
          const radius = 220 * (0.7 + p.depth * 0.5);
          if (dist < radius) {
            const t = 1 - dist / radius;
            const pull = t * t * 0.00055 * (mouse.down ? 1.8 : 1);
            p.vx += (dx / dist) * pull;
            p.vy += (dy / dist) * pull;
            // tangential swirl
            p.vx += (-dy / dist) * pull * 0.45;
            p.vy += (dx / dist) * pull * 0.45;
            p.energy = Math.min(1, p.energy + t * 0.04);
          }
        }

        // ripple push
        ripples.forEach((r) => {
          const dx = (p.x - r.x) * w;
          const dy = (p.y - r.y) * h;
          const dist = Math.hypot(dx, dy);
          const band = Math.abs(dist - r.r * Math.max(w, h));
          if (band < 28) {
            const force = (1 - band / 28) * 0.004 * r.life;
            p.vx += (dx / (dist || 1)) * force;
            p.vy += (dy / (dist || 1)) * force;
            p.energy = Math.min(1, p.energy + 0.08);
          }
        });

        p.vx *= 0.97;
        p.vy *= 0.97;
        p.x += p.vx / Math.max(p.depth, 0.4);
        p.y += p.vy / Math.max(p.depth, 0.4);

        // soft bounds
        if (p.x < 0.02 || p.x > 0.98) p.vx *= -0.9;
        if (p.y < 0.04 || p.y > 0.96) p.vy *= -0.9;
        p.x = Math.min(0.99, Math.max(0.01, p.x));
        p.y = Math.min(0.99, Math.max(0.01, p.y));

        // parallax offset from mouse
        p.ox = (mouse.x - 0.5) * (1 - p.depth) * 28;
        p.oy = (mouse.y - 0.5) * (1 - p.depth) * 18;
      });

      // connections + energy flow
      const maxDist = linkDist();
      for (let i = 0; i < particles.length; i += 1) {
        const a = particles[i];
        const ax = a.x * w + a.ox;
        const ay = a.y * h + a.oy;
        for (let j = i + 1; j < particles.length; j += 1) {
          const b = particles[j];
          const bx = b.x * w + b.ox;
          const by = b.y * h + b.oy;
          const dx = ax - bx;
          const dy = ay - by;
          const dist = Math.hypot(dx, dy);
          const depthAvg = (a.depth + b.depth) / 2;
          const threshold = maxDist * (0.75 + depthAvg * 0.4);
          if (dist > threshold) continue;

          const prox = 1 - dist / threshold;
          const hot = Math.max(a.energy, b.energy);
          const alpha = (0.12 + prox * 0.55) * (0.45 + depthAvg * 0.55) * (0.7 + hot * 0.5);

          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.lineTo(bx, by);
          if (hot > 0.15) {
            ctx.strokeStyle = `rgba(251, 191, 36, ${alpha})`;
            ctx.lineWidth = 1 + hot * 1.6;
          } else {
            ctx.strokeStyle = `rgba(147, 197, 253, ${alpha})`;
            ctx.lineWidth = 0.8 + prox;
          }
          ctx.stroke();

          // traveling spark on hot edges
          if (hot > 0.35 && prox > 0.35) {
            const t = (Math.sin(time * 4 + i * 0.7 + j) + 1) / 2;
            const sx = ax + (bx - ax) * t;
            const sy = ay + (by - ay) * t;
            const spark = ctx.createRadialGradient(sx, sy, 0, sx, sy, 6);
            spark.addColorStop(0, 'rgba(254,243,199,0.95)');
            spark.addColorStop(1, 'rgba(251,191,36,0)');
            ctx.fillStyle = spark;
            ctx.beginPath();
            ctx.arc(sx, sy, 6, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // nodes
      particles.forEach((p) => {
        const px = p.x * w + p.ox;
        const py = p.y * h + p.oy;
        const breathe = 0.5 + 0.5 * Math.sin(p.pulse);
        const r = (1.4 + p.depth * 2.4) * (1 + p.energy * 0.9 + breathe * 0.15);

        if (p.energy > 0.2 || (mouse.active && Math.hypot(px - mouse.x * w, py - mouse.y * h) < 90)) {
          const glow = ctx.createRadialGradient(px, py, 0, px, py, r * 6);
          glow.addColorStop(0, `rgba(251,191,36,${0.35 + p.energy * 0.35})`);
          glow.addColorStop(1, 'rgba(251,191,36,0)');
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(px, py, r * 6, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.beginPath();
        ctx.fillStyle = p.energy > 0.25
          ? `rgba(253, 224, 71, ${0.75 + p.depth * 0.25})`
          : `rgba(191, 219, 254, ${0.55 + p.depth * 0.4})`;
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fill();
      });

      // pointer core
      if (mouse.active) {
        const mx = mouse.x * w;
        const my = mouse.y * h;
        const core = ctx.createRadialGradient(mx, my, 0, mx, my, 90);
        core.addColorStop(0, 'rgba(255,255,255,0.25)');
        core.addColorStop(0.3, 'rgba(251,191,36,0.18)');
        core.addColorStop(1, 'rgba(251,191,36,0)');
        ctx.fillStyle = core;
        ctx.beginPath();
        ctx.arc(mx, my, 90, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.arc(mx, my, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // ripples
      for (let i = ripples.length - 1; i >= 0; i -= 1) {
        const r = ripples[i];
        r.r += 0.01;
        r.life *= 0.97;
        const radius = r.r * Math.max(w, h);
        ctx.beginPath();
        ctx.strokeStyle = `rgba(253, 224, 71, ${r.life * 0.55})`;
        ctx.lineWidth = 2;
        ctx.arc(r.x * w, r.y * h, radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = `rgba(147, 197, 253, ${r.life * 0.25})`;
        ctx.lineWidth = 1;
        ctx.arc(r.x * w, r.y * h, radius * 0.72, 0, Math.PI * 2);
        ctx.stroke();
        if (r.life < 0.04 || r.r > r.max) ripples.splice(i, 1);
      }

      // click bursts
      for (let i = bursts.length - 1; i >= 0; i -= 1) {
        const b = bursts[i];
        b.life *= 0.9;
        const radius = (1 - b.life) * 70;
        const burst = ctx.createRadialGradient(b.x * w, b.y * h, 0, b.x * w, b.y * h, radius);
        burst.addColorStop(0, `rgba(255,255,255,${b.life * 0.5})`);
        burst.addColorStop(0.4, `rgba(251,191,36,${b.life * 0.35})`);
        burst.addColorStop(1, 'rgba(251,191,36,0)');
        ctx.fillStyle = burst;
        ctx.beginPath();
        ctx.arc(b.x * w, b.y * h, radius, 0, Math.PI * 2);
        ctx.fill();
        if (b.life < 0.03) bursts.splice(i, 1);
      }

      // vignette for text readability
      const vig = ctx.createRadialGradient(w * 0.5, h * 0.45, w * 0.15, w * 0.5, h * 0.5, w * 0.85);
      vig.addColorStop(0, 'rgba(4,13,42,0)');
      vig.addColorStop(1, 'rgba(4,13,42,0.55)');
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, w, h);

      // sync field energy to hero text layer
      let fieldEnergy = 0;
      particles.forEach((p) => { fieldEnergy += p.energy; });
      fieldEnergy = Math.min(1, fieldEnergy / 12);
      if (mouse.active) fieldEnergy = Math.min(1, fieldEnergy + 0.2);
      onPointerRef.current?.({
        x: mouse.x,
        y: mouse.y,
        energy: fieldEnergy,
        active: mouse.active
      });

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      parent.removeEventListener('mousemove', onMove);
      parent.removeEventListener('mouseleave', onLeave);
      parent.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  return (
    <div className="hb-layer hb-neural hb-neural-pro" aria-hidden="true">
      <canvas ref={canvasRef} />
      <div className="hb-neural-hint">Move to energize · Click to pulse the network</div>
    </div>
  );
}
