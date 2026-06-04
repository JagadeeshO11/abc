import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Upload, Check, ArrowLeft } from 'lucide-react';
import { FaRupeeSign, FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import { publicApi } from '../utils/api.js';
import './Careers.css';

export default function JobApply({ jobs, triggerToast }) {
    const { jobId } = useParams();
    const navigate = useNavigate();

    const [job, setJob] = useState(jobs.find(j => j.id === jobId) || null);
    const [jobLoading, setJobLoading] = useState(!job);
    const [form, setForm] = useState({ name: '', email: '', phone: '', location: '', skills: '', experience: '', education: '' });
    const [resumeFile, setResumeFile] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        if (job) return;
        publicApi.getJobById(jobId)
            .then(res => setJob(res.data))
            .catch(() => navigate('/careers', { replace: true }))
            .finally(() => setJobLoading(false));
    }, [jobId]);

    // sync from props once loaded
    useEffect(() => {
        if (!job && jobs.length > 0) {
            const found = jobs.find(j => j.id === jobId);
            if (found) setJob(found);
        }
    }, [jobs]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!allowed.includes(file.type)) { alert('Invalid file type. Please upload PDF, DOC, or DOCX.'); return; }
        if (file.size > 5 * 1024 * 1024) { alert('File too large. Max 5MB allowed.'); return; }
        setResumeFile(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!resumeFile) { alert('Please upload your resume.'); return; }
        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append('jobId', job.id);
            formData.append('resume', resumeFile);
            Object.keys(form).forEach(key => formData.append(key, form[key]));
            await publicApi.applyJob(formData);
            setSubmitted(true);
            triggerToast(`Application submitted for ${job.title}!`);
        } catch (err) {
            if (err.message?.toLowerCase().includes('already applied')) {
                triggerToast('⚠️ You have already applied for this job.');
            } else {
                triggerToast('❌ Submission failed. Please try again.');
            }
        } finally {
            setIsUploading(false);
        }
    };

    if (jobLoading) return <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-muted-text)' }}>Loading job details...</div>;
    if (!job) return null;

    if (submitted) return (
        <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', backgroundColor: 'var(--color-light-canvas)' }}>
            <div style={{ textAlign: 'center', maxWidth: '480px' }}>
                <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--color-pale-mint)', border: '2px solid var(--color-evergreen-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                    <Check size={36} color="var(--color-evergreen-glow)" />
                </div>
                <h2 style={{ fontFamily: 'var(--font-ozik)', fontSize: '28px', color: 'var(--color-ink)', marginBottom: '12px' }}>APPLICATION SUBMITTED!</h2>
                <p style={{ color: 'var(--color-dark-olive)', fontSize: '15px', lineHeight: '1.7', marginBottom: '32px' }}>
                    Thank you for applying to <strong>{job.title}</strong>. Our team will review your profile and get back to you within 3–5 business days.
                </p>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link to="/careers" className="btn-primary">Browse More Jobs</Link>
                    <Link to="/" className="btn-ghost-dark" style={{ color: 'var(--color-ink)', borderColor: 'var(--color-soft-gray)' }}>Back to Home</Link>
                </div>
            </div>
        </div>
    );

    return (
        <div style={{ backgroundColor: 'var(--color-light-canvas)', minHeight: '100vh', paddingBottom: '80px' }}>

            {/* Top bar */}
            <div style={{ backgroundColor: 'var(--color-navy-dark)', padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                    <Link to="/careers" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.7)', fontSize: '13px', textDecoration: 'none', fontWeight: 500 }}>
                        <ArrowLeft size={15} /> Back to Careers
                    </Link>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>
                        <MdVerified size={14} color="var(--color-ai-lime)" /> Secure Application
                    </div>
                </div>
            </div>

            <div className="container" style={{ paddingTop: '40px' }}>

                {/* Page title */}
                <div style={{ marginBottom: '32px' }}>
                    <p style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-corporate-blue)', marginBottom: '6px' }}>Job Application</p>
                    <h1 style={{ fontFamily: 'var(--font-ozik)', fontSize: 'clamp(24px, 4vw, 36px)', color: 'var(--color-ink)', marginBottom: '8px' }}>{job.title}</h1>
                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '13px', color: 'var(--color-dark-olive)' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FaMapMarkerAlt size={12} /> {job.location}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FaBriefcase size={12} /> {job.type}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FaRupeeSign size={12} /> {job.salary}</span>
                    </div>
                </div>

                {/* Two-column layout */}
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 340px', gap: '32px', alignItems: 'start' }} className="apply-layout">

                    {/* Application Form */}
                    <div style={{ background: 'var(--color-white)', borderRadius: '16px', border: '1px solid var(--color-soft-gray)', overflow: 'hidden' }}>
                        <div style={{ padding: '24px 28px', borderBottom: '1px solid var(--color-soft-gray)', background: 'var(--color-navy-dark)' }}>
                            <h2 style={{ fontFamily: 'var(--font-ozik)', fontSize: '18px', color: 'var(--color-white)', letterSpacing: '0.04em' }}>YOUR APPLICATION</h2>
                            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', marginTop: '4px' }}>All fields marked * are required</p>
                        </div>
                        <form onSubmit={handleSubmit} style={{ padding: '28px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-grid-2">
                                <div className="form-group">
                                    <label className="form-label">Full Name *</label>
                                    <input type="text" className="input-field" required placeholder="e.g. Rajesh Kumar" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Phone Number *</label>
                                    <input type="tel" className="input-field" required placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-grid-2">
                                <div className="form-group">
                                    <label className="form-label">Email Address *</label>
                                    <input type="email" className="input-field" required placeholder="you@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Current Location *</label>
                                    <input type="text" className="input-field" required placeholder="e.g. Hyderabad" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Key Skills *</label>
                                <input type="text" className="input-field" required placeholder="e.g. React, Node.js, Power BI, SQL" value={form.skills} onChange={e => setForm({ ...form, skills: e.target.value })} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-grid-2">
                                <div className="form-group">
                                    <label className="form-label">Experience *</label>
                                    <input type="text" className="input-field" required placeholder="e.g. 3 Years" value={form.experience} onChange={e => setForm({ ...form, experience: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Highest Education *</label>
                                    <input type="text" className="input-field" required placeholder="e.g. B.Tech CSE" value={form.education} onChange={e => setForm({ ...form, education: e.target.value })} />
                                </div>
                            </div>

                            {/* Resume upload */}
                            <div className="form-group" style={{ marginBottom: '28px' }}>
                                <label className="form-label">Resume / CV * (PDF, DOC, DOCX — max 5MB)</label>
                                <input type="file" id="resume-upload" hidden onChange={handleFileChange} accept=".pdf,.doc,.docx" />
                                <label htmlFor="resume-upload" style={{
                                    display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 18px',
                                    border: `2px dashed ${resumeFile ? 'var(--color-evergreen-glow)' : 'var(--color-soft-gray)'}`,
                                    borderRadius: '12px', cursor: 'pointer',
                                    background: resumeFile ? 'var(--color-pale-mint)' : 'var(--color-light-canvas)',
                                    transition: 'all 0.15s'
                                }}>
                                    {resumeFile
                                        ? <><Check size={18} color="var(--color-evergreen-glow)" /><span style={{ fontSize: '13px', color: 'var(--color-evergreen-glow)', fontWeight: 600 }}>{resumeFile.name}</span><span style={{ marginLeft: 'auto', fontSize: '11px', color: 'var(--color-dark-olive)' }}>Click to change</span></>
                                        : <><Upload size={18} color="var(--color-corporate-blue)" /><span style={{ fontSize: '13px', color: 'var(--color-corporate-blue)', fontWeight: 500 }}>Click to upload your resume</span></>
                                    }
                                </label>
                            </div>

                            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '14px', fontSize: '15px' }} disabled={isUploading}>
                                {isUploading ? 'Submitting...' : '🚀 Submit Application'}
                            </button>
                            <p style={{ fontSize: '11px', color: 'var(--color-dark-olive)', textAlign: 'center', marginTop: '12px' }}>
                                🔒 Your data is secure and will only be used for recruitment purposes.
                            </p>
                        </form>
                    </div>

                    {/* Job Details Sidebar */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                        {/* Job Overview */}
                        <div style={{ background: 'var(--color-white)', borderRadius: '16px', border: '1px solid var(--color-soft-gray)', overflow: 'hidden' }}>
                            <div style={{ padding: '18px 20px', borderBottom: '1px solid var(--color-soft-gray)' }}>
                                <h3 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-corporate-blue)' }}>Job Overview</h3>
                            </div>
                            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                {[
                                    { label: 'Department', value: job.department },
                                    { label: 'Location', value: job.location },
                                    { label: 'Job Type', value: job.type },
                                    { label: 'Salary', value: job.salary },
                                ].map((item, i) => (
                                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', borderBottom: i < 3 ? '1px solid var(--color-soft-gray)' : 'none', paddingBottom: i < 3 ? '14px' : 0 }}>
                                        <span style={{ color: 'var(--color-dark-olive)', fontWeight: 500 }}>{item.label}</span>
                                        <span style={{ color: 'var(--color-ink)', fontWeight: 600 }}>{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Description */}
                        <div style={{ background: 'var(--color-white)', borderRadius: '16px', border: '1px solid var(--color-soft-gray)', padding: '20px' }}>
                            <h3 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-corporate-blue)', marginBottom: '12px' }}>Description</h3>
                            <p style={{ fontSize: '13px', color: 'var(--color-ink)', lineHeight: '1.75' }}>{job.description}</p>
                        </div>

                        {/* Requirements */}
                        <div style={{ background: 'var(--color-white)', borderRadius: '16px', border: '1px solid var(--color-soft-gray)', padding: '20px' }}>
                            <h3 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-corporate-blue)', marginBottom: '12px' }}>Requirements</h3>
                            <ul style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {job.requirements.map((req, i) => (
                                    <li key={i} style={{ fontSize: '13px', color: 'var(--color-ink)', lineHeight: '1.6' }}>{req}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
