import React, { useState } from 'react';
import { 
  Sprout, 
  PlusCircle, 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  TrendingUp, 
  ArrowRight, 
  Package, 
  User, 
  DollarSign, 
  ShieldCheck, 
  Layers, 
  Clock,
  X
} from 'lucide-react';

export default function FarmerApp({ supplies = [], onAddSupply, currentUser }) {
  const [showAddLotModal, setShowAddLotModal] = useState(false);
  const [newLot, setNewLot] = useState({
    crop: 'Tomato',
    variety: 'Desi Hybrid Premium',
    quantity: '25',
    unit: 'tons',
    askingPrice: '18',
    grade: 'A',
    harvestDate: '2025-09-25',
    location: 'Chittorgarh Cluster, Rajasthan'
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (onAddSupply) {
      onAddSupply({
        crop: newLot.crop,
        variety: newLot.variety,
        quantity: Number(newLot.quantity) * 10, // tons to quintals
        unit: 'Quintal',
        askingPricePerUnit: Number(newLot.askingPrice) * 100, // ₹/kg to ₹/Q
        qualityGrade: `Grade ${newLot.grade}`,
        harvestDate: newLot.harvestDate,
        farmerName: currentUser?.name || 'Rameshwar Choudhary',
        location: {
          address: newLot.location,
          district: 'Chittorgarh',
          state: 'Rajasthan',
          coordinates: { lat: 24.8887, lng: 74.6269 }
        }
      });
    }
    setShowAddLotModal(false);
  };

  return (
    <div className="full-app-page">
      {/* Top Banner */}
      <div className="farmer-top-strip">
        <div className="farmer-top-inner">
          <div className="farmer-profile-card-top">
            <div className="f-avatar">👨‍🌾</div>
            <div>
              <div className="f-badge">VERIFIED FPO PRODUCER</div>
              <h1 className="f-name">{currentUser?.name || 'Rameshwar Choudhary'}</h1>
              <div className="f-fpo">Shree Krishi Farmer Producer Co • Chittorgarh Cluster, Rajasthan</div>
            </div>
          </div>

          <div className="farmer-top-actions">
            <button 
              onClick={() => setShowAddLotModal(true)}
              className="btn-add-lot"
            >
              <PlusCircle size={18} />
              <span>Post New Harvest Lot</span>
            </button>
          </div>
        </div>
      </div>

      <div className="app-main-canvas">
        {/* Real-Time Farmer KPI Metrics */}
        <div className="grid-4" style={{ marginBottom: '24px' }}>
          <div className="surface-card f-kpi-card border-green">
            <div className="f-kpi-meta">
              <span className="f-kpi-lbl">NET ESCROW PAYOUTS DISBURSED</span>
              <DollarSign size={18} className="text-emerald" />
            </div>
            <div className="f-kpi-val text-emerald">₹6,12,000</div>
            <div className="f-kpi-sub text-emerald">
              <TrendingUp size={13} />
              <span>+22.0% above village arhtiya middlemen</span>
            </div>
          </div>

          <div className="surface-card f-kpi-card border-blue">
            <div className="f-kpi-meta">
              <span className="f-kpi-lbl">CURRENT ACTIVE LISTING</span>
              <Package size={18} className="text-cyan" />
            </div>
            <div className="f-kpi-val">25 MT</div>
            <div className="f-kpi-sub">Tomato Desi Hybrid Grade A</div>
          </div>

          <div className="surface-card f-kpi-card border-amber">
            <div className="f-kpi-meta">
              <span className="f-kpi-lbl">SETTLEMENT SPEED</span>
              <Clock size={18} className="text-amber" />
            </div>
            <div className="f-kpi-val text-amber">&lt; 15 Mins</div>
            <div className="f-kpi-sub">Direct RTGS / UPI to bank account</div>
          </div>

          <div className="surface-card f-kpi-card border-purple">
            <div className="f-kpi-meta">
              <span className="f-kpi-lbl">PAYMENT DEFAULT RATE</span>
              <ShieldCheck size={18} className="text-purple" />
            </div>
            <div className="f-kpi-val">0.0%</div>
            <div className="f-kpi-sub">100% Escrow guaranteed contracts</div>
          </div>
        </div>

        <div className="grid-2">
          {/* Active Produce Inventory */}
          <div className="surface-card">
            <div className="card-header-flex">
              <div>
                <h3 className="section-title">My Harvest Produce Lots</h3>
                <p className="section-subtitle">Live availability visible to wholesale buyers</p>
              </div>
              <button onClick={() => setShowAddLotModal(true)} className="btn-sm-green">
                + Add Lot
              </button>
            </div>

            <div className="lots-list">
              <div className="lot-item-card">
                <div className="lic-left">
                  <div className="lic-icon">🍅</div>
                  <div>
                    <strong className="lic-crop">Tomato (Desi Hybrid Premium)</strong>
                    <div className="lic-sub">Chittorgarh Cluster • Harvest Date: Today</div>
                  </div>
                </div>
                <div className="lic-right text-right">
                  <div className="lic-qty">25 Tons Available</div>
                  <div className="lic-rate text-emerald">₹18.00 / kg</div>
                  <span className="status-badge-active">Allocated in Active Order (12t)</span>
                </div>
              </div>

              <div className="lot-item-card">
                <div className="lic-left">
                  <div className="lic-icon">🧅</div>
                  <div>
                    <strong className="lic-crop">Red Onion (Grade A)</strong>
                    <div className="lic-sub">Chittorgarh Sub-cluster • Stored in aerated crates</div>
                  </div>
                </div>
                <div className="lic-right text-right">
                  <div className="lic-qty">15 Tons Available</div>
                  <div className="lic-rate text-emerald">₹22.50 / kg</div>
                  <span className="status-badge-open">Open for Bidding</span>
                </div>
              </div>
            </div>
          </div>

          {/* Active Buyer Orders & Direct Settlements */}
          <div className="surface-card">
            <div className="card-header-flex">
              <div>
                <h3 className="section-title">Buyer Procurement Orders</h3>
                <p className="section-subtitle">Guaranteed escrow contracts & truck dispatch stage</p>
              </div>
            </div>

            <div className="farmer-orders-list">
              <div className="f-order-card">
                <div className="foc-top">
                  <div>
                    <span className="foc-id">#ORD-98241</span>
                    <strong className="foc-buyer">FreshBazaar Hypermarkets</strong>
                  </div>
                  <span className="status-pill in_transit">Truck In Transit</span>
                </div>

                <div className="foc-details">
                  <div>
                    <span className="text-secondary text-xs">Allocated Quantity</span>
                    <div className="font-bold">12,000 kg (12 MT) Tomato</div>
                  </div>
                  <div className="text-right">
                    <span className="text-secondary text-xs">Guaranteed Farmgate Payout</span>
                    <div className="font-bold text-emerald text-base">₹2,16,000</div>
                  </div>
                </div>

                <div className="foc-progress">
                  <span className="text-xs text-secondary">
                    ✓ Picked up at farmgate (07:30 AM) • Dispatch arriving Jaipur terminal at 02:45 PM
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Post Harvest Lot */}
      {showAddLotModal && (
        <div className="modal-overlay" onClick={() => setShowAddLotModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Post Fresh Harvest Lot</h3>
              <button onClick={() => setShowAddLotModal(false)} className="btn-close-modal">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="modal-form">
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Crop Name *</label>
                  <select 
                    value={newLot.crop}
                    onChange={e => setNewLot({ ...newLot, crop: e.target.value })}
                    className="form-select-clean"
                  >
                    <option value="Tomato">Tomato</option>
                    <option value="Onion">Onion</option>
                    <option value="Wheat">Wheat</option>
                    <option value="Potato">Potato</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Crop Variety</label>
                  <input 
                    type="text" 
                    value={newLot.variety}
                    onChange={e => setNewLot({ ...newLot, variety: e.target.value })}
                    className="form-input-clean"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Quantity (in tons) *</label>
                  <input 
                    type="number" 
                    value={newLot.quantity}
                    onChange={e => setNewLot({ ...newLot, quantity: e.target.value })}
                    className="form-input-clean"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Farmgate Asking Price (₹/kg) *</label>
                  <input 
                    type="number" 
                    value={newLot.askingPrice}
                    onChange={e => setNewLot({ ...newLot, askingPrice: e.target.value })}
                    className="form-input-clean"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Quality Grade</label>
                  <select 
                    value={newLot.grade}
                    onChange={e => setNewLot({ ...newLot, grade: e.target.value })}
                    className="form-select-clean"
                  >
                    <option value="A">Grade A (Premium Retail)</option>
                    <option value="B">Grade B (Standard Mandi)</option>
                    <option value="C">Grade C (Industrial Puree)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Harvest Date</label>
                  <input 
                    type="date" 
                    value={newLot.harvestDate}
                    onChange={e => setNewLot({ ...newLot, harvestDate: e.target.value })}
                    className="form-input-clean"
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" onClick={() => setShowAddLotModal(false)} className="btn-clean-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-procure-main">
                  Publish Lot to Wholesale Buyers
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .farmer-top-strip {
          background: #ffffff;
          border-bottom: 1px solid #e2e8f0;
          padding: 24px;
        }

        .farmer-top-inner {
          max-width: 1300px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }

        .farmer-profile-card-top {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .f-avatar {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: #ecfdf5;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          border: 1px solid #a7f3d0;
        }

        .f-badge {
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: #059669;
        }

        .f-name {
          font-family: var(--font-heading);
          font-size: 1.45rem;
          font-weight: 800;
          color: #0f172a;
          line-height: 1.2;
        }

        .f-fpo {
          font-size: 0.8rem;
          color: #64748b;
          margin-top: 2px;
        }

        .btn-add-lot {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #059669;
          color: #ffffff;
          border: none;
          padding: 12px 20px;
          border-radius: 10px;
          font-family: var(--font-heading);
          font-size: 0.92rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(5, 150, 105, 0.25);
          transition: background 0.2s;
        }

        .btn-add-lot:hover {
          background: #047857;
        }

        .f-kpi-card {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .f-kpi-card.border-green { border-top: 4px solid #059669; }
        .f-kpi-card.border-blue { border-top: 4px solid #0284c7; }
        .f-kpi-card.border-amber { border-top: 4px solid #d97706; }
        .f-kpi-card.border-purple { border-top: 4px solid #7c3aed; }

        .f-kpi-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .f-kpi-lbl {
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          color: #64748b;
        }

        .f-kpi-val {
          font-family: var(--font-heading);
          font-size: 1.65rem;
          font-weight: 800;
        }

        .f-kpi-sub {
          font-size: 0.74rem;
          display: flex;
          align-items: center;
          gap: 4px;
          color: #64748b;
        }

        .lots-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 14px;
        }

        .lot-item-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 16px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          background: #f8fafc;
        }

        .lic-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .lic-icon { font-size: 1.6rem; }
        .lic-crop { display: block; font-size: 0.92rem; color: #0f172a; }
        .lic-sub { font-size: 0.74rem; color: #64748b; }

        .lic-qty { font-weight: 800; font-size: 0.92rem; }
        .lic-rate { font-size: 0.82rem; font-weight: 700; margin: 2px 0 4px; }

        .status-badge-active {
          display: inline-block;
          font-size: 0.68rem;
          font-weight: 700;
          background: #ecfdf5;
          color: #059669;
          border: 1px solid rgba(5, 150, 105, 0.25);
          padding: 2px 8px;
          border-radius: 12px;
        }

        .status-badge-open {
          display: inline-block;
          font-size: 0.68rem;
          font-weight: 700;
          background: #f0fdf4;
          color: #15803d;
          border: 1px solid #bbf7d0;
          padding: 2px 8px;
          border-radius: 12px;
        }

        .btn-sm-green {
          background: #ecfdf5;
          color: #059669;
          border: 1px solid rgba(5, 150, 105, 0.3);
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 0.78rem;
          font-weight: 700;
          cursor: pointer;
        }

        .farmer-orders-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 14px;
        }

        .f-order-card {
          padding: 16px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          background: #f8fafc;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .foc-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .foc-id {
          display: block;
          font-family: monospace;
          font-size: 0.72rem;
          color: #059669;
          font-weight: 700;
        }

        .foc-buyer {
          font-size: 0.95rem;
          color: #0f172a;
        }

        .foc-details {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 12px;
          background: #ffffff;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(4px);
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .modal-card {
          width: 100%;
          max-width: 600px;
          background: #ffffff;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .modal-header h3 {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 800;
        }

        .btn-close-modal {
          background: transparent;
          border: none;
          color: #64748b;
          cursor: pointer;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 24px;
          padding-top: 18px;
          border-top: 1px solid #e2e8f0;
        }
      `}</style>
    </div>
  );
}
