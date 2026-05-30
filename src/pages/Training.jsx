
import { useState } from 'react';
import { BookOpen, X, Lock, CheckCircle } from 'lucide-react';

export default function Training({ courses, setEnrollments, setPayments, triggerToast, addLog }) {
    const [selectedCourse, setSelectedCourse] = useState(null);

    // Checkout simulator state
    const [enrollName, setEnrollName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardExpiry, setCardExpiry] = useState('');
    const [cardCVV, setCardCVV] = useState('');

    // Quiz Module state
    const [quizCourse, setQuizCourse] = useState(null);
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [quizScore, setQuizScore] = useState(null);
    const [showCertificate, setShowCertificate] = useState(false);

    const mockQuizData = {
        'course-1': [
            { q: 'What does DAX stand for in PowerBI?', options: ['Data Analysis Expressions', 'Dynamic Analytics Extension', 'Database Access XML', 'Digital Asset Exchange'], ans: 0 },
            { q: 'Which connection mode provides real-time access to database systems in PowerBI?', options: ['Import Mode', 'DirectQuery Mode', 'Dual Mode', 'Live Connection'], ans: 1 }
        ],
        'course-2': [
            { q: 'What is the primary role of a ledger in ERP?', options: ['Store developer logs', 'Maintain company financial books', 'Route APIs', 'Assess candidate status'], ans: 1 },
            { q: 'Which module manages client information and sales pipelines in ERP?', options: ['SCM', 'CRM', 'HRM', 'MRP'], ans: 1 }
        ],
        'course-3': [
            { q: 'What is the primary optimization benefit of React.memo?', options: ['Secures payments', 'Prevents unnecessary functional re-renders', 'Creates webhooks', 'Compiles SCSS into vanilla CSS'], ans: 1 },
            { q: 'Which hook is most appropriate to store a reference value that does not trigger re-render?', options: ['useState', 'useRef', 'useEffect', 'useMemo'], ans: 1 }
        ]
    };

    const handleEnrollSubmit = (e) => {
        e.preventDefault();
        if (!enrollName || !cardNumber || !cardExpiry || !cardCVV) {
            alert('Please fill out all billing credentials.');
            return;
        }

        // Add payment entry
        const newInvoice = `INV-${Date.now().toString().substring(7)}`;
        const newPayment = {
            id: `pay-${Date.now()}`,
            description: `Course Enrollment: ${selectedCourse.title} - ${enrollName}`,
            amount: `₹${selectedCourse.price.toLocaleString('en-IN')}`,
            method: 'Credit Card',
            status: 'Success',
            date: new Date().toISOString().split('T')[0],
            invoiceId: newInvoice
        };
        setPayments(prev => [newPayment, ...prev]);

        // Add enrollment entry
        const newEnroll = {
            id: `enr-${Date.now()}`,
            courseTitle: selectedCourse.title,
            studentName: enrollName,
            date: new Date().toISOString().split('T')[0],
            status: 'approved',
            progress: 0
        };
        setEnrollments(prev => [newEnroll, ...prev]);

        triggerToast(`Payment successful! You are now enrolled in ${selectedCourse.title}.`);
        addLog('payment', `Received payment ₹${selectedCourse.price} for course ${selectedCourse.title} from ${enrollName}.`);

        // Reset checkout form
        setEnrollName('');
        setCardNumber('');
        setCardExpiry('');
        setCardCVV('');
        setSelectedCourse(null);
    };

    const startQuiz = (course) => {
        setQuizCourse(course);
        setCurrentQuestionIdx(0);
        setSelectedAnswers({});
        setQuizScore(null);
        setShowCertificate(false);
    };

    const selectAnswer = (ansIdx) => {
        setSelectedAnswers(prev => ({
            ...prev,
            [currentQuestionIdx]: ansIdx
        }));
    };

    const nextQuestion = () => {
        if (currentQuestionIdx < mockQuizData[quizCourse.id].length - 1) {
            setCurrentQuestionIdx(currentQuestionIdx + 1);
        } else {
            // Calculate Score
            const questions = mockQuizData[quizCourse.id];
            let correct = 0;
            questions.forEach((q, idx) => {
                if (selectedAnswers[idx] === q.ans) correct++;
            });
            const percent = Math.round((correct / questions.length) * 100);
            setQuizScore(percent);
            if (percent >= 100) {
                addLog('system', `Student passed ${quizCourse.title} quiz assessment with score 100%.`);
            }
        }
    };

    return (
        <div className="container section-gap">
            <div className="section-header">
                <div className="badge-mint" style={{ marginBottom: '16px' }}>LEARN &amp; SCALE</div>
                <h1 className="display-lg">CORPORATE TRAINING PROGRAMS</h1>
                <p className="section-subtitle">Enroll teams in database automation, React frontend layouts, or cloud dashboards.</p>
            </div>

            {/* Course Catalog list */}
            <div className="grid-3" style={{ marginBottom: '64px' }}>
                {courses.map(course => (
                    <div key={course.id} className="card-white" style={{ textAlign: 'left' }}>
                        <div className="course-card-img-placeholder">
                            <BookOpen size={36} />
                        </div>
                        <span className="badge-blue" style={{ marginBottom: '8px' }}>{course.category}</span>
                        <h3 className="heading-lg" style={{ color: 'var(--color-ink)', marginBottom: '8px' }}>{course.title}</h3>
                        <p style={{ fontSize: '13px', color: 'var(--color-muted-text)', marginBottom: '16px', flex: 1 }}>{course.description}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-soft-gray)', paddingTop: '16px' }}>
                            <div>
                                <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--color-ink)' }}>₹{course.price.toLocaleString('en-IN')}</div>
                                <div style={{ fontSize: '11px', color: 'var(--color-muted-text)' }}>{course.duration} &bull; {course.modules} Modules</div>
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button className="btn-primary" style={{ padding: '8px 12px', fontSize: '12px' }} onClick={() => setSelectedCourse(course)}>
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

            {/* Checkout Modal */}
            {selectedCourse && (
                <div className="modal-overlay">
                    <div className="modal-content" style={{ width: '460px' }}>
                        <div className="modal-header">
                            <h3 className="heading-lg">Course Checkout</h3>
                            <button className="modal-close" onClick={() => setSelectedCourse(null)}><X size={20} /></button>
                        </div>
                        <div className="modal-body">
                            <div style={{ marginBottom: '20px', borderBottom: '1px solid var(--color-soft-gray)', paddingBottom: '16px' }}>
                                <div style={{ fontSize: '12px', color: 'var(--color-muted-text)', textTransform: 'uppercase' }}>PRODUCT</div>
                                <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--color-ink)', marginTop: '4px' }}>{selectedCourse.title}</div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontSize: '14px' }}>
                                    <span>Price:</span>
                                    <strong>₹{selectedCourse.price.toLocaleString('en-IN')}</strong>
                                </div>
                            </div>

                            <form onSubmit={handleEnrollSubmit}>
                                <div className="form-group">
                                    <label className="form-label">Student Name</label>
                                    <input
                                        type="text"
                                        className="input-field"
                                        required
                                        placeholder="Anil Kumar"
                                        value={enrollName}
                                        onChange={(e) => setEnrollName(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Card Number</label>
                                    <input
                                        type="text"
                                        className="input-field"
                                        required
                                        placeholder="4111 2222 3333 4444"
                                        maxLength="19"
                                        value={cardNumber}
                                        onChange={(e) => setCardNumber(e.target.value)}
                                    />
                                </div>
                                <div className="grid-2">
                                    <div className="form-group">
                                        <label className="form-label">Expiry Date</label>
                                        <input
                                            type="text"
                                            className="input-field"
                                            required
                                            placeholder="MM/YY"
                                            maxLength="5"
                                            value={cardExpiry}
                                            onChange={(e) => setCardExpiry(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">CVV</label>
                                        <input
                                            type="password"
                                            className="input-field"
                                            required
                                            placeholder="***"
                                            maxLength="3"
                                            value={cardCVV}
                                            onChange={(e) => setCardCVV(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div style={{ fontSize: '11px', color: 'var(--color-muted-text)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '20px' }}>
                                    <Lock size={12} /> SSL Secure Connection.
                                </div>

                                <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                                    Pay &amp; Enroll Securely
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

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
                                            <button
                                                key={i}
                                                className={`quiz-option ${selectedAnswers[currentQuestionIdx] === i ? 'selected' : ''}`}
                                                onClick={() => selectAnswer(i)}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        className="btn-primary"
                                        style={{ width: '100%', marginTop: '20px' }}
                                        disabled={selectedAnswers[currentQuestionIdx] === undefined}
                                        onClick={nextQuestion}
                                    >
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

                                            {/* Interactive Mock Certificate view toggle */}
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
                                                    Generate Digital Certificate
                                                </button>
                                            )}
                                        </div>
                                    ) : (
                                        <div>
                                            <X size={60} color="#d93838" style={{ margin: '0 auto 16px auto' }} />
                                            <h3 className="heading-lg" style={{ color: '#d93838', marginBottom: '8px' }}>Review Required</h3>
                                            <p style={{ fontSize: '14px', marginBottom: '24px' }}>You scored {quizScore}%. A score of 100% is required to clear the skill certification.</p>
                                            <button className="btn-secondary" onClick={() => startQuiz(quizCourse)}>
                                                Try Again
                                            </button>
                                        </div>
                                    )}
                                    <button className="btn-mini" style={{ color: 'var(--color-muted-text)', marginTop: '16px' }} onClick={() => setQuizCourse(null)}>
                                        Close
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}