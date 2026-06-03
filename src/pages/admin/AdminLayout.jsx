import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Grid, Briefcase, BookOpen, Mail, DollarSign, Activity } from 'lucide-react';
import { CheckCircle } from 'lucide-react';

const navItems = [
  { to: '/admin', label: 'Overview Stats', icon: <Grid size={16} />, end: true },
  { to: '/admin/jobs', label: 'Manage Jobs', icon: <Briefcase size={16} /> },
  { to: '/admin/courses', label: 'Manage Courses', icon: <BookOpen size={16} /> },
  { to: '/admin/inquiries', label: 'Client Inquiries', icon: <Mail size={16} /> },
  { to: '/admin/transactions', label: 'Transactions', icon: <DollarSign size={16} /> },
  { to: '/admin/logs', label: 'System Logs', icon: <Activity size={16} /> },
];

export default function AdminLayout({ onLogout, toast, adminLoading }) {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div style={{ color: 'var(--color-white)', fontSize: '13px', fontWeight: 'bold', padding: '0 16px 16px 16px', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '16px' }}>
          ADMIN MENU
        </div>
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => `admin-sidebar-btn${isActive ? ' active' : ''}`}
            style={{ textDecoration: 'none' }}
          >
            {item.icon} {item.label}
          </NavLink>
        ))}
        <div style={{ marginTop: 'auto', padding: '16px' }}>
          <button className="btn-mini" style={{ color: 'var(--color-ai-lime)', width: '100%' }} onClick={onLogout}>Logout</button>
        </div>
      </aside>
      <section className="admin-content" style={{ textAlign: 'left' }}>
        {adminLoading ? (
          <div style={{ minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-muted-text)' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '20px', marginBottom: '8px' }}>Loading admin data…</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)' }}>Fetching inquiries, applications, transactions and logs.</div>
            </div>
          </div>
        ) : (
          <Outlet />
        )}
      </section>
      {toast && (
        <div style={{ position: 'fixed', bottom: '30px', left: '30px', backgroundColor: 'var(--color-navy-dark)', borderLeft: '4px solid var(--color-ai-lime)', color: 'var(--color-white)', padding: '16px 24px', borderRadius: '4px', boxShadow: '0 10px 25px rgba(0,0,0,0.3)', zIndex: 9999, display: 'flex', alignItems: 'center', gap: '12px' }}>
          <CheckCircle size={18} color="var(--color-ai-lime)" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}
