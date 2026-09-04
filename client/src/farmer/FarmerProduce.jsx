import React, { useEffect, useState } from 'react';
import * as api from '../services/api';
import { str, cropName } from '../services/utils';

const CROPS = ['Tomato','Onion','Potato','Wheat','Rice','Mango','Banana','Sugarcane','Maize','Soybean','Cotton','Peanut'];
const GRADES = ['A', 'B', 'C'];

export default function FarmerProduce({ farmer }) {
  const [supplies, setSupplies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    crop: 'Tomato', quantityKg: '', pricePerKg: '',
    location: '', harvestDate: '', qualityGrade: 'A', notes: '',
  });

  useEffect(() => {
    api.fetchSupplies().then(s => { setSupplies(s || []); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const handle = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const created = await api.createSupply({ ...form, farmerId: farmer?._id || 'demo', quantityKg: Number(form.quantityKg) });
      setSupplies(p => [created || { ...form, _id: Date.now(), status: 'listed' }, ...p]);
      setShowModal(false);
      setForm({ crop: 'Tomato', quantityKg: '', pricePerKg: '', location: '', harvestDate: '', qualityGrade: 'A', notes: '' });
    } catch {
      setSupplies(p => [{ ...form, _id: Date.now(), status: 'listed' }, ...p]);
      setShowModal(false);
    } finally {
      setSaving(false);
    }
  };

  const deleteSupply = async (id) => {
    await api.deleteSupply(id).catch(() => {});
    setSupplies(p => p.filter(s => s._id !== id));
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 4 }}>🌾 My Produce</h1>
          <p style={{ color: 'var(--text-3)', fontSize: '.875rem' }}>List and manage your farm produce</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          ➕ List New Produce
        </button>
      </div>

      {loading ? (
        <div className="loading-screen" style={{ minHeight: 300 }}><div className="spinner" /></div>
      ) : supplies.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🌾</div>
          <h3>No produce listed yet</h3>
          <p>Click "List New Produce" to add your first harvest</p>
          <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => setShowModal(true)}>
            ➕ List Produce
          </button>
        </div>
      ) : (
        <div className="grid grid-3">
          {supplies.map((s, i) => (
            <div className="card" key={s._id || i} style={{ position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: 4 }}>{cropName(s.crop || s.produce)}</div>
                  <span className={`badge ${s.status === 'matched' ? 'badge-blue' : 'badge-amber'}`}>
                    {str(s.status) || 'Listed'}
                  </span>
                </div>
                <span className="badge badge-green">Grade {str(s.qualityGrade) || 'A'}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={infoRow}>
                  <span style={{ color: 'var(--text-3)', fontSize: '.8rem' }}>Quantity</span>
                  <span style={{ fontWeight: 700 }}>{s.quantityKg}kg</span>
                </div>
                {s.pricePerKg && (
                  <div style={infoRow}>
                    <span style={{ color: 'var(--text-3)', fontSize: '.8rem' }}>Price</span>
                    <span style={{ fontWeight: 700, color: 'var(--primary)' }}>₹{s.pricePerKg}/kg</span>
                  </div>
                )}
                {s.location && (
                  <div style={infoRow}>
                    <span style={{ color: 'var(--text-3)', fontSize: '.8rem' }}>Location</span>
                    <span style={{ fontSize: '.82rem' }}>{str(s.location)}</span>
                  </div>
                )}
                {s.harvestDate && (
                  <div style={infoRow}>
                    <span style={{ color: 'var(--text-3)', fontSize: '.8rem' }}>Harvest Date</span>
                    <span style={{ fontSize: '.82rem' }}>{str(s.harvestDate)}</span>
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                <button className="btn btn-secondary btn-sm" style={{ flex: 1 }}>✏️ Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => deleteSupply(s._id)}>🗑️</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Produce Modal */}
      {showModal && (
        <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal" style={{ maxWidth: 560 }}>
            <div className="modal-header">
              <h2 className="modal-title">🌾 List New Produce</h2>
              <button className="btn btn-ghost btn-sm" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="grid grid-2">
                <div className="form-group">
                  <label className="form-label">Crop Type</label>
                  <select className="form-select" name="crop" value={form.crop} onChange={handle}>
                    {CROPS.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Quality Grade</label>
                  <select className="form-select" name="qualityGrade" value={form.qualityGrade} onChange={handle}>
                    {GRADES.map(g => <option key={g}>Grade {g}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-2">
                <div className="form-group">
                  <label className="form-label">Quantity (kg)</label>
                  <input className="form-input" type="number" name="quantityKg" placeholder="1000" value={form.quantityKg} onChange={handle} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Price per kg (₹)</label>
                  <input className="form-input" type="number" name="pricePerKg" placeholder="15" value={form.pricePerKg} onChange={handle} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Farm / Village Location</label>
                <input className="form-input" name="location" placeholder="Village, District, State" value={form.location} onChange={handle} required />
              </div>
              <div className="form-group">
                <label className="form-label">Harvest Date</label>
                <input className="form-input" type="date" name="harvestDate" value={form.harvestDate} onChange={handle} />
              </div>
              <div className="form-group">
                <label className="form-label">Additional Notes</label>
                <textarea className="form-textarea" name="notes" placeholder="Organic, irrigation method, storage..." value={form.notes} onChange={handle} style={{ minHeight: 70 }} />
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving} style={{ flex: 2 }}>
                  {saving ? <span className="spinner" style={{ width: 16, height: 16 }} /> : '✅'}
                  {saving ? 'Listing...' : 'List Produce'}
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
  padding: '6px 0',
  borderBottom: '1px solid var(--border-subtle)',
};
