import React, { useEffect, useState } from 'react';
import * as api from '../services/api';
import { str, cropName } from '../services/utils';

const MANDI_PRICES = [
  { crop: 'Tomato', price: 1850, change: '+12%', unit: 'per quintal', up: true },
  { crop: 'Onion', price: 1100, change: '-3%', unit: 'per quintal', up: false },
  { crop: 'Potato', price: 890, change: '+5%', unit: 'per quintal', up: true },
  { crop: 'Wheat', price: 2380, change: '+2%', unit: 'per quintal', up: true },
];

export default function FarmerHome({ farmer }) {
  const [supplies, setSupplies] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.fetchSupplies().then(s => setSupplies(s || [])).catch(() => {});
    api.fetchOrders().then(o => setOrders(o || [])).catch(() => {});
  }, []);

  const mySupplies = supplies.slice(0, 5);
  const myOrders = orders.slice(0, 3);
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Subah ki namaskar' : hour < 17 ? 'Namaskar' : 'Shaam ki namaskar';

  return (
    <div>
      {/* Welcome Banner */}
      <div style={bannerStyle}>
        <div>
          <p style={{ fontSize: '.85rem', color: 'rgba(255,255,255,.75)', marginBottom: 4 }}>{greeting} 🙏</p>
          <h1 style={{ color: '#fff', fontSize: '1.7rem', fontWeight: 800, marginBottom: 6 }}>
            {farmer?.name || 'Farmer'}
          </h1>
          <p style={{ color: 'rgba(255,255,255,.8)', fontSize: '.9rem' }}>
            {farmer?.district && farmer?.state ? `${farmer.district}, ${farmer.state}` : 'Your Dashboard is Ready'}
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ color: 'rgba(255,255,255,.6)', fontSize: '.75rem', marginBottom: 4 }}>Today's Date</div>
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1rem' }}>
            {new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'long' })}
          </div>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-4" style={{ marginBottom: 28 }}>
        <div className="stat-card">
          <span className="stat-label">My Produce Lots</span>
          <span className="stat-value text-green">{mySupplies.length}</span>
          <span className="stat-sub">Active listings</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Total Qty Listed</span>
          <span className="stat-value">{mySupplies.reduce((s, x) => s + (x.quantityKg || 0), 0)}kg</span>
          <span className="stat-sub">Across all lots</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Active Orders</span>
          <span className="stat-value text-amber">{myOrders.length}</span>
          <span className="stat-sub">In progress</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Estimated Earnings</span>
          <span className="stat-value text-blue">₹{(mySupplies.length * 12000).toLocaleString('en-IN')}</span>
          <span className="stat-sub">This season</span>
        </div>
      </div>

      <div className="grid grid-2" style={{ marginBottom: 24 }}>
        {/* Mandi Prices Ticker */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontWeight: 700 }}>📊 Today's Mandi Prices</h3>
            <span className="badge badge-green">● Live</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {MANDI_PRICES.map((p, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'var(--bg-raised)', borderRadius: 8, border: '1px solid var(--border-subtle)' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '.875rem' }}>{p.crop}</div>
                  <div style={{ fontSize: '.73rem', color: 'var(--text-3)' }}>{p.unit}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 800, fontSize: '1rem' }}>₹{p.price}</div>
                  <div style={{ fontSize: '.73rem', fontWeight: 700, color: p.up ? 'var(--primary)' : 'var(--red)' }}>
                    {p.up ? '↑' : '↓'} {p.change}
                  </div>
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
              { icon: '➕', label: 'List New Produce', sub: 'Add your harvest to marketplace', color: 'var(--primary)', path: '/farmer/produce' },
              { icon: '📦', label: 'View My Orders', sub: 'Check order status and updates', color: 'var(--blue)', path: '/farmer/orders' },
              { icon: '📊', label: 'Check Mandi Rates', sub: 'Real-time commodity prices', color: 'var(--amber)', path: '/farmer/prices' },
            ].map((a, i) => (
              <a key={i} href={a.path} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', background: 'var(--bg-raised)', borderRadius: 10, border: '1px solid var(--border)', textDecoration: 'none', transition: 'all .2s ease' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = a.color; e.currentTarget.style.background = 'var(--bg-surface)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--bg-raised)'; }}
              >
                <div style={{ width: 40, height: 40, borderRadius: 10, background: `${a.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                  {a.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '.875rem', color: 'var(--text-1)' }}>{a.label}</div>
                  <div style={{ fontSize: '.75rem', color: 'var(--text-3)' }}>{a.sub}</div>
                </div>
                <span style={{ color: 'var(--text-4)', fontSize: '.9rem' }}>→</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Supply Lots */}
      {mySupplies.length > 0 && (
        <div className="card">
          <h3 style={{ fontWeight: 700, marginBottom: 16 }}>🌾 My Recent Produce Listings</h3>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Crop</th>
                  <th>Quantity</th>
                  <th>Location</th>
                  <th>Quality</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {mySupplies.map((s, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>{str(s.crop || s.produce)}</td>
                    <td>{s.quantityKg}kg</td>
                    <td style={{ fontSize: '.82rem', color: 'var(--text-3)' }}>{str(s.location)}</td>
                    <td><span className="badge badge-green">{str(s.qualityGrade) || 'A'}</span></td>
                    <td><span className="badge badge-amber">{str(s.status) || 'Listed'}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

const bannerStyle = {
  background: 'linear-gradient(135deg, #14532d 0%, #166534 50%, #15803d 100%)',
  borderRadius: 20,
  padding: '28px 32px',
  marginBottom: 28,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: '0 8px 32px rgba(22,163,74,.25)',
};
