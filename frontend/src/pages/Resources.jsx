import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CodeSandbox from '../components/CodeSandbox';
import ProgramCard from '../components/ProgramCard';

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [freeCourses, setFreeCourses] = useState([]);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    fetch('/api/resources').then((r) => r.json()).then((d) => { if (Array.isArray(d)) setResources(d); }).catch(() => {});
    fetch('/api/courses').then((r) => r.json()).then((d) => {
      if (Array.isArray(d)) setFreeCourses(d.filter((c) => c.isFree || c.price === 0));
    }).catch(() => {});
  }, []);

  const tutorials = resources.filter((r) => r.type === 'tutorial');
  const quizzes = resources.filter((r) => r.type === 'quiz');

  const submitQuiz = () => {
    if (!activeQuiz) return;
    let correct = 0;
    (activeQuiz.questions || []).forEach((q, i) => {
      if (answers[i] === q.answerIndex) correct += 1;
    });
    setScore(`${correct} / ${activeQuiz.questions.length}`);
  };

  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <h1>Free Resources</h1>
          <p>Tutorials, quizzes, compilers, and free courses — lift your career at zero cost.</p>
        </div>
      </section>

      <section className="section section-alt" id="tutorials">
        <div className="container">
          <div className="section-head">
            <h2>Tutorials</h2>
            <p>Start learning programming and web fundamentals today.</p>
          </div>
          <div className="card-grid">
            {tutorials.map((t) => (
              <article key={t._id} className="resource-card card-body">
                <div className="program-cat">Tutorial</div>
                <h3>{t.title}</h3>
                <p>{t.description}</p>
                <div className="meta-row">{t.meta}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Quizzes</h2>
            <p>Rack your brain and test your skills.</p>
          </div>
          <div className="card-grid">
            {quizzes.map((q) => (
              <article key={q._id} className="resource-card card-body">
                <h3>{q.title}</h3>
                <p>{q.description}</p>
                <div className="meta-row">{q.meta || `${q.questions?.length || 0} questions`}</div>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => { setActiveQuiz(q); setAnswers({}); setScore(null); }}
                >
                  Start Quiz
                </button>
              </article>
            ))}
          </div>

          {activeQuiz && (
            <div className="quiz-box">
              <h3 style={{ marginBottom: 12 }}>{activeQuiz.title}</h3>
              {(activeQuiz.questions || []).map((q, qi) => (
                <div key={q.question} style={{ marginBottom: 18 }}>
                  <strong>{qi + 1}. {q.question}</strong>
                  {(q.options || []).map((opt, oi) => {
                    let cls = 'quiz-option';
                    if (score && oi === q.answerIndex) cls += ' correct';
                    else if (score && answers[qi] === oi && oi !== q.answerIndex) cls += ' wrong';
                    return (
                      <button
                        key={opt}
                        type="button"
                        className={cls}
                        onClick={() => !score && setAnswers({ ...answers, [qi]: oi })}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              ))}
              {!score ? (
                <button type="button" className="btn btn-accent" onClick={submitQuiz}>Submit</button>
              ) : (
                <p><strong>Score:</strong> {score}</p>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="section section-alt" id="compiler">
        <div className="container">
          <div className="section-head">
            <h2>Practice with Online Compilers</h2>
            <p>Coding should be for everyone — practice JavaScript instantly in the browser.</p>
          </div>
          <CodeSandbox />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Free Courses</h2>
            <p>Self-paced courses so you can learn anytime, anywhere.</p>
          </div>
          <div className="card-grid">
            {freeCourses.map((c) => <ProgramCard key={c._id} course={c} />)}
          </div>
          {freeCourses.length === 0 && (
            <p style={{ textAlign: 'center' }}>
              <Link to="/programs">Browse all programs</Link>
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
