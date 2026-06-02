import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Mail, Eye, EyeOff, CheckCircle,
  AlertCircle, ArrowRight, RefreshCw
} from 'lucide-react';
import './Auth.css';
import logoImg from '../assets/logo.png';
import { getAuthUser, setAuthUser } from '../utils/auth.js';

import { authApi } from '../utils/api.js';

export default function AuthPage() {
  const navigate = useNavigate();
  const [showPw, setShowPw] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in as admin
  useEffect(() => {
    const user = getAuthUser();
    if (user && user.role === 'admin') navigate('/admin', { replace: true });
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const { token, user } = await authApi.login({ email, password });
      if (user.role !== 'admin') {
        throw new Error('Access restricted to administrators only.');
      }
      setAuthUser({ ...user, token });
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid admin credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-logo">
          <img src={logoImg} alt="ITBEES Global" />
        </div>

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

        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <Link to="/" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', textDecoration: 'none' }}>
            &larr; Back to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
