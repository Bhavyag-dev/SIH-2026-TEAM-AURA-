import React, { useState } from 'react';
import { 
  Truck, 
  Warehouse, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Fuel, 
  ArrowRight,
  Activity,
  AlertTriangle,
  Play
} from 'lucide-react';

export default function LogisticsPortal({ 
  vehicles = [], 
  warehouses = [], 
  orders = [],
  onUpdateOrderStatus
}) {
  const [activeTab, setActiveTab] = useState('orders');

  const milestones = [
    { step: 1, key: 'order_confirmed', label: 'Order Confirmed & Escrow Funded' },
    { step: 2, key: 'dispatch_scheduled', label: 'Fleet Vehicle Assigned & En Route' },
    { step: 3, key: 'farm_collection_in_progress', label: 'Multi-Stop Farm Pickups Active' },
    { step: 4, key: 'hub_precooled', label: 'Consolidation & Quality Graded' },
    { step: 5, key: 'en_route_delivery', label: 'Final Depot Transit' },
    { step: 6, key: 'delivered_and_settled', label: 'Delivered & Escrow Released' }
  ];

  return (
    <div className="portal-container">
      {/* Logistics Hero */}
      <div className="logistics-hero-card glass-card">
        <div className="logistics-hero-content">
          <div className="logistics-avatar">
            <Truck size={28} className="text-cyan" />
          </div>
          <div>
            <div className="logistics-title">
              QuickAgri Cold Fleet & Regional Hub Dispatch Control
            </div>
            <div className="logistics-meta">
              <span className="badge badge-cyan">
                <ShieldCheck size={13} /> DoCA Certified Agricultural Transporter
              </span>
              <span className="text-secondary">📍 Western Maharashtra Agri Corridor</span>
              <span className="text-secondary">⚡ VRP Route Telemetry Online</span>
            </div>
          </div>
        </div>

        <div className="tab-pill-group">
          <button 
            onClick={() => setActiveTab('orders')}
            className={`tab-pill ${activeTab === 'orders' ? 'active' : ''}`}
          >
            Active Dispatches ({orders.length})
          </button>
          <button 
            onClick={() => setActiveTab('fleet')}
            className={`tab-pill ${activeTab === 'fleet' ? 'active' : ''}`}
          >
            Verified Fleet ({vehicles.length})
          </button>
          <button 
            onClick={() => setActiveTab('warehouses')}
            className={`tab-pill ${activeTab === 'warehouses' ? 'active' : ''}`}
          >
            Pre-Cooling Hubs ({warehouses.length})
          </button>
        </div>
      </div>

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div style={{ marginTop: '24px' }}>
          <div className="section-header">
            <div>
              <h2>Live Shipment Dispatches & Milestone Tracking</h2>
              <p className="text-muted">Interactive milestone stepper: click to simulate real-time transport lifecycle updates</p>
            </div>
          </div>

          <div className="orders-stack" style={{ marginTop: '16px' }}>
            {orders.map((ord) => {
              const currentStep = ord.currentMilestone?.step || 3;
              return (
                <div key={ord._id || ord.id} className="order-dispatch-card glass-card">
                  <div className="ord-card-top">
                    <div>
                      <span className="badge badge-cyan">{ord.orderNumber || 'ORD-2026-KS-8891'}</span>
                      <h3 style={{ marginTop: '6px' }}>{ord.crop} • {ord.totalQuantityQuintals} Quintals</h3>
                      <div className="text-muted" style={{ fontSize: '0.84rem' }}>
                        Buyer: {ord.buyerName || 'Wholesale Distribution Center'}
                      </div>
                    </div>

                    <div className="ord-escrow-pill">
                      <div className="escrow-label">Escrow Protected Payout</div>
                      <div className="escrow-val text-emerald">₹{ord.totalAmount?.toLocaleString()}</div>
                      <div className="escrow-sub text-muted">Farmers: ₹{ord.paymentBreakdown?.farmersPayout?.toLocaleString()}</div>
                    </div>
                  </div>

                  {/* Milestone Stepper */}
                  <div className="milestones-stepper">
                    {milestones.map((m) => {
                      const isCompleted = currentStep >= m.step;
                      const isCurrent = currentStep === m.step;
                      return (
                        <div 
                          key={m.step} 
                          className={`milestone-node ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}
                          onClick={() => onUpdateOrderStatus(ord._id || ord.id, m.key, m.step, m.label)}
                          title="Click to advance to this status"
                        >
                          <div className="node-circle">
                            {isCompleted ? <CheckCircle2 size={16} /> : m.step}
                          </div>
                          <div className="node-text">{m.label}</div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Current Status Message */}
                  <div className="current-status-strip">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Activity size={16} className="text-cyan pulse-icon" />
                      <span><strong>Current Milestone:</strong> {ord.currentMilestone?.label || 'Farm collection in progress'}</span>
                    </div>
                    <div className="text-muted" style={{ fontSize: '0.78rem' }}>
                      Telemetry Updated: {ord.currentMilestone?.updatedAt || 'Just now'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Fleet Tab */}
      {activeTab === 'fleet' && (
        <div style={{ marginTop: '24px' }}>
          <div className="section-header">
            <div>
              <h2>Registered Transport Resources (VRP Fleet)</h2>
              <p className="text-muted">GPS-tracked vehicles participating in multi-stop farm pickup batches</p>
            </div>
          </div>

          <div className="grid-3" style={{ marginTop: '16px' }}>
            {vehicles.map((v) => (
              <div key={v._id || v.id} className="fleet-card glass-card">
                <div className="fleet-card-top">
                  <span className="badge badge-cyan">{v.vehicleNumber}</span>
                  <span className="badge badge-emerald">Available</span>
                </div>
                <h3 className="fleet-title">{v.vehicleType}</h3>
                <div className="fleet-provider text-muted">{v.providerName}</div>

                <div className="fleet-specs-box">
                  <div className="spec-row">
                    <span>Capacity:</span>
                    <strong>{v.capacityQuintals} Quintals ({Math.round(v.capacityQuintals / 10)} Tonnes)</strong>
                  </div>
                  <div className="spec-row">
                    <span>Cold Chain:</span>
                    <strong className={v.hasColdChain ? 'text-cyan' : 'text-muted'}>
                      {v.hasColdChain ? 'Active Reefer Unit' : 'Standard Crated'}
                    </strong>
                  </div>
                  <div className="spec-row">
                    <span>Tariff Rate:</span>
                    <strong className="text-amber">₹{v.costPerKm}/km</strong>
                  </div>
                  <div className="spec-row">
                    <span>Driver Contact:</span>
                    <span>{v.driverName} ({v.driverPhone})</span>
                  </div>
                </div>

                <div className="fleet-location">
                  <MapPin size={14} className="text-cyan" />
                  <span>Stationed: {v.currentLocation?.city || 'Nashik Logistics Hub'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Warehouses Tab */}
      {activeTab === 'warehouses' && (
        <div style={{ marginTop: '24px' }}>
          <div className="section-header">
            <div>
              <h2>Aggregation Hubs & Cold Storages</h2>
              <p className="text-muted">Integrated facilities evaluated by the Storage vs. No-Storage decision engine</p>
            </div>
          </div>

          <div className="grid-2" style={{ marginTop: '16px' }}>
            {warehouses.map((wh) => (
              <div key={wh._id || wh.id} className="warehouse-card glass-card">
                <div className="wh-top">
                  <span className="badge badge-amber">{wh.type}</span>
                  <span className="text-secondary" style={{ fontSize: '0.84rem' }}>
                    <MapPin size={14} className="text-cyan" /> {wh.location?.district}
                  </span>
                </div>
                <h3 style={{ margin: '8px 0 4px' }}>{wh.name}</h3>
                <div className="text-muted" style={{ fontSize: '0.82rem' }}>{wh.location?.address}</div>

                <div className="wh-capacity-bar">
                  <div className="wh-cap-label">
                    <span>Available Capacity: <strong>{wh.availableCapacityQuintals} Q</strong></span>
                    <span>Total: {wh.totalCapacityQuintals} Q</span>
                  </div>
                  <div className="cap-track">
                    <div 
                      className="cap-fill" 
                      style={{ width: `${(wh.availableCapacityQuintals / wh.totalCapacityQuintals) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="wh-details-grid">
                  <div>
                    <span className="text-muted" style={{ fontSize: '0.74rem' }}>Daily Holding Fee</span>
                    <div className="font-bold text-amber">₹{wh.storageCostPerQuintalDay}/Q/day</div>
                  </div>
                  <div>
                    <span className="text-muted" style={{ fontSize: '0.74rem' }}>Climate Control</span>
                    <div className="font-bold text-cyan">{wh.temperatureRange}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`
        .logistics-hero-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
          background: linear-gradient(135deg, rgba(6, 36, 50, 0.9) 0%, rgba(3, 18, 26, 0.95) 100%);
          border-left: 4px solid var(--accent-cyan);
        }

        .logistics-hero-content {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .logistics-avatar {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          background: rgba(6, 182, 212, 0.15);
          border: 1px solid var(--accent-cyan);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logistics-title {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 700;
          color: #fff;
        }

        .logistics-meta {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-top: 6px;
          font-size: 0.82rem;
          flex-wrap: wrap;
        }

        .tab-pill-group {
          display: flex;
          gap: 8px;
          background: rgba(0, 0, 0, 0.35);
          padding: 6px;
          border-radius: 12px;
          border: 1px solid var(--border-subtle);
        }

        .tab-pill {
          padding: 8px 16px;
          border-radius: 8px;
          border: none;
          background: transparent;
          color: var(--text-secondary);
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 0.86rem;
          cursor: pointer;
          transition: var(--trans-smooth);
        }

        .tab-pill.active {
          background: var(--accent-cyan);
          color: #031b24;
          font-weight: 700;
        }

        .orders-stack {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .order-dispatch-card {
          padding: 24px;
          border-left: 4px solid var(--accent-emerald);
        }

        .ord-card-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 24px;
        }

        .ord-escrow-pill {
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--border-subtle);
          padding: 10px 16px;
          border-radius: 10px;
          text-align: right;
        }

        .escrow-label {
          font-size: 0.72rem;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .escrow-val {
          font-family: var(--font-heading);
          font-size: 1.3rem;
          font-weight: 800;
        }

        .escrow-sub {
          font-size: 0.76rem;
        }

        .milestones-stepper {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 12px;
          margin-bottom: 20px;
        }

        .milestone-node {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-subtle);
          padding: 12px;
          border-radius: 10px;
          cursor: pointer;
          transition: var(--trans-smooth);
          text-align: center;
        }

        .milestone-node:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: var(--accent-cyan);
        }

        .milestone-node.completed {
          background: rgba(16, 185, 129, 0.12);
          border-color: rgba(16, 185, 129, 0.3);
          color: #34d399;
        }

        .milestone-node.current {
          background: rgba(6, 182, 212, 0.15);
          border-color: var(--accent-cyan);
          color: #38bdf8;
          box-shadow: 0 0 14px rgba(6, 182, 212, 0.25);
        }

        .node-circle {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 8px;
          font-weight: 700;
          font-size: 0.8rem;
        }

        .node-text {
          font-size: 0.76rem;
          font-weight: 600;
          line-height: 1.2;
        }

        .current-status-strip {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          background: rgba(0, 0, 0, 0.25);
          padding: 10px 16px;
          border-radius: 8px;
          font-size: 0.86rem;
        }

        .pulse-icon {
          animation: pulseGlow 1.5s infinite;
        }

        .fleet-card {
          padding: 20px;
        }

        .fleet-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .fleet-title {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 700;
        }

        .fleet-provider {
          font-size: 0.8rem;
          margin-bottom: 16px;
        }

        .fleet-specs-box {
          background: rgba(0, 0, 0, 0.25);
          border-radius: 10px;
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 0.82rem;
          margin-bottom: 16px;
        }

        .spec-row {
          display: flex;
          justify-content: space-between;
        }

        .fleet-location {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
          color: var(--text-secondary);
        }

        .warehouse-card {
          padding: 22px;
        }

        .wh-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .wh-capacity-bar {
          margin: 16px 0;
        }

        .wh-cap-label {
          display: flex;
          justify-content: space-between;
          font-size: 0.78rem;
          margin-bottom: 6px;
        }

        .cap-track {
          width: 100%;
          height: 8px;
          background: rgba(0, 0, 0, 0.4);
          border-radius: 999px;
          overflow: hidden;
        }

        .cap-fill {
          height: 100%;
          background: var(--grad-emerald);
          border-radius: 999px;
        }

        .wh-details-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
          padding-top: 14px;
          border-top: 1px solid var(--border-subtle);
        }
      `}</style>
    </div>
  );
}
