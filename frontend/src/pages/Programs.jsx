import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Code2,
  Brain,
  Megaphone,
  BarChart3,
  Smartphone,
  Terminal,
  Database,
  Cpu,
  Braces,
  GitBranch,
  Cloud,
  Binary,
  Server,
  Sparkles
} from 'lucide-react';
import ProgramCard from '../components/ProgramCard';
import { fallbackCourses } from '../data/fallbackCourses';
import { apiFetch, getStudentToken } from '../utils/api';
import Reveal from '../components/Reveal';

const COURSE_BADGES = [
  { title: 'Full Stack', category: 'Full Stack', icon: Code2, tone: 'amber', x: '10%', y: '16%', path: 1, depth: 1.4 },
  { title: 'Data Science', category: 'Data Science', icon: Brain, tone: 'sky', x: '78%', y: '14%', path: 2, depth: 1.1 },
  { title: 'Digital Marketing', category: 'Digital Marketing', icon: Megaphone, tone: 'rose', x: '84%', y: '54%', path: 3, depth: 1.6 },
  { title: 'Data Analytics', category: 'Data Analytics', icon: BarChart3, tone: 'teal', x: '12%', y: '58%', path: 4, depth: 1.2 },
  { title: 'App Development', category: 'App Development', icon: Smartphone, tone: 'violet', x: '62%', y: '72%', path: 5, depth: 1.5 }
];

const TECH_FILLERS = [
  { icon: Terminal, x: '42%', y: '18%', size: 'sm', path: 6, depth: 0.45 },
  { icon: Database, x: '58%', y: '28%', size: 'md', path: 7, depth: 0.7 },
  { icon: Cpu, x: '28%', y: '38%', size: 'sm', path: 8, depth: 0.5 },
  { icon: Braces, x: '70%', y: '42%', size: 'md', path: 6, depth: 0.65 },
  { icon: GitBranch, x: '36%', y: '68%', size: 'sm', path: 7, depth: 0.4 },
  { icon: Cloud, x: '88%', y: '32%', size: 'sm', path: 8, depth: 0.55 },
  { icon: Binary, x: '52%', y: '52%', size: 'md', path: 6, depth: 0.75 },
  { icon: Server, x: '22%', y: '78%', size: 'sm', path: 7, depth: 0.5 },
  { icon: Sparkles, x: '74%', y: '78%', size: 'sm', path: 8, depth: 0.6 }
];

function buildInitialPositions() {
  const map = {};
  COURSE_BADGES.forEach((b) => {
    map[`course:${b.category}`] = { x: b.x, y: b.y };
  });
  TECH_FILLERS.forEach((t, i) => {
    map[`tech:${i}`] = { x: t.x, y: t.y };
  });
  return map;
}

export default function Programs() {
  const [courses, setCourses] = useState(fallbackCourses);
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || 'All';
  const [mode, setMode] = useState('all');
  const [statusMap, setStatusMap] = useState({ byCourseId: {}, bySlug: {} });
  const heroRef = useRef(null);
  const dragRef = useRef(null);
  const [hovered, setHovered] = useState(null);
  const [pulseKey, setPulseKey] = useState(0);
  const [hint, setHint] = useState('');
  const [positions, setPositions] = useState(buildInitialPositions);
  const [pinned, setPinned] = useState({});
  const [draggingId, setDraggingId] = useState(null);

  const loadStatus = () => {
    const token = getStudentToken();
    if (!token) {
      setStatusMap({ byCourseId: {}, bySlug: {} });
      return;
    }
    apiFetch('/api/applications/mine/status', { token })
      .then(setStatusMap)
      .catch(() => setStatusMap({ byCourseId: {}, bySlug: {} }));
  };

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);

    fetch('/api/courses', { signal: controller.signal })
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d) && d.length > 0) setCourses(d);
      })
      .catch(() => {
        /* keep fallback catalog */
      })
      .finally(() => clearTimeout(timer));

    loadStatus();

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (!hint) return undefined;
    const t = setTimeout(() => setHint(''), 1600);
    return () => clearTimeout(t);
  }, [hint]);

  const onHeroPointer = (e) => {
    if (dragRef.current) return;
    const el = heroRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    el.style.setProperty('--mx', ((x - 0.5) * 2).toFixed(3));
    el.style.setProperty('--my', ((y - 0.5) * 2).toFixed(3));
    el.style.setProperty('--px', `${(x * 100).toFixed(1)}%`);
    el.style.setProperty('--py', `${(y * 100).toFixed(1)}%`);
  };

  const resetHeroPointer = () => {
    if (dragRef.current) return;
    const el = heroRef.current;
    if (!el) return;
    el.style.setProperty('--mx', '0');
    el.style.setProperty('--my', '0');
  };

  const startDrag = (e, id) => {
    if (e.button != null && e.button !== 0) return;
    const hero = heroRef.current;
    if (!hero) return;

    e.preventDefault();
    e.stopPropagation();

    const target = e.currentTarget;
    const floatEl = target.closest('.programs-float');
    if (!floatEl) return;

    const heroRect = hero.getBoundingClientRect();
    const elRect = floatEl.getBoundingClientRect();

    dragRef.current = {
      id,
      moved: false,
      pointerId: e.pointerId,
      startClientX: e.clientX,
      startClientY: e.clientY,
      offsetX: e.clientX - elRect.left,
      offsetY: e.clientY - elRect.top,
      width: elRect.width,
      height: elRect.height
    };

    try {
      target.setPointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }

    setDraggingId(id);
    setPinned((prev) => ({ ...prev, [id]: true }));
  };

  const moveDrag = (e) => {
    const d = dragRef.current;
    if (!d) {
      onHeroPointer(e);
      return;
    }

    const hero = heroRef.current;
    if (!hero) return;

    const dx = e.clientX - d.startClientX;
    const dy = e.clientY - d.startClientY;
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) d.moved = true;

    const rect = hero.getBoundingClientRect();
    const leftPx = e.clientX - d.offsetX - rect.left;
    const topPx = e.clientY - d.offsetY - rect.top;
    let xPct = (leftPx / rect.width) * 100;
    let yPct = (topPx / rect.height) * 100;
    xPct = Math.min(90, Math.max(1, xPct));
    yPct = Math.min(86, Math.max(2, yPct));

    setPositions((prev) => ({
      ...prev,
      [d.id]: { x: `${xPct.toFixed(2)}%`, y: `${yPct.toFixed(2)}%` }
    }));

    hero.style.setProperty('--px', `${((e.clientX - rect.left) / rect.width) * 100}%`);
    hero.style.setProperty('--py', `${((e.clientY - rect.top) / rect.height) * 100}%`);
  };

  const endDrag = (e, badge = null) => {
    const d = dragRef.current;
    if (!d) return;

    if (e?.currentTarget?.hasPointerCapture?.(d.pointerId)) {
      try {
        e.currentTarget.releasePointerCapture(d.pointerId);
      } catch {
        /* ignore */
      }
    }

    const wasClick = !d.moved;
    dragRef.current = null;
    setDraggingId(null);

    if (wasClick && badge) {
      pickCourse(badge);
    } else if (d.moved) {
      setHint('Position saved — drag anytime');
    }
  };

  const onApplyStatusChange = (slug, courseId, status) => {
    setStatusMap((prev) => ({
      byCourseId: {
        ...prev.byCourseId,
        ...(courseId ? { [String(courseId)]: status } : {})
      },
      bySlug: {
        ...prev.bySlug,
        ...(slug ? { [slug]: status } : {})
      }
    }));
  };

  const statusFor = (course) => {
    if (course?._id && statusMap.byCourseId?.[String(course._id)]) {
      return statusMap.byCourseId[String(course._id)];
    }
    if (course?.slug && statusMap.bySlug?.[course.slug]) {
      return statusMap.bySlug[course.slug];
    }
    return null;
  };

  const setCategory = (c) => {
    const next = new URLSearchParams(searchParams);
    if (c === 'All') next.delete('category');
    else next.set('category', c);
    setSearchParams(next);
  };

  const pickCourse = (badge) => {
    setCategory(badge.category);
    setPulseKey((k) => k + 1);
    setHint(`Showing ${badge.title}`);
    const section = document.querySelector('.below-hero-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const categories = useMemo(() => ['All', ...new Set(courses.map((c) => c.category))], [courses]);

  const filtered = courses.filter((c) => {
    const catOk = category === 'All' || c.category === category;
    const modeOk = mode === 'all' || c.mode === mode || c.mode === 'both';
    return catOk && modeOk;
  });

  return (
    <div>
      <section
        ref={heroRef}
        className={`page-hero page-hero-enter programs-hero ${hovered ? 'is-aiming' : ''}${draggingId ? ' is-dragging' : ''}`}
        style={{ '--mx': 0, '--my': 0, '--px': '70%', '--py': '40%' }}
        onPointerMove={onHeroPointer}
        onPointerLeave={resetHeroPointer}
      >
        <div className="programs-hero-spotlight" aria-hidden="true" />
        <div className="container programs-hero-inner">
          <h1>Courses &amp; LMS Tracks</h1>
          <p>
            Apply for a program to unlock the interactive LMS (lessons, Try it editor, quizzes, certificate).
            An admin reviews your request — once approved, it appears in your student portal.
          </p>
          <p className="programs-hero-drag-note">Drag icons to rearrange · Click a course icon to filter</p>
          <div className="programs-hero-actions">
            <Link to="/register" className="btn btn-accent btn-sm">Create student account</Link>
            <Link to="/login" className="btn btn-secondary btn-sm">Student login</Link>
            <Link to="/portal" className="btn btn-secondary btn-sm">My portal</Link>
          </div>
          {hint && <div className="programs-hero-hint" role="status">{hint}</div>}
        </div>

        <div className="programs-badge-field">
          <div className="programs-tech-grid" aria-hidden="true" />
          {TECH_FILLERS.map((item, i) => {
            const Icon = item.icon;
            const id = `tech:${i}`;
            const pos = positions[id] || { x: item.x, y: item.y };
            const isDragging = draggingId === id;
            const isPinned = !!pinned[id];
            return (
              <span
                key={id}
                className={`programs-float path-${item.path}${isDragging ? ' is-dragging' : ''}${isPinned ? ' is-pinned' : ''}`}
                style={{ left: pos.x, top: pos.y, '--depth': item.depth }}
              >
                <button
                  type="button"
                  className={`programs-tech-chip size-${item.size}`}
                  aria-label="Decorative tech icon"
                  onPointerDown={(e) => startDrag(e, id)}
                  onPointerMove={moveDrag}
                  onPointerUp={(e) => endDrag(e)}
                  onPointerCancel={(e) => endDrag(e)}
                >
                  <Icon size={item.size === 'md' ? 18 : 14} strokeWidth={2} />
                </button>
              </span>
            );
          })}
          {COURSE_BADGES.map((badge) => {
            const Icon = badge.icon;
            const id = `course:${badge.category}`;
            const pos = positions[id] || { x: badge.x, y: badge.y };
            const active = category === badge.category;
            const isDragging = draggingId === id;
            const isPinned = !!pinned[id];
            return (
              <span
                key={badge.category}
                className={`programs-float path-${badge.path}${isDragging ? ' is-dragging' : ''}${isPinned ? ' is-pinned' : ''}`}
                style={{ left: pos.x, top: pos.y, '--depth': badge.depth }}
              >
                <button
                  type="button"
                  className={`programs-course-badge tone-${badge.tone}${active ? ' is-active' : ''}${hovered === badge.category ? ' is-hot' : ''}${isDragging ? ' is-dragging' : ''}`}
                  onPointerDown={(e) => startDrag(e, id)}
                  onPointerMove={moveDrag}
                  onPointerUp={(e) => endDrag(e, badge)}
                  onPointerCancel={(e) => endDrag(e)}
                  onPointerEnter={() => setHovered(badge.category)}
                  onPointerLeave={() => setHovered(null)}
                  aria-label={`Drag or filter ${badge.title}`}
                  aria-pressed={active}
                  title={`${badge.title} — drag to move, click to filter`}
                >
                  <Icon size={28} strokeWidth={2.2} />
                  <span className="programs-course-tip">{badge.title}</span>
                  {active && <span key={pulseKey} className="programs-course-ring" aria-hidden="true" />}
                </button>
              </span>
            );
          })}
        </div>
      </section>
      <section className="section below-hero-section">
        <div className="container">
          <Reveal className="reveal-rise" delay={0}>
            <div className="tabs">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`tab ${category === c ? 'active' : ''}`}
                  onClick={() => setCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="tabs" style={{ marginTop: -12 }}>
              {['all', 'online', 'campus'].map((m) => (
                <button key={m} type="button" className={`tab ${mode === m ? 'active' : ''}`} onClick={() => setMode(m)}>
                  {m === 'all' ? 'All Modes' : m === 'online' ? 'Online' : 'On Campus'}
                </button>
              ))}
            </div>
          </Reveal>
          <div className="card-grid reveal-stagger">
            {filtered.map((course, i) => (
              <Reveal key={course._id || course.slug} className="reveal-card" delay={50 + i * 55} as="div">
                <ProgramCard
                  course={course}
                  applyStatus={statusFor(course)}
                  onApplyStatusChange={onApplyStatusChange}
                />
              </Reveal>
            ))}
          </div>
          {filtered.length === 0 && (
            <p style={{ textAlign: 'center', color: 'var(--muted)' }}>No programs match these filters yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
