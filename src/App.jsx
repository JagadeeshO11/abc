import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  Link
} from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

import AuthPage from './pages/Auth.jsx';
import { getAuthUser, clearAuthUser } from './utils/auth.js';

function ProtectedRoute({ authUser, children }) {
  if (!authUser) return <Navigate to="/login" replace />;
  return children;
}

// Components
import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';
import ChatWidget from './components/ChatWidget.jsx';

function ScrollToTop() {
  const { pathname, search } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [pathname, search]);
  return null;
}


function PageWrapper({ children }) {
  const { pathname, search } = useLocation();
  return <div key={pathname + search} className="page-fade">{children}</div>;
}

// Pages
import Home from './pages/Home.jsx';
import AboutUs from './pages/AboutUs.jsx';
import Services from './pages/Services.jsx';
import Careers from './pages/Careers.jsx';
import JobApply from './pages/JobApply.jsx';
import Training from './pages/Training.jsx';
import Checkout from './pages/Checkout.jsx';
import ContactUs from './pages/ContactUs.jsx';
import AdminLayout from './pages/admin/AdminLayout.jsx';
import Overview from './pages/admin/Overview.jsx';
import ManageJobs from './pages/admin/ManageJobs.jsx';
import ManageCourses from './pages/admin/ManageCourses.jsx';
import Inquiries from './pages/admin/Inquiries.jsx';
import Transactions from './pages/admin/Transactions.jsx';
import SystemLogs from './pages/admin/SystemLogs.jsx';
import ImageToUrl from './pages/admin/ImageToUrl.jsx';

// Styles
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

import { publicApi, adminApi } from './utils/api.js';

const VALID_PATHS = ['/', '/about', '/services', '/careers', '/training', '/contact', '/login'];

function Shell({ children, toast, courses, authUser, onLogout }) {
  const { pathname } = useLocation();
  const isValid = VALID_PATHS.includes(pathname) || pathname.startsWith('/admin') || pathname.startsWith('/careers/apply/') || pathname.startsWith('/training');
  if (!isValid) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '48px 24px', backgroundColor: 'var(--color-navy-dark)' }}>
        <div style={{ fontSize: '120px', fontFamily: 'var(--font-ozik)', fontWeight: '700', color: 'var(--color-ai-lime)', lineHeight: 1 }}>404</div>
        <h2 style={{ fontFamily: 'var(--font-ozik)', fontSize: '28px', color: 'var(--color-white)', margin: '16px 0 8px' }}>PAGE NOT FOUND</h2>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', marginBottom: '32px', maxWidth: '400px' }}>The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <Link to="/" style={{ backgroundColor: 'var(--color-ai-lime)', color: 'var(--color-deep-moss)', padding: '12px 28px', borderRadius: '28px', fontFamily: 'var(--font-aeonik)', fontWeight: '600', fontSize: '15px', textDecoration: 'none' }}>Back to Home</Link>
      </div>
    );
  }
  const isAdmin = pathname.startsWith('/admin') || pathname === '/login';
  return (
    <>
      {!isAdmin && <NavBar courses={courses} authUser={authUser} onLogout={onLogout} />}
      <main style={{ flex: 1 }}>{children}</main>
      {!isAdmin && <Footer />}
      {!isAdmin && <ChatWidget />}
      {!isAdmin && toast && (
        <div style={{ position: 'fixed', bottom: '30px', left: '30px', backgroundColor: 'var(--color-navy-dark)', borderLeft: '4px solid var(--color-ai-lime)', color: 'var(--color-white)', padding: '16px 24px', borderRadius: '4px', boxShadow: '0 10px 25px rgba(0,0,0,0.3)', zIndex: 9999, display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'var(--font-aeonik)' }}>
          <CheckCircle size={18} color="var(--color-ai-lime)" />
          <span>{toast}</span>
        </div>
      )}
    </>
  );
}

export default function App() {
  const [authUser, setAuthUser] = useState(getAuthUser());
  const [jobs, setJobs] = useState([]);
  const [courses, setCourses] = useState([]);
  const [applications, setApplications] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [payments, setPayments] = useState([]);
  const [logs, setLogs] = useState([]);
  const [adminLoading, setAdminLoading] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const [coursesRes, jobsRes] = await Promise.allSettled([
        publicApi.getCourses(),
        publicApi.getJobs()
      ]);
      if (coursesRes.status === 'fulfilled') setCourses(coursesRes.value.data || []);
      if (jobsRes.status === 'fulfilled') setJobs(jobsRes.value.data || []);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!authUser) return;
    const fetchAdminData = async () => {
      setAdminLoading(true);
      const [inqsRes, appsRes, purchasesRes, logsRes] = await Promise.allSettled([
        adminApi.getInquiries(),
        adminApi.getApplications(),
        adminApi.getPurchases(),
        adminApi.getAuditLogs()
      ]);
      if (inqsRes.status === 'fulfilled') setInquiries(inqsRes.value.data || []);
      if (appsRes.status === 'fulfilled') setApplications(appsRes.value.data || []);
      if (purchasesRes.status === 'fulfilled') setPayments(purchasesRes.value.data || []);
      if (logsRes.status === 'fulfilled') {
        setLogs(logsRes.value.data.map(l => ({
          id: l.id,
          time: new Date(l.createdAt).toLocaleTimeString(),
          type: l.action.toLowerCase(),
          message: `${l.admin?.name || 'System'} ${l.action.toLowerCase()}d ${l.entity}`
        })));
      }
      setAdminLoading(false);
    };
    fetchAdminData();
  }, [authUser]);

  const handleLogout = async () => {
    if (authUser?.refreshToken) {
      try {
        await adminApi.logout(authUser.refreshToken);
      } catch (e) {
        console.error('Logout failed:', e);
      }
    }
    clearAuthUser();
    setAuthUser(null);
  };

  const triggerToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 4000);
  };

  return (
    <Router>
      <div className="app-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <ScrollToTop />
        <Shell toast={toast} courses={courses} authUser={authUser} onLogout={handleLogout}>
          <PageWrapper>
            <Routes>
              <Route path="/" element={<Home setInquiries={setInquiries} triggerToast={triggerToast} />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/services" element={<Services />} />
              <Route path="/careers" element={<Careers jobs={jobs} />} />
              <Route path="/careers/apply/:jobId" element={<JobApply jobs={jobs} triggerToast={triggerToast} />} />
              <Route path="/training" element={<Training courses={courses} triggerToast={triggerToast} />} />
              <Route path="/training/checkout" element={<Checkout triggerToast={triggerToast} setPayments={setPayments} />} />
              <Route path="/contact" element={<ContactUs setInquiries={setInquiries} triggerToast={triggerToast} />} />
              <Route path="/login" element={<AuthPage setAuthUser={setAuthUser} />} />
              <Route path="/admin" element={
                <ProtectedRoute authUser={authUser}>
                  <AdminLayout onLogout={handleLogout} toast={toast} adminLoading={adminLoading} />
                </ProtectedRoute>
              }>
                <Route index element={<Overview inquiries={inquiries} applications={applications} payments={payments} />} />
                <Route path="jobs" element={<ManageJobs jobs={jobs} setJobs={setJobs} applications={applications} setApplications={setApplications} triggerToast={triggerToast} />} />
                <Route path="courses" element={<ManageCourses courses={courses} setCourses={setCourses} triggerToast={triggerToast} />} />
                <Route path="inquiries" element={<Inquiries inquiries={inquiries} setInquiries={setInquiries} triggerToast={triggerToast} />} />
                <Route path="transactions" element={<Transactions payments={payments} />} />
                <Route path="logs" element={<SystemLogs logs={logs} />} />
                <Route path="image-url" element={<ImageToUrl />} />
              </Route>
            </Routes>
          </PageWrapper>
        </Shell>
      </div>
    </Router>
  );
}
