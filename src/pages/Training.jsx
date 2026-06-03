import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, X, CheckCircle } from 'lucide-react';
import { FaGraduationCap, FaCertificate, FaUsers, FaClock, FaStar, FaPlayCircle, FaChalkboardTeacher, FaLaptopCode, FaAward, FaRocket } from 'react-icons/fa';
import { MdOutlineQuiz, MdVerified, MdSchool } from 'react-icons/md';
import { BsGraphUp, BsPeopleFill } from 'react-icons/bs';
import trainingBg from '../assets/training.png';

import { publicApi } from '../utils/api.js';

// Scroll to course card when navigated via navbar hash link
function useHashScroll() {
    useEffect(() => {
        const hash = window.location.hash;
        if (!hash) return;
        const tryScroll = (attempts = 0) => {
            const el = document.getElementById(hash.slice(1));
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                el.style.outline = '2px solid var(--color-ai-lime)';
                el.style.borderRadius = 'var(--radius-containers)';
                setTimeout(() => { el.style.outline = ''; }, 1500);
            } else if (attempts < 10) {
                setTimeout(() => tryScroll(attempts + 1), 150);
            }
        };
        tryScroll();
    }, []);
}

export default function Training({ courses, setEnrollments, setPayments, triggerToast, addLog }) {
    useHashScroll();
    const navigate = useNavigate();

    const [quizCourse, setQuizCourse] = useState(null);
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [quizScore, setQuizScore] = useState(null);
    const [showCertificate, setShowCertificate] = useState(false);

    

    const startQuiz = (course) => {
        setQuizCourse(course);
        setCurrentQuestionIdx(0);
        setSelectedAnswers({});
        setQuizScore(null);
        setShowCertificate(false);
    };

    const selectAnswer = (ansIdx) => {
        setSelectedAnswers(prev => ({ ...prev, [currentQuestionIdx]: ansIdx }));
    };

    const nextQuestion = () => {
        if (currentQuestionIdx < mockQuizData[quizCourse.id].length - 1) {
            setCurrentQuestionIdx(currentQuestionIdx + 1);
        } else {
            const questions = mockQuizData[quizCourse.id];
            let correct = 0;
            questions.forEach((q, idx) => { if (selectedAnswers[idx] === q.ans) correct++; });
            const percent = Math.round((correct / questions.length) * 100);
            setQuizScore(percent);
            if (percent >= 100) addLog('system', `Student passed ${quizCourse.title} quiz assessment with score 100%.`);
        }
    };

    const stats = [
        { icon: <FaUsers size={28} />, value: '5,000+', label: 'Students Trained', color: 'var(--color-corporate-blue)' },
        { icon: <FaCertificate size={28} />, value: '1,200+', label: 'Certificates Issued', color: 'var(--color-evergreen-glow)' },
        { icon: <FaStar size={28} />, value: '4.9/5', label: 'Average Rating', color: 'var(--color-gold)' },
        { icon: <FaChalkboardTeacher size={28} />, value: '20+', label: 'Expert Instructors', color: '#e05c5c' },
    ];

    const features = [
        { icon: <FaPlayCircle size={24} />, title: 'Live & Recorded Sessions', desc: 'Access both live instructor-led classes and recorded sessions at your own pace.' },
        { icon: <MdOutlineQuiz size={24} />, title: 'Skill Assessments', desc: 'Test your knowledge with interactive quizzes after each module.' },
        { icon: <FaAward size={24} />, title: 'Digital Certificates', desc: 'Earn verified digital certificates upon successful course completion.' },
        { icon: <FaLaptopCode size={24} />, title: 'Hands-on Labs', desc: 'Practice with real-world datasets and live coding environments.' },
        { icon: <BsGraphUp size={24} />, title: 'Progress Tracking', desc: 'Monitor your learning journey with detailed analytics dashboards.' },
        { icon: <FaRocket size={24} />, title: 'Career Support', desc: 'Get placement assistance and resume review from our HR team.' },
    ];

    return (
        <>
        {/* Hero */}
        <section className="page-hero hero-text-clip" style={{ backgroundImage: `url(${trainingBg})` }}>
            <div className="page-hero-inner">
                <div className="badge-mint" style={{ marginBottom: '16px' }}>
                    <FaGraduationCap style={{ display: 'inline', marginRight: '6px' }} />
                    LEARN &amp; SCALE
                </div>
                <h1 className="display-lg">CORPORATE TRAINING PROGRAMS</h1>
                <p className="page-hero-sub">Enroll teams in database automation, React frontend layouts, or cloud dashboards.</p>
            </div>
        </section>

        {/* Stats Bar — horizontal */}
        <section style={{ backgroundColor: 'var(--color-white)', borderBottom: '1px solid var(--color-soft-gray)', padding: '28px 0' }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
                    {stats.map((s, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                            <div style={{ color: s.color }}>{s.icon}</div>
                            <div>
                                <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--color-ink)', lineHeight: 1 }}>{s.value}</div>
                                <div style={{ fontSize: '11px', color: 'var(--color-muted-text)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>{s.label}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Training Image Banner Card */}
        <section style={{ padding: '48px 0' }}>
            <div className="container">
                <div style={{ position: 'relative', overflow: 'hidden', height: '280px', borderRadius: 'var(--radius-containers)', boxShadow: 'var(--shadow-md)' }}>
                    <img src={trainingBg} alt="Training Programs" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.4)' }} />
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '12px', padding: '24px' }}>
                        <MdSchool size={48} color="var(--color-ai-lime)" />
                        <h2 style={{ color: 'var(--color-white)', fontFamily: 'var(--font-ozik)', fontSize: '28px', textAlign: 'center' }}>
                            WORLD-CLASS TRAINING FOR MODERN ENTERPRISES
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14px', textAlign: 'center', maxWidth: '500px' }}>
                            Industry-aligned curriculum designed by practitioners with 10+ years of enterprise experience.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <div className="container section-gap">

            {/* Why Choose Us */}
            <div style={{ marginBottom: '64px' }}>
                <div className="section-header">
                    <h2 className="display-md">WHY CHOOSE ITBEES TRAINING?</h2>
                    <p className="section-subtitle">Everything you need to upskill your team and stay ahead of the curve.</p>
                </div>
                <div className="grid-3">
                    {features.map((f, i) => (
                        <div key={i} className="card-neutral" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ color: 'var(--color-corporate-blue)' }}>{f.icon}</div>
                            <h4 className="heading-md" style={{ color: 'var(--color-ink)' }}>{f.title}</h4>
                            <p style={{ fontSize: '13px', color: 'var(--color-muted-text)', lineHeight: '1.6' }}>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Course Catalog */}
            <div style={{ marginBottom: '64px' }}>
                <div className="section-header">
                    <h2 className="display-md">AVAILABLE COURSES</h2>
                    <p className="section-subtitle">Choose from our curated catalog of enterprise-grade training programs.</p>
                </div>
                <div className="grid-3">
                    {courses.map(course => (
                        <div key={course.id} id={`course-${course.id}`} className="card-white" style={{ textAlign: 'left', scrollMarginTop: '100px' }}>
                            <div className="course-card-img-placeholder" style={{ position: 'relative', overflow: 'hidden', backgroundColor: 'var(--color-light-canvas)' }}>
                                {course.image ? (
                                    <img src={course.image} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <BookOpen size={36} />
                                )}
                                <div style={{ position: 'absolute', top: '8px', right: '8px', zIndex: 2 }}>
                                    <MdVerified size={20} color="var(--color-corporate-blue)" />
                                </div>
                            </div>
                            <span className="badge-blue" style={{ marginBottom: '8px' }}>{course.category}</span>
                            <h3 className="heading-lg" style={{ color: 'var(--color-ink)', marginBottom: '8px' }}>{course.title}</h3>
                            <p style={{ fontSize: '13px', color: 'var(--color-muted-text)', marginBottom: '12px', flex: 1 }}>{course.description}</p>
                            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', fontSize: '12px', color: 'var(--color-muted-text)' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FaClock size={12} /> {course.duration}</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><BsPeopleFill size={12} /> {course.modules} Modules</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FaStar size={12} color="var(--color-gold)" /> 4.8</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-soft-gray)', paddingTop: '16px' }}>
                                <div>
                                    <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--color-ink)' }}>₹{course.price.toLocaleString('en-IN')}</div>
                                </div>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button className="btn-primary" style={{ padding: '8px 12px', fontSize: '12px' }} onClick={() => navigate('/training/checkout', { state: { course } })}>
                                        Enroll
                                    </button>
                                    <button className="btn-secondary" style={{ padding: '8px 12px', fontSize: '12px' }} onClick={() => startQuiz(course)}>
                                        Test Skills
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Learning Paths */}
            <div style={{ marginBottom: '64px' }}>
                <div className="section-header">
                    <h2 className="display-md">STRUCTURED LEARNING PATHS</h2>
                    <p className="section-subtitle">Follow a guided roadmap — from beginner to job-ready professional.</p>
                </div>
                <div className="grid-3">
                    {[
                        {
                            label: 'Data Analyst Track',
                            color: 'var(--color-corporate-blue)',
                            badge: 'Most Popular',
                            steps: ['Excel Basics & Advanced', 'Power Query', 'Python for Analytics', 'Power BI Dashboards'],
                            outcome: 'Land a Data Analyst role in 3 months'
                        },
                        {
                            label: 'Automation Specialist Track',
                            color: 'var(--color-evergreen-glow)',
                            badge: 'Fast Track',
                            steps: ['Excel & Formulas', 'VBA & Macros', 'Power Query Automation', 'Python Scripting'],
                            outcome: 'Automate 80% of manual reporting tasks'
                        },
                        {
                            label: 'BI Developer Track',
                            color: 'var(--color-gold)',
                            badge: 'Enterprise Ready',
                            steps: ['SQL Essentials', 'Data Modeling', 'Power BI Advanced', 'Cloud Data Warehousing'],
                            outcome: 'Build and own enterprise BI infrastructure'
                        },
                    ].map((path, i) => (
                        <div key={i} className="card-white" style={{ padding: '24px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                <h4 className="heading-md" style={{ color: 'var(--color-ink)', flex: 1 }}>{path.label}</h4>
                                <span style={{ fontSize: '10px', fontWeight: '700', color: path.color, backgroundColor: `${path.color}18`, border: `1px solid ${path.color}40`, borderRadius: '20px', padding: '3px 10px', whiteSpace: 'nowrap', marginLeft: '8px' }}>{path.badge}</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                                {path.steps.map((step, j) => (
                                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--color-ink)' }}>
                                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: path.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '700', color: 'white', flexShrink: 0 }}>{j + 1}</div>
                                        {step}
                                    </div>
                                ))}
                            </div>
                            <div style={{ borderTop: '1px solid var(--color-soft-gray)', paddingTop: '14px', fontSize: '12px', color: path.color, fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <FaRocket size={11} /> {path.outcome}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        {/* Testimonial Banner */}
            <div className="card-blue-premium" style={{ marginBottom: '64px', padding: '40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                    <FaGraduationCap size={36} color="var(--color-ai-lime)" />
                    <div>
                        <h3 style={{ color: 'var(--color-white)', fontFamily: 'var(--font-aeonik)', fontWeight: '600' }}>What Our Students Say</h3>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>Real feedback from enterprise learners</p>
                    </div>
                </div>
                <div className="grid-2" style={{ gap: '24px' }}>
                    {[
                        { name: 'Priya Sharma', role: 'Data Analyst, TechCorp', text: 'The PowerBI course was incredibly practical. I built my first live dashboard within a week of completing the training.' },
                        { name: 'Arjun Reddy', role: 'ERP Consultant, InfoSys', text: 'ITBEES training gave me the confidence to handle complex ERP migrations. The instructors are top-notch professionals.' }
                    ].map((t, i) => (
                        <div key={i} style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '12px', padding: '20px' }}>
                            <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
                                {[...Array(5)].map((_, j) => <FaStar key={j} size={14} color="var(--color-gold)" />)}
                            </div>
                            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px', fontStyle: 'italic', marginBottom: '16px', lineHeight: '1.6' }}>"{t.text}"</p>
                            <div>
                                <div style={{ color: 'var(--color-white)', fontWeight: '600', fontSize: '13px' }}>{t.name}</div>
                                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>{t.role}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Corporate CTA Banner */}
            <div style={{ background: 'var(--color-navy-dark)', borderRadius: '16px', padding: '48px', marginBottom: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '32px', flexWrap: 'wrap', border: '1px solid var(--color-soft-border)' }}>
                <div style={{ maxWidth: '560px' }}>
                    <div className="badge-mint" style={{ marginBottom: '14px' }}>CORPORATE PACKAGES</div>
                    <h2 style={{ color: 'var(--color-white)', fontFamily: 'var(--font-ozik)', fontSize: '28px', lineHeight: 1.1, marginBottom: '12px' }}>TRAINING YOUR ENTIRE TEAM?</h2>
                    <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', lineHeight: '1.7' }}>Get bulk enrollment discounts, a dedicated instructor, and a custom curriculum built around your tech stack. We’ve trained teams of 10 to 500+.</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '200px' }}>
                    {['✓ Custom curriculum', '✓ Bulk discounts (10+ seats)', '✓ Dedicated account manager', '✓ Progress tracking dashboard'].map((item, i) => (
                        <div key={i} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)' }}>{item}</div>
                    ))}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <a href="/contact" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}>
                        <FaChalkboardTeacher size={14} /> Request Corporate Quote
                    </a>
                    <a href="tel:9963186067" className="btn-ghost-dark" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>Call Us Now</a>
                </div>
            </div>

            

            {/* Quiz Modal */}
            {quizCourse && (
                <div className="modal-overlay">
                    <div className="modal-content" style={{ width: '560px' }}>
                        <div className="modal-header">
                            <h3 className="heading-lg">{quizCourse.title} - Skill Test</h3>
                            <button className="modal-close" onClick={() => setQuizCourse(null)}><X size={20} /></button>
                        </div>
                        <div className="modal-body">
                            {quizScore === null ? (
                                <div>
                                    <div style={{ fontSize: '13px', color: 'var(--color-muted-text)', marginBottom: '20px' }}>
                                        Question {currentQuestionIdx + 1} of {mockQuizData[quizCourse.id].length}
                                    </div>
                                    <h4 className="heading-md" style={{ marginBottom: '20px', color: 'var(--color-ink)' }}>
                                        {mockQuizData[quizCourse.id][currentQuestionIdx].q}
                                    </h4>
                                    <div>
                                        {mockQuizData[quizCourse.id][currentQuestionIdx].options.map((opt, i) => (
                                            <button key={i} className={`quiz-option ${selectedAnswers[currentQuestionIdx] === i ? 'selected' : ''}`} onClick={() => selectAnswer(i)}>
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                    <button className="btn-primary" style={{ width: '100%', marginTop: '20px' }} disabled={selectedAnswers[currentQuestionIdx] === undefined} onClick={nextQuestion}>
                                        {currentQuestionIdx < mockQuizData[quizCourse.id].length - 1 ? 'Next Question' : 'Submit Answers'}
                                    </button>
                                </div>
                            ) : (
                                <div style={{ textAlign: 'center' }}>
                                    {quizScore >= 100 ? (
                                        <div>
                                            <CheckCircle size={60} color="var(--color-evergreen-glow)" style={{ margin: '0 auto 16px auto' }} />
                                            <h3 className="heading-lg" style={{ color: 'var(--color-evergreen-glow)', marginBottom: '8px' }}>Assessment Cleared!</h3>
                                            <p style={{ fontSize: '14px', marginBottom: '24px' }}>You answered all questions correctly and unlocked your certification.</p>
                                            {showCertificate ? (
                                                <div className="certificate-container" style={{ margin: '20px 0' }}>
                                                    <h4 style={{ fontFamily: 'Georgia', fontSize: '14px', letterSpacing: '2px', color: 'var(--color-dark-olive)' }}>CERTIFICATE OF COMPLETION</h4>
                                                    <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--color-dark-olive)', margin: '12px auto' }}></div>
                                                    <p style={{ fontSize: '11px', fontStyle: 'italic', fontFamily: 'Georgia' }}>This is proudly presented to</p>
                                                    <h2 style={{ fontFamily: 'var(--font-aeonik)', fontWeight: '600', color: 'var(--color-ink)', margin: '12px 0' }}>VALUED SCHOLAR</h2>
                                                    <p style={{ fontSize: '11px', lineHeight: '1.5', fontFamily: 'Georgia', margin: '0 auto 20px auto', maxWidth: '340px' }}>
                                                        for successfully demonstrating technical proficiency in <strong>{quizCourse.title}</strong>, authenticated on {new Date().toISOString().split('T')[0]}.
                                                    </p>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontSize: '10px' }}>
                                                        <div style={{ textAlign: 'left' }}>
                                                            <div>ITBEES GLOBAL SERVICES</div>
                                                            <div style={{ color: 'var(--color-muted-text)' }}>Gachibowli, Hyderabad</div>
                                                        </div>
                                                        <div className="certificate-seal">SEAL</div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <button className="btn-secondary" style={{ marginBottom: '16px' }} onClick={() => setShowCertificate(true)}>
                                                    <FaCertificate style={{ marginRight: '6px' }} /> Generate Digital Certificate
                                                </button>
                                            )}
                                        </div>
                                    ) : (
                                        <div>
                                            <X size={60} color="#d93838" style={{ margin: '0 auto 16px auto' }} />
                                            <h3 className="heading-lg" style={{ color: '#d93838', marginBottom: '8px' }}>Review Required</h3>
                                            <p style={{ fontSize: '14px', marginBottom: '24px' }}>You scored {quizScore}%. A score of 100% is required to clear the skill certification.</p>
                                            <button className="btn-secondary" onClick={() => startQuiz(quizCourse)}>Try Again</button>
                                        </div>
                                    )}
                                    <button className="btn-mini" style={{ color: 'var(--color-muted-text)', marginTop: '16px' }} onClick={() => setQuizCourse(null)}>Close</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
        </>
    );
}
