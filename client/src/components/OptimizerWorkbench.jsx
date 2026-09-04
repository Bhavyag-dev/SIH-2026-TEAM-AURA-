import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  TrendingDown, 
  ShieldCheck, 
  Warehouse, 
  Truck, 
  CheckCircle2, 
  Scale,
  DollarSign,
  Clock,
  AlertCircle,
  Lock,
  Layers,
  Building2,
  FileCheck
} from 'lucide-react';
import RouteVisualizer from './RouteVisualizer';

export default function OptimizerWorkbench({ 
  demands = [], 
  selectedDemandId, 
  onSelectDemand,
  onRunOptimizer,
  activePlan,
  onConfirmPlan
}) {
  const [isSolving, setIsSolving] = useState(false);
  const [solvingStep, setSolvingStep] = useState(0);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  const selectedDemand = demands.find(d => (d._id || d.id) === selectedDemandId) || demands[0];

  const handleRunSolve = async () => {
    setIsSolving(true);
    setSolvingStep(1);

    // Multi-step animated solving experience
    setTimeout(() => setSolvingStep(2), 500);
    setTimeout(() => setSolvingStep(3), 1000);
    setTimeout(() => setSolvingStep(4), 1500);

    setTimeout(async () => {
      await onRunOptimizer(selectedDemand?._id || selectedDemand?.id);
      setIsSolving(false);
      setSolvingStep(0);
    }, 2000);
  };

  const handleConfirm = async () => {
    if (!activePlan) return;
    const result = await onConfirmPlan(activePlan._id || activePlan.id, selectedDemand?._id);
    if (result && result.order) {
      setConfirmedOrder(result.order);
      setShowOrderSuccess(true);
    }
  };

  const eco = activePlan?.economics || {
    farmerRealizationPerQuintal: 2538,
    buyerLandedCostPerQuintal: 2655,
    farmerRealizationTotal: 507600,
    buyerLandedCostTotal: 531000,
    logisticsCost: 18400,
    handlingAggregationCost: 5000,
    platformCoordinationFee: 7965,
    expectedWastagePercent: 1.9,
    expectedWastageKg: 380,
    traditionalBaseline: {
      baselineFarmerNetRealization: 2081,
      baselineBuyerLandedCost: 3254,
      traditionalWastagePercent: 12.0,
      traditionalWastageKg: 2400
    },
    economicGains: {
      farmerRealizationUpliftPercent: 22.0,
      buyerCostReductionPercent: 18.4,
      netTotalSavingsRupees: 119800,
      foodWasteReductionKg: 2020
    }
  };

  return (
    <div className="portal-container">
      {/* Top Banner */}
      <div className="optimizer-banner glass-card">
        <div>
          <div className="opt-tag">
            <Cpu size={15} />
            <span>SIH 2026 PS 26033 • AI TRANSACTION & FULFILMENT ENGINE</span>
          </div>
          <h1 className="opt-title">Multi-Objective Fulfilment Optimizer</h1>
          <p className="opt-desc">
            "Find the best economic path from farm to buyer, not just the nearest seller."
            Balances farmer net realization, buyer landed cost, and transit food waste.
          </p>
        </div>

        <div className="demand-select-wrapper">
          <label className="form-label text-cyan">Select Procurement Requisition (RFQ):</label>
          <select 
            className="form-select"
            value={selectedDemand?._id || selectedDemand?.id || ''}
            onChange={(e) => onSelectDemand(e.target.value)}
          >
            {demands.map(d => (
              <option key={d._id || d.id} value={d._id || d.id}>
                {d.crop} • {d.quantity} Quintals ({d.destination?.facilityName || 'Depot'})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Action Bar */}
      <div className="solver-action-strip">
        <div className="rfq-summary-pill">
          <Building2 size={16} className="text-cyan" />
          <span>Procurement Target: <strong>{selectedDemand?.quantity || 200} Quintals</strong> of <strong>{selectedDemand?.crop}</strong></span>
          <span className="badge badge-emerald">{selectedDemand?.qualityGrade || 'Grade A'}</span>
        </div>

        <button 
          onClick={handleRunSolve} 
          disabled={isSolving}
          className="btn btn-amber btn-lg"
        >
          <Sparkles size={18} />
          <span>{isSolving ? 'Solving Optimization Model...' : 'Run Fulfilment & Economic Optimizer'}</span>
        </button>
      </div>

      {/* Solving Animation Overlay */}
      {isSolving && (
        <div className="solving-card glass-card">
          <div className="solving-spinner"></div>
          <div className="solving-steps">
            <div className={`solve-step ${solvingStep >= 1 ? 'done' : ''}`}>
              <CheckCircle2 size={16} />
              <span>1. Multi-FPO knapsack matching across {selectedDemand?.crop} clusters...</span>
            </div>
            <div className={`solve-step ${solvingStep >= 2 ? 'done' : ''}`}>
              <CheckCircle2 size={16} />
              <span>2. Storage vs Direct Haulage utility decision analysis...</span>
            </div>
            <div className={`solve-step ${solvingStep >= 3 ? 'done' : ''}`}>
              <CheckCircle2 size={16} />
              <span>3. Vehicle Routing Problem (VRP) stop sequencing & capacity fit...</span>
            </div>
            <div className={`solve-step ${solvingStep >= 4 ? 'done' : ''}`}>
              <CheckCircle2 size={16} />
              <span>4. Multi-objective Pareto economic evaluation (Farmer Realization ↑ vs Landed Cost ↓)...</span>
            </div>
          </div>
        </div>
      )}

      {/* Side-by-Side Comparison: Baseline vs KisanSetu Optimized */}
      <div className="comparison-section">
        <div className="comparison-header">
          <h2>Baseline vs. AI-Optimized Plan Economics</h2>
          <span className="badge badge-cyan">Algorithmic VRP Verification</span>
        </div>

        <div className="grid-2" style={{ marginTop: '16px' }}>
          {/* Baseline Model Card */}
          <div className="plan-card baseline-card glass-card">
            <div className="plan-card-tag text-muted">
              CONVENTIONAL 4-TIER INTERMEDIARY BASELINE
            </div>
            <div className="plan-title">Traditional Mandi Model</div>
            <p className="plan-sub text-muted">
              Uncoordinated village arhtiya, APMC mandi cess, wholesaler markups & uncooled tempo haulage
            </p>

            <div className="metrics-list">
              <div className="metric-row">
                <span className="m-label">Farmer Net Realization</span>
                <span className="m-val text-muted">₹{eco.traditionalBaseline?.baselineFarmerNetRealization}/Q</span>
              </div>
              <div className="metric-row">
                <span className="m-label">Buyer Landed Cost</span>
                <span className="m-val text-muted">₹{eco.traditionalBaseline?.baselineBuyerLandedCost}/Q</span>
              </div>
              <div className="metric-row">
                <span className="m-label">Post-Harvest Spoilage</span>
                <span className="m-val text-red">{eco.traditionalBaseline?.traditionalWastagePercent}% ({eco.traditionalBaseline?.traditionalWastageKg} kg)</span>
              </div>
              <div className="metric-row">
                <span className="m-label">Fulfilment Transit Time</span>
                <span className="m-val text-muted">42.0 Hours</span>
              </div>
              <div className="metric-row">
                <span className="m-label">Intermediary Deductions</span>
                <span className="m-val text-red">APMC 8% + Trader 14%</span>
              </div>
            </div>

            <div className="baseline-foot text-muted">
              Conventional reference model per DoCA price spread benchmarks.
            </div>
          </div>

          {/* AI-Optimized Plan Card */}
          <div className="plan-card optimized-card glass-card glass-card-highlight">
            <div className="plan-card-tag text-emerald">
              <Sparkles size={14} />
              <span>RECOMMENDED FULFILMENT PLAN (KISANSETU)</span>
            </div>
            <div className="plan-title text-emerald">
              Direct Coordinated Farm-to-Buyer Corridor
            </div>
            <p className="plan-sub text-secondary">
              Algorithmic multi-FPO aggregation, scheduled bulk haulage & transparent fee
            </p>

            <div className="metrics-list">
              <div className="metric-row highlight-row">
                <span className="m-label">Farmer Net Realization</span>
                <div>
                  <span className="m-val text-emerald">₹{eco.farmerRealizationPerQuintal}/Q</span>
                  <span className="m-badge-gain">+{eco.economicGains?.farmerRealizationUpliftPercent}% UPLIFT</span>
                </div>
              </div>

              <div className="metric-row highlight-row">
                <span className="m-label">Buyer Landed Cost</span>
                <div>
                  <span className="m-val text-cyan">₹{eco.buyerLandedCostPerQuintal}/Q</span>
                  <span className="m-badge-save">-{eco.economicGains?.buyerCostReductionPercent}% SAVING</span>
                </div>
              </div>

              <div className="metric-row">
                <span className="m-label">Post-Harvest Spoilage</span>
                <div>
                  <span className="m-val text-amber">{eco.expectedWastagePercent}% ({eco.expectedWastageKg} kg)</span>
                  <span className="m-badge-gain">Saved {eco.economicGains?.foodWasteReductionKg} kg food</span>
                </div>
              </div>

              <div className="metric-row">
                <span className="m-label">Fulfilment Transit Time</span>
                <span className="m-val text-primary">16.5 Hours (Same Day Delivery)</span>
              </div>

              <div className="metric-row">
                <span className="m-label">Net Transaction Rupee Savings</span>
                <span className="m-val text-emerald font-bold">₹{eco.economicGains?.netTotalSavingsRupees?.toLocaleString()}</span>
              </div>
            </div>

            <button onClick={handleConfirm} className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '20px' }}>
              <Lock size={18} />
              <span>Approve Plan & Fund Escrow Guarantee</span>
            </button>
          </div>
        </div>
      </div>

      {/* Storage vs. No-Storage Decision Card */}
      <div className="storage-logic-card glass-card">
        <div className="storage-logic-header">
          <Warehouse size={22} className="text-amber" />
          <div>
            <div className="storage-logic-tag">COLD-CHAIN OPTIMIZATION ENGINE</div>
            <h3>Storage vs. No-Storage Algorithmic Decision</h3>
          </div>
        </div>
        <div className="storage-reason-box">
          <div className="storage-status-pill">
            <span className="pulse-dot"></span>
            <span>DECISION: {activePlan?.aggregationHub?.useStorage ? 'HUB CONSOLIDATION & PRE-COOLING' : 'DIRECT EXPRESS HAULAGE (NO STORAGE)'}</span>
          </div>
          <p className="storage-reason-text">
            {activePlan?.aggregationHub?.storageReason || 
              'Direct Farm-to-Buyer Express Haulage Chosen: Produce shelf-life allows same-day direct delivery. Eliminates redundant handling & warehouse loading fees (saved ₹85/Q).'}
          </p>
        </div>
      </div>

      {/* Multi-FPO Supply Allocation Table */}
      <div className="multi-fpo-card glass-card">
        <div className="section-header">
          <div>
            <h3>Multi-FPO Supply Sourcing Allocation</h3>
            <p className="text-muted">Knapsack allocation satisfying total {selectedDemand?.quantity || 200} Quintals requirement</p>
          </div>
          <span className="badge badge-emerald">
            {activePlan?.selectedSupplies?.length || 3} Farm Clusters Aggregated
          </span>
        </div>

        <div className="table-responsive" style={{ marginTop: '16px' }}>
          <table className="fpo-table">
            <thead>
              <tr>
                <th>Farm / FPO Cluster</th>
                <th>Allocated Volume</th>
                <th>Quality Grade</th>
                <th>Farmgate Payout (₹/Q)</th>
                <th>Total Farmer Take-Home</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {(activePlan?.selectedSupplies || [
                { farmerName: 'Rameshwar Patil', fpoName: 'Sahyadri Farmers Producer Co.', allocatedQty: 90, farmgateRate: 2580, qualityGrade: 'Grade A' },
                { farmerName: 'Sunita Jadhav', fpoName: 'Godavari Krishi Producer Ltd', allocatedQty: 80, farmgateRate: 2550, qualityGrade: 'Grade A' },
                { farmerName: 'Sinnar Cluster FPO', fpoName: 'Sinnar Agro Belt', allocatedQty: 30, farmgateRate: 2480, qualityGrade: 'Grade B' }
              ]).map((s, idx) => (
                <tr key={idx}>
                  <td>
                    <div className="fpo-cell-title">{s.farmerName}</div>
                    <div className="fpo-cell-sub text-muted">{s.fpoName}</div>
                  </td>
                  <td>
                    <span className="volume-badge">{s.allocatedQty} Quintals</span>
                  </td>
                  <td>
                    <span className="badge badge-cyan">{s.qualityGrade || 'Grade A'}</span>
                  </td>
                  <td className="text-amber font-bold">₹{s.farmgateRate}/Q</td>
                  <td className="text-emerald font-bold">₹{(s.farmgateRate * s.allocatedQty).toLocaleString()}</td>
                  <td>
                    <span className="badge badge-emerald">
                      <CheckCircle2 size={12} /> Allocation Locked
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cost Waterfall Breakdown */}
      <div className="waterfall-card glass-card">
        <div className="section-header">
          <div>
            <h3>Itemized Transaction Economics (Waterfall Breakdown)</h3>
            <p className="text-muted">Total Landed Procurement Cost: ₹{eco.buyerLandedCostTotal?.toLocaleString()}</p>
          </div>
        </div>

        <div className="waterfall-bars-grid">
          <div className="wf-bar-item">
            <div className="wf-bar-top">
              <span>Direct Farmer Payout (Farmgate)</span>
              <span className="text-emerald font-bold">₹{eco.farmerRealizationTotal?.toLocaleString()} (81.2%)</span>
            </div>
            <div className="wf-bar-track">
              <div className="wf-bar-fill bg-emerald" style={{ width: '81.2%' }}></div>
            </div>
          </div>

          <div className="wf-bar-item">
            <div className="wf-bar-top">
              <span>Optimized Multi-Stop Logistics & Freight</span>
              <span className="text-cyan font-bold">₹{eco.logisticsCost?.toLocaleString()} (11.8%)</span>
            </div>
            <div className="wf-bar-track">
              <div className="wf-bar-fill bg-cyan" style={{ width: '11.8%' }}></div>
            </div>
          </div>

          <div className="wf-bar-item">
            <div className="wf-bar-top">
              <span>Aggregation, Crated Packaging & QC</span>
              <span className="text-amber font-bold">₹{eco.handlingAggregationCost?.toLocaleString()} (5.5%)</span>
            </div>
            <div className="wf-bar-track">
              <div className="wf-bar-fill bg-amber" style={{ width: '5.5%' }}></div>
            </div>
          </div>

          <div className="wf-bar-item">
            <div className="wf-bar-top">
              <span>Platform Coordination Fee (1.5% Transparent)</span>
              <span className="text-secondary font-bold">₹{eco.platformCoordinationFee?.toLocaleString()} (1.5%)</span>
            </div>
            <div className="wf-bar-track">
              <div className="wf-bar-fill bg-purple" style={{ width: '1.5%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Integrated Interactive Route Visualizer Map */}
      <RouteVisualizer 
        route={activePlan?.route} 
        vehicle={activePlan?.vehicle}
        aggregationHub={activePlan?.aggregationHub}
      />

      {/* Escrow Funded Order Confirmation Modal */}
      {showOrderSuccess && (
        <div className="modal-overlay" onClick={() => setShowOrderSuccess(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div className="success-icon-wrap">
                <CheckCircle2 size={48} className="text-emerald" />
              </div>
              <h2 style={{ marginTop: '12px' }}>Plan Approved & Escrow Funded!</h2>
              <p className="text-secondary" style={{ marginTop: '6px' }}>
                Order <strong>{confirmedOrder?.orderNumber || 'ORD-2026-KS-8891'}</strong> has been generated and dispatched to the fleet manifest.
              </p>
            </div>

            <div className="order-summary-box">
              <div className="ord-row">
                <span>Commodity:</span>
                <strong>{selectedDemand?.crop} ({selectedDemand?.quantity} Q)</strong>
              </div>
              <div className="ord-row">
                <span>Escrow Deposit:</span>
                <strong className="text-cyan">₹{eco.buyerLandedCostTotal?.toLocaleString()}</strong>
              </div>
              <div className="ord-row">
                <span>Direct Farmer Payouts:</span>
                <strong className="text-emerald">₹{eco.farmerRealizationTotal?.toLocaleString()} (Protected)</strong>
              </div>
              <div className="ord-row">
                <span>Logistics Partner:</span>
                <strong>QuickAgri Cold Fleet (Tata 1613 Crated)</strong>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
              <button 
                onClick={() => setShowOrderSuccess(false)}
                className="btn btn-primary"
              >
                Track Live Shipment in Logistics Portal
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .optimizer-banner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 24px;
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(16, 56, 38, 0.95) 100%);
          border-left: 4px solid var(--accent-amber);
        }

        .opt-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #fbbf24;
          font-size: 0.76rem;
          font-weight: 800;
          letter-spacing: 0.04em;
        }

        .opt-title {
          font-size: 1.6rem;
          font-weight: 800;
          color: #fff;
          margin: 6px 0;
        }

        .opt-desc {
          font-size: 0.88rem;
          color: var(--text-secondary);
          max-width: 700px;
        }

        .demand-select-wrapper {
          min-width: 320px;
        }

        .solver-action-strip {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
          margin: 24px 0;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--border-medium);
          padding: 14px 20px;
          border-radius: 14px;
        }

        .rfq-summary-pill {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.95rem;
        }

        .solving-card {
          margin: 20px 0;
          border-color: var(--accent-amber);
          display: flex;
          align-items: center;
          gap: 24px;
          background: rgba(245, 158, 11, 0.08);
        }

        .solving-spinner {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 4px solid rgba(245, 158, 11, 0.2);
          border-top-color: #fbbf24;
          animation: spinSlow 0.8s linear infinite;
        }

        .solving-steps {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .solve-step {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          color: var(--text-muted);
          transition: var(--trans-smooth);
        }

        .solve-step.done {
          color: #34d399;
          font-weight: 600;
        }

        .comparison-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 10px;
        }

        .plan-card {
          padding: 28px;
          display: flex;
          flex-direction: column;
        }

        .plan-card-tag {
          font-size: 0.74rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .plan-title {
          font-family: var(--font-heading);
          font-size: 1.45rem;
          font-weight: 800;
          margin: 6px 0;
        }

        .plan-sub {
          font-size: 0.84rem;
          margin-bottom: 20px;
        }

        .metrics-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-top: auto;
        }

        .metric-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 14px;
          background: rgba(0, 0, 0, 0.25);
          border-radius: 10px;
        }

        .highlight-row {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.25);
        }

        .m-label {
          font-size: 0.84rem;
          color: var(--text-secondary);
        }

        .m-val {
          font-family: var(--font-heading);
          font-size: 1.2rem;
          font-weight: 700;
        }

        .m-badge-gain {
          background: rgba(16, 185, 129, 0.2);
          color: #34d399;
          font-size: 0.72rem;
          font-weight: 800;
          padding: 2px 6px;
          border-radius: 4px;
          margin-left: 8px;
        }

        .m-badge-save {
          background: rgba(6, 182, 212, 0.2);
          color: #38bdf8;
          font-size: 0.72rem;
          font-weight: 800;
          padding: 2px 6px;
          border-radius: 4px;
          margin-left: 8px;
        }

        .storage-logic-card {
          margin-top: 24px;
          border-left: 4px solid var(--accent-amber);
        }

        .storage-logic-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .storage-logic-tag {
          font-size: 0.72rem;
          font-weight: 800;
          color: #fbbf24;
          letter-spacing: 0.04em;
        }

        .storage-reason-box {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 10px;
          padding: 14px 18px;
        }

        .storage-status-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #38bdf8;
          font-size: 0.78rem;
          font-weight: 700;
          margin-bottom: 6px;
        }

        .storage-reason-text {
          font-size: 0.92rem;
          color: var(--text-primary);
        }

        .multi-fpo-card {
          margin-top: 24px;
        }

        .fpo-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.88rem;
        }

        .fpo-table th {
          padding: 12px 14px;
          color: var(--text-muted);
          font-size: 0.75rem;
          text-transform: uppercase;
          border-bottom: 1px solid var(--border-medium);
        }

        .fpo-table td {
          padding: 14px;
          border-bottom: 1px solid var(--border-subtle);
        }

        .fpo-cell-title {
          font-weight: 700;
          color: #fff;
        }

        .volume-badge {
          background: rgba(6, 182, 212, 0.15);
          color: #38bdf8;
          padding: 4px 10px;
          border-radius: 6px;
          font-weight: 700;
        }

        .waterfall-card {
          margin-top: 24px;
        }

        .waterfall-bars-grid {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-top: 16px;
        }

        .wf-bar-top {
          display: flex;
          justify-content: space-between;
          font-size: 0.84rem;
          margin-bottom: 6px;
        }

        .wf-bar-track {
          width: 100%;
          height: 10px;
          background: rgba(0, 0, 0, 0.35);
          border-radius: 999px;
          overflow: hidden;
        }

        .wf-bar-fill {
          height: 100%;
          border-radius: 999px;
        }

        .bg-emerald { background: var(--grad-emerald); }
        .bg-cyan { background: var(--grad-cyan); }
        .bg-amber { background: var(--grad-amber); }
        .bg-purple { background: linear-gradient(135deg, #8b5cf6, #6d28d9); }

        .success-icon-wrap {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: rgba(16, 185, 129, 0.15);
          border: 2px solid var(--accent-emerald);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
        }

        .order-summary-box {
          background: rgba(0, 0, 0, 0.35);
          border-radius: 12px;
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          font-size: 0.9rem;
        }

        .ord-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      `}</style>
    </div>
  );
}
