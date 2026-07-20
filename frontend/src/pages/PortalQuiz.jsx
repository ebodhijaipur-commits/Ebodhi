import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { apiFetch, getStudentToken } from '../utils/api';

export default function PortalQuiz() {
  const { slug, chapterId } = useParams();
  const [chapter, setChapter] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setResult(null);
    apiFetch(`/api/enrollments/mine/${slug}/chapters/${chapterId}`, { token: getStudentToken() })
      .then((data) => {
        setChapter(data.chapter);
        setAnswers(new Array(data.chapter.quiz?.questions?.length || 0).fill(null));
      })
      .catch((e) => setError(e.message));
  }, [slug, chapterId]);

  const submit = async () => {
    if (answers.some((a) => a === null || a === undefined || Number.isNaN(a))) {
      setError('Select an answer for every question.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const data = await apiFetch(`/api/enrollments/mine/${slug}/chapters/${chapterId}/quiz`, {
        method: 'POST',
        token: getStudentToken(),
        body: JSON.stringify({ answers })
      });
      setResult(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  const retry = () => {
    setResult(null);
    setAnswers(new Array(chapter.quiz.questions.length).fill(null));
    setError('');
  };

  if (error && !chapter) {
    return (
      <div className="container portal-shell">
        <p style={{ color: 'var(--danger)' }}>{error}</p>
        <Link to={`/portal/courses/${slug}`} className="btn btn-secondary btn-sm">Back to classroom</Link>
      </div>
    );
  }

  if (!chapter) {
    return <div className="container portal-shell"><p>Loading quiz…</p></div>;
  }

  const questions = chapter.quiz?.questions || [];

  return (
    <div className="container portal-shell lms-shell">
      <div className="lms-crumb">
        <Link to={`/portal/courses/${slug}`}>Classroom</Link>
        <span>/</span>
        <Link to={`/portal/courses/${slug}/chapters/${chapterId}`}>Ch. {chapter.order}</Link>
        <span>/</span>
        <span>Quiz</span>
      </div>

      <header className="lms-chapter-hero">
        <h1>Quiz: {chapter.title}</h1>
        <p className="lms-lead">Pass score: {chapter.quiz.passScore}% · {questions.length} questions</p>
      </header>

      {error && <p style={{ color: 'var(--danger)' }}>{error}</p>}

      {!result && (
        <>
          <div className="lms-quiz-list">
            {questions.map((q, qi) => (
              <fieldset key={qi} className="lms-quiz-q">
                <legend>{qi + 1}. {q.prompt}</legend>
                <div className="lms-quiz-options">
                  {(q.options || []).map((opt, oi) => (
                    <label key={oi} className={`lms-quiz-opt ${answers[qi] === oi ? 'is-selected' : ''}`}>
                      <input
                        type="radio"
                        name={`q-${qi}`}
                        checked={answers[qi] === oi}
                        onChange={() => {
                          const next = [...answers];
                          next[qi] = oi;
                          setAnswers(next);
                        }}
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>
          <div className="lms-chapter-footer">
            <Link to={`/portal/courses/${slug}/chapters/${chapterId}`} className="btn btn-secondary btn-sm">Back to lesson</Link>
            <button type="button" className="btn btn-primary btn-sm" disabled={submitting} onClick={submit}>
              {submitting ? 'Grading…' : 'Submit quiz'}
            </button>
          </div>
        </>
      )}

      {result && (
        <section className="lms-quiz-result">
          <div className={`lms-score-banner ${result.passed ? 'pass' : 'fail'}`}>
            <strong>{result.score}%</strong>
            <span>{result.passed ? 'Passed — chapter complete' : `Need ${result.passScore}% to pass`}</span>
          </div>

          <div className="lms-quiz-list">
            {result.review.map((r) => (
              <div key={r.index} className={`lms-review-q ${r.correct ? 'ok' : 'bad'}`}>
                <p><strong>{r.index + 1}. {r.prompt}</strong></p>
                <p className="lms-review-ans">
                  Your answer: {r.options[r.selected] ?? '—'}
                  {!r.correct && <> · Correct: {r.options[r.answerIndex]}</>}
                </p>
                {r.explanation && <p className="lms-review-exp">{r.explanation}</p>}
              </div>
            ))}
          </div>

          <div className="lms-chapter-footer">
            {!result.passed && (
              <button type="button" className="btn btn-secondary btn-sm" onClick={retry}>Try again</button>
            )}
            <Link to={`/portal/courses/${slug}`} className="btn btn-primary btn-sm">Back to classroom</Link>
            {result.canPickTrack && (
              <Link to={`/portal/courses/${slug}`} className="btn btn-accent btn-sm">Choose your track</Link>
            )}
            {result.pathComplete && (
              <Link to={`/portal/courses/${slug}/certificate`} className="btn btn-accent btn-sm">View certificate</Link>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
