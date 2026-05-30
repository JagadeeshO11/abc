import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Mail, Lock, Eye, EyeOff, User, CheckCircle,
  ShieldCheck, AlertCircle, ArrowRight, RefreshCw
} from 'lucide-react';
import './Auth.css';
import logoImg from '../assets/logo.png';

/* ─── DUMMY CREDENTIALS (replace with real BE later) ─── */
const DUMMY_USERS = {
  admin: {
    email: 'admin@itbeesglobal.com',
    password: 'Admin@123',
    name: 'ITBEES Admin',
    role: 'admin',
    token: 'eyJhbGciOiJIUzI1NiJ9.ADMIN.DUMMY_JWT_TOKEN',
    verificationCode: '123456'
  },
  user: {
    email: 'user@itbeesglobal.com',
    password: 'User@123',
    name: 'Demo User',
    role: 'user',
    token: 'eyJhbGciOiJIUzI1NiJ9.USER.DUMMY_JWT_TOKEN',
    verificationCode: '654321'
  }
};

// ─── Shared localStorage helpers ───────────────────────
export const getAuthUser = () => {
  try {
    const raw = localStorage.getItem('itbees_auth');
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
};

const setAuthUser = (payload) => {
  localStorage.setItem('itbees_auth', JSON.stringify(payload));
};

export const clearAuthUser = () => localStorage.removeItem('itbees_auth');

// ─── Login / Signup Page (role = 'admin' | 'user') ─────
export default function AuthPage({ role = 'user' }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState('login');          // 'login' | 'signup'
  const [step, setStep] = useState('form');         // 'form' | 'verify'
  const [showPw, setShowPw] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [verifyCode, setVerifyCode] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // redirect if already logged in
  useEffect(() => {
    const user = getAuthUser();
    if (user) {
      navigate(user.role === 'admin' ? '/admin' : '/', { replace: true });
    }
  }, []);

  const resetState = () => {
    setError(''); setSuccess(''); setStep('form');
    setEmail(''); setPassword(''); setName(''); setVerifyCode('');
  };

  // ── Login handler ──
  const handleLogin = (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    setTimeout(() => {
      const cred = DUMMY_USERS[role];
      if (email === cred.email && password === cred.password) {
        setAuthUser({ name: cred.name, email: cred.email, role: cred.role, token: cred.token });
        setLoading(false);
        navigate(role === 'admin' ? '/admin' : '/', { replace: true });
      } else {
        setError('Invalid email or password. Check the demo credentials above.');
        setLoading(false);
      }
    }, 900);
  };

  // ── Signup handler (sends "verification email") ──
  const handleSignup = (e) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password) { setError('All fields are required.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    setTimeout(() => {
      // Simulate sending verification code
      setLoading(false);
      setStep('verify');
      setSuccess(`A verification code has been sent to ${email}. (Demo code: ${DUMMY_USERS[role].verificationCode})`);
    }, 1000);
  };

  // ── Verify OTP handler ──
  const handleVerify = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      if (verifyCode === DUMMY_USERS[role].verificationCode) {
        const token = `eyJhbGciOiJIUzI1NiJ9.${name.replace(' ', '_').toUpperCase()}.DUMMY_JWT_TOKEN`;
        setAuthUser({ name, email, role, token });
        setLoading(false);
        navigate(role === 'admin' ? '/admin' : '/', { replace: true });
      } else {
        setError('Invalid verification code. Try: ' + DUMMY_USERS[role].verificationCode);
        setLoading(false);
      }
    }, 800);
  };

  const isAdmin = role === 'admin';
  const demoCredentials = DUMMY_USERS[role];

  return (
    <div className="auth-page">
      <div className="auth-card">

        {/* Logo */}
        <div className="auth-logo">
          <img src={logoImg} alt="ITBEES Global" />
        </div>

        {/* Role badge */}
        <div style={{ textAlign: 'center' }}>
          <span className={`auth-role-badge ${isAdmin ? 'admin' : 'user'}`}>
            {isAdmin ? <ShieldCheck size={13} /> : <User size={13} />}
            {isAdmin ? 'Admin Portal' : 'Student Portal'}
          </span>
        </div>

        {/* Demo credentials banner */}
        <div className="auth-demo-banner">
          <strong>🔑 Demo Credentials</strong>
          Email: <b>{demoCredentials.email}</b> &nbsp;|&nbsp; Password: <b>{demoCredentials.password}</b>
        </div>

        {/* Login / Signup tabs */}
        <div className="auth-tabs">
          <button
            className={`auth-tab-btn ${tab === 'login' ? 'active' : ''}`}
            onClick={() => { setTab('login'); resetState(); }}
          >Sign In</button>
          <button
            className={`auth-tab-btn ${tab === 'signup' ? 'active' : ''}`}
            onClick={() => { setTab('signup'); resetState(); }}
          >Create Account</button>
        </div>

        {/* ───── LOGIN FORM ───── */}
        {tab === 'login' && (
          <>
            <h2 className="auth-title">Welcome back</h2>
            <p className="auth-subtitle">Sign in to your {isAdmin ? 'admin' : ''} account to continue.</p>
            {error && <div className="auth-error"><AlertCircle size={14} />{error}</div>}
            <form className="auth-form" onSubmit={handleLogin}>
              <div className="auth-field-group">
                <label className="auth-label">Email Address</label>
                <input
                  id="auth-email-login"
                  type="email"
                  className="auth-input"
                  placeholder="you@company.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
              <div className="auth-field-group">
                <label className="auth-label">Password</label>
                <div className="auth-password-wrap">
                  <input
                    id="auth-password-login"
                    type={showPw ? 'text' : 'password'}
                    className="auth-input"
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                  <button type="button" className="auth-eye-btn" onClick={() => setShowPw(!showPw)}>
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <button type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? <span className="auth-spinner" /> : <><ArrowRight size={16} /> Sign In</>}
              </button>
            </form>
            <div className="auth-link-row">
              {isAdmin
                ? <Link to="/login" className="auth-link">← Back to user login</Link>
                : <Link to="/admin/login" className="auth-link">Admin login →</Link>
              }
            </div>
          </>
        )}

        {/* ───── SIGNUP FORM ───── */}
        {tab === 'signup' && step === 'form' && (
          <>
            <h2 className="auth-title">Create account</h2>
            <p className="auth-subtitle">Join ITBEES Global. We'll send you a verification code.</p>
            {error && <div className="auth-error"><AlertCircle size={14} />{error}</div>}
            <form className="auth-form" onSubmit={handleSignup}>
              <div className="auth-field-group">
                <label className="auth-label">Full Name</label>
                <input
                  id="auth-name-signup"
                  type="text"
                  className="auth-input"
                  placeholder="Vikram Seth"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>
              <div className="auth-field-group">
                <label className="auth-label">Email Address</label>
                <input
                  id="auth-email-signup"
                  type="email"
                  className="auth-input"
                  placeholder="you@company.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="auth-field-group">
                <label className="auth-label">Password</label>
                <div className="auth-password-wrap">
                  <input
                    id="auth-password-signup"
                    type={showPw ? 'text' : 'password'}
                    className="auth-input"
                    placeholder="Min. 6 characters"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
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

        {/* ───── EMAIL VERIFICATION STEP ───── */}
        {tab === 'signup' && step === 'verify' && (
          <>
            <div className="auth-verify-icon"><Mail size={28} /></div>
            <h2 className="auth-title" style={{ textAlign: 'center' }}>Verify your email</h2>
            {success && <div className="auth-success"><CheckCircle size={14} />{success}</div>}
            {error && <div className="auth-error"><AlertCircle size={14} />{error}</div>}
            <form className="auth-form" onSubmit={handleVerify} style={{ marginTop: '16px' }}>
              <div className="auth-field-group">
                <label className="auth-label">Enter 6-digit code</label>
                <input
                  id="auth-verify-code"
                  type="text"
                  className="auth-input auth-otp-input"
                  placeholder="_ _ _ _ _ _"
                  maxLength={6}
                  value={verifyCode}
                  onChange={e => setVerifyCode(e.target.value.replace(/\D/g, ''))}
                  required
                />
              </div>
              <button type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? <span className="auth-spinner" /> : <><CheckCircle size={15} /> Verify & Create Account</>}
              </button>
              <button
                type="button"
                className="auth-submit-btn"
                style={{ background: 'transparent', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.1)', marginTop: 0 }}
                onClick={() => { setStep('form'); setError(''); setSuccess(''); }}
              >
                <RefreshCw size={14} /> Change Email
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
