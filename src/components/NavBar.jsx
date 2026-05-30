import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserCircle, Lock, LogOut, Menu, X, ChevronDown } from 'lucide-react';
import logoImg from '../assets/logo.png';
import { getAuthUser, clearAuthUser } from '../utils/auth.js';

const SERVICE_TABS = [
    { label: 'Data Automation & BI', tab: 'data' },
    { label: 'Corporate Training',   tab: 'training' },
    { label: 'HR Staffing & Recruitment', tab: 'recruitment' },
];

export default function NavBar() {
    const location = useLocation();
    const navigate = useNavigate();
    const authUser = getAuthUser();
    const [menuOpen, setMenuOpen] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);
    const dropdownRef = useRef(null);

    const isActive = (path) => location.pathname === path ? 'active' : '';
    const isServicesActive = location.pathname === '/services' ? 'active' : '';

    // Close dropdown on outside click
    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setServicesOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const handleLogoutNav = () => {
        clearAuthUser();
        navigate('/', { replace: true });
        window.location.reload();
    };

    const closeMenu = () => setMenuOpen(false);

    return (
        <nav className="header-nav">
            <div className="container header-container">
                <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: 0 }}>
                    <img src={logoImg} alt="ITBEES Global"
                        style={{ height: '44px', width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
                </Link>

                {/* Desktop Links */}
                <ul className="nav-links">
                    <li><Link to="/" className={`nav-link ${isActive('/')}`}>Home</Link></li>
                    <li><Link to="/about" className={`nav-link ${isActive('/about')}`}>About Us</Link></li>

                    {/* Services dropdown */}
                    <li className="nav-dropdown-wrap" ref={dropdownRef}>
                        <button
                            className={`nav-link nav-dropdown-trigger ${isServicesActive}`}
                            onClick={() => setServicesOpen(o => !o)}
                        >
                            Services <ChevronDown size={13} className={servicesOpen ? 'chevron-open' : ''} />
                        </button>
                        {servicesOpen && (
                            <div className="nav-dropdown">
                                {SERVICE_TABS.map(s => (
                                    <Link
                                        key={s.tab}
                                        to={`/services?tab=${s.tab}`}
                                        className="nav-dropdown-item"
                                        onClick={() => setServicesOpen(false)}
                                    >
                                        {s.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </li>

                    <li><Link to="/careers" className={`nav-link ${isActive('/careers')}`}>Careers</Link></li>
                    <li><Link to="/training" className={`nav-link ${isActive('/training')}`}>Training</Link></li>
                    <li><Link to="/contact" className={`nav-link ${isActive('/contact')}`}>Contact Us</Link></li>
                </ul>

                {/* Desktop Actions */}
                <div className="nav-actions">
                    {authUser ? (
                        <>
                            <span style={{ fontSize: '13px', color: 'var(--color-sky-blue)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <UserCircle size={15} />{authUser.name}
                            </span>
                            {authUser.role === 'admin' && (
                                <Link to="/admin" className="btn-mini" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--color-sky-blue)' }}>
                                    <Lock size={14} /> Console
                                </Link>
                            )}
                            <button className="btn-mini"
                                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.5)' }}
                                onClick={handleLogoutNav}>
                                <LogOut size={14} /> Sign Out
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="btn-mini" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--color-sky-blue)' }}>
                            <UserCircle size={14} /> Sign In
                        </Link>
                    )}
                    <Link to="/contact" className="btn-primary" style={{ padding: '8px 16px', fontSize: '13px' }}>
                        Schedule Demo
                    </Link>
                </div>

                {/* Hamburger */}
                <button className="nav-hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
                    {menuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* Mobile Drawer */}
            {menuOpen && (
                <div className="nav-mobile-drawer">
                    <ul className="nav-mobile-links">
                        <li><Link to="/" className={`nav-link ${isActive('/')}`} onClick={closeMenu}>Home</Link></li>
                        <li><Link to="/about" className={`nav-link ${isActive('/about')}`} onClick={closeMenu}>About Us</Link></li>
                        <li style={{ paddingLeft: '12px', paddingBottom: '4px', fontSize: '12px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Services</li>
                        {SERVICE_TABS.map(s => (
                            <li key={s.tab} style={{ paddingLeft: '8px' }}>
                                <Link to={`/services?tab=${s.tab}`} className="nav-link" onClick={closeMenu}
                                    style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)' }}>
                                    — {s.label}
                                </Link>
                            </li>
                        ))}
                        <li><Link to="/careers" className={`nav-link ${isActive('/careers')}`} onClick={closeMenu}>Careers</Link></li>
                        <li><Link to="/training" className={`nav-link ${isActive('/training')}`} onClick={closeMenu}>Training</Link></li>
                        <li><Link to="/contact" className={`nav-link ${isActive('/contact')}`} onClick={closeMenu}>Contact Us</Link></li>
                    </ul>
                    <div className="nav-mobile-actions">
                        {authUser ? (
                            <>
                                {authUser.role === 'admin' && (
                                    <Link to="/admin" className="btn-secondary" onClick={closeMenu}
                                        style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
                                        <Lock size={14} /> Console
                                    </Link>
                                )}
                                <button className="btn-ghost-dark" style={{ width: '100%', justifyContent: 'center' }}
                                    onClick={() => { handleLogoutNav(); closeMenu(); }}>
                                    <LogOut size={14} /> Sign Out
                                </button>
                            </>
                        ) : (
                            <Link to="/login" className="btn-secondary" onClick={closeMenu}
                                style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
                                <UserCircle size={14} /> Sign In
                            </Link>
                        )}
                        <Link to="/contact" className="btn-primary" onClick={closeMenu}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            Schedule Demo
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
