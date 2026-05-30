import React, { useState, useEffect, useRef } from 'react';
import { 
  HashRouter as Router, 
  Routes, 
  Route, 
  Link, 
  useLocation, 
  useNavigate 
} from 'react-router-dom';
import { 
  Briefcase, 
  BookOpen, 
  Database, 
  Phone, 
  MessageSquare, 
  Send, 
  X, 
  Upload, 
  CheckCircle, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Award, 
  Lock, 
  Menu, 
  ChevronRight, 
  Search, 
  Filter, 
  BarChart2, 
  ArrowUpRight, 
  Settings, 
  FileText, 
  Activity, 
  Check, 
  MapPin, 
  Mail, 
  Grid,
  LogOut,
  UserCircle,
  Rocket,
  Target,
  Clock,
  Star,
  Tag
} from 'lucide-react';

// Assets
import logoImg from './assets/logo.png';

// Auth helpers
import AuthPage, { getAuthUser, clearAuthUser } from './pages/Auth.jsx';

// Import Modular Stylesheets
import './components/NavBar.css';
import './components/Footer.css';
import './components/ChatWidget.css';
import './components/Modal.css';
import './pages/Home.css';
import './pages/AboutUs.css';
import './pages/Services.css';
import './pages/Careers.css';
import './pages/Training.css';
import './pages/AdminPanel.css';
import './pages/Auth.css';


// --- MOCK INITIAL DATA ---
const INITIAL_JOBS = [
  { id: 'job-1', title: 'Senior React Developer', department: 'Engineering', location: 'Hyderabad (Hybrid)', type: 'Full-time', salary: '₹12L - ₹18L', description: 'We are looking for a Senior React Developer who has experience in building premium UI dashboards and working with REST APIs. You will lead the frontend implementation of our cloud systems.', requirements: ['3+ years React experience', 'CSS/HTML expert', 'Experience with state management (Redux/Zustand)', 'Familiarity with Vite/Webpack'] },
  { id: 'job-2', title: 'Data Scientist & BI Analyst', department: 'Analytics', location: 'Gachibowli, Hyderabad', type: 'Full-time', salary: '₹10L - ₹15L', description: 'Join our business intelligence unit. You will design, build, and deploy PowerBI and Custom SVG charts dashboard interfaces for corporate clients.', requirements: ['SQL Mastery', 'PowerBI / Tableau experience', 'Python (Pandas, Numpy)', 'Experience with client facing reporting'] },
  { id: 'job-3', title: 'ERP Solutions Consultant', department: 'Consulting', location: 'Remote', type: 'Contract', salary: '₹8L - ₹12L', description: 'Help implement and configure ERP software solutions for retail and manufacturing business partners. Coordinate with backend teams to integrate core databases.', requirements: ['ERP systems experience', 'Enterprise databases knowledge', 'Strong client communication skills'] },
  { id: 'job-4', title: 'HR Talent Acquisition Specialist', department: 'HR & Staffing', location: 'Gachibowli, Hyderabad', type: 'Full-time', salary: '₹6L - ₹9L', description: 'Build and cultivate our pipeline of talent. You will scan resumes, schedule candidate assessments, and manage training onboarding.', requirements: ['2+ years IT recruitment experience', 'Outstanding communication skills', 'ATS systems management'] }
];

const INITIAL_COURSES = [
  { id: 'course-1', title: 'Excel (Basic & Advanced)', category: 'Productivity', hours: 20, duration: '3 Weeks', price: 4999, description: 'Master Excel from basics to advanced — formulas, pivot tables, conditional formatting, charts, and data validation for real-world business use.', rating: '4.8/5 (320+ students)', icon: '📊' },
  { id: 'course-2', title: 'Power Query', category: 'Data Analytics', hours: 30, duration: '4-5 Weeks', price: 5999, description: 'Learn to import, transform, and automate data workflows using Power Query in Excel and Power BI. Industry-standard ETL skill.', rating: '4.9/5 (210+ students)', icon: '🔄' },
  { id: 'course-3', title: 'VBA (Excel Automation)', category: 'Automation', hours: 30, duration: '4-5 Weeks', price: 5999, description: 'Write macros and VBA scripts to automate repetitive Excel tasks, build custom functions, and create interactive dashboards.', rating: '4.7/5 (180+ students)', icon: '⚡' },
  { id: 'course-4', title: 'Python for Data Analytics', category: 'Data Science', hours: 15, duration: '2-3 Weeks', price: 6999, description: 'Hands-on Python training covering Pandas, NumPy, Matplotlib, and real data analysis projects for business decision-making.', rating: '5.0/5 (290+ students)', icon: '🐍' },
  { id: 'course-5', title: 'Power BI', category: 'BI Analytics', hours: 30, duration: '4-5 Weeks', price: 9999, description: 'Build stunning interactive dashboards in Power BI. Data modeling, DAX, report publishing, and corporate storytelling with data.', rating: '4.9/5 (380+ students)', icon: '📈' }
];

const COMBO_PACKAGES = [
  {
    id: 'combo-1',
    name: 'Data Analyst Starter Pack',
    courses: ['Excel (Basic & Advanced)', 'Power Query', 'Power BI'],
    originalPrice: 18997,
    discountedPrice: 12999,
    badge: '32% OFF',
    highlight: false,
    color: 'var(--color-corporate-blue)'
  },
  {
    id: 'combo-2',
    name: 'Automation Specialist Pack',
    courses: ['Excel (Basic & Advanced)', 'VBA (Excel Automation)', 'Python for Data Analytics'],
    originalPrice: 23997,
    discountedPrice: 15999,
    badge: '33% OFF',
    highlight: false,
    color: 'var(--color-evergreen-glow)'
  },
  {
    id: 'combo-3',
    name: 'Business Intelligence Professional Pack',
    courses: ['Power Query', 'Python for Data Analytics', 'Power BI'],
    originalPrice: 23997,
    discountedPrice: 16999,
    badge: '29% OFF',
    highlight: false,
    color: 'var(--color-gold)'
  },
  {
    id: 'combo-4',
    name: 'Complete Data Analytics Master Program',
    courses: ['All 6 Courses Included'],
    originalPrice: 49999,
    discountedPrice: 34999,
    badge: '🏆 BEST VALUE',
    highlight: true,
    color: 'var(--color-ai-lime)'
  }
];

const INITIAL_APPLICATIONS = [
  { id: 'app-1', jobTitle: 'Senior React Developer', name: 'Rohan Sharma', email: 'rohan.s@gmail.com', phone: '9876543210', status: 'shortlisted', date: '2026-05-28' },
  { id: 'app-2', jobTitle: 'Data Scientist & BI Analyst', name: 'Pooja Reddy', email: 'pooja.r@yahoo.com', phone: '8765432109', status: 'pending', date: '2026-05-29' }
];

const INITIAL_ENROLLMENTS = [
  { id: 'enr-1', courseTitle: 'Business Intelligence with PowerBI', studentName: 'Anil Kumar', date: '2026-05-25', status: 'approved', progress: 80 },
  { id: 'enr-2', courseTitle: 'Advanced React & Cloud Integration', studentName: 'Sneha Patel', date: '2026-05-28', status: 'pending', progress: 0 }
];

const INITIAL_INQUIRIES = [
  { id: 'inq-1', name: 'Vikram Seth', email: 'vikram@nexatech.com', company: 'NexaTech Solutions', message: 'We are looking to migrate our legacy database to cloud architecture. Can we get an ERP consulting session?', status: 'pending', date: '2026-05-29' },
  { id: 'inq-2', name: 'Karthik Rao', email: 'karthik@itcareer.in', company: 'IT Career Academy', message: 'Interested in bulk corporate training packages for 30 junior developers on React and Cloud BI.', status: 'contacted', date: '2026-05-27' }
];

const INITIAL_PAYMENTS = [
  { id: 'pay-1', description: 'BI PowerBI Enrollment - Anil Kumar', amount: '₹9,999', method: 'UPI (Razorpay)', status: 'Success', date: '2026-05-25', invoiceId: 'INV-2026-001' },
  { id: 'pay-2', description: 'Consulting Retainer - NexaTech', amount: '₹75,000', method: 'Bank Transfer', status: 'Success', date: '2026-05-28', invoiceId: 'INV-2026-002' }
];

// --- APP LAYOUT COMPONENT ---
export default function App() {
  // Auth state
  const [authUser, setAuthUser] = useState(getAuthUser);

  // App-wide state simulating database
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [applications, setApplications] = useState(INITIAL_APPLICATIONS);
  const [enrollments, setEnrollments] = useState(INITIAL_ENROLLMENTS);
  const [inquiries, setInquiries] = useState(INITIAL_INQUIRIES);
  const [payments, setPayments] = useState(INITIAL_PAYMENTS);
  
  // Automation / Settings state
  const [webhooks, setWebhooks] = useState([
    { id: 'wh-1', name: 'Zapier Lead Forwarder', url: 'https://hooks.zapier.com/hooks/catch/12345/abcde', active: true },
    { id: 'wh-2', name: 'Slack Application Notifier', url: 'https://hooks.slack.com/services/T00/B00/X00', active: false }
  ]);

  // Logs state representing background logs
  const [logs, setLogs] = useState([
    { id: 1, time: '14:30:12', type: 'system', message: 'System running on cloud portal, connected to DB.' },
    { id: 2, time: '14:31:05', type: 'webhook', message: 'Webhook sent to Zapier Lead Forwarder successfully.' }
  ]);

  // Toast message notification
  const [toast, setToast] = useState(null);

  const handleLogout = () => {
    clearAuthUser();
    setAuthUser(null);
  };

  const triggerToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 4000);
  };

  // Add system logs helper
  const addLog = (type, message) => {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    setLogs(prev => [{ id: Date.now(), time: timeStr, type, message }, ...prev]);
  };

  return (
    <Router>
      <div className="app-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        
        {/* Navigation Bar */}
        <NavBar />

        {/* Main Routing Container */}
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home jobs={jobs} courses={courses} setInquiries={setInquiries} triggerToast={triggerToast} addLog={addLog} />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/services" element={<Services />} />
            <Route path="/careers" element={<Careers jobs={jobs} applications={applications} setApplications={setApplications} triggerToast={triggerToast} addLog={addLog} />} />
            <Route path="/training" element={<Training courses={courses} enrollments={enrollments} setEnrollments={setEnrollments} payments={payments} setPayments={setPayments} triggerToast={triggerToast} addLog={addLog} />} />
            <Route path="/contact" element={<ContactUs setInquiries={setInquiries} triggerToast={triggerToast} addLog={addLog} />} />

            {/* Auth Routes */}
            <Route path="/login" element={<AuthPage role="user" />} />
            <Route path="/admin/login" element={<AuthPage role="admin" />} />
            
            {/* Admin Panel Layout */}
            <Route path="/admin/*" element={
              <AdminPanel 
                jobs={jobs} setJobs={setJobs}
                courses={courses} setCourses={setCourses}
                applications={applications} setApplications={setApplications}
                enrollments={enrollments} setEnrollments={setEnrollments}
                inquiries={inquiries} setInquiries={setInquiries}
                payments={payments} setPayments={setPayments}
                webhooks={webhooks} setWebhooks={setWebhooks}
                logs={logs} addLog={addLog}
                triggerToast={triggerToast}
                authUser={authUser}
                onLogout={handleLogout}
              />
            } />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />

        {/* Global Floating AI Chatbot & Call CTA */}
        <ChatWidget triggerToast={triggerToast} />

        {/* Toast Notification Banner */}
        {toast && (
          <div style={{
            position: 'fixed',
            bottom: '30px',
            left: '30px',
            backgroundColor: 'var(--color-navy-dark)',
            borderLeft: '4px solid var(--color-ai-lime)',
            color: 'var(--color-white)',
            padding: '16px 24px',
            borderRadius: '4px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontFamily: 'var(--font-aeonik)'
          }}>
            <CheckCircle size={18} color="var(--color-ai-lime)" />
            <span>{toast}</span>
          </div>
        )}

      </div>
    </Router>
  );
}

// --- SUB-COMPONENTS & PAGES ---

// 1. Navigation Bar
function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const authUser = getAuthUser();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const handleLogoutNav = () => {
    clearAuthUser();
    navigate('/', { replace: true });
    window.location.reload();
  };

  return (
    <nav className="header-nav">
      <div className="container header-container">
        {/* Logo Image */}
        <Link to="/" className="logo" onClick={() => setMobileMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: 0 }}>
          <img
            src={logoImg}
            alt="ITBEES Global"
            style={{ height: '44px', width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
          />
        </Link>

        {/* Desktop Links */}
        <ul className="nav-links" style={{ display: 'flex' }}>
          <li><Link to="/" className={`nav-link ${isActive('/')}`}>Home</Link></li>
          <li><Link to="/about" className={`nav-link ${isActive('/about')}`}>About Us</Link></li>
          <li><Link to="/services" className={`nav-link ${isActive('/services')}`}>Services</Link></li>
          <li><Link to="/careers" className={`nav-link ${isActive('/careers')}`}>Careers</Link></li>
          <li><Link to="/training" className={`nav-link ${isActive('/training')}`}>Training</Link></li>
          <li><Link to="/contact" className={`nav-link ${isActive('/contact')}`}>Contact Us</Link></li>
        </ul>

        <div className="nav-actions">
          {authUser ? (
            <>
              <span style={{ fontSize: '13px', color: 'var(--color-sky-blue)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <UserCircle size={15} />{authUser.name}
              </span>
              {authUser.role === 'admin' && (
                <Link to="/admin" className="btn-mini" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--color-sky-blue)' }}>
                  <Lock size={14} /> Console
                </Link>
              )}
              <button
                className="btn-mini"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.5)' }}
                onClick={handleLogoutNav}
              >
                <LogOut size={14} /> Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-mini" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--color-sky-blue)' }}>
                <UserCircle size={14} /> Sign In
              </Link>
              <Link to="/admin/login" className="btn-mini" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.45)' }}>
                <Lock size={13} /> Admin
              </Link>
            </>
          )}
          <Link to="/contact" className="btn-primary" style={{ padding: '8px 16px', fontSize: '13px' }}>
            Schedule Demo
          </Link>
        </div>
      </div>
    </nav>
  );
}

// 2. Footer
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            {/* Footer Logo */}
            <img
              src={logoImg}
              alt="ITBEES Global Pvt. Ltd."
              style={{ height: '56px', width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)', marginBottom: '16px', display: 'block' }}
            />
            <p className="footer-brand-desc">
              Empowering professionals &amp; enterprises with Smart Cloud, BI Analytics, ERP Solutions, and industry-oriented training programs.
            </p>
            <p style={{ fontSize: '12px', color: 'var(--color-dark-olive)', marginTop: '12px' }}>
              Smart Cloud | BI Analytics | ERP Solutions
            </p>
          </div>
          <div>
            <h5 className="footer-title">Courses</h5>
            <ul className="footer-links">
              <li className="footer-link-item"><Link to="/training" className="footer-link">Excel Basic &amp; Advanced</Link></li>
              <li className="footer-link-item"><Link to="/training" className="footer-link">Power Query</Link></li>
              <li className="footer-link-item"><Link to="/training" className="footer-link">VBA Automation</Link></li>
              <li className="footer-link-item"><Link to="/training" className="footer-link">Python for Analytics</Link></li>
              <li className="footer-link-item"><Link to="/training" className="footer-link">Power BI</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="footer-title">Company</h5>
            <ul className="footer-links">
              <li className="footer-link-item"><Link to="/about" className="footer-link">About Us</Link></li>
              <li className="footer-link-item"><Link to="/services" className="footer-link">Services</Link></li>
              <li className="footer-link-item"><Link to="/careers" className="footer-link">Talent Acquisition</Link></li>
              <li className="footer-link-item"><Link to="/contact" className="footer-link">Contact Us</Link></li>
              <li className="footer-link-item"><Link to="/admin/login" className="footer-link">Admin Portal</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="footer-title">Contact Us</h5>
            <p className="footer-contact" style={{ marginBottom: '12px' }}>
              <strong>📞 Call / WhatsApp:</strong><br />+91 96181 83234<br />+91 9963186067
            </p>
            <p className="footer-contact" style={{ marginBottom: '12px' }}>
              <strong>📧 Email:</strong><br />rama.maruvada@itbeesglobal.com<br />support@itbeesglobal.com
            </p>
            <p className="footer-contact" style={{ fontSize: '12px' }}>
              Door No.1-60/8/A&amp;B, 3rd Floor, KNR Square,<br />Opp. The Platina, Gachibowli,<br />Hyderabad - 500032
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} ITBEES Global Pvt. Ltd. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '24px' }}>
            <span style={{ color: 'var(--color-dark-olive)' }}>ISO 27001 Certified</span>
            <span style={{ color: 'var(--color-dark-olive)' }}>Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// 3. Home Page Component
function Home({ jobs, courses, setInquiries, triggerToast, addLog }) {
  const navigate = useNavigate();
  const [inqName, setInqName] = useState('');
  const [inqEmail, setInqEmail] = useState('');
  const [inqMessage, setInqMessage] = useState('');

  const handleQuickInquiry = (e) => {
    e.preventDefault();
    if (!inqName || !inqEmail || !inqMessage) {
      alert('Please fill out all fields.');
      return;
    }
    const newInquiry = {
      id: `inq-${Date.now()}`,
      name: inqName,
      email: inqEmail,
      company: 'Website Visitor',
      message: inqMessage,
      status: 'pending',
      date: new Date().toISOString().split('T')[0]
    };
    setInquiries(prev => [newInquiry, ...prev]);
    triggerToast('Thank you! Inquiry submitted successfully.');
    addLog('system', `New business inquiry received from ${inqName}.`);
    
    // Clear fields
    setInqName('');
    setInqEmail('');
    setInqMessage('');
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-glow"></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            MANAGING SYSTEMS IN THE AGE OF AI
          </div>
          <h1 className="display-lg hero-title" style={{ color: 'var(--color-white)' }}>
            ACCELERATE BUSINESS WITH SMART CLOUD &amp; DATA ANALYTICS
          </h1>
          <p className="hero-subtitle">
            Integrate next-gen ERP Solutions, automate critical pipelines, and build visual dashboards with ITBEES Global's smart infrastructure.
          </p>
          <div className="hero-btns">
            <Link to="/contact" className="btn-primary">
              Schedule a Free Demo
            </Link>
            <Link to="/services" className="btn-ghost-dark">
              Explore Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* Services Showcase Cards */}
      <section className="section-gap" style={{ backgroundColor: 'var(--color-white)' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="display-md">OUR CORE MODULES</h2>
            <p className="section-subtitle">We deliver premium architecture for your digital transformation goals.</p>
          </div>
          
          <div className="grid-3">
            {/* Service Card 1 */}
            <div className="card-neutral">
              <div style={{ color: 'var(--color-corporate-blue)', marginBottom: '16px' }}>
                <Database size={40} />
              </div>
              <h3 className="heading-lg" style={{ marginBottom: '12px' }}>Smart Cloud &amp; ERP</h3>
              <p style={{ color: 'var(--color-ink)', flex: 1 }}>
                Integrate unified databases, configure global API systems, and automate standard workflows across operations, finance, and support.
              </p>
              <Link to="/services" className="btn-mini" style={{ color: 'var(--color-corporate-blue)', alignSelf: 'flex-start', paddingLeft: 0, marginTop: '16px', fontWeight: 'bold' }}>
                Learn More <ChevronRight size={16} style={{ display: 'inline', verticalAlign: 'middle' }} />
              </Link>
            </div>

            {/* Service Card 2 */}
            <div className="card-neutral">
              <div style={{ color: 'var(--color-evergreen-glow)', marginBottom: '16px' }}>
                <BarChart2 size={40} />
              </div>
              <h3 className="heading-lg" style={{ marginBottom: '12px' }}>BI Analytics &amp; Reports</h3>
              <p style={{ color: 'var(--color-ink)', flex: 1 }}>
                Synthesize massive volumes of transactional data. View progress, track metrics, and generate instant dashboards.
              </p>
              <Link to="/services" className="btn-mini" style={{ color: 'var(--color-corporate-blue)', alignSelf: 'flex-start', paddingLeft: 0, marginTop: '16px', fontWeight: 'bold' }}>
                Learn More <ChevronRight size={16} style={{ display: 'inline', verticalAlign: 'middle' }} />
              </Link>
            </div>

            {/* Service Card 3 */}
            <div className="card-neutral">
              <div style={{ color: 'var(--color-gold)', marginBottom: '16px' }}>
                <BookOpen size={40} />
              </div>
              <h3 className="heading-lg" style={{ marginBottom: '12px' }}>Corporate Training</h3>
              <p style={{ color: 'var(--color-ink)', flex: 1 }}>
                Skill up your developers, database administrators, and managers with tailored courses on Cloud infrastructure, React dashboards, and BI metrics.
              </p>
              <Link to="/training" className="btn-mini" style={{ color: 'var(--color-corporate-blue)', alignSelf: 'flex-start', paddingLeft: 0, marginTop: '16px', fontWeight: 'bold' }}>
                Explore Courses <ChevronRight size={16} style={{ display: 'inline', verticalAlign: 'middle' }} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Statistics (BI Demo Teaser) */}
      <section className="section-gap" style={{ backgroundColor: 'var(--color-light-canvas)', borderTop: '1px solid var(--color-soft-gray)', borderBottom: '1px solid var(--color-soft-gray)' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div>
              <div className="badge-mint" style={{ marginBottom: '16px' }}>REAL-TIME ANALYTICS DEMONSTRATION</div>
              <h2 className="display-md" style={{ marginBottom: '24px', textAlign: 'left' }}>LIVE INSIGHTS WITH INTERACTIVE GRAPHS</h2>
              <p style={{ color: 'var(--color-ink)', marginBottom: '24px', fontSize: '15px', lineHeight: '1.7' }}>
                Our modern business intelligence tools represent complex server operations in absolute clean visuals. Observe database sync speeds, payment processing volumes, and cloud instance statuses instantly.
              </p>
              <div style={{ display: 'flex', gap: '24px' }}>
                <div>
                  <h4 style={{ fontSize: '32px', fontFamily: 'var(--font-ozik)', color: 'var(--color-corporate-blue)' }}>99.98%</h4>
                  <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-muted-text)' }}>Cloud Uptime</p>
                </div>
                <div>
                  <h4 style={{ fontSize: '32px', fontFamily: 'var(--font-ozik)', color: 'var(--color-evergreen-glow)' }}>3.4M+</h4>
                  <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-muted-text)' }}>Daily Operations</p>
                </div>
                <div>
                  <h4 style={{ fontSize: '32px', fontFamily: 'var(--font-ozik)', color: 'var(--color-gold)' }}>150+</h4>
                  <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-muted-text)' }}>Enterprise Clients</p>
                </div>
              </div>
            </div>

            {/* Micro Dashboard Preview */}
            <div className="card-blue-premium">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h4 style={{ fontFamily: 'var(--font-aeonik)', fontWeight: '600' }}>Cloud System Monitors</h4>
                <span className="badge-dark-accent">LIVE REFRESH</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                    <span>CPU LOAD</span>
                    <span style={{ color: 'var(--color-ai-lime)' }}>48% (Optimal)</span>
                  </div>
                  <div style={{ height: '6px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: '48%', height: '100%', backgroundColor: 'var(--color-ai-lime)' }}></div>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                    <span>DATABASE SYNC LATENCY</span>
                    <span style={{ color: 'var(--color-sky-blue)' }}>12ms</span>
                  </div>
                  <div style={{ height: '6px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: '20%', height: '100%', backgroundColor: 'var(--color-sky-blue)' }}></div>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                    <span>API ROUTING LOADS</span>
                    <span style={{ color: 'var(--color-gold)' }}>82% Capacity</span>
                  </div>
                  <div style={{ height: '6px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: '82%', height: '100%', backgroundColor: 'var(--color-gold)' }}></div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '24px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--color-light-text)' }}>
                <span>DB Status: Connected</span>
                <span>Active Transactions: 812/sec</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-gap" style={{ backgroundColor: 'var(--color-white)' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="display-md">TRUSTED BY INDUSTRY LEADERS</h2>
            <p className="section-subtitle">Read how our modules have empowered engineering and management operations.</p>
          </div>

          <div className="grid-2">
            <div className="card-neutral" style={{ padding: '32px' }}>
              <p className="font-instrument" style={{ fontSize: '18px', color: 'var(--color-dark-olive)', fontStyle: 'italic', marginBottom: '24px', lineHeight: '1.6' }}>
                "ITBEES Global transformed our entire client database sync workflow. The new ERP integration resolved legacy latency errors, reducing our client support inquiries by nearly 40%."
              </p>
              <div style={{ borderTop: '1px solid var(--color-soft-gray)', paddingTop: '16px' }}>
                <h5 style={{ fontFamily: 'var(--font-aeonik)', fontWeight: '600' }}>Rajesh Varma</h5>
                <p style={{ fontSize: '12px', color: 'var(--color-muted-text)' }}>CTO, Deccan Logistics Ltd.</p>
              </div>
            </div>

            <div className="card-neutral" style={{ padding: '32px' }}>
              <p className="font-instrument" style={{ fontSize: '18px', color: 'var(--color-dark-olive)', fontStyle: 'italic', marginBottom: '24px', lineHeight: '1.6' }}>
                "The corporate training module on cloud architecture and PowerBI was spectacular. Our team scaled up rapidly, and we generated live analytics dashboards for our management within just a few weeks."
              </p>
              <div style={{ borderTop: '1px solid var(--color-soft-gray)', paddingTop: '16px' }}>
                <h5 style={{ fontFamily: 'var(--font-aeonik)', fontWeight: '600' }}>Malini Sen</h5>
                <p style={{ fontSize: '12px', color: 'var(--color-muted-text)' }}>Director of HR, FinScale Systems</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Form CTA */}
      <section className="section-gap" style={{ backgroundColor: 'var(--color-light-canvas)', borderTop: '1px solid var(--color-soft-gray)' }}>
        <div className="container">
          <div className="card-floating" style={{ backgroundColor: 'var(--color-white)' }}>
            <h2 className="display-md" style={{ marginBottom: '16px', textAlign: 'center' }}>REQUEST A TAILORED PROPOSAL</h2>
            <p style={{ color: 'var(--color-muted-text)', textAlign: 'center', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px auto' }}>
              Share your business needs, and our lead consultants will analyze your system constraints and reply within one business day.
            </p>
            <form onSubmit={handleQuickInquiry} style={{ maxWidth: '600px', margin: '0 auto' }}>
              <div className="form-group">
                <label className="form-label">Your Name</label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="e.g. Vikram Seth"
                  value={inqName}
                  onChange={(e) => setInqName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Business Email</label>
                <input 
                  type="email" 
                  className="input-field" 
                  placeholder="e.g. name@company.com"
                  value={inqEmail}
                  onChange={(e) => setInqEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Message / Requirements</label>
                <textarea 
                  className="input-field" 
                  rows="4" 
                  style={{ borderRadius: '16px', resize: 'vertical' }}
                  placeholder="Tell us about your ERP, Cloud, BI, or Corporate training requirements..."
                  value={inqMessage}
                  onChange={(e) => setInqMessage(e.target.value)}
                ></textarea>
              </div>
              <button type="submit" className="btn-primary" style={{ width: '100%', padding: '14px' }}>
                Submit Consultation Request
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Direct CTAs */}
      <div className="container">
        <div className="cta-banner">
          <div>
            <h3 className="heading-lg" style={{ color: 'var(--color-white)' }}>HAVE URGENT BUSINESS CONSULTATIONS?</h3>
            <p style={{ color: 'var(--color-light-text)', fontSize: '14px', marginTop: '6px' }}>Click to call our Gachibowli office directly or reach out on WhatsApp.</p>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="tel:9963186067" className="btn-ghost-dark">
              <Phone size={16} /> Call Now
            </a>
            <a href="https://wa.me/9963186067" className="btn-primary">
              <MessageSquare size={16} /> WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// 4. About Us Page Component
function AboutUs() {
  return (
    <div className="container section-gap">
      <div className="section-header">
        <div className="badge-mint" style={{ marginBottom: '16px' }}>WHO WE ARE</div>
        <h1 className="display-lg">ITBEES GLOBAL PVT. LTD.</h1>
        <p className="section-subtitle">Delivering robust ERP solutions, customized business intelligence tools, and training pipelines.</p>
      </div>

      <div className="card-floating" style={{ marginBottom: '64px' }}>
        <h2 className="display-md" style={{ marginBottom: '16px', textAlign: 'left' }}>COMPANY OVERVIEW</h2>
        <p style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--color-ink)', marginBottom: '24px' }}>
          Established in Hyderabad's premier IT hub Gachibowli, ITBEES GLOBAL PVT. LTD. is an enterprise solutions partner designed to solve technical complexity. We specialize in configuring unified databases, deploying scalable smart cloud architectures, and preparing data automation workflows that drive corporate performance.
        </p>
        <p style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--color-ink)' }}>
          Whether it is staffing specialized frontend engineering teams, deploying analytics modules, or upgrading student knowledge through corporate training catalogs, ITBEES Global focuses on providing clear results and absolute data security.
        </p>
      </div>

      <div className="grid-3" style={{ marginBottom: '64px' }}>
        <div className="card-neutral">
          <h3 className="heading-lg" style={{ color: 'var(--color-corporate-blue)', marginBottom: '16px' }}>OUR VISION</h3>
          <p style={{ fontSize: '14px', lineHeight: '1.6' }}>
            To become the leading global architecture and data systems provider, delivering reliable analytics and ERP tools that help businesses and learners scale effortlessly.
          </p>
        </div>

        <div className="card-neutral">
          <h3 className="heading-lg" style={{ color: 'var(--color-evergreen-glow)', marginBottom: '16px' }}>OUR MISSION</h3>
          <p style={{ fontSize: '14px', lineHeight: '1.6' }}>
            To simplify database migration, deliver precise BI visualizations, and establish structured training platforms that cultivate modern coding standards and security habits.
          </p>
        </div>

        <div className="card-neutral">
          <h3 className="heading-lg" style={{ color: 'var(--color-gold)', marginBottom: '16px' }}>CORE VALUES</h3>
          <p style={{ fontSize: '14px', lineHeight: '1.6' }}>
            Integrity, technical expertise, visual clarity in reports, automated efficiency, and a commitment to helping our engineering talent excel globally.
          </p>
        </div>
      </div>
    </div>
  );
}

// 5. Services Page Component
function Services() {
  const [activeSubTab, setActiveSubTab] = useState('data');

  // Simple Data Automation Simulator State
  const [rawData, setRawData] = useState('{"client": "Acme Corp", "orders": 12, "revenue": "14250.50", "status": "active"}\n{"client": "Beta Co", "orders": 8, "revenue": "8900.00", "status": "pending"}\n{"client": "Delta Inc", "orders": 15, "revenue": "21000.75", "status": "active"}');
  const [formattedData, setFormattedData] = useState(null);
  const [automationLog, setAutomationLog] = useState([]);

  const runDataAutomationSimulation = () => {
    try {
      const lines = rawData.trim().split('\n');
      const parsed = lines.map((l, i) => {
        const item = JSON.parse(l);
        return {
          id: `row-${i+1}`,
          client: item.client.toUpperCase(),
          totalValue: parseFloat(item.revenue).toLocaleString('en-IN', { style: 'currency', currency: 'INR' }),
          efficiencyScore: ((item.orders * 1500) / parseFloat(item.revenue) * 100).toFixed(1) + '%',
          status: item.status
        };
      });
      setFormattedData(parsed);
      setAutomationLog(prev => [
        `[${new Date().toLocaleTimeString()}] Data parsed & validated successfully. Transformed JSON payload into secure table layout.`,
        ...prev
      ]);
    } catch(err) {
      alert('Invalid JSON Lines format. Please ensure each line is a valid JSON object.');
      setAutomationLog(prev => [`[${new Date().toLocaleTimeString()}] Latency Error: Failed to parse raw string. Stack: ${err.message}`, ...prev]);
    }
  };

  return (
    <div className="container section-gap">
      <div className="section-header">
        <div className="badge-blue" style={{ marginBottom: '16px' }}>OUR SERVICES</div>
        <h1 className="display-lg">ENTERPRISE SOLUTIONS</h1>
        <p className="section-subtitle">Review our specializations in database automation, corporate training, and staffing.</p>
      </div>

      {/* Services Switcher */}
      <div className="module-nav">
        <button 
          className={`module-tab-btn ${activeSubTab === 'data' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('data')}
        >
          1. Data Automation &amp; BI
        </button>
        <button 
          className={`module-tab-btn ${activeSubTab === 'training' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('training')}
        >
          2. Corporate Training
        </button>
        <button 
          className={`module-tab-btn ${activeSubTab === 'recruitment' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('recruitment')}
        >
          3. HR Staffing &amp; Recruitment
        </button>
      </div>

      {/* Content for Data Automation */}
      {activeSubTab === 'data' && (
        <div className="grid-2" style={{ alignItems: 'flex-start', marginTop: '32px' }}>
          <div>
            <h2 className="display-md" style={{ marginBottom: '16px', textAlign: 'left' }}>DATA AUTOMATION &amp; BI</h2>
            <p style={{ color: 'var(--color-ink)', marginBottom: '24px', lineHeight: '1.7' }}>
              We design custom visual dashboard pipelines for your executive metrics. From database synchronization to SVG analytics maps, our solutions ensure your data flows smoothly and reports instantly.
            </p>
            <h4 className="heading-sm" style={{ marginBottom: '12px' }}>Key Specialities:</h4>
            <ul style={{ listStyle: 'none', marginBottom: '24px' }}>
              <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Check size={16} color="var(--color-evergreen-glow)" /> PowerBI Dashboard configurations
              </li>
              <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Check size={16} color="var(--color-evergreen-glow)" /> Real-time server metric pipelines
              </li>
              <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Check size={16} color="var(--color-evergreen-glow)" /> Custom database schema migrations (SQL/PostgreSQL)
              </li>
            </ul>

            {/* Live Interactive Data Tool */}
            <div className="card-neutral" style={{ padding: '24px' }}>
              <h4 className="heading-md" style={{ marginBottom: '12px', color: 'var(--color-corporate-blue)' }}>Demo Tool: Client JSON Transformer</h4>
              <p style={{ fontSize: '13px', color: 'var(--color-muted-text)', marginBottom: '12px' }}>
                Simulate how our middleware formats transaction data, parses text structures, and updates stats.
              </p>
              <textarea 
                className="input-field" 
                rows="4" 
                style={{ fontFamily: 'monospace', fontSize: '12px', borderRadius: '8px', marginBottom: '12px' }}
                value={rawData}
                onChange={(e) => setRawData(e.target.value)}
              ></textarea>
              <button className="btn-secondary" style={{ width: '100%' }} onClick={runDataAutomationSimulation}>
                Transform and Sync Data
              </button>
            </div>
          </div>

          <div>
            {/* Simulation Output Card */}
            <div className="card-blue-premium" style={{ marginBottom: '24px', minHeight: '220px' }}>
              <h4 style={{ fontFamily: 'var(--font-aeonik)', marginBottom: '16px' }}>Data Automation Pipeline Output</h4>
              {formattedData ? (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', fontSize: '12px', borderCollapse: 'collapse', color: 'var(--color-white)' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
                        <th style={{ textAlign: 'left', paddingBottom: '8px' }}>Client</th>
                        <th style={{ textAlign: 'right', paddingBottom: '8px' }}>Revenue</th>
                        <th style={{ textAlign: 'right', paddingBottom: '8px' }}>Score</th>
                        <th style={{ textAlign: 'center', paddingBottom: '8px' }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formattedData.map(row => (
                        <tr key={row.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                          <td style={{ padding: '8px 0', textAlign: 'left' }}>{row.client}</td>
                          <td style={{ padding: '8px 0', textAlign: 'right' }}>{row.totalValue}</td>
                          <td style={{ padding: '8px 0', textAlign: 'right' }}>{row.efficiencyScore}</td>
                          <td style={{ padding: '8px 0', textAlign: 'center' }}>
                            <span style={{ 
                              padding: '2px 6px', 
                              backgroundColor: row.status === 'active' ? 'var(--color-ai-lime)' : 'var(--color-gold)', 
                              color: 'var(--color-deep-moss)',
                              borderRadius: '4px',
                              fontSize: '10px',
                              fontWeight: '600'
                            }}>
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p style={{ color: 'var(--color-light-text)', fontSize: '13px', fontStyle: 'italic', textAlign: 'center', marginTop: '40px' }}>
                  No active formatted data. Press "Transform and Sync Data" to run the transformer.
                </p>
              )}
            </div>

            {/* Automation Logs */}
            <div className="card-neutral" style={{ padding: '20px', backgroundColor: '#1e241f', border: '1px solid #273f2b' }}>
              <h5 style={{ color: 'var(--color-ai-lime)', fontSize: '13px', textTransform: 'uppercase', marginBottom: '8px' }}>Middleware Activity Console</h5>
              <div style={{ maxHeight: '150px', overflowY: 'auto', textAlign: 'left', fontFamily: 'monospace', fontSize: '11px', color: '#a3be8c', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {automationLog.length > 0 ? (
                  automationLog.map((log, i) => <div key={i}>{log}</div>)
                ) : (
                  <div style={{ color: '#7e8371' }}>[System idle] Awaiting trigger signal...</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content for Corporate Training */}
      {activeSubTab === 'training' && (
        <div style={{ marginTop: '32px' }}>
          <div className="grid-2" style={{ alignItems: 'center', marginBottom: '40px' }}>
            <div>
              <h2 className="display-md" style={{ marginBottom: '16px', textAlign: 'left' }}>CORPORATE TRAINING PROGRAMS</h2>
              <p style={{ color: 'var(--color-ink)', lineHeight: '1.7', marginBottom: '24px' }}>
                We structure extensive learning modules for IT departments. We deliver practical training labs, evaluate progress through automated quiz questions, and award digital certifications.
              </p>
              <Link to="/training" className="btn-primary">
                View Corporate Catalog
              </Link>
            </div>
            <div className="card-dark-accent">
              <Award size={32} color="var(--color-ai-lime)" style={{ marginBottom: '12px' }} />
              <h4 className="heading-lg" style={{ marginBottom: '8px' }}>Certification Workflow</h4>
              <p style={{ fontSize: '14px', color: 'var(--color-light-text)' }}>
                Our system generates authenticated training certificates once team members clear our validation criteria and quizzes.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Content for HR Recruitment */}
      {activeSubTab === 'recruitment' && (
        <div style={{ marginTop: '32px' }}>
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div>
              <h2 className="display-md" style={{ marginBottom: '16px', textAlign: 'left' }}>HR STAFFING &amp; RECRUITMENT</h2>
              <p style={{ color: 'var(--color-ink)', lineHeight: '1.7', marginBottom: '24px' }}>
                ITBEES Global links elite engineering resources, React builders, and system architects to your specific operations. Our HR database features tested CVs, allowing quick placement.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Users size={18} color="var(--color-corporate-blue)" />
                  <span>Permanent placement or developer lease contracts</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Briefcase size={18} color="var(--color-corporate-blue)" />
                  <span>Screening and skills assessment modules built by our consultants</span>
                </div>
              </div>
            </div>
            <div className="card-neutral" style={{ padding: '40px', borderLeft: '4px solid var(--color-gold)' }}>
              <h4 className="heading-md" style={{ marginBottom: '8px' }}>Partner with ITBEES Global</h4>
              <p style={{ fontSize: '14px', color: 'var(--color-muted-text)', marginBottom: '24px' }}>
                Looking to source dedicated developers for your project workspace? Share details and review candidate CVs.
              </p>
              <Link to="/careers" className="btn-secondary" style={{ width: '100%' }}>
                Browse Open Roles
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 6. Careers / Talent Acquisition Page Component
function Careers({ jobs, applications, setApplications, triggerToast, addLog }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedJob, setSelectedJob] = useState(null);
  
  // Application Form state
  const [candName, setCandName] = useState('');
  const [candEmail, setCandEmail] = useState('');
  const [candPhone, setCandPhone] = useState('');
  const [resumeName, setResumeName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'All' || job.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  const handleResumeSimulate = () => {
    setIsUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setResumeName('parsed_resume_cv.pdf');
          setIsUploading(false);
          return 100;
        }
        return prev + 25;
      });
    }, 300);
  };

  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (!candName || !candEmail || !candPhone || !resumeName) {
      alert('Please complete all candidate fields and upload your resume.');
      return;
    }
    const newApp = {
      id: `app-${Date.now()}`,
      jobTitle: selectedJob.title,
      name: candName,
      email: candEmail,
      phone: candPhone,
      status: 'pending',
      date: new Date().toISOString().split('T')[0]
    };
    setApplications(prev => [newApp, ...prev]);
    triggerToast(`Application submitted successfully for ${selectedJob.title}!`);
    addLog('system', `Candidate ${candName} applied for the ${selectedJob.title} role.`);

    // Clear form & close details
    setCandName('');
    setCandEmail('');
    setCandPhone('');
    setResumeName('');
    setSelectedJob(null);
  };

  return (
    <div className="container section-gap">
      <div className="section-header">
        <div className="badge-mint" style={{ marginBottom: '16px' }}>JOIN OUR TEAM</div>
        <h1 className="display-lg">CAREERS &amp; OPPORTUNITIES</h1>
        <p className="section-subtitle">Accelerate your technical career. Apply to our Gachibowli engineering teams.</p>
      </div>

      {/* Search & Filters */}
      <div className="card-white" style={{ padding: '24px', marginBottom: '32px' }}>
        <div className="job-search-bar">
          <div style={{ flex: 1, position: 'relative' }}>
            <input 
              type="text" 
              className="input-field" 
              placeholder="Search jobs by title or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '44px' }}
            />
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '16px', color: 'var(--color-muted-text)' }} />
          </div>
          <div>
            <select 
              className="input-field"
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              style={{ minWidth: '180px' }}
            >
              <option value="All">All Departments</option>
              <option value="Engineering">Engineering</option>
              <option value="Analytics">Analytics</option>
              <option value="Consulting">Consulting</option>
              <option value="HR &amp; Staffing">HR &amp; Staffing</option>
            </select>
          </div>
        </div>
      </div>

      {/* Job Grid list */}
      <div className="grid-2">
        {filteredJobs.map(job => (
          <div key={job.id} className="card-white job-card" style={{ padding: '32px', textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div>
                <h3 className="heading-lg" style={{ color: 'var(--color-ink)', marginBottom: '4px' }}>{job.title}</h3>
                <span className="badge-blue">{job.department}</span>
              </div>
              <span className="badge-mint">{job.type}</span>
            </div>
            <p style={{ color: 'var(--color-ink)', fontSize: '13px', margin: '12px 0 20px 0', flex: 1 }}>
              {job.description.substring(0, 120)}...
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-soft-gray)', paddingTop: '16px' }}>
              <span style={{ fontSize: '13px', fontWeight: '600' }}>{job.salary}</span>
              <button className="btn-secondary" style={{ padding: '8px 16px', fontSize: '13px' }} onClick={() => setSelectedJob(job)}>
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div style={{ padding: '64px', textAlign: 'center', color: 'var(--color-muted-text)' }}>
          <p>No jobs found matching your criteria. Check back later!</p>
        </div>
      )}

      {/* Job Details & Apply Modal */}
      {selectedJob && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ width: '600px' }}>
            <div className="modal-header">
              <div>
                <h3 className="heading-lg">{selectedJob.title}</h3>
                <span className="badge-blue" style={{ marginTop: '4px' }}>{selectedJob.department} &bull; {selectedJob.location}</span>
              </div>
              <button className="modal-close" onClick={() => setSelectedJob(null)}><X size={20} /></button>
            </div>

            <div className="modal-body">
              <h4 className="heading-sm" style={{ marginBottom: '8px' }}>Job Description</h4>
              <p style={{ fontSize: '14px', color: 'var(--color-ink)', marginBottom: '20px' }}>{selectedJob.description}</p>
              
              <h4 className="heading-sm" style={{ marginBottom: '8px' }}>Requirements</h4>
              <ul style={{ paddingLeft: '20px', marginBottom: '24px', fontSize: '14px' }}>
                {selectedJob.requirements.map((req, i) => (
                  <li key={i} style={{ marginBottom: '6px' }}>{req}</li>
                ))}
              </ul>

              {/* Simulated Form */}
              <div style={{ borderTop: '1px solid var(--color-soft-gray)', paddingTop: '20px' }}>
                <h4 className="heading-md" style={{ marginBottom: '16px' }}>Candidate Application</h4>
                <form onSubmit={handleApplySubmit}>
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input 
                      type="text" 
                      className="input-field" 
                      required 
                      value={candName} 
                      onChange={(e) => setCandName(e.target.value)} 
                    />
                  </div>
                  <div className="grid-2">
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input 
                        type="email" 
                        className="input-field" 
                        required 
                        value={candEmail} 
                        onChange={(e) => setCandEmail(e.target.value)} 
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone Number</label>
                      <input 
                        type="tel" 
                        className="input-field" 
                        required 
                        value={candPhone} 
                        onChange={(e) => setCandPhone(e.target.value)} 
                      />
                    </div>
                  </div>
                  
                  {/* CV Upload */}
                  <div className="form-group" style={{ backgroundColor: 'var(--color-light-canvas)', padding: '16px', borderRadius: '8px' }}>
                    <label className="form-label">Resume / CV Upload</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <button type="button" className="btn-secondary" style={{ padding: '8px 16px', fontSize: '12px' }} onClick={handleResumeSimulate}>
                        <Upload size={14} /> Upload Mock PDF
                      </button>
                      {isUploading && (
                        <div style={{ fontSize: '12px', color: 'var(--color-muted-text)' }}>
                          Uploading... {uploadProgress}%
                        </div>
                      )}
                      {resumeName && !isUploading && (
                        <div style={{ fontSize: '12px', color: 'var(--color-evergreen-glow)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Check size={14} /> {resumeName}
                        </div>
                      )}
                    </div>
                  </div>

                  <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '16px' }}>
                    Submit Candidate Details
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 7. Training / Course Enrollment & Quiz Module
function Training({ courses, enrollments, setEnrollments, payments, setPayments, triggerToast, addLog }) {
  const [selectedCourse, setSelectedCourse] = useState(null);
  
  // Checkout simulator state
  const [enrollName, setEnrollName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  
  // Quiz Module state
  const [quizCourse, setQuizCourse] = useState(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizScore, setQuizScore] = useState(null);
  const [showCertificate, setShowCertificate] = useState(false);

  const mockQuizData = {
    'course-1': [
      { q: 'What does DAX stand for in PowerBI?', options: ['Data Analysis Expressions', 'Dynamic Analytics Extension', 'Database Access XML', 'Digital Asset Exchange'], ans: 0 },
      { q: 'Which connection mode provides real-time access to database systems in PowerBI?', options: ['Import Mode', 'DirectQuery Mode', 'Dual Mode', 'Live Connection'], ans: 1 }
    ],
    'course-2': [
      { q: 'What is the primary role of a ledger in ERP?', options: ['Store developer logs', 'Maintain company financial books', 'Route APIs', 'Assess candidate status'], ans: 1 },
      { q: 'Which module manages client information and sales pipelines in ERP?', options: ['SCM', 'CRM', 'HRM', 'MRP'], ans: 1 }
    ],
    'course-3': [
      { q: 'What is the primary optimization benefit of React.memo?', options: ['Secures payments', 'Prevents unnecessary functional re-renders', 'Creates webhooks', 'Compiles SCSS into vanilla CSS'], ans: 1 },
      { q: 'Which hook is most appropriate to store a reference value that does not trigger re-render?', options: ['useState', 'useRef', 'useEffect', 'useMemo'], ans: 1 }
    ]
  };

  const handleEnrollSubmit = (e) => {
    e.preventDefault();
    if (!enrollName || !cardNumber || !cardExpiry || !cardCVV) {
      alert('Please fill out all billing credentials.');
      return;
    }

    // Add payment entry
    const newInvoice = `INV-${Date.now().toString().substring(7)}`;
    const newPayment = {
      id: `pay-${Date.now()}`,
      description: `Course Enrollment: ${selectedCourse.title} - ${enrollName}`,
      amount: `₹${selectedCourse.price.toLocaleString('en-IN')}`,
      method: 'Credit Card',
      status: 'Success',
      date: new Date().toISOString().split('T')[0],
      invoiceId: newInvoice
    };
    setPayments(prev => [newPayment, ...prev]);

    // Add enrollment entry
    const newEnroll = {
      id: `enr-${Date.now()}`,
      courseTitle: selectedCourse.title,
      studentName: enrollName,
      date: new Date().toISOString().split('T')[0],
      status: 'approved',
      progress: 0
    };
    setEnrollments(prev => [newEnroll, ...prev]);

    triggerToast(`Payment successful! You are now enrolled in ${selectedCourse.title}.`);
    addLog('payment', `Received payment ₹${selectedCourse.price} for course ${selectedCourse.title} from ${enrollName}.`);

    // Reset checkout form
    setEnrollName('');
    setCardNumber('');
    setCardExpiry('');
    setCardCVV('');
    setSelectedCourse(null);
  };

  const startQuiz = (course) => {
    setQuizCourse(course);
    setCurrentQuestionIdx(0);
    setSelectedAnswers({});
    setQuizScore(null);
    setShowCertificate(false);
  };

  const selectAnswer = (ansIdx) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIdx]: ansIdx
    }));
  };

  const nextQuestion = () => {
    if (currentQuestionIdx < mockQuizData[quizCourse.id].length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      // Calculate Score
      const questions = mockQuizData[quizCourse.id];
      let correct = 0;
      questions.forEach((q, idx) => {
        if (selectedAnswers[idx] === q.ans) correct++;
      });
      const percent = Math.round((correct / questions.length) * 100);
      setQuizScore(percent);
      if (percent >= 100) {
        addLog('system', `Student passed ${quizCourse.title} quiz assessment with score 100%.`);
      }
    }
  };

  return (
    <div className="container section-gap">
      <div className="section-header">
        <div className="badge-mint" style={{ marginBottom: '16px' }}>LEARN &amp; SCALE</div>
        <h1 className="display-lg">CORPORATE TRAINING PROGRAMS</h1>
        <p className="section-subtitle">Enroll teams in database automation, React frontend layouts, or cloud dashboards.</p>
      </div>

      {/* Course Catalog list */}
      <div className="grid-3" style={{ marginBottom: '64px' }}>
        {courses.map(course => (
          <div key={course.id} className="card-white" style={{ textAlign: 'left' }}>
            <div className="course-card-img-placeholder">
              <BookOpen size={36} />
            </div>
            <span className="badge-blue" style={{ marginBottom: '8px' }}>{course.category}</span>
            <h3 className="heading-lg" style={{ color: 'var(--color-ink)', marginBottom: '8px' }}>{course.title}</h3>
            <p style={{ fontSize: '13px', color: 'var(--color-muted-text)', marginBottom: '16px', flex: 1 }}>{course.description}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-soft-gray)', paddingTop: '16px' }}>
              <div>
                <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--color-ink)' }}>₹{course.price.toLocaleString('en-IN')}</div>
                <div style={{ fontSize: '11px', color: 'var(--color-muted-text)' }}>{course.duration} &bull; {course.modules} Modules</div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="btn-primary" style={{ padding: '8px 12px', fontSize: '12px' }} onClick={() => setSelectedCourse(course)}>
                  Enroll
                </button>
                <button className="btn-secondary" style={{ padding: '8px 12px', fontSize: '12px' }} onClick={() => startQuiz(course)}>
                  Test Skills
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Checkout Modal */}
      {selectedCourse && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ width: '460px' }}>
            <div className="modal-header">
              <h3 className="heading-lg">Course Checkout</h3>
              <button className="modal-close" onClick={() => setSelectedCourse(null)}><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div style={{ marginBottom: '20px', borderBottom: '1px solid var(--color-soft-gray)', paddingBottom: '16px' }}>
                <div style={{ fontSize: '12px', color: 'var(--color-muted-text)', textTransform: 'uppercase' }}>PRODUCT</div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--color-ink)', marginTop: '4px' }}>{selectedCourse.title}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontSize: '14px' }}>
                  <span>Price:</span>
                  <strong>₹{selectedCourse.price.toLocaleString('en-IN')}</strong>
                </div>
              </div>

              <form onSubmit={handleEnrollSubmit}>
                <div className="form-group">
                  <label className="form-label">Student Name</label>
                  <input 
                    type="text" 
                    className="input-field" 
                    required 
                    placeholder="Anil Kumar"
                    value={enrollName} 
                    onChange={(e) => setEnrollName(e.target.value)} 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Card Number</label>
                  <input 
                    type="text" 
                    className="input-field" 
                    required 
                    placeholder="4111 2222 3333 4444"
                    maxLength="19"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                </div>
                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Expiry Date</label>
                    <input 
                      type="text" 
                      className="input-field" 
                      required 
                      placeholder="MM/YY"
                      maxLength="5"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">CVV</label>
                    <input 
                      type="password" 
                      className="input-field" 
                      required 
                      placeholder="***"
                      maxLength="3"
                      value={cardCVV}
                      onChange={(e) => setCardCVV(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ fontSize: '11px', color: 'var(--color-muted-text)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '20px' }}>
                  <Lock size={12} /> SSL Secure Connection. 
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                  Pay &amp; Enroll Securely
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Quiz Modal */}
      {quizCourse && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ width: '560px' }}>
            <div className="modal-header">
              <h3 className="heading-lg">{quizCourse.title} - Skill Test</h3>
              <button className="modal-close" onClick={() => setQuizCourse(null)}><X size={20} /></button>
            </div>
            
            <div className="modal-body">
              {quizScore === null ? (
                <div>
                  <div style={{ fontSize: '13px', color: 'var(--color-muted-text)', marginBottom: '20px' }}>
                    Question {currentQuestionIdx + 1} of {mockQuizData[quizCourse.id].length}
                  </div>
                  <h4 className="heading-md" style={{ marginBottom: '20px', color: 'var(--color-ink)' }}>
                    {mockQuizData[quizCourse.id][currentQuestionIdx].q}
                  </h4>
                  
                  <div>
                    {mockQuizData[quizCourse.id][currentQuestionIdx].options.map((opt, i) => (
                      <button 
                        key={i} 
                        className={`quiz-option ${selectedAnswers[currentQuestionIdx] === i ? 'selected' : ''}`}
                        onClick={() => selectAnswer(i)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  <button 
                    className="btn-primary" 
                    style={{ width: '100%', marginTop: '20px' }}
                    disabled={selectedAnswers[currentQuestionIdx] === undefined}
                    onClick={nextQuestion}
                  >
                    {currentQuestionIdx < mockQuizData[quizCourse.id].length - 1 ? 'Next Question' : 'Submit Answers'}
                  </button>
                </div>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  {quizScore >= 100 ? (
                    <div>
                      <CheckCircle size={60} color="var(--color-evergreen-glow)" style={{ margin: '0 auto 16px auto' }} />
                      <h3 className="heading-lg" style={{ color: 'var(--color-evergreen-glow)', marginBottom: '8px' }}>Assessment Cleared!</h3>
                      <p style={{ fontSize: '14px', marginBottom: '24px' }}>You answered all questions correctly and unlocked your certification.</p>
                      
                      {/* Interactive Mock Certificate view toggle */}
                      {showCertificate ? (
                        <div className="certificate-container" style={{ margin: '20px 0' }}>
                          <h4 style={{ fontFamily: 'Georgia', fontSize: '14px', letterSpacing: '2px', color: 'var(--color-dark-olive)' }}>CERTIFICATE OF COMPLETION</h4>
                          <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--color-dark-olive)', margin: '12px auto' }}></div>
                          <p style={{ fontSize: '11px', fontStyle: 'italic', fontFamily: 'Georgia' }}>This is proudly presented to</p>
                          <h2 style={{ fontFamily: 'var(--font-aeonik)', fontWeight: '600', color: 'var(--color-ink)', margin: '12px 0' }}>VALUED SCHOLAR</h2>
                          <p style={{ fontSize: '11px', lineHeight: '1.5', fontFamily: 'Georgia', margin: '0 auto 20px auto', maxWidth: '340px' }}>
                            for successfully demonstrating technical proficiency in <strong>{quizCourse.title}</strong>, authenticated on {new Date().toISOString().split('T')[0]}.
                          </p>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontSize: '10px' }}>
                            <div style={{ textAlign: 'left' }}>
                              <div>ITBEES GLOBAL SERVICES</div>
                              <div style={{ color: 'var(--color-muted-text)' }}>Gachibowli, Hyderabad</div>
                            </div>
                            <div className="certificate-seal">SEAL</div>
                          </div>
                        </div>
                      ) : (
                        <button className="btn-secondary" style={{ marginBottom: '16px' }} onClick={() => setShowCertificate(true)}>
                          Generate Digital Certificate
                        </button>
                      )}
                    </div>
                  ) : (
                    <div>
                      <X size={60} color="#d93838" style={{ margin: '0 auto 16px auto' }} />
                      <h3 className="heading-lg" style={{ color: '#d93838', marginBottom: '8px' }}>Review Required</h3>
                      <p style={{ fontSize: '14px', marginBottom: '24px' }}>You scored {quizScore}%. A score of 100% is required to clear the skill certification.</p>
                      <button className="btn-secondary" onClick={() => startQuiz(quizCourse)}>
                        Try Again
                      </button>
                    </div>
                  )}
                  <button className="btn-mini" style={{ color: 'var(--color-muted-text)', marginTop: '16px' }} onClick={() => setQuizCourse(null)}>
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 8. Contact Us Page Component
function ContactUs({ setInquiries, triggerToast, addLog }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert('Please fill in Name, Email, and Message.');
      return;
    }
    const newInq = {
      id: `inq-${Date.now()}`,
      name,
      email,
      company: company || 'N/A',
      message,
      status: 'pending',
      date: new Date().toISOString().split('T')[0]
    };
    setInquiries(prev => [newInq, ...prev]);
    triggerToast('Contact request received. We will call you soon.');
    addLog('system', `Contact form submitted by ${name} (${company || 'Individual'}).`);

    setName('');
    setEmail('');
    setCompany('');
    setMessage('');
  };

  return (
    <div className="container section-gap">
      <div className="section-header">
        <div className="badge-mint" style={{ marginBottom: '16px' }}>GET IN TOUCH</div>
        <h1 className="display-lg">CONTACT US</h1>
        <p className="section-subtitle">Reach out for corporate partnerships, data queries, or job applications.</p>
      </div>

      <div className="grid-2">
        {/* Contact Form */}
        <div className="card-white" style={{ padding: '40px' }}>
          <h3 className="heading-lg" style={{ marginBottom: '24px', textAlign: 'left' }}>Send Us a Message</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input 
                type="text" 
                className="input-field" 
                required 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Business Email *</label>
              <input 
                type="email" 
                className="input-field" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Company Name</label>
              <input 
                type="text" 
                className="input-field" 
                value={company} 
                onChange={(e) => setCompany(e.target.value)} 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Requirements / Notes *</label>
              <textarea 
                className="input-field" 
                rows="4" 
                required 
                style={{ borderRadius: '16px', resize: 'vertical' }}
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
              ></textarea>
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%' }}>
              Submit Details
            </button>
          </form>
        </div>

        {/* Corporate Address & Detail Card */}
        <div className="card-dark-accent" style={{ padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 className="heading-lg" style={{ color: 'var(--color-white)', marginBottom: '24px' }}>Corporate Headquarters</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', color: 'var(--color-light-text)' }}>
              
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <MapPin size={24} style={{ color: 'var(--color-ai-lime)', flexShrink: 0 }} />
                <div>
                  <h5 style={{ color: 'var(--color-white)', fontWeight: '600' }}>Office Address</h5>
                  <p style={{ fontSize: '14px', marginTop: '4px', lineHeight: '1.5' }}>
                    Door No.1-60/8/A&amp;B, 3rd Floor, KNR Square,<br />
                    Opp. The Platina, Gachibowli, Kondapur,<br />
                    K.V.Rangareddy, Serilingampally,<br />
                    Telangana - 500032
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <Phone size={20} style={{ color: 'var(--color-ai-lime)' }} />
                <div>
                  <h5 style={{ color: 'var(--color-white)', fontWeight: '600' }}>Direct Call</h5>
                  <a href="tel:9963186067" style={{ color: 'var(--color-ai-lime)', textDecoration: 'none', fontSize: '14px' }}>+91 9963186067</a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <Mail size={20} style={{ color: 'var(--color-ai-lime)' }} />
                <div>
                  <h5 style={{ color: 'var(--color-white)', fontWeight: '600' }}>Email Inbox</h5>
                  <a href="mailto:support@itbeesglobal.com" style={{ color: 'var(--color-ai-lime)', textDecoration: 'none', fontSize: '14px' }}>support@itbeesglobal.com</a>
                </div>
              </div>

            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '24px', marginTop: '24px' }}>
            <h4 className="heading-sm" style={{ color: 'var(--color-white)', marginBottom: '8px' }}>Working Hours</h4>
            <p style={{ fontSize: '13px', color: 'var(--color-muted-text)' }}>Monday - Friday: 9:00 AM - 6:00 PM IST</p>
            <p style={{ fontSize: '13px', color: 'var(--color-muted-text)' }}>Saturday: 10:00 AM - 2:00 PM IST</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 9. Admin Dashboard Console Component
function AdminPanel({ 
  jobs, setJobs, 
  courses, setCourses, 
  applications, setApplications, 
  enrollments, setEnrollments, 
  inquiries, setInquiries, 
  payments, setPayments, 
  webhooks, setWebhooks, 
  logs, addLog,
  triggerToast 
}) {
  const [activeTab, setActiveTab] = useState('overview');

  // Job creator states
  const [newJobTitle, setNewJobTitle] = useState('');
  const [newJobDept, setNewJobDept] = useState('Engineering');
  const [newJobSalary, setNewJobSalary] = useState('');
  const [newJobDesc, setNewJobDesc] = useState('');

  // Course creator states
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCourseCat, setNewCourseCat] = useState('Analytics');
  const [newCoursePrice, setNewCoursePrice] = useState('');
  const [newCourseDesc, setNewCourseDesc] = useState('');

  const [activeInvoice, setActiveInvoice] = useState(null);

  const handleCreateJob = (e) => {
    e.preventDefault();
    if (!newJobTitle || !newJobSalary || !newJobDesc) {
      alert('Please fill out all job fields.');
      return;
    }
    const item = {
      id: `job-${Date.now()}`,
      title: newJobTitle,
      department: newJobDept,
      location: 'Hyderabad Office',
      type: 'Full-time',
      salary: newJobSalary,
      description: newJobDesc,
      requirements: ['Relevant engineering credentials', 'Good communication']
    };
    setJobs(prev => [...prev, item]);
    triggerToast('New career opening published.');
    addLog('system', `Published new career opening: ${newJobTitle}.`);

    setNewJobTitle('');
    setNewJobSalary('');
    setNewJobDesc('');
  };

  const handleCreateCourse = (e) => {
    e.preventDefault();
    if (!newCourseTitle || !newCoursePrice || !newCourseDesc) {
      alert('Please fill out all course fields.');
      return;
    }
    const item = {
      id: `course-${Date.now()}`,
      title: newCourseTitle,
      category: newCourseCat,
      modules: 5,
      duration: '6 weeks',
      price: parseInt(newCoursePrice),
      description: newCourseDesc,
      rating: 'New Course'
    };
    setCourses(prev => [...prev, item]);
    triggerToast('New training course published.');
    addLog('system', `Published training course: ${newCourseTitle}.`);

    setNewCourseTitle('');
    setNewCoursePrice('');
    setNewCourseDesc('');
  };

  const handleAppStatus = (appId, newStatus) => {
    setApplications(prev => prev.map(app => app.id === appId ? { ...app, status: newStatus } : app));
    triggerToast(`Application status updated to ${newStatus}`);
    addLog('system', `Updated application ${appId} status to ${newStatus}`);
  };

  const handleInqStatus = (inqId, newStatus) => {
    setInquiries(prev => prev.map(inq => inq.id === inqId ? { ...inq, status: newStatus } : inq));
    triggerToast(`Inquiry status updated to ${newStatus}`);
    addLog('system', `Updated inquiry ${inqId} status to ${newStatus}`);
  };

  const toggleWebhook = (whId) => {
    setWebhooks(prev => prev.map(wh => wh.id === whId ? { ...wh, active: !wh.active } : wh));
    const wh = webhooks.find(w => w.id === whId);
    triggerToast(`${wh.name} ${!wh.active ? 'Activated' : 'Deactivated'}`);
  };

  return (
    <div className="admin-layout">
      {/* Sidebar navigation */}
      <aside className="admin-sidebar">
        <div style={{ color: 'var(--color-white)', fontSize: '13px', fontWeight: 'bold', padding: '0 16px 16px 16px', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '16px' }}>
          ADMIN MENU
        </div>
        <button className={`admin-sidebar-btn ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
          <Grid size={16} /> Overview Stats
        </button>
        <button className={`admin-sidebar-btn ${activeTab === 'jobs' ? 'active' : ''}`} onClick={() => setActiveTab('jobs')}>
          <Briefcase size={16} /> Manage Jobs
        </button>
        <button className={`admin-sidebar-btn ${activeTab === 'courses' ? 'active' : ''}`} onClick={() => setActiveTab('courses')}>
          <BookOpen size={16} /> Manage Courses
        </button>
        <button className={`admin-sidebar-btn ${activeTab === 'inquiries' ? 'active' : ''}`} onClick={() => setActiveTab('inquiries')}>
          <Mail size={16} /> Client Inquiries
        </button>
        <button className={`admin-sidebar-btn ${activeTab === 'applications' ? 'active' : ''}`} onClick={() => setActiveTab('applications')}>
          <Users size={16} /> Job Applicants
        </button>
        <button className={`admin-sidebar-btn ${activeTab === 'payments' ? 'active' : ''}`} onClick={() => setActiveTab('payments')}>
          <DollarSign size={16} /> Transactions
        </button>
        <button className={`admin-sidebar-btn ${activeTab === 'automations' ? 'active' : ''}`} onClick={() => setActiveTab('automations')}>
          <Settings size={16} /> Webhooks &amp; API
        </button>
        <button className={`admin-sidebar-btn ${activeTab === 'logs' ? 'active' : ''}`} onClick={() => setActiveTab('logs')}>
          <Activity size={16} /> System Logs
        </button>
      </aside>

      {/* Main Admin Screen */}
      <section className="admin-content" style={{ textAlign: 'left' }}>
        
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            <h2 className="heading-lg" style={{ color: 'var(--color-navy-dark)', marginBottom: '24px' }}>ADMINISTRATIVE OVERVIEW</h2>
            
            {/* Stat Cards */}
            <div className="analytics-grid">
              <div className="stat-card">
                <div className="stat-label">Inquiries</div>
                <div className="stat-value">{inquiries.length}</div>
                <span className="stat-trend trend-up"><TrendingUp size={12} /> Realtime tracking</span>
              </div>
              <div className="stat-card">
                <div className="stat-label">Job Applications</div>
                <div className="stat-value">{applications.length}</div>
                <span className="stat-trend trend-up"><TrendingUp size={12} /> Resumes uploaded</span>
              </div>
              <div className="stat-card">
                <div className="stat-label">Total Enrollments</div>
                <div className="stat-value">{enrollments.length}</div>
                <span className="stat-trend trend-up"><TrendingUp size={12} /> Active Students</span>
              </div>
              <div className="stat-card">
                <div className="stat-label">Transactions</div>
                <div className="stat-value">{payments.length}</div>
                <span className="stat-trend trend-up"><TrendingUp size={12} /> UPI &amp; Cards</span>
              </div>
            </div>

            {/* Quick Insights charts */}
            <div className="grid-2">
              <div className="card-white" style={{ padding: '24px' }}>
                <h4 className="heading-md" style={{ marginBottom: '16px' }}>Monthly Transaction Activity</h4>
                <svg className="chart-svg">
                  {/* Axis lines */}
                  <line x1="40" y1="20" x2="40" y2="200" className="chart-axis" />
                  <line x1="40" y1="200" x2="340" y2="200" className="chart-axis" />
                  
                  {/* Grid Lines */}
                  <line x1="40" y1="80" x2="340" y2="80" stroke="rgba(255,255,255,0.05)" />
                  <line x1="40" y1="140" x2="340" y2="140" stroke="rgba(255,255,255,0.05)" />

                  {/* SVG Bar graphs */}
                  <rect x="60" y="120" width="30" height="80" className="chart-bar" />
                  <rect x="120" y="90" width="30" height="110" className="chart-bar" style={{ fill: 'var(--color-ai-lime)' }} />
                  <rect x="180" y="150" width="30" height="50" className="chart-bar" />
                  <rect x="240" y="60" width="30" height="140" className="chart-bar" style={{ fill: 'var(--color-ai-lime)' }} />
                  <rect x="300" y="100" width="30" height="100" className="chart-bar" />

                  {/* Chart labels */}
                  <text x="75" y="215" className="chart-text" textAnchor="middle">Jan</text>
                  <text x="135" y="215" className="chart-text" textAnchor="middle">Feb</text>
                  <text x="195" y="215" className="chart-text" textAnchor="middle">Mar</text>
                  <text x="255" y="215" className="chart-text" textAnchor="middle">Apr</text>
                  <text x="315" y="215" className="chart-text" textAnchor="middle">May</text>
                  
                  <text x="30" y="125" className="chart-text" textAnchor="end">₹10K</text>
                  <text x="30" y="65" className="chart-text" textAnchor="end">₹50K</text>
                </svg>
              </div>

              <div className="card-white" style={{ padding: '24px' }}>
                <h4 className="heading-md" style={{ marginBottom: '16px' }}>Database Sync Speeds</h4>
                <svg className="chart-svg">
                  <line x1="40" y1="20" x2="40" y2="200" className="chart-axis" />
                  <line x1="40" y1="200" x2="340" y2="200" className="chart-axis" />
                  
                  {/* Grid Lines */}
                  <line x1="40" y1="80" x2="340" y2="80" stroke="rgba(255,255,255,0.05)" />
                  <line x1="40" y1="140" x2="340" y2="140" stroke="rgba(255,255,255,0.05)" />

                  {/* Line Graph */}
                  <path d="M 40 180 L 100 130 L 160 160 L 220 80 L 280 110 L 340 50" className="chart-line" />
                  
                  <circle cx="100" cy="130" r="4" fill="var(--color-ai-lime)" />
                  <circle cx="220" cy="80" r="4" fill="var(--color-ai-lime)" />
                  <circle cx="340" cy="50" r="4" fill="var(--color-ai-lime)" />

                  <text x="100" y="215" className="chart-text" textAnchor="middle">10:00</text>
                  <text x="220" y="215" className="chart-text" textAnchor="middle">12:00</text>
                  <text x="340" y="215" className="chart-text" textAnchor="middle">14:00</text>

                  <text x="30" y="145" className="chart-text" textAnchor="end">15ms</text>
                  <text x="30" y="85" className="chart-text" textAnchor="end">5ms</text>
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* Manage Jobs Tab */}
        {activeTab === 'jobs' && (
          <div>
            <h2 className="heading-lg" style={{ color: 'var(--color-navy-dark)', marginBottom: '24px' }}>MANAGE JOB POSTINGS</h2>
            
            <div className="grid-2" style={{ alignItems: 'flex-start' }}>
              <div className="card-white" style={{ padding: '32px' }}>
                <h4 className="heading-md" style={{ marginBottom: '20px' }}>Create Career Posting</h4>
                <form onSubmit={handleCreateJob}>
                  <div className="form-group">
                    <label className="form-label">Job Title</label>
                    <input 
                      type="text" 
                      className="input-field" 
                      required 
                      placeholder="e.g. Cloud Engineer"
                      value={newJobTitle}
                      onChange={(e) => setNewJobTitle(e.target.value)}
                    />
                  </div>
                  <div className="grid-2">
                    <div className="form-group">
                      <label className="form-label">Department</label>
                      <select 
                        className="input-field"
                        value={newJobDept}
                        onChange={(e) => setNewJobDept(e.target.value)}
                      >
                        <option value="Engineering">Engineering</option>
                        <option value="Analytics">Analytics</option>
                        <option value="Consulting">Consulting</option>
                        <option value="HR &amp; Staffing">HR &amp; Staffing</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Salary Range</label>
                      <input 
                        type="text" 
                        className="input-field" 
                        required 
                        placeholder="₹8L - ₹12L"
                        value={newJobSalary}
                        onChange={(e) => setNewJobSalary(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Job Description Summary</label>
                    <textarea 
                      className="input-field" 
                      rows="4" 
                      required
                      placeholder="Enter description and details..."
                      style={{ borderRadius: '16px' }}
                      value={newJobDesc}
                      onChange={(e) => setNewJobDesc(e.target.value)}
                    ></textarea>
                  </div>
                  <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                    Publish to Career Page
                  </button>
                </form>
              </div>

              <div>
                <h4 className="heading-md" style={{ marginBottom: '16px' }}>Active Job Postings ({jobs.length})</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {jobs.map(job => (
                    <div key={job.id} className="card-white" style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <strong style={{ fontSize: '15px' }}>{job.title}</strong>
                          <div style={{ fontSize: '12px', color: 'var(--color-muted-text)' }}>{job.department} &bull; {job.salary}</div>
                        </div>
                        <button className="btn-mini" style={{ color: '#d93838' }} onClick={() => {
                          setJobs(prev => prev.filter(j => j.id !== job.id));
                          addLog('system', `Deleted career posting: ${job.title}`);
                        }}>
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Manage Courses Tab */}
        {activeTab === 'courses' && (
          <div>
            <h2 className="heading-lg" style={{ color: 'var(--color-navy-dark)', marginBottom: '24px' }}>MANAGE COURSES</h2>
            
            <div className="grid-2" style={{ alignItems: 'flex-start' }}>
              <div className="card-white" style={{ padding: '32px' }}>
                <h4 className="heading-md" style={{ marginBottom: '20px' }}>Add New Course</h4>
                <form onSubmit={handleCreateCourse}>
                  <div className="form-group">
                    <label className="form-label">Course Title</label>
                    <input 
                      type="text" 
                      className="input-field" 
                      required 
                      placeholder="e.g. SQL Database Optimization"
                      value={newCourseTitle}
                      onChange={(e) => setNewCourseTitle(e.target.value)}
                    />
                  </div>
                  <div className="grid-2">
                    <div className="form-group">
                      <label className="form-label">Category</label>
                      <select 
                        className="input-field"
                        value={newCourseCat}
                        onChange={(e) => setNewCourseCat(e.target.value)}
                      >
                        <option value="Analytics">Analytics</option>
                        <option value="ERP">ERP</option>
                        <option value="Development">Development</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Course Price (INR)</label>
                      <input 
                        type="number" 
                        className="input-field" 
                        required 
                        placeholder="7999"
                        value={newCoursePrice}
                        onChange={(e) => setNewCoursePrice(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Course Description</label>
                    <textarea 
                      className="input-field" 
                      rows="4" 
                      required
                      placeholder="Enter course description summary..."
                      style={{ borderRadius: '16px' }}
                      value={newCourseDesc}
                      onChange={(e) => setNewCourseDesc(e.target.value)}
                    ></textarea>
                  </div>
                  <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                    Publish to Catalog
                  </button>
                </form>
              </div>

              <div>
                <h4 className="heading-md" style={{ marginBottom: '16px' }}>Published Course Catalog ({courses.length})</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {courses.map(course => (
                    <div key={course.id} className="card-white" style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <strong style={{ fontSize: '15px' }}>{course.title}</strong>
                          <div style={{ fontSize: '12px', color: 'var(--color-muted-text)' }}>{course.category} &bull; ₹{course.price.toLocaleString('en-IN')}</div>
                        </div>
                        <button className="btn-mini" style={{ color: '#d93838' }} onClick={() => {
                          setCourses(prev => prev.filter(c => c.id !== course.id));
                          addLog('system', `Deleted training course: ${course.title}`);
                        }}>
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Client Inquiries Tab */}
        {activeTab === 'inquiries' && (
          <div>
            <h2 className="heading-lg" style={{ color: 'var(--color-navy-dark)', marginBottom: '24px' }}>CLIENT CONSULTATION INQUIRIES</h2>
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Client Name</th>
                    <th>Email</th>
                    <th>Company</th>
                    <th>Requirement Notes</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {inquiries.map(inq => (
                    <tr key={inq.id}>
                      <td style={{ whiteSpace: 'nowrap' }}>{inq.date}</td>
                      <td><strong>{inq.name}</strong></td>
                      <td>{inq.email}</td>
                      <td>{inq.company}</td>
                      <td style={{ fontSize: '13px', maxWidth: '300px' }}>{inq.message}</td>
                      <td>
                        <span className={`status-badge status-${inq.status}`}>{inq.status}</span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button className="btn-mini" style={{ color: 'var(--color-evergreen-glow)', padding: 0 }} onClick={() => handleInqStatus(inq.id, 'contacted')}>
                            Contacted
                          </button>
                          <button className="btn-mini" style={{ color: '#d93838', padding: 0 }} onClick={() => {
                            setInquiries(prev => prev.filter(i => i.id !== inq.id));
                            addLog('system', `Deleted client inquiry from ${inq.name}`);
                          }}>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Job Applicants Tab */}
        {activeTab === 'applications' && (
          <div>
            <h2 className="heading-lg" style={{ color: 'var(--color-navy-dark)', marginBottom: '24px' }}>CANDIDATE APPLICATIONS</h2>
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Job Title</th>
                    <th>Candidate</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Resume</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map(app => (
                    <tr key={app.id}>
                      <td>{app.date}</td>
                      <td><strong>{app.jobTitle}</strong></td>
                      <td>{app.name}</td>
                      <td>{app.email}</td>
                      <td>{app.phone}</td>
                      <td><span style={{ fontSize: '12px', color: 'var(--color-corporate-blue)', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => triggerToast('Opening resume_cv.pdf parser mockup.')}>resume.pdf</span></td>
                      <td>
                        <span className={`status-badge status-${app.status}`}>{app.status}</span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button className="btn-mini" style={{ color: 'var(--color-evergreen-glow)', padding: 0 }} onClick={() => handleAppStatus(app.id, 'shortlisted')}>
                            Shortlist
                          </button>
                          <button className="btn-mini" style={{ color: 'var(--color-sky-blue)', padding: 0 }} onClick={() => handleAppStatus(app.id, 'hired')}>
                            Hire
                          </button>
                          <button className="btn-mini" style={{ color: '#d93838', padding: 0 }} onClick={() => handleAppStatus(app.id, 'rejected')}>
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Transactions Tab */}
        {activeTab === 'payments' && (
          <div>
            <h2 className="heading-lg" style={{ color: 'var(--color-navy-dark)', marginBottom: '24px' }}>TRANSACTIONS &amp; INVOICING</h2>
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Invoice ID</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Method</th>
                    <th>Status</th>
                    <th>Invoicing</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map(pay => (
                    <tr key={pay.id}>
                      <td>{pay.date}</td>
                      <td><code>{pay.invoiceId}</code></td>
                      <td>{pay.description}</td>
                      <td><strong>{pay.amount}</strong></td>
                      <td>{pay.method}</td>
                      <td>
                        <span style={{ color: 'var(--color-evergreen-glow)', fontWeight: 'bold' }}>{pay.status}</span>
                      </td>
                      <td>
                        <button className="btn-mini" style={{ color: 'var(--color-corporate-blue)', textDecoration: 'underline' }} onClick={() => setActiveInvoice(pay)}>
                          View Invoice
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Modal Invoice details */}
            {activeInvoice && (
              <div className="modal-overlay">
                <div className="modal-content" style={{ width: '480px', padding: '32px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-soft-gray)', paddingBottom: '16px', marginBottom: '20px' }}>
                    <div>
                      <h4 className="logo" style={{ color: 'var(--color-navy-dark)' }}>ITBEES <span className="logo-accent">GLOBAL</span></h4>
                      <p style={{ fontSize: '11px', color: 'var(--color-muted-text)', marginTop: '4px' }}>Gachibowli, Hyderabad, TS</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>INVOICE</h3>
                      <code style={{ fontSize: '12px' }}>{activeInvoice.invoiceId}</code>
                    </div>
                  </div>

                  <div style={{ marginBottom: '20px', fontSize: '13px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span>Date:</span>
                      <span>{activeInvoice.date}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span>Payment Method:</span>
                      <span>{activeInvoice.method}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Transaction Status:</span>
                      <strong style={{ color: 'var(--color-evergreen-glow)' }}>{activeInvoice.status}</strong>
                    </div>
                  </div>

                  <div style={{ borderTop: '2px solid var(--color-ink)', borderBottom: '2px solid var(--color-ink)', padding: '12px 0', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '14px' }}>
                      <span>Item Details</span>
                      <span>Total</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginTop: '8px' }}>
                      <span style={{ maxWidth: '280px' }}>{activeInvoice.description}</span>
                      <span>{activeInvoice.amount}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                    <button className="btn-secondary" style={{ padding: '8px 16px', fontSize: '12px' }} onClick={() => triggerToast('Invoice print output simulation.')}>
                      Print PDF
                    </button>
                    <button className="btn-primary" style={{ padding: '8px 16px', fontSize: '12px' }} onClick={() => setActiveInvoice(null)}>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Webhooks & API Automation Tab */}
        {activeTab === 'automations' && (
          <div>
            <h2 className="heading-lg" style={{ color: 'var(--color-navy-dark)', marginBottom: '24px' }}>WEBHOOKS &amp; AUTOMATION</h2>
            <p style={{ color: 'var(--color-ink)', marginBottom: '24px', fontSize: '14px' }}>
              Connect inquiries and applications from the frontend to external services (like Zapier, Slack, or webhook handlers) automatically.
            </p>
            
            <div className="card-white" style={{ padding: '24px', marginBottom: '24px' }}>
              <h4 className="heading-md" style={{ marginBottom: '16px' }}>Configure Active Listeners</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {webhooks.map(wh => (
                  <div key={wh.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-soft-gray)', paddingBottom: '12px' }}>
                    <div>
                      <strong>{wh.name}</strong>
                      <div style={{ fontSize: '12px', color: 'var(--color-muted-text)', marginTop: '4px', fontFamily: 'monospace' }}>{wh.url}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '12px', color: wh.active ? 'var(--color-evergreen-glow)' : 'var(--color-muted-text)' }}>
                        {wh.active ? 'Active' : 'Disabled'}
                      </span>
                      <button 
                        className={`btn-secondary`} 
                        style={{ padding: '6px 12px', fontSize: '12px', backgroundColor: wh.active ? '#d93838' : 'var(--color-deep-navy)', borderColor: 'transparent' }}
                        onClick={() => toggleWebhook(wh.id)}
                      >
                        {wh.active ? 'Disable' : 'Enable'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* System Logs Tab */}
        {activeTab === 'logs' && (
          <div>
            <h2 className="heading-lg" style={{ color: 'var(--color-navy-dark)', marginBottom: '24px' }}>SYSTEM LOGS</h2>
            <div className="card-white" style={{ padding: '24px', backgroundColor: '#16171d', border: '1px solid var(--color-soft-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span style={{ color: 'var(--color-ai-lime)', fontWeight: 'bold', fontSize: '12px' }}>LIVE LOGGER ACTIVE</span>
                <button className="btn-mini" style={{ color: 'var(--color-sky-blue)' }} onClick={() => addLog('system', 'Manually cleared logs mockup.')}>Clear Console</button>
              </div>
              <div style={{ height: '300px', overflowY: 'auto', fontFamily: 'monospace', fontSize: '12px', color: '#a3be8c', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {logs.map(log => (
                  <div key={log.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '4px' }}>
                    <span style={{ color: '#88c0d0' }}>[{log.time}]</span>{' '}
                    <span style={{ 
                      padding: '2px 4px', 
                      borderRadius: '3px', 
                      fontSize: '10px', 
                      backgroundColor: log.type === 'payment' ? 'var(--color-gold)' : 'var(--color-glass-blue)', 
                      color: log.type === 'payment' ? 'var(--color-deep-moss)' : 'var(--color-sky-blue)',
                      fontWeight: 'bold',
                      marginRight: '8px'
                    }}>
                      {log.type.toUpperCase()}
                    </span>{' '}
                    {log.message}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </section>
    </div>
  );
}

// 10. Live Chatbot & Call Widget
function ChatWidget({ triggerToast }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! Welcome to ITBEES GLOBAL. I can guide you through our Smart Cloud, BI Analytics, or training modules. What can I help you with?', agent: true }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = { id: Date.now(), text: inputValue, agent: false };
    setMessages(prev => [...prev, userMsg]);
    const prompt = inputValue.toLowerCase();
    setInputValue('');

    // Predefined AI responses simulating AI Chatbot integration
    setTimeout(() => {
      let botResponse = "I'm sorry, I didn't quite get that. You can ask about our 'services', 'careers', 'training', or 'contact' details.";
      
      if (prompt.includes('service') || prompt.includes('cloud') || prompt.includes('erp') || prompt.includes('bi')) {
        botResponse = "ITBEES Global specializes in Data Automation, Smart Cloud setups, and custom ERP management dashboards. Check our 'Services' page to run data simulation tools.";
      } else if (prompt.includes('career') || prompt.includes('job') || prompt.includes('apply')) {
        botResponse = "We have open roles like Senior React Developer and Data Scientist in Gachibowli, Hyderabad! Navigate to our 'Careers' page to upload your resume.";
      } else if (prompt.includes('training') || prompt.includes('course') || prompt.includes('learn')) {
        botResponse = "We offer structured courses in PowerBI, ERP architecture, and React frameworks. Check our 'Training' catalog to test your skills and clear certifications.";
      } else if (prompt.includes('contact') || prompt.includes('phone') || prompt.includes('address') || prompt.includes('email')) {
        botResponse = "Call or WhatsApp us at +91 9963186067, or email support@itbeesglobal.com. Our office is on the 3rd Floor, KNR Square, Gachibowli, Hyderabad.";
      } else if (prompt.includes('hello') || prompt.includes('hi')) {
        botResponse = "Hello! Ask me about our courses, active career listings, or client inquiries.";
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, agent: true }]);
    }, 800);
  };

  return (
    <>
      {/* Floating Chat Trigger button */}
      <button className="chatbot-trigger" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Floating chat panel */}
      {isOpen && (
        <div className="chatbot-panel">
          <div className="chatbot-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-ai-lime)', boxShadow: '0 0 8px var(--color-ai-lime)' }}></div>
              <strong style={{ fontSize: '14px', fontFamily: 'var(--font-aeonik)' }}>ITBEES Support AI</strong>
            </div>
            <button style={{ background: 'transparent', border: 'none', color: 'var(--color-white)', cursor: 'pointer' }} onClick={() => setIsOpen(false)}>
              <X size={16} />
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map(msg => (
              <div key={msg.id} className={`chat-bubble ${msg.agent ? 'chat-bubble-agent' : 'chat-bubble-user'}`}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="chatbot-input-container">
            <input 
              type="text" 
              className="chatbot-input" 
              placeholder="Ask about jobs, courses, consulting..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit" className="chatbot-send-btn">
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
