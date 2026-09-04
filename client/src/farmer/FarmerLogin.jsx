import React, { useState } from 'react';
import * as api from '../services/api';

export default function FarmerLogin({ onLoginSuccess, onGoRegister }) {
  const [form, setForm] = useState({ phone: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.loginUser({ ...form, role: 'farmer' });
      if (res?.user || res?.token) {
        onLoginSuccess(res.user || { phone: form.phone, role: 'farmer', name: 'Farmer User' });
      } else {
        onLoginSuccess({ phone: form.phone, role: 'farmer', name: 'Farmer' });
      }
    } catch {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.leftPanel}>
        <div style={styles.heroText}>
          <div style={styles.badge}>🌾 Farmer Portal</div>
          <h1 style={styles.heroH1}>Grow More,<br />Earn More</h1>
          <p style={styles.heroP}>
            Connect directly with buyers, get AI-optimized routes, and maximize your earnings by reducing post-harvest losses.
          </p>
          <div style={styles.features}>
            {['📊 Live Mandi Prices', '🚛 Optimized Logistics', '💰 Better Farm Income', '📦 Easy Listing'].map(f => (
              <div key={f} style={styles.featureItem}>
                <span style={styles.check}>✓</span> {f}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={styles.rightPanel}>
        <div style={styles.card}>
          <div style={styles.logoRow}>
            <div style={styles.logoIcon}>🌿</div>
            <div>
              <div style={styles.appName}>KrishiRoute</div>
              <div style={styles.appSub}>Farmer Login</div>
            </div>
          </div>

          <h2 style={styles.h2}>Welcome back 👋</h2>
          <p style={styles.sub}>Enter your phone number and password</p>

          <form onSubmit={submit} style={styles.form}>
            {error && <div className="alert alert-error">⚠️ {error}</div>}

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                className="form-input"
                type="tel"
                name="phone"
                placeholder="+91 98765 43210"
                value={form.phone}
                onChange={handle}
                required
                autoFocus
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                className="form-input"
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handle}
                required
              />
            </div>

            <button className="btn btn-primary btn-lg" type="submit" disabled={loading} style={{ width: '100%' }}>
              {loading ? <span className="spinner" style={{ width: 18, height: 18 }} /> : '🌾'}
              {loading ? 'Logging in...' : 'Login to Dashboard'}
            </button>

            <div style={styles.demoNote}>🔑 Demo: Any phone & password</div>
          </form>

          <div style={styles.footer}>
            New farmer? <button onClick={onGoRegister} style={styles.link}>Register here →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { display: 'flex', minHeight: '100vh' },
  leftPanel: {
    flex: 1,
    background: 'linear-gradient(145deg, #14532d 0%, #166534 40%, #15803d 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 48px',
  },
  heroText: { maxWidth: 420 },
  badge: {
    display: 'inline-block',
    background: 'rgba(255,255,255,.15)',
    color: '#fff',
    padding: '6px 14px',
    borderRadius: 100,
    fontSize: '.8rem',
    fontWeight: 600,
    marginBottom: 24,
    border: '1px solid rgba(255,255,255,.2)',
  },
  heroH1: {
    color: '#fff',
    fontSize: '2.8rem',
    fontWeight: 900,
    lineHeight: 1.15,
    marginBottom: 20,
    letterSpacing: '-.04em',
  },
  heroP: { color: 'rgba(255,255,255,.8)', fontSize: '1rem', lineHeight: 1.7, marginBottom: 32 },
  features: { display: 'flex', flexDirection: 'column', gap: 12 },
  featureItem: { color: 'rgba(255,255,255,.9)', fontSize: '.9rem', display: 'flex', alignItems: 'center', gap: 10 },
  check: {
    width: 22, height: 22,
    background: 'rgba(255,255,255,.2)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '.75rem',
    fontWeight: 700,
    flexShrink: 0,
  },
  rightPanel: {
    width: 480,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 32px',
    background: 'var(--bg)',
  },
  card: { width: '100%', maxWidth: 400 },
  logoRow: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 36 },
  logoIcon: {
    width: 40, height: 40,
    borderRadius: 10,
    background: 'var(--grad-brand)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '1.2rem',
    boxShadow: '0 4px 12px var(--primary-glow)',
  },
  appName: { fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1rem', color: 'var(--text-1)' },
  appSub: { fontSize: '.72rem', color: 'var(--text-3)' },
  h2: { fontSize: '1.6rem', fontWeight: 800, marginBottom: 6, color: 'var(--text-1)' },
  sub: { fontSize: '.875rem', color: 'var(--text-3)', marginBottom: 28 },
  form: { display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 },
  demoNote: {
    textAlign: 'center',
    fontSize: '.78rem',
    color: 'var(--text-3)',
    background: 'var(--bg-raised)',
    padding: '8px',
    borderRadius: 8,
    border: '1px solid var(--border)',
  },
  footer: { marginTop: 20, textAlign: 'center', fontSize: '.875rem', color: 'var(--text-3)' },
  link: { background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)', fontWeight: 600, fontSize: '.875rem' },
};

// Responsive: hide left panel on small screens
const mediaStyle = document.createElement('style');
mediaStyle.textContent = '@media (max-width: 768px) { .farmer-left-panel { display: none; } }';
document.head.appendChild(mediaStyle);
