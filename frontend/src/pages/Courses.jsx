import React, { useState, useEffect } from 'react';
import CourseCard from '../components/CourseCard';

const sampleCourses = [
  {
    _id: '1',
    title: 'Full Stack Development',
    category: 'Full Stack',
    imageUrl: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?w=400&auto=format&fit=crop',
    description: 'Learn to build modern web applications with React, Node.js, and databases.',
    price: '₹20,000',
    duration: '12–14 Weeks'
  },
  {
    _id: '2',
    title: 'Data Science with AI/ML',
    category: 'Data Science',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&auto=format&fit=crop',
    description: 'EDA, machine learning, and AI projects for internship-ready portfolios.',
    price: '₹25,000',
    duration: '12–14 Weeks'
  },
  {
    _id: '3',
    title: 'Digital Marketing',
    category: 'Digital Marketing',
    imageUrl: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=400&auto=format&fit=crop',
    description: 'SEO, social media, paid ads, and campaign analytics.',
    price: '₹20,000',
    duration: '12–14 Weeks'
  },
  {
    _id: '4',
    title: 'Data Analytics',
    category: 'Data Analytics',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&auto=format&fit=crop',
    description: 'Excel, SQL, and dashboard storytelling for business decisions.',
    price: '₹25,000',
    duration: '12–14 Weeks'
  },
  {
    _id: '5',
    title: 'App Development (Android/iOS)',
    category: 'App Development',
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&auto=format&fit=crop',
    description: 'Build Android and iOS apps with modern UI and API workflows.',
    price: '₹25,000',
    duration: '12–14 Weeks'
  }
];

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    fetch('/api/courses')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setCourses(data);
        } else {
          setCourses(sampleCourses);
        }
      })
      .catch(err => {
        console.error('Error fetching courses:', err);
        setCourses(sampleCourses);
      });
  }, []);

  const categories = ['All', ...new Set(courses.map(c => c.category))];
  const filtered = activeTab === 'All' ? courses : courses.filter(c => c.category === activeTab);

  return (
    <div className="main-content container" style={{ padding: '60px 0' }}>
      <div className="section-title-wrap" style={{ marginBottom: '40px' }}>
        <span className="section-subtitle">Our Courses</span>
        <h2 className="section-title">Explore Courses</h2>
        <p>Choose from our focused programs to boost your career.</p>
      </div>

      <div className="filter-bar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`filter-btn ${activeTab === cat ? 'active' : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="courses-grid">
        {filtered.map(course => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
}
