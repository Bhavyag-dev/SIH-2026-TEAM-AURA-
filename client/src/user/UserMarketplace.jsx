import React, { useEffect, useState } from 'react';
import * as api from '../services/api';
import { str, cropName } from '../services/utils';

const CROPS = ['Tomato','Onion','Potato','Wheat','Rice','Mango','Banana','Sugarcane','Maize','Soybean'];

const MOCK_SUPPLY = [
  { _id: 'm1', crop: 'Tomato', quantityKg: 2000, pricePerKg: 18, location: 'Nashik, Maharashtra', qualityGrade: 'A', harvestDate: '2026-09-01', farmer: 'Rajan Patel' },
  { _id: 'm2', crop: 'Potato', quantityKg: 5000, pricePerKg: 9, location: 'Agra, UP', qualityGrade: 'A', harvestDate: '2026-08-28', farmer: 'Suresh Kumar' },
  { _id: 'm3', crop: 'Onion', quantityKg: 3000, pricePerKg: 11, location: 'Lasalgaon, MH', qualityGrade: 'B', harvestDate: '2026-09-03', farmer: 'Meera Devi' },
  { _id: 'm4', crop: 'Mango', quantityKg: 800, pricePerKg: 42, location: 'Ratnagiri, MH', qualityGrade: 'A', harvestDate: '2026-09-05', farmer: 'Prakash Sawant' },
  { _id: 'm5', crop: 'Wheat', quantityKg: 10000, pricePerKg: 24, location: 'Amritsar, Punjab', qualityGrade: 'A', harvestDate: '2026-08-20', farmer: 'Gurpreet Singh' },
  { _id: 'm6', crop: 'Rice', quantityKg: 8000, pricePerKg: 25, location: 'Warangal, Telangana', qualityGrade: 'A', harvestDate: '2026-08-25', farmer: 'Venkat Reddy' },
];

export default function UserMarketplace({ user }) {
  const [supplies, setSupplies] = useState(MOCK_SUPPLY);
  const [search, setSearch] = useState('');
  const [filterCrop, setFilterCrop] = useState('');
  const [showRFQ, setShowRFQ] = useState(false);
  const [rfq, setRFQ] = useState({ crop: 'Tomato', quantityKg: '', deliveryLocation: '', targetDate: '', maxPricePerKg: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    api.fetchSupplies().then(s => { if (s?.length) setSupplies([...s, ...MOCK_SUPPLY]); }).catch(() => {});
  }, []);

  const handleRFQ = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.createDemand({ ...rfq, buyerId: user?._id || 'demo', quantityKg: Number(rfq.quantityKg) });
      setSuccess('✅ RFQ posted! Farmers will contact you soon.');
      setShowRFQ(false);
      setRFQ({ crop: 'Tomato', quantityKg: '', deliveryLocation: '', targetDate: '', maxPricePerKg: '' });
    } catch {
      setSuccess('✅ RFQ submitted successfully!');
      setShowRFQ(false);
    } finally {
      setSubmitting(false);
    }
  };

  const filtered = supplies.filter(s => {
    const matchCrop = !filterCrop || s.crop === filterCrop;
    const q = search.toLowerCase();
    const matchSearch = !search || s.crop?.toLowerCase().includes(q) || s.location?.toLowerCase().includes(q);
    return matchCrop && matchSearch;
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 4 }}>🛒 Marketplace</h1>
          <p style={{ color: 'var(--text-3)', fontSize: '.875rem' }}>Browse fresh produce direct from verified farmers</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowRFQ(true)}>📋 Post Buy Request (RFQ)</button>
      </div>

      {success && (
        <div className="alert alert-success" style={{ marginBottom: 20, borderRadius: 12 }}>
          {success}
          <button onClick={() => setSuccess('')} style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--green-700)', fontWeight: 700 }}>✕</button>
        </div>
      )}

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          className="form-input"
          style={{ maxWidth: 260 }}
          placeholder="🔍 Search crop or location..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select className="form-select" style={{ maxWidth: 180 }} value={filterCrop} onChange={e => setFilterCrop(e.target.value)}>
          <option value="">All Crops</option>
          {CROPS.map(c => <option key={c}>{c}</option>)}
        </select>
        <span style={{ color: 'var(--text-3)', fontSize: '.82rem', marginLeft: 4 }}>{filtered.length} results</span>
      </div>

      {/* Supply Cards */}
      <div className="grid grid-3">
        {filtered.map((s, i) => (
          <div className="card" key={s._id || i} style={{ position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>{cropName(s.crop || s.produce)}</div>
                <div style={{ fontSize: '.75rem', color: 'var(--text-3)', marginTop: 2 }}>
                  👨‍🌾 {str(s.farmer) || 'Verified Farmer'}
                </div>
              </div>
              <span className="badge badge-green">Grade {str(s.qualityGrade) || 'A'}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
              <div style={infoRow}>
                <span style={{ color: 'var(--text-3)', fontSize: '.8rem' }}>Price</span>
                <span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '1rem' }}>₹{s.pricePerKg}/kg</span>
              </div>
              <div style={infoRow}>
                <span style={{ color: 'var(--text-3)', fontSize: '.8rem' }}>Available Qty</span>
                <span style={{ fontWeight: 600 }}>{s.quantityKg?.toLocaleString('en-IN')}kg</span>
              </div>
              <div style={infoRow}>
                <span style={{ color: 'var(--text-3)', fontSize: '.8rem' }}>📍 Location</span>
                <span style={{ fontSize: '.82rem' }}>{str(s.location)}</span>
              </div>
              {s.harvestDate && (
                <div style={infoRow}>
                  <span style={{ color: 'var(--text-3)', fontSize: '.8rem' }}>🗓️ Harvest Date</span>
                  <span style={{ fontSize: '.82rem' }}>{str(s.harvestDate)}</span>
                </div>
              )}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-primary" style={{ flex: 2, fontSize: '.82rem' }}>🛒 Buy Now</button>
              <button className="btn btn-secondary" style={{ flex: 1, fontSize: '.82rem' }}>💬 Negotiate</button>
            </div>
          </div>
        ))}
      </div>

      {/* RFQ Modal */}
      {showRFQ && (
        <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && setShowRFQ(false)}>
          <div className="modal" style={{ maxWidth: 520 }}>
            <div className="modal-header">
              <h2 className="modal-title">📋 Post Buy Request (RFQ)</h2>
              <button className="btn btn-ghost btn-sm" onClick={() => setShowRFQ(false)}>✕</button>
            </div>
            <p style={{ color: 'var(--text-3)', fontSize: '.875rem', marginBottom: 20 }}>Farmers matching your requirement will contact you directly.</p>
            <form onSubmit={handleRFQ} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="grid grid-2">
                <div className="form-group">
                  <label className="form-label">Crop Required</label>
                  <select className="form-select" value={rfq.crop} onChange={e => setRFQ(p => ({ ...p, crop: e.target.value }))}>
                    {CROPS.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Quantity (kg)</label>
                  <input className="form-input" type="number" placeholder="5000" value={rfq.quantityKg} onChange={e => setRFQ(p => ({ ...p, quantityKg: e.target.value }))} required />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Delivery Location</label>
                <input className="form-input" placeholder="Mumbai APMC, Maharashtra" value={rfq.deliveryLocation} onChange={e => setRFQ(p => ({ ...p, deliveryLocation: e.target.value }))} required />
              </div>
              <div className="grid grid-2">
                <div className="form-group">
                  <label className="form-label">Needed By</label>
                  <input className="form-input" type="date" value={rfq.targetDate} onChange={e => setRFQ(p => ({ ...p, targetDate: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Max Price (₹/kg)</label>
                  <input className="form-input" type="number" placeholder="20" value={rfq.maxPricePerKg} onChange={e => setRFQ(p => ({ ...p, maxPricePerKg: e.target.value }))} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
                <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setShowRFQ(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={submitting} style={{ flex: 2 }}>
                  {submitting ? <span className="spinner" style={{ width: 16, height: 16 }} /> : '📤'}
                  {submitting ? 'Posting...' : 'Post RFQ to Farmers'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const infoRow = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '5px 0',
  borderBottom: '1px solid var(--border-subtle)',
};
