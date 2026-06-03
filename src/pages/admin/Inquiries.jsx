import { adminApi } from '../../utils/api.js';

export default function Inquiries({ inquiries, setInquiries, triggerToast }) {
  const handleArchive = async (id) => {
    try {
      await adminApi.archiveInquiry(id);
      setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status: 'ARCHIVED' } : inq));
      triggerToast('Inquiry archived.');
    } catch (err) { alert(err.message); }
  };

  return (
    <div>
      <h2 className="heading-lg" style={{ color: 'var(--color-white)', marginBottom: '24px' }}>CLIENT INQUIRIES</h2>
      <div className="admin-table-container">
        <table className="admin-table">
          <thead><tr><th>Date</th><th>Client</th><th>Subject</th><th>Message</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {inquiries.map(inq => (
              <tr key={inq.id}>
                <td style={{ fontSize: '12px' }}>{new Date(inq.createdAt).toLocaleDateString()}</td>
                <td><strong>{inq.name}</strong><br />{inq.email}</td>
                <td>{inq.subject || '—'}</td>
                <td style={{ maxWidth: '260px' }}>{inq.message}</td>
                <td><span className={`status-badge status-${inq.status.toLowerCase()}`}>{inq.status}</span></td>
                <td><button className="btn-mini" onClick={() => handleArchive(inq.id)}>Archive</button></td>
              </tr>
            ))}
            {inquiries.length === 0 && <tr><td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: 'rgba(255,255,255,0.3)' }}>No inquiries yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
