import { useState } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { FaWhatsapp, FaLinkedin, FaTwitter, FaClock, FaHeadset } from 'react-icons/fa';
import { MdVerified, MdSupportAgent, MdLocationOn } from 'react-icons/md';
import { BsArrowRight, BsStarFill } from 'react-icons/bs';
import contactBg from '../assets/contact.png';
import servicesBg from '../assets/services.png';
import logo from '../assets/logo.png';

export default function ContactUs({ setInquiries, triggerToast, addLog }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !message) {
            alert('Please fill in Name, Email, and Message.');
            return;
        }
        const newInq = {
            id: `inq-${Date.now()}`,
            name, email,
            company: company || 'N/A',
            message,
            status: 'pending',
            date: new Date().toISOString().split('T')[0]
        };
        setInquiries(prev => [newInq, ...prev]);
        triggerToast('Contact request received. We will call you soon.');
        addLog('system', `Contact form submitted by ${name} (${company || 'Individual'}).`);
        setName(''); setEmail(''); setCompany(''); setMessage('');
    };

    const reasons = [
        { icon: <MdSupportAgent size={22} />, title: 'Expert Consultation', desc: 'Talk to our senior architects about your ERP or cloud needs.', color: 'var(--color-corporate-blue)' },
        { icon: <FaHeadset size={22} />, title: '24/7 Support', desc: 'Round-the-clock technical support for all enterprise clients.', color: 'var(--color-evergreen-glow)' },
        { icon: <MdVerified size={22} />, title: 'Quick Response', desc: 'We respond to all inquiries within one business day.', color: 'var(--color-gold)' },
    ];

    return (
        <>
        {/* Hero */}
        <section className="page-hero" style={{ backgroundImage: `url(${contactBg})` }}>
            <div className="page-hero-inner">
                <div className="badge-mint" style={{ marginBottom: '16px' }}>
                    <FaHeadset style={{ display: 'inline', marginRight: '6px' }} />
                    GET IN TOUCH
                </div>
                <h1 className="display-lg">CONTACT US</h1>
                <p className="page-hero-sub">Reach out for corporate partnerships, data queries, or job applications.</p>
            </div>
        </section>

        {/* Why Contact Bar */}
        <section style={{ backgroundColor: 'var(--color-white)', borderBottom: '1px solid var(--color-soft-gray)', padding: '32px 0' }}>
            <div className="container">
                <div className="grid-3" style={{ gap: '24px' }}>
                    {reasons.map((r, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', padding: '16px' }}>
                            <div style={{ color: r.color, flexShrink: 0 }}>{r.icon}</div>
                            <div>
                                <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-ink)', marginBottom: '4px' }}>{r.title}</h4>
                                <p style={{ fontSize: '12px', color: 'var(--color-muted-text)', lineHeight: '1.5' }}>{r.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Office Image Banner Card */}
        <section style={{ padding: '24px 0' }}>
            <div className="container">
                <div style={{ position: 'relative', overflow: 'hidden', height: '200px', borderRadius: 'var(--radius-containers)', boxShadow: 'var(--shadow-md)' }}>
                    <img src={servicesBg} alt="ITBEES Global Office" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.35)' }} />
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '12px', padding: '24px' }}>
                        <MdLocationOn size={40} color="var(--color-ai-lime)" />
                        <h2 style={{ color: 'var(--color-white)', fontFamily: 'var(--font-ozik)', fontSize: '22px', textAlign: 'center' }}>
                            VISIT US AT GACHIBOWLI, HYDERABAD
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', textAlign: 'center', maxWidth: '600px' }}>
                            KNR Square, 3rd Floor, Opp. The Platina, Kondapur, Telangana - 500032
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <div className="container section-gap">
            <div className="grid-2">
                {/* Contact Form */}
                <div className="card-white" style={{ padding: '32px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                        <MdSupportAgent size={24} color="var(--color-corporate-blue)" />
                        <h3 className="heading-lg" style={{ textAlign: 'left' }}>Send Us a Message</h3>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Full Name *</label>
                            <input type="text" className="input-field" required value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Business Email *</label>
                            <input type="email" className="input-field" required value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Company Name</label>
                            <input type="text" className="input-field" value={company} onChange={(e) => setCompany(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Requirements / Notes *</label>
                            <textarea className="input-field" rows="4" required style={{ borderRadius: '16px', resize: 'vertical' }} value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                        </div>
                        <button type="submit" className="btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                            Submit Details <BsArrowRight />
                        </button>
                    </form>
                </div>

                {/* Rating & Social Sidebar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div className="card-neutral" style={{ padding: '32px', flex: 1 }}>
                        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
                            <img src={logo} alt="ITBEES Global" style={{ height: '96px', width: 'auto', objectFit: 'contain' }} />
                            <h4 style={{ fontFamily: 'var(--font-ozik)', fontSize: '20px', color: 'var(--color-ink)', marginTop: '16px', letterSpacing: '0.08em' }}>
                                ITBEES <span style={{ color: 'var(--color-corporate-blue)' }}>GLOBAL</span>
                            </h4>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                            <div style={{ display: 'flex', gap: '4px' }}>
                                {[...Array(5)].map((_, i) => <BsStarFill key={i} size={16} color="var(--color-gold)" />)}
                            </div>
                            <span style={{ fontSize: '20px', fontWeight: '700', color: 'var(--color-ink)' }}>4.9/5</span>
                        </div>
                        <p style={{ fontSize: '14px', color: 'var(--color-muted-text)', lineHeight: '1.7', marginBottom: '24px' }}>
                            Empowering global enterprises through technical excellence. Our consistent top-tier rating reflects a deep-rooted commitment to precision, automation, and world-class service delivery across all ITBEES operations.
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--color-evergreen-glow)', fontWeight: '600' }}>
                            <MdVerified size={14} /> Verified Enterprise Standards
                        </div>

                        {/* Social Links moved here for better balance */}
                        <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--color-soft-gray)' }}>
                            <p style={{ fontSize: '11px', color: 'var(--color-muted-text)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: '700' }}>Global Outreach Channels</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                <a href="https://wa.me/9963186067" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#25D366', textDecoration: 'none', fontWeight: '600' }}>
                                    <FaWhatsapp size={18} /> Direct WhatsApp
                                </a>
                                <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#0077B5', textDecoration: 'none', fontWeight: '600' }}>
                                    <FaLinkedin size={18} /> Official LinkedIn
                                </a>
                                <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#1DA1F2', textDecoration: 'none', fontWeight: '600' }}>
                                    <FaTwitter size={18} /> Enterprise Twitter
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Corporate Address Card - Full Width 3-Column Layout */}
                <div style={{ gridColumn: '1 / -1' }}>
                    <div className="card-dark-accent" style={{ padding: '32px' }}>
                        <h3 className="heading-lg" style={{ color: 'var(--color-white)', marginBottom: '24px' }}>Corporate Headquarters</h3>
                        <div className="grid-3" style={{ gap: '32px' }}>

                            {/* Col 1: Address */}
                            <div style={{ color: 'var(--color-light-text)' }}>
                                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                    <MapPin size={22} style={{ color: 'var(--color-ai-lime)', flexShrink: 0, marginTop: '2px' }} />
                                    <div>
                                        <h5 style={{ color: 'var(--color-white)', fontWeight: '700', fontSize: '15px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Regional Operations Center</h5>
                                        <p style={{ fontSize: '14px', marginTop: '10px', lineHeight: '1.7', color: 'rgba(255,255,255,0.75)' }}>
                                            Door No.1-60/8/A&amp;B, 3rd Floor, KNR Square,<br />
                                            Opp. The Platina, Gachibowli, Kondapur,<br />
                                            Hyderabad, Telangana - 500032
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Col 2: Contact & Hours */}
                            <div style={{ color: 'var(--color-light-text)' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    <div>
                                        <h5 style={{ color: 'var(--color-white)', fontWeight: '700', fontSize: '15px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>Strategic Partnerships</h5>
                                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '10px' }}>
                                            <Phone size={18} style={{ color: 'var(--color-ai-lime)' }} />
                                            <a href="tel:9963186067" style={{ color: 'var(--color-ai-lime)', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>+91 9963186067</a>
                                        </div>
                                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                            <Mail size={18} style={{ color: 'var(--color-ai-lime)' }} />
                                            <a href="mailto:support@itbeesglobal.com" style={{ color: 'var(--color-ai-lime)', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>support@itbeesglobal.com</a>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: '8px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                            <FaClock size={14} color="var(--color-ai-lime)" />
                                            <h4 style={{ color: 'var(--color-white)', fontSize: '14px', fontWeight: '600' }}>Executive Availability</h4>
                                        </div>
                                        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>Mon - Sat: 09:00 AM - 06:00 PM IST</p>
                                    </div>
                                </div>
                            </div>

                            {/* Col 3: Map Preview (Original Color) */}
                            <div style={{ 
                                borderRadius: '12px', 
                                overflow: 'hidden', 
                                height: '240px', 
                                border: '1px solid rgba(255,255,255,0.1)'
                            }}>
                                <iframe 
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.2891963953!2d78.3619583!3d17.4475441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93952d708309%3A0xc33e07d0f9547d52!2sKNR%20Square!5e0!3m2!1sen!2sin!4v1717056000000!5m2!1sen!2sin" 
                                    width="100%" 
                                    height="100%" 
                                    style={{ border: 0 }} 
                                    allowFullScreen="" 
                                    loading="lazy" 
                                    title="Office Location Map"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
