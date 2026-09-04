import React, { useEffect, useState } from 'react';
import * as api from '../services/api';
import { str, cropName } from '../services/utils';

const STATUS_COLORS = {
  pending: 'badge-gray',
  confirmed: 'badge-amber',
  in_transit: 'badge-blue',
  delivered: 'badge-green',
  cancelled: 'badge-red',
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.fetchOrders().then(d => { setOrders(d || []); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const filtered = orders.filter(o => {
    const matchStatus = filter === 'all' || o.status === filter;
    const q = search.toLowerCase();
    const matchSearch = !search ||
      (o.crop || '').toLowerCase().includes(q) ||
      (o.supplyLocation || '').toLowerCase().includes(q) ||
      (o.deliveryLocation || '').toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const updateStatus = async (orderId, status) => {
    const updated = await api.updateOrderStatus(orderId, status, null, null);
    if (updated) {
      setOrders(prev => prev.map(o => (o._id === orderId ? { ...o, status } : o)));
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Orders Management</h1>
          <p className="page-subtitle">Track and manage all platform orders</p>
        </div>
        <span className="badge badge-blue">{orders.length} Total</span>
      </div>

      <div className="page-body">
        {/* Filters */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            className="form-input"
            style={{ maxWidth: 280 }}
            placeholder="🔍 Search orders..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div className="tabs">
            {['all', 'pending', 'confirmed', 'in_transit', 'delivered'].map(s => (
              <button key={s} className={`tab-btn ${filter === s ? 'active' : ''}`} onClick={() => setFilter(s)}>
                {s === 'all' ? 'All' : s.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="loading-screen" style={{ minHeight: 300 }}>
            <div className="spinner" /> <p>Loading orders...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📭</div>
            <h3>No orders found</h3>
            <p>Try adjusting your search or filter</p>
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Crop / Produce</th>
                  <th>Qty (kg)</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((o, i) => (
                  <tr key={o._id || i}>
                    <td style={{ fontFamily: 'monospace', fontSize: '.78rem', color: 'var(--text-3)' }}>
                      #{(o._id || 'ORD' + i).toString().slice(-8).toUpperCase()}
                    </td>
                    <td style={{ fontWeight: 600 }}>{cropName(o.crop || o.produce)}</td>
                    <td>{o.quantityKg || '—'}</td>
                    <td style={{ fontSize: '.82rem' }}>{str(o.supplyLocation || o.origin)}</td>
                    <td style={{ fontSize: '.82rem' }}>{str(o.deliveryLocation || o.destination)}</td>
                    <td>
                      <span className={`badge ${STATUS_COLORS[o.status] || 'badge-gray'}`}>
                        {str(o.status || 'pending').replace('_', ' ')}
                      </span>
                    </td>
                    <td>
                      <select
                        className="form-select"
                        style={{ width: 'auto', fontSize: '.8rem', padding: '5px 8px' }}
                        value={o.status || 'pending'}
                        onChange={e => updateStatus(o._id, e.target.value)}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="in_transit">In Transit</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
