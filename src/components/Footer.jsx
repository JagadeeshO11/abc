import { Link } from 'react-router-dom';
import logoImg from '../assets/logo.png';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div>
                        {/* Footer Logo */}
                        <img
                            src={logoImg}
                            alt="ITBEES Global Pvt. Ltd."
                            style={{ height: '72px', width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)', marginBottom: '16px', display: 'block' }}
                        />
                        <p className="footer-brand-desc">
                            Empowering professionals &amp; enterprises with Smart Cloud, BI Analytics, ERP Solutions, and industry-oriented training programs.
                        </p>
                        <p style={{ fontSize: '12px', color: 'var(--color-dark-olive)', marginTop: '12px' }}>
                            Smart Cloud | BI Analytics | ERP Solutions
                        </p>
                    </div>
                    <div>
                        <h5 className="footer-title">Courses</h5>
                        <ul className="footer-links">
                            <li className="footer-link-item"><Link to="/training" className="footer-link">Excel Basic &amp; Advanced</Link></li>
                            <li className="footer-link-item"><Link to="/training" className="footer-link">Power Query</Link></li>
                            <li className="footer-link-item"><Link to="/training" className="footer-link">VBA Automation</Link></li>
                            <li className="footer-link-item"><Link to="/training" className="footer-link">Python for Analytics</Link></li>
                            <li className="footer-link-item"><Link to="/training" className="footer-link">Power BI</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="footer-title">Company</h5>
                        <ul className="footer-links">
                            <li className="footer-link-item"><Link to="/about" className="footer-link">About Us</Link></li>
                            <li className="footer-link-item"><Link to="/services" className="footer-link">Services</Link></li>
                            <li className="footer-link-item"><Link to="/careers" className="footer-link">Talent Acquisition</Link></li>
                            <li className="footer-link-item"><Link to="/contact" className="footer-link">Contact Us</Link></li>
                            <li className="footer-link-item"><Link to="/login" className="footer-link">Admin Portal</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="footer-title">Contact Us</h5>
                        <p className="footer-contact" style={{ marginBottom: '12px' }}>
                            <strong>📞 Call / WhatsApp:</strong><br />+91 96181 83234<br />+91 9963186067
                        </p>
                        <p className="footer-contact" style={{ marginBottom: '12px' }}>
                            <strong>📧 Email:</strong><br />rama.maruvada@itbeesglobal.com<br />support@itbeesglobal.com
                        </p>
                        <p className="footer-contact" style={{ fontSize: '12px' }}>
                            Door No.1-60/8/A&amp;B, 3rd Floor, KNR Square,<br />Opp. The Platina, Gachibowli,<br />Hyderabad - 500032
                        </p>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} ITBEES Global Pvt. Ltd. All rights reserved.</p>
                    <div style={{ display: 'flex', gap: '24px' }}>
                        <span style={{ color: 'var(--color-dark-olive)' }}>ISO 27001 Certified</span>
                        <span style={{ color: 'var(--color-dark-olive)' }}>Privacy Policy</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}