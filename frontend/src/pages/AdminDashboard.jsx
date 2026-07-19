import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Inbox, BookOpen, GraduationCap, CalendarDays, Users, Award,
  FolderOpen, MessageSquareQuote, Settings, LogOut, ExternalLink, Search,
  RefreshCw, Plus, Menu, X, Trash2, UserPlus, Pencil
} from 'lucide-react';
import { useSiteSettings } from '../context/SiteSettingsContext';
import defaultLogo from '../assets/logo.svg';

const COURSE_CATEGORIES = ['Full Stack', 'Data Science', 'Digital Marketing', 'Data Analytics', 'App Development'];
const LEAD_STATUSES = ['Pending', 'Contacted', 'Enrolled', 'Rejected'];
const ENROLL_STATUSES = ['active', 'completed', 'revoked'];

const NAV = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'leads', label: 'Leads', icon: Inbox },
  { id: 'courses', label: 'Courses', icon: BookOpen },
  { id: 'enrollments', label: 'Enrollments', icon: GraduationCap },
  { id: 'masterclasses', label: 'Workshops', icon: CalendarDays },
  { id: 'mentors', label: 'Mentors', icon: Users },
  { id: 'alumni', label: 'Alumni', icon: Award },
  { id: 'resources', label: 'Resources', icon: FolderOpen },
  { id: 'testimonials', label: 'Testimonials', icon: MessageSquareQuote },
  { id: 'settings', label: 'Settings', icon: Settings }
];

const emptyCourse = {
  title: '', category: 'Full Stack', description: '', price: 20000, duration: '12–14 Weeks',
  imageUrl: '', featured: true, mode: 'both', avgSalary: '', isFree: false, highlights: ''
};
const emptyMc = { title: '', domain: '', date: '', mentor: '', seats: 50, description: '', imageUrl: '' };
const emptyMentor = { name: '', title: '', bio: '', imageUrl: '', domains: '' };
const emptyAlumni = { name: '', role: '', company: '', story: '', imageUrl: '', featured: true };
const emptyResource = { type: 'tutorial', title: '', description: '', meta: '', link: '' };
const emptyTestimonial = { name: '', courseName: '', review: '', rating: 5, imageUrl: '' };
const emptyEnroll = { studentId: '', courseId: '', status: 'active' };

const toLocalInput = (value) => {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { refreshSettings } = useSiteSettings();
  const [tab, setTab] = useState('overview');
  const [token, setToken] = useState('');
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [leadFilter, setLeadFilter] = useState('All');
  const [drawer, setDrawer] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [adminName, setAdminName] = useState('Admin');

  const [inquiries, setInquiries] = useState([]);
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [masterclasses, setMasterclasses] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [alumni, setAlumni] = useState([]);
  const [resources, setResources] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  const [enrollForm, setEnrollForm] = useState(emptyEnroll);
  const [courseForm, setCourseForm] = useState(emptyCourse);
  const [mcForm, setMcForm] = useState(emptyMc);
  const [mentorForm, setMentorForm] = useState(emptyMentor);
  const [alumniForm, setAlumniForm] = useState(emptyAlumni);
  const [resourceForm, setResourceForm] = useState(emptyResource);
  const [testimonialForm, setTestimonialForm] = useState(emptyTestimonial);
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '' });
  const [socialForm, setSocialForm] = useState({ instagram: '', facebook: '', linkedin: '' });
  const [basicForm, setBasicForm] = useState({ logoUrl: '', phone: '+91-141-404-5555' });

  const headers = () => ({ Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' });

  const flash = (text, isErr = false) => {
    setToast({ text, err: isErr });
    window.setTimeout(() => setToast(null), 3200);
  };

  const load = async (authToken = token) => {
    const h = { Authorization: `Bearer ${authToken}` };
    try {
      const [i, c, s, e, m, me, a, r, t, settings] = await Promise.all([
        fetch('/api/inquiries', { headers: h }).then((x) => x.json()),
        fetch('/api/courses').then((x) => x.json()),
        fetch('/api/enrollments/students/list', { headers: h }).then((x) => x.json()),
        fetch('/api/enrollments', { headers: h }).then((x) => x.json()),
        fetch('/api/masterclasses').then((x) => x.json()),
        fetch('/api/mentors').then((x) => x.json()),
        fetch('/api/alumni').then((x) => x.json()),
        fetch('/api/resources').then((x) => x.json()),
        fetch('/api/testimonials').then((x) => x.json()),
        fetch('/api/settings').then((x) => x.json())
      ]);
      if (Array.isArray(i)) setInquiries(i);
      if (Array.isArray(c)) setCourses(c);
      if (Array.isArray(s)) setStudents(s);
      if (Array.isArray(e)) setEnrollments(e);
      if (Array.isArray(m)) setMasterclasses(m);
      if (Array.isArray(me)) setMentors(me);
      if (Array.isArray(a)) setAlumni(a);
      if (Array.isArray(r)) setResources(r);
      if (Array.isArray(t)) setTestimonials(t);
      if (settings && !settings.message) {
        setBasicForm({
          logoUrl: settings.logoUrl || '',
          phone: settings.phone || '+91-141-404-5555'
        });
        setSocialForm({
          instagram: settings.instagram || '',
          facebook: settings.facebook || '',
          linkedin: settings.linkedin || ''
        });
      }
    } catch {
      flash('Failed to load dashboard data', true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem('token');
    if (!stored) {
      navigate('/admin/login');
      return;
    }
    setToken(stored);
    try {
      const admin = JSON.parse(localStorage.getItem('admin') || '{}');
      if (admin?.username || admin?.name) setAdminName(admin.username || admin.name);
    } catch { /* ignore */ }
    load(stored);
  }, [navigate]);

  const q = search.trim().toLowerCase();
  const match = (...parts) => !q || parts.some((p) => String(p || '').toLowerCase().includes(q));

  const leadStats = useMemo(() => {
    const counts = Object.fromEntries(LEAD_STATUSES.map((s) => [s, 0]));
    inquiries.forEach((l) => { if (counts[l.status] != null) counts[l.status] += 1; });
    return counts;
  }, [inquiries]);

  const pendingLeads = leadStats.Pending || 0;
  const activeEnrollments = enrollments.filter((e) => e.status !== 'revoked').length;

  const filteredLeads = inquiries.filter((l) => {
    const statusOk = leadFilter === 'All' || l.status === leadFilter;
    return statusOk && match(l.name, l.email, l.phone, l.message, l.status);
  });
  const filteredCourses = courses.filter((c) => match(c.title, c.category, c.mode, c.duration));
  const filteredStudents = students.filter((s) => match(s.name, s.email, s.phone));
  const filteredEnrollments = enrollments.filter((e) => match(e.student?.name, e.student?.email, e.course?.title, e.status));
  const filteredWorkshops = masterclasses.filter((m) => match(m.title, m.domain, m.mentor));
  const filteredMentors = mentors.filter((m) => match(m.name, m.title, ...(m.domains || [])));
  const filteredAlumni = alumni.filter((a) => match(a.name, a.role, a.company));
  const filteredResources = resources.filter((r) => match(r.title, r.type, r.meta));
  const filteredTestimonials = testimonials.filter((t) => match(t.name, t.courseName, t.review));

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    navigate('/admin/login');
  };

  const goTab = (id) => {
    setTab(id);
    setMobileOpen(false);
    setSearch('');
  };

  const updateLead = async (id, status) => {
    const res = await fetch(`/api/inquiries/${id}`, {
      method: 'PUT', headers: headers(), body: JSON.stringify({ status })
    });
    if (res.ok) { flash('Lead updated'); load(); }
    else flash('Update failed', true);
  };

  const deleteLead = async (id) => {
    if (!window.confirm('Delete this lead?')) return;
    await fetch(`/api/inquiries/${id}`, { method: 'DELETE', headers: headers() });
    flash('Lead deleted');
    load();
  };

  const closeDrawer = () => {
    setDrawer(null);
    setEditingId(null);
  };

  const saveCourse = async (e) => {
    e.preventDefault();
    const body = {
      ...courseForm,
      price: Number(courseForm.price),
      highlights: courseForm.highlights ? courseForm.highlights.split(',').map((x) => x.trim()).filter(Boolean) : []
    };
    if (!editingId) body.syllabus = [];
    const url = editingId ? `/api/courses/${editingId}` : '/api/courses';
    const res = await fetch(url, {
      method: editingId ? 'PUT' : 'POST',
      headers: headers(),
      body: JSON.stringify(body)
    });
    if (res.ok) {
      flash(editingId ? 'Course updated' : 'Course created');
      setCourseForm(emptyCourse);
      closeDrawer();
      load();
    } else {
      const d = await res.json();
      flash(d.message || 'Failed', true);
    }
  };

  const deleteCourse = async (id) => {
    if (!window.confirm('Delete course?')) return;
    await fetch(`/api/courses/${id}`, { method: 'DELETE', headers: headers() });
    flash('Course deleted');
    load();
  };

  const saveEnrollment = async (e) => {
    e.preventDefault();
    const body = editingId
      ? { studentId: enrollForm.studentId, courseId: enrollForm.courseId, status: enrollForm.status }
      : { studentId: enrollForm.studentId, courseId: enrollForm.courseId };
    const url = editingId ? `/api/enrollments/${editingId}` : '/api/enrollments';
    const res = await fetch(url, {
      method: editingId ? 'PUT' : 'POST',
      headers: headers(),
      body: JSON.stringify(body)
    });
    const d = await res.json();
    if (res.ok) {
      flash(editingId ? 'Enrollment updated' : 'Student enrolled');
      setEnrollForm(emptyEnroll);
      closeDrawer();
      load();
    } else flash(d.message || 'Failed', true);
  };

  const revokeEnrollment = async (id) => {
    if (!window.confirm('Revoke enrollment?')) return;
    await fetch(`/api/enrollments/${id}`, { method: 'DELETE', headers: headers() });
    flash('Enrollment revoked');
    load();
  };

  const saveSimple = async (baseUrl, body, reset) => {
    const url = editingId ? `${baseUrl}/${editingId}` : baseUrl;
    const res = await fetch(url, {
      method: editingId ? 'PUT' : 'POST',
      headers: headers(),
      body: JSON.stringify(body)
    });
    if (res.ok) {
      flash(editingId ? 'Updated successfully' : 'Created successfully');
      reset();
      closeDrawer();
      load();
    } else {
      const d = await res.json();
      flash(d.message || 'Failed', true);
    }
  };

  const removeSimple = async (url) => {
    if (!window.confirm('Delete item?')) return;
    await fetch(url, { method: 'DELETE', headers: headers() });
    flash('Deleted');
    load();
  };

  const changePassword = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/auth/change-password', {
      method: 'POST', headers: headers(), body: JSON.stringify(passwords)
    });
    const d = await res.json();
    if (res.ok) {
      flash(d.message || 'Password updated');
      setPasswords({ currentPassword: '', newPassword: '' });
    } else flash(d.message || 'Failed', true);
  };

  const normalizeUrl = (value) => {
    const trimmed = String(value || '').trim();
    if (!trimmed) return '';
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    return `https://${trimmed}`;
  };

  const saveSettingsPayload = async (payload, onOk, successMsg) => {
    const authToken = token || localStorage.getItem('token');
    if (!authToken) {
      flash('Please log in again', true);
      navigate('/admin/login');
      return;
    }

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      const text = await res.text();
      let d = {};
      try { d = text ? JSON.parse(text) : {}; } catch { d = { message: text || 'Invalid server response' }; }

      if (res.ok) {
        onOk(d);
        await refreshSettings();
        flash(successMsg);
      } else {
        flash(d.message || `Failed to save (${res.status})`, true);
      }
    } catch (err) {
      flash(err.message || 'Network error while saving', true);
    }
  };

  const saveBasicSettings = async (e) => {
    e.preventDefault();
    await saveSettingsPayload(
      {
        logoUrl: basicForm.logoUrl.trim(),
        phone: basicForm.phone.trim() || '+91-141-404-5555'
      },
      (d) => {
        setBasicForm({
          logoUrl: d.logoUrl || '',
          phone: d.phone || '+91-141-404-5555'
        });
      },
      'Basic settings updated'
    );
  };

  const saveSocialLinks = async (e) => {
    e.preventDefault();
    await saveSettingsPayload(
      {
        instagram: normalizeUrl(socialForm.instagram),
        facebook: normalizeUrl(socialForm.facebook),
        linkedin: normalizeUrl(socialForm.linkedin)
      },
      (d) => {
        setSocialForm({
          instagram: d.instagram || '',
          facebook: d.facebook || '',
          linkedin: d.linkedin || ''
        });
      },
      'Social links updated'
    );
  };

  const titleMap = Object.fromEntries(NAV.map((n) => [n.id, n.label]));
  const maxLead = Math.max(1, ...Object.values(leadStats));

  const recentLeads = [...inquiries]
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, 6);

  const openAdd = () => {
    setEditingId(null);
    const map = {
      courses: () => { setCourseForm(emptyCourse); setDrawer('course'); },
      enrollments: () => { setEnrollForm(emptyEnroll); setDrawer('enroll'); },
      masterclasses: () => { setMcForm(emptyMc); setDrawer('workshop'); },
      mentors: () => { setMentorForm(emptyMentor); setDrawer('mentor'); },
      alumni: () => { setAlumniForm(emptyAlumni); setDrawer('alumni'); },
      resources: () => { setResourceForm(emptyResource); setDrawer('resource'); },
      testimonials: () => { setTestimonialForm(emptyTestimonial); setDrawer('testimonial'); }
    };
    map[tab]?.();
  };

  const openEditCourse = (c) => {
    setEditingId(c._id);
    setCourseForm({
      title: c.title || '',
      category: c.category || 'Full Stack',
      description: c.description || '',
      price: c.price ?? 0,
      duration: c.duration || '',
      imageUrl: c.imageUrl || '',
      featured: !!c.featured,
      mode: c.mode || 'both',
      avgSalary: c.avgSalary || '',
      isFree: !!c.isFree,
      highlights: Array.isArray(c.highlights) ? c.highlights.join(', ') : (c.highlights || '')
    });
    setDrawer('course');
  };

  const openEditEnrollment = (e) => {
    setEditingId(e._id);
    setEnrollForm({
      studentId: e.student?._id || e.student || '',
      courseId: e.course?._id || e.course || '',
      status: e.status || 'active'
    });
    setDrawer('enroll');
  };

  const openEditWorkshop = (m) => {
    setEditingId(m._id);
    setMcForm({
      title: m.title || '',
      domain: m.domain || '',
      date: toLocalInput(m.date),
      mentor: m.mentor || '',
      seats: m.seats ?? 50,
      description: m.description || '',
      imageUrl: m.imageUrl || ''
    });
    setDrawer('workshop');
  };

  const openEditMentor = (m) => {
    setEditingId(m._id);
    setMentorForm({
      name: m.name || '',
      title: m.title || '',
      bio: m.bio || '',
      imageUrl: m.imageUrl || '',
      domains: Array.isArray(m.domains) ? m.domains.join(', ') : ''
    });
    setDrawer('mentor');
  };

  const openEditAlumni = (a) => {
    setEditingId(a._id);
    setAlumniForm({
      name: a.name || '',
      role: a.role || '',
      company: a.company || '',
      story: a.story || '',
      imageUrl: a.imageUrl || '',
      featured: !!a.featured
    });
    setDrawer('alumni');
  };

  const openEditResource = (r) => {
    setEditingId(r._id);
    setResourceForm({
      type: r.type || 'tutorial',
      title: r.title || '',
      description: r.description || '',
      meta: r.meta || '',
      link: r.link || ''
    });
    setDrawer('resource');
  };

  const openEditTestimonial = (t) => {
    setEditingId(t._id);
    setTestimonialForm({
      name: t.name || '',
      courseName: t.courseName || '',
      review: t.review || '',
      rating: t.rating || 5,
      imageUrl: t.imageUrl || ''
    });
    setDrawer('testimonial');
  };

  const drawerTitle = {
    course: editingId ? 'Edit course' : 'Add course',
    enroll: editingId ? 'Edit enrollment' : 'Assign enrollment',
    workshop: editingId ? 'Edit workshop' : 'Schedule workshop',
    mentor: editingId ? 'Edit mentor' : 'Add mentor',
    alumni: editingId ? 'Edit alumni' : 'Add alumni',
    resource: editingId ? 'Edit resource' : 'Add resource',
    testimonial: editingId ? 'Edit testimonial' : 'Add testimonial'
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="admin-spinner" />
        <p>Loading admin dashboard…</p>
      </div>
    );
  }

  return (
    <div className={`admin-shell ${mobileOpen ? 'mobile-open' : ''}`}>
      <div className="admin-mobile-scrim" onClick={() => setMobileOpen(false)} aria-hidden="true" />

      <aside className="admin-sidebar">
        <div className="admin-brand">
          <div className="admin-brand-mark">eB</div>
          <div>
            <strong>eBodhi Admin</strong>
            <span>Welcome, {adminName}</span>
          </div>
        </div>

        {NAV.map((item) => {
          const Icon = item.icon;
          const count = item.id === 'leads' ? pendingLeads
            : item.id === 'courses' ? courses.length
              : item.id === 'enrollments' ? activeEnrollments
                : item.id === 'masterclasses' ? masterclasses.length
                  : null;
          return (
            <button
              key={item.id}
              type="button"
              className={`admin-nav-btn ${tab === item.id ? 'active' : ''}`}
              onClick={() => goTab(item.id)}
            >
              <Icon size={18} />
              {item.label}
              {count != null && <span className="nav-count">{count}</span>}
            </button>
          );
        })}

        <div className="admin-side-foot">
          <Link to="/" className="admin-nav-btn"><ExternalLink size={18} /> View site</Link>
          <button type="button" className="admin-nav-btn" onClick={logout} style={{ color: '#fca5a5' }}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button type="button" className="admin-icon-btn admin-menu-toggle" onClick={() => setMobileOpen(true)} aria-label="Open menu">
              <Menu size={18} />
            </button>
            <div>
              <h1>{titleMap[tab]}</h1>
              <p>{tab === 'overview' ? 'Live snapshot of academy activity' : `Manage ${titleMap[tab].toLowerCase()} for the eBodhi site`}</p>
            </div>
          </div>
          <div className="admin-top-actions">
            {tab !== 'overview' && tab !== 'settings' && (
              <label className="admin-search">
                <Search size={16} />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={`Search ${titleMap[tab].toLowerCase()}…`}
                />
              </label>
            )}
            <button type="button" className="admin-icon-btn" onClick={() => load()} aria-label="Refresh" title="Refresh">
              <RefreshCw size={16} />
            </button>
            {['courses', 'enrollments', 'masterclasses', 'mentors', 'alumni', 'resources', 'testimonials'].includes(tab) && (
              <button type="button" className="btn btn-primary btn-sm" onClick={openAdd}>
                <Plus size={16} /> Add
              </button>
            )}
          </div>
        </header>

        <div className="admin-content">
          {tab === 'overview' && (
            <>
              <div className="admin-kpi-grid">
                <article className="admin-kpi amber" onClick={() => goTab('leads')}>
                  <div className="admin-kpi-top"><div className="admin-kpi-icon"><Inbox size={18} /></div></div>
                  <strong>{pendingLeads}</strong>
                  <span>Pending leads</span>
                </article>
                <article className="admin-kpi" onClick={() => goTab('courses')}>
                  <div className="admin-kpi-top"><div className="admin-kpi-icon"><BookOpen size={18} /></div></div>
                  <strong>{courses.length}</strong>
                  <span>Active courses</span>
                </article>
                <article className="admin-kpi green" onClick={() => goTab('enrollments')}>
                  <div className="admin-kpi-top"><div className="admin-kpi-icon"><GraduationCap size={18} /></div></div>
                  <strong>{activeEnrollments}</strong>
                  <span>Active enrollments</span>
                </article>
                <article className="admin-kpi rose" onClick={() => goTab('masterclasses')}>
                  <div className="admin-kpi-top"><div className="admin-kpi-icon"><CalendarDays size={18} /></div></div>
                  <strong>{masterclasses.length}</strong>
                  <span>Upcoming workshops</span>
                </article>
              </div>

              <div className="admin-grid-2">
                <section className="admin-card">
                  <div className="admin-card-head">
                    <h2>Lead pipeline</h2>
                    <button type="button" className="btn btn-secondary btn-sm" onClick={() => goTab('leads')}>Open leads</button>
                  </div>
                  <div className="admin-bar-list">
                    {LEAD_STATUSES.map((status) => (
                      <div key={status} className="admin-bar-row">
                        <div className="admin-bar-meta">
                          <span>{status}</span>
                          <span>{leadStats[status]}</span>
                        </div>
                        <div className="admin-bar-track">
                          <span
                            className={status === 'Pending' ? 'amber' : status === 'Enrolled' ? 'green' : status === 'Rejected' ? 'rose' : ''}
                            style={{ width: `${(leadStats[status] / maxLead) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="admin-card">
                  <div className="admin-card-head"><h2>Quick actions</h2></div>
                  <div className="admin-quick-actions">
                    <button type="button" className="admin-quick" onClick={() => { goTab('courses'); setEditingId(null); setCourseForm(emptyCourse); setDrawer('course'); }}>
                      <strong>Add course</strong>
                      <span>Publish a new program</span>
                    </button>
                    <button type="button" className="admin-quick" onClick={() => { goTab('enrollments'); setEditingId(null); setEnrollForm(emptyEnroll); setDrawer('enroll'); }}>
                      <strong>Assign enrollment</strong>
                      <span>Link student to a course</span>
                    </button>
                    <button type="button" className="admin-quick" onClick={() => { goTab('masterclasses'); setEditingId(null); setMcForm(emptyMc); setDrawer('workshop'); }}>
                      <strong>Schedule workshop</strong>
                      <span>Create a live session</span>
                    </button>
                    <button type="button" className="admin-quick" onClick={() => goTab('leads')}>
                      <strong>Review leads</strong>
                      <span>{pendingLeads} waiting for follow-up</span>
                    </button>
                  </div>
                </section>
              </div>

              <section className="admin-card">
                <div className="admin-card-head">
                  <h2>Recent inquiries</h2>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => goTab('leads')}>View all</button>
                </div>
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr><th>Name</th><th>Contact</th><th>Status</th><th>Message</th></tr>
                    </thead>
                    <tbody>
                      {recentLeads.length === 0 && (
                        <tr><td colSpan={4} className="admin-empty">No leads yet</td></tr>
                      )}
                      {recentLeads.map((lead) => (
                        <tr key={lead._id}>
                          <td><strong>{lead.name}</strong></td>
                          <td>{lead.email}<div style={{ color: 'var(--muted)', fontSize: '.82rem' }}>{lead.phone}</div></td>
                          <td><span className={`admin-badge ${lead.status}`}>{lead.status}</span></td>
                          <td style={{ maxWidth: 280, color: 'var(--muted)' }}>{lead.message || '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          )}

          {tab === 'leads' && (
            <>
              <div className="admin-toolbar">
                <div className="admin-filters">
                  {['All', ...LEAD_STATUSES].map((s) => (
                    <button key={s} type="button" className={`admin-chip ${leadFilter === s ? 'active' : ''}`} onClick={() => setLeadFilter(s)}>
                      {s}{s !== 'All' ? ` (${leadStats[s] || 0})` : ''}
                    </button>
                  ))}
                </div>
                <span style={{ color: 'var(--muted)', fontSize: '.88rem' }}>{filteredLeads.length} shown</span>
              </div>
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead><tr><th>Lead</th><th>Contact</th><th>Status</th><th>Actions</th></tr></thead>
                  <tbody>
                    {filteredLeads.length === 0 && <tr><td colSpan={4} className="admin-empty">No matching leads</td></tr>}
                    {filteredLeads.map((lead) => (
                      <tr key={lead._id}>
                        <td>
                          <strong>{lead.name}</strong>
                          <div style={{ color: 'var(--muted)', fontSize: '.85rem', maxWidth: 320 }}>{lead.message || 'No message'}</div>
                        </td>
                        <td>{lead.email}<br /><span style={{ color: 'var(--muted)' }}>{lead.phone}</span></td>
                        <td>
                          <select value={lead.status} onChange={(e) => updateLead(lead._id, e.target.value)}>
                            {LEAD_STATUSES.map((s) => <option key={s}>{s}</option>)}
                          </select>
                        </td>
                        <td>
                          <button type="button" className="btn btn-secondary btn-sm" onClick={() => deleteLead(lead._id)}>
                            <Trash2 size={14} /> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {tab === 'courses' && (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead><tr><th>Course</th><th>Category</th><th>Price</th><th>Duration</th><th>Mode</th><th></th></tr></thead>
                <tbody>
                  {filteredCourses.length === 0 && <tr><td colSpan={6} className="admin-empty">No courses found</td></tr>}
                  {filteredCourses.map((c) => (
                    <tr key={c._id}>
                      <td>
                        <strong>{c.title}</strong>
                        {c.featured && <div><span className="admin-badge ok">Featured</span></div>}
                      </td>
                      <td>{c.category}</td>
                      <td>{c.isFree ? 'Free' : `₹${Number(c.price).toLocaleString('en-IN')}`}</td>
                      <td>{c.duration}</td>
                      <td><span className="admin-badge">{c.mode}</span></td>
                      <td>
                        <div className="admin-row-actions">
                          <button type="button" className="btn btn-secondary btn-sm" onClick={() => openEditCourse(c)}>
                            <Pencil size={14} /> Edit
                          </button>
                          <button type="button" className="btn btn-secondary btn-sm" onClick={() => deleteCourse(c._id)}>
                            <Trash2 size={14} /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === 'enrollments' && (
            <>
              <div className="admin-grid-2">
                <section className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
                  <div className="admin-card-head" style={{ padding: '16px 18px 0' }}><h3>Students ({filteredStudents.length})</h3></div>
                  <div className="admin-table-wrap" style={{ border: 'none', boxShadow: 'none', borderRadius: 0 }}>
                    <table className="admin-table">
                      <thead><tr><th>Name</th><th>Email</th><th>Phone</th></tr></thead>
                      <tbody>
                        {filteredStudents.map((s) => (
                          <tr key={s._id}><td>{s.name}</td><td>{s.email}</td><td>{s.phone || '—'}</td></tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
                <section className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
                  <div className="admin-card-head" style={{ padding: '16px 18px 0' }}><h3>Enrollments ({filteredEnrollments.length})</h3></div>
                  <div className="admin-table-wrap" style={{ border: 'none', boxShadow: 'none', borderRadius: 0 }}>
                    <table className="admin-table">
                      <thead><tr><th>Student</th><th>Course</th><th>Status</th><th></th></tr></thead>
                      <tbody>
                        {filteredEnrollments.map((e) => (
                          <tr key={e._id}>
                            <td>{e.student?.name || e.student?.email}</td>
                            <td>{e.course?.title}</td>
                            <td><span className={`admin-badge ${e.status}`}>{e.status}</span></td>
                            <td>
                              <div className="admin-row-actions">
                                <button type="button" className="btn btn-secondary btn-sm" onClick={() => openEditEnrollment(e)}>
                                  <Pencil size={14} /> Edit
                                </button>
                                {e.status !== 'revoked' && (
                                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => revokeEnrollment(e._id)}>Revoke</button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              </div>
            </>
          )}

          {tab === 'masterclasses' && (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead><tr><th>Workshop</th><th>Domain</th><th>Date</th><th>Mentor</th><th>Seats</th><th></th></tr></thead>
                <tbody>
                  {filteredWorkshops.map((m) => (
                    <tr key={m._id}>
                      <td><strong>{m.title}</strong></td>
                      <td>{m.domain}</td>
                      <td>{new Date(m.date).toLocaleString('en-IN')}</td>
                      <td>{m.mentor}</td>
                      <td>{m.seats}</td>
                      <td>
                        <div className="admin-row-actions">
                          <button type="button" className="btn btn-secondary btn-sm" onClick={() => openEditWorkshop(m)}>
                            <Pencil size={14} /> Edit
                          </button>
                          <button type="button" className="btn btn-secondary btn-sm" onClick={() => removeSimple(`/api/masterclasses/${m._id}`)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === 'mentors' && (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead><tr><th>Mentor</th><th>Title</th><th>Domains</th><th></th></tr></thead>
                <tbody>
                  {filteredMentors.map((m) => (
                    <tr key={m._id}>
                      <td><strong>{m.name}</strong></td>
                      <td>{m.title}</td>
                      <td>{(m.domains || []).join(', ') || '—'}</td>
                      <td>
                        <div className="admin-row-actions">
                          <button type="button" className="btn btn-secondary btn-sm" onClick={() => openEditMentor(m)}>
                            <Pencil size={14} /> Edit
                          </button>
                          <button type="button" className="btn btn-secondary btn-sm" onClick={() => removeSimple(`/api/mentors/${m._id}`)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === 'alumni' && (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead><tr><th>Name</th><th>Role</th><th>Company</th><th></th></tr></thead>
                <tbody>
                  {filteredAlumni.map((a) => (
                    <tr key={a._id}>
                      <td><strong>{a.name}</strong>{a.featured ? ' · Featured' : ''}</td>
                      <td>{a.role}</td>
                      <td>{a.company}</td>
                      <td>
                        <div className="admin-row-actions">
                          <button type="button" className="btn btn-secondary btn-sm" onClick={() => openEditAlumni(a)}>
                            <Pencil size={14} /> Edit
                          </button>
                          <button type="button" className="btn btn-secondary btn-sm" onClick={() => removeSimple(`/api/alumni/${a._id}`)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === 'resources' && (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead><tr><th>Type</th><th>Title</th><th>Meta</th><th></th></tr></thead>
                <tbody>
                  {filteredResources.map((r) => (
                    <tr key={r._id}>
                      <td><span className="admin-badge">{r.type}</span></td>
                      <td><strong>{r.title}</strong></td>
                      <td>{r.meta || '—'}</td>
                      <td>
                        <div className="admin-row-actions">
                          <button type="button" className="btn btn-secondary btn-sm" onClick={() => openEditResource(r)}>
                            <Pencil size={14} /> Edit
                          </button>
                          <button type="button" className="btn btn-secondary btn-sm" onClick={() => removeSimple(`/api/resources/${r._id}`)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === 'testimonials' && (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead><tr><th>Learner</th><th>Course</th><th>Rating</th><th>Review</th><th></th></tr></thead>
                <tbody>
                  {filteredTestimonials.map((t) => (
                    <tr key={t._id}>
                      <td><strong>{t.name}</strong></td>
                      <td>{t.courseName}</td>
                      <td>{t.rating}★</td>
                      <td style={{ maxWidth: 280, color: 'var(--muted)' }}>{t.review}</td>
                      <td>
                        <div className="admin-row-actions">
                          <button type="button" className="btn btn-secondary btn-sm" onClick={() => openEditTestimonial(t)}>
                            <Pencil size={14} /> Edit
                          </button>
                          <button type="button" className="btn btn-secondary btn-sm" onClick={() => removeSimple(`/api/testimonials/${t._id}`)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === 'settings' && (
            <div className="admin-settings-stack">
              <section className="admin-card">
                <div className="admin-card-head"><h2>Basic settings</h2></div>
                <p style={{ margin: '0 0 14px', color: 'var(--muted)', fontSize: '.9rem' }}>
                  Logo and phone appear in the navbar, footer, and contact pages. Leave logo blank to use the default.
                </p>
                <form className="admin-form" onSubmit={saveBasicSettings} noValidate>
                  <label className="admin-field-label">Logo image URL</label>
                  <input
                    type="text"
                    inputMode="url"
                    placeholder="https://example.com/logo.png"
                    value={basicForm.logoUrl}
                    onChange={(e) => setBasicForm({ ...basicForm, logoUrl: e.target.value })}
                  />
                  <div className="admin-logo-preview">
                    <span>Preview</span>
                    <img src={basicForm.logoUrl.trim() || defaultLogo} alt="Logo preview" />
                  </div>
                  <label className="admin-field-label">Phone number</label>
                  <input
                    type="text"
                    inputMode="tel"
                    placeholder="+91-141-404-5555"
                    value={basicForm.phone}
                    onChange={(e) => setBasicForm({ ...basicForm, phone: e.target.value })}
                  />
                  <button type="submit" className="btn btn-primary">Save basic settings</button>
                </form>
              </section>

              <div className="admin-grid-2" style={{ alignItems: 'start' }}>
                <section className="admin-card">
                  <div className="admin-card-head"><h2>Social links</h2></div>
                  <p style={{ margin: '0 0 14px', color: 'var(--muted)', fontSize: '.9rem' }}>
                    These URLs appear in the website footer.
                  </p>
                  <form className="admin-form" onSubmit={saveSocialLinks} noValidate>
                    <label className="admin-field-label">Instagram URL</label>
                    <input
                      type="text"
                      inputMode="url"
                      placeholder="https://www.instagram.com/yourpage"
                      value={socialForm.instagram}
                      onChange={(e) => setSocialForm({ ...socialForm, instagram: e.target.value })}
                    />
                    <label className="admin-field-label">Facebook URL</label>
                    <input
                      type="text"
                      inputMode="url"
                      placeholder="https://www.facebook.com/yourpage"
                      value={socialForm.facebook}
                      onChange={(e) => setSocialForm({ ...socialForm, facebook: e.target.value })}
                    />
                    <label className="admin-field-label">LinkedIn URL</label>
                    <input
                      type="text"
                      inputMode="url"
                      placeholder="https://www.linkedin.com/company/yourpage"
                      value={socialForm.linkedin}
                      onChange={(e) => setSocialForm({ ...socialForm, linkedin: e.target.value })}
                    />
                    <button type="submit" className="btn btn-primary">Save social links</button>
                  </form>
                </section>

                <section className="admin-card">
                  <div className="admin-card-head"><h2>Security</h2></div>
                  <form className="admin-form" onSubmit={changePassword}>
                    <input type="password" placeholder="Current password" value={passwords.currentPassword} onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })} required />
                    <input type="password" placeholder="New password" value={passwords.newPassword} onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })} required />
                    <button type="submit" className="btn btn-primary">Update password</button>
                  </form>
                </section>
              </div>
            </div>
          )}
        </div>
      </div>

      {drawer && (
        <div className="admin-drawer-backdrop" onClick={closeDrawer}>
          <div className="admin-drawer" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <h2>{drawerTitle[drawer]}</h2>
              <button type="button" className="admin-icon-btn" onClick={closeDrawer} aria-label="Close"><X size={16} /></button>
            </div>
            <p>{editingId ? 'Update the details and save changes.' : 'Fill the details and save. Changes appear on the public site after refresh.'}</p>

            {drawer === 'course' && (
              <form className="admin-form" onSubmit={saveCourse}>
                <input placeholder="Title" value={courseForm.title} onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })} required />
                <select value={courseForm.category} onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value })}>
                  {COURSE_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
                <textarea placeholder="Description" value={courseForm.description} onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })} required />
                <input type="number" placeholder="Price" value={courseForm.price} onChange={(e) => setCourseForm({ ...courseForm, price: e.target.value })} />
                <input placeholder="Duration" value={courseForm.duration} onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })} required />
                <input placeholder="Image URL" value={courseForm.imageUrl} onChange={(e) => setCourseForm({ ...courseForm, imageUrl: e.target.value })} />
                <input placeholder="Avg salary label" value={courseForm.avgSalary} onChange={(e) => setCourseForm({ ...courseForm, avgSalary: e.target.value })} />
                <input placeholder="Highlights (comma separated)" value={courseForm.highlights} onChange={(e) => setCourseForm({ ...courseForm, highlights: e.target.value })} />
                <select value={courseForm.mode} onChange={(e) => setCourseForm({ ...courseForm, mode: e.target.value })}>
                  <option value="online">Online</option>
                  <option value="campus">Campus</option>
                  <option value="both">Both</option>
                </select>
                <label><input type="checkbox" checked={courseForm.featured} onChange={(e) => setCourseForm({ ...courseForm, featured: e.target.checked })} /> Featured</label>
                <label><input type="checkbox" checked={courseForm.isFree} onChange={(e) => setCourseForm({ ...courseForm, isFree: e.target.checked })} /> Free course</label>
                <div className="admin-form-actions">
                  <button type="submit" className="btn btn-primary">{editingId ? 'Update course' : 'Save course'}</button>
                  <button type="button" className="btn btn-secondary" onClick={closeDrawer}>Cancel</button>
                </div>
              </form>
            )}

            {drawer === 'enroll' && (
              <form className="admin-form" onSubmit={saveEnrollment}>
                <select value={enrollForm.studentId} onChange={(e) => setEnrollForm({ ...enrollForm, studentId: e.target.value })} required>
                  <option value="">Select student</option>
                  {students.map((s) => <option key={s._id} value={s._id}>{s.name} ({s.email})</option>)}
                </select>
                <select value={enrollForm.courseId} onChange={(e) => setEnrollForm({ ...enrollForm, courseId: e.target.value })} required>
                  <option value="">Select course</option>
                  {courses.map((c) => <option key={c._id} value={c._id}>{c.title}</option>)}
                </select>
                {editingId && (
                  <select value={enrollForm.status} onChange={(e) => setEnrollForm({ ...enrollForm, status: e.target.value })}>
                    {ENROLL_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                )}
                <div className="admin-form-actions">
                  <button type="submit" className="btn btn-primary">
                    {editingId ? 'Update enrollment' : <><UserPlus size={16} /> Assign</>}
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={closeDrawer}>Cancel</button>
                </div>
              </form>
            )}

            {drawer === 'workshop' && (
              <form className="admin-form" onSubmit={(e) => {
                e.preventDefault();
                saveSimple('/api/masterclasses', mcForm, () => setMcForm(emptyMc));
              }}>
                <input placeholder="Title" value={mcForm.title} onChange={(e) => setMcForm({ ...mcForm, title: e.target.value })} required />
                <input placeholder="Domain" value={mcForm.domain} onChange={(e) => setMcForm({ ...mcForm, domain: e.target.value })} required />
                <input type="datetime-local" value={mcForm.date} onChange={(e) => setMcForm({ ...mcForm, date: e.target.value })} required />
                <input placeholder="Mentor" value={mcForm.mentor} onChange={(e) => setMcForm({ ...mcForm, mentor: e.target.value })} required />
                <input type="number" placeholder="Seats" value={mcForm.seats} onChange={(e) => setMcForm({ ...mcForm, seats: Number(e.target.value) })} />
                <textarea placeholder="Description" value={mcForm.description} onChange={(e) => setMcForm({ ...mcForm, description: e.target.value })} />
                <input placeholder="Image URL" value={mcForm.imageUrl} onChange={(e) => setMcForm({ ...mcForm, imageUrl: e.target.value })} />
                <div className="admin-form-actions">
                  <button type="submit" className="btn btn-primary">{editingId ? 'Update workshop' : 'Save workshop'}</button>
                  <button type="button" className="btn btn-secondary" onClick={closeDrawer}>Cancel</button>
                </div>
              </form>
            )}

            {drawer === 'mentor' && (
              <form className="admin-form" onSubmit={(e) => {
                e.preventDefault();
                saveSimple('/api/mentors', {
                  ...mentorForm,
                  domains: mentorForm.domains.split(',').map((x) => x.trim()).filter(Boolean)
                }, () => setMentorForm(emptyMentor));
              }}>
                <input placeholder="Name" value={mentorForm.name} onChange={(e) => setMentorForm({ ...mentorForm, name: e.target.value })} required />
                <input placeholder="Title" value={mentorForm.title} onChange={(e) => setMentorForm({ ...mentorForm, title: e.target.value })} required />
                <textarea placeholder="Bio" value={mentorForm.bio} onChange={(e) => setMentorForm({ ...mentorForm, bio: e.target.value })} />
                <input placeholder="Image URL" value={mentorForm.imageUrl} onChange={(e) => setMentorForm({ ...mentorForm, imageUrl: e.target.value })} />
                <input placeholder="Domains (comma separated)" value={mentorForm.domains} onChange={(e) => setMentorForm({ ...mentorForm, domains: e.target.value })} />
                <div className="admin-form-actions">
                  <button type="submit" className="btn btn-primary">{editingId ? 'Update mentor' : 'Save mentor'}</button>
                  <button type="button" className="btn btn-secondary" onClick={closeDrawer}>Cancel</button>
                </div>
              </form>
            )}

            {drawer === 'alumni' && (
              <form className="admin-form" onSubmit={(e) => {
                e.preventDefault();
                saveSimple('/api/alumni', alumniForm, () => setAlumniForm(emptyAlumni));
              }}>
                <input placeholder="Name" value={alumniForm.name} onChange={(e) => setAlumniForm({ ...alumniForm, name: e.target.value })} required />
                <input placeholder="Role" value={alumniForm.role} onChange={(e) => setAlumniForm({ ...alumniForm, role: e.target.value })} required />
                <input placeholder="Company" value={alumniForm.company} onChange={(e) => setAlumniForm({ ...alumniForm, company: e.target.value })} required />
                <textarea placeholder="Story" value={alumniForm.story} onChange={(e) => setAlumniForm({ ...alumniForm, story: e.target.value })} />
                <input placeholder="Image URL" value={alumniForm.imageUrl} onChange={(e) => setAlumniForm({ ...alumniForm, imageUrl: e.target.value })} />
                <label><input type="checkbox" checked={alumniForm.featured} onChange={(e) => setAlumniForm({ ...alumniForm, featured: e.target.checked })} /> Featured</label>
                <div className="admin-form-actions">
                  <button type="submit" className="btn btn-primary">{editingId ? 'Update alumni' : 'Save alumni'}</button>
                  <button type="button" className="btn btn-secondary" onClick={closeDrawer}>Cancel</button>
                </div>
              </form>
            )}

            {drawer === 'resource' && (
              <form className="admin-form" onSubmit={(e) => {
                e.preventDefault();
                saveSimple('/api/resources', resourceForm, () => setResourceForm(emptyResource));
              }}>
                <select value={resourceForm.type} onChange={(e) => setResourceForm({ ...resourceForm, type: e.target.value })}>
                  <option value="tutorial">Tutorial</option>
                  <option value="quiz">Quiz</option>
                  <option value="compiler">Compiler</option>
                  <option value="free-course">Free Course</option>
                </select>
                <input placeholder="Title" value={resourceForm.title} onChange={(e) => setResourceForm({ ...resourceForm, title: e.target.value })} required />
                <textarea placeholder="Description" value={resourceForm.description} onChange={(e) => setResourceForm({ ...resourceForm, description: e.target.value })} />
                <input placeholder="Meta" value={resourceForm.meta} onChange={(e) => setResourceForm({ ...resourceForm, meta: e.target.value })} />
                <input placeholder="Link" value={resourceForm.link} onChange={(e) => setResourceForm({ ...resourceForm, link: e.target.value })} />
                <div className="admin-form-actions">
                  <button type="submit" className="btn btn-primary">{editingId ? 'Update resource' : 'Save resource'}</button>
                  <button type="button" className="btn btn-secondary" onClick={closeDrawer}>Cancel</button>
                </div>
              </form>
            )}

            {drawer === 'testimonial' && (
              <form className="admin-form" onSubmit={(e) => {
                e.preventDefault();
                saveSimple('/api/testimonials', testimonialForm, () => setTestimonialForm(emptyTestimonial));
              }}>
                <input placeholder="Name" value={testimonialForm.name} onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })} required />
                <input placeholder="Course name" value={testimonialForm.courseName} onChange={(e) => setTestimonialForm({ ...testimonialForm, courseName: e.target.value })} required />
                <textarea placeholder="Review" value={testimonialForm.review} onChange={(e) => setTestimonialForm({ ...testimonialForm, review: e.target.value })} required />
                <input type="number" min={1} max={5} value={testimonialForm.rating} onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: Number(e.target.value) })} />
                <input placeholder="Image URL" value={testimonialForm.imageUrl} onChange={(e) => setTestimonialForm({ ...testimonialForm, imageUrl: e.target.value })} />
                <div className="admin-form-actions">
                  <button type="submit" className="btn btn-primary">{editingId ? 'Update testimonial' : 'Save testimonial'}</button>
                  <button type="button" className="btn btn-secondary" onClick={closeDrawer}>Cancel</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {toast && <div className={`admin-toast ${toast.err ? 'err' : 'ok'}`}>{toast.text}</div>}
    </div>
  );
}
