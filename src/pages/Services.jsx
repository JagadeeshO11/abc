
import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Check, Award, Users, Briefcase } from 'lucide-react';
import servicesBg from '../assets/services.png';

export default function Services() {
    const [searchParams] = useSearchParams();
    const activeSubTab = searchParams.get('tab') || 'data';

    // Simple Data Automation Simulator State
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

    return (
        <>
        <section className="page-hero" style={{ backgroundImage: `url(${servicesBg})` }}>
            <div className="page-hero-inner">
                <div className="badge-blue" style={{ marginBottom: '16px' }}>OUR SERVICES</div>
                <h1 className="display-lg">ENTERPRISE SOLUTIONS</h1>
                <p className="page-hero-sub">Review our specializations in database automation, corporate training, and staffing.</p>
            </div>
        </section>
        <div className="container section-gap">

            {/* Content for Data Automation */}
            {activeSubTab === 'data' && (
                <div className="grid-2" style={{ alignItems: 'flex-start', marginTop: '32px' }}>
                    <div>
                        <h2 className="display-md" style={{ marginBottom: '16px', textAlign: 'left' }}>DATA AUTOMATION &amp; BI</h2>
                        <p style={{ color: 'var(--color-ink)', marginBottom: '24px', lineHeight: '1.7' }}>
                            We design custom visual dashboard pipelines for your executive metrics. From database synchronization to SVG analytics maps, our solutions ensure your data flows smoothly and reports instantly.
                        </p>
                        <h4 className="heading-sm" style={{ marginBottom: '12px' }}>Key Specialities:</h4>
                        <ul style={{ listStyle: 'none', marginBottom: '24px' }}>
                            <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Check size={16} color="var(--color-evergreen-glow)" /> PowerBI Dashboard configurations
                            </li>
                            <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Check size={16} color="var(--color-evergreen-glow)" /> Real-time server metric pipelines
                            </li>
                            <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Check size={16} color="var(--color-evergreen-glow)" /> Custom database schema migrations (SQL/PostgreSQL)
                            </li>
                        </ul>

                        {/* Live Interactive Data Tool */}
                        <div className="card-neutral" style={{ padding: '24px' }}>
                            <h4 className="heading-md" style={{ marginBottom: '12px', color: 'var(--color-corporate-blue)' }}>Demo Tool: Client JSON Transformer</h4>
                            <p style={{ fontSize: '13px', color: 'var(--color-dark-olive)', marginBottom: '12px' }}>
                                Simulate how our middleware formats transaction data, parses text structures, and updates stats.
                            </p>
                            <textarea
                                className="input-field"
                                rows="4"
                                style={{ fontFamily: 'monospace', fontSize: '12px', borderRadius: '8px', marginBottom: '12px' }}
                                value={rawData}
                                onChange={(e) => setRawData(e.target.value)}
                            ></textarea>
                            <button className="btn-secondary" style={{ width: '100%' }} onClick={runDataAutomationSimulation}>
                                Transform and Sync Data
                            </button>
                        </div>
                    </div>

                    <div>
                        {/* Simulation Output Card */}
                        <div className="card-blue-premium" style={{ marginBottom: '24px', minHeight: '220px' }}>
                            <h4 style={{ fontFamily: 'var(--font-aeonik)', marginBottom: '16px' }}>Data Automation Pipeline Output</h4>
                            {formattedData ? (
                                <div style={{ overflowX: 'auto' }}>
                                    <table style={{ width: '100%', fontSize: '12px', borderCollapse: 'collapse', color: 'var(--color-white)' }}>
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
                                                        <span style={{
                                                            padding: '2px 6px',
                                                            backgroundColor: row.status === 'active' ? 'var(--color-ai-lime)' : 'var(--color-gold)',
                                                            color: 'var(--color-deep-moss)',
                                                            borderRadius: '4px',
                                                            fontSize: '10px',
                                                            fontWeight: '600'
                                                        }}>
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

                        {/* Automation Logs */}
                        <div className="card-neutral" style={{ padding: '20px', backgroundColor: '#1e241f', border: '1px solid #273f2b' }}>
                            <h5 style={{ color: 'var(--color-ai-lime)', fontSize: '13px', textTransform: 'uppercase', marginBottom: '8px' }}>Middleware Activity Console</h5>
                            <div style={{ maxHeight: '150px', overflowY: 'auto', textAlign: 'left', fontFamily: 'monospace', fontSize: '11px', color: '#a3be8c', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                {automationLog.length > 0 ? (
                                    automationLog.map((log, i) => <div key={i}>{log}</div>)
                                ) : (
                                    <div style={{ color: '#7e8371' }}>[System idle] Awaiting trigger signal...</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Content for Corporate Training */}
            {activeSubTab === 'training' && (
                <div style={{ marginTop: '32px' }}>
                    <div className="grid-2" style={{ alignItems: 'center', marginBottom: '40px' }}>
                        <div>
                            <h2 className="display-md" style={{ marginBottom: '16px', textAlign: 'left' }}>CORPORATE TRAINING PROGRAMS</h2>
                            <p style={{ color: 'var(--color-ink)', lineHeight: '1.7', marginBottom: '24px' }}>
                                We structure extensive learning modules for IT departments. We deliver practical training labs, evaluate progress through automated quiz questions, and award digital certifications.
                            </p>
                            <Link to="/training" className="btn-primary">
                                View Corporate Catalog
                            </Link>
                        </div>
                        <div className="card-dark-accent">
                            <Award size={32} color="var(--color-ai-lime)" style={{ marginBottom: '12px' }} />
                            <h4 className="heading-lg" style={{ marginBottom: '8px' }}>Certification Workflow</h4>
                            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)' }}>
                                Our system generates authenticated training certificates once team members clear our validation criteria and quizzes.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Content for HR Recruitment */}
            {activeSubTab === 'recruitment' && (
                <div style={{ marginTop: '32px' }}>
                    <div className="grid-2" style={{ alignItems: 'center' }}>
                        <div>
                            <h2 className="display-md" style={{ marginBottom: '16px', textAlign: 'left' }}>HR STAFFING &amp; RECRUITMENT</h2>
                            <p style={{ color: 'var(--color-ink)', lineHeight: '1.7', marginBottom: '24px' }}>
                                ITBEES Global links elite engineering resources, React builders, and system architects to your specific operations. Our HR database features tested CVs, allowing quick placement.
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <Users size={18} color="var(--color-corporate-blue)" />
                                    <span>Permanent placement or developer lease contracts</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <Briefcase size={18} color="var(--color-corporate-blue)" />
                                    <span>Screening and skills assessment modules built by our consultants</span>
                                </div>
                            </div>
                        </div>
                        <div className="card-neutral" style={{ padding: '40px', borderLeft: '4px solid var(--color-gold)' }}>
                            <h4 className="heading-md" style={{ marginBottom: '8px' }}>Partner with ITBEES Global</h4>
                            <p style={{ fontSize: '14px', color: 'var(--color-dark-olive)', marginBottom: '24px' }}>
                                Looking to source dedicated developers for your project workspace? Share details and review candidate CVs.
                            </p>
                            <Link to="/careers" className="btn-secondary" style={{ width: '100%' }}>
                                Browse Open Roles
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
        </>
    );
}