import React, { useEffect, useState } from 'react';
import * as api from '../services/api';
import { str } from '../services/utils';

export default function AdminLogistics() {
  const [vehicles, setVehicles] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [tab, setTab] = useState('vehicles');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.fetchVehicles().catch(() => []),
      api.fetchWarehouses().catch(() => []),
    ]).then(([v, w]) => { setVehicles(v || []); setWarehouses(w || []); setLoading(false); });
  }, []);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Logistics Management</h1>
          <p className="page-subtitle">Fleet, warehouses and cold chain management</p>
        </div>
      </div>

      <div className="page-body">
        <div className="tabs" style={{ marginBottom: 24 }}>
          <button className={`tab-btn ${tab === 'vehicles' ? 'active' : ''}`} onClick={() => setTab('vehicles')}>🚛 Vehicles</button>
          <button className={`tab-btn ${tab === 'warehouses' ? 'active' : ''}`} onClick={() => setTab('warehouses')}>🏭 Warehouses</button>
        </div>

        {loading ? (
          <div className="loading-screen" style={{ minHeight: 300 }}>
            <div className="spinner" /> <p>Loading logistics data...</p>
          </div>
        ) : tab === 'vehicles' ? (
          <>
            <div className="grid grid-4" style={{ marginBottom: 24 }}>
              <div className="stat-card">
                <span className="stat-label">Total Fleet</span>
                <span className="stat-value">{vehicles.length}</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Active</span>
                <span className="stat-value text-green">{vehicles.filter(v => v.status === 'active').length}</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Idle</span>
                <span className="stat-value text-amber">{vehicles.filter(v => v.status !== 'active').length}</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Total Capacity</span>
                <span className="stat-value">{(vehicles.reduce((s, v) => s + (v.capacityKg || 0), 0) / 1000).toFixed(0)}T</span>
              </div>
            </div>

            {vehicles.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">🚛</div>
                <h3>No vehicles registered</h3>
                <p>Vehicle data will appear here from the backend</p>
              </div>
            ) : (
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Vehicle No.</th>
                      <th>Type</th>
                      <th>Capacity</th>
                      <th>Driver</th>
                      <th>Location</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vehicles.map((v, i) => (
                      <tr key={v._id || i}>
                        <td style={{ fontWeight: 700, fontFamily: 'monospace' }}>{str(v.vehicleNumber || v.id)}</td>
                        <td><span className="badge badge-gray">{str(v.type) || 'Truck'}</span></td>
                        <td>{v.capacityKg}kg</td>
                        <td>{str(v.driver)}</td>
                        <td style={{ fontSize: '.82rem' }}>{str(v.currentLocation)}</td>
                        <td>
                          <span className={`badge ${v.status === 'active' ? 'badge-green' : 'badge-amber'}`}>
                            {str(v.status) || 'idle'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="grid grid-3" style={{ marginBottom: 24 }}>
              <div className="stat-card">
                <span className="stat-label">Warehouses</span>
                <span className="stat-value">{warehouses.length}</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Cold Storage</span>
                <span className="stat-value text-blue">{warehouses.filter(w => w.hasColdStorage).length}</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Total Capacity</span>
                <span className="stat-value">{(warehouses.reduce((s, w) => s + (w.capacityTons || 0), 0)).toFixed(0)}T</span>
              </div>
            </div>

            {warehouses.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">🏭</div>
                <h3>No warehouses registered</h3>
                <p>Warehouse data will appear here from the backend</p>
              </div>
            ) : (
              <div className="grid grid-2">
                {warehouses.map((w, i) => (
                  <div className="card" key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                      <div>
                        <h3 style={{ fontSize: '.95rem', fontWeight: 700 }}>{w.name}</h3>
                        <p style={{ fontSize: '.8rem', color: 'var(--text-3)', marginTop: 2 }}>{w.location}</p>
                      </div>
                      {w.hasColdStorage && <span className="badge badge-blue">❄️ Cold</span>}
                    </div>
                    <div className="grid grid-2" style={{ gap: 10 }}>
                      <div>
                        <div className="stat-label">Capacity</div>
                        <div style={{ fontWeight: 700, marginTop: 2 }}>{w.capacityTons}T</div>
                      </div>
                      <div>
                        <div className="stat-label">Occupancy</div>
                        <div style={{ fontWeight: 700, marginTop: 2 }}>{w.currentOccupancyTons || 0}T</div>
                      </div>
                    </div>
                    <div style={{ marginTop: 12, height: 6, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{
                        height: '100%',
                        width: `${Math.min(100, ((w.currentOccupancyTons || 0) / (w.capacityTons || 1)) * 100)}%`,
                        background: 'var(--grad-brand)',
                        borderRadius: 3,
                        transition: 'width .5s var(--ease)',
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
