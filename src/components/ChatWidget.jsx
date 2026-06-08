import { useState, useEffect, useRef } from 'react';
import { X, Bot, Send } from 'lucide-react';

function formatBotText(text) {
    return text.split('\n').map((line, i) => {
        const bold = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        return <p key={i} style={{ margin: '2px 0' }} dangerouslySetInnerHTML={{ __html: bold }} />;
    });
}

export default function ChatWidget({ courses = [], templates = [] }) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: 'Hello! Welcome to **ITBEES GLOBAL**.\n\nHow can I help you today? Use the quick options below or type your question.', agent: true }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [typing, setTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const QUICK_REPLIES = [
        { label: '📊 Services', prompt: 'our core services' },
        { label: '🎓 Courses', prompt: 'available training courses' },
        { label: '📂 Templates', prompt: 'available templates' },
        { label: '👥 Hiring', prompt: 'staffing and recruitment' },
        { label: '💼 Careers', prompt: 'jobs and company culture' },
        { label: '📍 Location', prompt: 'office address and hours' },
    ];

    const BOT_RESPONSES = [
        {
            match: ['services', 'what do you do', 'solutions', 'offer'],
            reply: `🚀 **ITBEES Global Services**\n\nWe provide end-to-end enterprise solutions across three core pillars:\n\n• **Data Automation & BI:** Custom PowerBI/Tableau dashboards and ETL pipelines.\n• **Corporate Training:** Professional upskilling in Data Science, SQL, and Automation.\n• **HR Staffing:** Sourcing top-tier Engineering and ERP talent for your teams.\n\nWhich area would you like to explore further?`
        },
        {
            match: ['data', 'bi', 'automation', 'dashboard', 'analytics', 'powerbi', 'erp', 'cloud', 'database', 'sql', 'etl'],
            reply: `📊 **Data Automation & BI**\n\nWe help enterprises turn raw data into real-time intelligence. Our expertise includes:\n\n✅ **BI Dashboards:** PowerBI, Tableau, and Looker for executive clarity.\n✅ **Pipelines:** Automated ETL workflows using Python, SQL, and Azure Data Factory.\n✅ **Cloud Infra:** AWS, Azure, and GCP architecture for scalable data lakes.\n\n⚡ *Result:* Our clients typically see an 80% reduction in manual reporting time.`
        },
        {
            match: ['training', 'course', 'learn', 'curriculum', 'enroll'],
            reply: `🎓 **Professional Training Programs**\n\nWe currently offer **${courses.length}** professional courses designed for enterprise teams:\n\n${courses.map(c => `• **${c.title}**: ${c.description}`).join('\n')}\n\nAll programs include **verified digital certificates** and hands-on labs.`
        },
        {
            match: ['template', 'asset', 'download', 'ready-to-use'],
            reply: `📂 **Premium Templates & Assets**\n\nBoost your productivity with our **${templates.length}** ready-to-use enterprise templates:\n\n${templates.map(t => `• **${t.name}**: ${t.description}`).join('\n')}\n\nThese are professionally designed for dashboards, reports, and ERP workflows.`
        },
        {
            match: ['excel', 'python', 'vba', 'power query', 'certification', 'sql'],
            reply: `🎓 **Skills & Certification**\n\nOur training focuses on high-impact tools:\n\n• **Excel & VBA:** Complex automation & macros.\n• **Power BI:** DAX, Data Modeling & Live KPIs.\n• **Python:** Data analysis with Pandas & NumPy.\n• **SQL:** Robust database querying.\n\nEach course is led by practitioners with 10+ years of experience.`
        },
        {
            match: ['hr', 'staffing', 'recruitment', 'hire', 'talent', 'staff', 'roles', 'placed'],
            reply: `👥 **HR Staffing & Recruitment**\n\nWe connect you with elite technical talent. We specialize in placing:\n\n✅ Frontend (React/Vue) & Backend Engineers\n✅ Data Scientists & BI Developers\n✅ ERP Consultants (SAP, Oracle, Dynamics)\n\n🕒 **Speed:** We deliver qualified shortlists within 48 hours. Our 95% client retention rate speaks for our quality.`
        },
        {
            match: ['career', 'job', 'apply', 'opening', 'vacancy', 'position', 'role', 'culture', 'perks', 'work'],
            reply: `💼 **Join the ITBEES Team**\n\nWe're always looking for passionate engineers and analysts! Working here means:\n\n• 🚀 **Fast Growth:** Quarterly performance reviews.\n• 🎓 **Free L&D:** Access to all our training courses.\n• 🏥 **Health Benefits:** Comprehensive insurance for families.\n• 🏠 **Hybrid Work:** Flexible hours and remote options.\n\nVisit our Careers page to view open roles in Gachibowli and apply!`
        },
        {
            match: ['contact', 'phone', 'address', 'email', 'office', 'location', 'whatsapp', 'call', 'hours', 'map', 'visit'],
            reply: `📞 **Get in Touch**\n\n📍 **Headquarters:** 3rd Floor, KNR Square, Opp. The Platina, Gachibowli, Hyderabad - 500032.\n📱 **Phone/WhatsApp:** +91 9963186067\n✉️ **Email:** support@itbeesglobal.com\n\n⏰ **Office Hours:** Mon–Sat, 9:00 AM – 6:00 PM IST.\n\nWe typically respond to emails within 24 hours and WhatsApp instantly!`
        },
        {
            match: ['about', 'company', 'who', 'history', 'founded', 'leader'],
            reply: `🐝 **About ITBEES Global**\n\nFounded in 2014 in Hyderabad, we are an ISO-certified enterprise partner. Led by **Suresh Babu (CEO)** and **Anitha Reddy (CTO)**, we've helped 150+ organizations across India and SEA navigate technical complexity with absolute data security.`
        },
        {
            match: ['hello', 'hi', 'hey', 'good morning', 'good evening', 'namaste'],
            reply: `👋 Hello! Welcome to **ITBEES Global**.\n\nI'm your virtual assistant. I can help you with:\n• **Services** (Data, BI, ERP)\n• **Courses** (${courses.length} available)\n• **Templates** (${templates.length} available)\n• **Recruitment** & **Careers**\n• **Contact** Details\n\nWhat's on your mind today?`
        },
    ];

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
                : `I'm not sure about that. You can ask me about our **services**, **${courses.length} training courses**, **${templates.length} templates**, **job openings**, or **contact details**. Or call us at +91 9963186067.`;
            setTyping(false);
            setMessages(prev => [...prev, { id: Date.now() + 1, text: reply, agent: true }]);
        }, 900);
    };

    const handleSubmit = (e) => { e.preventDefault(); sendMessage(inputValue); };

    return (
        <>
            <button className="chatbot-trigger" onClick={() => setIsOpen(o => !o)} aria-label="Chat">
                {isOpen ? <X size={22} /> : (
                    <img
                        src="https://res.cloudinary.com/dwmjz9csc/image/upload/v1780724072/ChatGPT_Image_Jun_6_2026_11_04_11_AM_gxcdsy.png"
                        alt="ITBEES Chat"
                        className="chatbot-trigger-icon"
                    />
                )}
            </button>

            {isOpen && (
                <div className="chatbot-panel">
                    <div className="chatbot-header">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div
                                style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                    border: '2px solid var(--color-ai-lime)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <img
                                    src="https://res.cloudinary.com/dwmjz9csc/image/upload/v1780724072/ChatGPT_Image_Jun_6_2026_11_04_11_AM_gxcdsy.png"
                                    alt="ITBEES Chat"
                                    style={{
                                        width: '80%',
                                        height: '80%',
                                        objectFit: 'cover'
                                    }}
                                />
                            </div>
                            <div>
                                <strong style={{ fontSize: '14px', fontFamily: 'var(--font-aeonik)', display: 'block' }}>ITBEES Global</strong>
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
