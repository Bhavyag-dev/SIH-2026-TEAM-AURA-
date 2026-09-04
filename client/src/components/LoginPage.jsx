import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Sprout, 
  Lock, 
  Phone, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Building2, 
  UserCheck,
  Sparkles,
  Eye,
  EyeOff
} from 'lucide-react';
import * as api from '../services/api';

export default function LoginPage({ onLoginSuccess }) {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!identifier) {
      setError('Please enter your mobile number or email');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await api.loginUser({ identifier, password });
      if (res.success && res.user) {
        if (onLoginSuccess) onLoginSuccess(res.user);
        // Route to corresponding portal based on user role
        if (res.user.role === 'admin') navigate('/admin');
        else if (res.user.role === 'farmer') navigate('/farmer');
        else navigate('/buyer');
      } else {
        setError(res.error || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('Failed to connect to authentication server.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = async (role) => {
    setLoading(true);
    setError('');
    try {
      const res = await api.loginUser({ identifier: role });
      if (res.success && res.user) {
        if (onLoginSuccess) onLoginSuccess(res.user);
        if (role === 'admin') navigate('/admin');
        else if (role === 'farmer') navigate('/farmer');
        else navigate('/buyer');
      }
    } catch (err) {
      setError('Demo login failed. Server might be restarting.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-layout">
      <div className="auth-split-container">
        {/* Left Side: Brand & Feature Highlights */}
        <div className="auth-hero-panel">
          <div className="auth-hero-content">
            <div className="auth-brand-badge">
              <div className="brand-logo-icon">
                <Sprout size={24} className="text-white" />
              </div>
              <span className="auth-brand-name">KrishiRoute</span>
            </div>

            <h1 className="auth-hero-title">
              Smarter Routes.<br />
              Stronger Farmers.<br />
              <span className="text-emerald">A Greener Tomorrow.</span>
            </h1>

            <p className="auth-hero-sub">
              Direct farmgate procurement, multi-FPO vehicle routing optimization, and guaranteed instant escrow settlements.
            </p>

            <div className="auth-highlights-list">
              <div className="auth-hl-item">
                <div className="hl-icon"><CheckCircle2 size={16} /></div>
                <div>
                  <strong>81.2% Farmgate Realization</strong>
                  <p>Eliminate 4-tier middleman deductions for farmers</p>
                </div>
              </div>

              <div className="auth-hl-item">
                <div className="hl-icon"><CheckCircle2 size={16} /></div>
                <div>
                  <strong>18.4% Landed Cost Reduction</strong>
                  <p>Direct wholesale aggregation for bulk buyers</p>
                </div>
              </div>

              <div className="auth-hl-item">
                <div className="hl-icon"><CheckCircle2 size={16} /></div>
                <div>
                  <strong>100% Escrow Backed Payments</strong>
                  <p>Instant digital bank settlement upon QC delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="auth-form-panel">
          <div className="auth-card-box">
            <div className="auth-header-text">
              <h2>Welcome Back</h2>
              <p>Log in to access your KrishiRoute portal</p>
            </div>

            {error && (
              <div className="auth-error-banner">
                <span>⚠️ {error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="auth-form">
              <div className="form-group">
                <label className="form-label">Mobile Number or Email</label>
                <div className="input-with-icon">
                  <Phone size={17} className="input-icon" />
                  <input 
                    type="text" 
                    placeholder="e.g. +91 98290 44910 or email"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="auth-input"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="label-row">
                  <label className="form-label">Password</label>
                  <span className="text-link-sm" onClick={() => alert('Demo accounts use default password: "password"')}>
                    Forgot password?
                  </span>
                </div>
                <div className="input-with-icon">
                  <Lock size={17} className="input-icon" />
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="auth-input"
                  />
                  <button 
                    type="button" 
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                className="btn-auth-primary"
                disabled={loading}
              >
                {loading ? 'Authenticating...' : 'Sign In to Portal'}
                <ArrowRight size={17} />
              </button>
            </form>

            <div className="auth-divider">
              <span>OR ONE-CLICK DEMO LOGIN</span>
            </div>

            {/* Quick 1-Click Role Switcher */}
            <div className="demo-login-grid">
              <button 
                type="button" 
                className="demo-role-btn buyer"
                onClick={() => handleQuickDemo('buyer')}
                disabled={loading}
              >
                <Building2 size={18} />
                <div className="demo-role-text">
                  <strong>Buyer App</strong>
                  <span>Jaipur Hypermarket</span>
                </div>
              </button>

              <button 
                type="button" 
                className="demo-role-btn farmer"
                onClick={() => handleQuickDemo('farmer')}
                disabled={loading}
              >
                <Sprout size={18} />
                <div className="demo-role-text">
                  <strong>Farmer App</strong>
                  <span>Shree Krishi FPO</span>
                </div>
              </button>

              <button 
                type="button" 
                className="demo-role-btn admin"
                onClick={() => handleQuickDemo('admin')}
                disabled={loading}
              >
                <ShieldCheck size={18} />
                <div className="demo-role-text">
                  <strong>Admin Panel</strong>
                  <span>Fleet Control Tower</span>
                </div>
              </button>
            </div>

            <div className="auth-footer-link">
              <span>Don't have an account?</span>{' '}
              <Link to="/register" className="auth-link-bold">
                Register New Account
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .auth-page-layout {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8fafc;
          padding: 20px;
        }

        .auth-split-container {
          width: 100%;
          max-width: 1060px;
          min-height: 620px;
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 0 20px 40px -15px rgba(15, 23, 42, 0.08), 0 0 0 1px #e2e8f0;
          display: flex;
          overflow: hidden;
        }

        @media (max-width: 860px) {
          .auth-split-container {
            flex-direction: column;
          }
          .auth-hero-panel {
            padding: 30px 24px !important;
          }
        }

        .auth-hero-panel {
          flex: 1;
          background: linear-gradient(135deg, #064e3b 0%, #047857 60%, #059669 100%);
          color: #ffffff;
          padding: 48px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
        }

        .auth-hero-content {
          max-width: 440px;
        }

        .auth-brand-badge {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 28px;
        }

        .brand-logo-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(8px);
        }

        .auth-brand-name {
          font-family: var(--font-heading);
          font-size: 1.45rem;
          font-weight: 800;
          letter-spacing: -0.02em;
        }

        .auth-hero-title {
          font-family: var(--font-heading);
          font-size: 2.1rem;
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 16px;
        }

        .text-emerald {
          color: #86efac;
        }

        .auth-hero-sub {
          font-size: 0.92rem;
          color: #d1fae5;
          line-height: 1.5;
          margin-bottom: 32px;
        }

        .auth-highlights-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .auth-hl-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .hl-icon {
          color: #86efac;
          margin-top: 2px;
        }

        .auth-hl-item strong {
          display: block;
          font-size: 0.88rem;
        }

        .auth-hl-item p {
          font-size: 0.76rem;
          color: #d1fae5;
          margin: 0;
        }

        .auth-form-panel {
          flex: 1.1;
          padding: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
        }

        .auth-card-box {
          width: 100%;
          max-width: 390px;
        }

        .auth-header-text h2 {
          font-family: var(--font-heading);
          font-size: 1.6rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 4px;
        }

        .auth-header-text p {
          font-size: 0.85rem;
          color: #64748b;
          margin-bottom: 24px;
        }

        .auth-error-banner {
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #dc2626;
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 0.82rem;
          font-weight: 600;
          margin-bottom: 18px;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .label-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .form-label {
          font-size: 0.78rem;
          font-weight: 700;
          color: #334155;
        }

        .text-link-sm {
          font-size: 0.74rem;
          color: #059669;
          cursor: pointer;
          font-weight: 600;
        }

        .input-with-icon {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 12px;
          color: #94a3b8;
        }

        .auth-input {
          width: 100%;
          padding: 11px 12px 11px 38px;
          border-radius: 10px;
          border: 1px solid #cbd5e1;
          font-family: inherit;
          font-size: 0.88rem;
          color: #0f172a;
          outline: none;
          transition: border-color 0.2s;
        }

        .auth-input:focus {
          border-color: #059669;
          box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.15);
        }

        .password-toggle {
          position: absolute;
          right: 12px;
          background: transparent;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          display: flex;
          align-items: center;
        }

        .btn-auth-primary {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          border: none;
          background: #059669;
          color: #ffffff;
          font-family: var(--font-heading);
          font-size: 0.92rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          transition: background 0.2s;
          margin-top: 6px;
        }

        .btn-auth-primary:hover {
          background: #047857;
        }

        .auth-divider {
          text-align: center;
          margin: 22px 0 16px;
          position: relative;
        }

        .auth-divider::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background: #e2e8f0;
        }

        .auth-divider span {
          position: relative;
          background: #ffffff;
          padding: 0 12px;
          font-size: 0.68rem;
          font-weight: 800;
          color: #94a3b8;
          letter-spacing: 0.06em;
        }

        .demo-login-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }

        .demo-role-btn {
          padding: 10px 8px;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
          background: #f8fafc;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          text-align: center;
          transition: all 0.2s;
        }

        .demo-role-btn:hover {
          border-color: #059669;
          background: #ecfdf5;
          transform: translateY(-2px);
        }

        .demo-role-btn.buyer { color: #0284c7; }
        .demo-role-btn.farmer { color: #059669; }
        .demo-role-btn.admin { color: #d97706; }

        .demo-role-text strong {
          display: block;
          font-size: 0.74rem;
          color: #0f172a;
        }

        .demo-role-text span {
          display: block;
          font-size: 0.62rem;
          color: #64748b;
        }

        .auth-footer-link {
          text-align: center;
          margin-top: 24px;
          font-size: 0.82rem;
          color: #64748b;
        }

        .auth-link-bold {
          color: #059669;
          font-weight: 700;
          text-decoration: none;
        }

        .auth-link-bold:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
