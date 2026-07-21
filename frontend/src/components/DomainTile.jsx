import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import CourseExplainerReel from './CourseExplainerReel';

/**
 * Domain path tile — keeps the navy bento card UI, plays course explainer on hover.
 */
export default function DomainTile({ domain, index = 0, course }) {
  const [hovered, setHovered] = useState(false);
  const Icon = domain.icon;
  const sceneCourse = course || { category: domain.category, title: domain.name };
  const isLead = index === 0;

  return (
    <Link
      to={domain.to}
      className={`domain-tile domain-tone-${domain.tone}${isLead ? ' is-lead' : ''} has-explainer${hovered ? ' is-explainer-hover' : ''}`}
      style={{ '--i': index }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <span className="domain-num" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
      <div className="domain-tile-base">
        <div className="domain-icon"><Icon size={20} strokeWidth={2.1} /></div>
        <div className="domain-copy">
          <h3>{domain.name}</h3>
          <p>{domain.blurb}</p>
        </div>
        <span className="domain-cta">
          See programs <ArrowRight size={16} />
        </span>
      </div>
      <CourseExplainerReel course={sceneCourse} active={hovered} />
    </Link>
  );
}
