import { useState } from 'react';
import { Play } from 'lucide-react';
import { FaBuilding, FaUsers, FaGlobe, FaAward, FaLightbulb, FaHandshake } from 'react-icons/fa';
import { MdVerified, MdTimeline, MdSecurity } from 'react-icons/md';
import { BsStarFill, BsGraphUpArrow } from 'react-icons/bs';
import { HiOfficeBuilding } from 'react-icons/hi';
import aboutBg from '../assets/about.png';
import servicesBg from '../assets/services.png';

export default function AboutUs() {
    const [videoPlaying, setVideoPlaying] = useState(false);
    const YT_ID = 'gNYtC0swvaw';
    const team = [
        { name: 'Kalluri Vishnu Priya', role: 'CEO & Founder', icon: <FaBuilding size={28} />, color: 'var(--color-corporate-blue)' },
        { name: 'M V D N Sarva Lakshmi', role: 'CTO', icon: <MdSecurity size={28} />, color: 'var(--color-evergreen-glow)' },
        { name: 'M V S G Rama Subrahmanyam', role: 'Head of Training', icon: <FaAward size={28} />, color: 'var(--color-gold)' },
        { name: 'Sai Teja Kalluri', role: 'Lead Data Architect', icon: <BsGraphUpArrow size={28} />, color: '#9b59b6' },
    ];

    const milestones = [
  {
    year: '2025',
    event: 'ITBEES Global incorporated and launched operations',
    icon: <FaBuilding size={16} />
  },
  {
    year: '2025',
    event: 'Started Corporate Training & Internship Programs',
    icon: <FaAward size={16} />
  },
  {
    year: '2025',
    event: 'Launched ERP, Analytics & Technology Consulting Services',
    icon: <BsGraphUpArrow size={16} />
  },
  {
    year: '2026',
    event: 'Expanded online learning platform and digital template marketplace',
    icon: <MdTimeline size={16} />
  },
  {
    year: '2026',
    event: 'Delivered training programs across multiple technology domains',
    icon: <FaGlobe size={16} />
  },
  {
    year: '2026',
    event: 'Introduced AI-powered learning and certification ecosystem',
    icon: <MdVerified size={16} />
  },
];

    return (
        <>
            {/* Hero */}
            <section className="page-hero hero-text-clip" style={{ backgroundImage: `url(${aboutBg})` }}>

                <div className="page-hero-inner" >
                    <div className="badge-mint" style={{ marginBottom: '16px' }}>
                        <HiOfficeBuilding style={{ display: 'inline', marginRight: '6px' }} />
                        WHO WE ARE
                    </div>
                    <h1 className="display-lg">ITBEES GLOBAL</h1>
                    <p className="page-hero-sub">
                        Transforming Businesses Through Technology, Automation, and Innovation.</p>
                </div>
            </section>

            {/* Stats Bar — horizontal */}
            <section style={{ backgroundColor: 'var(--color-navy-dark)', padding: '28px 0' }}>
                <div className="container">
                    <div className="grid-4" style={{ gap: '24px' }}>
                        {[
                            { icon: <FaUsers size={24} />, value: '150+', label: 'Enterprise Clients', color: 'var(--color-ai-lime)' },
                            { icon: <FaAward size={24} />, value: '10+', label: 'Years Experience', color: 'var(--color-gold)' },
                            { icon: <FaGlobe size={24} />, value: '5', label: 'Countries Served', color: 'var(--color-sky-blue)' },
                            { icon: <BsStarFill size={22} />, value: '4.9/5', label: 'Client Rating', color: '#e05c5c' },
                        ].map((s, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px', justifyContent: 'center' }}>
                                <div style={{ color: s.color, flexShrink: 0 }}>{s.icon}</div>
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
                        <h2 className="display-md" style={{ marginBottom: '20px', textAlign: 'left' }}>About ITBEES Global</h2>
                        <p style={{ fontSize: '15px', lineHeight: '1.8', color: 'var(--color-ink)', marginBottom: '20px' }}>
                            ITBEES Global is a technology-driven company specializing in Business Automation, Data Analytics, Software Development, Corporate Training, and HR Consulting Services. We help organizations streamline operations, improve productivity, and make data-driven decisions through innovative technology solutions and industry expertise.
                        </p>
                        <p style={{ fontSize: '15px', lineHeight: '1.8', color: 'var(--color-ink)', marginBottom: '24px' }}>
                            Our services include Data Automation, Excel VBA Solutions, Power BI Dashboards, Business Process Automation, Custom Software Development, Recruitment & Payroll Consulting, and Corporate Training Programs. We work with startups, SMEs, and enterprises across various industries, delivering solutions that enhance efficiency and drive business growth.
                        </p>
                        <p style={{ fontSize: '15px', lineHeight: '1.8', color: 'var(--color-ink)', marginBottom: '24px' }}>
                            At ITBEES Global, we believe in combining technology, innovation, and practical business knowledge to solve real-world challenges. Our team is committed to delivering high-quality services, customized solutions, and measurable results that help our clients stay competitive in an evolving digital landscape.
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
               <div style={{ marginBottom: '48px' }}>
  {[
    // { icon: <FaLightbulb size={22} />, color: 'var(--color-corporate-blue)', title: 'OUR VISION', text: '...' },
    // { icon: <FaGlobe size={22} />, color: 'var(--color-evergreen-glow)', title: 'OUR MISSION', text: '...' },
    {
      icon: <FaHandshake size={22} />,
      color: 'var(--color-gold)',
      title: 'OUR CORE SERVICES',
      // Converted raw text block into an array for cleaner data mapping
      services: [
        "Automation Services",
        "Data Analytics & Reporting Solutions",
        "Business Process Automation",
        "Excel VBA & Power BI Consulting",
        "Software Development & IT Solutions",
        "Corporate Training Programs"
      ]
    }
  ].map((c, i) => (
    <div key={i} className="card-neutral" style={{ padding: '24px', gap: '16px', display: 'flex', flexDirection: 'column' }}>
      {/* Header Icon & Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ color: c.color, display: 'flex', alignItems: 'center' }}>{c.icon}</div>
        <h3 style={{ fontFamily: 'var(--font-aeonik)', fontWeight: 700, fontSize: '14px', color: c.color, letterSpacing: '0.04em', margin: 0 }}>
          {c.title}
        </h3>
      </div>
      
      {/* Internal Cards Layout Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', 
        gap: '12px',
        marginTop: '4px' 
      }}>
        {c.services.map((service, idx) => (
          <div 
            key={idx} 
            style={{
              background: 'rgba(255, 255, 255, 0.04)', // Slight subtle lift against dark background
              border: '1px solid rgba(255, 255, 255, 0.07)',
              borderRadius: '8px',
              padding: '14px 16px',
              fontSize: '13px',
              lineHeight: '1.4',
              color: 'var(--color-ink)',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              transition: 'transform 0.2s, border-color 0.2s'
            }}
            // Subtle interactive feedback on hover
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.07)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {service}
          </div>
        ))}
      </div>
    </div>
  ))}
</div>

                {/* Services Image Banner */}
                <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', marginBottom: '64px', height: '240px' }}>
                    <img src={servicesBg} alt="Our Services" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.35)' }} />
                    <div className="about-banner-content" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '12px', padding: '24px' }}>
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
                                <div className="journey-dot">{m.icon}</div>
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
                                <div className="leadership-icon-wrapper">{member.icon}</div>
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

            {/* YouTube Video — 2 col
            <section style={{ backgroundColor: 'var(--color-navy-dark)', padding: '64px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="container">
                    <div className="grid-2" style={{ alignItems: 'center', gap: '48px' }}>
                        <div>
                            <div className="badge-mint" style={{ marginBottom: '16px' }}>WATCH US IN ACTION</div>
                            <h2 className="display-md" style={{ color: 'var(--color-white)', textAlign: 'left', marginBottom: '16px' }}>SEE HOW ITBEES GLOBAL IS TRANSFORMING ENTERPRISES</h2>
                            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', lineHeight: '1.8', marginBottom: '24px' }}>
                                Discover the team, technology, and training behind 150+ successful enterprise transformations across India and Southeast Asia.
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {[
                                    '10+ years of enterprise expertise & innovation',
                                    '150+ successful client deployments across industries',
                                    'ISO-certified processes with 24/7 support infrastructure',
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
                                <iframe src={`https://www.youtube.com/embed/${YT_ID}?autoplay=1&rel=0&enablejsapi=1`} title="ITBEES Global About" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }} />
                            )}
                        </div>
                    </div>
                </div>
            </section> */}
        </>
    );
}