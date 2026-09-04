import React from 'react';

export default function FarmerProfile({ farmer, onLogout }) {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 4 }}>👤 My Profile</h1>
        <p style={{ color: 'var(--text-3)', fontSize: '.875rem' }}>Manage your account and farm details</p>
      </div>

      <div className="grid grid-2" style={{ alignItems: 'start' }}>
        {/* Profile Card */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 20, padding: '20px', background: 'linear-gradient(135deg, #14532d, #166634)', borderRadius: 14 }}>
            <div style={{
              width: 72, height: 72, borderRadius: '50%',
              background: 'rgba(255,255,255,.2)',
              border: '3px solid rgba(255,255,255,.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.8rem', fontWeight: 900, color: '#fff', flexShrink: 0,
            }}>
              {farmer?.name?.charAt(0)?.toUpperCase() || 'F'}
            </div>
            <div>
              <div style={{ color: '#fff', fontWeight: 800, fontSize: '1.2rem' }}>{farmer?.name || 'Farmer'}</div>
              <div style={{ color: 'rgba(255,255,255,.7)', fontSize: '.85rem', marginTop: 2 }}>
                {farmer?.primaryCrop || 'Multi-crop'} Farmer
              </div>
              <span style={{ display: 'inline-block', marginTop: 8, background: 'rgba(255,255,255,.2)', color: '#fff', padding: '3px 10px', borderRadius: 100, fontSize: '.72rem', fontWeight: 600 }}>
                ✅ Verified Farmer
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              ['📞 Phone', farmer?.phone || '+91 XXXXX XXXXX'],
              ['📧 Email', farmer?.email || 'Not provided'],
              ['🗺️ State', farmer?.state || 'Not set'],
              ['📍 District', farmer?.district || 'Not set'],
              ['🌾 Primary Crop', farmer?.primaryCrop || 'Not set'],
              ['🏡 Land Area', farmer?.landAcres ? `${farmer.landAcres} acres` : 'Not set'],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'var(--bg-raised)', borderRadius: 8, border: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '.82rem', color: 'var(--text-3)' }}>{k}</span>
                <span style={{ fontWeight: 600, fontSize: '.875rem', color: 'var(--text-1)' }}>{v}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
            <button className="btn btn-secondary" style={{ flex: 1 }}>✏️ Edit Profile</button>
            <button className="btn btn-danger" style={{ flex: 1 }} onClick={onLogout}>🚪 Logout</button>
          </div>
        </div>

        {/* Stats & Achievements */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card">
            <h3 style={{ fontWeight: 700, marginBottom: 16 }}>🏆 Achievements</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { icon: '🌾', title: 'First Listing', desc: 'Listed first produce lot', done: true },
                { icon: '📦', title: 'First Sale', desc: 'Completed first order', done: true },
                { icon: '⭐', title: 'Top Farmer', desc: 'Rated 4.5+ by buyers', done: false },
                { icon: '💰', title: 'Income Milestone', desc: 'Earned ₹1 lakh on platform', done: false },
              ].map((a, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px', background: a.done ? 'var(--green-50)' : 'var(--bg-raised)', borderRadius: 10, border: `1px solid ${a.done ? 'rgba(22,163,74,.2)' : 'var(--border)'}`, opacity: a.done ? 1 : 0.6 }}>
                  <div style={{ fontSize: '1.4rem' }}>{a.icon}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '.875rem', color: a.done ? 'var(--green-800)' : 'var(--text-2)' }}>{a.title}</div>
                    <div style={{ fontSize: '.75rem', color: 'var(--text-3)' }}>{a.desc}</div>
                  </div>
                  {a.done && <span style={{ marginLeft: 'auto', color: 'var(--primary)', fontWeight: 700 }}>✓</span>}
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 style={{ fontWeight: 700, marginBottom: 16 }}>📊 Activity Summary</h3>
            <div className="grid grid-2" style={{ gap: 12 }}>
              {[
                { label: 'Total Listings', value: '5', color: 'var(--primary)' },
                { label: 'Orders Completed', value: '3', color: 'var(--blue)' },
                { label: 'Total Earnings', value: '₹48K', color: 'var(--amber)' },
                { label: 'Buyer Rating', value: '4.8⭐', color: 'var(--purple)' },
              ].map((s, i) => (
                <div key={i} style={{ padding: '14px', background: 'var(--bg-raised)', borderRadius: 10, border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '.72rem', color: 'var(--text-3)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '.05em', fontWeight: 700 }}>{s.label}</div>
                  <div style={{ fontWeight: 800, fontSize: '1.3rem', color: s.color }}>{s.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
