import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, IndianRupee } from 'lucide-react';

export default function ProgramCard({ course, variant = 'default', featured = false }) {
  const isShowcase = variant === 'showcase';
  const priceLabel = course.isFree || course.price === 0
    ? 'Free'
    : course.price?.toLocaleString('en-IN');

  return (
    <article className={`program-card ${isShowcase ? 'program-card-showcase' : ''} ${featured ? 'is-featured' : ''}`}>
      <div className="program-media">
        <img
          src={course.imageUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60'}
          alt={course.title}
        />
        {isShowcase && <span className="program-cat">{course.category}</span>}
        {featured && <span className="program-badge">Popular</span>}
      </div>
      <div className="program-body">
        {!isShowcase && <div className="program-cat">{course.category}</div>}
        <h3>{course.title}</h3>
        <p>{course.description?.slice(0, 110)}{(course.description?.length || 0) > 110 ? '…' : ''}</p>
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
        <div className="program-actions">
          <Link to={`/programs/${course.slug}`} className="btn btn-primary btn-sm">
            Learn More {isShowcase && <ArrowRight size={14} />}
          </Link>
          <Link to={`/contact?course=${course.slug}`} className="btn btn-secondary btn-sm">Get Callback</Link>
        </div>
      </div>
    </article>
  );
}
