const crypto = require('crypto');

const hasFrontendTracks = (course) =>
  (course.chapters || []).some((c) => c.track === 'react' || c.track === 'next');

const requiredChapters = (course, trackChoice) => {
  const chapters = course.chapters || [];
  if (!chapters.length) return [];

  // Linear curricula (no React/Next split): every chapter counts
  if (!hasFrontendTracks(course)) {
    return [...chapters].sort((a, b) => a.order - b.order);
  }

  return chapters
    .filter((c) => {
      if (c.track === 'shared' || c.track === 'backend') return true;
      if (!trackChoice) return false;
      return c.track === trackChoice;
    })
    .sort((a, b) => a.order - b.order);
};

const sharedComplete = (course, enrollment) => {
  const shared = (course.chapters || []).filter((c) => c.track === 'shared').sort((a, b) => a.order - b.order);
  if (!shared.length) return true;
  const passed = new Set(
    (enrollment.progress || []).filter((p) => p.chapterId && p.quizPassed).map((p) => p.chapterId)
  );
  return shared.every((c) => passed.has(c.id));
};

const lmsProgressPercent = (course, enrollment) => {
  const req = requiredChapters(course, enrollment.trackChoice);
  if (!req.length) {
    const moduleCount = course.syllabus?.length || 0;
    if (!moduleCount) return 0;
    const completed = (enrollment.progress || []).filter((p) => p.completed && p.moduleIndex != null).length;
    return Math.round((completed / moduleCount) * 100);
  }
  const passed = new Set(
    (enrollment.progress || []).filter((p) => p.chapterId && p.quizPassed).map((p) => p.chapterId)
  );
  const done = req.filter((c) => passed.has(c.id)).length;
  return Math.round((done / req.length) * 100);
};

const isChapterUnlocked = (course, enrollment, chapterId) => {
  const chapters = course.chapters || [];
  const chapter = chapters.find((c) => c.id === chapterId);
  if (!chapter) return false;

  const branched = hasFrontendTracks(course);

  if (branched && (chapter.track === 'react' || chapter.track === 'next')) {
    if (!enrollment.trackChoice) return false;
    if (chapter.track !== enrollment.trackChoice) return false;
    if (!sharedComplete(course, enrollment)) return false;
  }

  if (branched && chapter.track === 'backend') {
    if (!enrollment.trackChoice) return false;
    if (!sharedComplete(course, enrollment)) return false;
    const trackChapters = chapters
      .filter((c) => c.track === enrollment.trackChoice)
      .sort((a, b) => a.order - b.order);
    const passed = new Set(
      (enrollment.progress || []).filter((p) => p.chapterId && p.quizPassed).map((p) => p.chapterId)
    );
    if (trackChapters.length && !trackChapters.every((c) => passed.has(c.id))) return false;
  }

  const path = requiredChapters(course, enrollment.trackChoice);
  const sequence = branched
    ? (enrollment.trackChoice
      ? path
      : chapters.filter((c) => c.track === 'shared').sort((a, b) => a.order - b.order))
    : path;

  const idx = sequence.findIndex((c) => c.id === chapterId);
  if (idx < 0) return false;
  if (idx === 0) return true;
  const prev = sequence[idx - 1];
  const prevProgress = (enrollment.progress || []).find((p) => p.chapterId === prev.id);
  return !!(prevProgress && prevProgress.quizPassed);
};

const canPickTrack = (course, enrollment) => {
  if (!hasFrontendTracks(course)) return false;
  if (enrollment.trackChoice) {
    const trackDone = (enrollment.progress || []).some(
      (p) => p.chapterId && p.quizPassed && (course.chapters || []).some((c) => c.id === p.chapterId && (c.track === 'react' || c.track === 'next'))
    );
    return !trackDone;
  }
  return sharedComplete(course, enrollment);
};

const pathComplete = (course, enrollment) => {
  if (hasFrontendTracks(course) && !enrollment.trackChoice) return false;
  const req = requiredChapters(course, enrollment.trackChoice);
  if (!req.length) return false;
  const passed = new Set(
    (enrollment.progress || []).filter((p) => p.chapterId && p.quizPassed).map((p) => p.chapterId)
  );
  return req.every((c) => passed.has(c.id));
};

const issueCertificateId = () => {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `EB-${stamp}-${rand}`;
};

const sanitizeChapter = (chapter, { includeAnswers = false } = {}) => {
  const quiz = chapter.quiz || { passScore: 70, questions: [] };
  return {
    id: chapter.id,
    title: chapter.title,
    order: chapter.order,
    track: chapter.track,
    summary: chapter.summary,
    content: chapter.content,
    keyPoints: chapter.keyPoints || [],
    tryIt: (chapter.tryIt || []).map((t, i) => ({
      id: t.id || `try-${i}`,
      title: t.title || 'Try it yourself',
      description: t.description || '',
      html: t.html || '',
      css: t.css || '',
      js: t.js || ''
    })),
    localBuild: chapter.localBuild,
    example: chapter.example,
    quiz: {
      passScore: quiz.passScore || 70,
      questions: (quiz.questions || []).map((q, index) => {
        const base = {
          index,
          prompt: q.prompt,
          options: q.options
        };
        if (includeAnswers) {
          base.answerIndex = q.answerIndex;
          base.explanation = q.explanation;
        }
        return base;
      })
    }
  };
};

const buildOutline = (course, enrollment) => {
  const chapters = course.chapters || [];
  const passed = new Map(
    (enrollment.progress || [])
      .filter((p) => p.chapterId)
      .map((p) => [p.chapterId, p])
  );

  const branched = hasFrontendTracks(course);
  const visible = chapters.filter((c) => {
    if (!branched) return true;
    if (c.track === 'shared' || c.track === 'backend') return true;
    if (!enrollment.trackChoice) return false;
    return c.track === enrollment.trackChoice;
  }).sort((a, b) => a.order - b.order);

  return visible.map((c) => {
    const prog = passed.get(c.id);
    return {
      id: c.id,
      title: c.title,
      order: c.order,
      track: c.track,
      summary: c.summary,
      unlocked: isChapterUnlocked(course, enrollment, c.id),
      completed: !!(prog && prog.quizPassed),
      quizScore: prog?.quizScore ?? null,
      attempts: prog?.attempts || 0
    };
  });
};

module.exports = {
  hasFrontendTracks,
  requiredChapters,
  sharedComplete,
  lmsProgressPercent,
  isChapterUnlocked,
  canPickTrack,
  pathComplete,
  issueCertificateId,
  sanitizeChapter,
  buildOutline
};
