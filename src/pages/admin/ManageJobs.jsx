import { useState } from 'react';
import { X, Download } from 'lucide-react';
import { adminApi } from '../../utils/api.js';

const BASE_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

export default function ManageJobs({ jobs, setJobs, applications, setApplications, triggerToast }) {
  const [jobSubTab, setJobSubTab] = useState('postings');
  const [jobDrawerOpen, setJobDrawerOpen] = useState(false);
  const [editingJobId, setEditingJobId] = useState(null);
  const [newJobTitle, setNewJobTitle] = useState('');
  const [newJobDept, setNewJobDept] = useState('Engineering');
  const [newJobSalary, setNewJobSalary] = useState('');
  const [newJobDesc, setNewJobDesc] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSelectJob = (job) => {
    setEditingJobId(job.id);
    setNewJobTitle(job.title);
    setNewJobDept(job.department);
    setNewJobSalary(job.salary);
    setNewJobDesc(job.description);
    setJobDrawerOpen(true);
  };

  const handleClear = () => {
    setEditingJobId(null);
    setNewJobTitle(''); setNewJobSalary(''); setNewJobDesc('');
    setNewJobDept('Engineering');
    setJobDrawerOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const payload = {
      title: newJobTitle, department: newJobDept,
      location: 'Hyderabad Office', type: 'Full-time',
      salary: newJobSalary, description: newJobDesc,
      requirements: ['Relevant credentials', 'Good communication']
    };
    if (editingJobId) {
      try {
        const { data } = await adminApi.updateJob(editingJobId, payload);
        setJobs(prev => prev.map(j => j.id === editingJobId ? data : j));
        triggerToast('Job updated successfully.');
        handleClear();
      } catch (err) { alert(err.message); }
      finally { setIsSaving(false); }
    } else {
      if (jobs.find(j => j.title.trim().toLowerCase() === newJobTitle.trim().toLowerCase())) {
        triggerToast(`⚠️ Job "${newJobTitle}" already exists.`); return;
      }
      try {
        const { data } = await adminApi.createJob(payload);
        setJobs(prev => [data, ...prev]);
        triggerToast('New career opening published.');
        handleClear();
      } catch (err) { alert(err.message); }
      finally { setIsSaving(false); }
    }
  };

  const handleRemoveJob = async (id) => {
    if (!window.confirm('Archive this job opening?')) return;
    try {
      await adminApi.deleteJob(id);
      setJobs(prev => prev.filter(j => j.id !== id));
      triggerToast('Job archived successfully.');
    } catch (err) { alert(err.message); }
  };

  const handleDeleteApp = async (id) => {
    if (!window.confirm('Delete this application?')) return;
    try {
      await adminApi.deleteApplication(id);
      setApplications(prev => prev.filter(a => a.id !== id));
      triggerToast('Application deleted.');
    } catch (err) { alert(err.message); }
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <button onClick={() => { handleClear(); setJobDrawerOpen(true); }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'var(--color-corporate-blue)', color: '#fff', border: 'none', borderRadius: '8px', padding: '9px 18px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>
          <span style={{ fontSize: '18px', lineHeight: 1 }}>›</span> Add Job
        </button>
        <h2 className="heading-lg" style={{ color: 'var(--color-white)', margin: 0 }}>MANAGE JOBS</h2>
      </div>

      {/* Sub-tab toggle */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '4px', width: 'fit-content' }}>
        {[['postings', `Job Postings (${jobs.length})`], ['applicants', `Applicants (${applications.length})`]].map(([key, label]) => (
          <button key={key} onClick={() => setJobSubTab(key)} style={{ padding: '7px 20px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '600', background: jobSubTab === key ? 'var(--color-corporate-blue)' : 'transparent', color: jobSubTab === key ? '#fff' : 'rgba(255,255,255,0.45)' }}>
            {label}
          </button>
        ))}
      </div>

      {/* Job Postings Table */}
      {jobSubTab === 'postings' && (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead><tr><th>Title</th><th>Department</th><th>Location</th><th>Type</th><th>Salary</th><th>Added</th><th>Action</th></tr></thead>
            <tbody>
              {jobs.map(job => (
                <tr key={job.id} style={{ background: editingJobId === job.id ? 'rgba(35,149,238,0.08)' : undefined }}>
                  <td><strong>{job.title}</strong><br /><span style={{ fontSize: '10px', color: '#aaa', fontFamily: 'monospace' }}>{job.id.slice(0, 8)}…</span></td>
                  <td><span className="badge-blue">{job.department}</span></td>
                  <td>{job.location}</td>
                  <td>{job.type}</td>
                  <td style={{ fontWeight: '700', color: 'var(--color-sky-blue)' }}>{job.salary}</td>
                  <td style={{ fontSize: '12px' }}>{new Date(job.createdAt).toLocaleDateString('en-IN')}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button className="btn-mini" style={{ color: 'var(--color-sky-blue)' }} onClick={() => handleSelectJob(job)}>Edit</button>
                      <button className="btn-mini" style={{ color: '#ff6b6b' }} onClick={() => handleRemoveJob(job.id)}>Remove</button>
                    </div>
                  </td>
                </tr>
              ))}
              {jobs.length === 0 && <tr><td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: 'rgba(255,255,255,0.3)' }}>No jobs yet. Click › Add Job to get started.</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      {/* Applicants Table */}
      {jobSubTab === 'applicants' && (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead><tr><th>Candidate</th><th>Email</th><th>Phone</th><th>Job</th><th>Experience</th><th>Resume</th><th>Applied</th><th>Action</th></tr></thead>
            <tbody>
              {applications.map(app => (
                <tr key={app.id}>
                  <td><strong>{app.name}</strong><br /><span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)' }}>{app.location}</span></td>
                  <td>{app.email}</td>
                  <td>{app.phone}</td>
                  <td>{app.job?.title}</td>
                  <td>{app.experience}</td>
                  <td>
                    <a href={`${BASE_URL}/uploads/resumes/${app.resumePath}`} target="_blank" rel="noreferrer"
                      style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-sky-blue)', fontSize: '12px' }}>
                      <Download size={12} /> View
                    </a>
                  </td>
                  <td style={{ fontSize: '12px' }}>{new Date(app.createdAt).toLocaleDateString('en-IN')}</td>
                  <td><button className="btn-mini" style={{ color: '#ff6b6b' }} onClick={() => handleDeleteApp(app.id)}>Delete</button></td>
                </tr>
              ))}
              {applications.length === 0 && <tr><td colSpan="8" style={{ textAlign: 'center', padding: '40px', color: 'rgba(255,255,255,0.3)' }}>No applications yet.</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      {/* Add/Edit Job Modal */}
      {jobDrawerOpen && (
        <>
          <div onClick={handleClear} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 200 }} />
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '520px', maxHeight: '90vh', background: '#fff', borderRadius: '12px', boxShadow: '0 20px 60px rgba(0,0,0,0.4)', zIndex: 201, display: 'flex', flexDirection: 'column', animation: 'popIn 0.22s ease' }}>
            <style>{`@keyframes popIn { from { opacity:0; transform:translate(-50%,-48%) scale(0.97); } to { opacity:1; transform:translate(-50%,-50%) scale(1); } }`}</style>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px', background: 'var(--color-corporate-blue)', borderRadius: '12px 12px 0 0' }}>
              <div style={{ color: '#fff', fontWeight: '700', fontSize: '15px' }}>{editingJobId ? '✏️ Edit Job' : '› Add New Job'}</div>
              <button onClick={handleClear} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', display: 'flex' }}><X size={20} /></button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '24px', background: 'var(--color-corporate-blue)' }}>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label" style={{ color: 'rgba(255,255,255,0.8)' }}>Job Title</label>
                  <input className="input-field" required value={newJobTitle} onChange={e => setNewJobTitle(e.target.value)} />
                </div>
                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label" style={{ color: 'rgba(255,255,255,0.8)' }}>Department</label>
                    <select className="input-field" value={newJobDept} onChange={e => setNewJobDept(e.target.value)}>
                      {['Engineering','Analytics','Sales','HR','Finance'].map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ color: 'rgba(255,255,255,0.8)' }}>Salary</label>
                    <input className="input-field" required placeholder="e.g. ₹4-6 LPA" value={newJobSalary} onChange={e => setNewJobSalary(e.target.value)} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ color: 'rgba(255,255,255,0.8)' }}>Description</label>
                  <textarea className="input-field" rows="4" required value={newJobDesc} onChange={e => setNewJobDesc(e.target.value)} />
                </div>
                <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                  <button type="submit" className="btn-primary" style={{ flex: 1 }} disabled={isSaving}>{isSaving ? 'Saving...' : (editingJobId ? 'Update Job' : 'Publish Job')}</button>
                  <button type="button" className="btn-secondary" style={{ flex: 1 }} onClick={handleClear}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
