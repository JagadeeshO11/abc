
import { useState } from 'react';
import {
  Grid, Briefcase, BookOpen, Mail, Users, DollarSign,
  Settings, Activity, TrendingUp
} from 'lucide-react';

export default function AdminPanel({
    jobs, setJobs,
    courses, setCourses,
    applications, setApplications,
    enrollments,
    inquiries, setInquiries,
    payments,
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