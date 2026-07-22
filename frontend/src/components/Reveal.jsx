import React, { useEffect, useRef, useState } from 'react';

/**
 * Scroll-triggered entrance — light GPU-friendly fade/slide.
 * once={false} replays when the element fully leaves and re-enters the viewport.
 */
export default function Reveal({
  children,
  className = '',
  as: Tag = 'div',
  delay = 0,
  once = true
}) {
  const ref = useRef(null);
  const shownRef = useRef(false);
  const [visible, setVisible] = useState(false);
  const [playId, setPlayId] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      shownRef.current = true;
      setVisible(true);
      return undefined;
    }

    let cancelled = false;
    let showTimer = 0;

    const playIn = () => {
      if (cancelled) return;
      window.clearTimeout(showTimer);
      // Restart CSS animation cleanly without a long blank frame
      setVisible(false);
      setPlayId((n) => n + 1);
      showTimer = window.setTimeout(() => {
        if (!cancelled) setVisible(true);
      }, 16);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.08) {
          if (shownRef.current && once) return;
          shownRef.current = true;
          if (once) {
            setVisible(true);
            io.disconnect();
          } else {
            playIn();
          }
        } else if (!once && !entry.isIntersecting) {
          // Only reset after fully leaving — avoids flicker mid-scroll
          shownRef.current = false;
          setVisible(false);
        }
      },
      {
        threshold: [0, 0.12, 0.25],
        rootMargin: '0px 0px -6% 0px'
      }
    );

    io.observe(el);
    return () => {
      cancelled = true;
      window.clearTimeout(showTimer);
      io.disconnect();
    };
  }, [once]);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-in' : ''} ${className}`.trim()}
      style={{ '--reveal-delay': `${delay}ms` }}
      data-play={playId}
    >
      {children}
    </Tag>
  );
}
