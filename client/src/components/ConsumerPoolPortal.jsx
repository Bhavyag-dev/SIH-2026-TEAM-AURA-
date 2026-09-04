import React, { useState } from 'react';
import { 
  Users, 
  Sparkles, 
  MapPin, 
  Clock, 
  ShoppingBag, 
  ShieldCheck, 
  TrendingDown, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export default function ConsumerPoolPortal({ pools = [], onPledgeToPool }) {
  const [activePledgeModal, setActivePledgeModal] = useState(null);
  const [pledgeKg, setPledgeKg] = useState(10);
  const [pledgeSuccessMsg, setPledgeSuccessMsg] = useState('');

  const handlePledgeSubmit = (e) => {
    e.preventDefault();
    if (!activePledgeModal) return;
    onPledgeToPool(activePledgeModal._id || activePledgeModal.id, pledgeKg);
    setPledgeSuccessMsg(`🎉 Successfully pledged ${pledgeKg} kg to ${activePledgeModal.poolTitle}! Delivery scheduled to ${activePledgeModal.distributionHub}`);
    setTimeout(() => {
      setActivePledgeModal(null);
      setPledgeSuccessMsg('');
    }, 2500);
  };

  return (
    <div className="portal-container">
      {/* Consumer Hero Banner */}
      <div className="consumer-hero-card glass-card">
        <div className="consumer-hero-content">
          <div className="consumer-avatar">
            <Users size={28} className="text-purple" />
          </div>
          <div>
            <div className="consumer-title">
              Geographic Consumer Demand Pooling (Community Direct Buy)
            </div>
            <div className="consumer-meta">
              <span className="badge badge-purple">
                <Sparkles size={13} /> Direct Group Buying Flow
              </span>
              <span className="text-secondary">📍 Neighbourhood Hubs & Society Distribution</span>
              <span className="text-secondary">⚡ 30%–38% Cheaper Than Retail Grocery Marts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="pool-info-banner glass-card">
        <div className="pool-info-icon">💡</div>
        <div>
          <h4>How Consumer Pooling Works (Direct Aggregation Model)</h4>
          <p className="text-secondary" style={{ fontSize: '0.88rem', marginTop: '4px' }}>
            Instead of inefficient 1-farmer-to-1-household delivery, neighbouring consumers pool demand to reach wholesale vehicle MOQ. 
            Fresh produce is harvested on-demand, consolidated at a local hub, and collected at farmgate rates with zero middleman markups.
          </p>
        </div>
      </div>

      {/* Pools Grid */}
      <div className="section-header" style={{ marginTop: '24px' }}>
        <div>
          <h2>Active Community Procurement Pools</h2>
          <p className="text-muted">Pledge your household requirement to unlock direct wholesale farmgate tiers</p>
        </div>
      </div>

      <div className="grid-3" style={{ marginTop: '16px' }}>
        {pools.map((pool) => {
          const percent = Math.min(100, Math.round(((pool.currentPledgedKg || 350) / (pool.minBatchTargetKg || 500)) * 100));
          const savingsPerKg = (pool.retailMarketPrice || 45) - (pool.unitPriceInPool || 28);

          return (
            <div key={pool._id || pool.id} className="pool-card glass-card">
              <div className="pool-top">
                <span className="badge badge-purple">
                  <Users size={12} /> {pool.participantsCount || 42} Households Pledged
                </span>
                <span className="pool-timer">
                  <Clock size={13} className="text-amber" />
                  <span>{pool.endsInHours || 18}h left</span>
                </span>
              </div>

              <h3 className="pool-title">{pool.poolTitle}</h3>
              <div className="pool-producer text-muted">Direct from: {pool.producerName}</div>

              {/* Price comparison box */}
              <div className="pool-price-box">
                <div>
                  <span className="p-label">Group Pool Price</span>
                  <span className="p-val text-emerald">₹{pool.unitPriceInPool}/kg</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className="p-label">Retail Market</span>
                  <span className="p-strike text-muted">₹{pool.retailMarketPrice}/kg</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="pool-progress-section">
                <div className="prog-labels">
                  <span>Batch Progress: <strong>{pool.currentPledgedKg} / {pool.minBatchTargetKg} kg</strong></span>
                  <span className="text-cyan font-bold">{percent}%</span>
                </div>
                <div className="prog-track">
                  <div className="prog-fill" style={{ width: `${percent}%` }}></div>
                </div>
                <div className="prog-sub text-muted">
                  {pool.minBatchTargetKg - pool.currentPledgedKg > 0 
                    ? `Only ${pool.minBatchTargetKg - pool.currentPledgedKg} kg more needed to trigger direct farm dispatch!` 
                    : 'Wholesale batch unlocked & harvesting scheduled!'}
                </div>
              </div>

              {/* Hub Location */}
              <div className="pool-hub-meta">
                <MapPin size={14} className="text-cyan" />
                <span>Pickup Hub: {pool.distributionHub}</span>
              </div>

              <button 
                onClick={() => setActivePledgeModal(pool)}
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '16px' }}
              >
                <ShoppingBag size={16} />
                <span>Join Pool & Pledge Quantity</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Pledge Modal */}
      {activePledgeModal && (
        <div className="modal-overlay" onClick={() => setActivePledgeModal(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Join {activePledgeModal.poolTitle}</h2>
              <p className="text-muted">Enter quantity to reserve fresh harvest directly from {activePledgeModal.producerName}</p>
            </div>

            {pledgeSuccessMsg ? (
              <div className="pledge-success-card">
                <CheckCircle2 size={36} className="text-emerald" />
                <p>{pledgeSuccessMsg}</p>
              </div>
            ) : (
              <form onSubmit={handlePledgeSubmit} style={{ marginTop: '20px' }}>
                <div className="form-group">
                  <label className="form-label">Quantity to Pledge (Kilograms)</label>
                  <input 
                    type="number" 
                    className="form-input"
                    value={pledgeKg}
                    onChange={e => setPledgeKg(Number(e.target.value))}
                    min="2"
                    max="50"
                    required
                  />
                  <span className="text-muted" style={{ fontSize: '0.78rem', marginTop: '4px', display: 'block' }}>
                    Recommended household pack: 5 kg, 10 kg, or 20 kg
                  </span>
                </div>

                <div className="pledge-calc-box">
                  <div className="calc-row">
                    <span>Rate in Pool:</span>
                    <strong>₹{activePledgeModal.unitPriceInPool}/kg</strong>
                  </div>
                  <div className="calc-row">
                    <span>Your Total Order:</span>
                    <strong className="text-cyan">₹{pledgeKg * activePledgeModal.unitPriceInPool}</strong>
                  </div>
                  <div className="calc-row">
                    <span>Retail Market Value:</span>
                    <span className="text-muted" style={{ textDecoration: 'line-through' }}>
                      ₹{pledgeKg * activePledgeModal.retailMarketPrice}
                    </span>
                  </div>
                  <div className="calc-row highlight-calc">
                    <span>Your Household Net Savings:</span>
                    <strong className="text-emerald">
                      ₹{pledgeKg * (activePledgeModal.retailMarketPrice - activePledgeModal.unitPriceInPool)} Saved!
                    </strong>
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: '16px' }}>
                  <label className="form-label">Designated Community Pickup Point</label>
                  <input 
                    type="text" 
                    className="form-input"
                    value={activePledgeModal.distributionHub}
                    disabled
                  />
                </div>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
                  <button 
                    type="button" 
                    onClick={() => setActivePledgeModal(null)} 
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Confirm Pledge ({pledgeKg} kg)
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <style>{`
        .consumer-hero-card {
          background: linear-gradient(135deg, rgba(38, 18, 56, 0.9) 0%, rgba(18, 6, 26, 0.95) 100%);
          border-left: 4px solid var(--accent-purple);
        }

        .consumer-hero-content {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .consumer-avatar {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          background: rgba(139, 92, 246, 0.15);
          border: 1px solid var(--accent-purple);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .consumer-title {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 700;
          color: #fff;
        }

        .consumer-meta {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-top: 6px;
          font-size: 0.82rem;
          flex-wrap: wrap;
        }

        .pool-info-banner {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-top: 20px;
          background: rgba(16, 40, 30, 0.6);
          border-left: 4px solid var(--accent-emerald);
        }

        .pool-info-icon {
          font-size: 1.6rem;
        }

        .pool-card {
          display: flex;
          flex-direction: column;
          border-top: 3px solid var(--accent-purple);
        }

        .pool-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .pool-timer {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.76rem;
          color: #fbbf24;
          font-weight: 600;
        }

        .pool-title {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 700;
          margin: 12px 0 4px;
        }

        .pool-producer {
          font-size: 0.8rem;
        }

        .pool-price-box {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 14px;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 10px;
          margin: 16px 0;
        }

        .p-label {
          font-size: 0.72rem;
          color: var(--text-muted);
          display: block;
        }

        .p-val {
          font-family: var(--font-heading);
          font-size: 1.3rem;
          font-weight: 800;
        }

        .p-strike {
          font-size: 0.95rem;
          text-decoration: line-through;
        }

        .pool-progress-section {
          margin-bottom: 16px;
        }

        .prog-labels {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          margin-bottom: 6px;
        }

        .prog-track {
          width: 100%;
          height: 8px;
          background: rgba(0, 0, 0, 0.4);
          border-radius: 999px;
          overflow: hidden;
        }

        .prog-fill {
          height: 100%;
          background: linear-gradient(135deg, #a855f7 0%, #06b6d4 100%);
          border-radius: 999px;
          transition: width 0.4s ease;
        }

        .prog-sub {
          font-size: 0.75rem;
          margin-top: 6px;
        }

        .pool-hub-meta {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
          color: var(--text-secondary);
          margin-top: auto;
          padding-top: 12px;
          border-top: 1px solid var(--border-subtle);
        }

        .pledge-calc-box {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 10px;
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 0.88rem;
        }

        .calc-row {
          display: flex;
          justify-content: space-between;
        }

        .highlight-calc {
          border-top: 1px solid var(--border-subtle);
          padding-top: 8px;
          font-size: 0.95rem;
        }

        .pledge-success-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 16px;
          padding: 24px;
          background: rgba(16, 185, 129, 0.1);
          border-radius: 12px;
          border: 1px solid var(--border-glow);
        }
      `}</style>
    </div>
  );
}
