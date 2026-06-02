import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useEffect } from 'react';

import AuthPage from './pages/Auth.jsx';
import { getAuthUser, clearAuthUser } from './utils/auth.js';

// Components
import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';
import ChatWidget from './components/ChatWidget.jsx';

function ScrollToTop() {
  const { pathname, search } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [pathname, search]);
  return null;
}

function PageWrapper({ children }) {
  const { pathname, search } = useLocation();
  // key forces full remount → triggers CSS animation fresh on every navigation
  return <div key={pathname + search} className="page-fade">{children}</div>;
}

// Pages
import Home from './pages/Home.jsx';
import AboutUs from './pages/AboutUs.jsx';
import Services from './pages/Services.jsx';
import Careers from './pages/Careers.jsx';
import Training from './pages/Training.jsx';
import ContactUs from './pages/ContactUs.jsx';
import AdminPanel from './pages/AdminPanel.jsx';


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


import { jobsApi, coursesApi, appsApi, inqsApi, logsApi } from './utils/api.js';

const VALID_PATHS = ['/', '/about', '/services', '/careers', '/training', '/contact', '/login'];

function Shell({ children, toast, courses, authUser, onLogout }) {
  const { pathname } = useLocation();
  const isValid = VALID_PATHS.includes(pathname) || pathname.startsWith('/admin');
  if (!isValid) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '48px 24px', backgroundColor: 'var(--color-navy-dark)' }}>
        <div style={{ fontSize: '120px', fontFamily: 'var(--font-ozik)', fontWeight: '700', color: 'var(--color-ai-lime)', lineHeight: 1 }}>404</div>
        <h2 style={{ fontFamily: 'var(--font-ozik)', fontSize: '28px', color: 'var(--color-white)', margin: '16px 0 8px' }}>PAGE NOT FOUND</h2>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', marginBottom: '32px', maxWidth: '400px' }}>The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <a href="/" style={{ backgroundColor: 'var(--color-ai-lime)', color: 'var(--color-deep-moss)', padding: '12px 28px', borderRadius: '28px', fontFamily: 'var(--font-aeonik)', fontWeight: '600', fontSize: '15px', textDecoration: 'none' }}>Back to Home</a>
      </div>
    );
  }
  const isAdmin = pathname.startsWith('/admin');
  return (
    <>
      {!isAdmin && <NavBar courses={courses} authUser={authUser} onLogout={onLogout} />}
      <main style={{ flex: 1 }}>{children}</main>
      {!isAdmin && <Footer />}
      {!isAdmin && <ChatWidget />}
      {toast && (
        <div style={{ position: 'fixed', bottom: '30px', left: '30px', backgroundColor: 'var(--color-navy-dark)', borderLeft: '4px solid var(--color-ai-lime)', color: 'var(--color-white)', padding: '16px 24px', borderRadius: '4px', boxShadow: '0 10px 25px rgba(0,0,0,0.3)', zIndex: 9999, display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'var(--font-aeonik)' }}>
          <CheckCircle size={18} color="var(--color-ai-lime)" />
          <span>{toast}</span>
        </div>
      )}
    </>
  );
}

// --- APP LAYOUT COMPONENT ---
export default function App() {
  // Auth state
  const [authUser, setAuthUser] = useState(getAuthUser());

  // App-wide state
  const [jobs, setJobs] = useState([]);
  const [courses, setCourses] = useState([]);
  const [applications, setApplications] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [payments, setPayments] = useState([]);

  // Automation / Settings state
  const [webhooks, setWebhooks] = useState([
    { id: 'wh-1', name: 'Zapier Lead Forwarder', url: 'https://hooks.zapier.com/hooks/catch/12345/abcde', active: true },
    { id: 'wh-2', name: 'Slack Application Notifier', url: 'https://hooks.slack.com/services/T00/B00/X00', active: false }
  ]);

  // Logs state
  const [logs, setLogs] = useState([]);

  // Toast message notification
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobsData, coursesData] = await Promise.all([
          jobsApi.getAll(),
          coursesApi.getAll()
        ]);
        setJobs(jobsData);
        setCourses(coursesData);

        if (authUser) {
          const [appsData, inqsData, logsData] = await Promise.all([
            appsApi.getAll(),
            inqsApi.getAll(),
            logsApi.getAll()
          ]);
          setApplications(appsData);
          setInquiries(inqsData);
          setLogs(logsData);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchData();
  }, [authUser]);

  const handleLogout = () => {
    clearAuthUser();
    setAuthUser(null);
  };

  const triggerToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 4000);
  };

  // Add system logs helper
  const addLog = async (type, message) => {
    try {
      const newLog = await logsApi.create({ type, message });
      setLogs(prev => [newLog, ...prev]);
    } catch (err) {
      console.error('Error adding log:', err);
      // Fallback to local state if backend fails
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
      setLogs(prev => [{ id: Date.now(), time: timeStr, type, message }, ...prev]);
    }
  };


  return (
    <Router>
      <div className="app-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <ScrollToTop />
        <Shell toast={toast} courses={courses} authUser={authUser} onLogout={handleLogout}>
          <PageWrapper>
            <Routes>
              <Route path="/" element={<Home setInquiries={setInquiries} triggerToast={triggerToast} addLog={addLog} />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/services" element={<Services />} />
              <Route path="/careers" element={<Careers jobs={jobs} setApplications={setApplications} triggerToast={triggerToast} addLog={addLog} />} />
              <Route path="/training" element={<Training courses={courses} setEnrollments={setEnrollments} setPayments={setPayments} triggerToast={triggerToast} addLog={addLog} />} />
              <Route path="/contact" element={<ContactUs setInquiries={setInquiries} triggerToast={triggerToast} addLog={addLog} />} />
              <Route path="/login" element={<AuthPage />} />
              <Route path="/admin/*" element={
                <AdminPanel
                  jobs={jobs} setJobs={setJobs}
                  courses={courses} setCourses={setCourses}
                  applications={applications} setApplications={setApplications}
                  enrollments={enrollments}
                  inquiries={inquiries} setInquiries={setInquiries}
                  payments={payments}
                  webhooks={webhooks} setWebhooks={setWebhooks}
                  logs={logs} addLog={addLog}
                  triggerToast={triggerToast}
                  authUser={authUser}
                  onLogout={handleLogout}
                />
              } />
            </Routes>
          </PageWrapper>
        </Shell>
      </div>
    </Router>
  );
}

// --- SUB-COMPONENTS & PAGES ---














