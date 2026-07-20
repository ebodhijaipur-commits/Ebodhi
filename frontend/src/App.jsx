import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import StudentAuth from './components/StudentAuth';
import { SiteSettingsProvider } from './context/SiteSettingsContext';
import Home from './pages/Home';
import Programs from './pages/Programs';
import CourseView from './pages/CourseView';
import ContactUs from './pages/ContactUs';
import Campus from './pages/Campus';
import Internships from './pages/Internships';
import Workshops from './pages/Workshops';
import Practice from './pages/Practice';
import SuccessStories from './pages/SuccessStories';
import CareerOutcomes from './pages/CareerOutcomes';
import About from './pages/About';
import StudentLogin from './pages/StudentLogin';
import StudentRegister from './pages/StudentRegister';
import PortalDashboard from './pages/PortalDashboard';
import PortalClassroom from './pages/PortalClassroom';
import PortalChapter from './pages/PortalChapter';
import PortalQuiz from './pages/PortalQuiz';
import PortalCertificate from './pages/PortalCertificate';
import PortalProfile from './pages/PortalProfile';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminLms from './pages/AdminLms';

function LegacyCourseRedirect() {
  const { slug } = useParams();
  return <Navigate to={`/programs/${slug}`} replace />;
}

export default function App() {
  return (
    <Router>
      <SiteSettingsProvider>
      <ScrollToTop />
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/programs/:slug" element={<CourseView />} />
              <Route path="/courses" element={<Navigate to="/programs" replace />} />
              <Route path="/course/:slug" element={<LegacyCourseRedirect />} />
              <Route path="/internships" element={<Internships />} />
              <Route path="/campus" element={<Campus />} />
              <Route path="/workshops" element={<Workshops />} />
              <Route path="/practice" element={<Practice />} />
              <Route path="/success-stories" element={<SuccessStories />} />
              <Route path="/career-outcomes" element={<CareerOutcomes />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<ContactUs />} />
              {/* Legacy redirects from earlier WSCube-named routes */}
              <Route path="/masterclass" element={<Navigate to="/workshops" replace />} />
              <Route path="/resources" element={<Navigate to="/practice" replace />} />
              <Route path="/alumni" element={<Navigate to="/success-stories" replace />} />
              <Route path="/placement-report" element={<Navigate to="/career-outcomes" replace />} />
              <Route path="/login" element={<StudentLogin />} />
              <Route path="/register" element={<StudentRegister />} />
              <Route path="/portal" element={<StudentAuth><PortalDashboard /></StudentAuth>} />
              <Route path="/portal/courses/:slug" element={<StudentAuth><PortalClassroom /></StudentAuth>} />
              <Route path="/portal/courses/:slug/chapters/:chapterId" element={<StudentAuth><PortalChapter /></StudentAuth>} />
              <Route path="/portal/courses/:slug/chapters/:chapterId/quiz" element={<StudentAuth><PortalQuiz /></StudentAuth>} />
              <Route path="/portal/courses/:slug/certificate" element={<StudentAuth><PortalCertificate /></StudentAuth>} />
              <Route path="/portal/profile" element={<StudentAuth><PortalProfile /></StudentAuth>} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/lms" element={<AdminLms />} />
            </Routes>
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
      </SiteSettingsProvider>
    </Router>
  );
}
