import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, BookOpen, GraduationCap, Plus, Pencil, Trash2, RefreshCw,
  Save, Users, RotateCcw, Layers
} from 'lucide-react';

const TRACKS = [
  { id: 'shared', label: 'Shared foundations' },
  { id: 'react', label: 'React track' },
  { id: 'next', label: 'Next.js track' },
  { id: 'backend', label: 'Backend & ship' }
];

const emptyChapter = () => ({
  id: '',
  title: '',
  order: 1,
  track: 'shared',
  summary: '',
  content: '',
  keyPoints: '',
  tryIt: [{ id: '', title: 'Try it yourself', description: '', html: '', css: '', js: '' }],
  localBuild: { goal: '', commands: '', expectedUrl: '', checklist: '' },
  example: { title: '', code: '', explanation: '' },
  quiz: {
    passScore: 70,
    questions: [
      { prompt: '', options: ['', '', '', ''], answerIndex: 0, explanation: '' }
    ]
  }
});

const linesToList = (text) => String(text || '').split('\n').map((s) => s.trim()).filter(Boolean);
const listToLines = (arr) => (Array.isArray(arr) ? arr.join('\n') : '');

const chapterToForm = (ch) => ({
  id: ch.id || '',
  title: ch.title || '',
  order: ch.order || 1,
  track: ch.track || 'shared',
  summary: ch.summary || '',
  content: ch.content || '',
  keyPoints: listToLines(ch.keyPoints),
  tryIt: (ch.tryIt?.length
    ? ch.tryIt
    : [{ id: '', title: 'Try it yourself', description: '', html: '', css: '', js: '' }]
  ).map((t) => ({
    id: t.id || '',
    title: t.title || 'Try it yourself',
    description: t.description || '',
    html: t.html || '',
    css: t.css || '',
    js: t.js || ''
  })),
  localBuild: {
    goal: ch.localBuild?.goal || '',
    commands: listToLines(ch.localBuild?.commands),
    expectedUrl: ch.localBuild?.expectedUrl || '',
    checklist: listToLines(ch.localBuild?.checklist)
  },
  example: {
    title: ch.example?.title || '',
    code: ch.example?.code || '',
    explanation: ch.example?.explanation || ''
  },
  quiz: {
    passScore: ch.quiz?.passScore || 70,
    questions: (ch.quiz?.questions?.length
      ? ch.quiz.questions
      : [{ prompt: '', options: ['', '', '', ''], answerIndex: 0, explanation: '' }]
    ).map((q) => ({
      prompt: q.prompt || '',
      options: [...(q.options || []), '', '', '', ''].slice(0, Math.max(4, q.options?.length || 4)),
      answerIndex: q.answerIndex ?? 0,
      explanation: q.explanation || ''
    }))
  }
});

const formToPayload = (form) => ({
  id: form.id || undefined,
  title: form.title.trim(),
  order: Number(form.order) || 1,
  track: form.track,
  summary: form.summary,
  content: form.content,
  keyPoints: linesToList(form.keyPoints),
  tryIt: (form.tryIt || [])
    .filter((t) => (t.html || t.css || t.js || t.title)?.toString().trim())
    .map((t, i) => ({
      id: t.id || `try-${i + 1}`,
      title: t.title || 'Try it yourself',
      description: t.description || '',
      html: t.html || '',
      css: t.css || '',
      js: t.js || ''
    })),
  localBuild: {
    goal: form.localBuild.goal,
    commands: linesToList(form.localBuild.commands),
    expectedUrl: form.localBuild.expectedUrl,
    checklist: linesToList(form.localBuild.checklist)
  },
  example: {
    title: form.example.title,
    code: form.example.code,
    explanation: form.example.explanation
  },
  quiz: {
    passScore: Number(form.quiz.passScore) || 70,
    questions: form.quiz.questions
      .filter((q) => q.prompt.trim())
      .map((q) => ({
        prompt: q.prompt.trim(),
        options: q.options.map((o) => o.trim()).filter(Boolean),
        answerIndex: Number(q.answerIndex) || 0,
        explanation: q.explanation
      }))
      .filter((q) => q.options.length >= 2)
  }
});

export default function AdminLms() {
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [slug, setSlug] = useState('');
  const [curriculum, setCurriculum] = useState(null);
  const [progress, setProgress] = useState(null);
  const [view, setView] = useState('chapters'); // chapters | progress
  const [trackFilter, setTrackFilter] = useState('all');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyChapter());
  const [saving, setSaving] = useState(false);

  const headers = useCallback(
    () => ({ Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }),
    [token]
  );

  const flash = (text, err = false) => {
    setToast({ text, err });
    window.setTimeout(() => setToast(null), 3200);
  };

  const loadCourses = useCallback(async (authToken) => {
    const res = await fetch('/api/lms/courses', {
      headers: { Authorization: `Bearer ${authToken || token}` }
    });
    if (res.status === 401 || res.status === 403) {
      navigate('/admin/login');
      return [];
    }
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  }, [navigate, token]);

  const loadCurriculum = useCallback(async (courseSlug, authToken = token) => {
    if (!courseSlug) return;
    const res = await fetch(`/api/lms/courses/${courseSlug}`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to load curriculum');
    setCurriculum(data);
  }, [token]);

  const loadProgress = useCallback(async (courseSlug, authToken = token) => {
    if (!courseSlug) return;
    const res = await fetch(`/api/lms/courses/${courseSlug}/progress`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to load progress');
    setProgress(data);
  }, [token]);

  useEffect(() => {
    const stored = localStorage.getItem('token');
    if (!stored) {
      navigate('/admin/login');
      return;
    }
    setToken(stored);
    (async () => {
      try {
        const list = await loadCourses(stored);
        setCourses(list);
        const preferred = list.find((c) => c.slug === 'full-stack-development') || list[0];
        if (preferred) {
          setSlug(preferred.slug);
          await loadCurriculum(preferred.slug, stored);
          await loadProgress(preferred.slug, stored);
        }
      } catch (e) {
        flash(e.message || 'Failed to load LMS', true);
      } finally {
        setLoading(false);
      }
    })();
  }, [navigate, loadCourses, loadCurriculum, loadProgress]);

  const refreshAll = async () => {
    try {
      const list = await loadCourses();
      setCourses(list);
      if (slug) {
        await loadCurriculum(slug);
        await loadProgress(slug);
      }
      flash('LMS refreshed');
    } catch (e) {
      flash(e.message, true);
    }
  };

  const selectCourse = async (nextSlug) => {
    setSlug(nextSlug);
    setDrawerOpen(false);
    try {
      await loadCurriculum(nextSlug);
      await loadProgress(nextSlug);
    } catch (e) {
      flash(e.message, true);
    }
  };

  const chapters = useMemo(() => {
    const list = curriculum?.chapters || [];
    if (trackFilter === 'all') return list;
    return list.filter((c) => c.track === trackFilter);
  }, [curriculum, trackFilter]);

  const openNew = () => {
    const maxOrder = (curriculum?.chapters || []).reduce((m, c) => Math.max(m, c.order || 0), 0);
    const blank = emptyChapter();
    blank.order = maxOrder + 1;
    blank.track = trackFilter === 'all' ? 'shared' : trackFilter;
    setEditingId(null);
    setForm(blank);
    setDrawerOpen(true);
  };

  const openEdit = (ch) => {
    setEditingId(ch.id);
    setForm(chapterToForm(ch));
    setDrawerOpen(true);
  };

  const saveChapter = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      flash('Title is required', true);
      return;
    }
    setSaving(true);
    try {
      const payload = formToPayload(form);
      const url = editingId
        ? `/api/lms/courses/${slug}/chapters/${editingId}`
        : `/api/lms/courses/${slug}/chapters`;
      const res = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: headers(),
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Save failed');
      flash(editingId ? 'Chapter updated' : 'Chapter added');
      setDrawerOpen(false);
      await loadCurriculum(slug);
      await loadProgress(slug);
      const list = await loadCourses();
      setCourses(list);
    } catch (err) {
      flash(err.message, true);
    } finally {
      setSaving(false);
    }
  };

  const deleteChapter = async (chapterId) => {
    if (!window.confirm('Delete this chapter? Student progress for it will no longer count.')) return;
    const res = await fetch(`/api/lms/courses/${slug}/chapters/${chapterId}`, {
      method: 'DELETE',
      headers: headers()
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      flash(data.message || 'Delete failed', true);
      return;
    }
    flash('Chapter deleted');
    await loadCurriculum(slug);
    const list = await loadCourses();
    setCourses(list);
  };

  const seedDefault = async () => {
    const force = (curriculum?.chapters?.length || 0) > 0;
    if (force && !window.confirm('Replace ALL chapters with the default Full Stack curriculum?')) return;
    const res = await fetch(`/api/lms/courses/${slug}/seed-default`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ force })
    });
    const data = await res.json();
    if (!res.ok) {
      flash(data.message || 'Seed failed', true);
      return;
    }
    setCurriculum(data);
    flash('Default curriculum loaded');
    const list = await loadCourses();
    setCourses(list);
  };

  const clearLms = async () => {
    if (!window.confirm('Remove all LMS chapters from this course?')) return;
    const res = await fetch(`/api/lms/courses/${slug}/clear`, {
      method: 'POST',
      headers: headers(),
      body: '{}'
    });
    const data = await res.json();
    if (!res.ok) {
      flash(data.message || 'Clear failed', true);
      return;
    }
    setCurriculum({ ...data, chapters: [] });
    flash('LMS cleared');
    const list = await loadCourses();
    setCourses(list);
  };

  const resetProgress = async (enrollmentId) => {
    if (!window.confirm('Reset this student\'s LMS progress, track, and certificate?')) return;
    const res = await fetch(`/api/lms/enrollments/${enrollmentId}/reset`, {
      method: 'POST',
      headers: headers(),
      body: '{}'
    });
    const data = await res.json();
    if (!res.ok) {
      flash(data.message || 'Reset failed', true);
      return;
    }
    flash('Progress reset');
    await loadProgress(slug);
  };

  const updateQuestion = (qi, patch) => {
    setForm((f) => {
      const questions = [...f.quiz.questions];
      questions[qi] = { ...questions[qi], ...patch };
      return { ...f, quiz: { ...f.quiz, questions } };
    });
  };

  const updateOption = (qi, oi, value) => {
    setForm((f) => {
      const questions = [...f.quiz.questions];
      const options = [...questions[qi].options];
      options[oi] = value;
      questions[qi] = { ...questions[qi], options };
      return { ...f, quiz: { ...f.quiz, questions } };
    });
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="admin-spinner" />
        <p>Loading LMS admin…</p>
      </div>
    );
  }

  return (
    <div className="admin-shell lms-admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <div className="admin-brand-mark">LMS</div>
          <div>
            <strong>LMS Control</strong>
            <span>Curriculum &amp; progress</span>
          </div>
        </div>
        <Link to="/admin" className="admin-nav-btn"><ArrowLeft size={18} /> Back to Admin</Link>
        <button
          type="button"
          className={`admin-nav-btn ${view === 'chapters' ? 'active' : ''}`}
          onClick={() => setView('chapters')}
        >
          <BookOpen size={18} /> Curriculum
        </button>
        <button
          type="button"
          className={`admin-nav-btn ${view === 'progress' ? 'active' : ''}`}
          onClick={() => setView('progress')}
        >
          <Users size={18} /> Student progress
        </button>
        <div className="admin-side-foot">
          <Link to="/" className="admin-nav-btn">View site</Link>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <div>
            <h1>Learning Management</h1>
            <p style={{ margin: 0, color: 'var(--muted)', fontSize: '.9rem' }}>
              Edit chapters, quizzes, and track student LMS progress
            </p>
          </div>
          <div className="admin-top-actions">
            <select
              className="lms-admin-select"
              value={slug}
              onChange={(e) => selectCourse(e.target.value)}
            >
              {courses.map((c) => (
                <option key={c._id} value={c.slug}>
                  {c.title} ({c.chapterCount} ch)
                </option>
              ))}
            </select>
            <button type="button" className="admin-icon-btn" onClick={refreshAll} title="Refresh">
              <RefreshCw size={18} />
            </button>
            {view === 'chapters' && (
              <button type="button" className="btn btn-primary btn-sm" onClick={openNew}>
                <Plus size={16} /> Add chapter
              </button>
            )}
          </div>
        </header>

        {toast && (
          <div className={`admin-toast ${toast.err ? 'err' : ''}`}>{toast.text}</div>
        )}

        <div className="admin-content">
          {view === 'chapters' && (
            <>
              <div className="lms-admin-toolbar">
                <div className="tabs">
                  <button type="button" className={`tab ${trackFilter === 'all' ? 'active' : ''}`} onClick={() => setTrackFilter('all')}>
                    All ({curriculum?.chapterCount || 0})
                  </button>
                  {TRACKS.map((t) => {
                    const count = curriculum?.tracks?.find((x) => x.track === t.id)?.count || 0;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        className={`tab ${trackFilter === t.id ? 'active' : ''}`}
                        onClick={() => setTrackFilter(t.id)}
                      >
                        {t.label} ({count})
                      </button>
                    );
                  })}
                </div>
                <div className="lms-admin-actions">
                  <button type="button" className="btn btn-secondary btn-sm" onClick={seedDefault}>
                    <Layers size={14} /> Load default curriculum
                  </button>
                  {(curriculum?.chapterCount || 0) > 0 && (
                    <button type="button" className="btn btn-secondary btn-sm" onClick={clearLms}>
                      Clear LMS
                    </button>
                  )}
                </div>
              </div>

              <div className="admin-card">
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Track</th>
                        <th>Quiz</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {chapters.map((ch) => (
                        <tr key={ch.id}>
                          <td>{ch.order}</td>
                          <td>
                            <strong>{ch.title}</strong>
                            <div style={{ color: 'var(--muted)', fontSize: '.85rem' }}>{ch.summary?.slice(0, 80)}</div>
                          </td>
                          <td><span className="lms-badge">{ch.track}</span></td>
                          <td>{ch.quiz?.questions?.length || 0} Q · pass {ch.quiz?.passScore ?? 70}%</td>
                          <td style={{ whiteSpace: 'nowrap' }}>
                            <button type="button" className="btn btn-secondary btn-sm" onClick={() => openEdit(ch)}>
                              <Pencil size={14} />
                            </button>{' '}
                            <button type="button" className="btn btn-secondary btn-sm" onClick={() => deleteChapter(ch.id)}>
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {chapters.length === 0 && (
                        <tr>
                          <td colSpan={5} style={{ textAlign: 'center', color: 'var(--muted)', padding: 28 }}>
                            No chapters yet. Add one or load the default Full Stack curriculum.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {view === 'progress' && (
            <div className="admin-card">
              <div className="admin-card-head" style={{ padding: '16px 18px 0' }}>
                <h3>
                  <GraduationCap size={18} style={{ verticalAlign: 'middle', marginRight: 8 }} />
                  Enrolled learners ({progress?.enrollments?.length || 0})
                </h3>
              </div>
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Track</th>
                      <th>Progress</th>
                      <th>Status</th>
                      <th>Certificate</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {(progress?.enrollments || []).map((e) => (
                      <tr key={e._id}>
                        <td>
                          <strong>{e.student?.name || '—'}</strong>
                          <div style={{ color: 'var(--muted)', fontSize: '.85rem' }}>{e.student?.email}</div>
                        </td>
                        <td>{e.trackChoice === 'next' ? 'Next.js' : e.trackChoice === 'react' ? 'React' : '—'}</td>
                        <td>
                          <div className="progress-bar" style={{ width: 120, margin: 0 }}>
                            <span style={{ width: `${e.progressPercent || 0}%` }} />
                          </div>
                          <span style={{ fontSize: '.85rem' }}>{e.progressPercent || 0}%</span>
                        </td>
                        <td style={{ textTransform: 'capitalize' }}>{e.status}</td>
                        <td style={{ fontSize: '.85rem' }}>{e.certificateId || '—'}</td>
                        <td>
                          <button type="button" className="btn btn-secondary btn-sm" onClick={() => resetProgress(e._id)}>
                            <RotateCcw size={14} /> Reset
                          </button>
                        </td>
                      </tr>
                    ))}
                    {!(progress?.enrollments?.length) && (
                      <tr>
                        <td colSpan={6} style={{ textAlign: 'center', color: 'var(--muted)', padding: 28 }}>
                          No active enrollments for this course.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {drawerOpen && (
        <div className="admin-drawer-backdrop" onClick={() => setDrawerOpen(false)}>
          <aside className="admin-drawer lms-admin-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="admin-drawer-head">
              <h2>{editingId ? 'Edit chapter' : 'New chapter'}</h2>
              <button type="button" className="admin-icon-btn" onClick={() => setDrawerOpen(false)}>×</button>
            </div>
            <form className="admin-form" onSubmit={saveChapter}>
              <label>Title
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
              </label>
              <div className="lms-admin-row">
                <label>Order
                  <input type="number" min={1} value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} />
                </label>
                <label>Track
                  <select value={form.track} onChange={(e) => setForm({ ...form, track: e.target.value })}>
                    {TRACKS.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
                  </select>
                </label>
              </div>
              <label>Summary
                <textarea rows={2} value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} />
              </label>
              <label>Lesson content
                <textarea rows={8} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
              </label>
              <label>Key points (one per line)
                <textarea rows={4} value={form.keyPoints} onChange={(e) => setForm({ ...form, keyPoints: e.target.value })} />
              </label>

              <h3 className="lms-admin-subhead">Try it editors (W3Schools-style)</h3>
              {(form.tryIt || []).map((t, ti) => (
                <div key={ti} className="lms-admin-q">
                  <div className="lms-admin-q-head">
                    <strong>Try it #{ti + 1}</strong>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => setForm({
                        ...form,
                        tryIt: form.tryIt.filter((_, i) => i !== ti)
                      })}
                    >
                      Remove
                    </button>
                  </div>
                  <input
                    placeholder="Title"
                    value={t.title}
                    onChange={(e) => {
                      const tryIt = [...form.tryIt];
                      tryIt[ti] = { ...tryIt[ti], title: e.target.value };
                      setForm({ ...form, tryIt });
                    }}
                  />
                  <input
                    placeholder="Short description"
                    value={t.description}
                    onChange={(e) => {
                      const tryIt = [...form.tryIt];
                      tryIt[ti] = { ...tryIt[ti], description: e.target.value };
                      setForm({ ...form, tryIt });
                    }}
                  />
                  <textarea
                    rows={4}
                    placeholder="HTML"
                    value={t.html}
                    onChange={(e) => {
                      const tryIt = [...form.tryIt];
                      tryIt[ti] = { ...tryIt[ti], html: e.target.value };
                      setForm({ ...form, tryIt });
                    }}
                  />
                  <textarea
                    rows={3}
                    placeholder="CSS"
                    value={t.css}
                    onChange={(e) => {
                      const tryIt = [...form.tryIt];
                      tryIt[ti] = { ...tryIt[ti], css: e.target.value };
                      setForm({ ...form, tryIt });
                    }}
                  />
                  <textarea
                    rows={3}
                    placeholder="JavaScript"
                    value={t.js}
                    onChange={(e) => {
                      const tryIt = [...form.tryIt];
                      tryIt[ti] = { ...tryIt[ti], js: e.target.value };
                      setForm({ ...form, tryIt });
                    }}
                  />
                </div>
              ))}
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => setForm({
                  ...form,
                  tryIt: [
                    ...(form.tryIt || []),
                    { id: '', title: 'Try it yourself', description: '', html: '', css: '', js: '' }
                  ]
                })}
              >
                <Plus size={14} /> Add Try it block
              </button>

              <h3 className="lms-admin-subhead">Build locally</h3>
              <label>Goal
                <input value={form.localBuild.goal} onChange={(e) => setForm({ ...form, localBuild: { ...form.localBuild, goal: e.target.value } })} />
              </label>
              <label>Commands (one per line)
                <textarea rows={3} value={form.localBuild.commands} onChange={(e) => setForm({ ...form, localBuild: { ...form.localBuild, commands: e.target.value } })} />
              </label>
              <label>Expected URL
                <input value={form.localBuild.expectedUrl} onChange={(e) => setForm({ ...form, localBuild: { ...form.localBuild, expectedUrl: e.target.value } })} />
              </label>
              <label>Checklist (one per line)
                <textarea rows={3} value={form.localBuild.checklist} onChange={(e) => setForm({ ...form, localBuild: { ...form.localBuild, checklist: e.target.value } })} />
              </label>

              <h3 className="lms-admin-subhead">Example</h3>
              <label>Title
                <input value={form.example.title} onChange={(e) => setForm({ ...form, example: { ...form.example, title: e.target.value } })} />
              </label>
              <label>Code
                <textarea rows={5} value={form.example.code} onChange={(e) => setForm({ ...form, example: { ...form.example, code: e.target.value } })} />
              </label>
              <label>Explanation
                <textarea rows={2} value={form.example.explanation} onChange={(e) => setForm({ ...form, example: { ...form.example, explanation: e.target.value } })} />
              </label>

              <h3 className="lms-admin-subhead">Quiz</h3>
              <label>Pass score %
                <input type="number" min={1} max={100} value={form.quiz.passScore} onChange={(e) => setForm({ ...form, quiz: { ...form.quiz, passScore: e.target.value } })} />
              </label>
              {form.quiz.questions.map((q, qi) => (
                <div key={qi} className="lms-admin-q">
                  <div className="lms-admin-q-head">
                    <strong>Question {qi + 1}</strong>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => setForm({
                        ...form,
                        quiz: {
                          ...form.quiz,
                          questions: form.quiz.questions.filter((_, i) => i !== qi)
                        }
                      })}
                    >
                      Remove
                    </button>
                  </div>
                  <input
                    placeholder="Prompt"
                    value={q.prompt}
                    onChange={(e) => updateQuestion(qi, { prompt: e.target.value })}
                  />
                  {q.options.map((opt, oi) => (
                    <label key={oi} className="lms-admin-opt">
                      <input
                        type="radio"
                        name={`ans-${qi}`}
                        checked={Number(q.answerIndex) === oi}
                        onChange={() => updateQuestion(qi, { answerIndex: oi })}
                      />
                      <input
                        placeholder={`Option ${oi + 1}`}
                        value={opt}
                        onChange={(e) => updateOption(qi, oi, e.target.value)}
                      />
                    </label>
                  ))}
                  <input
                    placeholder="Explanation (shown after submit)"
                    value={q.explanation}
                    onChange={(e) => updateQuestion(qi, { explanation: e.target.value })}
                  />
                </div>
              ))}
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => setForm({
                  ...form,
                  quiz: {
                    ...form.quiz,
                    questions: [
                      ...form.quiz.questions,
                      { prompt: '', options: ['', '', '', ''], answerIndex: 0, explanation: '' }
                    ]
                  }
                })}
              >
                <Plus size={14} /> Add question
              </button>

              <div className="admin-form-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setDrawerOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  <Save size={16} /> {saving ? 'Saving…' : 'Save chapter'}
                </button>
              </div>
            </form>
          </aside>
        </div>
      )}
    </div>
  );
}
