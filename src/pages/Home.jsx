import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Database, ChevronRight, BookOpen, BarChart2, Phone, MessageSquare, Play } from 'lucide-react';
import { FaCloud, FaShieldAlt, FaRocket, FaHandshake, FaUsers } from 'react-icons/fa';
import { MdOutlineSupport, MdIntegrationInstructions, MdVerified } from 'react-icons/md';
import { BsArrowRight, BsStarFill } from 'react-icons/bs';
import { HiLightningBolt } from 'react-icons/hi';
import homeBg from '../assets/home.png';
import aboutImg from '../assets/about.png';
import chartsImg from '../assets/charts.png';

import { publicApi } from '../utils/api.js';

export default function Home({ setInquiries, triggerToast }) {
    const [inqName, setInqName] = useState('');
    const [inqEmail, setInqEmail] = useState('');
    const [inqMessage, setInqMessage] = useState('');
    const [inqLoading, setInqLoading] = useState(false);
    const [videoPlaying, setVideoPlaying] = useState(false);
    const YT_ID = 'XzplaeSyYjQ';

    const handleQuickInquiry = async (e) => {
        e.preventDefault();
        if (!inqName || !inqEmail || !inqMessage) { alert('Please fill out all fields.'); return; }
        setInqLoading(true);
        try {
            const response = await publicApi.submitInquiry({ name: inqName, email: inqEmail, subject: 'Website Inquiry', message: inqMessage });
            setInquiries(prev => [response.data, ...prev]);
            triggerToast('Thank you! Inquiry submitted successfully.');
            setInqName(''); setInqEmail(''); setInqMessage('');
        } catch (err) {
            console.error(err);
            alert('Failed to submit inquiry. Please try again.');
        } finally {
            setInqLoading(false);
        }
    };

    const whyUs = [
        { icon: <FaCloud size={28} />, title: 'Cloud-First Architecture', desc: 'Scalable, secure cloud infrastructure built for enterprise workloads.', color: 'var(--color-corporate-blue)' },
        { icon: <FaShieldAlt size={28} />, title: 'Enterprise Security', desc: 'End-to-end encryption and compliance with global data standards.', color: 'var(--color-evergreen-glow)' },
        { icon: <HiLightningBolt size={28} />, title: 'Lightning Fast Delivery', desc: 'Rapid deployment cycles with zero downtime migrations.', color: 'var(--color-gold)' },
        { icon: <MdOutlineSupport size={28} />, title: '24/7 Expert Support', desc: 'Dedicated support engineers available round the clock.', color: '#e05c5c' },
        { icon: <MdIntegrationInstructions size={28} />, title: 'Seamless Integration', desc: 'Connect with 100+ enterprise tools and APIs out of the box.', color: '#9b59b6' },
        { icon: <FaHandshake size={28} />, title: 'Trusted Partnerships', desc: '150+ enterprise clients across India and Southeast Asia.', color: 'var(--color-corporate-blue)' },
    ];

    return (
        <>
            {/* Hero Section */}
            <section className="page-hero hero-text-clip" style={{ backgroundImage: `url(${homeBg})` }}>
                <div className="page-hero-inner ">
                    <div className="hero-badge">
                        <span className="hero-badge-dot"></span>
                        MANAGING SYSTEMS IN THE AGE OF AI
                    </div>
                    <h1 className="display-lg" style={{ lineHeight: '1' }}>
                        ACCELERATE BUSINESS WITH SMART CLOUD & DATA ANALYTICS
                    </h1>
                    <p className="page-hero-sub">
                        Integrate next-gen ERP Solutions, automate critical pipelines, and build visual dashboards with ITBEES Global's smart infrastructure.
                    </p>
                    <div className="hero-btns" style={{ marginTop: 'var(--spacing-40)' }}>
                        <Link to="/contact" className="btn-primary">📅 Book a Free Demo</Link>
                        <Link to="/services" className="btn-ghost-dark">Explore Our Services</Link>
                    </div>
                </div>
            </section>

            {/* Trust Bar */}
            <section style={{ backgroundColor: 'var(--color-navy-dark)', padding: '24px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="container">
                    <div className="trust-bar-flex" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '32px', flexWrap: 'wrap' }}>
                        {[
                            { icon: <MdVerified size={18} />, text: 'ISO Certified' },
                            { icon: <FaShieldAlt size={16} />, text: 'GDPR Compliant' },
                            { icon: <FaUsers size={16} />, text: '150+ Enterprise Clients' },
                            { icon: <BsStarFill size={14} />, text: '4.9/5 Client Rating' },
                            { icon: <FaRocket size={16} />, text: '99.98% Uptime SLA' },
                        ].map((item, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.7)', fontSize: '13px', whiteSpace: 'nowrap' }}>
                                <span style={{ color: 'var(--color-ai-lime)' }}>{item.icon}</span>
                                {item.text}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <style>{`
                @media (max-width: 768px) {
                    .trust-bar-flex { gap: 16px 24px !important; }
                }
            `}</style>

            {/* YouTube Video — 2 col */}
            <section style={{ backgroundColor: 'var(--color-navy-dark)', padding: '64px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="container">
                    <div className="grid-2" style={{ alignItems: 'center', gap: '48px' }}>
                        <div>
                            <div className="badge-mint" style={{ marginBottom: '16px' }}>WATCH US IN ACTION</div>
                            <h2 className="display-md" style={{ color: 'var(--color-white)', textAlign: 'left', marginBottom: '16px' }}>SEE HOW ITBEES TRANSFORMS BUSINESSES</h2>
                            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', lineHeight: '1.8', marginBottom: '24px' }}>
                                A quick walkthrough of our ERP solutions, BI dashboards, and cloud infrastructure in real enterprise environments.
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {[
                                    'End-to-end ERP integration & automation',
                                    'Live BI dashboards with real-time data',
                                    'Cloud infrastructure built for scale',
                                ].map((point, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'rgba(255,255,255,0.75)' }}>
                                        <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(104,239,63,0.15)', border: '1px solid var(--color-ai-lime)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-ai-lime)', display: 'block' }} />
                                        </span>
                                        {point}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,0,0,0.5)', aspectRatio: '16/9' }}>
                            {!videoPlaying ? (
                                <>
                                    <img src={`https://img.youtube.com/vi/${YT_ID}/maxresdefault.jpg`} alt="Video preview" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(2,14,49,0.45)' }} />
                                    <button onClick={() => setVideoPlaying(true)} style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer' }}>
                                        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(255,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 32px rgba(255,0,0,0.4)', transition: 'transform 0.2s' }}
                                            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                                            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                        >
                                            <Play size={26} color="#fff" fill="#fff" style={{ marginLeft: '4px' }} />
                                        </div>
                                    </button>
                                </>
                            ) : (
                                <iframe src={`https://www.youtube.com/embed/${YT_ID}?autoplay=1&rel=0&enablejsapi=1`} title="ITBEES Global Introduction" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }} />
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Showcase Cards */}
            <section className="section-gap" style={{ backgroundColor: 'var(--color-white)' }}>
                <div className="container">
                    <div className="section-header">
                        <h2 className="display-md">OUR CORE MODULES</h2>
                        <p className="section-subtitle">We deliver premium architecture for your digital transformation goals.</p>
                    </div>
                    <div className="grid-3">
                        {[
                            { icon: <Database size={32} />, color: 'var(--color-corporate-blue)', title: 'Smart Cloud & ERP', desc: 'Integrate unified databases, configure global API systems, and automate standard workflows across operations, finance, and support.', to: '/services', cta: 'Learn More' },
                            { icon: <BarChart2 size={32} />, color: 'var(--color-evergreen-glow)', title: 'BI Analytics & Reports', desc: 'Synthesize massive volumes of transactional data. Track metrics and generate instant executive dashboards.', to: '/services', cta: 'Learn More' },
                            { icon: <BookOpen size={32} />, color: 'var(--color-gold)', title: 'Corporate Training', desc: 'Skill up your teams with tailored courses on Cloud infrastructure, Power BI dashboards, and data analytics.', to: '/training', cta: 'Explore Courses' },
                        ].map((c, i) => (
                            <div key={i} className="card-neutral" style={{ gap: '10px', padding: '24px' }}>
                                <div style={{ color: c.color }}>{c.icon}</div>
                                <h3 className="heading-lg" style={{ marginBottom: '6px', fontSize: '18px' }}>{c.title}</h3>
                                <p style={{ color: 'var(--color-ink)', flex: 1, fontSize: '13px', lineHeight: '1.6' }}>{c.desc}</p>
                                <Link to={c.to} className="btn-mini" style={{ color: c.color, alignSelf: 'flex-start', paddingLeft: 0, marginTop: '8px', fontWeight: 700, fontSize: '13px' }}>
                                    {c.cta} <ChevronRight size={14} style={{ display: 'inline', verticalAlign: 'middle' }} />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Image + Content Split */}
            <section className="section-gap" style={{ backgroundColor: 'var(--color-light-canvas)', borderTop: '1px solid var(--color-soft-gray)' }}>
                <div className="container">
                    <div className="grid-2" style={{ alignItems: 'center', gap: '48px' }}>
                        <div style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}>
                            <img src={aboutImg} alt="ITBEES Global Office" className="img-responsive" style={{ height: 'auto', minHeight: '320px' }} />
                        </div>
                        <div>
                            <div className="badge-mint" style={{ marginBottom: '16px' }}>ABOUT ITBEES GLOBAL</div>
                            <h2 className="display-md" style={{ textAlign: 'left', marginBottom: '20px' }}>POWERING ENTERPRISE DIGITAL TRANSFORMATION</h2>
                            <p style={{ color: 'var(--color-ink)', lineHeight: '1.8', marginBottom: '20px', fontSize: '15px' }}>
                                Based in Gachibowli, Hyderabad, ITBEES Global is a premier enterprise technology partner delivering ERP solutions, BI analytics, and corporate training programs to 150+ clients across India.
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                                {['10+ years of enterprise experience', 'Certified cloud architects & data engineers', 'End-to-end project delivery with SLA guarantees'].map((item, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--color-ink)' }}>
                                        <MdVerified size={18} color="var(--color-evergreen-glow)" />
                                        {item}
                                    </div>
                                ))}
                            </div>
                            <Link to="/about" className="btn-primary">
                                Learn More About Us <BsArrowRight style={{ display: 'inline', marginLeft: '6px' }} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="section-gap" style={{ backgroundColor: 'var(--color-white)' }}>
                <div className="container">
                    <div className="section-header">
                        <h2 className="display-md">WHY CHOOSE ITBEES GLOBAL?</h2>
                        <p className="section-subtitle">Six reasons why leading enterprises trust us with their digital infrastructure.</p>
                    </div>
                    <div className="grid-3">
                        {whyUs.map((item, i) => (
                            <div key={i} className="card-neutral" style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '20px' }}>
                                <div style={{ color: item.color }}><item.icon.type size={22} {...item.icon.props} /></div>
                                <h4 style={{ fontWeight: 600, fontSize: '14px', color: 'var(--color-ink)' }}>{item.title}</h4>
                                <p style={{ fontSize: '12px', color: 'var(--color-muted-text)', lineHeight: '1.6' }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Statistics */}
            <section className="section-gap" style={{ backgroundColor: 'var(--color-light-canvas)', borderTop: '1px solid var(--color-soft-gray)', borderBottom: '1px solid var(--color-soft-gray)' }}>
                <div className="container">
                    <div className="grid-2" style={{ alignItems: 'center', gap: '48px' }}>
                        <div>
                            <div className="badge-mint" style={{ marginBottom: '16px' }}>REAL-TIME ANALYTICS DEMONSTRATION</div>
                            <h2 className="display-md" style={{ marginBottom: '24px', textAlign: 'left' }}>LIVE INSIGHTS WITH INTERACTIVE GRAPHS</h2>
                            <p style={{ color: 'var(--color-ink)', marginBottom: '24px', fontSize: '15px', lineHeight: '1.7' }}>
                                Our modern business intelligence tools represent complex server operations in absolute clean visuals. Observe database sync speeds, payment processing volumes, and cloud instance statuses instantly.
                            </p>
                            <div className="grid-3" style={{ gap: '24px' }}>
                                <div>
                                    <h4 style={{ fontSize: '32px', fontFamily: 'var(--font-ozik)', color: 'var(--color-corporate-blue)' }}>99.98%</h4>
                                    <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-muted-text)' }}>Cloud Uptime</p>
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '32px', fontFamily: 'var(--font-ozik)', color: 'var(--color-evergreen-glow)' }}>3.4M+</h4>
                                    <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-muted-text)' }}>Daily Operations</p>
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '32px', fontFamily: 'var(--font-ozik)', color: 'var(--color-gold)' }}>150+</h4>
                                    <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-muted-text)' }}>Enterprise Clients</p>
                                </div>
                            </div>
                        </div>
                        <div style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}>
                            <img src={chartsImg} alt="Analytics Charts" className="img-responsive" style={{ width: '100%', height: 'auto', display: 'block' }} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="section-gap" style={{ backgroundColor: 'var(--color-white)' }}>
                <div className="container">
                    <div className="section-header">
                        <h2 className="display-md">TRUSTED BY INDUSTRY LEADERS</h2>
                        <p className="section-subtitle">Read how our modules have empowered engineering and management operations.</p>
                    </div>
                    <div className="grid-2">
                        {[
                            { quote: '"ITBEES Global transformed our entire client database sync workflow. The ERP integration resolved legacy latency errors, reducing client support inquiries by nearly 40%."', name: 'Rajesh Varma', role: 'CTO, Deccan Logistics Ltd.' },
                            { quote: '"The corporate training on cloud architecture and PowerBI was spectacular. Our team scaled rapidly and we generated live analytics dashboards within just a few weeks."', name: 'Malini Sen', role: 'Director of HR, FinScale Systems' }
                        ].map((t, i) => (
                            <div key={i} className="card-neutral" style={{ padding: '22px', gap: '12px', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', gap: '3px' }}>
                                    {[...Array(5)].map((_, j) => <BsStarFill key={j} size={12} color="var(--color-gold)" />)}
                                </div>
                                <p className="font-instrument" style={{ fontSize: '14px', color: 'var(--color-dark-olive)', fontStyle: 'italic', lineHeight: '1.6', flex: 1 }}>{t.quote}</p>
                                <div style={{ borderTop: '1px solid var(--color-soft-gray)', paddingTop: '12px' }}>
                                    <h5 style={{ fontFamily: 'var(--font-aeonik)', fontWeight: '600', fontSize: '13px' }}>{t.name}</h5>
                                    <p style={{ fontSize: '11px', color: 'var(--color-muted-text)' }}>{t.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Direct CTAs */}
            <section style={{ background: 'var(--color-navy-dark)', padding: 'var(--spacing-48) 0', borderTop: '1px solid rgba(35,149,238,0.12)' }}>
                <div className="container">
                    <div className="cta-banner">
                        <div>
                            <h3 className="heading-lg" style={{ color: 'var(--color-white)' }}>HAVE URGENT BUSINESS CONSULTATIONS?</h3>
                            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', marginTop: '6px' }}>Click to call our Gachibowli office directly or reach out on WhatsApp.</p>
                        </div>
                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                            <a href="tel:9963186067" className="btn-ghost-dark"><Phone size={16} /> Call Now</a>
                            <a href="https://wa.me/9963186067" className="btn-primary"><MessageSquare size={16} /> WhatsApp Us</a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}