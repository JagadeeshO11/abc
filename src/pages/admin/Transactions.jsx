import { useState } from 'react';
import { Filter } from 'lucide-react';

const BASE_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

export default function Transactions({ payments }) {
  const [activeFilters, setActiveFilters] = useState({
    date: false,
    customer: false,
    course: false,
    amount: false,
    status: false
  });
  const [filterValues, setFilterValues] = useState({
    date: '',
    customer: '',
    course: '',
    amount: '',
    status: ''
  });

  const filteredPayments = payments.filter(pay => {
    if (filterValues.date) {
      const val = filterValues.date.toLowerCase();
      const dateStr = new Date(pay.createdAt).toLocaleDateString('en-IN').toLowerCase();
      if (!dateStr.includes(val)) return false;
    }
    if (filterValues.customer) {
      const val = filterValues.customer.toLowerCase();
      const matchName = pay.name?.toLowerCase().includes(val);
      const matchEmail = pay.email?.toLowerCase().includes(val);
      if (!matchName && !matchEmail) return false;
    }
    if (filterValues.course) {
      const val = filterValues.course.toLowerCase();
      if (!pay.course?.title?.toLowerCase().includes(val)) return false;
    }
    if (filterValues.amount) {
      const val = filterValues.amount.toLowerCase();
      if (!String(pay.amount).toLowerCase().includes(val)) return false;
    }
    if (filterValues.status) {
      const val = filterValues.status.toLowerCase();
      if (!pay.status?.toLowerCase().includes(val)) return false;
    }
    return true;
  });

  const renderFilterHeader = (key, label, placeholder) => {
    const isActive = activeFilters[key];
    const value = filterValues[key];

    return (
      <th style={{ verticalAlign: 'middle', minWidth: '135px' }}>
        {isActive ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
            <input
              type="text"
              placeholder={placeholder}
              value={value}
              onChange={e => setFilterValues(prev => ({ ...prev, [key]: e.target.value }))}
              style={{
                flex: 1,
                padding: '4px 8px',
                borderRadius: '6px',
                border: '1px solid rgba(35, 149, 238, 0.3)',
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#fff',
                fontSize: '12px',
                outline: 'none',
                width: '100%'
              }}
              autoFocus
            />
            <button
              onClick={() => {
                setActiveFilters(prev => ({ ...prev, [key]: false }));
                setFilterValues(prev => ({ ...prev, [key]: '' }));
              }}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-sky-blue)',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title="Close filter"
            >
              <Filter size={14} />
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
            <span>{label}</span>
            <button
              onClick={() => {
                setActiveFilters(prev => ({ ...prev, [key]: true }));
              }}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: value ? 'var(--color-sky-blue)' : 'rgba(255, 255, 255, 0.3)',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'color 0.2s'
              }}
              title="Filter column"
            >
              <Filter size={14} />
            </button>
          </div>
        )}
      </th>
    );
  };

  return (
    <div>
      <h2 className="heading-lg" style={{ color: 'var(--color-white)', marginBottom: '24px' }}>TRANSACTIONS</h2>
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              {renderFilterHeader('date', 'Date', 'Filter Date...')}
              {renderFilterHeader('customer', 'Customer', 'Filter Cust...')}
              {renderFilterHeader('course', 'Course', 'Filter Course...')}
              {renderFilterHeader('amount', 'Amount', 'Filter Amt...')}
              {renderFilterHeader('status', 'Status', 'Filter Status...')}
              <th>Invoice</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map(pay => (
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
            {filteredPayments.length === 0 && <tr><td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: 'rgba(255,255,255,0.3)' }}>No transactions found.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
