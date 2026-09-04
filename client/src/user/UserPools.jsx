import React, { useEffect, useState } from 'react';
import * as api from '../services/api';

const MOCK_POOLS = [
  {
    _id: 'p1', name: 'Mumbai Metro Vegetables Pool', crop: 'Mixed Vegetables',
    targetKg: 10000, currentKg: 7200, members: 23,
    pricePerKg: 15, deadline: '2026-09-15', status: 'open',
    desc: 'Collective buying pool for Mumbai metro area restaurants and retailers',
  },
  {
    _id: 'p2', name: 'Delhi NCR Potato Collective', crop: 'Potato',
    targetKg: 25000, currentKg: 18500, members: 41,
    pricePerKg: 8, deadline: '2026-09-20', status: 'open',
    desc: 'Large-scale potato sourcing for Delhi NCR snack manufacturers',
  },
  {
    _id: 'p3', name: 'Pune Organic Produce Circle', crop: 'Organic Mix',
    targetKg: 5000, currentKg: 4800, members: 12,
    pricePerKg: 35, deadline: '2026-09-12', status: 'almost_full',
    desc: 'Premium organic produce pool for health-conscious Pune buyers',
  },
];

export default function UserPools({ user }) {
  const [pools, setPools] = useState(MOCK_POOLS);
  const [pledgeModal, setPledgeModal] = useState(null);
  const [pledgeKg, setPledgeKg] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [joined, setJoined] = useState([]);

  useEffect(() => {
    api.fetchConsumerPools().then(p => { if (p?.length) setPools(p); }).catch(() => {});
  }, []);

  const joinPool = async () => {
    setSubmitting(true);
    try {
      await api.pledgeToPool(pledgeModal._id, Number(pledgeKg));
      setJoined(p => [...p, pledgeModal._id]);
      setPools(ps => ps.map(p => p._id === pledgeModal._id ? { ...p, currentKg: p.currentKg + Number(pledgeKg), members: p.members + 1 } : p));
    } catch {
      setJoined(p => [...p, pledgeModal._id]);
    } finally {
      setSubmitting(false);
      setPledgeModal(null);
      setPledgeKg('');
    }
  };

  const pct = (pool) => Math.min(100, (pool.currentKg / pool.targetKg) * 100);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 4 }}>🤝 Buy Pools</h1>
          <p style={{ color: 'var(--text-3)', fontSize: '.875rem' }}>Join collective buying pools for better prices and guaranteed delivery</p>
        </div>
      </div>

      {/* Explainer Banner */}
      <div style={{ background: 'linear-gradient(135deg, rgba(139,92,246,.12), rgba(37,99,235,.08))', border: '1px solid rgba(139,92,246,.2)', borderRadius: 16, padding: '16px 20px', marginBottom: 24, display: 'flex', gap: 12, alignItems: 'center' }}>
        <span style={{ fontSize: '1.6rem' }}>💡</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: '.9rem', marginBottom: 2 }}>How Buy Pools Work</div>
          <div style={{ fontSize: '.82rem', color: 'var(--text-3)' }}>Join a pool → pledge your quantity → when pool fills, AI assigns optimal farmers and logistics → you get bulk pricing (15-30% cheaper)</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {pools.map((pool, i) => {
          const fillPct = pct(pool);
          const isJoined = joined.includes(pool._id);
          return (
            <div className="card" key={pool._id || i}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <h3 style={{ fontWeight: 700, fontSize: '1rem' }}>{pool.name}</h3>
                    {isJoined && <span className="badge badge-green">✓ Joined</span>}
                    {pool.status === 'almost_full' && <span className="badge badge-amber">⚠️ Almost Full</span>}
                  </div>
                  <p style={{ fontSize: '.82rem', color: 'var(--text-3)', maxWidth: 500 }}>{pool.desc}</p>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontWeight: 900, fontSize: '1.3rem', color: 'var(--purple)' }}>₹{pool.pricePerKg}/kg</div>
                  <div style={{ fontSize: '.72rem', color: 'var(--text-3)', marginTop: 2 }}>Pool price</div>
                </div>
              </div>

              <div className="grid grid-4" style={{ marginBottom: 16, gap: 12 }}>
                <div style={statMini}><div style={{ fontSize: '.7rem', color: 'var(--text-3)', marginBottom: 2 }}>Crop</div><div style={{ fontWeight: 700, fontSize: '.85rem' }}>{pool.crop}</div></div>
                <div style={statMini}><div style={{ fontSize: '.7rem', color: 'var(--text-3)', marginBottom: 2 }}>Target</div><div style={{ fontWeight: 700, fontSize: '.85rem' }}>{(pool.targetKg / 1000).toFixed(0)}T</div></div>
                <div style={statMini}><div style={{ fontSize: '.7rem', color: 'var(--text-3)', marginBottom: 2 }}>Filled</div><div style={{ fontWeight: 700, fontSize: '.85rem', color: 'var(--primary)' }}>{(pool.currentKg / 1000).toFixed(1)}T</div></div>
                <div style={statMini}><div style={{ fontSize: '.7rem', color: 'var(--text-3)', marginBottom: 2 }}>Members</div><div style={{ fontWeight: 700, fontSize: '.85rem' }}>{pool.members}</div></div>
              </div>

              {/* Fill Progress */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: '.78rem', color: 'var(--text-3)' }}>
                  <span>Pool filled: {fillPct.toFixed(0)}%</span>
                  <span>Deadline: {pool.deadline}</span>
                </div>
                <div style={{ height: 8, background: 'var(--border)', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${fillPct}%`, background: fillPct > 90 ? 'var(--amber)' : 'var(--grad-brand)', borderRadius: 4, transition: 'width .5s var(--ease)' }} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  className={`btn ${isJoined ? 'btn-secondary' : 'btn-primary'}`}
                  disabled={isJoined}
                  onClick={() => !isJoined && setPledgeModal(pool)}
                  style={{ flex: 1 }}
                >
                  {isJoined ? '✅ Joined Pool' : '🤝 Join This Pool'}
                </button>
                <button className="btn btn-secondary">View Details</button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pledge Modal */}
      {pledgeModal && (
        <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && setPledgeModal(null)}>
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-title">🤝 Join Pool</h2>
              <button className="btn btn-ghost btn-sm" onClick={() => setPledgeModal(null)}>✕</button>
            </div>
            <p style={{ color: 'var(--text-3)', fontSize: '.875rem', marginBottom: 20 }}>
              <strong>{pledgeModal.name}</strong> · ₹{pledgeModal.pricePerKg}/kg
            </p>
            <div className="form-group" style={{ marginBottom: 20 }}>
              <label className="form-label">Your Pledge Quantity (kg)</label>
              <input
                className="form-input form-input-lg"
                type="number"
                placeholder="Enter kg you want to buy"
                value={pledgeKg}
                onChange={e => setPledgeKg(e.target.value)}
                autoFocus
                min={1}
              />
              {pledgeKg && (
                <div style={{ marginTop: 8, fontSize: '.82rem', color: 'var(--primary)', fontWeight: 600 }}>
                  Estimated cost: ₹{(Number(pledgeKg) * pledgeModal.pricePerKg).toLocaleString('en-IN')}
                </div>
              )}
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setPledgeModal(null)}>Cancel</button>
              <button className="btn btn-primary" disabled={!pledgeKg || submitting} style={{ flex: 2 }} onClick={joinPool}>
                {submitting ? <span className="spinner" style={{ width: 16, height: 16 }} /> : '🤝'}
                {submitting ? 'Joining...' : 'Confirm Pledge'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const statMini = {
  background: 'var(--bg-raised)',
  borderRadius: 8,
  padding: '10px 12px',
  border: '1px solid var(--border-subtle)',
};
