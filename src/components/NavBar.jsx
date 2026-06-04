import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
    
    // Mobile dropdown states
    const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
    const [mobileTrainingOpen, setMobileTrainingOpen] = useState(false);
    const [mobileShowAllCourses, setMobileShowAllCourses] = useState(false);

    const MOBILE_COURSES_LIMIT = 5;

    const navRef         = useRef(null);
    const servicesRef    = useRef(null);
    const trainingRef    = useRef(null);
    const navigate       = useNavigate();

    const scrollToCourse = (courseId) => {
        setTrainingOpen(false);
        setMenuOpen(false);
        if (location.pathname === '/training') {
            const el = document.getElementById(`course-${courseId}`);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            navigate(`/training#course-${courseId}`);
        }
    };

    const isActive = (path) => location.pathname === path ? 'active' : '';
    const isServicesActive = location.pathname === '/services' ? 'active' : '';
    const isTrainingActive = location.pathname === '/training'  ? 'active' : '';

    const closeMenu = () => {
        setMenuOpen(false);
        setMobileServicesOpen(false);
        setMobileTrainingOpen(false);
        setMobileShowAllCourses(false);
    };

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
            if (menuOpen && navRef.current && !navRef.current.contains(e.target)) closeMenu();
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [menuOpen]);

    /* close both when route changes */
    useEffect(() => { setServicesOpen(false); setTrainingOpen(false); setMenuOpen(false); }, [location]);

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
                        <span className="logo-tagline">Smart Cloud · BI Analytics · ERP Solutions</span>
                    </div>
                </Link>

                {/* Desktop Links */}
                <ul className="nav-links">
                    <li><Link to="/" className={`nav-link ${isActive('/')}`}>Home</Link></li>
                   

                    {/* Services dropdown */}
                    <li className="nav-dropdown-wrap" ref={servicesRef}
                        onMouseEnter={() => { setServicesOpen(true); setTrainingOpen(false); }}
                        onMouseLeave={() => setServicesOpen(false)}>
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
                    <li className="nav-dropdown-wrap" ref={trainingRef}
                        onMouseEnter={() => { setTrainingOpen(true); setServicesOpen(false); }}
                        onMouseLeave={() => setTrainingOpen(false)}>
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
                                            <button key={c.id} className="nav-training-item" style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', padding: 0 }}
                                                onClick={() => scrollToCourse(c.id)}>
                                                <span className="nav-training-emoji">{c.icon || '📘'}</span>
                                                <span>
                                                    <span className="nav-dropdown-label">{c.title}</span>
                                                    <span className="nav-dropdown-desc">{c.category} · {c.duration}</span>
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                    {col2.length > 0 && (
                                        <div className="nav-training-col">
                                            {col2.map(c => (
                                                <button key={c.id} className="nav-training-item" style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', padding: 0 }}
                                                    onClick={() => scrollToCourse(c.id)}>
                                                    <span className="nav-training-emoji">{c.icon || '📘'}</span>
                                                    <span>
                                                        <span className="nav-dropdown-label">{c.title}</span>
                                                        <span className="nav-dropdown-desc">{c.category} · {c.duration}</span>
                                                    </span>
                                                </button>
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
                    {authUser && authUser.role === 'admin' ? (
                        <>
                            <Link to="/admin" className="btn-ghost-dark" style={{ padding: '8px 16px', fontSize: '13px' }}>
                                Dashboard
                            </Link>
                            <button onClick={onLogout} className="btn-secondary" style={{ padding: '8px 16px', fontSize: '13px' }}>
                                Logout
                            </button>
                        </>
                    ) : null}
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

                        {/* Services accordion */}
                        <li>
                            <button
                                className="nav-mobile-accordion-btn"
                                onClick={() => setMobileServicesOpen(o => !o)}
                            >
                                <span>Services</span>
                                <ChevronDown size={14} style={{ transition: 'transform 0.2s', transform: mobileServicesOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                            </button>
                            {mobileServicesOpen && (
                                <ul className="nav-mobile-sub">
                                    {SERVICE_TABS.map(s => (
                                        <li key={s.tab}>
                                            <Link to={`/services?tab=${s.tab}`} className="nav-mobile-sub-link" onClick={closeMenu}>
                                                <span className="nav-mobile-sub-icon">{s.icon}</span>
                                                <span>
                                                    <span className="nav-mobile-sub-label">{s.label}</span>
                                                    <span className="nav-mobile-sub-desc">{s.desc}</span>
                                                </span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>

                        <li><Link to="/careers" className={`nav-link ${isActive('/careers')}`} onClick={closeMenu}>Careers</Link></li>

                        {/* Training accordion */}
                        <li>
                            <button
                                className="nav-mobile-accordion-btn"
                                onClick={() => { setMobileTrainingOpen(o => !o); setMobileShowAllCourses(false); }}
                            >
                                <span>Training</span>
                                <ChevronDown size={14} style={{ transition: 'transform 0.2s', transform: mobileTrainingOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                            </button>
                            {mobileTrainingOpen && (
                                <ul className="nav-mobile-sub">
                                    {(mobileShowAllCourses ? courses : courses.slice(0, MOBILE_COURSES_LIMIT)).map(c => (
                                        <li key={c.id}>
                                            <button className="nav-mobile-sub-link" style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}
                                                onClick={() => scrollToCourse(c.id)}>
                                                <span className="nav-mobile-sub-icon" style={{ fontSize: '16px' }}>{c.icon || '📘'}</span>
                                                <span>
                                                    <span className="nav-mobile-sub-label">{c.title}</span>
                                                    <span className="nav-mobile-sub-desc">{c.category} · {c.duration}</span>
                                                </span>
                                            </button>
                                        </li>
                                    ))}
                                    {courses.length > MOBILE_COURSES_LIMIT && !mobileShowAllCourses && (
                                        <li>
                                            <button
                                                className="nav-mobile-view-more"
                                                onClick={() => setMobileShowAllCourses(true)}
                                            >
                                                View {courses.length - MOBILE_COURSES_LIMIT} more courses <ArrowRight size={12} />
                                            </button>
                                        </li>
                                    )}
                                    {mobileShowAllCourses && (
                                        <li>
                                            <Link to="/training" className="nav-mobile-view-more" onClick={closeMenu}>
                                                View full catalog <ArrowRight size={12} />
                                            </Link>
                                        </li>
                                    )}
                                </ul>
                            )}
                        </li>

                        <li><Link to="/about" className={`nav-link ${isActive('/about')}`} onClick={closeMenu}>About Us</Link></li>
                        <li><Link to="/contact" className={`nav-link ${isActive('/contact')}`} onClick={closeMenu}>Contact Us</Link></li>
                        {authUser && authUser.role === 'admin' && (
                            <li><button onClick={() => { onLogout(); closeMenu(); }} className="nav-link" style={{ background: 'none', border: 'none', textAlign: 'left', width: '100%', cursor: 'pointer' }}>Logout Admin</button></li>
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
