import React, { useState } from 'react';
import { 
  Sprout, 
  PlusCircle, 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  Coins, 
  TrendingUp, 
  ArrowRight, 
  Package, 
  User, 
  Bell, 
  Home, 
  Layers, 
  DollarSign,
  ChevronRight,
  ShieldCheck,
  PhoneCall
} from 'lucide-react';

export default function FarmerMobileApp({ supplies = [], onAddSupply }) {
  const [activeFarmerTab, setActiveFarmerTab] = useState('inventory');
  const [showAddLotModal, setShowAddLotModal] = useState(false);

  // New Produce Lot Form
  const [newLot, setNewLot] = useState({
    crop: 'Tomato',
    variety: 'Desi Hybrid Premium',
    quantity: 25,
    unit: 'tons',
    askingPrice: 18,
    grade: 'A',
    harvestDate: '2025-09-24',
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
    <div className="mobile-app-shell">
      <div className="iphone-hardware-frame">
        <div className="dynamic-island">
          <div className="island-camera"></div>
        </div>

        <div className="app-screen">
          {/* Status Bar */}
          <div className="ios-status-bar">
            <span className="ios-clock">9:41</span>
            <div className="ios-icons">
              <span>📶</span>
              <span>5G</span>
              <span>🔋</span>
            </div>
          </div>

          {/* Farmer App Header */}
          <div className="farmer-app-top-header">
            <div className="farmer-avatar-badge">👨‍🌾</div>
            <div className="farmer-info-left">
              <div className="farmer-name-main">Rameshwar Choudhary</div>
              <div className="farmer-fpo-sub">Shree Krishi FPO • Chittorgarh</div>
            </div>
            <div className="farmer-bell-btn">
              <Bell size={16} />
            </div>
          </div>

          <div className="scrollable-screen-body">
            {/* Direct Earnings Banner */}
            <div className="farmer-earnings-card">
              <div className="fec-label">This Month Direct Net Payout</div>
              <div className="fec-amount">₹2,16,000</div>
              <div className="fec-sub-strip">
                <span className="text-white font-bold">100% Escrow Protected</span>
                <span className="fec-uplift-pill">+18.5% vs Mandi Broker</span>
              </div>
            </div>

            {/* Quick Action: Add Crop */}
            <button 
              onClick={() => setShowAddLotModal(true)} 
              className="app-primary-btn" 
              style={{ marginTop: 12, marginBottom: 12 }}
            >
              <PlusCircle size={17} />
              <span>Post New Harvest Lot / नई फसल जोड़ें</span>
            </button>

            {/* Subtabs: My Crops | Buyer Orders | Mandi Rates */}
            <div className="farmer-subnav-strip">
              <button 
                onClick={() => setActiveFarmerTab('inventory')}
                className={`f-tab ${activeFarmerTab === 'inventory' ? 'active' : ''}`}
              >
                My Produce Lots
              </button>
              <button 
                onClick={() => setActiveFarmerTab('matched')}
                className={`f-tab ${activeFarmerTab === 'matched' ? 'active' : ''}`}
              >
                Active Buyer Orders
              </button>
              <button 
                onClick={() => setActiveFarmerTab('mandi')}
                className={`f-tab ${activeFarmerTab === 'mandi' ? 'active' : ''}`}
              >
                Mandi Rates
              </button>
            </div>

            {/* Tab 1: Produce Inventory */}
            {activeFarmerTab === 'inventory' && (
              <div className="farmer-inventory-list">
                <div className="lot-card">
                  <div className="lot-top-row">
                    <div>
                      <h4 className="lot-crop-title">Tomato (Desi Hybrid)</h4>
                      <span className="lot-meta-loc">Chittorgarh Farm Lot #14</span>
                    </div>
                    <span className="grade-chip">Grade A</span>
                  </div>

                  <div className="lot-specs-grid">
                    <div>
                      <span className="ls-label">Total Listed</span>
                      <strong className="ls-val">25 tons</strong>
                    </div>
                    <div>
                      <span className="ls-label">Allocated to Order</span>
                      <strong className="ls-val text-primary-green">12 tons</strong>
                    </div>
                    <div>
                      <span className="ls-label">Farmgate Rate</span>
                      <strong className="ls-val">₹18/kg</strong>
                    </div>
                  </div>

                  <div className="lot-status-row">
                    <span className="badge badge-emerald">
                      <CheckCircle2 size={12} /> Dispatched to Jaipur Depot
                    </span>
                    <span className="text-muted" style={{ fontSize: '0.68rem' }}>
                      Ready: 25 Sep 2025
                    </span>
                  </div>
                </div>

                <div className="lot-card" style={{ marginTop: 8 }}>
                  <div className="lot-top-row">
                    <div>
                      <h4 className="lot-crop-title">Wheat (Sharbati Gold)</h4>
                      <span className="lot-meta-loc">Chittorgarh North Sector</span>
                    </div>
                    <span className="grade-chip">Grade A</span>
                  </div>

                  <div className="lot-specs-grid">
                    <div>
                      <span className="ls-label">Total Listed</span>
                      <strong className="ls-val">10 tons</strong>
                    </div>
                    <div>
                      <span className="ls-label">Status</span>
                      <strong className="ls-val text-primary-green">Available</strong>
                    </div>
                    <div>
                      <span className="ls-label">Farmgate Rate</span>
                      <strong className="ls-val">₹24.5/kg</strong>
                    </div>
                  </div>

                  <div className="lot-status-row">
                    <span className="badge badge-cyan">
                      Ready for Buyer Matching
                    </span>
                    <span className="text-muted" style={{ fontSize: '0.68rem' }}>
                      Ready: 28 Sep 2025
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Matched Orders */}
            {activeFarmerTab === 'matched' && (
              <div className="farmer-matched-list">
                <div className="farmer-order-box">
                  <div className="fob-header">
                    <span className="badge badge-emerald">CONFIRMED ORDER #KR-2025-8821</span>
                    <span className="text-primary-green font-bold" style={{ fontSize: '0.8rem' }}>+₹2,16,000</span>
                  </div>
                  <h4 style={{ fontSize: '0.88rem', margin: '4px 0' }}>12 Tons Tomato ➔ Jaipur Terminal</h4>
                  <div className="text-muted" style={{ fontSize: '0.72rem' }}>
                    Buyer: Jaipur Mega Agro Terminal • Direct Escrow Funded
                  </div>
                  <div className="pickup-time-pill">
                    <Clock size={13} className="text-primary-green" />
                    <span>Pickup Window: Today, 06:30 AM (QuickAgri Fleet Reefer RJ-14-GA-8921)</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Mandi Rates */}
            {activeFarmerTab === 'mandi' && (
              <div className="mandi-rates-list">
                <div className="mandi-rate-item">
                  <div>
                    <strong>Chittorgarh Mandi</strong>
                    <div className="text-muted" style={{ fontSize: '0.68rem' }}>Tomato (Modal Price)</div>
                  </div>
                  <div className="text-right">
                    <div className="m-price">₹15.5/kg</div>
                    <div className="m-trend text-primary-green">KrishiRoute: ₹18/kg (+16%)</div>
                  </div>
                </div>

                <div className="mandi-rate-item">
                  <div>
                    <strong>Tonk Mandi Yard</strong>
                    <div className="text-muted" style={{ fontSize: '0.68rem' }}>Tomato (Modal Price)</div>
                  </div>
                  <div className="text-right">
                    <div className="m-price">₹16.0/kg</div>
                    <div className="m-trend text-primary-green">KrishiRoute: ₹19/kg (+18%)</div>
                  </div>
                </div>

                <div className="mandi-rate-item">
                  <div>
                    <strong>Jaipur Muhana Mandi</strong>
                    <div className="text-muted" style={{ fontSize: '0.68rem' }}>Wheat Sharbati</div>
                  </div>
                  <div className="text-right">
                    <div className="m-price">₹21.0/kg</div>
                    <div className="m-trend text-primary-green">KrishiRoute: ₹24.5/kg (+16%)</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Tabs */}
          <div className="app-bottom-navbar">
            <button className="nav-tab-btn active">
              <Sprout size={18} />
              <span>My Crops</span>
            </button>
            <button className="nav-tab-btn">
              <Package size={18} />
              <span>Orders</span>
            </button>
            <button className="nav-tab-btn">
              <TrendingUp size={18} />
              <span>Mandi</span>
            </button>
            <button className="nav-tab-btn">
              <User size={18} />
              <span>Profile</span>
            </button>
          </div>
          <div className="ios-bottom-indicator"></div>
        </div>
      </div>

      {/* Add Produce Lot Modal */}
      {showAddLotModal && (
        <div className="modal-overlay" onClick={() => setShowAddLotModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: 12 }}>Post Fresh Harvest / नई फसल जोड़ें</h3>
            
            <form onSubmit={handleAddSubmit}>
              <div className="form-group">
                <label className="form-label">Crop Name / फसल</label>
                <select 
                  value={newLot.crop}
                  onChange={e => setNewLot({ ...newLot, crop: e.target.value })}
                  className="form-select"
                >
                  <option value="Tomato">Tomato (टमाटर)</option>
                  <option value="Nashik Red Onion">Red Onion (प्याज)</option>
                  <option value="Wheat">Wheat (गेहूँ)</option>
                  <option value="Orange">Orange (संतरा)</option>
                </select>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Quantity in Tons / मात्रा</label>
                  <input 
                    type="number"
                    value={newLot.quantity}
                    onChange={e => setNewLot({ ...newLot, quantity: e.target.value })}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Asking Price (₹/kg) / मूल्य</label>
                  <input 
                    type="number"
                    value={newLot.askingPrice}
                    onChange={e => setNewLot({ ...newLot, askingPrice: e.target.value })}
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Farm Location / खेत का पता</label>
                <input 
                  type="text"
                  value={newLot.location}
                  onChange={e => setNewLot({ ...newLot, location: e.target.value })}
                  className="form-input"
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 18 }}>
                <button 
                  type="button" 
                  onClick={() => setShowAddLotModal(false)} 
                  className="btn btn-secondary btn-sm"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Publish Crop Lot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .farmer-app-top-header {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 16px;
          background: #ffffff;
          border-bottom: 1px solid #f1f5f9;
        }

        .farmer-avatar-badge {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #dcfce7;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
        }

        .farmer-info-left { flex: 1; }
        .farmer-name-main { font-family: var(--font-heading); font-weight: 800; font-size: 0.95rem; color: #0f172a; line-height: 1.1; }
        .farmer-fpo-sub { font-size: 0.68rem; color: #15803d; font-weight: 600; }

        .farmer-bell-btn {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #f8fafc;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #64748b;
        }

        .farmer-earnings-card {
          background: linear-gradient(135deg, #15803d 0%, #16a34a 100%);
          color: #ffffff;
          border-radius: 16px;
          padding: 16px;
        }

        .fec-label { font-size: 0.7rem; color: #d1fae5; font-weight: 600; }
        .fec-amount { font-family: var(--font-heading); font-size: 1.6rem; font-weight: 900; margin: 4px 0 8px; line-height: 1; }
        .fec-sub-strip { display: flex; justify-content: space-between; align-items: center; font-size: 0.7rem; }
        .fec-uplift-pill { background: rgba(0, 0, 0, 0.2); padding: 2px 7px; border-radius: 5px; font-weight: 700; color: #fef08a; }

        .farmer-subnav-strip {
          display: flex;
          gap: 6px;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 6px;
          margin-bottom: 10px;
        }

        .f-tab {
          flex: 1;
          padding: 6px 0;
          border: none;
          background: transparent;
          font-size: 0.74rem;
          font-weight: 700;
          color: #64748b;
          cursor: pointer;
        }
        .f-tab.active {
          color: #15803d;
          border-bottom: 2px solid #15803d;
        }

        .lot-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 12px;
        }

        .lot-top-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 8px;
        }

        .lot-crop-title { font-size: 0.88rem; font-weight: 800; color: #0f172a; }
        .lot-meta-loc { font-size: 0.68rem; color: #64748b; }

        .grade-chip {
          background: #dcfce7;
          color: #15803d;
          font-size: 0.68rem;
          font-weight: 800;
          padding: 2px 6px;
          border-radius: 4px;
        }

        .lot-specs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 6px;
          background: #f8fafc;
          padding: 8px;
          border-radius: 8px;
          margin-bottom: 8px;
        }

        .ls-label { font-size: 0.6rem; color: #64748b; display: block; }
        .ls-val { font-size: 0.78rem; color: #0f172a; }

        .lot-status-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .farmer-order-box {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 12px;
        }

        .fob-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
        .pickup-time-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #f0fdf4;
          color: #14532d;
          font-size: 0.7rem;
          padding: 6px 8px;
          border-radius: 6px;
          margin-top: 8px;
        }

        .mandi-rates-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .mandi-rate-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 10px 12px;
          font-size: 0.78rem;
        }

        .m-price { font-weight: 800; font-size: 0.95rem; color: #0f172a; }
        .m-trend { font-size: 0.68rem; font-weight: 700; }
      `}</style>
    </div>
  );
}
