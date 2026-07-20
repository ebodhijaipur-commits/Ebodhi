import React, { useEffect, useState } from 'react';
import { Play } from 'lucide-react';
import { getCourseExplainerScenes } from '../data/courseContentIcons';

const SCENE_MS = 2800;

/**
 * Mini explainer animation — auto-advances scenes that describe what the course includes.
 */
export default function CourseExplainerReel({ course, active }) {
  const scenes = getCourseExplainerScenes(course);
  const [index, setIndex] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!active) {
      setIndex(0);
      setTick(0);
      return undefined;
    }
    setTick((t) => t + 1);
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % scenes.length);
      setTick((t) => t + 1);
    }, SCENE_MS);
    return () => clearInterval(id);
  }, [active, scenes.length]);

  const scene = scenes[index] || scenes[0];
  const Icon = scene.icon;

  return (
    <div className={`program-explainer${active ? ' is-on' : ''}`} aria-hidden={!active}>
      <div className="program-explainer-stage">
        <div className="program-explainer-chrome">
          <span className="program-explainer-live">
            <Play size={10} fill="currentColor" /> What you learn
          </span>
          <span className="program-explainer-count">
            {index + 1}/{scenes.length}
          </span>
        </div>

        <div key={`${index}-${tick}`} className="program-explainer-scene">
          <div className="program-explainer-icon">
            <Icon size={28} strokeWidth={2.1} />
          </div>
          <p className="program-explainer-kicker">{scene.kicker}</p>
          <h4 className="program-explainer-title">{scene.title}</h4>
          <p className="program-explainer-blurb">{scene.blurb}</p>
          <ul className="program-explainer-points">
            {(scene.points || []).map((p, i) => (
              <li key={p} style={{ '--i': i }}>{p}</li>
            ))}
          </ul>
        </div>

        <div className="program-explainer-bar" aria-hidden="true">
          <span
            key={`bar-${index}-${tick}`}
            className={active ? 'is-running' : ''}
            style={{ '--scene-ms': `${SCENE_MS}ms` }}
          />
        </div>
        <div className="program-explainer-dots" aria-hidden="true">
          {scenes.map((_, i) => (
            <i key={i} className={i === index ? 'is-on' : ''} />
          ))}
        </div>
      </div>
    </div>
  );
}
