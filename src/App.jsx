import { useState } from 'react';
import {
  HashRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

import AuthPage from './pages/Auth.jsx';
import { getAuthUser, clearAuthUser } from './utils/auth.js';

// Components
import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';
import ChatWidget from './components/ChatWidget.jsx';

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
            <Route path="/" element={<Home setInquiries={setInquiries} triggerToast={triggerToast} addLog={addLog} />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/services" element={<Services />} />
            <Route path="/careers" element={<Careers jobs={jobs} setApplications={setApplications} triggerToast={triggerToast} addLog={addLog} />} />
            <Route path="/training" element={<Training courses={courses} setEnrollments={setEnrollments} setPayments={setPayments} triggerToast={triggerToast} addLog={addLog} />} />
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
        </main>

        {/* Footer */}
        <Footer />

        {/* Global Floating AI Chatbot & Call CTA */}
        <ChatWidget />

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














