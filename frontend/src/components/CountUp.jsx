import React, { useEffect, useRef, useState } from 'react';

function parseStatValue(raw) {
  const text = String(raw ?? '').trim();
  const match = text.match(/^(.*?)(\d+(?:[.,]\d+)*)(.*)$/);
  if (!match) {
    return { prefix: '', target: 0, decimals: 0, suffix: text, animate: false };
  }
  const [, prefix, num, suffix] = match;
  const normalized = num.replace(/,/g, '');
  const decimals = normalized.includes('.') ? (normalized.split('.')[1]?.length || 0) : 0;
  const target = Number(normalized);
  return {
    prefix,
    target,
    decimals,
    suffix,
    animate: Number.isFinite(target)
  };
}

function formatNumber(value, decimals, useGrouping) {
  if (decimals > 0) return value.toFixed(decimals);
  const rounded = Math.round(value);
  return useGrouping ? rounded.toLocaleString('en-IN') : String(rounded);
}

function formatStat(parsed, n) {
  return `${parsed.prefix}${formatNumber(n, parsed.decimals, parsed.target >= 1000)}${parsed.suffix}`;
}

export default function CountUp({ value, duration = 1600 }) {
  const ref = useRef(null);
  const started = useRef(false);
  const [display, setDisplay] = useState(() => {
    const parsed = parseStatValue(value);
    return parsed.animate ? formatStat(parsed, 0) : String(value ?? '');
  });

  useEffect(() => {
    const parsed = parseStatValue(value);
    if (!parsed.animate) {
      setDisplay(String(value ?? ''));
      return undefined;
    }

    // If already counted and value updates from API, snap to final.
    if (started.current) {
      setDisplay(formatStat(parsed, parsed.target));
      return undefined;
    }

    const el = ref.current;
    if (!el) return undefined;

    let raf = 0;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const run = () => {
      if (started.current) return;
      started.current = true;

      if (reduceMotion) {
        setDisplay(formatStat(parsed, parsed.target));
        return;
      }

      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - (1 - t) ** 3;
        setDisplay(formatStat(parsed, parsed.target * eased));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return (
    <strong ref={ref} aria-label={String(value ?? '')}>
      {display}
    </strong>
  );
}
