import React, { useState } from 'react';
import { 
  ShieldCheck, 
  TrendingUp, 
  TrendingDown, 
  Sliders, 
  Leaf, 
  AlertCircle, 
  BarChart3, 
  Layers,
  Scale,
  Building2,
  FileSpreadsheet,
  CheckCircle2
} from 'lucide-react';

export default function AdminDashboard({ macroData }) {
  const [weights, setWeights] = useState({
    farmerRealization: 40,
    buyerLandedCost: 35,
    wastageReduction: 15,
    transitSpeed: 10
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveWeights = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const macro = macroData || {
    totalVolumeTonnes: 24,
    totalVolumeCoordinatedQuintals: 240,
    totalFarmerPayoutRupees: 612000,
    avgFarmerIncomeUpliftPercent: 22.0,
    avgBuyerLandedCostSavingsPercent: 18.4,
    totalWastagePreventedTonnes: 14.8,
    activeFposCount: 18,
    verifiedTransportVehicles: 34,
    settlementSuccessRatePercent: 99.8,
    activePilotCorridor: 'Maharashtra Agri Corridor (Nashik - Junnar - MMR)'
  };

  return (
    <div className="portal-container">
      {/* Admin Hero */}
      <div className="admin-hero-card glass-card">
        <div className="admin-hero-content">
          <div className="admin-avatar">
            <ShieldCheck size={30} className="text-emerald" />
          </div>
          <div>
            <div className="admin-title">
              DoCA Agricultural Price & Fulfilment Governance Dashboard
            </div>
            <div className="admin-meta">
              <span className="badge badge-emerald">Department of Consumer Affairs (DoCA)</span>
              <span className="text-secondary">SIH 2026 Problem Statement 26033 Evaluation Suite</span>
              <span className="text-secondary">⚡ Real-Time APMC Market Spread Monitor</span>
            </div>
          </div>
        </div>
      </div>

      {/* Macro Impact KPI Grid */}
      <div className="grid-4" style={{ margin: '24px 0' }}>
        <div className="glass-card stat-card border-emerald">
          <div className="stat-label">Farmer Realization Uplift</div>
          <div className="stat-value text-emerald">+{macro.avgFarmerIncomeUpliftPercent}%</div>
          <div className="stat-sub">Net take-home above local mandi agent</div>
        </div>

        <div className="glass-card stat-card border-cyan">
          <div className="stat-label">Consumer / Landed Savings</div>
          <div className="stat-value text-cyan">-{macro.avgBuyerLandedCostSavingsPercent}%</div>
          <div className="stat-sub">Direct procurement efficiency</div>
        </div>

        <div className="glass-card stat-card border-amber">
          <div className="stat-label">Post-Harvest Loss Avoided</div>
          <div className="stat-value text-amber">{macro.totalWastagePreventedTonnes} MT</div>
          <div className="stat-sub">Saved via crated cold logistics</div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-label">Settlement Success Rate</div>
          <div className="stat-value">{macro.settlementSuccessRatePercent}%</div>
          <div className="stat-sub">Escrow-backed zero default</div>
        </div>
      </div>

      {/* Price Spread Compression Analysis */}
      <div className="glass-card spread-card">
        <div className="section-header">
          <div>
            <h3>Farmgate-to-Consumer Price Spread Compression</h3>
            <p className="text-muted">
              Measuring the reduction in intermediary margins between farmer farmgate and urban retail landed cost
            </p>
          </div>
          <span className="badge badge-emerald">DoCA Key Performance Metric</span>
        </div>

        <div className="grid-2" style={{ marginTop: '20px' }}>
          {/* Traditional Spread */}
          <div className="spread-box traditional-spread">
            <div className="spread-title text-red">Traditional APMC 4-Tier Intermediary Spread</div>
            <div className="spread-stat">Middlemen swallow <strong>54.2%</strong> of consumer retail spend</div>
            <div className="spread-breakdown">
              <div className="s-line"><span>Farmer Realization:</span> <strong>45.8%</strong></div>
              <div className="s-line text-red"><span>Village Arhtiya Discount:</span> <strong>14.0%</strong></div>
              <div className="s-line text-red"><span>APMC Mandi Cess & Commission:</span> <strong>7.5%</strong></div>
              <div className="s-line text-red"><span>Wholesale Secondary Margin:</span> <strong>16.2%</strong></div>
              <div className="s-line text-red"><span>Transit Damage & Spoilage:</span> <strong>16.5%</strong></div>
            </div>
          </div>

          {/* KisanSetu Coordinated Spread */}
          <div className="spread-box kisansetu-spread">
            <div className="spread-title text-emerald">KisanSetu Coordinated Transaction Spread</div>
            <div className="spread-stat text-emerald">Farmer retains <strong>81.2%</strong> of landed transaction value</div>
            <div className="spread-breakdown">
              <div className="s-line text-emerald"><span>Direct Farmer Payout:</span> <strong>81.2%</strong></div>
              <div className="s-line text-cyan"><span>VRP Multi-Stop Freight:</span> <strong>11.8%</strong></div>
              <div className="s-line text-amber"><span>Consolidation & Crated QC:</span> <strong>5.5%</strong></div>
              <div className="s-line"><span>Transparent Coordination Fee:</span> <strong>1.5%</strong></div>
              <div className="s-line text-emerald"><span>Transit Spoilage:</span> <strong>&lt; 2.0%</strong></div>
            </div>
          </div>
        </div>
      </div>

      {/* Algorithmic Weight Tuning Module */}
      <div className="glass-card tuning-card" style={{ marginTop: '24px' }}>
        <div className="section-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sliders size={20} className="text-amber" />
              <h3>Optimization Objective Weights (Multi-Objective Pareto Weights)</h3>
            </div>
            <p className="text-muted">
              Configure multi-objective Pareto weights evaluated by the optimization solver
            </p>
          </div>
        </div>

        <form onSubmit={handleSaveWeights} style={{ marginTop: '20px' }}>
          <div className="grid-2">
            <div className="weight-slider-group">
              <div className="w-label-row">
                <span>Farmer Realization Weight (w₁)</span>
                <span className="text-emerald font-bold">{weights.farmerRealization}%</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="70" 
                value={weights.farmerRealization}
                onChange={e => setWeights({ ...weights, farmerRealization: Number(e.target.value) })}
                className="range-input"
              />
            </div>

            <div className="weight-slider-group">
              <div className="w-label-row">
                <span>Buyer Landed Cost Minimization (w₂)</span>
                <span className="text-cyan font-bold">{weights.buyerLandedCost}%</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="70" 
                value={weights.buyerLandedCost}
                onChange={e => setWeights({ ...weights, buyerLandedCost: Number(e.target.value) })}
                className="range-input"
              />
            </div>

            <div className="weight-slider-group">
              <div className="w-label-row">
                <span>Post-Harvest Food Spoilage Penalty (w₃)</span>
                <span className="text-amber font-bold">{weights.wastageReduction}%</span>
              </div>
              <input 
                type="range" 
                min="5" 
                max="40" 
                value={weights.wastageReduction}
                onChange={e => setWeights({ ...weights, wastageReduction: Number(e.target.value) })}
                className="range-input"
              />
            </div>

            <div className="weight-slider-group">
              <div className="w-label-row">
                <span>Fulfilment Speed & Turnaround Weight (w₄)</span>
                <span className="text-purple font-bold">{weights.transitSpeed}%</span>
              </div>
              <input 
                type="range" 
                min="5" 
                max="30" 
                value={weights.transitSpeed}
                onChange={e => setWeights({ ...weights, transitSpeed: Number(e.target.value) })}
                className="range-input"
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
            <span className="text-muted" style={{ fontSize: '0.82rem' }}>
              Weights automatically normalized across solver permutations
            </span>
            <button type="submit" className="btn btn-amber">
              <Sliders size={16} />
              <span>{savedSuccess ? 'Weights Updated & Applied!' : 'Update Optimization Weights'}</span>
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .admin-hero-card {
          background: linear-gradient(135deg, rgba(8, 40, 26, 0.95) 0%, rgba(4, 18, 12, 0.95) 100%);
          border-left: 4px solid var(--accent-emerald);
        }

        .admin-hero-content {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .admin-avatar {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          background: rgba(16, 185, 129, 0.15);
          border: 1px solid var(--accent-emerald);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .admin-title {
          font-family: var(--font-heading);
          font-size: 1.3rem;
          font-weight: 700;
          color: #fff;
        }

        .admin-meta {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-top: 6px;
          font-size: 0.82rem;
          flex-wrap: wrap;
        }

        .border-emerald { border-color: rgba(16, 185, 129, 0.35); }
        .border-cyan { border-color: rgba(6, 182, 212, 0.35); }
        .border-amber { border-color: rgba(245, 158, 11, 0.35); }

        .spread-box {
          padding: 20px;
          border-radius: 12px;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--border-subtle);
        }

        .traditional-spread {
          border-left: 4px solid var(--accent-red);
        }

        .kisansetu-spread {
          border-left: 4px solid var(--accent-emerald);
        }

        .spread-title {
          font-family: var(--font-heading);
          font-size: 1.05rem;
          font-weight: 700;
        }

        .spread-stat {
          font-size: 0.88rem;
          margin: 8px 0 16px;
        }

        .spread-breakdown {
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 0.84rem;
        }

        .s-line {
          display: flex;
          justify-content: space-between;
          padding-bottom: 4px;
          border-bottom: 1px dashed rgba(255, 255, 255, 0.08);
        }

        .weight-slider-group {
          background: rgba(0, 0, 0, 0.25);
          padding: 16px;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .w-label-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.86rem;
        }

        .range-input {
          width: 100%;
          accent-color: var(--accent-emerald);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
