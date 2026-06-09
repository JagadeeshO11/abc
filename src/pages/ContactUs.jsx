import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MapPin, Phone, Mail, CheckCircle, Send, ArrowUpRight, Play } from 'lucide-react';
import { FaWhatsapp, FaLinkedin, FaTwitter, FaYoutube, FaInstagram, FaFacebook, FaClock, FaHeadset, FaBuilding, FaUserTie, FaChalkboardTeacher } from 'react-icons/fa';
import { MdVerified, MdSupportAgent, MdBusiness } from 'react-icons/md';
import { BsArrowRight, BsStarFill, BsCheckCircleFill } from 'react-icons/bs';
import contactBg from '../assets/contact.png';
import logo from '../assets/logo.png';

const IconBox = ({ icon, color }) => (
    <div style={{ width: 38, height: 38, borderRadius: 8, flexShrink: 0, background: `${color}18`, color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
);

/* Clickable card wrapper — shows pointer, lift on hover, slight scale on active */
const ClickCard = ({ href, color, children, style = {} }) => {
    const [hov, setHov] = useState(false);
    return (
        <a href={href} style={{ textDecoration: 'none', display: 'flex' }}>
            <div
                style={{
                    display: 'flex', flexDirection: 'column', gap: 8,
                    padding: '18px 16px', borderRadius: 10,
                    border: `1px solid ${hov ? color : 'var(--color-soft-gray)'}`,
                    backgroundColor: hov ? `${color}08` : 'var(--color-light-canvas)',
                    transition: 'all 0.18s ease',
                    transform: hov ? 'translateY(-2px)' : 'none',
                    cursor: 'pointer', width: '100%', ...style
                }}
                onMouseEnter={() => setHov(true)}
                onMouseLeave={() => setHov(false)}
            >
                {children}
            </div>
        </a>
    );
};

import { publicApi } from '../utils/api.js';

export default function ContactUs({ setInquiries, triggerToast }) {
    const location = useLocation();
    const [form, setForm] = useState({ name: '', email: '', company: '', phone: '', service: '', message: '' });
    const [videoPlaying, setVideoPlaying] = useState(false);
    const YT_ID = 'gNYtC0swvaw';
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

    /* Scroll to SEND A MESSAGE form when URL has #send-message hash */
    useEffect(() => {
        if (location.hash === '#send-message') {
            const scrollToForm = () => {
                const el = document.getElementById('send-message');
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            };
            // Try immediately, then again after a short delay to ensure DOM is ready
            scrollToForm();
            const t1 = setTimeout(scrollToForm, 50);
            const t2 = setTimeout(scrollToForm, 250);
            return () => { clearTimeout(t1); clearTimeout(t2); };
        }
    }, [location]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) { alert('Please fill in Name, Email, and Message.'); return; }
        setIsSubmitting(true);
        try {
            const response = await publicApi.submitInquiry({
                name: form.name,
                email: form.email,
                phone: form.phone || undefined,
                company: form.company || undefined,
                subject: form.service || 'General Enquiry',
                message: form.message
            });
            setInquiries(prev => [response.data, ...prev]);
            triggerToast("Message sent! We'll get back to you within 24 hours.");
            setForm({ name: '', email: '', company: '', phone: '', service: '', message: '' });
            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 5000);
        } catch (err) {
            alert(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactCards = [
        { icon: <Phone size={18} />, label: 'Call Us', value: '+91 9963186067', sub: 'Mon–Sat, 9AM–6PM IST', href: 'tel:9963186067', color: 'var(--color-corporate-blue)' },
        { icon: <Mail size={18} />, label: 'Email Us', value: 'support@itbeesglobal.com', sub: 'Reply within 1 business day', href: 'mailto:support@itbeesglobal.com', color: 'var(--color-evergreen-glow)' },
        { icon: <FaWhatsapp size={18} />, label: 'WhatsApp', value: '+91 9963186067', sub: 'Instant chat support', href: 'https://wa.me/9963186067', color: '#25D366' },
        { icon: <MapPin size={18} />, label: 'Visit Us', value: 'Gachibowli, Hyderabad', sub: 'KNR Square, 3rd Floor', href: '#map', color: 'var(--color-gold)' },
    ];

    const services = ['Data Automation & BI', 'Corporate Training', 'HR Staffing & Recruitment', 'ERP Consulting', 'Cloud Infrastructure', 'General Enquiry'];

    const whyUs = [
        { icon: <MdSupportAgent size={14} />, text: 'Senior consultants on every project' },
        { icon: <FaClock size={13} />, text: '24hr response SLA for all clients' },
        { icon: <BsCheckCircleFill size={13} />, text: '300+ successful placements made' },
        { icon: <MdVerified size={14} />, text: 'ISO-aligned delivery standards' },
        { icon: <FaChalkboardTeacher size={13} />, text: '5,000+ professionals trained' },
    ];

    const serviceLinks = [
    { icon: <MdBusiness size={20} />, title: 'Data Automation & BI', desc: 'Live dashboards, ETL pipelines, and BI reports.', color: 'var(--color-corporate-blue)', link: 'mailto:corporate@itbeesglobal.com' },

    { icon: <FaChalkboardTeacher size={18} />, title: 'Corporate Training', desc: 'Excel, Power BI, Python, VBA & SQL with certification.', color: 'var(--color-evergreen-glow)', link: 'mailto:corporatetrainings@itbeesglobal.com' },

    { icon: <FaUserTie size={18} />, title: 'HR Staffing & Recruitment', desc: 'Pre-screened engineers and analysts for your projects.', color: 'var(--color-gold)', link: 'mailto:hr@itbeesglobal.com' },

    { icon: <FaBuilding size={18} />, title: 'ERP Consulting', desc: 'SAP, Oracle & Microsoft Dynamics implementation.', color: '#9b59b6', link: 'mailto:admin@itbeesglobal.com' },

    { icon: <MdSupportAgent size={20} />, title: 'Technical Support', desc: 'SLA-backed maintenance for ITBEES deployments.', color: '#e05c5c', link: 'mailto:admin@itbeesglobal.com' },

    { icon: <FaHeadset size={18} />, title: 'General Enquiry', desc: "Not sure where to start? We'll guide you.", color: 'var(--color-sky-blue)', link: 'mailto:admin@itbeesglobal.com' },
];

    const faqs = [
        { q: 'How fast do you respond?', a: 'Within one business day. Urgent matters via WhatsApp are handled within 2 hours.' },
        { q: 'Do you offer free consultations?', a: 'Yes — a complimentary 30-minute discovery call for all new enterprise clients.' },
        { q: 'Can you handle remote projects?', a: 'Absolutely. Most engagements run fully remote with regular video check-ins.' },
        { q: 'What industries do you serve?', a: 'Fintech, manufacturing, retail, healthcare, and IT services.' },
    ];

    const officeRows = [
        { icon: <MapPin size={16} />, label: 'Address', content: 'Door No.1-60/8/A&B, 3rd Floor, KNR Square, Opp. The Platina, Gachibowli, Kondapur, Hyderabad — 500032' },
        { icon: <Phone size={16} />, label: 'Phone', content: '+91 9963186067', href: 'tel:9963186067' },
        { icon: <Mail size={16} />, label: 'Email', content: 'support@itbeesglobal.com', href: 'mailto:support@itbeesglobal.com' },
        { icon: <FaClock size={14} />, label: 'Hours', content: 'Monday – Saturday · 9:00 AM – 6:00 PM IST' },
    ];

    return (
        <>
        {/* Hero */}
        <section className="page-hero hero-text-clip" style={{ backgroundImage: `url(${contactBg})` }}>
            <div className="page-hero-inner">
                <div className="badge-mint" style={{ marginBottom: 14 }}>
                    <FaHeadset style={{ display: 'inline', marginRight: 6 }} />GET IN TOUCH
                </div>
                <h1 className="display-lg">CONTACT US</h1>
                <p className="page-hero-sub">Reach out for corporate partnerships, training enquiries, staffing needs, or data automation projects.</p>
            </div>
        </section>

        {/* Quick Contact Cards — clearly clickable */}
        <section style={{ backgroundColor: 'var(--color-white)', borderBottom: '1px solid var(--color-soft-gray)', padding: '28px 0' }}>
            <div className="container">
                <div className="grid-4" style={{ gap: 16 }}>
                    {contactCards.map((c, i) => (
                        <ClickCard key={i} href={c.href} color={c.color}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <IconBox icon={c.icon} color={c.color} />
                                <ArrowUpRight size={14} style={{ color: c.color, opacity: 0.6 }} />
                            </div>
                            <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--color-muted-text)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{c.label}</span>
                            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-ink)', lineHeight: 1.4 }}>{c.value}</span>
                            <span style={{ fontSize: 11, color: 'var(--color-muted-text)' }}>{c.sub}</span>
                        </ClickCard>
                    ))}
                </div>
            </div>
        </section>

        <div className="container section-gap">

            {/* Form + Sidebar */}
            <div className="contact-form-layout">

                {/* Form */}
                <div id="send-message" style={{ scrollMarginTop: '80px' }}>
                    <div className="badge-blue" style={{ marginBottom: 10 }}>SEND A MESSAGE</div>
                    <h2 className="display-md" style={{ textAlign: 'left', marginBottom: 8 }}>LET'S TALK BUSINESS</h2>
                    <p style={{ color: 'var(--color-muted-text)', fontSize: 13, lineHeight: 1.6, marginBottom: 22 }}>Fill in the form and one of our consultants will reach out within 24 hours.</p>

                    {submitted ? (
                        <div style={{ background: 'var(--color-pale-mint)', border: '1px solid var(--color-evergreen-glow)', borderRadius: 12, padding: '40px 32px', textAlign: 'center' }}>
                            <CheckCircle size={44} color="var(--color-evergreen-glow)" style={{ marginBottom: 12 }} />
                            <h3 style={{ color: 'var(--color-evergreen-glow)', fontFamily: 'var(--font-ozik)', fontSize: 22, marginBottom: 8 }}>MESSAGE SENT!</h3>
                            <p style={{ color: 'var(--color-deep-moss)', fontSize: 13, lineHeight: 1.6 }}>We'll be in touch within 1 business day.</p>
                        </div>
                    ) : (
                        <div style={{ background: 'var(--color-white)', border: '1px solid var(--color-soft-gray)', borderRadius: 14, padding: '24px 28px' }}>
                            <form onSubmit={handleSubmit}>
                                <div className="contact-form-inner-grid">
                                    <div>
                                        <label className="form-label">Full Name *</label>
                                        <input className="input-field" required placeholder="Rajesh Kumar" value={form.name} onChange={set('name')} />
                                    </div>
                                    <div>
                                        <label className="form-label">Phone Number</label>
                                        <input type="tel" className="input-field" placeholder="+91 98765 43210" value={form.phone} onChange={set('phone')} />
                                    </div>
                                </div>
                                <div className="contact-form-inner-grid">
                                    <div>
                                        <label className="form-label">Business Email *</label>
                                        <input type="email" className="input-field" required placeholder="you@company.com" value={form.email} onChange={set('email')} />
                                    </div>
                                    <div>
                                        <label className="form-label">Company Name</label>
                                        <input className="input-field" placeholder="Your Company Pvt. Ltd." value={form.company} onChange={set('company')} />
                                    </div>
                                </div>
                                <div style={{ marginBottom: 14 }}>
                                    <label className="form-label">Service You're Interested In</label>
                                    <select className="input-field" value={form.service} onChange={set('service')} style={{ cursor: 'pointer' }}>
                                        <option value="">Select a service...</option>
                                        {services.map((s, i) => <option key={i} value={s}>{s}</option>)}
                                    </select>
                                </div>
                                <div style={{ marginBottom: 18 }}>
                                    <label className="form-label">Message / Requirements *</label>
                                    <textarea className="input-field" rows={4} required
                                        placeholder="Minimum atleast 10 characters required. Tell us about your project, timeline, team size..."
                                        style={{ borderRadius: 12, resize: 'vertical' }}
                                        value={form.message} onChange={set('message')} />
                                </div>
                                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', gap: 8 }} disabled={isSubmitting}>
                                    {isSubmitting ? 'Sending...' : <><Send size={14} /> Send Message</>}
                                </button>
                                <p style={{ fontSize: 11, color: 'var(--color-muted-text)', textAlign: 'center', marginTop: 10 }}>🔒 Your information is secure and never shared.</p>
                            </form>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {/* Company */}
                    <div style={{ background: 'var(--color-light-canvas)', border: '1px solid var(--color-soft-gray)', borderRadius: 14, padding: '20px 18px', textAlign: 'center' }}>
                        <img src={logo} alt="ITBEES Global" style={{ height: 56, objectFit: 'contain', margin: '0 auto 10px' }} />
                        <h4 style={{ fontFamily: 'var(--font-ozik)', fontSize: 15, color: 'var(--color-ink)', letterSpacing: '0.08em', marginBottom: 3 }}>
                            ITBEES <span style={{ color: 'var(--color-corporate-blue)' }}>GLOBAL</span>
                        </h4>
                        <p style={{ fontSize: 11, color: 'var(--color-muted-text)', marginBottom: 10 }}>Enterprise Solutions & Training</p>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 3, marginBottom: 4 }}>
                            {[...Array(5)].map((_, i) => <BsStarFill key={i} size={11} color="var(--color-gold)" />)}
                            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-ink)', marginLeft: 5 }}>4.9</span>
                        </div>
                        <p style={{ fontSize: 11, color: 'var(--color-muted-text)', marginBottom: 10 }}>Rated by 500+ enterprise clients</p>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--color-evergreen-glow)', fontWeight: 600 }}>
                            <MdVerified size={13} /> Verified Enterprise Standards
                        </div>
                    </div>

                    {/* Why Us */}
                    <div style={{ background: 'var(--gradient-card)', border: '1px solid var(--color-soft-border)', borderRadius: 14, padding: '18px 16px' }}>
                        <h4 style={{ color: 'var(--color-white)', fontFamily: 'var(--font-ozik)', fontSize: 13, letterSpacing: '0.06em', marginBottom: 14 }}>WHY CLIENTS CHOOSE US</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {whyUs.map((item, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'rgba(255,255,255,0.85)' }}>
                                    <span style={{ color: 'var(--color-ai-lime)', flexShrink: 0, width: 16, textAlign: 'center' }}>{item.icon}</span>
                                    {item.text}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Social — clickable links with hover */}
                    {/* <div style={{ background: 'var(--color-light-canvas)', border: '1px solid var(--color-soft-gray)', borderRadius: 14, padding: '16px 18px' }}>
                        <p style={{ fontSize: 10, color: 'var(--color-muted-text)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>Connect With Us</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                            {[
                                { icon: <FaWhatsapp size={15} />, label: 'WhatsApp Direct', color: '#25D366', href: 'https://wa.me/9963186067' },
                                { icon: <FaLinkedin size={15} />, label: 'LinkedIn Page', color: '#0077B5', href: '#' },
                                { icon: <FaTwitter size={15} />, label: 'Twitter / X', color: '#1DA1F2', href: '#' },
                            ].map((s, i) => (
                                <a key={i} href={s.href}
                                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, fontSize: 12, color: s.color, textDecoration: 'none', fontWeight: 600, padding: '7px 10px', borderRadius: 7, transition: 'background 0.15s' }}
                                    onMouseEnter={e => e.currentTarget.style.background = `${s.color}14`}
                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                >
                                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>{s.icon}{s.label}</span>
                                    <ArrowUpRight size={12} style={{ opacity: 0.6 }} />
                                </a>
                            ))}
                        </div>
                    </div> */}
                        <div style={{ background: 'var(--color-light-canvas)', border: '1px solid var(--color-soft-gray)', borderRadius: 14, padding: '16px 18px' }}>
    <p style={{ fontSize: 10, color: 'var(--color-muted-text)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
        Connect With Us
    </p>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
        {[
            { icon: <FaWhatsapp size={15} />, label: 'WhatsApp Direct', color: '#25D366', href: 'https://wa.me/9963186067' },
            { icon: <FaYoutube size={15} />, label: 'YouTube Channel', color: '#FF0000', href: 'https://youtube.com/@itbeesglobalaidatahub?si=CdA8f2mdb7CY05Mf' },

            { icon: <FaLinkedin size={15} />, label: 'LinkedIn Page', color: '#0077B5', href: 'https://www.linkedin.com/company/itbees-global-private-limited/' },
            { icon: <FaInstagram size={15} />, label: 'Instagram', color: '#E4405F', href: 'https://instagram.com/itbeesglobalaidatahub?igshid=ZDdkNTZiNTM=' },

            // { icon: <FaTwitter size={15} />, label: 'Twitter / X', color: '#1DA1F2', href: '#' },
            // { icon: <FaFacebook size={15} />, label: 'Facebook Page', color: '#1877F2', href: '#' },
        ]
        .map((s, i) => (
            <a
                key={i}
                href={s.href}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 8,
                    fontSize: 12,
                    color: s.color,
                    textDecoration: 'none',
                    fontWeight: 600,
                    padding: '7px 10px',
                    borderRadius: 7,
                    transition: 'background 0.15s'
                }}
                onMouseEnter={e => e.currentTarget.style.background = `${s.color}14`}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {s.icon}{s.label}
                </span>
                <ArrowUpRight size={12} style={{ opacity: 0.6 }} />
            </a>
        ))}
    </div>
</div>
                </div>
            </div>

            {/* Service Quick Links — clearly clickable */}
            <div style={{ marginBottom: 56 }}>
                <div className="section-header">
                    <h2 className="display-md">WHAT CAN WE HELP WITH?</h2>
                    <p className="section-subtitle">Click to connect with the right team for your needs.</p>
                </div>
                <div className="grid-3" style={{ gap: 16 }}>
                    {serviceLinks.map((s, i) => {
                        const [hov, setHov] = useState(false);
                        return (
                            <a key={i} href={s.link} style={{ textDecoration: 'none', display: 'flex' }}>
                                <div
                                    style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '20px 18px', borderRadius: 10, border: `1px solid ${hov ? s.color : 'var(--color-soft-gray)'}`, background: hov ? `${s.color}07` : 'var(--color-light-canvas)', cursor: 'pointer', transition: 'all 0.18s', transform: hov ? 'translateY(-2px)' : 'none', width: '100%' }}
                                    onMouseEnter={() => setHov(true)}
                                    onMouseLeave={() => setHov(false)}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <IconBox icon={s.icon} color={s.color} />
                                        <ArrowUpRight size={14} style={{ color: s.color, opacity: hov ? 1 : 0.4, transition: 'opacity 0.18s' }} />
                                    </div>
                                    <h4 style={{ fontWeight: 600, fontSize: 14, color: 'var(--color-ink)', lineHeight: 1.3 }}>{s.title}</h4>
                                    <p style={{ fontSize: 12, color: 'var(--color-muted-text)', lineHeight: 1.6, flex: 1 }}>{s.desc}</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: s.color, fontWeight: 600 }}>
                                        Contact Team <BsArrowRight size={10} />
                                    </div>
                                </div>
                            </a>
                        );
                    })}
                </div>
            </div>

            {/* Office + Map */}
            <div id="map" className="contact-office-map">
                <div style={{ background: 'var(--color-deep-moss)', border: '1px solid rgba(104,239,63,0.15)', borderRadius: 16, padding: '28px 26px', display: 'flex', flexDirection: 'column', gap: 18 }}>
                    <h3 style={{ color: 'var(--color-white)', fontFamily: 'var(--font-ozik)', fontSize: 17, letterSpacing: '0.04em' }}>CORPORATE HEADQUARTERS</h3>
                    {officeRows.map((row, i) => (
                        <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                            <div style={{ color: 'var(--color-ai-lime)', flexShrink: 0, marginTop: 2 }}>{row.icon}</div>
                            <div>
                                <div style={{ color: 'var(--color-white)', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 3 }}>{row.label}</div>
                                {row.href
                                    ? <a href={row.href} style={{ fontSize: 12, color: 'var(--color-ai-lime)', textDecoration: 'none', lineHeight: 1.6 }}>{row.content}</a>
                                    : <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.62)', lineHeight: 1.7, margin: 0 }}>{row.content}</p>
                                }
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid var(--color-soft-gray)' }}>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7612.470983534224!2d78.3639803!3d17.448439299999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93f140246ed3%3A0x41b704479010978b!2sCS%20Coworking%20Spaces%20-%20Gachibowli%20%7C%20Virtual%20Office%2C%20Private%20Cabins%20%26%20Open%20Desk%20-%2024*2A7!5e0!3m2!1sen!2sin!4v1780666656455!5m2!1sen!2sin"
                        width="100%" height="100%" style={{ border: 0, display: 'block' }} allowFullScreen="" loading="lazy" title="ITBEES Global Office" />
                </div>
            </div>

            {/* FAQ */}
            <div style={{ marginBottom: 56 }}>
                <div className="section-header">
                    <h2 className="display-md">FREQUENTLY ASKED QUESTIONS</h2>
                    <p className="section-subtitle">Quick answers before you reach out.</p>
                </div>
                <div className="contact-faq-grid">
                    {faqs.map((faq, i) => (
                        <div key={i} style={{ background: 'var(--color-light-canvas)', border: '1px solid var(--color-soft-gray)', borderRadius: 10, padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                                <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--color-corporate-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#fff', flexShrink: 0, marginTop: 1 }}>Q</div>
                                <h4 style={{ fontWeight: 600, fontSize: 13, color: 'var(--color-ink)', lineHeight: 1.4 }}>{faq.q}</h4>
                            </div>
                            <p style={{ fontSize: 12, color: 'var(--color-muted-text)', lineHeight: 1.7, paddingLeft: 32 }}>{faq.a}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div style={{ background: 'var(--color-navy-dark)', borderRadius: 14, padding: '44px 40px', textAlign: 'center', border: '1px solid var(--color-soft-border)', marginBottom: 16 }}>
                <div className="badge-mint" style={{ marginBottom: 14 }}>READY TO START?</div>
                <h2 style={{ color: 'var(--color-white)', fontFamily: 'var(--font-ozik)', fontSize: 30, lineHeight: 1.1, marginBottom: 12 }}>LET'S BUILD SOMETHING GREAT TOGETHER</h2>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, lineHeight: 1.7, maxWidth: 480, margin: '0 auto 28px' }}>
                    Whether you need smarter data, a trained team, or the right hire — ITBEES Global is your single partner for all three.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
                    <a href="tel:9963186067" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
                        <Phone size={14} /> Call Now
                    </a>
                    <a href="https://wa.me/9963186067" className="btn-ghost-dark" style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
                        <FaWhatsapp size={14} /> Chat on WhatsApp
                    </a>
                </div>
            </div>

        </div>

            {/* YouTube Video — 2 col
            <section style={{ backgroundColor: 'var(--color-navy-dark)', padding: '64px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="container">
                    <div className="grid-2" style={{ alignItems: 'center', gap: '48px' }}>
                        <div>
                            <div className="badge-mint" style={{ marginBottom: '16px' }}>WATCH US IN ACTION</div>
                            <h2 className="display-md" style={{ color: 'var(--color-white)', textAlign: 'left', marginBottom: '16px' }}>SEE HOW ITBEES CAN HELP YOUR BUSINESS</h2>
                            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', lineHeight: '1.8', marginBottom: '24px' }}>
                                Get a quick overview of our ERP solutions, BI dashboards, corporate training programs, and staffing services — all in one place.
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {[
                                    'Enterprise data automation & BI dashboard consulting',
                                    'Corporate training with certified instructors & live labs',
                                    'HR staffing with pre-screened talent placed in 48 hours',
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
                                <iframe src={`https://www.youtube.com/embed/${YT_ID}?autoplay=1&rel=0&enablejsapi=1`} title="ITBEES Global Contact" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }} />
                            )}
                        </div>
                    </div>
                </div>
            </section> */}
        </>
    );
}
