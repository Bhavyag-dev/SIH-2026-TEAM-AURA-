import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminRoutes from './admin/AdminRoutes';
import FarmerRoutes from './farmer/FarmerRoutes';
import UserRoutes from './user/UserRoutes';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Portal */}
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* Farmer Portal */}
        <Route path="/farmer/*" element={<FarmerRoutes />} />

        {/* User / Buyer Portal */}
        <Route path="/user/*" element={<UserRoutes />} />

        {/* Landing / Root → show portal picker */}
        <Route path="/" element={<PortalPicker />} />

        {/* Legacy routes */}
        <Route path="/login" element={<Navigate to="/user/login" replace />} />
        <Route path="/register" element={<Navigate to="/user/register" replace />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

function PortalPicker() {
  return (
    <div style={styles.page}>
      <div style={styles.bg} />
      <div style={styles.content}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}>🌿</div>
          <div>
            <div style={styles.logoName}>KrishiRoute</div>
            <div style={styles.logoTag}>Connect · Optimize · Nourish</div>
          </div>
        </div>

        <h1 style={styles.title}>Welcome to<br />KrishiRoute Platform</h1>
        <p style={styles.subtitle}>
          AI-powered supply chain platform connecting farmers, buyers and logistics across India.
          Choose your portal to continue.
        </p>

        <div style={styles.portals}>
          <a href="/farmer/home" style={{ ...styles.portalCard, borderColor: '#16a34a' }}>
            <div style={{ ...styles.portalIcon, background: 'linear-gradient(135deg, #14532d, #16a34a)' }}>👨‍🌾</div>
            <div style={styles.portalTitle}>Farmer Portal</div>
            <div style={styles.portalDesc}>List produce, track orders,<br />get market prices & logistics</div>
            <div style={{ ...styles.portalBtn, background: 'linear-gradient(135deg, #16a34a, #15803d)' }}>Enter Farmer Portal →</div>
          </a>

          <a href="/user/home" style={{ ...styles.portalCard, borderColor: '#2563eb' }}>
            <div style={{ ...styles.portalIcon, background: 'linear-gradient(135deg, #1e3a5f, #2563eb)' }}>🏪</div>
            <div style={styles.portalTitle}>Buyer Portal</div>
            <div style={styles.portalDesc}>Browse marketplace, place orders,<br />join buy pools & track delivery</div>
            <div style={{ ...styles.portalBtn, background: 'linear-gradient(135deg, #1d4ed8, #2563eb)' }}>Enter Buyer Portal →</div>
          </a>

          <a href="/admin/dashboard" style={{ ...styles.portalCard, borderColor: '#7c3aed' }}>
            <div style={{ ...styles.portalIcon, background: 'linear-gradient(135deg, #4c1d95, #7c3aed)' }}>🛡️</div>
            <div style={styles.portalTitle}>Admin Panel</div>
            <div style={styles.portalDesc}>Platform oversight, AI optimizer,<br />logistics & analytics</div>
            <div style={{ ...styles.portalBtn, background: 'linear-gradient(135deg, #6d28d9, #7c3aed)' }}>Enter Admin Panel →</div>
          </a>
        </div>

        <div style={styles.stats}>
          {[
            { n: '1,247+', l: 'Farmers Onboard' },
            { n: '₹48Cr', l: 'Trade Volume' },
            { n: '32%', l: 'Waste Reduced' },
            { n: '84T', l: 'CO₂ Saved' },
          ].map((s, i) => (
            <div key={i} style={styles.stat}>
              <div style={styles.statN}>{s.n}</div>
              <div style={styles.statL}>{s.l}</div>
            </div>
          ))}
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
    position: 'relative',
    overflow: 'hidden',
  },
  bg: {
    position: 'fixed',
    inset: 0,
    background: 'radial-gradient(ellipse 100% 60% at 50% -10%, rgba(22,163,74,.12) 0%, transparent 70%), var(--bg)',
    zIndex: 0,
  },
  content: { position: 'relative', zIndex: 1, width: '100%', maxWidth: 900, textAlign: 'center' },
  logo: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 48 },
  logoIcon: {
    width: 56, height: 56, borderRadius: 16,
    background: 'linear-gradient(135deg, #16a34a, #15803d)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '1.7rem', boxShadow: '0 8px 24px rgba(22,163,74,.35)',
  },
  logoName: { fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.6rem', color: 'var(--text-1)', letterSpacing: '-.03em' },
  logoTag: { fontSize: '.75rem', color: 'var(--text-3)', marginTop: 2, letterSpacing: '.04em' },
  title: {
    fontSize: '2.6rem', fontWeight: 900, letterSpacing: '-.04em', marginBottom: 16, color: 'var(--text-1)', lineHeight: 1.2,
  },
  subtitle: { color: 'var(--text-3)', fontSize: '1rem', maxWidth: 520, margin: '0 auto 48px', lineHeight: 1.7 },
  portals: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 56 },
  portalCard: {
    background: 'var(--bg-surface)',
    border: '1.5px solid',
    borderRadius: 20,
    padding: '28px 24px',
    textDecoration: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
    transition: 'all .25s var(--ease)',
    boxShadow: 'var(--shadow-sm)',
  },
  portalIcon: {
    width: 64, height: 64, borderRadius: 18,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '1.8rem', boxShadow: '0 6px 20px rgba(0,0,0,.2)',
    marginBottom: 4,
  },
  portalTitle: { fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-1)' },
  portalDesc: { fontSize: '.8rem', color: 'var(--text-3)', lineHeight: 1.6, textAlign: 'center' },
  portalBtn: {
    color: '#fff', fontWeight: 700, fontSize: '.82rem',
    padding: '9px 18px', borderRadius: 10,
    marginTop: 4, width: '100%', textAlign: 'center',
  },
  stats: { display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap', padding: '24px 0', borderTop: '1px solid var(--border)' },
  stat: { textAlign: 'center' },
  statN: { fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.6rem', color: 'var(--primary)', letterSpacing: '-.03em' },
  statL: { fontSize: '.75rem', color: 'var(--text-3)', marginTop: 2, fontWeight: 600 },
};
