import React, { useEffect, useState } from 'react';
import * as api from '../services/api';

const FEATURED = [
  { crop: 'Tomato', farmer: 'Rajan Patel (Nashik)', qty: 2000, price: 18, grade: 'A', loc: 'Nashik, MH' },
  { crop: 'Potato', farmer: 'Suresh Kumar (Agra)', qty: 5000, price: 9, grade: 'A', loc: 'Agra, UP' },
  { crop: 'Onion', farmer: 'Meera Devi (Lasalgaon)', qty: 3000, price: 11, grade: 'B', loc: 'Lasalgaon, MH' },
];

export default function UserHome({ user }) {
  const [demands, setDemands] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.fetchDemands().then(d => setDemands(d || [])).catch(() => {});
    api.fetchOrders().then(o => setOrders(o || [])).catch(() => {});
  }, []);

  return (
    <div>
      {/* Hero Banner */}
      <div style={banner}>
        <div>
          <p style={{ color: 'rgba(255,255,255,.75)', fontSize: '.85rem', marginBottom: 4 }}>Welcome back</p>
          <h1 style={{ color: '#fff', fontSize: '1.7rem', fontWeight: 800, marginBottom: 8 }}>
            {user?.name || 'Buyer'} {user?.orgName ? `— ${user.orgName}` : ''}
          </h1>
          <p style={{ color: 'rgba(255,255,255,.8)', fontSize: '.9rem' }}>
            {user?.buyerType || 'Buyer'} · {user?.city || ''} {user?.state || ''}
          </p>
          <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
            <a href="/user/marketplace" className="btn" style={{ background: '#fff', color: '#1d4ed8', fontWeight: 700, fontSize: '.875rem' }}>
              🛒 Browse Marketplace
            </a>
            <a href="/user/pools" className="btn" style={{ background: 'rgba(255,255,255,.15)', color: '#fff', border: '1px solid rgba(255,255,255,.3)' }}>
              🤝 Join Buy Pool
            </a>
          </div>
        </div>
        <div style={{ textAlign: 'right', color: 'rgba(255,255,255,.8)', fontSize: '.85rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: 4 }}>🛒</div>
          <div style={{ fontWeight: 700 }}>{orders.length} Active Orders</div>
          <div style={{ fontSize: '.78rem', marginTop: 2 }}>{demands.length} Pending RFQs</div>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-4" style={{ marginBottom: 28 }}>
        <div className="stat-card">
          <span className="stat-label">Active Orders</span>
          <span className="stat-value" style={{ color: '#2563eb' }}>{orders.filter(o => o.status !== 'delivered').length}</span>
          <span className="stat-sub">In progress</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">RFQs Sent</span>
          <span className="stat-value text-amber">{demands.length}</span>
          <span className="stat-sub">Awaiting match</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Total Purchased</span>
          <span className="stat-value text-green">{orders.filter(o => o.status === 'delivered').length}</span>
          <span className="stat-sub">Delivered orders</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Savings via AI</span>
          <span className="stat-value text-green">₹1.2L</span>
          <span className="stat-sub">vs. market middlemen</span>
        </div>
      </div>

      <div className="grid grid-2" style={{ marginBottom: 24 }}>
        {/* Featured Produce */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontWeight: 700 }}>🌾 Featured Produce</h3>
            <a href="/user/marketplace" style={{ fontSize: '.8rem', color: 'var(--primary)', fontWeight: 600 }}>View All →</a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {FEATURED.map((f, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', background: 'var(--bg-raised)', borderRadius: 10, border: '1px solid var(--border-subtle)' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '.9rem' }}>{f.crop}</div>
                  <div style={{ fontSize: '.75rem', color: 'var(--text-3)', marginTop: 2 }}>{f.farmer}</div>
                  <div style={{ fontSize: '.73rem', color: 'var(--text-4)', marginTop: 1 }}>📍 {f.loc} · {f.qty}kg available</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '1rem' }}>₹{f.price}/kg</div>
                  <span className="badge badge-green" style={{ marginTop: 4 }}>Grade {f.grade}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h3 style={{ fontWeight: 700, marginBottom: 16 }}>⚡ Quick Actions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { icon: '📋', label: 'Post Buy Request (RFQ)', sub: 'Tell farmers what you need', color: '#2563eb', path: '/user/marketplace' },
              { icon: '🤝', label: 'Join Consumer Pool', sub: 'Buy collectively for better prices', color: 'var(--purple)', path: '/user/pools' },
              { icon: '📦', label: 'Track My Orders', sub: 'Real-time delivery tracking', color: 'var(--amber)', path: '/user/orders' },
            ].map((a, i) => (
              <a key={i} href={a.path} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', background: 'var(--bg-raised)', borderRadius: 10, border: '1px solid var(--border)', textDecoration: 'none', transition: 'all .2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = a.color; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; }}
              >
                <div style={{ width: 40, height: 40, borderRadius: 10, background: `${a.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                  {a.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '.875rem', color: 'var(--text-1)' }}>{a.label}</div>
                  <div style={{ fontSize: '.75rem', color: 'var(--text-3)' }}>{a.sub}</div>
                </div>
                <span style={{ color: 'var(--text-4)' }}>→</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const banner = {
  background: 'linear-gradient(135deg, #1e3a5f 0%, #1d4ed8 60%, #2563eb 100%)',
  borderRadius: 20,
  padding: '28px 32px',
  marginBottom: 28,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: '0 8px 32px rgba(37,99,235,.25)',
};
