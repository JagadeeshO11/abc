import { useState, useEffect, useRef } from 'react';
import { X, MessageSquare, Send } from 'lucide-react';

const QUICK_REPLIES = [
    { label: '📊 Data & BI',        prompt: 'data automation and BI services' },
    { label: '🎓 Training',          prompt: 'corporate training courses' },
    { label: '👥 HR Staffing',       prompt: 'HR staffing and recruitment' },
    { label: '💼 Careers',           prompt: 'job openings and careers' },
    { label: '📞 Contact',           prompt: 'contact and office address' },
];

const BOT_RESPONSES = [
    {
        match: ['data', 'bi', 'automation', 'dashboard', 'analytics', 'powerbi', 'erp', 'cloud', 'database'],
        reply: `📊 **Data Automation & BI**\n\nWe build custom PowerBI dashboards, automate data pipelines, and handle SQL/PostgreSQL migrations.\n\n✅ Real-time metric pipelines\n✅ Custom BI visualizations\n✅ ERP system integration\n\nVisit our Services page → Data Automation tab for a live demo tool.`
    },
    {
        match: ['training', 'course', 'learn', 'excel', 'python', 'vba', 'power query', 'enroll', 'certification'],
        reply: `🎓 **Corporate Training Programs**\n\nWe offer instructor-led courses:\n\n• Excel Basic & Advanced\n• Power Query & VBA Automation\n• Python for Data Analytics\n• Power BI Dashboards\n\nAll courses include quizzes and certificates. Check our Training page to enroll.`
    },
    {
        match: ['hr', 'staffing', 'recruitment', 'hire', 'talent', 'staff'],
        reply: `👥 **HR Staffing & Recruitment**\n\nWe source, screen, and place top engineering talent for your teams.\n\n✅ Resume screening & skills assessment\n✅ Frontend, Data & ERP specialists\n✅ Contract and full-time placements\n\nContact us to discuss your hiring needs.`
    },
    {
        match: ['career', 'job', 'apply', 'opening', 'vacancy', 'position', 'role'],
        reply: `💼 **Open Positions**\n\nCurrent openings at ITBEES Global:\n\n• Senior React Developer — Hyderabad\n• Data Scientist & BI Analyst — Gachibowli\n• ERP Solutions Consultant — Remote\n• HR Talent Acquisition Specialist\n\nVisit our Careers page to apply and upload your resume.`
    },
    {
        match: ['contact', 'phone', 'address', 'email', 'office', 'location', 'whatsapp', 'call'],
        reply: `📞 **Contact ITBEES Global**\n\n📍 3rd Floor, KNR Square, Gachibowli, Hyderabad\n📱 +91 9963186067 (Call / WhatsApp)\n✉️ support@itbeesglobal.com\n\nOffice hours: Mon–Sat, 9 AM – 6 PM IST`
    },
    {
        match: ['price', 'cost', 'fee', 'pricing', 'charge', 'rate'],
        reply: `💰 **Pricing**\n\nOur course fees start from ₹4,999. Consulting and staffing packages are custom-quoted based on scope.\n\nContact us at +91 9963186067 or schedule a free demo for a tailored quote.`
    },
    {
        match: ['hello', 'hi', 'hey', 'good morning', 'good evening', 'namaste'],
        reply: `👋 Hello! Welcome to **ITBEES Global**.\n\nI can help you with:\n• Our services (Data BI, Training, HR Staffing)\n• Job openings & applications\n• Course enrollment\n• Contact & office details\n\nWhat would you like to know?`
    },
];

function formatBotText(text) {
    return text.split('\n').map((line, i) => {
        const bold = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        return <p key={i} style={{ margin: '2px 0' }} dangerouslySetInnerHTML={{ __html: bold }} />;
    });
}

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: 'Hello! Welcome to **ITBEES GLOBAL**.\n\nHow can I help you today? Use the quick options below or type your question.', agent: true }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [typing, setTyping] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, typing]);

    const sendMessage = (text) => {
        if (!text.trim()) return;
        // eslint-disable-next-line react-hooks/purity
        const userMsg = { id: Date.now(), text, agent: false };
        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setTyping(true);

        setTimeout(() => {
            const prompt = text.toLowerCase();
            const match = BOT_RESPONSES.find(r => r.match.some(k => prompt.includes(k)));
            const reply = match
                ? match.reply
                : `I'm not sure about that. You can ask me about our **services**, **training courses**, **job openings**, or **contact details**. Or call us at +91 9963186067.`;
            setTyping(false);
            setMessages(prev => [...prev, { id: Date.now() + 1, text: reply, agent: true }]);
        }, 900);
    };

    const handleSubmit = (e) => { e.preventDefault(); sendMessage(inputValue); };

    return (
        <>
            <button className="chatbot-trigger" onClick={() => setIsOpen(o => !o)} aria-label="Chat">
                {isOpen ? <X size={22} /> : (
                    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                        <MessageSquare size={22} />
                        <span style={{ fontSize: '9px', fontFamily: 'var(--font-aeonik)', fontWeight: '600', letterSpacing: '0.04em', lineHeight: 1 }}>CHAT</span>
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="chatbot-panel">
                    <div className="chatbot-header">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--color-corporate-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--color-ai-lime)' }}>
                                <MessageSquare size={16} color="var(--color-ai-lime)" />
                            </div>
                            <div>
                                <strong style={{ fontSize: '14px', fontFamily: 'var(--font-aeonik)', display: 'block' }}>ITBEES Support Bot</strong>
                                <span style={{ fontSize: '11px', color: 'var(--color-ai-lime)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-ai-lime)', display: 'inline-block' }} />
                                    Online — typically replies instantly
                                </span>
                            </div>
                        </div>
                        <button style={{ background: 'transparent', border: 'none', color: 'var(--color-white)', cursor: 'pointer' }} onClick={() => setIsOpen(false)}>
                            <X size={16} />
                        </button>
                    </div>

                    <div className="chatbot-messages">
                        {messages.map(msg => (
                            <div key={msg.id} className={`chat-bubble ${msg.agent ? 'chat-bubble-agent' : 'chat-bubble-user'}`}>
                                {msg.agent ? formatBotText(msg.text) : msg.text}
                            </div>
                        ))}
                        {typing && (
                            <div className="chat-bubble chat-bubble-agent" style={{ display: 'flex', gap: '4px', alignItems: 'center', padding: '10px 14px' }}>
                                <span className="chat-dot" /><span className="chat-dot" style={{ animationDelay: '0.2s' }} /><span className="chat-dot" style={{ animationDelay: '0.4s' }} />
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick reply chips */}
                    <div className="chatbot-chips">
                        {QUICK_REPLIES.map(q => (
                            <button key={q.label} className="chat-chip" onClick={() => sendMessage(q.prompt)}>
                                {q.label}
                            </button>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit} className="chatbot-input-container">
                        <input
                            type="text"
                            className="chatbot-input"
                            placeholder="Type a message..."
                            value={inputValue}
                            onChange={e => setInputValue(e.target.value)}
                        />
                        <button type="submit" className="chatbot-send-btn" disabled={typing || !inputValue.trim()}>{typing ? '...' : <Send size={14} />}</button>
                    </form>
                </div>
            )}
        </>
    );
}
