import React, { useState } from 'react';
import { 
  Building2, 
  PlusCircle, 
  MapPin, 
  Calendar, 
  Cpu, 
  CheckCircle2, 
  Coins, 
  ShieldCheck, 
  ArrowRight,
  TrendingDown
} from 'lucide-react';

export default function BuyerPortal({ demands = [], onAddDemand, onSelectDemandForOptimization }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    crop: 'Nashik Red Onion',
    variety: 'Garwa Kharif Late',
    quantity: 200,
    unit: 'Quintal',
    qualityGrade: 'Grade A (Export/Premium)',
    facilityName: 'BigBasket Bhiwandi Central DC',
    address: 'Gala 102, Indian Corporation Logistics Park, Mankoli, Bhiwandi',
    district: 'Thane',
    state: 'Maharashtra',
    requiredDate: '2026-09-08',
    targetLandedPrice: 3250,
    notes: 'Direct farm aggregation required with strict moisture <12%.'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddDemand({
      ...formData,
      quantity: Number(formData.quantity),
      targetLandedPrice: Number(formData.targetLandedPrice),
      destination: {
        facilityName: formData.facilityName,
        address: formData.address,
        district: formData.district,
        state: formData.state,
        coordinates: { lat: 19.2965, lng: 73.0631 }
      }
    });
    setShowAddModal(false);
  };

  return (
    <div className="portal-container">
      {/* Buyer Hero Bar */}
      <div className="buyer-hero-card glass-card">
        <div className="buyer-hero-content">
          <div className="buyer-avatar">
            <Building2 size={28} className="text-cyan" />
          </div>
          <div>
            <div className="buyer-title">
              BigBasket Wholesale & Institutional Procurement (Bhiwandi Hub)
            </div>
            <div className="buyer-meta">
              <span className="badge badge-cyan">
                <ShieldCheck size={13} /> DoCA Verified Institutional Buyer
              </span>
              <span className="text-secondary">📍 Bhiwandi Logistics Corridor, MMR</span>
              <span className="text-secondary">⚡ Guaranteed Escrow Settlement</span>
            </div>
          </div>
        </div>

        <button onClick={() => setShowAddModal(true)} className="btn btn-primary">
          <PlusCircle size={18} />
          <span>Post Procurement RFQ</span>
        </button>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid-3" style={{ margin: '24px 0' }}>
        <div className="glass-card stat-card">
          <div className="stat-label">Active Procurement RFQs</div>
          <div className="stat-value text-cyan">{demands.length} Requisitions</div>
          <div className="stat-sub">Aggregating directly from FPO clusters</div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-label">Average Landed Cost Reduction</div>
          <div className="stat-value text-emerald">-18.4%</div>
          <div className="stat-sub">vs Traditional Multi-Tier APMC Mandi</div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-label">Transit Loss Reduction</div>
          <div className="stat-value text-amber">-78% Spoilage</div>
          <div className="stat-sub">Optimized crated & cold logistics</div>
        </div>
      </div>

      {/* RFQ List */}
      <div className="section-header">
        <div>
          <h2>Open Bulk Requisitions (RFQs)</h2>
          <p className="text-muted">
            Select any demand requirement to trigger the multi-FPO aggregation & route optimization engine
          </p>
        </div>
      </div>

      <div className="rfq-grid" style={{ marginTop: '16px' }}>
        {demands.map((dem) => (
          <div key={dem._id || dem.id} className="rfq-card glass-card">
            <div className="rfq-top-row">
              <div>
                <div className="rfq-crop-title">{dem.crop}</div>
                <div className="rfq-facility text-secondary">
                  <MapPin size={14} className="text-cyan" />
                  <span>{dem.destination?.facilityName || 'Depot'} • {dem.destination?.district || 'MMR'}</span>
                </div>
              </div>
              <div className="rfq-qty-tag">
                <span className="qty-num">{dem.quantity}</span>
                <span className="qty-unit">Quintals ({Math.round(dem.quantity / 10)} Tonnes)</span>
              </div>
            </div>

            <div className="rfq-details-grid">
              <div className="rfq-detail-box">
                <span className="d-label">Target Max Landed</span>
                <span className="d-val text-amber">₹{dem.targetLandedPrice || 3200}/Q</span>
              </div>
              <div className="rfq-detail-box">
                <span className="d-label">Quality Required</span>
                <span className="d-val text-emerald">{dem.qualityGrade || 'Grade A'}</span>
              </div>
              <div className="rfq-detail-box">
                <span className="d-label">Delivery Deadline</span>
                <span className="d-val">{dem.requiredDate || 'Flexible'}</span>
              </div>
            </div>

            {dem.notes && (
              <div className="rfq-notes">
                <strong>Specification:</strong> {dem.notes}
              </div>
            )}

            <div className="rfq-footer">
              <div className="rfq-status-badge">
                <span className="pulse-dot"></span>
                <span>Ready for Optimization</span>
              </div>
              <button 
                onClick={() => onSelectDemandForOptimization(dem._id || dem.id)}
                className="btn btn-amber"
              >
                <Cpu size={16} />
                <span>Run AI Optimizer for this RFQ</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add RFQ Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Post Bulk Procurement RFQ</h2>
              <p className="text-muted">Broadcast volume demand to eligible FPOs across the pilot corridor</p>
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
                </select>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Required Quantity (Quintals)</label>
                  <input 
                    type="number" 
                    className="form-input"
                    value={formData.quantity}
                    onChange={e => setFormData({ ...formData, quantity: e.target.value })}
                    min="10"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Target Max Landed Price (₹ / Q)</label>
                  <input 
                    type="number" 
                    className="form-input"
                    value={formData.targetLandedPrice}
                    onChange={e => setFormData({ ...formData, targetLandedPrice: e.target.value })}
                    min="1000"
                    required
                  />
                </div>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Required Delivery Date</label>
                  <input 
                    type="date" 
                    className="form-input"
                    value={formData.requiredDate}
                    onChange={e => setFormData({ ...formData, requiredDate: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Quality Specification</label>
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

              <div className="form-group">
                <label className="form-label">Delivery Destination Facility</label>
                <input 
                  type="text" 
                  className="form-input"
                  value={formData.facilityName}
                  onChange={e => setFormData({ ...formData, facilityName: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Full Address</label>
                <input 
                  type="text" 
                  className="form-input"
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Procurement Notes / Handling Specs</label>
                <textarea 
                  className="form-textarea"
                  rows="2"
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                ></textarea>
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
                  Post Requisition
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .buyer-hero-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
          background: linear-gradient(135deg, rgba(8, 38, 56, 0.9) 0%, rgba(4, 20, 30, 0.95) 100%);
          border-left: 4px solid var(--accent-cyan);
        }

        .buyer-hero-content {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .buyer-avatar {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          background: rgba(6, 182, 212, 0.15);
          border: 1px solid var(--accent-cyan);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .buyer-title {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 700;
          color: #fff;
        }

        .buyer-meta {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-top: 6px;
          font-size: 0.82rem;
          flex-wrap: wrap;
        }

        .stat-card {
          padding: 20px;
        }

        .stat-label {
          font-size: 0.8rem;
          text-transform: uppercase;
          color: var(--text-muted);
          font-weight: 700;
        }

        .stat-value {
          font-family: var(--font-heading);
          font-size: 1.7rem;
          font-weight: 800;
          margin: 6px 0;
        }

        .stat-sub {
          font-size: 0.78rem;
          color: var(--text-secondary);
        }

        .rfq-grid {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .rfq-card {
          padding: 24px;
          border-left: 4px solid var(--accent-amber);
        }

        .rfq-top-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 16px;
        }

        .rfq-crop-title {
          font-family: var(--font-heading);
          font-size: 1.35rem;
          font-weight: 800;
          color: #fff;
        }

        .rfq-facility {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          margin-top: 4px;
        }

        .rfq-qty-tag {
          text-align: right;
          background: rgba(0, 0, 0, 0.3);
          padding: 8px 16px;
          border-radius: 10px;
          border: 1px solid var(--border-subtle);
        }

        .qty-num {
          font-family: var(--font-heading);
          font-size: 1.4rem;
          font-weight: 800;
          color: #38bdf8;
          display: block;
        }

        .qty-unit {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .rfq-details-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin: 20px 0;
          padding: 14px;
          background: rgba(0, 0, 0, 0.25);
          border-radius: 10px;
        }

        @media (max-width: 640px) {
          .rfq-details-grid {
            grid-template-columns: 1fr;
          }
        }

        .rfq-detail-box {
          display: flex;
          flex-direction: column;
        }

        .d-label {
          font-size: 0.74rem;
          text-transform: uppercase;
          color: var(--text-muted);
          font-weight: 700;
        }

        .d-val {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 700;
          margin-top: 4px;
        }

        .rfq-notes {
          font-size: 0.86rem;
          color: var(--text-secondary);
          background: rgba(255, 255, 255, 0.03);
          padding: 10px 14px;
          border-radius: 8px;
          margin-bottom: 20px;
        }

        .rfq-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
          border-top: 1px solid var(--border-subtle);
          padding-top: 16px;
        }

        .rfq-status-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.82rem;
          color: #34d399;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
