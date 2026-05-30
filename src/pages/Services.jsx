import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Check, Award, Users, Briefcase } from 'lucide-react';
import { FaDatabase, FaChartBar, FaUserTie, FaCogs, FaCloud, FaShieldAlt } from 'react-icons/fa';
import { MdIntegrationInstructions, MdAnalytics, MdVerified } from 'react-icons/md';
import { BsGraphUp, BsArrowRight } from 'react-icons/bs';
import servicesBg from '../assets/services.png';
import trainingBg from '../assets/training.png';
import careersBg from '../assets/carrier.png';
import homeBg from '../assets/home.png';

export default function Services() {
    const [searchParams] = useSearchParams();
    const activeSubTab = searchParams.get('tab') || 'data';

    const [rawData, setRawData] = useState('{"client": "Acme Corp", "orders": 12, "revenue": "14250.50", "status": "active"}\n{"client": "Beta Co", "orders": 8, "revenue": "8900.00", "status": "pending"}\n{"client": "Delta Inc", "orders": 15, "revenue": "21000.75", "status": "active"}');
    const [formattedData, setFormattedData] = useState(null);
    const [automationLog, setAutomationLog] = useState([]);

    const runDataAutomationSimulation = () => {
        try {
            const lines = rawData.trim().split('\n');
            const parsed = lines.map((l, i) => {
                const item = JSON.parse(l);
                return {
                    id: `row-${i + 1}`,
                    client: item.client.toUpperCase(),
                    totalValue: parseFloat(item.revenue).toLocaleString('en-IN', { style: 'currency', currency: 'INR' }),
                    efficiencyScore: ((item.orders * 1500) / parseFloat(item.revenue) * 100).toFixed(1) + '%',
                    status: item.status
                };
            });
            setFormattedData(parsed);
            setAutomationLog(prev => [
                `[${new Date().toLocaleTimeString()}] Data parsed & validated successfully. Transformed JSON payload into secure table layout.`,
                ...prev
            ]);
        } catch (err) {
            alert('Invalid JSON Lines format. Please ensure each line is a valid JSON object.');
            setAutomationLog(prev => [`[${new Date().toLocaleTimeString()}] Latency Error: Failed to parse raw string. Stack: ${err.message}`, ...prev]);
        }
    };

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
        <section className="page-hero" style={{ backgroundImage: `url(${servicesBg})` }}>
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
                {/* Image Banner */}
                <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', marginBottom: '40px', height: '200px' }}>
                    <img src={servicesBg} alt="Data Automation" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.35)' }} />
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', gap: '20px', padding: '32px' }}>
                        <FaDatabase size={48} color="var(--color-ai-lime)" />
                        <div>
                            <h2 style={{ color: 'var(--color-white)', fontFamily: 'var(--font-ozik)', fontSize: '22px', marginBottom: '8px' }}>DATA AUTOMATION & BUSINESS INTELLIGENCE</h2>
                            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px' }}>Transform raw data into actionable insights with our enterprise-grade automation pipelines.</p>
                        </div>
                    </div>
                </div>

                <div className="grid-2" style={{ alignItems: 'flex-start', marginTop: '32px' }}>
                    <div>
                        <h2 className="display-md" style={{ marginBottom: '16px', textAlign: 'left' }}>DATA AUTOMATION &amp; BI</h2>
                        <p style={{ color: 'var(--color-ink)', marginBottom: '24px', lineHeight: '1.7' }}>
                            We design custom visual dashboard pipelines for your executive metrics. From database synchronization to SVG analytics maps, our solutions ensure your data flows smoothly and reports instantly.
                        </p>
                        <h4 className="heading-sm" style={{ marginBottom: '12px' }}>Key Specialities:</h4>
                        <ul style={{ listStyle: 'none', marginBottom: '24px' }}>
                            {[
                                'PowerBI Dashboard configurations',
                                'Real-time server metric pipelines',
                                'Custom database schema migrations (SQL/PostgreSQL)',
                                'ETL pipeline design and optimization',
                                'Data warehouse architecture & management',
                            ].map((item, i) => (
                                <li key={i} style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Check size={16} color="var(--color-evergreen-glow)" /> {item}
                                </li>
                            ))}
                        </ul>

                        <div className="card-neutral" style={{ padding: '24px' }}>
                            <h4 className="heading-md" style={{ marginBottom: '12px', color: 'var(--color-corporate-blue)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <BsGraphUp size={18} /> Demo Tool: Client JSON Transformer
                            </h4>
                            <p style={{ fontSize: '13px', color: 'var(--color-dark-olive)', marginBottom: '12px' }}>
                                Simulate how our middleware formats transaction data, parses text structures, and updates stats.
                            </p>
                            <textarea className="input-field" rows="4" style={{ fontFamily: 'monospace', fontSize: '12px', borderRadius: '8px', marginBottom: '12px' }} value={rawData} onChange={(e) => setRawData(e.target.value)}></textarea>
                            <button className="btn-secondary" style={{ width: '100%' }} onClick={runDataAutomationSimulation}>
                                <MdIntegrationInstructions style={{ marginRight: '6px' }} /> Transform and Sync Data
                            </button>
                        </div>
                    </div>

                    <div>
                        <div className="card-blue-premium" style={{ marginBottom: '24px', minHeight: '220px' }}>
                            <h4 style={{ fontFamily: 'var(--font-aeonik)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <MdAnalytics size={18} /> Data Automation Pipeline Output
                            </h4>
                            {formattedData ? (
                                <div className="table-responsive">
                                    <table style={{ width: '100%', minWidth: '400px', fontSize: '12px', borderCollapse: 'collapse', color: 'var(--color-white)' }}>
                                        <thead>
                                            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
                                                <th style={{ textAlign: 'left', paddingBottom: '8px' }}>Client</th>
                                                <th style={{ textAlign: 'right', paddingBottom: '8px' }}>Revenue</th>
                                                <th style={{ textAlign: 'right', paddingBottom: '8px' }}>Score</th>
                                                <th style={{ textAlign: 'center', paddingBottom: '8px' }}>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {formattedData.map(row => (
                                                <tr key={row.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                                    <td style={{ padding: '8px 0', textAlign: 'left' }}>{row.client}</td>
                                                    <td style={{ padding: '8px 0', textAlign: 'right' }}>{row.totalValue}</td>
                                                    <td style={{ padding: '8px 0', textAlign: 'right' }}>{row.efficiencyScore}</td>
                                                    <td style={{ padding: '8px 0', textAlign: 'center' }}>
                                                        <span style={{ padding: '2px 6px', backgroundColor: row.status === 'active' ? 'var(--color-ai-lime)' : 'var(--color-gold)', color: 'var(--color-deep-moss)', borderRadius: '4px', fontSize: '10px', fontWeight: '600' }}>
                                                            {row.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13px', fontStyle: 'italic', textAlign: 'center', marginTop: '40px' }}>
                                    No active formatted data. Press "Transform and Sync Data" to run the transformer.
                                </p>
                            )}
                        </div>

                        {/* New Decorative Image Card to fill space */}
                        <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', marginBottom: '24px', height: '160px', boxShadow: 'var(--shadow-sm)' }}>
                            <img src={homeBg} alt="Advanced Analytics" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.4)' }} />
                            <div style={{ position: 'absolute', inset: 0, padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                                <h4 style={{ color: 'var(--color-white)', fontSize: '16px', fontWeight: '700', marginBottom: '4px', fontFamily: 'var(--font-aeonik)' }}>Advanced Analytics</h4>
                                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', lineHeight: '1.4', maxWidth: '80%' }}>
                                    Unlocking hidden patterns in your big data with proprietary AI models and visual intelligence.
                                </p>
                            </div>
                        </div>

                        <div className="card-neutral" style={{ padding: '20px', backgroundColor: '#1e241f', border: '1px solid #273f2b' }}>
                            <h5 style={{ color: 'var(--color-ai-lime)', fontSize: '13px', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <FaCogs size={12} /> Middleware Activity Console
                            </h5>
                            <div style={{ maxHeight: '150px', overflowY: 'auto', textAlign: 'left', fontFamily: 'monospace', fontSize: '11px', color: '#a3be8c', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                {automationLog.length > 0 ? automationLog.map((log, i) => <div key={i}>{log}</div>) : (
                                    <div style={{ color: '#7e8371' }}>[System idle] Awaiting trigger signal...</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                </>
            )}

            {/* Corporate Training Tab */}
            {activeSubTab === 'training' && (
                <div style={{ marginTop: '32px' }}>
                    {/* Image Banner */}
                    <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', marginBottom: '40px', height: '200px' }}>
                        <img src={trainingBg} alt="Corporate Training" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.35)' }} />
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', gap: '20px', padding: '32px' }}>
                            <Award size={48} color="var(--color-ai-lime)" />
                            <div>
                                <h2 style={{ color: 'var(--color-white)', fontFamily: 'var(--font-ozik)', fontSize: '22px', marginBottom: '8px' }}>CORPORATE TRAINING PROGRAMS</h2>
                                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px' }}>Structured learning modules for IT departments with certification and placement support.</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid-2" style={{ alignItems: 'center', marginBottom: '40px' }}>
                        <div>
                            <h2 className="display-md" style={{ marginBottom: '16px', textAlign: 'left' }}>CORPORATE TRAINING PROGRAMS</h2>
                            <p style={{ color: 'var(--color-ink)', lineHeight: '1.7', marginBottom: '24px' }}>
                                We structure extensive learning modules for IT departments. We deliver practical training labs, evaluate progress through automated quiz questions, and award digital certifications.
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                                {['Live & recorded instructor-led sessions', 'Hands-on labs with real enterprise datasets', 'Digital certificates upon completion', 'Career placement assistance'].map((item, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                                        <MdVerified size={16} color="var(--color-evergreen-glow)" /> {item}
                                    </div>
                                ))}
                            </div>
                            <Link to="/training" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                                View Corporate Catalog <BsArrowRight />
                            </Link>
                        </div>
                        <div className="card-dark-accent">
                            <Award size={32} color="var(--color-ai-lime)" style={{ marginBottom: '12px' }} />
                            <h4 className="heading-lg" style={{ marginBottom: '8px' }}>Certification Workflow</h4>
                            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)', marginBottom: '20px' }}>
                                Our system generates authenticated training certificates once team members clear our validation criteria and quizzes.
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {['Enroll in course', 'Complete modules & labs', 'Pass skill assessment quiz', 'Receive digital certificate'].map((step, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: 'rgba(255,255,255,0.75)' }}>
                                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--color-corporate-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '700', color: 'white', flexShrink: 0 }}>{i + 1}</div>
                                        {step}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* HR Recruitment Tab */}
            {activeSubTab === 'recruitment' && (
                <div style={{ marginTop: '32px' }}>
                    {/* Image Banner */}
                    <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', marginBottom: '40px', height: '200px' }}>
                        <img src={careersBg} alt="HR Recruitment" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.35)' }} />
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', gap: '20px', padding: '32px' }}>
                            <FaUserTie size={48} color="var(--color-ai-lime)" />
                            <div>
                                <h2 style={{ color: 'var(--color-white)', fontFamily: 'var(--font-ozik)', fontSize: '22px', marginBottom: '8px' }}>HR STAFFING & RECRUITMENT</h2>
                                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px' }}>Elite engineering resources and system architects for your specific operations.</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid-2" style={{ alignItems: 'center' }}>
                        <div>
                            <h2 className="display-md" style={{ marginBottom: '16px', textAlign: 'left' }}>HR STAFFING &amp; RECRUITMENT</h2>
                            <p style={{ color: 'var(--color-ink)', lineHeight: '1.7', marginBottom: '24px' }}>
                                ITBEES Global links elite engineering resources, React builders, and system architects to your specific operations. Our HR database features tested CVs, allowing quick placement.
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <Users size={18} color="var(--color-corporate-blue)" />
                                    <span>Permanent placement or developer lease contracts</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <Briefcase size={18} color="var(--color-corporate-blue)" />
                                    <span>Screening and skills assessment modules built by our consultants</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <FaShieldAlt size={18} color="var(--color-corporate-blue)" />
                                    <span>Background verification and compliance checks included</span>
                                </div>
                            </div>
                        </div>
                        <div className="card-neutral" style={{ padding: '40px', borderLeft: '4px solid var(--color-gold)' }}>
                            <FaUserTie size={32} color="var(--color-gold)" style={{ marginBottom: '16px' }} />
                            <h4 className="heading-md" style={{ marginBottom: '8px' }}>Partner with ITBEES Global</h4>
                            <p style={{ fontSize: '14px', color: 'var(--color-dark-olive)', marginBottom: '24px' }}>
                                Looking to source dedicated developers for your project workspace? Share details and review candidate CVs.
                            </p>
                            <Link to="/careers" className="btn-secondary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                Browse Open Roles <BsArrowRight />
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
        </>
    );
}
