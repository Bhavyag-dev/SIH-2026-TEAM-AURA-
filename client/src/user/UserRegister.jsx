import React, { useState } from 'react';
import * as api from '../services/api';

const BUYER_TYPES = ['Bulk Buyer / Wholesaler', 'Retailer', 'NGO / FPO', 'Restaurant / Hotel', 'Food Processor', 'Exporter', 'Individual Consumer'];
const STATES = ['Andhra Pradesh','Bihar','Gujarat','Haryana','Karnataka','Madhya Pradesh','Maharashtra','Punjab','Rajasthan','Tamil Nadu','Telangana','Uttar Pradesh','West Bengal'];

export default function UserRegister({ onRegisterSuccess, onGoLogin }) {
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    password: '', confirmPassword: '',
    buyerType: '', orgName: '', state: '', city: '',
    gstNumber: '',
  });
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const nextStep = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) { setError('Passwords do not match'); return; }
    setError('');
    setStep(2);
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.registerUser({ ...form, role: 'buyer' });
      onRegisterSuccess(res.user || { ...form, role: 'buyer' });
    } catch {
      onRegisterSuccess({ ...form, role: 'buyer' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logoRow}>
          <div style={styles.logoIcon}>🌿</div>
          <div>
            <div style={styles.appName}>KrishiRoute</div>
            <div style={styles.appSub}>Buyer Registration</div>
          </div>
        </div>

        {/* Steps */}
        <div style={styles.stepBar}>
          {[1, 2].map(s => (
            <React.Fragment key={s}>
              <div style={{ ...styles.stepDot, ...(step >= s ? styles.stepDotActive : {}) }}>{step > s ? '✓' : s}</div>
              {s < 2 && <div style={{ ...styles.stepLine, ...(step > 1 ? styles.stepLineActive : {}) }} />}
            </React.Fragment>
          ))}
        </div>
        <div style={styles.stepLabels}>
          <span style={{ fontSize: '.75rem', color: step === 1 ? 'var(--primary)' : 'var(--text-3)', fontWeight: step === 1 ? 700 : 400 }}>Account Setup</span>
          <span style={{ fontSize: '.75rem', color: step === 2 ? 'var(--primary)' : 'var(--text-3)', fontWeight: step === 2 ? 700 : 400, marginLeft: 'auto' }}>Business Info</span>
        </div>

        <h2 style={styles.h2}>{step === 1 ? 'Create Buyer Account' : 'Business Details'}</h2>
        <p style={styles.sub}>{step === 1 ? 'Start buying directly from farmers' : 'Tell us about your business'}</p>

        {error && <div className="alert alert-error" style={{ marginBottom: 16 }}>⚠️ {error}</div>}

        {step === 1 ? (
          <form onSubmit={nextStep} style={styles.form}>
            <div className="form-group">
              <label className="form-label">Full Name / Contact Person</label>
              <input className="form-input" name="name" placeholder="Rajesh Singhania" value={form.name} onChange={handle} required />
            </div>
            <div className="grid grid-2">
              <div className="form-group">
                <label className="form-label">Email</label>
                <input className="form-input" name="email" type="email" placeholder="you@company.com" value={form.email} onChange={handle} required />
              </div>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input className="form-input" name="phone" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={handle} required />
              </div>
            </div>
            <div className="grid grid-2">
              <div className="form-group">
                <label className="form-label">Password</label>
                <input className="form-input" name="password" type="password" placeholder="••••••••" value={form.password} onChange={handle} required />
              </div>
              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <input className="form-input" name="confirmPassword" type="password" placeholder="••••••••" value={form.confirmPassword} onChange={handle} required />
              </div>
            </div>
            <button className="btn btn-primary btn-lg" type="submit" style={{ width: '100%' }}>
              Continue → Business Details
            </button>
          </form>
        ) : (
          <form onSubmit={submit} style={styles.form}>
            <div className="form-group">
              <label className="form-label">Buyer Type</label>
              <select className="form-select" name="buyerType" value={form.buyerType} onChange={handle} required>
                <option value="">Select type...</option>
                {BUYER_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Organization / Business Name</label>
              <input className="form-input" name="orgName" placeholder="Rajasthan Fresh Pvt. Ltd." value={form.orgName} onChange={handle} />
            </div>
            <div className="grid grid-2">
              <div className="form-group">
                <label className="form-label">State</label>
                <select className="form-select" name="state" value={form.state} onChange={handle} required>
                  <option value="">Select State</option>
                  {STATES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">City</label>
                <input className="form-input" name="city" placeholder="Mumbai" value={form.city} onChange={handle} required />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">GST Number (optional)</label>
              <input className="form-input" name="gstNumber" placeholder="27AAAPS0012A1ZS" value={form.gstNumber} onChange={handle} />
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button type="button" className="btn btn-secondary btn-lg" style={{ flex: 1 }} onClick={() => setStep(1)}>← Back</button>
              <button type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{ flex: 2 }}>
                {loading ? <span className="spinner" style={{ width: 18, height: 18 }} /> : '✅'}
                {loading ? 'Creating...' : 'Create Buyer Account'}
              </button>
            </div>
          </form>
        )}

        <div style={styles.footer}>
          Already registered? <button onClick={onGoLogin} style={styles.link}>Sign in</button>
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
    padding: '32px 20px',
    background: 'var(--bg)',
    backgroundImage: 'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(37,99,235,.1), transparent)',
  },
  card: {
    background: 'var(--bg-surface)',
    border: '1px solid var(--border)',
    borderRadius: 24,
    padding: '40px',
    width: '100%',
    maxWidth: 560,
    boxShadow: 'var(--shadow-lg)',
  },
  logoRow: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 },
  logoIcon: {
    width: 40, height: 40, borderRadius: 10,
    background: 'var(--grad-brand)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '1.2rem', boxShadow: '0 4px 12px var(--primary-glow)',
  },
  appName: { fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1rem', color: 'var(--text-1)' },
  appSub: { fontSize: '.72rem', color: 'var(--text-3)' },
  stepBar: { display: 'flex', alignItems: 'center', marginBottom: 6 },
  stepDot: {
    width: 28, height: 28, borderRadius: '50%',
    background: 'var(--bg-raised)',
    border: '2px solid var(--border)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '.75rem', fontWeight: 700, color: 'var(--text-3)',
    flexShrink: 0, transition: 'all .3s',
  },
  stepDotActive: { background: 'linear-gradient(135deg, #1d4ed8, #2563eb)', border: '2px solid #2563eb', color: '#fff', boxShadow: '0 2px 8px rgba(37,99,235,.3)' },
  stepLine: { flex: 1, height: 2, background: 'var(--border)', transition: 'background .3s' },
  stepLineActive: { background: '#2563eb' },
  stepLabels: { display: 'flex', marginBottom: 24 },
  h2: { fontSize: '1.5rem', fontWeight: 800, marginBottom: 4 },
  sub: { fontSize: '.875rem', color: 'var(--text-3)', marginBottom: 24 },
  form: { display: 'flex', flexDirection: 'column', gap: 16 },
  footer: { marginTop: 24, textAlign: 'center', fontSize: '.875rem', color: 'var(--text-3)' },
  link: { background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)', fontWeight: 600, fontSize: '.875rem' },
};
