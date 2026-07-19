import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';

export default function CourseCard({ course }) {
  const { title, slug, category, description, price, duration, imageUrl } = course;

  return (
    <div className="glass-card course-card">
      <div className="course-img-wrap">
        <img 
          src={imageUrl || 'https://images.unsplash.com/photo-1516116211223-5c359a36298a?w=800&auto=format&fit=crop&q=60'} 
          alt={title} 
          className="course-img" 
        />
        <div className="course-badge">{category}</div>
      </div>
      <div className="course-category">{category}</div>
      <h3>{title}</h3>
      <p className="course-desc">{description}</p>
      
      <div className="course-meta">
        <div className="course-duration">
          <Clock size={16} style={{ color: 'var(--color-secondary)' }} />
          <span>{duration}</span>
        </div>
        <div className="course-price">
          ₹{price?.toLocaleString('en-IN')}
        </div>
      </div>
      <Link 
        to={`/course/${slug}`} 
        className="btn btn-primary" 
        style={{ marginTop: '20px', justifyContent: 'center', width: '100%', fontSize: '0.88rem', padding: '10px 16px' }}
      >
        View Syllabus
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
