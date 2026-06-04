import { useSearchParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Award, Users, Briefcase, BarChart2, Database } from 'lucide-react';
import { FaDatabase, FaChartBar, FaUserTie, FaCogs, FaCloud, FaShieldAlt, FaRocket, FaCheckCircle } from 'react-icons/fa';
import { MdIntegrationInstructions, MdAnalytics, MdVerified, MdAutoGraph, MdSpeed } from 'react-icons/md';
import { BsGraphUp, BsArrowRight } from 'react-icons/bs';
import servicesBg from '../assets/services.png';
import trainingBg from '../assets/training.png';
import careersBg from '../assets/carrier.png';
import homeBg from '../assets/home.png';
import aboutBg from '../assets/about.png';

export default function Services() {
    const [searchParams] = useSearchParams();
    const activeSubTab = searchParams.get('tab') || 'data';

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [activeSubTab]);

    const serviceHighlights = [
        { icon: <FaDatabase size={24} />, title: 'Database Architecture', desc: 'SQL, PostgreSQL, MongoDB schema design and migration.', color: 'var(--color-corporate-blue)' },
        { icon: <FaCloud size={24} />, title: 'Cloud Infrastructure', desc: 'AWS, Azure, GCP deployment and management.', color: 'var(--color-evergreen-glow)' },
        { icon: <MdAnalytics size={24} />, title: 'BI & Analytics', desc: 'PowerBI, Tableau, custom dashboard solutions.', color: 'var(--color-gold)' },
        { icon: <FaCogs size={24} />, title: 'Process Automation', desc: 'Workflow automation and API integration pipelines.', color: '#9b59b6' },
        { icon: <FaShieldAlt size={24} />, title: 'Security & Compliance', desc: 'GDPR, ISO 27001 compliance and data security audits.', color: '#e05c5c' },
        { icon: <MdIntegrationInstructions size={24} />, title: 'ERP Integration', desc: 'SAP, Oracle, Microsoft Dynamics ERP implementations.', color: 'var(--color-corporate-blue)' },
    ];

    return (
        <>
        {/* Hero */}
        <section className="page-hero hero-text-clip" style={{ backgroundImage: `url(${servicesBg})` }}>
            <div className="page-hero-inner">
                <div className="badge-blue" style={{ marginBottom: '16px' }}>
                    <FaChartBar style={{ display: 'inline', marginRight: '6px' }} />
                    OUR SERVICES
                </div>
                <h1 className="display-lg">ENTERPRISE SOLUTIONS</h1>
                <p className="page-hero-sub">Review our specializations in database automation, corporate training, and staffing.</p>
            </div>
        </section>

        {/* Service Highlights Bar */}
        <section style={{ backgroundColor: 'var(--color-white)', borderBottom: '1px solid var(--color-soft-gray)', padding: '40px 0' }}>
            <div className="container">
                <div className="grid-3" style={{ gap: '24px' }}>
                    {serviceHighlights.map((s, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', padding: '16px' }}>
                            <div style={{ color: s.color, flexShrink: 0 }}>{s.icon}</div>
                            <div>
                                <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-ink)', marginBottom: '4px' }}>{s.title}</h4>
                                <p style={{ fontSize: '12px', color: 'var(--color-muted-text)', lineHeight: '1.5' }}>{s.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <div className="container section-gap">

            {/* Data Automation Tab */}
            {activeSubTab === 'data' && (
                <>
                {/* Hero Image Banner */}
                <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', marginBottom: '56px', height: '320px' }}>
                    <img src={servicesBg} alt="Data Automation" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.3)' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(2,14,49,0.95) 0%, rgba(2,14,49,0.4) 100%)' }} />
                    <div className="services-banner-content" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '40px' }}>
                        <div style={{ maxWidth: '580px' }}>
                            <div className="badge-blue" style={{ marginBottom: '16px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                <FaDatabase size={12} /> DATA AUTOMATION & BI
                            </div>
                            <h2 style={{ color: 'var(--color-white)', fontFamily: 'var(--font-ozik)', fontSize: '36px', lineHeight: 1.1, marginBottom: '16px' }}>TURN YOUR DATA INTO YOUR BIGGEST COMPETITIVE ADVANTAGE</h2>
                            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '15px', lineHeight: '1.7', marginBottom: '24px' }}>We build enterprise-grade automation pipelines and real-time BI dashboards that eliminate manual reporting and give your leadership team instant clarity.</p>
                            <Link to="/contact" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                                Get a Free Consultation <BsArrowRight />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="services-stats-grid">
                    {[
                        { value: '80%', label: 'Reduction in manual reporting time', color: 'var(--color-ai-lime)', icon: <MdSpeed size={28} /> },
                        { value: '3x', label: 'Faster business decision making', color: 'var(--color-sky-blue)', icon: <MdAutoGraph size={28} /> },
                        { value: '99.9%', label: 'Pipeline uptime guaranteed', color: 'var(--color-gold)', icon: <FaCheckCircle size={24} /> },
                        { value: '150+', label: 'Enterprise dashboards delivered', color: '#e05c5c', icon: <BarChart2 size={28} /> },
                    ].map((s, i) => (
                        <div key={i} className="card-neutral" style={{ textAlign: 'center', padding: '28px 20px' }}>
                            <div style={{ color: s.color, display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>{s.icon}</div>
                            <div style={{ fontSize: '36px', fontFamily: 'var(--font-ozik)', fontWeight: '700', color: s.color, lineHeight: 1, marginBottom: '8px' }}>{s.value}</div>
                            <p style={{ fontSize: '12px', color: 'var(--color-muted-text)', lineHeight: '1.5' }}>{s.label}</p>
                        </div>
                    ))}
                </div>

                {/* What We Do — 2 col with image */}
                <div className="grid-2" style={{ gap: '48px', alignItems: 'center', marginBottom: '56px' }}>
                    <div style={{ borderRadius: '16px', overflow: 'hidden', height: '400px' }}>
                        <img src={homeBg} alt="BI Dashboards" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                        <div className="badge-mint" style={{ marginBottom: '16px' }}>WHAT WE DELIVER</div>
                        <h2 className="display-md" style={{ textAlign: 'left', marginBottom: '20px' }}>FROM RAW DATA TO REAL-TIME INTELLIGENCE</h2>
                        <p style={{ color: 'var(--color-ink)', lineHeight: '1.8', marginBottom: '24px', fontSize: '15px' }}>
                            Most businesses are sitting on goldmines of untapped data. We extract, transform, and visualize that data into powerful dashboards your team will actually use — every single day.
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            {[
                                { icon: <FaDatabase size={16} />, title: 'Data Pipeline Engineering', desc: 'Automated ETL workflows that move, clean, and sync data across all your systems 24/7.' },
                                { icon: <BarChart2 size={16} />, title: 'PowerBI & Tableau Dashboards', desc: 'Executive-ready dashboards with live KPIs, drill-downs, and mobile access.' },
                                { icon: <FaCloud size={16} />, title: 'Cloud Data Warehousing', desc: 'AWS Redshift, Snowflake, BigQuery — we architect and manage your data lake.' },
                                { icon: <MdAutoGraph size={16} />, title: 'AI-Powered Forecasting', desc: 'Predictive models that forecast revenue, churn, and demand with high accuracy.' },
                            ].map((item, i) => (
                                <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                                    <div style={{ color: 'var(--color-corporate-blue)', marginTop: '2px', flexShrink: 0 }}>{item.icon}</div>
                                    <div>
                                        <div style={{ fontWeight: '600', fontSize: '14px', color: 'var(--color-ink)', marginBottom: '2px' }}>{item.title}</div>
                                        <div style={{ fontSize: '13px', color: 'var(--color-muted-text)', lineHeight: '1.5' }}>{item.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Process Steps */}
                <div className="services-banner-inner" style={{ backgroundColor: 'var(--color-navy-dark)', borderRadius: '16px', padding: '48px', marginBottom: '56px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <h2 style={{ color: 'var(--color-white)', fontFamily: 'var(--font-ozik)', fontSize: '28px', marginBottom: '8px' }}>OUR PROVEN 4-STEP PROCESS</h2>
                        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px' }}>From discovery to a live dashboard — typically delivered in 3–6 weeks.</p>
                    </div>
                    <div className="services-process-grid">
                        {[
                            { step: '01', title: 'Discovery & Audit', desc: 'We audit your existing data sources, tools, and reporting gaps to map the full picture.', color: 'var(--color-ai-lime)' },
                            { step: '02', title: 'Architecture Design', desc: 'Our engineers design a scalable data architecture tailored to your industry and volume.', color: 'var(--color-sky-blue)' },
                            { step: '03', title: 'Build & Automate', desc: 'We build automated pipelines, connect APIs, and configure your BI dashboard layer.', color: 'var(--color-gold)' },
                            { step: '04', title: 'Launch & Support', desc: 'Go live with full documentation, team training, and ongoing SLA-backed support.', color: '#e05c5c' },
                        ].map((p, i) => (
                            <div key={i} style={{ textAlign: 'center', padding: '8px' }}>
                                <div style={{ fontSize: '48px', fontFamily: 'var(--font-ozik)', fontWeight: '700', color: p.color, opacity: 0.3, lineHeight: 1, marginBottom: '12px' }}>{p.step}</div>
                                <h4 style={{ color: 'var(--color-white)', fontSize: '15px', fontWeight: '600', marginBottom: '8px' }}>{p.title}</h4>
                                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '12px', lineHeight: '1.6' }}>{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Technologies + CTA side by side */}
                <div className="grid-2" style={{ gap: '32px', alignItems: 'stretch', marginBottom: '56px' }}>
                    {/* Tech stack image card */}
                    <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', minHeight: '340px' }}>
                        <img src={aboutBg} alt="Technology Stack" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.28)' }} />
                        <div style={{ position: 'absolute', inset: 0, padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                            <h3 style={{ color: 'var(--color-white)', fontFamily: 'var(--font-ozik)', fontSize: '22px', marginBottom: '20px' }}>TECHNOLOGIES WE MASTER</h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                {['PowerBI', 'Tableau', 'SQL Server', 'PostgreSQL', 'Snowflake', 'AWS Redshift', 'Apache Spark', 'Python / Pandas', 'Azure Data Factory', 'dbt', 'Looker', 'MongoDB'].map((tech, i) => (
                                    <span key={i} style={{ backgroundColor: 'rgba(35,149,238,0.2)', border: '1px solid rgba(35,149,238,0.4)', color: 'var(--color-sky-blue)', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '500' }}>{tech}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* CTA Card */}
                    <div className="card-blue-premium" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '40px' }}>
                        <div>
                            <FaRocket size={36} color="var(--color-ai-lime)" style={{ marginBottom: '20px' }} />
                            <h3 style={{ color: 'var(--color-white)', fontFamily: 'var(--font-ozik)', fontSize: '24px', marginBottom: '16px', lineHeight: 1.2 }}>READY TO ELIMINATE MANUAL REPORTING FOR GOOD?</h3>
                            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', lineHeight: '1.7', marginBottom: '28px' }}>
                                Join 150+ enterprises that trust ITBEES Global to run their data infrastructure. Our consultants will analyse your current setup and show you exactly what's possible — at no cost.
                            </p>
                            <ul style={{ listStyle: 'none', marginBottom: '28px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {['Free initial data audit', 'Dashboard prototype in 7 days', 'No lock-in contracts', 'Dedicated account manager'].map((item, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'rgba(255,255,255,0.8)' }}>
                                        <FaCheckCircle size={14} color="var(--color-ai-lime)" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                            <Link to="/contact" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                                Book Free Audit <BsArrowRight />
                            </Link>
                            <a href="tel:9963186067" className="btn-ghost-dark" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                                Call Us Now
                            </a>
                        </div>
                    </div>
                </div>
                </>
            )}

            {/* Corporate Training Tab */}
            {activeSubTab === 'training' && (
                <div style={{ marginTop: '32px' }}>
                    {/* Hero Banner */}
                    <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', marginBottom: '48px', height: '300px' }}>
                        <img src={trainingBg} alt="Corporate Training" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.25)' }} />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(2,14,49,0.95) 0%, rgba(2,14,49,0.3) 100%)' }} />
                        <div className="services-banner-content" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '40px' }}>
                            <div style={{ maxWidth: '560px' }}>
                                <div className="badge-mint" style={{ marginBottom: '14px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                    <Award size={12} /> CORPORATE TRAINING
                                </div>
                                <h2 style={{ color: 'var(--color-white)', fontFamily: 'var(--font-ozik)', fontSize: '32px', lineHeight: 1.1, marginBottom: '14px' }}>UPSKILL YOUR ENTIRE TEAM — AT ENTERPRISE SCALE</h2>
                                <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '14px', lineHeight: '1.7', marginBottom: '24px' }}>Structured learning modules for IT departments with certification, live labs, and placement support — delivered by practitioners, not textbooks.</p>
                                <Link to="/training" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                                    Explore Full Catalog <BsArrowRight />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Stats Row */}
                    <div className="services-stats-grid" style={{ marginBottom: '48px' }}>
                        {[
                            { value: '5,000+', label: 'Professionals Trained', color: 'var(--color-corporate-blue)' },
                            { value: '1,200+', label: 'Certificates Issued', color: 'var(--color-evergreen-glow)' },
                            { value: '4.9/5', label: 'Average Rating', color: 'var(--color-gold)' },
                            { value: '20+', label: 'Expert Instructors', color: '#e05c5c' },
                        ].map((s, i) => (
                            <div key={i} className="card-neutral" style={{ textAlign: 'center', padding: '24px 16px' }}>
                                <div style={{ fontSize: '32px', fontFamily: 'var(--font-ozik)', fontWeight: '700', color: s.color, lineHeight: 1, marginBottom: '8px' }}>{s.value}</div>
                                <p style={{ fontSize: '12px', color: 'var(--color-muted-text)', lineHeight: '1.5' }}>{s.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Courses Highlight Grid */}
                    <div style={{ marginBottom: '48px' }}>
                        <div className="section-header" style={{ marginBottom: '32px' }}>
                            <h2 className="display-md">FEATURED TRAINING PROGRAMS</h2>
                            <p className="section-subtitle">Industry-aligned curriculum built for modern enterprise teams.</p>
                        </div>
                        <div className="grid-3">
                            {[
                                { icon: '📊', title: 'Excel & Power Query', desc: 'From formulas to automated data workflows — the productivity foundation every team needs.', tag: 'Productivity', color: 'var(--color-corporate-blue)' },
                                { icon: '📈', title: 'Power BI Dashboards', desc: 'Build live executive dashboards with DAX, data modeling and real-time KPI reporting.', tag: 'BI Analytics', color: 'var(--color-evergreen-glow)' },
                                { icon: '🐍', title: 'Python for Data Analytics', desc: 'Pandas, NumPy, and Matplotlib — hands-on projects covering real business datasets.', tag: 'Data Science', color: 'var(--color-gold)' },
                                { icon: '⚡', title: 'VBA & Excel Automation', desc: 'Write macros, build custom functions, and eliminate repetitive tasks with VBA scripting.', tag: 'Automation', color: '#9b59b6' },
                                { icon: '🗄️', title: 'SQL & Database Essentials', desc: 'Structured query language mastery for analysts, developers, and operations teams.', tag: 'Database', color: '#e05c5c' },
                                { icon: '☁️', title: 'Cloud & ERP Fundamentals', desc: 'AWS, Azure basics plus ERP module navigation for enterprise operations roles.', tag: 'Cloud', color: 'var(--color-sky-blue)' },
                            ].map((c, i) => (
                                <div key={i} className="card-neutral" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <div style={{ fontSize: '32px' }}>{c.icon}</div>
                                    <span style={{ fontSize: '11px', fontWeight: '600', color: c.color, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{c.tag}</span>
                                    <h4 className="heading-md" style={{ color: 'var(--color-ink)' }}>{c.title}</h4>
                                    <p style={{ fontSize: '13px', color: 'var(--color-muted-text)', lineHeight: '1.6', flex: 1 }}>{c.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* How It Works + Certification side by side */}
                    <div className="grid-2" style={{ alignItems: 'stretch', marginBottom: '48px', gap: '32px' }}>
                        <div>
                            <h3 className="heading-lg" style={{ marginBottom: '24px', color: 'var(--color-ink)' }}>How Our Training Works</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                {[
                                    { step: '01', title: 'Team Assessment', desc: 'We evaluate your team\'s current skill gaps and recommend the right learning path.' },
                                    { step: '02', title: 'Live & Recorded Sessions', desc: 'Instructor-led classes with recordings available for flexible self-paced learning.' },
                                    { step: '03', title: 'Hands-on Labs', desc: 'Real enterprise datasets and live coding environments — no toy examples.' },
                                    { step: '04', title: 'Quiz & Certification', desc: 'Pass the skill assessment and receive a verified digital certificate instantly.' },
                                ].map((p, i) => (
                                    <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                        <div style={{ fontSize: '20px', fontFamily: 'var(--font-ozik)', fontWeight: '700', color: 'var(--color-corporate-blue)', opacity: 0.4, lineHeight: 1, minWidth: '32px' }}>{p.step}</div>
                                        <div>
                                            <div style={{ fontWeight: '600', fontSize: '14px', color: 'var(--color-ink)', marginBottom: '4px' }}>{p.title}</div>
                                            <div style={{ fontSize: '13px', color: 'var(--color-muted-text)', lineHeight: '1.6' }}>{p.desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="card-blue-premium" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '36px' }}>
                            <div>
                                <Award size={36} color="var(--color-ai-lime)" style={{ marginBottom: '16px' }} />
                                <h3 style={{ color: 'var(--color-white)', fontFamily: 'var(--font-ozik)', fontSize: '22px', marginBottom: '12px', lineHeight: 1.2 }}>TRAIN 10 PEOPLE OR 1,000 — WE SCALE WITH YOU</h3>
                                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', lineHeight: '1.7', marginBottom: '20px' }}>Our corporate packages include dedicated instructors, custom curriculum, bulk pricing, and a dedicated account manager for your team.</p>
                                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                                    {['Custom curriculum for your tech stack', 'Bulk enrollment discounts (10+ seats)', 'Progress tracking dashboard for managers', 'Post-training placement support'].map((item, i) => (
                                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'rgba(255,255,255,0.8)' }}>
                                            <MdVerified size={14} color="var(--color-ai-lime)" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                                <Link to="/contact" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                                    Get a Corporate Quote <BsArrowRight />
                                </Link>
                                <Link to="/training" className="btn-ghost-dark" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                                    Browse Courses
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* HR Recruitment Tab */}
            {activeSubTab === 'recruitment' && (
                <div style={{ marginTop: '32px' }}>
                    {/* Hero Banner */}
                    <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', marginBottom: '48px', height: '300px' }}>
                        <img src={careersBg} alt="HR Recruitment" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.22)' }} />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(2,14,49,0.95) 0%, rgba(2,14,49,0.3) 100%)' }} />
                        <div className="services-banner-content" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '40px' }}>
                            <div style={{ maxWidth: '560px' }}>
                                <div className="badge-blue" style={{ marginBottom: '14px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                    <FaUserTie size={11} /> HR STAFFING & RECRUITMENT
                                </div>
                                <h2 style={{ color: 'var(--color-white)', fontFamily: 'var(--font-ozik)', fontSize: '32px', lineHeight: 1.1, marginBottom: '14px' }}>THE RIGHT TALENT. PLACED FAST. EVERY TIME.</h2>
                                <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '14px', lineHeight: '1.7', marginBottom: '24px' }}>We connect elite engineers, data professionals, and system architects to your operations — with pre-screened CVs, skills assessments, and full compliance checks.</p>
                                <Link to="/contact" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                                    Request Talent Now <BsArrowRight />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Stats Row */}
                    <div className="grid-4" style={{ gap: '20px', marginBottom: '48px' }}>
                        {[
                            { value: '300+', label: 'Placements Made', color: 'var(--color-corporate-blue)' },
                            { value: '48hrs', label: 'Avg. Time to Shortlist', color: 'var(--color-evergreen-glow)' },
                            { value: '95%', label: 'Client Retention Rate', color: 'var(--color-gold)' },
                            { value: '50+', label: 'Active Hiring Partners', color: '#e05c5c' },
                        ].map((s, i) => (
                            <div key={i} className="card-neutral" style={{ textAlign: 'center', padding: '24px 16px' }}>
                                <div style={{ fontSize: '32px', fontFamily: 'var(--font-ozik)', fontWeight: '700', color: s.color, lineHeight: 1, marginBottom: '8px' }}>{s.value}</div>
                                <p style={{ fontSize: '12px', color: 'var(--color-muted-text)', lineHeight: '1.5' }}>{s.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Role Types */}
                    <div style={{ marginBottom: '48px' }}>
                        <div className="section-header" style={{ marginBottom: '32px' }}>
                            <h2 className="display-md">ROLES WE FILL</h2>
                            <p className="section-subtitle">Specialized talent across every layer of your tech stack.</p>
                        </div>
                        <div className="grid-3">
                            {[
                                { icon: <FaRocket size={24} />, title: 'Frontend Engineers', desc: 'React, Vue, TypeScript developers for dashboard-heavy and product-focused builds.', color: 'var(--color-corporate-blue)' },
                                { icon: <Database size={24} />, title: 'Data & BI Analysts', desc: 'SQL experts, Power BI developers, and Python data engineers for analytics teams.', color: 'var(--color-evergreen-glow)' },
                                { icon: <FaCogs size={24} />, title: 'ERP Consultants', desc: 'SAP, Oracle, and Microsoft Dynamics specialists for enterprise implementations.', color: 'var(--color-gold)' },
                                { icon: <FaCloud size={24} />, title: 'Cloud & DevOps', desc: 'AWS, Azure, GCP engineers and CI/CD pipeline architects for scalable infra.', color: '#9b59b6' },
                                { icon: <FaShieldAlt size={24} />, title: 'Security & Compliance', desc: 'GDPR, ISO 27001, and VAPT professionals for regulated industries.', color: '#e05c5c' },
                                { icon: <Users size={24} />, title: 'HR & Ops Specialists', desc: 'Talent acquisition, L&D managers, and HR tech operators for growing teams.', color: 'var(--color-sky-blue)' },
                            ].map((r, i) => (
                                <div key={i} className="card-neutral" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    <div style={{ color: r.color }}>{r.icon}</div>
                                    <h4 className="heading-md" style={{ color: 'var(--color-ink)' }}>{r.title}</h4>
                                    <p style={{ fontSize: '13px', color: 'var(--color-muted-text)', lineHeight: '1.6', flex: 1 }}>{r.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Process + CTA */}
                    <div className="grid-2" style={{ alignItems: 'stretch', gap: '32px', marginBottom: '48px' }}>
                        <div>
                            <h3 className="heading-lg" style={{ marginBottom: '24px', color: 'var(--color-ink)' }}>Our Recruitment Process</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                {[
                                    { step: '01', title: 'Requirement Briefing', desc: 'We understand your role, team culture, tech stack, and timeline in a 30-min discovery call.' },
                                    { step: '02', title: 'Sourcing & Screening', desc: 'We tap our pre-vetted talent pool and run skills assessments before sharing CVs.' },
                                    { step: '03', title: 'Shortlist Delivery', desc: 'You receive 3–5 qualified profiles with assessment scores within 48 hours.' },
                                    { step: '04', title: 'Interview & Onboarding', desc: 'We coordinate interviews, manage offers, and support onboarding to Day 1.' },
                                ].map((p, i) => (
                                    <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                        <div style={{ fontSize: '20px', fontFamily: 'var(--font-ozik)', fontWeight: '700', color: 'var(--color-corporate-blue)', opacity: 0.4, lineHeight: 1, minWidth: '32px' }}>{p.step}</div>
                                        <div>
                                            <div style={{ fontWeight: '600', fontSize: '14px', color: 'var(--color-ink)', marginBottom: '4px' }}>{p.title}</div>
                                            <div style={{ fontSize: '13px', color: 'var(--color-muted-text)', lineHeight: '1.6' }}>{p.desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="card-blue-premium" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '36px' }}>
                            <div>
                                <FaUserTie size={36} color="var(--color-gold)" style={{ marginBottom: '16px' }} />
                                <h3 style={{ color: 'var(--color-white)', fontFamily: 'var(--font-ozik)', fontSize: '22px', marginBottom: '12px', lineHeight: 1.2 }}>HIRE FASTER. HIRE SMARTER. NO COMPROMISE.</h3>
                                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', lineHeight: '1.7', marginBottom: '20px' }}>Whether you need one senior engineer or an entire project team, our recruiters are trained to find talent that fits both technically and culturally.</p>
                                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                                    {['Pre-screened, assessment-verified CVs', 'Permanent, contract & lease-to-hire models', 'Background verification & compliance included', 'Dedicated HR account manager assigned'].map((item, i) => (
                                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'rgba(255,255,255,0.8)' }}>
                                            <MdVerified size={14} color="var(--color-ai-lime)" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                                <Link to="/contact" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                                    Submit a Hiring Brief <BsArrowRight />
                                </Link>
                                <Link to="/careers" className="btn-ghost-dark" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                                    View Open Roles
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
        </>
    );
}
