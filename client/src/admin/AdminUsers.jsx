import React, { useEffect, useState } from 'react';
import * as api from '../services/api';

const MOCK_USERS = [
  { id: 1, name: 'Rajan Patel', email: 'rajan@gmail.com', role: 'farmer', state: 'Gujarat', joined: '2024-01-15', status: 'active' },
  { id: 2, name: 'Suresh Kumar', email: 'suresh@gmail.com', role: 'farmer', state: 'Punjab', joined: '2024-02-10', status: 'active' },
  { id: 3, name: 'Meera Devi', email: 'meera@gmail.com', role: 'farmer', state: 'UP', joined: '2024-03-05', status: 'active' },
  { id: 4, name: 'Rajesh Singhania', email: 'rajesh@fresh.in', role: 'buyer', state: 'Rajasthan', joined: '2024-01-20', status: 'active' },
  { id: 5, name: 'Kiran Logistics', email: 'kiran@logistic.in', role: 'buyer', state: 'Maharashtra', joined: '2024-02-28', status: 'active' },
  { id: 6, name: 'Amit Sharma', email: 'amit@ngo.org', role: 'buyer', state: 'Delhi', joined: '2024-04-12', status: 'inactive' },
];

export default function AdminUsers() {
  const [users, setUsers] = useState(MOCK_USERS);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = users.filter(u => {
    const matchRole = filter === 'all' || u.role === filter;
    const q = search.toLowerCase();
    const matchSearch = !search || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    return matchRole && matchSearch;
  });

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">User Management</h1>
          <p className="page-subtitle">Manage all farmers and buyers on the platform</p>
        </div>
        <span className="badge badge-blue">{users.length} Registered</span>
      </div>

      <div className="page-body">
        <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            className="form-input"
            style={{ maxWidth: 280 }}
            placeholder="🔍 Search users..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div className="tabs">
            {['all', 'farmer', 'buyer'].map(r => (
              <button key={r} className={`tab-btn ${filter === r ? 'active' : ''}`} onClick={() => setFilter(r)}>
                {r === 'all' ? 'All Users' : r === 'farmer' ? '👨‍🌾 Farmers' : '🏪 Buyers'}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-3" style={{ marginBottom: 24 }}>
          <div className="stat-card">
            <span className="stat-label">Total Users</span>
            <span className="stat-value">{users.length}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Farmers</span>
            <span className="stat-value text-green">{users.filter(u => u.role === 'farmer').length}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Buyers</span>
            <span className="stat-value text-blue">{users.filter(u => u.role === 'buyer').length}</span>
          </div>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>State</th>
                <th>Joined</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(u => (
                <tr key={u.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: '50%',
                        background: u.role === 'farmer' ? 'var(--green-50)' : 'var(--accent-blue-subtle, #eff6ff)',
                        border: `1px solid ${u.role === 'farmer' ? 'rgba(22,163,74,.3)' : 'rgba(59,130,246,.3)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '.8rem', fontWeight: 700,
                        color: u.role === 'farmer' ? 'var(--green-700)' : 'var(--blue)',
                      }}>
                        {u.name.charAt(0)}
                      </div>
                      <span style={{ fontWeight: 600, fontSize: '.875rem' }}>{u.name}</span>
                    </div>
                  </td>
                  <td style={{ fontSize: '.82rem', color: 'var(--text-3)' }}>{u.email}</td>
                  <td>
                    <span className={`badge ${u.role === 'farmer' ? 'badge-green' : 'badge-blue'}`}>
                      {u.role === 'farmer' ? '👨‍🌾' : '🏪'} {u.role}
                    </span>
                  </td>
                  <td>{u.state}</td>
                  <td style={{ fontSize: '.82rem', color: 'var(--text-3)' }}>{u.joined}</td>
                  <td>
                    <span className={`badge ${u.status === 'active' ? 'badge-green' : 'badge-gray'}`}>
                      {u.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn btn-secondary btn-sm">View</button>
                      <button
                        className="btn btn-sm"
                        style={{ background: u.status === 'active' ? '#fee2e2' : 'var(--green-50)',
                          color: u.status === 'active' ? 'var(--red)' : 'var(--primary)',
                          border: `1px solid ${u.status === 'active' ? 'rgba(239,68,68,.2)' : 'rgba(22,163,74,.2)'}` }}
                        onClick={() => setUsers(p => p.map(x => x.id === u.id ? { ...x, status: x.status === 'active' ? 'inactive' : 'active' } : x))}
                      >
                        {u.status === 'active' ? 'Suspend' : 'Activate'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
