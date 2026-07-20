import React, { useEffect, useRef, useState } from 'react';

/**
 * Scroll-triggered entrance — fires as the element enters the viewport.
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

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      shownRef.current = true;
      setVisible(true);
      return undefined;
    }

    let cancelled = false;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (shownRef.current && once) return;
          shownRef.current = true;
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              if (!cancelled) setVisible(true);
            });
          });
          if (once) io.disconnect();
        } else if (!once && !entry.isIntersecting) {
          shownRef.current = false;
          setVisible(false);
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -12% 0px'
      }
    );

    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
    };
  }, [once]);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-in' : ''} ${className}`.trim()}
      style={{ '--reveal-delay': `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
