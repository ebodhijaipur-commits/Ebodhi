import React from 'react';
import { Link } from 'react-router-dom';

export default function PromoBanner() {
  return (
    <div className="promo-banner">
      <span>Summer industrial training & GenAI-ready courses — new Jaipur & online batches open</span>
      <Link to="/internships">Explore Internships</Link>
    </div>
  );
}
