import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Terminal, ListChecks, Code2, Sparkles } from 'lucide-react';
import { apiFetch, getStudentToken } from '../utils/api';
import LessonProse from '../components/LessonProse';
import TryItEditor from './TryItEditor';

export default function PortalChapter() {
  const { slug, chapterId } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    apiFetch(`/api/enrollments/mine/${slug}/chapters/${chapterId}`, { token: getStudentToken() })
      .then(setData)
      .catch((e) => setError(e.message));
  }, [slug, chapterId]);

  if (error) {
    return (
      <div className="container portal-shell">
        <p style={{ color: 'var(--danger)' }}>{error}</p>
        <Link to={`/portal/courses/${slug}`} className="btn btn-secondary btn-sm">Back to classroom</Link>
      </div>
    );
  }

  if (!data) {
    return <div className="container portal-shell"><p>Loading chapter…</p></div>;
  }

  const { chapter, progress } = data;
  const build = chapter.localBuild;
  const example = chapter.example;
  const tryIts = chapter.tryIt || [];
  const keyPoints = chapter.keyPoints || [];
  const quizLen = chapter.quiz?.questions?.length || 0;
  const passed = progress?.quizPassed;

  return (
    <div className="container portal-shell lms-shell">
      <div className="lms-crumb">
        <Link to={`/portal/courses/${slug}`}>Classroom</Link>
        <span>/</span>
        <span>Chapter {chapter.order}</span>
      </div>

      <header className="lms-chapter-hero">
        <div className="program-cat">{chapter.track}</div>
        <h1>{chapter.order}. {chapter.title}</h1>
        <p className="lms-lead">{chapter.summary}</p>
        {passed && (
          <p className="lms-passed-note">Quiz passed at {progress.quizScore}% · {progress.attempts || 1} attempt(s)</p>
        )}
      </header>

      <article className="lms-lesson-body">
        <h2>Lesson</h2>
        <LessonProse text={chapter.content} />
      </article>

      {keyPoints.length > 0 && (
        <section className="lms-keypoints">
          <h2><Sparkles size={20} /> Remember these</h2>
          <ul>
            {keyPoints.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        </section>
      )}

      {tryIts.map((t) => (
        <TryItEditor
          key={t.id || t.title}
          title={t.title}
          description={t.description}
          html={t.html}
          css={t.css}
          js={t.js}
        />
      ))}

      {build && (build.goal || (build.commands && build.commands.length) || (build.checklist && build.checklist.length)) && (
        <section className="lms-build-panel">
          <h2><Terminal size={20} /> Build locally</h2>
          {build.goal && <p className="lms-lead">{build.goal}</p>}
          {build.expectedUrl && (
            <p className="lms-expected-url">Expected URL: <code>{build.expectedUrl}</code></p>
          )}
          {build.commands?.length > 0 && (
            <div className="lms-commands">
              {build.commands.map((cmd, i) => (
                <pre key={i}><code>{cmd}</code></pre>
              ))}
            </div>
          )}
          {build.checklist?.length > 0 && (
            <ul className="lms-checklist">
              {build.checklist.map((item, i) => (
                <li key={i}><ListChecks size={16} /> {item}</li>
              ))}
            </ul>
          )}
        </section>
      )}

      {example && (example.title || example.code) && (
        <section className="lms-example-panel">
          <h2><Code2 size={20} /> Example{example.title ? `: ${example.title}` : ''}</h2>
          {example.explanation && <p className="lms-lead">{example.explanation}</p>}
          {example.code && (
            <pre className="lms-code"><code>{example.code}</code></pre>
          )}
        </section>
      )}

      <div className="lms-chapter-footer">
        <Link to={`/portal/courses/${slug}`} className="btn btn-secondary btn-sm">All chapters</Link>
        {quizLen > 0 && (
          <Link to={`/portal/courses/${slug}/chapters/${chapterId}/quiz`} className="btn btn-primary btn-sm">
            {passed ? 'Retake quiz' : 'Take quiz'} ({quizLen} questions · pass {chapter.quiz.passScore}%)
          </Link>
        )}
      </div>
    </div>
  );
}
