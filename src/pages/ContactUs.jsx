import { useState } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { FaWhatsapp, FaLinkedin, FaTwitter, FaClock, FaHeadset } from 'react-icons/fa';
import { MdVerified, MdSupportAgent, MdLocationOn } from 'react-icons/md';
import { BsArrowRight, BsStarFill } from 'react-icons/bs';
import contactBg from '../assets/contact.png';
import servicesBg from '../assets/services.png';

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

        {/* Office Image Banner */}
        <section style={{ position: 'relative', overflow: 'hidden', height: '200px' }}>
            <img src={servicesBg} alt="ITBEES Global Office" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.35)' }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '12px' }}>
                <MdLocationOn size={40} color="var(--color-ai-lime)" />
                <h2 style={{ color: 'var(--color-white)', fontFamily: 'var(--font-ozik)', fontSize: '22px', textAlign: 'center' }}>
                    VISIT US AT GACHIBOWLI, HYDERABAD
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', textAlign: 'center' }}>
                    KNR Square, 3rd Floor, Opp. The Platina, Kondapur, Telangana - 500032
                </p>
            </div>
        </section>

        <div className="container section-gap">
            <div className="grid-2">
                {/* Contact Form */}
                <div className="card-white" style={{ padding: '40px' }}>
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

                    {/* Social Links */}
                    <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid var(--color-soft-gray)' }}>
                        <p style={{ fontSize: '12px', color: 'var(--color-muted-text)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Also reach us on</p>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <a href="https://wa.me/9963186067" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#25D366', textDecoration: 'none', fontWeight: '600' }}>
                                <FaWhatsapp size={18} /> WhatsApp
                            </a>
                            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#0077B5', textDecoration: 'none', fontWeight: '600' }}>
                                <FaLinkedin size={18} /> LinkedIn
                            </a>
                            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#1DA1F2', textDecoration: 'none', fontWeight: '600' }}>
                                <FaTwitter size={18} /> Twitter
                            </a>
                        </div>
                    </div>
                </div>

                {/* Corporate Address Card */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div className="card-dark-accent" style={{ padding: '40px', flex: 1 }}>
                        <h3 className="heading-lg" style={{ color: 'var(--color-white)', marginBottom: '24px' }}>Corporate Headquarters</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', color: 'var(--color-light-text)' }}>
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                <MapPin size={24} style={{ color: 'var(--color-ai-lime)', flexShrink: 0 }} />
                                <div>
                                    <h5 style={{ color: 'var(--color-white)', fontWeight: '600' }}>Office Address</h5>
                                    <p style={{ fontSize: '14px', marginTop: '4px', lineHeight: '1.5' }}>
                                        Door No.1-60/8/A&amp;B, 3rd Floor, KNR Square,<br />
                                        Opp. The Platina, Gachibowli, Kondapur,<br />
                                        K.V.Rangareddy, Serilingampally,<br />
                                        Telangana - 500032
                                    </p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                <Phone size={20} style={{ color: 'var(--color-ai-lime)' }} />
                                <div>
                                    <h5 style={{ color: 'var(--color-white)', fontWeight: '600' }}>Direct Call</h5>
                                    <a href="tel:9963186067" style={{ color: 'var(--color-ai-lime)', textDecoration: 'none', fontSize: '14px' }}>+91 9963186067</a>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                <Mail size={20} style={{ color: 'var(--color-ai-lime)' }} />
                                <div>
                                    <h5 style={{ color: 'var(--color-white)', fontWeight: '600' }}>Email Inbox</h5>
                                    <a href="mailto:support@itbeesglobal.com" style={{ color: 'var(--color-ai-lime)', textDecoration: 'none', fontSize: '14px' }}>support@itbeesglobal.com</a>
                                </div>
                            </div>
                        </div>
                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '24px', marginTop: '24px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                <FaClock size={14} color="var(--color-ai-lime)" />
                                <h4 className="heading-sm" style={{ color: 'var(--color-white)' }}>Working Hours</h4>
                            </div>
                            <p style={{ fontSize: '13px', color: 'var(--color-muted-text)' }}>Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                            <p style={{ fontSize: '13px', color: 'var(--color-muted-text)' }}>Saturday: 10:00 AM - 2:00 PM IST</p>
                        </div>
                    </div>

                    {/* Client Rating Card */}
                    <div className="card-neutral" style={{ padding: '24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                            <div style={{ display: 'flex', gap: '4px' }}>
                                {[...Array(5)].map((_, i) => <BsStarFill key={i} size={16} color="var(--color-gold)" />)}
                            </div>
                            <span style={{ fontSize: '20px', fontWeight: '700', color: 'var(--color-ink)' }}>4.9/5</span>
                        </div>
                        <p style={{ fontSize: '13px', color: 'var(--color-muted-text)', lineHeight: '1.5' }}>
                            Rated by 150+ enterprise clients for exceptional service quality, technical expertise, and on-time delivery.
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '12px', fontSize: '12px', color: 'var(--color-evergreen-glow)', fontWeight: '600' }}>
                            <MdVerified size={14} /> Verified Client Reviews
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
