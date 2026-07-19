import React, { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const AVATAR_TONES = ['tone-a', 'tone-b', 'tone-c', 'tone-d', 'tone-e'];

export default function StoriesSlider({ items = [] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [tick, setTick] = useState(0);
  const total = items.length;

  const go = useCallback((dir) => {
    if (!total) return;
    setIndex((i) => (i + dir + total) % total);
    setTick(0);
  }, [total]);

  const goTo = useCallback((i) => {
    setIndex(i);
    setTick(0);
  }, []);

  useEffect(() => {
    if (total <= 1 || paused) return undefined;
    const step = window.setInterval(() => {
      setTick((t) => {
        if (t >= 100) {
          setIndex((i) => (i + 1) % total);
          return 0;
        }
        return t + 2;
      });
    }, 100);
    return () => window.clearInterval(step);
  }, [total, paused]);

  useEffect(() => {
    if (index >= total && total > 0) setIndex(0);
  }, [index, total]);

  if (!total) {
    return <p className="stories-empty">Learner stories will appear here soon.</p>;
  }

  const active = items[index];

  return (
    <div
      className="stories-slider"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="stories-faces" role="tablist" aria-label="Choose a learner">
        {items.map((t, i) => (
          <button
            key={t._id || i}
            type="button"
            role="tab"
            aria-selected={i === index}
            className={`stories-face ${AVATAR_TONES[i % AVATAR_TONES.length]} ${i === index ? 'active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Show review from ${t.name}`}
          >
            <span className="stories-face-initial" aria-hidden="true">
              {(t.name || '?').charAt(0)}
            </span>
            <span className="stories-face-name">{t.name}</span>
          </button>
        ))}
      </div>

      <article className="stories-feature" key={active._id || index} aria-live="polite">
        <div className="stories-feature-top">
          <div className="stories-stars" aria-label={`${active.rating || 5} star rating`}>
            {Array.from({ length: active.rating || 5 }).map((_, si) => (
              <Star key={si} size={15} fill="currentColor" />
            ))}
          </div>
          <span className="stories-count">{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
        </div>

        <p className="stories-quote">{active.review}</p>

        <div className="stories-feature-foot">
          <div>
            <strong>{active.name}</strong>
            <span>{active.courseName}</span>
          </div>
          {total > 1 && (
            <div className="stories-controls">
              <button type="button" className="stories-nav" onClick={() => go(-1)} aria-label="Previous">
                <ChevronLeft size={18} />
              </button>
              <button type="button" className="stories-nav" onClick={() => go(1)} aria-label="Next">
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>

        {total > 1 && (
          <div className="stories-progress" aria-hidden="true">
            <span style={{ width: `${tick}%` }} />
          </div>
        )}
      </article>
    </div>
  );
}
