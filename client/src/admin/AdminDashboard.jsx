import React, { useEffect, useState } from 'react';
import * as api from '../services/api';
import { str, cropName } from '../services/utils';

const KPI = ({ label, value, sub, color = 'var(--primary)', icon }) => (
  <div className="stat-card anim-fade-up">
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span className="stat-label">{label}</span>
      <span style={{ fontSize: '1.4rem' }}>{icon}</span>
    </div>
    <div className="stat-value" style={{ color }}>{value}</div>
    {sub && <div className="stat-sub">{sub}</div>}
  </div>
);

export default function AdminDashboard() {
  const [data, setData] = useState({ orders: [], supplies: [], vehicles: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.fetchOrders().catch(() => []),
      api.fetchSupplies().catch(() => []),
      api.fetchVehicles().catch(() => []),
    ]).then(([orders, supplies, vehicles]) => {
      setData({ orders, supplies, vehicles });
      setLoading(false);
    });
  }, []);

  const activeOrders = data.orders.filter(o => o.status !== 'delivered').length;
  const totalSupplyKg = data.supplies.reduce((sum, s) => sum + (s.quantityKg || 0), 0);
  const activeVehicles = data.vehicles.filter(v => v.status === 'active').length;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Control Tower</h1>
          <p className="page-subtitle">Real-time platform overview & operations</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="pulse-dot" />
          <span style={{ fontSize: '.82rem', color: 'var(--text-3)' }}>Live updates</span>
        </div>
      </div>

      <div className="page-body">
        {loading ? (
          <div className="loading-screen" style={{ minHeight: 300 }}>
            <div className="spinner" />
            <p>Loading dashboard...</p>
          </div>
        ) : (
          <>
            {/* KPI Row */}
            <div className="grid grid-4" style={{ marginBottom: 28 }}>
              <KPI label="Active Orders" value={activeOrders} sub="Across all routes" icon="📦" color="var(--blue)" />
              <KPI label="Total Supply" value={`${(totalSupplyKg / 1000).toFixed(1)}T`} sub="In pipeline" icon="🌾" />
              <KPI label="Active Vehicles" value={activeVehicles} sub={`of ${data.vehicles.length} fleet`} icon="🚛" color="var(--amber)" />
              <KPI label="Farmers Onboard" value="1,247" sub="+32 this week" icon="👨‍🌾" color="var(--purple)" />
            </div>

            {/* Recent Orders */}
            <div className="card" style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Recent Orders</h3>
                <span className="badge badge-green">● Live</span>
              </div>
              {data.orders.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-state-icon">📭</div>
                  <h3>No orders yet</h3>
                  <p>Orders will appear here once created</p>
                </div>
              ) : (
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Crop</th>
                        <th>Quantity</th>
                        <th>Route</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.orders.slice(0, 8).map((o, i) => (
                        <tr key={o._id || i}>
                          <td style={{ fontFamily: 'monospace', fontSize: '.8rem' }}>
                            #{(o._id || o.id || 'ORD-' + i).toString().slice(-8).toUpperCase()}
                          </td>
                          <td>{cropName(o.crop || o.produce)}</td>
                          <td>{o.quantityKg ? `${o.quantityKg}kg` : '—'}</td>
                          <td style={{ fontSize: '.8rem' }}>
                            {str(o.supplyLocation || o.origin)} → {str(o.deliveryLocation || o.destination)}
                          </td>
                          <td>
                            <span className={`badge ${
                              o.status === 'delivered' ? 'badge-green' :
                              o.status === 'in_transit' ? 'badge-blue' :
                              o.status === 'confirmed' ? 'badge-amber' : 'badge-gray'
                            }`}>
                              {str(o.status || 'pending').replace('_', ' ')}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Supply Overview */}
            <div className="grid grid-2">
              <div className="card">
                <h3 style={{ fontWeight: 700, marginBottom: 16 }}>📦 Supply Lots</h3>
                {data.supplies.length === 0 ? (
                  <p className="text-muted text-sm">No supplies listed yet.</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {data.supplies.slice(0, 5).map((s, i) => (
                      <div key={i} style={supplyRow}>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '.875rem' }}>{cropName(s.crop || s.produce)}</div>
                          <div style={{ fontSize: '.78rem', color: 'var(--text-3)' }}>{str(s.location || s.farmerId)}</div>
                        </div>
                        <span className="badge badge-green">{s.quantityKg}kg</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="card">
                <h3 style={{ fontWeight: 700, marginBottom: 16 }}>🚛 Fleet Status</h3>
                {data.vehicles.length === 0 ? (
                  <p className="text-muted text-sm">No vehicles registered.</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {data.vehicles.slice(0, 5).map((v, i) => (
                      <div key={i} style={supplyRow}>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '.875rem' }}>{str(v.vehicleNumber || v.id)}</div>
                          <div style={{ fontSize: '.78rem', color: 'var(--text-3)' }}>{str(v.type)} · {v.capacityKg}kg cap.</div>
                        </div>
                        <span className={`badge ${v.status === 'active' ? 'badge-green' : 'badge-gray'}`}>
                          {str(v.status) || 'idle'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const supplyRow = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '10px 12px',
  background: 'var(--bg-raised)',
  borderRadius: 8,
  border: '1px solid var(--border-subtle)',
};
