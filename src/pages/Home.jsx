import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Database, ChevronRight, BookOpen, BarChart2, Phone, MessageSquare } from 'lucide-react';
import { FaCloud, FaShieldAlt, FaRocket, FaHandshake, FaChartLine, FaUsers } from 'react-icons/fa';
import { MdOutlineSupport, MdIntegrationInstructions, MdVerified } from 'react-icons/md';
import { BsArrowRight, BsStarFill } from 'react-icons/bs';
import { HiLightningBolt } from 'react-icons/hi';
import homeBg from '../assets/home.png';
import aboutImg from '../assets/about.png';

import { publicApi } from '../utils/api.js';

export default function Home({ setInquiries, triggerToast }) {
    const [inqName, setInqName] = useState('');
    const [inqEmail, setInqEmail] = useState('');
    const [inqMessage, setInqMessage] = useState('');
    const [inqLoading, setInqLoading] = useState(false);

    const handleQuickInquiry = async (e) => {
        e.preventDefault();
        if (!inqName || !inqEmail || !inqMessage) {
            alert('Please fill out all fields.');
            return;
        }
        setInqLoading(true);
        try {
            const response = await publicApi.submitInquiry({
                name: inqName,
                email: inqEmail,
                subject: 'Website Inquiry',
                message: inqMessage
            });
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
        <div>
            {/* Hero Section */}
            <section className="page-hero" style={{ backgroundImage: `url(${homeBg})` }}>
                <div className="page-hero-inner">
                    <div className="hero-badge">
                        <span className="hero-badge-dot"></span>
                        MANAGING SYSTEMS IN THE AGE OF AI
                    </div>
                    <h1 className="display-lg ">
                        ACCELERATE BUSINESS WITH SMART CLOUD & DATA ANALYTICS
                    </h1>
                    <p className="page-hero-sub">
                        Integrate next-gen ERP Solutions, automate critical pipelines, and build visual dashboards with ITBEES Global's smart infrastructure.
                    </p>
                    <div className="hero-btns" style={{ marginTop: 'var(--spacing-40)' }}>
                        <Link to="/contact" className="btn-primary">
                            📅 Book a Free Demo
                        </Link>
                        <Link to="/services" className="btn-ghost-dark">
                            Explore Our Services
                        </Link>
                    </div>
                </div>
            </section>

            {/* Trust Bar */}
            <section style={{ backgroundColor: 'var(--color-navy-dark)', padding: '20px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '48px', flexWrap: 'wrap' }}>
                        {[
                            { icon: <MdVerified size={18} />, text: 'ISO Certified' },
                            { icon: <FaShieldAlt size={16} />, text: 'GDPR Compliant' },
                            { icon: <FaUsers size={16} />, text: '150+ Enterprise Clients' },
                            { icon: <BsStarFill size={14} />, text: '4.9/5 Client Rating' },
                            { icon: <FaRocket size={16} />, text: '99.98% Uptime SLA' },
                        ].map((item, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.7)', fontSize: '13px' }}>
                                <span style={{ color: 'var(--color-ai-lime)' }}>{item.icon}</span>
                                {item.text}
                            </div>
                        ))}
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
                        <div className="card-blue-premium">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                                <h4 style={{ fontFamily: 'var(--font-aeonik)', fontWeight: '600' }}>Cloud System Monitors</h4>
                                <span className="badge-dark-accent">LIVE REFRESH</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {[
                                    { label: 'CPU LOAD', value: '48%', width: '48%', color: 'var(--color-ai-lime)', status: 'Optimal' },
                                    { label: 'DATABASE SYNC LATENCY', value: '12ms', width: '20%', color: 'var(--color-sky-blue)', status: '' },
                                    { label: 'API ROUTING LOADS', value: '82% Capacity', width: '82%', color: 'var(--color-gold)', status: '' },
                                ].map((bar, i) => (
                                    <div key={i}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                                            <span>{bar.label}</span>
                                            <span style={{ color: bar.color }}>{bar.value}{bar.status ? ` (${bar.status})` : ''}</span>
                                        </div>
                                        <div style={{ height: '6px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                                            <div style={{ width: bar.width, height: '100%', backgroundColor: bar.color }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div style={{ marginTop: '24px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--color-light-text)' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FaChartLine size={12} /> DB Status: Connected</span>
                                <span>Active Transactions: 812/sec</span>
                            </div>
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

            {/* Quick Contact Form CTA */}
            <section className="section-gap" style={{ backgroundColor: 'var(--color-light-canvas)', borderTop: '1px solid var(--color-soft-gray)' }}>
                <div className="container">
                    <div className="card-floating" style={{ backgroundColor: 'var(--color-white)' }}>
                        <h2 className="display-md" style={{ marginBottom: '16px', textAlign: 'center' }}>REQUEST A TAILORED PROPOSAL</h2>
                        <p style={{ color: 'var(--color-muted-text)', textAlign: 'center', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px auto' }}>
                            Share your business needs, and our lead consultants will analyze your system constraints and reply within one business day.
                        </p>
                        <form onSubmit={handleQuickInquiry} style={{ maxWidth: '600px', margin: '0 auto' }}>
                            <div className="form-group">
                                <label className="form-label">Your Name</label>
                                <input type="text" className="input-field" placeholder="e.g. Vikram Seth" value={inqName} onChange={(e) => setInqName(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Business Email</label>
                                <input type="email" className="input-field" placeholder="e.g. name@company.com" value={inqEmail} onChange={(e) => setInqEmail(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Message / Requirements</label>
                                <textarea className="input-field" rows="4" style={{ borderRadius: '16px', resize: 'vertical' }} placeholder="Tell us about your ERP, Cloud, BI, or Corporate training requirements..." value={inqMessage} onChange={(e) => setInqMessage(e.target.value)}></textarea>
                            </div>
                            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '14px' }} disabled={inqLoading}>
                                {inqLoading ? 'Sending...' : 'Submit Consultation Request'}
                            </button>
                        </form>
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
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <a href="tel:9963186067" className="btn-ghost-dark">
                                <Phone size={16} /> Call Now
                            </a>
                            <a href="https://wa.me/9963186067" className="btn-primary">
                                <MessageSquare size={16} /> WhatsApp Us
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
