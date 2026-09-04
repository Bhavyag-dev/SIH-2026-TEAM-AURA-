import React, { useState } from 'react';
import * as api from '../services/api';

const USER_TYPES = [
  { id: 'bulk_buyer', label: 'Bulk Buyer', icon: '🏪', desc: 'Wholesale trader, retailer, processor' },
  { id: 'ngo', label: 'NGO / FPO', icon: '🤝', desc: 'Farmer producer org, welfare group' },
  { id: 'individual', label: 'Individual', icon: '👤', desc: 'Consumer, small buyer' },
  { id: 'exporter', label: 'Exporter', icon: '✈️', desc: 'International trade and export' },
];

export default function UserLogin({ onLoginSuccess, onGoRegister }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.loginUser({ ...form, role: 'buyer' });
      onLoginSuccess(res.user || { email: form.email, role: 'buyer', name: 'Buyer User' });
    } catch {
      onLoginSuccess({ email: form.email, role: 'buyer', name: 'Buyer' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      {/* Left Hero */}
      <div style={styles.leftPanel}>
        <div style={styles.heroContent}>
          <div style={styles.badge}>🏪 Buyer / User Portal</div>
          <h1 style={styles.heroH1}>Source Fresh<br />Produce Directly</h1>
          <p style={styles.heroP}>
            Eliminate middlemen. Buy directly from verified farmers with AI-optimized logistics.
          </p>

          <div style={styles.typesGrid}>
            {USER_TYPES.map(t => (
              <div key={t.id} style={styles.typeCard}>
                <span style={{ fontSize: '1.4rem' }}>{t.icon}</span>
                <div>
                  <div style={{ color: '#fff', fontWeight: 700, fontSize: '.85rem' }}>{t.label}</div>
                  <div style={{ color: 'rgba(255,255,255,.65)', fontSize: '.72rem', marginTop: 2 }}>{t.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Form */}
      <div style={styles.rightPanel}>
        <div style={styles.formWrap}>
          <div style={styles.logoRow}>
            <div style={styles.logoIcon}>🌿</div>
            <div>
              <div style={styles.appName}>KrishiRoute</div>
              <div style={styles.appSub}>User / Buyer Login</div>
            </div>
          </div>

          <h2 style={styles.h2}>Sign In</h2>
          <p style={styles.sub}>Access your buyer dashboard</p>

          <form onSubmit={submit} style={styles.form}>
            {error && <div className="alert alert-error">⚠️ {error}</div>}
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input className="form-input" type="email" name="email" placeholder="you@company.com" value={form.email} onChange={handle} required autoFocus />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input className="form-input" type="password" name="password" placeholder="••••••••" value={form.password} onChange={handle} required />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '.82rem', color: 'var(--text-2)', cursor: 'pointer' }}>
                <input type="checkbox" style={{ accentColor: 'var(--primary)' }} /> Remember me
              </label>
              <a href="#" style={{ fontSize: '.82rem', color: 'var(--primary)', fontWeight: 600 }}>Forgot password?</a>
            </div>

            <button className="btn btn-primary btn-lg" type="submit" disabled={loading} style={{ width: '100%' }}>
              {loading ? <span className="spinner" style={{ width: 18, height: 18 }} /> : '🚀'}
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
            <div style={styles.demoNote}>🔑 Demo: Any email & password</div>
          </form>

          <div style={styles.footer}>
            New buyer? <button onClick={onGoRegister} style={styles.link}>Create account →</button>
          </div>

          <div style={styles.altLinks}>
            <a href="/farmer/login" style={styles.altLink}>👨‍🌾 Farmer Login</a>
            <span style={{ color: 'var(--border)' }}>|</span>
            <a href="/admin/login" style={styles.altLink}>🛡️ Admin Login</a>
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
    background: 'linear-gradient(145deg, #1e3a5f 0%, #1d4ed8 60%, #2563eb 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 48px',
  },
  heroContent: { maxWidth: 440 },
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
    fontSize: '2.6rem',
    fontWeight: 900,
    lineHeight: 1.2,
    marginBottom: 18,
    letterSpacing: '-.04em',
  },
  heroP: { color: 'rgba(255,255,255,.8)', fontSize: '.95rem', lineHeight: 1.7, marginBottom: 32 },
  typesGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 },
  typeCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    background: 'rgba(255,255,255,.1)',
    border: '1px solid rgba(255,255,255,.15)',
    borderRadius: 10,
    padding: '12px 14px',
  },
  rightPanel: {
    width: 500,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 40px',
    background: 'var(--bg)',
  },
  formWrap: { width: '100%', maxWidth: 400 },
  logoRow: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 36 },
  logoIcon: {
    width: 40, height: 40, borderRadius: 10,
    background: 'var(--grad-brand)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '1.2rem', boxShadow: '0 4px 12px var(--primary-glow)',
  },
  appName: { fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1rem', color: 'var(--text-1)' },
  appSub: { fontSize: '.72rem', color: 'var(--text-3)' },
  h2: { fontSize: '1.6rem', fontWeight: 800, marginBottom: 6 },
  sub: { fontSize: '.875rem', color: 'var(--text-3)', marginBottom: 28 },
  form: { display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 },
  demoNote: { textAlign: 'center', fontSize: '.78rem', color: 'var(--text-3)', background: 'var(--bg-raised)', padding: '8px', borderRadius: 8, border: '1px solid var(--border)' },
  footer: { marginTop: 20, textAlign: 'center', fontSize: '.875rem', color: 'var(--text-3)' },
  link: { background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)', fontWeight: 600, fontSize: '.875rem' },
  altLinks: { display: 'flex', justifyContent: 'center', gap: 12, marginTop: 16, alignItems: 'center' },
  altLink: { fontSize: '.8rem', color: 'var(--text-3)', textDecoration: 'none' },
};
