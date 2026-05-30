import { useState, useEffect, useRef } from 'react';
import { X, MessageSquare, Send } from 'lucide-react';

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: 'Hello! Welcome to ITBEES GLOBAL. I can guide you through our Smart Cloud, BI Analytics, or training modules. What can I help you with?', agent: true }
    ]);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userMsg = { id: Date.now(), text: inputValue, agent: false };
        setMessages(prev => [...prev, userMsg]);
        const prompt = inputValue.toLowerCase();
        setInputValue('');

        // Predefined AI responses simulating AI Chatbot integration
        setTimeout(() => {
            let botResponse = "I'm sorry, I didn't quite get that. You can ask about our 'services', 'careers', 'training', or 'contact' details.";

            if (prompt.includes('service') || prompt.includes('cloud') || prompt.includes('erp') || prompt.includes('bi')) {
                botResponse = "ITBEES Global specializes in Data Automation, Smart Cloud setups, and custom ERP management dashboards. Check our 'Services' page to run data simulation tools.";
            } else if (prompt.includes('career') || prompt.includes('job') || prompt.includes('apply')) {
                botResponse = "We have open roles like Senior React Developer and Data Scientist in Gachibowli, Hyderabad! Navigate to our 'Careers' page to upload your resume.";
            } else if (prompt.includes('training') || prompt.includes('course') || prompt.includes('learn')) {
                botResponse = "We offer structured courses in PowerBI, ERP architecture, and React frameworks. Check our 'Training' catalog to test your skills and clear certifications.";
            } else if (prompt.includes('contact') || prompt.includes('phone') || prompt.includes('address') || prompt.includes('email')) {
                botResponse = "Call or WhatsApp us at +91 9963186067, or email support@itbeesglobal.com. Our office is on the 3rd Floor, KNR Square, Gachibowli, Hyderabad.";
            } else if (prompt.includes('hello') || prompt.includes('hi')) {
                botResponse = "Hello! Ask me about our courses, active career listings, or client inquiries.";
            }

            setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, agent: true }]);
        }, 800);
    };

    return (
        <>
            {/* Floating Chat Trigger button */}
            <button className="chatbot-trigger" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
            </button>

            {/* Floating chat panel */}
            {isOpen && (
                <div className="chatbot-panel">
                    <div className="chatbot-header">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-ai-lime)', boxShadow: '0 0 8px var(--color-ai-lime)' }}></div>
                            <strong style={{ fontSize: '14px', fontFamily: 'var(--font-aeonik)' }}>ITBEES Support AI</strong>
                        </div>
                        <button style={{ background: 'transparent', border: 'none', color: 'var(--color-white)', cursor: 'pointer' }} onClick={() => setIsOpen(false)}>
                            <X size={16} />
                        </button>
                    </div>

                    <div className="chatbot-messages">
                        {messages.map(msg => (
                            <div key={msg.id} className={`chat-bubble ${msg.agent ? 'chat-bubble-agent' : 'chat-bubble-user'}`}>
                                {msg.text}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={handleSendMessage} className="chatbot-input-container">
                        <input
                            type="text"
                            className="chatbot-input"
                            placeholder="Ask about jobs, courses, consulting..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <button type="submit" className="chatbot-send-btn">
                            <Send size={14} />
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}
