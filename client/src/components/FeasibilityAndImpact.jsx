import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  TrendingUp, 
  TrendingDown, 
  ShieldCheck, 
  Scale, 
  Layers, 
  AlertTriangle, 
  Zap, 
  BookOpen, 
  Award, 
  Users,
  Truck,
  Leaf
} from 'lucide-react';

export default function FeasibilityAndImpact() {
  const [activeSubTab, setActiveSubTab] = useState('challenges');

  const challenges = [
    {
      num: 1,
      title: 'Fragmented Supply',
      challenge: 'Small, scattered quantities across smallholder farmers.',
      solution: 'Aggregate nearby farmers into bulk batches through certified FPOs.',
      color: 'emerald'
    },
    {
      num: 2,
      title: 'Demand Uncertainty',
      challenge: 'Demand fluctuates rapidly by regional season and mandi timing.',
      solution: 'Forecast demand using past transaction velocity and Agmarknet mandi trends.',
      color: 'sky'
    },
    {
      num: 3,
      title: 'Quality Variation',
      challenge: 'Produce quality differs widely across independent farm lots.',
      solution: 'Standardize with Grade A/B/C specifications and basic collection point verification.',
      color: 'amber'
    },
    {
      num: 4,
      title: 'High Logistics Cost',
      challenge: 'Small individual loads multiply haulage and fuel expenses.',
      solution: 'Combine compatible multi-farm loads and optimize VRP pickup routes.',
      color: 'purple'
    },
    {
      num: 5,
      title: 'Storage Decisions',
      challenge: 'Unnecessary cold storage dramatically inflates holding fees.',
      solution: 'Evaluate storage utility index: use storage only when economically beneficial.',
      color: 'emerald'
    },
    {
      num: 6,
      title: 'Buyer Cancellation',
      challenge: 'Late order cancellations cause severe transit perishability losses.',
      solution: 'Escrow security deposits, transparent tiered cancellation penalties, and automatic re-matching.',
      color: 'sky'
    },
    {
      num: 7,
      title: 'Farmer / Buyer Trust',
      challenge: 'Unknown counter-parties create credit and payment default risk.',
      solution: 'DoCA participant verification, escrow guarantees, and auditable price breakdown.',
      color: 'amber'
    },
    {
      num: 8,
      title: 'Supply or Vehicle Failure',
      challenge: 'Supplier harvest delays or vehicle breakdown jeopardize deadlines.',
      solution: 'Dynamic contingency buffer, alternative FPO substitution, and automated re-routing.',
      color: 'purple'
    }
  ];

  return (
    <div className="portal-container">
      {/* Team Aura Header Banner */}
      <div className="team-aura-hero-card glass-card">
        <div className="aura-badge-strip">
          <span className="badge badge-emerald">SMART INDIA HACKATHON 2026 • PS ID: SIH 26033</span>
          <span className="badge badge-amber">TEAM ID: 92 • TEAM AURA</span>
        </div>
        <h1 className="aura-main-title">KrishiRoute: Proposed Solution & Feasibility</h1>
        <p className="aura-sub-title">
          "Multiple Intermediaries reduce farmers' earnings and increase consumer prices."
          Team Aura's multi-objective coordination platform bridges farmgate supply directly with institutional & consumer demand.
        </p>

        {/* Team Members Strip (Slide 1) */}
        <div className="team-members-bar">
          <div className="team-mem-tag">
            <Users size={15} />
            <span>Team Members:</span>
          </div>
          <div className="members-pills-list">
            <span className="mem-pill">Bhavya Goyal</span>
            <span className="mem-pill">Vishwas Saxena</span>
            <span className="mem-pill">Anmol Singh</span>
            <span className="mem-pill">Khushi</span>
            <span className="mem-pill">Devansh</span>
            <span className="mem-pill">Yashwi</span>
          </div>
        </div>
      </div>

      {/* Sub Navigation */}
      <div className="sub-nav-tabs">
        <button 
          onClick={() => setActiveSubTab('flowchart')} 
          className={`tab-btn ${activeSubTab === 'flowchart' ? 'active' : ''}`}
        >
          System Flowchart (Slide 2)
        </button>
        <button 
          onClick={() => setActiveSubTab('challenges')} 
          className={`tab-btn ${activeSubTab === 'challenges' ? 'active' : ''}`}
        >
          8 Challenges & Solutions (Slide 4)
        </button>
        <button 
          onClick={() => setActiveSubTab('benefits')} 
          className={`tab-btn ${activeSubTab === 'benefits' ? 'active' : ''}`}
        >
          Sustainable Benefits & Pilot (Slide 5)
        </button>
        <button 
          onClick={() => setActiveSubTab('research')} 
          className={`tab-btn ${activeSubTab === 'research' ? 'active' : ''}`}
        >
          Research & References (Slide 6)
        </button>
      </div>

      {/* Tab 1: System Flowchart (Slide 2) */}
      {activeSubTab === 'flowchart' && (
        <div className="glass-card flowchart-container" style={{ marginTop: '20px' }}>
          <div className="section-header">
            <div>
              <h3>KrishiRoute System Architecture Flowchart (Slide 2)</h3>
              <p className="text-muted">How fragmented farm supply is orchestrated into optimal delivery outcomes</p>
            </div>
          </div>

          <div className="flowchart-visual">
            <div className="flow-node node-input">
              <div className="node-icon">📦</div>
              <div className="node-title">Input Data</div>
              <div className="node-sub">Fragmented Supply + Real Buyer Demand</div>
            </div>

            <div className="flow-arrow">➔</div>

            <div className="flow-node node-engine">
              <div className="node-icon">⚡</div>
              <div className="node-title">KrishiRoute Engine</div>
              <div className="node-sub">OR-Tools & VRP Optimization</div>
            </div>

            <div className="flow-arrow">➔</div>

            <div className="flow-branches-col">
              <div className="branch-item branch-supply">
                <strong>Best Supply:</strong> Selects suitable FPO clusters
              </div>
              <div className="branch-item branch-route">
                <strong>Best Route:</strong> Multi-stop collection corridor
              </div>
              <div className="branch-item branch-storage">
                <strong>Best Storage:</strong> Uses cold hubs only if beneficial
              </div>
            </div>

            <div className="flow-arrow">➔</div>

            <div className="flow-node node-outcome">
              <div className="node-icon">🏆</div>
              <div className="node-title">System Outcomes</div>
              <div className="node-sub">Lower Cost + Less Spoilage</div>
              <div className="node-pills">
                <span className="p-up">Farmer Earnings ↑</span>
                <span className="p-down">Buyer Price ↓</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: 8 Challenges and Solutions (Slide 4) */}
      {activeSubTab === 'challenges' && (
        <div style={{ marginTop: '20px' }}>
          <div className="section-header">
            <div>
              <h3>Challenges and Proven Solutions (Slide 4 Feasibility)</h3>
              <p className="text-muted">Addressing real-world agricultural logistics hurdles with robust algorithmic safeguards</p>
            </div>
          </div>

          <div className="grid-4" style={{ marginTop: '16px' }}>
            {challenges.map((c) => (
              <div key={c.num} className="glass-card challenge-box">
                <div className="c-num-badge">{c.num}</div>
                <h4 className="c-title">{c.title}</h4>
                <div className="c-challenge">
                  <strong>Challenge:</strong> {c.challenge}
                </div>
                <div className="c-solution">
                  <strong>Solution:</strong> {c.solution}
                </div>
              </div>
            ))}
          </div>

          {/* 3 Pillars of Feasibility */}
          <div className="grid-3" style={{ marginTop: '24px' }}>
            <div className="glass-card feat-box">
              <h4 className="text-green">Technical Feasibility</h4>
              <ul className="feat-list">
                <li>React JS / PWA for low-friction mobile access</li>
                <li>Node.js + Express + MongoDB data layer</li>
                <li>OR-Tools VRP route and knapsack solver</li>
                <li>Maps API for travel time and distance matrix</li>
              </ul>
            </div>

            <div className="glass-card feat-box">
              <h4 className="text-cyan">Operational Feasibility</h4>
              <ul className="feat-list">
                <li>Uses existing FPOs, transporters, and warehouses</li>
                <li>Platform coordinates fulfilment; partners handle physical movements</li>
                <li>Hides operational complexity behind mobile interface</li>
              </ul>
            </div>

            <div className="glass-card feat-box">
              <h4 className="text-amber">Economic Feasibility</h4>
              <ul className="feat-list">
                <li>Zero capital asset ownership (no fleet/hub acquisition)</li>
                <li>Transparent transaction-based coordination fee (1.5%)</li>
                <li>Financially attractive for farmers and buyers from Day 1</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Sustainable Benefits Flow (Slide 5) */}
      {activeSubTab === 'benefits' && (
        <div style={{ marginTop: '20px' }}>
          <div className="glass-card">
            <div className="section-header">
              <div>
                <h3>Sustainable Benefits Flow Infographic (Slide 5)</h3>
                <p className="text-muted">Direct correlation between coordinated aggregation and economic uplift</p>
              </div>
            </div>

            <div className="benefits-infographic-strip">
              <div className="benefit-step">
                <div className="b-icon bg-green">👨‍🌾</div>
                <div className="b-text">
                  <strong>Farmer Realization ↑</strong>
                  <span>+18% to +22% take-home</span>
                </div>
              </div>
              <div className="b-arrow">➔</div>

              <div className="benefit-step">
                <div className="b-icon bg-cyan">🏢</div>
                <div className="b-text">
                  <strong>Buyer Landed Price ↓</strong>
                  <span>12% to 18% savings</span>
                </div>
              </div>
              <div className="b-arrow">➔</div>

              <div className="benefit-step">
                <div className="b-icon bg-amber">🗑️</div>
                <div className="b-text">
                  <strong>Transit Waste ↓</strong>
                  <span>75% spoilage avoided</span>
                </div>
              </div>
              <div className="b-arrow">➔</div>

              <div className="benefit-step">
                <div className="b-icon bg-purple">🚚</div>
                <div className="b-text">
                  <strong>Logistics Efficiency ↑</strong>
                  <span>Higher vehicle fill rate</span>
                </div>
              </div>
            </div>

            {/* Exact 10T Wheat Jaipur Case Study from Slide 5 */}
            <div className="case-study-card" style={{ marginTop: '24px' }}>
              <div className="case-header">
                <Award size={20} className="text-amber" />
                <h4>Slide 5 Pilot Experiment: 10T Wheat | Jaipur Corridor</h4>
              </div>

              <div className="grid-2" style={{ marginTop: '16px' }}>
                <div className="comp-panel baseline-panel">
                  <div className="panel-tag">CONVENTIONAL BASELINE</div>
                  <div className="panel-row">
                    <span>Farmer Realization:</span>
                    <strong>₹2,050/Q (₹20.5/kg)</strong>
                  </div>
                  <div className="panel-row">
                    <span>Buyer Landed Cost:</span>
                    <strong>₹2,820/Q (₹28.2/kg)</strong>
                  </div>
                  <div className="panel-row">
                    <span>Logistics & Handling:</span>
                    <strong>₹480/Q (Fragmented tempos)</strong>
                  </div>
                  <div className="panel-row text-red">
                    <span>Intermediary Cut:</span>
                    <strong>₹290/Q (Mandi fees & brokers)</strong>
                  </div>
                </div>

                <div className="comp-panel krishiroute-panel">
                  <div className="panel-tag text-green">KRISHIROUTE OPTIMIZED</div>
                  <div className="panel-row">
                    <span>Farmer Realization:</span>
                    <strong className="text-green">₹2,450/Q (+19.5% Uplift)</strong>
                  </div>
                  <div className="panel-row">
                    <span>Buyer Landed Cost:</span>
                    <strong className="text-cyan">₹2,580/Q (-8.5% Savings)</strong>
                  </div>
                  <div className="panel-row">
                    <span>Logistics & Handling:</span>
                    <strong>₹210/Q (Consolidated Reefer)</strong>
                  </div>
                  <div className="panel-row text-green">
                    <span>Platform Coordination:</span>
                    <strong>₹36/Q (1.5% Transparent)</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Research & References (Slide 6) */}
      {activeSubTab === 'research' && (
        <div style={{ marginTop: '20px' }}>
          <div className="section-header">
            <div>
              <h3>Research and References (Slide 6)</h3>
              <p className="text-muted">Peer-reviewed literature & government data underpinning KrishiRoute's methodology</p>
            </div>
          </div>

          <div className="references-list" style={{ marginTop: '16px' }}>
            {[
              {
                num: 1,
                title: 'RBI - Supply Chain Dynamics and Food Inflation in India',
                desc: "Intermediaries and supply-chain mark-ups create a gap between farm-gate and retail prices. The study found farmers' share of consumer rupee varies substantially across food products."
              },
              {
                num: 2,
                title: 'e-NAM - National Agriculture Market, Government of India',
                desc: 'Validates the concept of digital agricultural marketplaces, transparent price discovery, demand-supply information and connecting farmers directly with buyers.'
              },
              {
                num: 3,
                title: 'Unveiling the Dynamics of Farmer Producer Organizations in India (2025)',
                desc: 'Supports the use of FPOs for aggregation, market access, and collective bargaining, while identifying challenges such as documentation and reliable logistics.'
              },
              {
                num: 4,
                title: 'Producer Organisations in Indian Agriculture (Empirical Evidence)',
                desc: 'Research shows producer organizations can improve market access, marketable surplus, and farmer net incomes — strong evidence for using FPOs as aggregation nodes in KrishiRoute.'
              },
              {
                num: 5,
                title: 'Transport Logistics Optimization in Perishable Agri-Chains',
                desc: 'Findings indicate that structured aggregation can reduce transportation costs by 28% and improve access to higher-demand urban terminal markets.'
              }
            ].map(r => (
              <div key={r.num} className="glass-card ref-item">
                <div className="ref-num">{r.num}</div>
                <div className="ref-body">
                  <div className="ref-title">{r.title}</div>
                  <div className="ref-desc text-secondary">{r.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`
        .team-aura-hero-card {
          background: linear-gradient(135deg, #022c22 0%, #064e3b 100%);
          color: #ffffff;
          padding: 26px 30px;
          border-radius: 18px;
        }

        .aura-badge-strip {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .aura-main-title {
          font-size: 1.8rem;
          font-weight: 800;
          color: #ffffff;
          margin: 10px 0 6px;
        }

        .aura-sub-title {
          font-size: 0.92rem;
          color: #a7f3d0;
          max-width: 900px;
          line-height: 1.4;
        }

        .team-members-bar {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-top: 18px;
          padding-top: 14px;
          border-top: 1px solid rgba(255, 255, 255, 0.15);
          flex-wrap: wrap;
        }

        .team-mem-tag {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.82rem;
          font-weight: 700;
          color: #fbbf24;
          text-transform: uppercase;
        }

        .members-pills-list {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .mem-pill {
          background: rgba(255, 255, 255, 0.12);
          padding: 3px 10px;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .sub-nav-tabs {
          display: flex;
          gap: 10px;
          margin-top: 20px;
          overflow-x: auto;
          padding-bottom: 2px;
        }

        .tab-btn {
          padding: 10px 18px;
          border-radius: 10px;
          border: 1px solid var(--border-color);
          background: var(--bg-card);
          color: var(--text-secondary);
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.86rem;
          cursor: pointer;
          transition: var(--trans-smooth);
          white-space: nowrap;
        }

        .tab-btn.active {
          background: var(--primary-green);
          color: #ffffff;
          border-color: var(--primary-green);
        }

        .flowchart-visual {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-top: 24px;
          overflow-x: auto;
          padding: 14px 0;
        }

        .flow-node {
          background: var(--bg-card-subtle);
          border: 1px solid var(--border-color);
          border-radius: 14px;
          padding: 16px;
          min-width: 170px;
          text-align: center;
        }

        .node-icon {
          font-size: 1.8rem;
          margin-bottom: 6px;
        }

        .node-title {
          font-weight: 800;
          font-size: 0.95rem;
        }

        .node-sub {
          font-size: 0.72rem;
          color: var(--text-muted);
          margin-top: 4px;
        }

        .flow-arrow {
          font-size: 1.3rem;
          color: var(--primary-green);
          font-weight: 800;
        }

        .flow-branches-col {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .branch-item {
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 0.76rem;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          white-space: nowrap;
        }
        body.theme-dark .branch-item {
          background: #081a10;
          border-color: var(--border-color);
        }

        .branch-supply { border-left: 4px solid var(--primary-green); }
        .branch-route { border-left: 4px solid var(--accent-sky); }
        .branch-storage { border-left: 4px solid var(--accent-amber); }

        .node-pills {
          display: flex;
          gap: 6px;
          margin-top: 8px;
          justify-content: center;
        }

        .p-up {
          background: #dcfce7;
          color: #15803d;
          font-size: 0.68rem;
          font-weight: 800;
          padding: 2px 6px;
          border-radius: 4px;
        }

        .p-down {
          background: #e0f2fe;
          color: #0369a1;
          font-size: 0.68rem;
          font-weight: 800;
          padding: 2px 6px;
          border-radius: 4px;
        }

        .challenge-box {
          position: relative;
          padding-top: 30px;
        }

        .c-num-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--primary-green);
          color: #fff;
          font-weight: 800;
          font-size: 0.76rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .c-title {
          font-size: 0.95rem;
          font-weight: 800;
          margin-bottom: 8px;
        }

        .c-challenge {
          font-size: 0.78rem;
          color: #64748b;
          margin-bottom: 6px;
        }

        .c-solution {
          font-size: 0.8rem;
          color: var(--text-primary);
          background: var(--bg-card-subtle);
          padding: 6px 8px;
          border-radius: 6px;
        }

        .feat-box h4 {
          margin-bottom: 12px;
        }

        .feat-list {
          padding-left: 18px;
          font-size: 0.84rem;
          color: var(--text-secondary);
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .benefits-infographic-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 20px 0;
          overflow-x: auto;
        }

        .benefit-step {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--bg-card-subtle);
          padding: 12px 18px;
          border-radius: 12px;
          border: 1px solid var(--border-color);
          white-space: nowrap;
        }

        .b-icon {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
        }

        .bg-green { background: #dcfce7; }
        .bg-cyan { background: #e0f2fe; }
        .bg-amber { background: #fef3c7; }
        .bg-purple { background: #ede9fe; }

        .b-text {
          display: flex;
          flex-direction: column;
        }

        .b-text strong {
          font-size: 0.9rem;
        }

        .b-text span {
          font-size: 0.74rem;
          color: var(--text-muted);
        }

        .b-arrow {
          font-size: 1.4rem;
          color: var(--primary-green);
          font-weight: 800;
        }

        .case-study-card {
          background: var(--bg-card-subtle);
          border: 1px solid var(--border-color);
          border-radius: 14px;
          padding: 20px;
        }

        .case-header {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .comp-panel {
          background: var(--bg-card);
          padding: 16px;
          border-radius: 10px;
          border: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .baseline-panel {
          border-left: 4px solid var(--accent-red);
        }

        .krishiroute-panel {
          border-left: 4px solid var(--primary-green);
        }

        .panel-tag {
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          margin-bottom: 4px;
        }

        .panel-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.84rem;
        }

        .references-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .ref-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 16px 20px;
        }

        .ref-num {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--primary-green);
          color: #fff;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .ref-title {
          font-weight: 700;
          font-size: 0.95rem;
          color: var(--text-primary);
        }

        .ref-desc {
          font-size: 0.82rem;
          margin-top: 4px;
          line-height: 1.4;
        }
      `}</style>
    </div>
  );
}
