import React, { useEffect, useState } from 'react';
import * as api from '../services/api';
import { str, cropName } from '../services/utils';

export default function UserOrders({ user }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    api.fetchOrders().then(o => { setOrders(o || []); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const TRACKING_STEPS = ['Order Confirmed', 'Farmer Pickup', 'In Transit', 'Quality Check', 'At Delivery Hub', 'Delivered'];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 4 }}>📦 My Orders</h1>
        <p style={{ color: 'var(--text-3)', fontSize: '.875rem' }}>Track your purchases from farm to delivery</p>
      </div>

      {loading ? (
        <div className="loading-screen" style={{ minHeight: 300 }}><div className="spinner" /></div>
      ) : orders.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🛒</div>
          <h3>No orders yet</h3>
          <p>Browse the marketplace and place your first order</p>
          <a href="/user/marketplace" className="btn btn-primary" style={{ marginTop: 16 }}>Go to Marketplace →</a>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: 24 }}>
          <div style={{ flex: selected ? '0 0 360px' : '1' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {orders.map((o, i) => (
                <div
                  key={o._id || i}
                  className="card"
                  style={{ cursor: 'pointer', borderColor: selected?._id === o._id ? '#2563eb' : 'var(--border)', boxShadow: selected?._id === o._id ? '0 0 0 2px rgba(37,99,235,.2)' : 'var(--shadow-sm)' }}
                  onClick={() => setSelected(selected?._id === o._id ? null : o)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <span style={{ fontFamily: 'monospace', fontSize: '.78rem', color: 'var(--text-3)' }}>
                      #{(o._id || 'ORD' + i).toString().slice(-8).toUpperCase()}
                    </span>
                    <span className={`badge ${o.status === 'delivered' ? 'badge-green' : o.status === 'in_transit' ? 'badge-blue' : o.status === 'confirmed' ? 'badge-amber' : 'badge-gray'}`}>
                      {(o.status || 'pending').replace('_', ' ')}
                    </span>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 8 }}>{cropName(o.crop || o.produce)}</div>
                  <div style={{ display: 'flex', gap: 16, fontSize: '.8rem', color: 'var(--text-3)' }}>
                    <span>📦 {o.quantityKg}kg</span>
                    <span>📍 {str(o.supplyLocation || o.origin)}</span>
                  </div>
                  {o.estimatedAmount && (
                    <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 700, color: '#2563eb', fontSize: '.95rem' }}>₹{Number(o.estimatedAmount).toLocaleString('en-IN')}</span>
                      <span style={{ fontSize: '.75rem', color: 'var(--text-4)' }}>View details →</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {selected && (
            <div style={{ flex: 1 }}>
              <div className="card anim-slide-left">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <h3 style={{ fontWeight: 700 }}>Order Tracking</h3>
                  <button className="btn btn-ghost btn-sm" onClick={() => setSelected(null)}>✕</button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
                  {[
                    ['Produce', cropName(selected.crop || selected.produce)],
                    ['Quantity', `${selected.quantityKg}kg`],
                    ['From (Farm)', str(selected.supplyLocation || selected.origin)],
                    ['To (Delivery)', str(selected.deliveryLocation || selected.destination)],
                    ['Status', str(selected.status || 'pending').replace('_', ' ')],
                  ].map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--bg-raised)', borderRadius: 8 }}>
                      <span style={{ color: 'var(--text-3)', fontSize: '.82rem' }}>{k}</span>
                      <span style={{ fontWeight: 600, fontSize: '.875rem' }}>{v}</span>
                    </div>
                  ))}
                </div>

                <h4 style={{ fontWeight: 700, marginBottom: 16 }}>🚛 Live Tracking</h4>
                <div style={{ position: 'relative', paddingLeft: 28 }}>
                  <div style={{ position: 'absolute', left: 10, top: 12, bottom: 12, width: 2, background: 'var(--border)' }} />
                  {TRACKING_STEPS.map((step, i) => {
                    const done = i <= (selected.milestoneStep || 1);
                    return (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14, position: 'relative' }}>
                        <div style={{
                          width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                          position: 'absolute', left: -28,
                          background: done ? '#2563eb' : 'var(--bg-raised)',
                          border: `2px solid ${done ? '#2563eb' : 'var(--border)'}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '.65rem', color: '#fff', fontWeight: 700,
                        }}>
                          {done ? '✓' : ''}
                        </div>
                        <span style={{ fontSize: '.875rem', fontWeight: done ? 600 : 400, color: done ? 'var(--text-1)' : 'var(--text-4)' }}>
                          {step}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
