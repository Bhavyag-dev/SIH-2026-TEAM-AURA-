import React, { useEffect, useState } from 'react';
import * as api from '../services/api';
import { str, cropName } from '../services/utils';

const STATUS_MAP = {
  pending: { label: 'Pending', cls: 'badge-gray' },
  confirmed: { label: 'Confirmed', cls: 'badge-amber' },
  in_transit: { label: 'In Transit', cls: 'badge-blue' },
  delivered: { label: 'Delivered', cls: 'badge-green' },
  cancelled: { label: 'Cancelled', cls: 'badge-red' },
};

const STEPS = ['Order Placed', 'Pickup Scheduled', 'In Transit', 'At Warehouse', 'Out for Delivery', 'Delivered'];

export default function FarmerOrders({ farmer }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    api.fetchOrders().then(o => { setOrders(o || []); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 4 }}>📦 My Orders</h1>
        <p style={{ color: 'var(--text-3)', fontSize: '.875rem' }}>Track all orders for your produce</p>
      </div>

      {loading ? (
        <div className="loading-screen" style={{ minHeight: 300 }}><div className="spinner" /></div>
      ) : orders.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📭</div>
          <h3>No orders yet</h3>
          <p>Orders will appear here once buyers purchase your produce</p>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: 24 }}>
          {/* Orders List */}
          <div style={{ flex: selected ? '0 0 360px' : '1' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {orders.map((o, i) => {
                const s = STATUS_MAP[o.status] || STATUS_MAP.pending;
                return (
                  <div
                    key={o._id || i}
                    className="card"
                    style={{ cursor: 'pointer', transition: 'all .2s', borderColor: selected?._id === o._id ? 'var(--primary)' : 'var(--border)', boxShadow: selected?._id === o._id ? '0 0 0 2px var(--primary-glow)' : 'var(--shadow-sm)' }}
                    onClick={() => setSelected(selected?._id === o._id ? null : o)}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                      <span style={{ fontFamily: 'monospace', fontSize: '.78rem', color: 'var(--text-3)' }}>
                        #{(o._id || 'ORD' + i).toString().slice(-8).toUpperCase()}
                      </span>
                      <span className={`badge ${s.cls}`}>{s.label}</span>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 8 }}>{cropName(o.crop || o.produce)}</div>
                    <div style={{ display: 'flex', gap: 16, fontSize: '.8rem', color: 'var(--text-3)' }}>
                      <span>📦 {o.quantityKg}kg</span>
                      <span>📍 {str(o.deliveryLocation || o.destination)}</span>
                    </div>
                    {o.estimatedAmount && (
                      <div style={{ marginTop: 10, fontWeight: 700, color: 'var(--primary)', fontSize: '.95rem' }}>
                        ₹{Number(o.estimatedAmount).toLocaleString('en-IN')}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Detail Panel */}
          {selected && (
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="card anim-slide-left">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <h3 style={{ fontWeight: 700 }}>Order Details</h3>
                  <button className="btn btn-ghost btn-sm" onClick={() => setSelected(null)}>✕</button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
                  {[
                    ['Crop', cropName(selected.crop || selected.produce)],
                    ['Quantity', `${selected.quantityKg}kg`],
                    ['Pickup', str(selected.supplyLocation || selected.origin)],
                    ['Delivery', str(selected.deliveryLocation || selected.destination)],
                    ['Vehicle', str(selected.vehicleId) || 'Auto-assigned'],
                    ['Status', str(selected.status || 'pending').replace('_', ' ')],
                  ].map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--bg-raised)', borderRadius: 8 }}>
                      <span style={{ color: 'var(--text-3)', fontSize: '.82rem' }}>{k}</span>
                      <span style={{ fontWeight: 600, fontSize: '.875rem' }}>{v}</span>
                    </div>
                  ))}
                </div>

                {/* Tracking Steps */}
                <h4 style={{ fontWeight: 700, marginBottom: 16 }}>📍 Delivery Tracking</h4>
                <div style={{ position: 'relative', paddingLeft: 28 }}>
                  <div style={{ position: 'absolute', left: 10, top: 12, bottom: 12, width: 2, background: 'var(--border)' }} />
                  {STEPS.map((step, i) => {
                    const stepDone = i <= (selected.milestoneStep || 1);
                    return (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14, position: 'relative' }}>
                        <div style={{
                          width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                          position: 'absolute', left: -28,
                          background: stepDone ? 'var(--primary)' : 'var(--bg-raised)',
                          border: `2px solid ${stepDone ? 'var(--primary)' : 'var(--border)'}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '.7rem', color: '#fff',
                        }}>
                          {stepDone ? '✓' : ''}
                        </div>
                        <div style={{ paddingLeft: 4 }}>
                          <div style={{ fontSize: '.85rem', fontWeight: stepDone ? 600 : 400, color: stepDone ? 'var(--text-1)' : 'var(--text-4)' }}>{step}</div>
                        </div>
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
