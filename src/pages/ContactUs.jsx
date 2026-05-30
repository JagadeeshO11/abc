import { useState } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import contactBg from '../assets/contact.png';

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
            name,
            email,
            company: company || 'N/A',
            message,
            status: 'pending',
            date: new Date().toISOString().split('T')[0]
        };
        setInquiries(prev => [newInq, ...prev]);
        triggerToast('Contact request received. We will call you soon.');
        addLog('system', `Contact form submitted by ${name} (${company || 'Individual'}).`);

        setName('');
        setEmail('');
        setCompany('');
        setMessage('');
    };

    return (
        <>
        <section className="page-hero" style={{ backgroundImage: `url(${contactBg})` }}>
            <div className="page-hero-inner">
                <div className="badge-mint" style={{ marginBottom: '16px' }}>GET IN TOUCH</div>
                <h1 className="display-lg">CONTACT US</h1>
                <p className="page-hero-sub">Reach out for corporate partnerships, data queries, or job applications.</p>
            </div>
        </section>
        <div className="container section-gap">


            <div className="grid-2">
                {/* Contact Form */}
                <div className="card-white" style={{ padding: '40px' }}>
                    <h3 className="heading-lg" style={{ marginBottom: '24px', textAlign: 'left' }}>Send Us a Message</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Full Name *</label>
                            <input
                                type="text"
                                className="input-field"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Business Email *</label>
                            <input
                                type="email"
                                className="input-field"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Company Name</label>
                            <input
                                type="text"
                                className="input-field"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Requirements / Notes *</label>
                            <textarea
                                className="input-field"
                                rows="4"
                                required
                                style={{ borderRadius: '16px', resize: 'vertical' }}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            ></textarea>
                        </div>
                        <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                            Submit Details
                        </button>
                    </form>
                </div>

                {/* Corporate Address & Detail Card */}
                <div className="card-dark-accent" style={{ padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
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
                    </div>

                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '24px', marginTop: '24px' }}>
                        <h4 className="heading-sm" style={{ color: 'var(--color-white)', marginBottom: '8px' }}>Working Hours</h4>
                        <p style={{ fontSize: '13px', color: 'var(--color-muted-text)' }}>Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                        <p style={{ fontSize: '13px', color: 'var(--color-muted-text)' }}>Saturday: 10:00 AM - 2:00 PM IST</p>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}