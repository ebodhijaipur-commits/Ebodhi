import React, { useEffect, useState } from 'react';
import {
  Play,
  Eye,
  Target,
  Users,
  GraduationCap,
  FolderKanban,
  Briefcase,
  Sparkles,
  Lightbulb,
  Rocket
} from 'lucide-react';

const SCENE_MS = 3200;

/** Storyboard scenes — mission, vision, training → job outcomes */
const scenes = [
  {
    kicker: 'Who we are',
    title: 'A team that teaches skills that matter',
    blurb:
      'eBodhi is a creative learning platform where mentors turn curiosity into real ability — logical reasoning, problem-solving, and creative thinking.',
    icon: Users,
    points: ['Live mentor-led sessions', 'Hands-on projects', 'Learn at your pace'],
    visual: 'who'
  },
  {
    kicker: 'Our vision',
    title: 'Empower professionals with coding',
    blurb:
      'Make coding accessible, fun, and easy — so professionals gain confidence through interactive, collaborative learning.',
    icon: Eye,
    points: ['Coding as modern literacy', 'Analytical reasoning', 'Creative expression'],
    visual: 'vision'
  },
  {
    kicker: 'Our mission',
    title: 'Teaching skills that matter',
    blurb:
      'Challenge traditional learning with an innovative curriculum focused on engagement — so professionals enjoy building while mastering 21st-century skills.',
    icon: Target,
    points: ['Learning by doing', 'Guided mentoring', 'Innovation & sharing'],
    visual: 'mission'
  },
  {
    kicker: 'How we train',
    title: 'From lesson → project → portfolio',
    blurb:
      'Every module builds on the last. Teachers guide, inspire, and encourage questions while you ship projects recruiters can evaluate.',
    icon: FolderKanban,
    points: ['Progressive curriculum', 'Live feedback loops', 'Capstone delivery'],
    visual: 'train'
  },
  {
    kicker: 'Career impact',
    title: 'Training that opens job doors',
    blurb:
      'Portfolios, interview practice, and mentor coaching turn classroom skills into internship and junior-role readiness.',
    icon: Briefcase,
    points: ['Job-ready portfolio', 'Interview prep', 'Industry mentors'],
    visual: 'job'
  }
];

function SceneVisual({ type }) {
  if (type === 'who') {
    return (
      <div className="about-reel-visual about-reel-visual-who" aria-hidden="true">
        <span className="about-reel-orb about-reel-orb-a" />
        <span className="about-reel-orb about-reel-orb-b" />
        <div className="about-reel-avatars">
          <i /><i /><i />
        </div>
        <div className="about-reel-board">
          <Sparkles size={18} />
          <span>Live classroom</span>
        </div>
      </div>
    );
  }
  if (type === 'vision') {
    return (
      <div className="about-reel-visual about-reel-visual-vision" aria-hidden="true">
        <div className="about-reel-code">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="about-reel-badge">
          <Lightbulb size={16} /> Fun · Easy · For everyone
        </div>
      </div>
    );
  }
  if (type === 'mission') {
    return (
      <div className="about-reel-visual about-reel-visual-mission" aria-hidden="true">
        <div className="about-reel-ring">
          <GraduationCap size={36} />
        </div>
        <ul className="about-reel-float-tags">
          <li>Engage</li>
          <li>Create</li>
          <li>Share</li>
        </ul>
      </div>
    );
  }
  if (type === 'train') {
    return (
      <div className="about-reel-visual about-reel-visual-train" aria-hidden="true">
        <ol className="about-reel-steps">
          <li><span>01</span> Learn</li>
          <li><span>02</span> Build</li>
          <li><span>03</span> Ship</li>
        </ol>
      </div>
    );
  }
  return (
    <div className="about-reel-visual about-reel-visual-job" aria-hidden="true">
      <div className="about-reel-path">
        <i className="is-skill">Skills</i>
        <span className="about-reel-path-line" />
        <i className="is-port">Portfolio</i>
        <span className="about-reel-path-line" />
        <i className="is-job"><Rocket size={14} /> Job</i>
      </div>
    </div>
  );
}

/**
 * Auto-playing banner “video” — vision, mission, training → career.
 */
export default function AboutMissionReel() {
  const [index, setIndex] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setTick((t) => t + 1);
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % scenes.length);
      setTick((t) => t + 1);
    }, SCENE_MS);
    return () => clearInterval(id);
  }, []);

  const scene = scenes[index];
  const Icon = scene.icon;

  return (
    <div className="about-mission-reel" aria-label="eBodhi mission and vision story">
      <div className="about-mission-reel-chrome">
        <span className="about-mission-reel-live">
          <Play size={11} fill="currentColor" /> Our story
        </span>
        <span className="about-mission-reel-count">
          {index + 1}/{scenes.length}
        </span>
      </div>

      <div key={`${index}-${tick}`} className="about-mission-reel-body">
        <div className="about-mission-reel-copy">
          <div className="about-mission-reel-icon">
            <Icon size={26} strokeWidth={2.1} />
          </div>
          <p className="about-mission-reel-kicker">{scene.kicker}</p>
          <h2 className="about-mission-reel-title">{scene.title}</h2>
          <p className="about-mission-reel-blurb">{scene.blurb}</p>
          <ul className="about-mission-reel-points">
            {scene.points.map((p, i) => (
              <li key={p} style={{ '--i': i }}>{p}</li>
            ))}
          </ul>
        </div>
        <SceneVisual type={scene.visual} />
      </div>

      <div className="about-mission-reel-bar" aria-hidden="true">
        <span
          key={`bar-${index}-${tick}`}
          className="is-running"
          style={{ '--scene-ms': `${SCENE_MS}ms` }}
        />
      </div>
      <div className="about-mission-reel-dots" aria-hidden="true">
        {scenes.map((_, i) => (
          <button
            key={i}
            type="button"
            className={i === index ? 'is-on' : ''}
            aria-label={`Show scene ${i + 1}`}
            onClick={() => {
              setIndex(i);
              setTick((t) => t + 1);
            }}
          />
        ))}
      </div>
    </div>
  );
}
