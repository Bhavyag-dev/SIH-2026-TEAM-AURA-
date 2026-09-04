import React from 'react';

export default function UserProfile({ user, onLogout }) {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 4 }}>👤 My Profile</h1>
        <p style={{ color: 'var(--text-3)', fontSize: '.875rem' }}>Manage your account and business details</p>
      </div>

      <div className="grid grid-2" style={{ alignItems: 'start' }}>
        {/* Profile Card */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '20px', background: 'linear-gradient(135deg, #1e3a5f, #1d4ed8)', borderRadius: 14, marginBottom: 20 }}>
            <div style={{
              width: 72, height: 72, borderRadius: '50%',
              background: 'rgba(255,255,255,.2)',
              border: '3px solid rgba(255,255,255,.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.8rem', fontWeight: 900, color: '#fff', flexShrink: 0,
            }}>
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div>
              <div style={{ color: '#fff', fontWeight: 800, fontSize: '1.2rem' }}>{user?.name || 'Buyer'}</div>
              <div style={{ color: 'rgba(255,255,255,.7)', fontSize: '.85rem', marginTop: 2 }}>
                {user?.buyerType || 'Bulk Buyer'}
              </div>
              {user?.orgName && <div style={{ color: 'rgba(255,255,255,.7)', fontSize: '.8rem', marginTop: 2 }}>{user.orgName}</div>}
              <span style={{ display: 'inline-block', marginTop: 8, background: 'rgba(255,255,255,.2)', color: '#fff', padding: '3px 10px', borderRadius: 100, fontSize: '.72rem', fontWeight: 600 }}>
                ✅ Verified Buyer
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              ['📧 Email', user?.email || 'Not provided'],
              ['📞 Phone', user?.phone || 'Not provided'],
              ['🏪 Buyer Type', user?.buyerType || 'Not set'],
              ['🏢 Organization', user?.orgName || 'Not set'],
              ['🗺️ State', user?.state || 'Not set'],
              ['🌆 City', user?.city || 'Not set'],
              ['📋 GST', user?.gstNumber || 'Not provided'],
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

        {/* Activity & Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card">
            <h3 style={{ fontWeight: 700, marginBottom: 16 }}>📊 Buying Summary</h3>
            <div className="grid grid-2" style={{ gap: 12 }}>
              {[
                { label: 'Total Orders', value: '12', color: '#2563eb' },
                { label: 'Total Volume', value: '48T', color: 'var(--primary)' },
                { label: 'Total Spend', value: '₹8.4L', color: 'var(--amber)' },
                { label: 'Savings vs Mandi', value: '₹1.2L', color: 'var(--purple)' },
              ].map((s, i) => (
                <div key={i} style={{ padding: '14px', background: 'var(--bg-raised)', borderRadius: 10, border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '.72rem', color: 'var(--text-3)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '.05em', fontWeight: 700 }}>{s.label}</div>
                  <div style={{ fontWeight: 800, fontSize: '1.3rem', color: s.color }}>{s.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 style={{ fontWeight: 700, marginBottom: 16 }}>🏆 Buyer Badges</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { icon: '🛒', title: 'First Purchase', desc: 'Completed first order', done: true },
                { icon: '🤝', title: 'Pool Member', desc: 'Joined a collective buy pool', done: true },
                { icon: '⭐', title: 'Trusted Buyer', desc: 'Rated 4.5+ by farmers', done: false },
                { icon: '🏆', title: 'Volume Buyer', desc: 'Purchased 100+ tonnes', done: false },
              ].map((b, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px', background: b.done ? '#dbeafe' : 'var(--bg-raised)', borderRadius: 10, border: `1px solid ${b.done ? 'rgba(37,99,235,.2)' : 'var(--border)'}`, opacity: b.done ? 1 : 0.6 }}>
                  <div style={{ fontSize: '1.4rem' }}>{b.icon}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '.875rem', color: b.done ? '#1d4ed8' : 'var(--text-2)' }}>{b.title}</div>
                    <div style={{ fontSize: '.75rem', color: 'var(--text-3)' }}>{b.desc}</div>
                  </div>
                  {b.done && <span style={{ marginLeft: 'auto', color: '#2563eb', fontWeight: 700 }}>✓</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
