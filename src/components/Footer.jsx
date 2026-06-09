import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/logo.png';
import {
    FaWhatsapp,
    FaLinkedin,
    FaTwitter,
    FaYoutube,
    FaInstagram,
    FaFacebook
} from 'react-icons/fa';

export default function Footer({ courses = [] }) {
    /* Build the list of footer course entries. For each entry, try to find
       a matching real course by keyword so the link can deep-link to
       `/training#course-{id}` and scroll to that card. */
    const footerCourses = useMemo(() => {
        const desired = [
            { label: 'Excel Basic & Advanced', keywords: ['excel'] },
            { label: 'Power Query',            keywords: ['power query'] },
            { label: 'VBA Automation',         keywords: ['vba'] },
            { label: 'Python for Analytics',   keywords: ['python'] },
            { label: 'Power BI',               keywords: ['power bi'] },
        ];

        const norm = (s) => (s || '').toLowerCase();

        return desired.map((entry) => {
            const match = courses.find((c) => {
                const title = norm(c.title);
                return entry.keywords.some((kw) => title.includes(kw));
            });
            return {
                label: entry.label,
                id: match ? match.id : null,
                title: match ? match.title : null,
            };
        });
    }, [courses]);

    const courseLink = (entry) =>
        entry.id ? `/training#course-${entry.id}` : '/training';

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">

                    {/* Company Info */}
                    <div>
                        <img
                            src={logoImg}
                            alt="ITBEES Global Pvt. Ltd."
                            style={{
                                height: '64px',
                                filter: `
      drop-shadow(0 0 12px rgba(255,255,255,1))
      drop-shadow(0 0 24px rgba(255,255,255,0.9))
      drop-shadow(0 0 40px rgba(255,255,255,0.8))
      drop-shadow(0 0 60px rgba(255,255,255,0.6))
      drop-shadow(0 0 80px rgba(255,255,255,0.4))
    `
                            }}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.style.display = 'none';
                            }}
                        />
                        <p className="footer-brand-desc">
                            Empowering professionals & enterprises with Smart Cloud,
                            BI Analytics, ERP Solutions, and industry-oriented training
                            programs.
                        </p>

                        <p
                            className='footer-contact'
                        >
                            Smart Cloud | BI Analytics | ERP Solutions
                        </p>
                        <p
                            className="footer-contact"
                            style={{
                                fontSize: '12px',
                                marginTop: '12px'
                            }}
                        >
                            Door No.1-60/8/A&B, 3rd Floor, KNR Square,
                            <br />
                            Opp. The Platina, Gachibowli,
                            <br />
                            Hyderabad - 500032
                        </p>
                    </div>

                    {/* Follow Us */}
                    <div>
                        <h5 className="footer-title">Follow Us</h5>

                        <div
                            style={{
                                display: 'flex',
                                gap: '14px',
                                flexWrap: 'wrap',
                                marginTop: '12px'
                            }}
                        >
                            <a
                                href="https://wa.me/9963186067"
                                target="_blank"
                                rel="noreferrer"
                                style={{ color: '#25D366' }}
                            >
                                <FaWhatsapp size={22} />
                            </a>

                            <a href="https://youtube.com/@itbeesglobalaidatahub?si=CdA8f2mdb7CY05Mf" target="_blank" rel="noreferrer" style={{ color: '#FF0000' }}>
                                <FaYoutube size={22} />
                            </a>

                            <a href="https://www.linkedin.com/company/itbees-global-private-limited/" target="_blank" rel="noreferrer" style={{ color: '#0077B5' }}>
                                <FaLinkedin size={22} />
                            </a>

                            <a href="https://instagram.com/itbeesglobalaidatahub?igshid=ZDdkNTZiNTM=" target="_blank" rel="noreferrer" style={{ color: '#E4405F' }}>
                                <FaInstagram size={22} />
                            </a>

                            {/* <a href="#" target="_blank" rel="noreferrer" style={{ color: '#1DA1F2' }}>
                                <FaTwitter size={22} />
                            </a> */}

                            {/* <a href="#" target="_blank" rel="noreferrer" style={{ color: '#1877F2' }}>
                                <FaFacebook size={22} />
                            </a> */}
                        </div>
                    </div>

                    {/* Courses */}
                    <div>
                        <h5 className="footer-title">Courses</h5>

                        <ul className="footer-links">
                            {footerCourses.map((entry, i) => (
                                <li key={i} className="footer-link-item">
                                    <Link
                                        to={courseLink(entry)}
                                        className="footer-link"
                                        title={entry.title || entry.label}
                                    >
                                        {entry.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h5 className="footer-title">Company</h5>

                        <ul className="footer-links">
                            <li className="footer-link-item">
                                <Link to="/about" className="footer-link">
                                    About Us
                                </Link>
                            </li>

                            <li className="footer-link-item">
                                <Link to="/services" className="footer-link">
                                    Services
                                </Link>
                            </li>

                            <li className="footer-link-item">
                                <Link to="/careers" className="footer-link">
                                    Talent Acquisition
                                </Link>
                            </li>

                            <li className="footer-link-item">
                                <Link to="/contact#send-message" className="footer-link">
                                    Contact Us
                                </Link>
                            </li>

                            {/* <li className="footer-link-item">
                                <Link to="/login" className="footer-link">
                                    Admin Portal
                                </Link>
                            </li> */}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h5 className="footer-title">Contact Us</h5>

                        <p className="footer-contact">
                            <strong>📞 Call / WhatsApp:</strong><br />
                            <a href="https://wa.me/919963186067" target="_blank" rel="noopener noreferrer" className="contact-link">
                                +91 9963186067
                            </a>
                        </p>



                        <p className="footer-contact">
                            <strong>📊 Data Automation & BI:</strong><br />
                            <a href="mailto:corporate@itbeesglobal.com" className="contact-link">
                                corporate@itbeesglobal.com
                            </a>
                        </p>

                        <p className="footer-contact">
                            <strong>🎓 Corporate Training:</strong><br />
                            <a href="mailto:corporatetrainings@itbeesglobal.com" className="contact-link">
                                corporatetrainings@itbeesglobal.com
                            </a>
                        </p>

                        <p className="footer-contact">
                            <strong>👥 HR Staffing:</strong><br />
                            <a href="mailto:hr@itbeesglobal.com" className="contact-link">
                                hr@itbeesglobal.com
                            </a>
                        </p>


                    </div>

                </div>

                <div className="footer-bottom">
                    <p>
                        &copy; {new Date().getFullYear()} ITBEES Global Pvt. Ltd.
                        All rights reserved.
                    </p>

                    <div style={{ display: 'flex', gap: '24px' }}>
                        <span style={{ color: 'var(--color-dark-olive)' }}>
                            ISO 27001 Certified
                        </span>

                        <span style={{ color: 'var(--color-dark-olive)' }}>
                            Privacy Policy
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
