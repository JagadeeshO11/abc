import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, BarChart2, GraduationCap, Users, ArrowRight } from 'lucide-react';
import logoImg from '../assets/logo.png';

const SERVICE_TABS = [
    { label: 'Data Automation & BI',     tab: 'data',        icon: <BarChart2 size={16} />,     desc: 'Dashboards, ETL & BI reports' },
    { label: 'Corporate Training',        tab: 'training',    icon: <GraduationCap size={16} />, desc: 'Excel, Power BI, Python & more' },
    { label: 'HR Staffing & Recruitment', tab: 'recruitment', icon: <Users size={16} />,         desc: 'Pre-screened talent placement' },
];

const PER_COL = 5;

export default function NavBar({ courses = [], authUser, onLogout }) {
    const location = useLocation();
    const [menuOpen, setMenuOpen]       = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);
    const [trainingOpen, setTrainingOpen] = useState(false);

    const navRef         = useRef(null);
    const servicesRef    = useRef(null);
    const trainingRef    = useRef(null);

    const isActive = (path) => location.pathname === path ? 'active' : '';
    const isServicesActive = location.pathname === '/services' ? 'active' : '';
    const isTrainingActive = location.pathname === '/training'  ? 'active' : '';

    /* keep --navbar-bottom in sync */
    useEffect(() => {
        const update = () => {
            if (navRef.current) {
                const b = navRef.current.getBoundingClientRect().bottom;
                document.documentElement.style.setProperty('--navbar-bottom', `${b}px`);
            }
        };
        update();
        window.addEventListener('resize', update);
        window.addEventListener('scroll', update);
        return () => { window.removeEventListener('resize', update); window.removeEventListener('scroll', update); };
    }, []);

    /* close dropdowns on outside click */
    useEffect(() => {
        const handler = (e) => {
            if (servicesRef.current && !servicesRef.current.contains(e.target)) setServicesOpen(false);
            if (trainingRef.current && !trainingRef.current.contains(e.target)) setTrainingOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    /* close both when route changes */
    useEffect(() => { setServicesOpen(false); setTrainingOpen(false); setMenuOpen(false); }, [location]);

    const closeMenu = () => setMenuOpen(false);

    /* split courses into max-2 columns of 5 */
    const visibleCourses = courses.slice(0, PER_COL * 2);
    const col1 = visibleCourses.slice(0, PER_COL);
    const col2 = visibleCourses.slice(PER_COL, PER_COL * 2);
    const hasMore = courses.length > PER_COL * 2;

    return (
        <nav className="header-nav" ref={navRef}>
            <div className="container header-container">
                <Link to="/" className="logo-wrap">
                    <div className="logo-img-container">
                        <img src={logoImg} alt="ITBEES Global" className="header-logo-img" />
                    </div>
                    <div className="logo-text-block">
                        <span className="logo-brand">ITBEES <span className="logo-accent">GLOBAL</span></span>
                        <span className="logo-tagline">Enterprise Solutions & Training</span>
                    </div>
                </Link>

                {/* Desktop Links */}
                <ul className="nav-links">
                    <li><Link to="/" className={`nav-link ${isActive('/')}`}>Home</Link></li>
                   

                    {/* Services dropdown */}
                    <li className="nav-dropdown-wrap" ref={servicesRef}>
                        <button
                            className={`nav-link nav-dropdown-trigger ${isServicesActive}`}
                            onClick={() => { setServicesOpen(o => !o); setTrainingOpen(false); }}
                        >
                            Services <ChevronDown size={13} className={servicesOpen ? 'chevron-open' : ''} />
                        </button>
                        {servicesOpen && (
                            <div className="nav-dropdown">
                                {SERVICE_TABS.map(s => (
                                    <Link key={s.tab} to={`/services?tab=${s.tab}`} className="nav-dropdown-item"
                                        onClick={() => setServicesOpen(false)}>
                                        <span className="nav-dropdown-icon">{s.icon}</span>
                                        <span>
                                            <span className="nav-dropdown-label">{s.label}</span>
                                            <span className="nav-dropdown-desc">{s.desc}</span>
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </li>

                    <li><Link to="/careers" className={`nav-link ${isActive('/careers')}`}>Careers</Link></li>

                    {/* Training dropdown */}
                    <li className="nav-dropdown-wrap" ref={trainingRef}>
                        <button
                            className={`nav-link nav-dropdown-trigger ${isTrainingActive}`}
                            onClick={() => { setTrainingOpen(o => !o); setServicesOpen(false); }}
                        >
                            Training <ChevronDown size={13} className={trainingOpen ? 'chevron-open' : ''} />
                        </button>
                        {trainingOpen && (
                            <div className="nav-training-dropdown">
                                {/* header */}
                                <div className="nav-training-header">
                                    <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                        Available Courses
                                    </span>
                                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>
                                        {courses.length} programs
                                    </span>
                                </div>

                                {/* columns */}
                                <div className="nav-training-cols">
                                    <div className="nav-training-col">
                                        {col1.map(c => (
                                            <Link key={c.id} to="/training" className="nav-training-item"
                                                onClick={() => setTrainingOpen(false)}>
                                                <span className="nav-training-emoji">{c.icon || '📘'}</span>
                                                <span>
                                                    <span className="nav-dropdown-label">{c.title}</span>
                                                    <span className="nav-dropdown-desc">{c.category} · {c.duration}</span>
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                    {col2.length > 0 && (
                                        <div className="nav-training-col">
                                            {col2.map(c => (
                                                <Link key={c.id} to="/training" className="nav-training-item"
                                                    onClick={() => setTrainingOpen(false)}>
                                                    <span className="nav-training-emoji">{c.icon || '📘'}</span>
                                                    <span>
                                                        <span className="nav-dropdown-label">{c.title}</span>
                                                        <span className="nav-dropdown-desc">{c.category} · {c.duration}</span>
                                                    </span>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* footer — show more */}
                                <div className="nav-training-footer">
                                    <Link to="/training" className="nav-training-more"
                                        onClick={() => setTrainingOpen(false)}>
                                        {hasMore
                                            ? `View all ${courses.length} courses`
                                            : 'View full course catalog'
                                        }
                                        <ArrowRight size={13} />
                                    </Link>
                                </div>
                            </div>
                        )}
                    </li>

                         <li><Link to="/about" className={`nav-link ${isActive('/about')}`}>About Us</Link></li>
                    <li><Link to="/contact" className={`nav-link ${isActive('/contact')}`}>Contact Us</Link></li>
                </ul>

                {/* Desktop Actions */}
                <div className="nav-actions" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    {authUser ? (
                        <>
                            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>Hi, {authUser.name}</span>
                            {authUser.role === 'admin' && (
                                <Link to="/admin" className="btn-ghost-dark" style={{ padding: '8px 16px', fontSize: '13px' }}>
                                    Admin
                                </Link>
                            )}
                            <button onClick={onLogout} className="btn-secondary" style={{ padding: '8px 16px', fontSize: '13px' }}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="btn-secondary" style={{ padding: '8px 16px', fontSize: '13px' }}>
                            Login
                        </Link>
                    )}
                    <Link to="/contact" className="btn-primary" style={{ padding: '8px 16px', fontSize: '13px' }}>
                        Book a Demo
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
                        {authUser && authUser.role === 'admin' && (
                            <li><Link to="/admin" className="nav-link" onClick={closeMenu}>Admin Panel</Link></li>
                        )}
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
                        <li style={{ paddingLeft: '12px', paddingBottom: '4px', fontSize: '12px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Training</li>
                        {courses.map(c => (
                            <li key={c.id} style={{ paddingLeft: '8px' }}>
                                <Link to="/training" className="nav-link" onClick={closeMenu}
                                    style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)' }}>
                                    {c.icon} {c.title}
                                </Link>
                            </li>
                        ))}
                        <li><Link to="/contact" className={`nav-link ${isActive('/contact')}`} onClick={closeMenu}>Contact Us</Link></li>
                        {authUser ? (
                            <li><button onClick={() => { onLogout(); closeMenu(); }} className="nav-link" style={{ background: 'none', border: 'none', textAlign: 'left', width: '100%', cursor: 'pointer' }}>Logout</button></li>
                        ) : (
                            <li><Link to="/login" className="nav-link" onClick={closeMenu}>Login</Link></li>
                        )}
                    </ul>
                    <div className="nav-mobile-actions">
                        <Link to="/contact" className="btn-primary" onClick={closeMenu}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            Book a Demo
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
