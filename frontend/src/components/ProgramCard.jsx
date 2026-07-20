import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, IndianRupee } from 'lucide-react';
import CourseApplyButton from './CourseApplyButton';
import CourseExplainerReel from './CourseExplainerReel';

export default function ProgramCard({
  course,
  variant = 'default',
  featured = false,
  applyStatus = null,
  onApplyStatusChange,
  hoverVideo = true
}) {
  const isShowcase = variant === 'showcase';
  const showExplainer = hoverVideo;
  const [hovered, setHovered] = useState(false);

  const priceLabel = course.isFree || course.price === 0
    ? 'Free'
    : course.price?.toLocaleString('en-IN');
  const detailTo = `/programs/${course.slug}`;

  return (
    <article
      className={`program-card ${isShowcase ? 'program-card-showcase' : ''} ${showExplainer ? 'has-explainer' : ''} ${featured ? 'is-featured' : ''} ${hovered && showExplainer ? 'is-video-hover' : ''}`}
      onMouseEnter={() => showExplainer && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => showExplainer && setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <Link to={detailTo} className="program-media" aria-label={`View ${course.title}`}>
        <img
          src={course.imageUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60'}
          alt=""
        />
        {showExplainer && <CourseExplainerReel course={course} active={hovered} />}
        {featured && <span className="program-badge">Popular</span>}
      </Link>
      <div className="program-body">
        {!isShowcase && <div className="program-cat">{course.category}</div>}
        <h3>
          <Link to={detailTo} className="program-title-link">{course.title}</Link>
        </h3>
        <p className="program-desc">{course.description?.slice(0, 110)}{(course.description?.length || 0) > 110 ? '…' : ''}</p>
        {course.highlights?.length > 0 && (
          <div className="chip-row">
            {course.highlights.slice(0, 3).map((h) => (
              <span key={h} className="chip">{h}</span>
            ))}
          </div>
        )}
        <div className="meta-row">
          <span className="meta-item">
            <Clock size={14} /> {course.duration}
          </span>
          <span className="meta-item">
            <IndianRupee size={14} />
            {priceLabel}
          </span>
          {course.avgSalary && <span className="meta-item">Avg {course.avgSalary}</span>}
        </div>
        <p className="program-lms-note">Interactive LMS with lessons, Try it editor &amp; certificate</p>
        <div className="program-actions">
          <CourseApplyButton
            course={course}
            status={applyStatus}
            onStatusChange={onApplyStatusChange}
          />
          <Link to={detailTo} className="btn btn-secondary btn-sm">
            Details <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
}
