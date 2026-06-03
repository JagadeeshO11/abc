export default function Overview({ inquiries, applications, payments }) {
  return (
    <div>
      <h2 className="heading-lg" style={{ color: 'var(--color-white)', marginBottom: '24px' }}>ADMINISTRATIVE OVERVIEW</h2>
      <div className="analytics-grid">
        <div className="stat-card">
          <div className="stat-label">Inquiries</div>
          <div className="stat-value">{inquiries.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Job Applications</div>
          <div className="stat-value">{applications.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Transactions</div>
          <div className="stat-value">{payments.length}</div>
        </div>
      </div>
    </div>
  );
}
