import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserCircle, Lock, LogOut } from 'lucide-react';
import logoImg from '../assets/logo.png';
import { getAuthUser, clearAuthUser } from '../utils/auth.js';

export default function NavBar() {
    const location = useLocation();
    const navigate = useNavigate();
    const authUser = getAuthUser();

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    const handleLogoutNav = () => {
        clearAuthUser();
        navigate('/', { replace: true });
        window.location.reload();
    };

    return (
        <nav className="header-nav">
            <div className="container header-container">
                {/* Logo Image */}
                <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: 0 }}>
                    <img
                        src={logoImg}
                        alt="ITBEES Global"
                        style={{ height: '44px', width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
                    />
                </Link>

                {/* Desktop Links */}
                <ul className="nav-links" style={{ display: 'flex' }}>
                    <li><Link to="/" className={`nav-link ${isActive('/')}`}>Home</Link></li>
                    <li><Link to="/about" className={`nav-link ${isActive('/about')}`}>About Us</Link></li>
                    <li><Link to="/services" className={`nav-link ${isActive('/services')}`}>Services</Link></li>
                    <li><Link to="/careers" className={`nav-link ${isActive('/careers')}`}>Careers</Link></li>
                    <li><Link to="/training" className={`nav-link ${isActive('/training')}`}>Training</Link></li>
                    <li><Link to="/contact" className={`nav-link ${isActive('/contact')}`}>Contact Us</Link></li>
                </ul>

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
                            <button
                                className="btn-mini"
                                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.5)' }}
                                onClick={handleLogoutNav}
                            >
                                <LogOut size={14} /> Sign Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn-mini" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--color-sky-blue)' }}>
                                <UserCircle size={14} /> Sign In
                            </Link>
                            <Link to="/admin/login" className="btn-mini" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.45)' }}>
                                <Lock size={13} /> Admin
                            </Link>
                        </>
                    )}
                    <Link to="/contact" className="btn-primary" style={{ padding: '8px 16px', fontSize: '13px' }}>
                        Schedule Demo
                    </Link>
                </div>
            </div>
        </nav>
    );
}