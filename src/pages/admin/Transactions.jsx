const BASE_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

export default function Transactions({ payments }) {
  return (
    <div>
      <h2 className="heading-lg" style={{ color: 'var(--color-white)', marginBottom: '24px' }}>TRANSACTIONS</h2>
      <div className="admin-table-container">
        <table className="admin-table">
          <thead><tr><th>Date</th><th>Customer</th><th>Course</th><th>Amount</th><th>Status</th><th>Invoice</th></tr></thead>
          <tbody>
            {payments.map(pay => (
              <tr key={pay.id}>
                <td style={{ fontSize: '12px' }}>{new Date(pay.createdAt).toLocaleDateString()}</td>
                <td><strong>{pay.name}</strong><br />{pay.email}</td>
                <td>{pay.course?.title}</td>
                <td style={{ fontWeight: '700', color: 'var(--color-sky-blue)' }}>₹{pay.amount}</td>
                <td><span className={`status-badge status-${pay.status.toLowerCase()}`}>{pay.status}</span></td>
                <td>
                  {pay.invoice && (
                    <a href={`${BASE_URL}/uploads/invoices/${pay.invoice.filePath}`} target="_blank" rel="noreferrer"
                      style={{ color: 'var(--color-sky-blue)', fontSize: '12px' }}>
                      Download
                    </a>
                  )}
                </td>
              </tr>
            ))}
            {payments.length === 0 && <tr><td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: 'rgba(255,255,255,0.3)' }}>No transactions yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
