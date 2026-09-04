import React, { useState } from 'react';
import { 
  PlusCircle, 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Sparkles, 
  TrendingUp, 
  Coins, 
  ArrowUpRight,
  Package,
  Layers,
  Trash2
} from 'lucide-react';

export default function FarmerPortal({ supplies = [], onAddSupply, onDeleteSupply, onSelectDemandForOptimization }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    crop: 'Nashik Red Onion',
    variety: 'Garwa Kharif Late',
    quantity: 65,
    unit: 'Quintal',
    askingPricePerUnit: 2600,
    qualityGrade: 'Grade A (Export/Premium)',
    harvestDate: '2026-09-05',
    address: 'Lasalgaon Mandi Sector 2, Nashik',
    district: 'Nashik',
    state: 'Maharashtra'
  });

  const totalQuintals = supplies.reduce((acc, s) => acc + (Number(s.quantity) || 0), 0);
  const avgAsking = Math.round(
    supplies.reduce((acc, s) => acc + (Number(s.askingPricePerUnit) || 0), 0) / (supplies.length || 1)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddSupply({
      ...formData,
      quantity: Number(formData.quantity),
      askingPricePerUnit: Number(formData.askingPricePerUnit),
      location: {
        address: formData.address,
        district: formData.district,
        state: formData.state,
        coordinates: { lat: 20.1472, lng: 74.2257 }
      }
    });
    setShowAddModal(false);
  };

  return (
    <div className="portal-container">
      {/* Farmer Welcome Banner */}
      <div className="farmer-hero-card glass-card">
        <div className="farmer-hero-content">
          <div className="farmer-avatar">
            <span>👨‍🌾</span>
          </div>
          <div>
            <div className="farmer-welcome-title">
              Sahyadri Farmers Producer Co. (Lasalgaon Cluster)
            </div>
            <div className="farmer-meta-strip">
              <span className="badge badge-emerald">
                <ShieldCheck size={13} /> Verified FPO Member (FPO-MH-NSK-2021)
              </span>
              <span className="text-secondary">📍 Lasalgaon, Nashik District</span>
              <span className="text-secondary">⭐ 4.9 Rating (42 Fulfilments)</span>
            </div>
          </div>
        </div>

        <button onClick={() => setShowAddModal(true)} className="btn btn-primary">
          <PlusCircle size={18} />
          <span>List Fresh Produce Lot</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid-4" style={{ margin: '24px 0' }}>
        <div className="glass-card stat-box">
          <div className="stat-header">
            <span className="stat-name">Active Lots Listed</span>
            <Package size={20} className="text-emerald" />
          </div>
          <div className="stat-value">{supplies.length} Lots</div>
          <div className="stat-sub">Ready for buyer matching</div>
        </div>

        <div className="glass-card stat-box">
          <div className="stat-header">
            <span className="stat-name">Total Volume</span>
            <Layers size={20} className="text-cyan" />
          </div>
          <div className="stat-value">{totalQuintals} Quintals</div>
          <div className="stat-sub">≈ {Math.round(totalQuintals / 10)} Metric Tonnes</div>
        </div>

        <div className="glass-card stat-box">
          <div className="stat-header">
            <span className="stat-name">Average Farmgate Ask</span>
            <Coins size={20} className="text-amber" />
          </div>
          <div className="stat-value">₹{avgAsking}/Q</div>
          <div className="stat-sub">Ref APMC Modal: ₹2,580/Q</div>
        </div>

        <div className="glass-card stat-box stat-highlight">
          <div className="stat-header">
            <span className="stat-name">Direct Realization Uplift</span>
            <TrendingUp size={20} className="text-emerald" />
          </div>
          <div className="stat-value text-emerald">+22.4%</div>
          <div className="stat-sub">vs Traditional Commission Agent</div>
        </div>
      </div>

      {/* Matched Buyer Opportunities Alert */}
      <div className="matched-demand-box glass-card">
        <div className="matched-demand-info">
          <div className="matched-badge">
            <Sparkles size={16} />
            <span>AI MATCH FOUND • HIGH DEMAND</span>
          </div>
          <div className="matched-title">
            BigBasket Bhiwandi Mega DC is seeking 200 Quintals of Grade A Nashik Red Onion
          </div>
          <div className="matched-desc">
            Your Lasalgaon & Niphad lots are pre-selected in the optimal multi-FPO aggregation plan.
            Estimated farmer net realization: <strong>₹2,580/Q</strong> (Zero commission cuts, direct escrow release).
          </div>
        </div>
        <button 
          onClick={() => onSelectDemandForOptimization('dem_onion_bulk')}
          className="btn btn-amber"
        >
          <span>Inspect & Optimize Plan</span>
          <ArrowUpRight size={16} />
        </button>
      </div>

      {/* Active Listings Grid */}
      <div className="section-header">
        <div>
          <h2>Your Published Produce Lots</h2>
          <p className="text-muted">Live inventory visible to verified institutional buyers & consumer pools</p>
        </div>
      </div>

      <div className="grid-3" style={{ marginTop: '16px' }}>
        {supplies.map((item) => (
          <div key={item._id || item.id} className="produce-card glass-card">
            <div className="produce-img-wrap">
              <img 
                src={item.images?.[0] || 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80'} 
                alt={item.crop} 
                className="produce-img"
              />
              <span className="grade-badge">{item.qualityGrade}</span>
              <button 
                onClick={() => onDeleteSupply(item._id || item.id)}
                className="delete-lot-btn"
                title="Remove Lot"
              >
                <Trash2 size={15} />
              </button>
            </div>

            <div className="produce-details">
              <div className="produce-title-row">
                <h3>{item.crop}</h3>
                <span className="produce-qty">{item.quantity} Q</span>
              </div>
              <div className="produce-variety text-muted">Variety: {item.variety || 'Standard Hybrid'}</div>

              <div className="price-tag-row">
                <div>
                  <span className="price-label">Farmgate Ask:</span>
                  <span className="price-val">₹{item.askingPricePerUnit}</span>
                  <span className="price-unit">/Quintal</span>
                </div>
                <div className="net-takehome">
                  Est. Net: ₹{item.askingPricePerUnit * item.quantity}
                </div>
              </div>

              <div className="produce-meta">
                <div className="meta-line">
                  <MapPin size={14} />
                  <span>{item.location?.address || 'Lasalgaon, Nashik'}</span>
                </div>
                <div className="meta-line">
                  <Calendar size={14} />
                  <span>Harvest Ready: {item.harvestDate || 'Ready Now'}</span>
                </div>
              </div>

              <div className="card-actions">
                <button 
                  onClick={() => onSelectDemandForOptimization('dem_onion_bulk')}
                  className="btn btn-secondary btn-sm" 
                  style={{ width: '100%' }}
                >
                  <Sparkles size={14} className="text-emerald" />
                  <span>View Recommended Allocation</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Produce Lot Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Publish Fresh Produce Lot</h2>
              <p className="text-muted">Enter accurate harvest details to receive instant AI-matched buyers</p>
            </div>

            <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
              <div className="form-group">
                <label className="form-label">Crop / Commodity</label>
                <select 
                  className="form-select"
                  value={formData.crop}
                  onChange={e => setFormData({ ...formData, crop: e.target.value })}
                >
                  <option value="Nashik Red Onion">Nashik Red Onion</option>
                  <option value="Junnar Hybrid Tomato">Junnar Hybrid Tomato</option>
                  <option value="Nagpur Mandarin Orange">Nagpur Mandarin Orange</option>
                  <option value="Shimla Royal Apple">Shimla Royal Apple</option>
                  <option value="Guntur Teja Red Chilli">Guntur Teja Red Chilli</option>
                </select>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Variety</label>
                  <input 
                    type="text" 
                    className="form-input"
                    value={formData.variety}
                    onChange={e => setFormData({ ...formData, variety: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Quality Grade</label>
                  <select 
                    className="form-select"
                    value={formData.qualityGrade}
                    onChange={e => setFormData({ ...formData, qualityGrade: e.target.value })}
                  >
                    <option value="Grade A (Export/Premium)">Grade A (Export/Premium)</option>
                    <option value="Grade B (Standard Mandi)">Grade B (Standard Mandi)</option>
                    <option value="Grade C (Processing)">Grade C (Processing)</option>
                  </select>
                </div>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Available Quantity (Quintals)</label>
                  <input 
                    type="number" 
                    className="form-input"
                    value={formData.quantity}
                    onChange={e => setFormData({ ...formData, quantity: e.target.value })}
                    min="1"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Asking Price (₹ / Quintal)</label>
                  <input 
                    type="number" 
                    className="form-input"
                    value={formData.askingPricePerUnit}
                    onChange={e => setFormData({ ...formData, askingPricePerUnit: e.target.value })}
                    min="500"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Harvest Readiness Date</label>
                <input 
                  type="date" 
                  className="form-input"
                  value={formData.harvestDate}
                  onChange={e => setFormData({ ...formData, harvestDate: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Farm / Collection Location</label>
                <input 
                  type="text" 
                  className="form-input"
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                  placeholder="e.g. Niphad Farm Cluster, Nashik"
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)} 
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Publish Produce Lot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .portal-container {
          margin-top: 24px;
        }

        .farmer-hero-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
          background: linear-gradient(135deg, rgba(16, 56, 38, 0.9) 0%, rgba(6, 26, 17, 0.95) 100%);
          border-left: 4px solid var(--accent-emerald);
        }

        .farmer-hero-content {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .farmer-avatar {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: rgba(16, 185, 129, 0.2);
          border: 2px solid var(--accent-emerald);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
        }

        .farmer-welcome-title {
          font-family: var(--font-heading);
          font-size: 1.3rem;
          font-weight: 700;
          color: #fff;
        }

        .farmer-meta-strip {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-top: 6px;
          font-size: 0.82rem;
          flex-wrap: wrap;
        }

        .stat-box {
          padding: 18px 20px;
        }

        .stat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .stat-name {
          font-size: 0.8rem;
          text-transform: uppercase;
          color: var(--text-muted);
          font-weight: 700;
        }

        .stat-value {
          font-family: var(--font-heading);
          font-size: 1.6rem;
          font-weight: 800;
        }

        .stat-sub {
          font-size: 0.76rem;
          color: var(--text-secondary);
          margin-top: 4px;
        }

        .stat-highlight {
          border-color: rgba(16, 185, 129, 0.4);
          background: linear-gradient(145deg, rgba(16, 185, 129, 0.12) 0%, rgba(8, 30, 20, 0.9) 100%);
        }

        .matched-demand-box {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
          margin-bottom: 30px;
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(18, 48, 34, 0.9) 100%);
          border: 1px solid var(--border-amber);
        }

        .matched-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #fbbf24;
          font-size: 0.74rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          margin-bottom: 6px;
        }

        .matched-title {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 700;
          color: #fff;
        }

        .matched-desc {
          font-size: 0.88rem;
          color: var(--text-secondary);
          margin-top: 4px;
          max-width: 800px;
        }

        .produce-card {
          padding: 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .produce-img-wrap {
          position: relative;
          height: 170px;
          overflow: hidden;
        }

        .produce-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .produce-card:hover .produce-img {
          transform: scale(1.05);
        }

        .grade-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: rgba(4, 15, 10, 0.85);
          backdrop-filter: blur(8px);
          color: #34d399;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 6px;
          border: 1px solid rgba(52, 211, 153, 0.3);
        }

        .delete-lot-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(239, 68, 68, 0.85);
          color: #fff;
          border: none;
          border-radius: 6px;
          padding: 6px;
          cursor: pointer;
          transition: var(--trans-smooth);
        }
        .delete-lot-btn:hover {
          background: #ef4444;
          transform: scale(1.1);
        }

        .produce-details {
          padding: 20px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .produce-title-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .produce-qty {
          font-family: var(--font-heading);
          font-size: 1.1rem;
          font-weight: 700;
          color: #38bdf8;
        }

        .produce-variety {
          font-size: 0.8rem;
          margin-top: 2px;
        }

        .price-tag-row {
          margin: 16px 0;
          padding: 10px 14px;
          background: rgba(0, 0, 0, 0.25);
          border-radius: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .price-label {
          font-size: 0.72rem;
          color: var(--text-muted);
          display: block;
        }

        .price-val {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 800;
          color: #fbbf24;
        }

        .price-unit {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .net-takehome {
          font-size: 0.82rem;
          font-weight: 700;
          color: #34d399;
        }

        .produce-meta {
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 0.8rem;
          color: var(--text-secondary);
          margin-bottom: 16px;
        }

        .meta-line {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .card-actions {
          margin-top: auto;
        }
      `}</style>
    </div>
  );
}
