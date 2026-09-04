import React, { useState } from 'react';
import * as api from '../services/api';

const STATES = ['Andhra Pradesh','Bihar','Gujarat','Haryana','Karnataka','Madhya Pradesh','Maharashtra','Punjab','Rajasthan','Tamil Nadu','Telangana','Uttar Pradesh','West Bengal'];
const CROPS = ['Tomato','Onion','Potato','Wheat','Rice','Mango','Banana','Sugarcane','Maize','Soybean'];

export default function FarmerRegister({ onRegisterSuccess, onGoLogin }) {
  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    password: '', confirmPassword: '',
    state: '', district: '',
    landAcres: '', primaryCrop: '',
    aadhaarLast4: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handle = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const nextStep = (e) => {
    e.preventDefault();
    if (step === 1 && form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    setStep(2);
  };

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.registerUser({ ...form, role: 'farmer' });
      onRegisterSuccess(res.user || { ...form, role: 'farmer' });
    } catch {
      onRegisterSuccess({ ...form, role: 'farmer' });
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
            <div style={styles.appSub}>Farmer Registration</div>
          </div>
        </div>

        {/* Step Indicator */}
        <div style={styles.stepBar}>
          {[1, 2].map(s => (
            <React.Fragment key={s}>
              <div style={{ ...styles.stepDot, ...(step >= s ? styles.stepDotActive : {}) }}>
                {step > s ? '✓' : s}
              </div>
              {s < 2 && <div style={{ ...styles.stepLine, ...(step > 1 ? styles.stepLineActive : {}) }} />}
            </React.Fragment>
          ))}
        </div>
        <div style={styles.stepLabels}>
          <span style={{ fontSize: '.75rem', color: step === 1 ? 'var(--primary)' : 'var(--text-3)', fontWeight: step === 1 ? 700 : 400 }}>Account Info</span>
          <span style={{ fontSize: '.75rem', color: step === 2 ? 'var(--primary)' : 'var(--text-3)', fontWeight: step === 2 ? 700 : 400, marginLeft: 'auto' }}>Farm Details</span>
        </div>

        <h2 style={styles.h2}>{step === 1 ? 'Create Account' : 'Farm Information'}</h2>
        <p style={styles.sub}>{step === 1 ? 'Basic account setup' : 'Tell us about your farm'}</p>

        {error && <div className="alert alert-error" style={{ marginBottom: 16 }}>⚠️ {error}</div>}

        {step === 1 ? (
          <form onSubmit={nextStep} style={styles.form}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input className="form-input" name="name" placeholder="Rajan Patel" value={form.name} onChange={handle} required />
            </div>
            <div className="grid grid-2">
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input className="form-input" name="phone" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={handle} required />
              </div>
              <div className="form-group">
                <label className="form-label">Email (optional)</label>
                <input className="form-input" name="email" type="email" placeholder="you@email.com" value={form.email} onChange={handle} />
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
            <button className="btn btn-primary btn-lg" type="submit" style={{ width: '100%', marginTop: 4 }}>
              Continue → Farm Details
            </button>
          </form>
        ) : (
          <form onSubmit={submit} style={styles.form}>
            <div className="grid grid-2">
              <div className="form-group">
                <label className="form-label">State</label>
                <select className="form-select" name="state" value={form.state} onChange={handle} required>
                  <option value="">Select State</option>
                  {STATES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">District</label>
                <input className="form-input" name="district" placeholder="Your district" value={form.district} onChange={handle} required />
              </div>
            </div>
            <div className="grid grid-2">
              <div className="form-group">
                <label className="form-label">Land (acres)</label>
                <input className="form-input" name="landAcres" type="number" placeholder="5" value={form.landAcres} onChange={handle} />
              </div>
              <div className="form-group">
                <label className="form-label">Primary Crop</label>
                <select className="form-select" name="primaryCrop" value={form.primaryCrop} onChange={handle} required>
                  <option value="">Select Crop</option>
                  {CROPS.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Aadhaar (last 4 digits)</label>
              <input className="form-input" name="aadhaarLast4" placeholder="XXXX" maxLength={4} value={form.aadhaarLast4} onChange={handle} />
              <span className="form-hint">Optional — used for identity verification</span>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button type="button" className="btn btn-secondary btn-lg" style={{ flex: 1 }} onClick={() => setStep(1)}>
                ← Back
              </button>
              <button type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{ flex: 2 }}>
                {loading ? <span className="spinner" style={{ width: 18, height: 18 }} /> : '✅'}
                {loading ? 'Creating account...' : 'Register as Farmer'}
              </button>
            </div>
          </form>
        )}

        <div style={styles.footer}>
          Already registered? <button onClick={onGoLogin} style={styles.link}>Login here</button>
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
    backgroundImage: 'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(22,163,74,.1), transparent)',
  },
  card: {
    background: 'var(--bg-surface)',
    border: '1px solid var(--border)',
    borderRadius: 24,
    padding: '40px',
    width: '100%',
    maxWidth: 560,
    boxShadow: 'var(--shadow-lg)',
    animation: 'fadeUp .4s var(--ease) both',
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
    flexShrink: 0, transition: 'all .3s ease',
  },
  stepDotActive: {
    background: 'var(--grad-brand)', border: '2px solid var(--primary)',
    color: '#fff', boxShadow: '0 2px 8px var(--primary-glow)',
  },
  stepLine: { flex: 1, height: 2, background: 'var(--border)', transition: 'background .3s ease' },
  stepLineActive: { background: 'var(--primary)' },
  stepLabels: { display: 'flex', marginBottom: 24 },
  h2: { fontSize: '1.5rem', fontWeight: 800, marginBottom: 4 },
  sub: { fontSize: '.875rem', color: 'var(--text-3)', marginBottom: 24 },
  form: { display: 'flex', flexDirection: 'column', gap: 16 },
  footer: { marginTop: 24, textAlign: 'center', fontSize: '.875rem', color: 'var(--text-3)' },
  link: { background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)', fontWeight: 600, fontSize: '.875rem' },
};
