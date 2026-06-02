import { FaBuilding, FaUsers, FaGlobe, FaAward, FaLightbulb, FaHandshake } from 'react-icons/fa';
import { MdVerified, MdTimeline, MdSecurity } from 'react-icons/md';
import { BsStarFill, BsGraphUpArrow } from 'react-icons/bs';
import { HiOfficeBuilding } from 'react-icons/hi';
import aboutBg from '../assets/about.png';
import servicesBg from '../assets/services.png';

export default function AboutUs() {
    const team = [
        { name: 'Suresh Babu', role: 'CEO & Founder', icon: <FaBuilding size={28} />, color: 'var(--color-corporate-blue)' },
        { name: 'Anitha Reddy', role: 'CTO', icon: <MdSecurity size={28} />, color: 'var(--color-evergreen-glow)' },
        { name: 'Kiran Rao', role: 'Head of Training', icon: <FaAward size={28} />, color: 'var(--color-gold)' },
        { name: 'Preethi Nair', role: 'Lead Data Architect', icon: <BsGraphUpArrow size={28} />, color: '#9b59b6' },
    ];

    const milestones = [
        { year: '2014', event: 'ITBEES Global founded in Hyderabad', icon: <FaBuilding size={16} /> },
        { year: '2016', event: 'Launched first ERP integration suite for 10 enterprise clients', icon: <MdTimeline size={16} /> },
        { year: '2018', event: 'Expanded to BI Analytics & PowerBI consulting', icon: <BsGraphUpArrow size={16} /> },
        { year: '2020', event: 'Corporate Training division launched with 500+ enrollments', icon: <FaAward size={16} /> },
        { year: '2022', event: 'Crossed 100+ enterprise clients across India & SEA', icon: <FaGlobe size={16} /> },
        { year: '2024', event: 'ISO certified & expanded to cloud-native architecture services', icon: <MdVerified size={16} /> },
    ];

    return (
        <div>
            {/* Hero */}
            <section className="page-hero hero-text-clip" style={{ backgroundImage: `url(${aboutBg})` }}>
                <div className="page-hero-inner">
                    <div className="badge-mint" style={{ marginBottom: '16px' }}>
                        <HiOfficeBuilding style={{ display: 'inline', marginRight: '6px' }} />
                        WHO WE ARE
                    </div>
                    <h1 className="display-lg">ITBEES GLOBAL PVT. LTD.</h1>
                    <p className="page-hero-sub">Delivering robust ERP solutions, customized business intelligence tools, and training pipelines.</p>
                </div>
            </section>

            {/* Stats Bar — horizontal */}
            <section style={{ backgroundColor: 'var(--color-navy-dark)', padding: '28px 0' }}>
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
                        {[
                            { icon: <FaUsers size={24} />, value: '150+', label: 'Enterprise Clients', color: 'var(--color-ai-lime)' },
                            { icon: <FaAward size={24} />, value: '10+', label: 'Years Experience', color: 'var(--color-gold)' },
                            { icon: <FaGlobe size={24} />, value: '5', label: 'Countries Served', color: 'var(--color-sky-blue)' },
                            { icon: <BsStarFill size={22} />, value: '4.9/5', label: 'Client Rating', color: '#e05c5c' },
                        ].map((s, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                <div style={{ color: s.color }}>{s.icon}</div>
                                <div>
                                    <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--color-white)', lineHeight: 1 }}>{s.value}</div>
                                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>{s.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="container section-gap">

                {/* Company Overview with Image */}
                <div className="grid-2" style={{ alignItems: 'center', gap: '48px', marginBottom: '64px' }}>
                    <div style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}>
                        <img src={aboutBg} alt="ITBEES Global Office" style={{ width: '100%', height: '360px', objectFit: 'cover' }} />
                    </div>
                    <div>
                        <div className="badge-mint" style={{ marginBottom: '16px' }}>COMPANY OVERVIEW</div>
                        <h2 className="display-md" style={{ marginBottom: '20px', textAlign: 'left' }}>BUILT FOR ENTERPRISE EXCELLENCE</h2>
                        <p style={{ fontSize: '15px', lineHeight: '1.8', color: 'var(--color-ink)', marginBottom: '20px' }}>
                            Established in Hyderabad's premier IT hub Gachibowli, ITBEES GLOBAL PVT. LTD. is an enterprise solutions partner designed to solve technical complexity. We specialize in configuring unified databases, deploying scalable smart cloud architectures, and preparing data automation workflows.
                        </p>
                        <p style={{ fontSize: '15px', lineHeight: '1.8', color: 'var(--color-ink)', marginBottom: '24px' }}>
                            Whether it is staffing specialized frontend engineering teams, deploying analytics modules, or upgrading student knowledge through corporate training catalogs, ITBEES Global focuses on providing clear results and absolute data security.
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {['ISO Certified Enterprise Partner', 'GDPR & Data Security Compliant', '24/7 Dedicated Support Teams'].map((item, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--color-ink)' }}>
                                    <MdVerified size={18} color="var(--color-evergreen-glow)" /> {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Vision / Mission / Values */}
                <div className="grid-3" style={{ marginBottom: '48px' }}>
                    {[
                        { icon: <FaLightbulb size={22} />, color: 'var(--color-corporate-blue)', title: 'OUR VISION', text: 'To become the leading global architecture and data systems provider, delivering reliable analytics and ERP tools that help businesses scale effortlessly.' },
                        { icon: <FaGlobe size={22} />, color: 'var(--color-evergreen-glow)', title: 'OUR MISSION', text: 'To simplify database migration, deliver precise BI visualizations, and establish structured training platforms that cultivate modern coding standards.' },
                        { icon: <FaHandshake size={22} />, color: 'var(--color-gold)', title: 'CORE VALUES', text: 'Integrity, technical expertise, visual clarity in reports, automated efficiency, and a commitment to helping our engineering talent excel globally.' },
                    ].map((c, i) => (
                        <div key={i} className="card-neutral" style={{ padding: '22px', gap: '10px', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ color: c.color }}>{c.icon}</div>
                            <h3 style={{ fontFamily: 'var(--font-aeonik)', fontWeight: 700, fontSize: '14px', color: c.color, letterSpacing: '0.04em' }}>{c.title}</h3>
                            <p style={{ fontSize: '13px', lineHeight: '1.6', color: 'var(--color-ink)' }}>{c.text}</p>
                        </div>
                    ))}
                </div>

                {/* Services Image Banner */}
                <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', marginBottom: '64px', height: '240px' }}>
                    <img src={servicesBg} alt="Our Services" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.35)' }} />
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '12px', padding: '24px' }}>
                        <FaGlobe size={40} color="var(--color-ai-lime)" />
                        <h3 style={{ color: 'var(--color-white)', fontFamily: 'var(--font-ozik)', fontSize: '24px', textAlign: 'center' }}>SERVING ENTERPRISES ACROSS INDIA & SOUTHEAST ASIA</h3>
                        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', textAlign: 'center', maxWidth: '500px' }}>
                            From Hyderabad to Singapore, our solutions power mission-critical operations for 150+ organizations.
                        </p>
                    </div>
                </div>

                {/* Timeline */}
                <div style={{ marginBottom: '56px' }}>
                    <div className="section-header">
                        <h2 className="display-md">OUR JOURNEY</h2>
                        <p className="section-subtitle">A decade of innovation, growth, and enterprise impact.</p>
                    </div>
                    <div className="journey-timeline">
                        {milestones.map((m, i) => (
                            <div key={i} className="journey-item">
                                <div className="journey-dot">
                                    {m.icon}
                                </div>
                                <div className="journey-content">
                                    <div style={{ fontSize: '13px', fontWeight: '800', color: i % 2 === 0 ? 'var(--color-corporate-blue)' : 'var(--color-evergreen-glow)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>{m.year}</div>
                                    <p style={{ fontSize: '15px', color: 'var(--color-ink)', lineHeight: '1.6', fontWeight: '500' }}>{m.event}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Leadership Team */}
                <div style={{ marginBottom: '100px' }}>
                    <div className="section-header">
                        <h2 className="display-md">LEADERSHIP TEAM</h2>
                        <p className="section-subtitle">Experienced professionals driving innovation at ITBEES Global.</p>
                    </div>
                    <div className="grid-2">
                        {team.map((member, i) => (
                            <div key={i} className="leadership-card" style={{ '--accent-color': member.color }}>
                                <div className="leadership-icon-wrapper">
                                    {member.icon}
                                </div>
                                <div className="leadership-info">
                                    <h4 className="heading-md" style={{ color: 'var(--color-ink)', marginBottom: '4px', fontWeight: '700' }}>{member.name}</h4>
                                    <p style={{ fontSize: '12px', color: 'var(--color-muted-text)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{member.role}</p>
                                    <div style={{ marginTop: '12px', fontSize: '11px', color: 'var(--color-muted-text)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <MdVerified size={14} color={member.color} /> Verified Leader
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
