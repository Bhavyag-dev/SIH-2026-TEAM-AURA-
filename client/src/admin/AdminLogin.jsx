import React, { useState } from 'react';
import * as api from '../services/api';

export default function AdminLogin({ onLoginSuccess }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.loginUser({ ...form, role: 'admin' });
      if (res?.user || res?.token) {
        onLoginSuccess(res.user || { email: form.email, role: 'admin', name: 'Admin' });
      } else {
        // Demo bypass
        onLoginSuccess({ email: form.email, role: 'admin', name: 'Admin User' });
      }
    } catch {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.bg} />
      <div style={styles.card}>
        <div style={styles.logoRow}>
          <div style={styles.logoIcon}>🌿</div>
          <div>
            <div style={styles.appName}>KrishiRoute</div>
            <div style={styles.appSub}>Admin Control Tower</div>
          </div>
        </div>

        <div style={styles.heroSection}>
          <div style={styles.shield}>🛡️</div>
          <h1 style={styles.h1}>Admin Access</h1>
          <p style={styles.heroSub}>Secure portal for platform administrators</p>
        </div>

        <form onSubmit={submit} style={styles.form}>
          {error && (
            <div className="alert alert-error" style={{ marginBottom: 16 }}>
              ⚠️ {error}
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Admin Email</label>
            <input
              className="form-input"
              type="email"
              name="email"
              placeholder="admin@krishiroute.in"
              value={form.email}
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

          <button
            className="btn btn-primary btn-lg"
            type="submit"
            disabled={loading}
            style={{ width: '100%', marginTop: 8 }}
          >
            {loading ? <span className="spinner" style={{ width: 18, height: 18 }} /> : '🔐'}
            {loading ? 'Authenticating...' : 'Sign In to Admin Panel'}
          </button>

          <div style={styles.demoNote}>
            <span>🔑 Demo:</span> Use any email & password
          </div>
        </form>

        <div style={styles.footer}>
          Not an admin? <a href="/farmer/login">Farmer login</a> · <a href="/user/login">User login</a>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    position: 'relative',
    background: 'var(--bg)',
    overflow: 'hidden',
  },
  bg: {
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(22,163,74,.15), transparent)',
    pointerEvents: 'none',
  },
  card: {
    background: 'var(--bg-surface)',
    border: '1px solid var(--border)',
    borderRadius: 24,
    padding: '40px',
    width: '100%',
    maxWidth: 440,
    boxShadow: 'var(--shadow-lg)',
    position: 'relative',
    zIndex: 1,
    animation: 'fadeUp .4s var(--ease) both',
  },
  logoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginBottom: 32,
  },
  logoIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    background: 'var(--grad-brand)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.3rem',
    boxShadow: '0 4px 12px var(--primary-glow)',
  },
  appName: {
    fontFamily: 'var(--font-heading)',
    fontWeight: 800,
    fontSize: '1rem',
    color: 'var(--text-1)',
  },
  appSub: {
    fontSize: '.72rem',
    color: 'var(--text-3)',
    marginTop: 1,
  },
  heroSection: {
    textAlign: 'center',
    marginBottom: 32,
    paddingBottom: 28,
    borderBottom: '1px solid var(--border)',
  },
  shield: {
    fontSize: '2.5rem',
    marginBottom: 10,
    display: 'block',
  },
  h1: {
    fontSize: '1.6rem',
    fontWeight: 800,
    marginBottom: 6,
  },
  heroSub: {
    fontSize: '.875rem',
    color: 'var(--text-3)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  demoNote: {
    textAlign: 'center',
    fontSize: '.78rem',
    color: 'var(--text-3)',
    background: 'var(--bg-raised)',
    padding: '8px 12px',
    borderRadius: 8,
    border: '1px solid var(--border)',
  },
  footer: {
    marginTop: 24,
    textAlign: 'center',
    fontSize: '.8rem',
    color: 'var(--text-3)',
  },
};
