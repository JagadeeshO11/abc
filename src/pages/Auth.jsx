import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Mail, Eye, EyeOff, CheckCircle,
  AlertCircle, ArrowRight, RefreshCw
} from 'lucide-react';
import './Auth.css';
import logoImg from '../assets/logo.png';
import { getAuthUser, setAuthUser } from '../utils/auth.js';

/* ─── CREDENTIALS (hardcoded, not exposed in UI) ─── */
const ACCOUNTS = [
  {
    email: 'admin@itbeesglobal.com',
    password: 'Admin@123',
    name: 'ITBEES Admin',
    role: 'admin',
    token: 'eyJhbGciOiJIUzI1NiJ9.ADMIN.DUMMY_JWT_TOKEN',
    verificationCode: '123456'
  },
  {
    email: 'user@itbeesglobal.com',
    password: 'User@123',
    name: 'Demo User',
    role: 'user',
    token: 'eyJhbGciOiJIUzI1NiJ9.USER.DUMMY_JWT_TOKEN',
    verificationCode: '654321'
  }
];

export default function AuthPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('login');   // 'login' | 'signup'
  const [step, setStep] = useState('form');  // 'form' | 'verify'
  const [showPw, setShowPw] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [verifyCode, setVerifyCode] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    const user = getAuthUser();
    if (user) navigate(user.role === 'admin' ? '/admin' : '/', { replace: true });
  }, [navigate]);

  const resetState = () => {
    setError(''); setSuccess(''); setStep('form');
    setEmail(''); setPassword(''); setName(''); setVerifyCode('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    setTimeout(() => {
      const match = ACCOUNTS.find(a => a.email === email && a.password === password);
      if (match) {
        setAuthUser({ name: match.name, email: match.email, role: match.role, token: match.token });
        navigate(match.role === 'admin' ? '/admin' : '/', { replace: true });
      } else {
        setError('Invalid email or password.');
      }
      setLoading(false);
    }, 900);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password) { setError('All fields are required.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('verify');
      setSuccess(`A verification code has been sent to ${email}. (Demo code: 654321)`);
    }, 1000);
  };

  const handleVerify = (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    setTimeout(() => {
      if (verifyCode === '654321') {
        const token = `eyJhbGciOiJIUzI1NiJ9.${name.replace(' ', '_').toUpperCase()}.DUMMY_JWT_TOKEN`;
        setAuthUser({ name, email, role: 'user', token });
        navigate('/', { replace: true });
      } else {
        setError('Invalid verification code. Try: 654321');
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-logo">
          <img src={logoImg} alt="ITBEES Global" />
        </div>

        <div className="auth-tabs">
          <button className={`auth-tab-btn ${tab === 'login' ? 'active' : ''}`}
            onClick={() => { setTab('login'); resetState(); }}>Sign In</button>
          <button className={`auth-tab-btn ${tab === 'signup' ? 'active' : ''}`}
            onClick={() => { setTab('signup'); resetState(); }}>Create Account</button>
        </div>

        {/* ── LOGIN ── */}
        {tab === 'login' && (
          <>
            <h2 className="auth-title">Welcome back</h2>
            <p className="auth-subtitle">Sign in to your account to continue.</p>
            {error && <div className="auth-error"><AlertCircle size={14} />{error}</div>}
            <form className="auth-form" onSubmit={handleLogin}>
              <div className="auth-field-group">
                <label className="auth-label">Email Address</label>
                <input type="email" className="auth-input" placeholder="you@company.com"
                  value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" />
              </div>
              <div className="auth-field-group">
                <label className="auth-label">Password</label>
                <div className="auth-password-wrap">
                  <input type={showPw ? 'text' : 'password'} className="auth-input" placeholder="••••••••"
                    value={password} onChange={e => setPassword(e.target.value)} required autoComplete="current-password" />
                  <button type="button" className="auth-eye-btn" onClick={() => setShowPw(!showPw)}>
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <button type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? <span className="auth-spinner" /> : <><ArrowRight size={16} /> Sign In</>}
              </button>
            </form>
          </>
        )}

        {/* ── SIGNUP ── */}
        {tab === 'signup' && step === 'form' && (
          <>
            <h2 className="auth-title">Create account</h2>
            <p className="auth-subtitle">Join ITBEES Global. We&apos;ll send you a verification code.</p>
            {error && <div className="auth-error"><AlertCircle size={14} />{error}</div>}
            <form className="auth-form" onSubmit={handleSignup}>
              <div className="auth-field-group">
                <label className="auth-label">Full Name</label>
                <input type="text" className="auth-input" placeholder="Your Name"
                  value={name} onChange={e => setName(e.target.value)} required />
              </div>
              <div className="auth-field-group">
                <label className="auth-label">Email Address</label>
                <input type="email" className="auth-input" placeholder="you@company.com"
                  value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div className="auth-field-group">
                <label className="auth-label">Password</label>
                <div className="auth-password-wrap">
                  <input type={showPw ? 'text' : 'password'} className="auth-input" placeholder="Min. 6 characters"
                    value={password} onChange={e => setPassword(e.target.value)} required />
                  <button type="button" className="auth-eye-btn" onClick={() => setShowPw(!showPw)}>
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <button type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? <span className="auth-spinner" /> : <><Mail size={15} /> Send Verification Code</>}
              </button>
            </form>
          </>
        )}

        {/* ── VERIFY ── */}
        {tab === 'signup' && step === 'verify' && (
          <>
            <div className="auth-verify-icon"><Mail size={28} /></div>
            <h2 className="auth-title" style={{ textAlign: 'center' }}>Verify your email</h2>
            {success && <div className="auth-success"><CheckCircle size={14} />{success}</div>}
            {error && <div className="auth-error"><AlertCircle size={14} />{error}</div>}
            <form className="auth-form" onSubmit={handleVerify} style={{ marginTop: '16px' }}>
              <div className="auth-field-group">
                <label className="auth-label">Enter 6-digit code</label>
                <input type="text" className="auth-input auth-otp-input" placeholder="_ _ _ _ _ _"
                  maxLength={6} value={verifyCode}
                  onChange={e => setVerifyCode(e.target.value.replace(/\D/g, ''))} required />
              </div>
              <button type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? <span className="auth-spinner" /> : <><CheckCircle size={15} /> Verify &amp; Create Account</>}
              </button>
              <button type="button" className="auth-submit-btn"
                style={{ background: 'transparent', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.1)', marginTop: 0 }}
                onClick={() => { setStep('form'); setError(''); setSuccess(''); }}>
                <RefreshCw size={14} /> Change Email
              </button>
            </form>
          </>
        )}

      </div>
    </div>
  );
}
