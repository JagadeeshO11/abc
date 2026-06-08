import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Mail, Eye, EyeOff, CheckCircle,
  AlertCircle, ArrowRight, RefreshCw, Lock, ArrowLeft, KeyRound
} from 'lucide-react';
import './Auth.css';
import { getAuthUser } from '../utils/auth.js';
import { adminApi } from '../utils/api.js';

export default function AuthPage({ setAuthUser }) {
  const navigate = useNavigate();
  const [step, setStep] = useState('login');
  const [showPw, setShowPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    const user = getAuthUser();
    if (user) navigate('/admin', { replace: true });
  }, [navigate]);

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setInterval(() => setCountdown((c) => c - 1), 1000);
    return () => clearInterval(t);
  }, [countdown]);

  const goToLogin = () => { setStep('login'); setError(''); setSuccess(''); };
  const goBack = () => { setStep('login'); setError(''); setSuccess(''); setOtp(''); };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await adminApi.login({ email, password });
      const authData = {
        id: data.admin.id, email: data.admin.email, name: data.admin.name,
        role: data.admin.role, accessToken: data.accessToken, refreshToken: data.refreshToken,
      };
      setAuthUser(authData);
      localStorage.setItem('itbees_auth', JSON.stringify(authData));
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid admin credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await adminApi.forgotPassword(email);
      setSuccess('If an account exists, a verification code has been sent to your email.');
      setStep('otp');
      setCountdown(30);
    } catch (err) {
      setError(err.message || 'Failed to send verification code.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (countdown > 0) return;
    setError('');
    setLoading(true);
    try {
      await adminApi.forgotPassword(email);
      setSuccess('A new verification code has been sent.');
      setCountdown(30);
    } catch (err) {
      setError(err.message || 'Failed to resend code.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await adminApi.verifyResetOtp(email, otp);
      setStep('newPassword');
    } catch (err) {
      setError(err.message || 'Invalid or expired code.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await adminApi.resetPassword(email, otp, newPassword);
      setStep('done');
      setPassword('');
      setOtp('');
      setNewPassword('');
    } catch (err) {
      setError(err.message || 'Failed to reset password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>ITBEES Global</h1>
        </div>

        {step === 'login' && (
          <>
            <div className="auth-tabs">
              <button className="auth-tab-btn active">Administrator Login</button>
            </div>
            <h2 className="auth-title">Admin Portal</h2>
            <p className="auth-subtitle">Secure access for ITBEES Global administrators.</p>
            {error && <div className="auth-error"><AlertCircle size={14} />{error}</div>}
            <form className="auth-form" onSubmit={handleLogin}>
              <div className="auth-field-group">
                <label className="auth-label">Admin Email</label>
                <input type="email" className="auth-input" placeholder="admin@itbeesglobal.com"
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
                {loading ? <span className="auth-spinner" /> : <><ArrowRight size={16} /> Login to Dashboard</>}
              </button>
            </form>
            <div style={{ marginTop: '16px', textAlign: 'center' }}>
              <button type="button" onClick={() => { setStep('email'); setError(''); setSuccess(''); setOtp(''); }}
                style={{ background: 'none', border: 'none', color: 'var(--color-sky-blue)', cursor: 'pointer', fontSize: '13px', textDecoration: 'underline' }}>
                <Lock size={13} style={{ display: 'inline', marginRight: 4 }} /> Forgot your password?
              </button>
            </div>
            <div style={{ marginTop: '24px', textAlign: 'center' }}>
              <Link to="/" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', textDecoration: 'none' }}>
                &larr; Back to Public Website
              </Link>
            </div>
          </>
        )}

        {step === 'email' && (
          <>
            <div className="auth-tabs">
              <button className="auth-tab-btn active">Reset Password</button>
            </div>
            <h2 className="auth-title">Forgot Password?</h2>
            <p className="auth-subtitle">Enter the email associated with your admin account.</p>
            {error && <div className="auth-error"><AlertCircle size={14} />{error}</div>}
            {success && <div className="auth-success"><CheckCircle size={14} />{success}</div>}
            <form className="auth-form" onSubmit={handleSendOtp}>
              <div className="auth-field-group">
                <label className="auth-label">Email Address</label>
                <input type="email" className="auth-input" placeholder="admin@itbeesglobal.com"
                  value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" />
              </div>
              <button type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? <span className="auth-spinner" /> : <><Mail size={16} /> Send Verification Code</>}
              </button>
            </form>
            <div style={{ marginTop: '16px', textAlign: 'center' }}>
              <button type="button" onClick={goBack}
                style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: '13px' }}>
                <ArrowLeft size={13} style={{ display: 'inline', marginRight: 4 }} /> Back to Login
              </button>
            </div>
          </>
        )}

        {step === 'otp' && (
          <>
            <div className="auth-tabs">
              <button className="auth-tab-btn active">Verify Code</button>
            </div>
            <h2 className="auth-title">Check Your Email</h2>
            <p className="auth-subtitle">A 6-digit code was sent to <strong>{email}</strong>.</p>
            {error && <div className="auth-error"><AlertCircle size={14} />{error}</div>}
            {success && <div className="auth-success"><CheckCircle size={14} />{success}</div>}
            <form className="auth-form" onSubmit={handleVerifyOtp}>
              <div className="auth-field-group">
                <label className="auth-label">Verification Code</label>
                <input type="text" className="auth-input" placeholder="000000" maxLength={6}
                  value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  required inputMode="numeric" autoComplete="one-time-code"
                  style={{ textAlign: 'center', fontSize: '24px', letterSpacing: '8px', fontWeight: 700 }} />
              </div>
              <button type="submit" className="auth-submit-btn" disabled={loading || otp.length !== 6}>
                {loading ? <span className="auth-spinner" /> : <><CheckCircle size={16} /> Verify Code</>}
              </button>
            </form>
            <div style={{ marginTop: '16px', textAlign: 'center' }}>
              <button type="button" onClick={handleResendOtp} disabled={countdown > 0}
                style={{ background: 'none', border: 'none',
                  color: countdown > 0 ? 'rgba(255,255,255,0.3)' : 'var(--color-sky-blue)',
                  cursor: countdown > 0 ? 'not-allowed' : 'pointer', fontSize: '13px', textDecoration: 'underline' }}>
                <RefreshCw size={13} /> {countdown > 0 ? `Resend in ${countdown}s` : 'Resend code'}
              </button>
            </div>
          </>
        )}

        {step === 'newPassword' && (
          <>
            <div className="auth-tabs">
              <button className="auth-tab-btn active">Set New Password</button>
            </div>
            <h2 className="auth-title">Create New Password</h2>
            <p className="auth-subtitle">Code verified. Choose a new admin password.</p>
            {error && <div className="auth-error"><AlertCircle size={14} />{error}</div>}
            <form className="auth-form" onSubmit={handleResetPassword}>
              <div className="auth-field-group">
                <label className="auth-label">New Password</label>
                <div className="auth-password-wrap">
                  <input type={showNewPw ? 'text' : 'password'} className="auth-input"
                    placeholder="min 6 characters" value={newPassword} onChange={e => setNewPassword(e.target.value)}
                    required minLength={6} autoComplete="new-password" />
                  <button type="button" className="auth-eye-btn" onClick={() => setShowNewPw(!showNewPw)}>
                    {showNewPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <button type="submit" className="auth-submit-btn" disabled={loading || newPassword.length < 6}>
                {loading ? <span className="auth-spinner" /> : <><KeyRound size={16} /> Reset Password</>}
              </button>
            </form>
          </>
        )}

        {step === 'done' && (
          <>
            <div className="auth-tabs">
              <button className="auth-tab-btn active">Done</button>
            </div>
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <CheckCircle size={56} color="var(--color-evergreen-glow)" style={{ marginBottom: '16px' }} />
              <h2 style={{ color: 'var(--color-evergreen-glow)', fontSize: '22px', marginBottom: '8px' }}>Password Reset Successful</h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', marginBottom: '24px' }}>
                All sessions terminated. Please log in with your new password.
              </p>
              <button type="button" className="auth-submit-btn" onClick={goToLogin}>
                <ArrowRight size={16} /> Go to Login
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}