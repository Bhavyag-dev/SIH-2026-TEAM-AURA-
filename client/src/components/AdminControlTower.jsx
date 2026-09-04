import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Truck, 
  Building2, 
  Sprout, 
  TrendingUp, 
  TrendingDown, 
  Sliders, 
  AlertCircle, 
  BarChart3, 
  Layers, 
  Scale, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Search, 
  Filter, 
  Download, 
  RefreshCw, 
  DollarSign, 
  Thermometer, 
  Fuel, 
  Navigation,
  Eye,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Zap,
  Activity
} from 'lucide-react';

export default function AdminControlTower({ 
  orders = [], 
  supplies = [], 
  vehicles = [], 
  warehouses = [], 
  demands = [], 
  macroData = null, 
  onUpdateOrderStatus,
  onRunOptimizer 
}) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'dispatches' | 'fpos' | 'coldhubs' | 'escrow' | 'weights'
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [weights, setWeights] = useState({
    farmerRealization: 40,
    buyerLandedCost: 35,
    wastageReduction: 15,
    transitSpeed: 10
  });
  const [weightSaved, setWeightSaved] = useState(false);
  const [payoutsSimulated, setPayoutsSimulated] = useState({});

  // Fallback data if needed
  const stats = macroData || {
    totalVolumeTonnes: 24,
    totalVolumeCoordinatedQuintals: 240,
    totalFarmerPayoutRupees: 612000,
    avgFarmerIncomeUpliftPercent: 22.0,
    avgBuyerLandedCostSavingsPercent: 18.4,
    totalWastagePreventedTonnes: 14.8,
    activeFposCount: 18,
    verifiedTransportVehicles: 34,
    settlementSuccessRatePercent: 99.8,
    activePilotCorridor: 'Rajasthan & Maharashtra Agri Corridors'
  };

  // Sample or actual orders
  const displayOrders = orders.length > 0 ? orders : [
    {
      _id: 'ORD-98241',
      orderNumber: 'ORD-98241',
      crop: 'Tomato',
      variety: 'Desi Hybrid Premium',
      totalQuantityKg: 20000,
      buyerName: 'FreshBazaar Hypermarkets Pvt Ltd',
      destination: 'Jaipur Central Distribution Center',
      status: 'in_transit',
      currentMilestone: {
        step: 3,
        label: 'In Transit — Passing Tonk Cold Hub'
      },
      createdAt: new Date().toISOString(),
      truckId: 'RJ-14-GA-8921',
      driverName: 'Harish Gurjar',
      driverPhone: '+91 98290 11421',
      allocatedSuppliers: [
        { fpoName: 'Shree Krishi FPO', location: 'Chittorgarh', quantityKg: 12000, ratePerKg: 18.0 },
        { fpoName: 'GreenFields Cooperative', location: 'Tonk Cluster', quantityKg: 8000, ratePerKg: 18.5 }
      ],
      totalFarmerPayout: 364000,
      freightCost: 28400,
      platformFee: 5500,
      totalLandedCost: 397900
    },
    {
      _id: 'ORD-98242',
      orderNumber: 'ORD-98242',
      crop: 'Onion',
      variety: 'Nashik Red A-Grade',
      totalQuantityKg: 15000,
      buyerName: 'UrbanGrocers Mart',
      destination: 'Mumbai APMC Terminal',
      status: 'scheduled',
      currentMilestone: {
        step: 1,
        label: 'Dispatched from Hub, Heading to Farm'
      },
      createdAt: new Date().toISOString(),
      truckId: 'MH-15-EG-4402',
      driverName: 'Sanjay Deshmukh',
      driverPhone: '+91 94222 78310',
      allocatedSuppliers: [
        { fpoName: 'Sahyadri Kisan Producer Co', location: 'Nashik', quantityKg: 15000, ratePerKg: 24.0 }
      ],
      totalFarmerPayout: 360000,
      freightCost: 21000,
      platformFee: 4500,
      totalLandedCost: 385500
    }
  ];

  const handleStatusClick = async (orderId, newStatus, step, label) => {
    if (onUpdateOrderStatus) {
      await onUpdateOrderStatus(orderId, newStatus, step, label);
    }
  };

  const handleSimulatePayout = (fpoId) => {
    setPayoutsSimulated(prev => ({ ...prev, [fpoId]: true }));
    setTimeout(() => {
      setPayoutsSimulated(prev => ({ ...prev, [fpoId]: 'settled' }));
    }, 1200);
  };

  const handleSaveWeights = (e) => {
    e.preventDefault();
    setWeightSaved(true);
    setTimeout(() => setWeightSaved(false), 2500);
  };

  return (
    <div className="control-tower-layout">
      {/* Sidebar Navigation */}
      <aside className="tower-sidebar">
        <div className="sidebar-brand">
          <div className="tower-logo-badge">
            <ShieldCheck size={24} className="text-white" />
          </div>
          <div>
            <div className="tower-title">Control Tower</div>
            <div className="tower-subtitle">Operations & Fleet Telemetry</div>
          </div>
        </div>

        <div className="sidebar-section-title">PLATFORM MANAGEMENT</div>
        <nav className="tower-nav">
          <button 
            className={`tower-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <BarChart3 size={18} />
            <span>Overview & KPIs</span>
          </button>
          
          <button 
            className={`tower-nav-item ${activeTab === 'dispatches' ? 'active' : ''}`}
            onClick={() => setActiveTab('dispatches')}
          >
            <Truck size={18} />
            <span>Fleet & Dispatches</span>
            <span className="tower-pill-counter">{displayOrders.length}</span>
          </button>

          <button 
            className={`tower-nav-item ${activeTab === 'fpos' ? 'active' : ''}`}
            onClick={() => setActiveTab('fpos')}
          >
            <Sprout size={18} />
            <span>FPO Network</span>
            <span className="tower-pill-counter">{supplies.length || 3}</span>
          </button>

          <button 
            className={`tower-nav-item ${activeTab === 'coldhubs' ? 'active' : ''}`}
            onClick={() => setActiveTab('coldhubs')}
          >
            <Building2 size={18} />
            <span>Cold Hubs & Storage</span>
          </button>

          <button 
            className={`tower-nav-item ${activeTab === 'escrow' ? 'active' : ''}`}
            onClick={() => setActiveTab('escrow')}
          >
            <DollarSign size={18} />
            <span>Financial Escrow</span>
          </button>

          <button 
            className={`tower-nav-item ${activeTab === 'weights' ? 'active' : ''}`}
            onClick={() => setActiveTab('weights')}
          >
            <Sliders size={18} />
            <span>AI Optimizer Tuning</span>
          </button>
        </nav>

        <div className="corridor-status-box">
          <div className="c-status-header">
            <span className="pulse-dot green"></span>
            <strong>Live Corridors Active</strong>
          </div>
          <p className="c-corridor-desc">
            Chittorgarh $\rightarrow$ Tonk $\rightarrow$ Jaipur (RJ-01)<br/>
            Nashik $\rightarrow$ Junnar $\rightarrow$ Mumbai (MH-02)
          </p>
          <div className="c-metric">
            <span>Avg Spoilage Rate:</span>
            <strong className="text-emerald">&lt; 1.8%</strong>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="tower-main">
        {/* Top Control Bar */}
        <header className="tower-topbar">
          <div className="topbar-left">
            <div className="active-tag">
              <span className="pulse-indicator"></span>
              <span>KrishiRoute Engine 2.4 — Enterprise Production</span>
            </div>
            <div className="topbar-search">
              <Search size={16} className="search-icon" />
              <input 
                type="text" 
                placeholder="Search dispatches, FPOs, truck plates, destinations..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="topbar-right">
            <button className="btn-tower-secondary" onClick={() => window.location.reload()}>
              <RefreshCw size={15} />
              <span>Sync Telemetry</span>
            </button>
            <button className="btn-tower-primary" onClick={() => alert('Exporting full dispatch log and farmer escrow ledger to CSV...')}>
              <Download size={15} />
              <span>Export Reports</span>
            </button>
          </div>
        </header>

        {/* Tab 1: OVERVIEW & KPIS */}
        {activeTab === 'overview' && (
          <div className="tower-body">
            {/* Top KPI Cards */}
            <div className="kpi-banner-grid">
              <div className="kpi-tower-card border-green">
                <div className="kpi-meta">
                  <span className="kpi-title">TOTAL VOLUME COORDINATED</span>
                  <div className="kpi-badge-icon bg-green-subtle text-green"><Truck size={20} /></div>
                </div>
                <div className="kpi-num">240 <span className="kpi-unit">Quintals (24 MT)</span></div>
                <div className="kpi-trend text-emerald">
                  <TrendingUp size={14} />
                  <span>+18.4% vs APMC wholesale throughput</span>
                </div>
              </div>

              <div className="kpi-tower-card border-blue">
                <div className="kpi-meta">
                  <span className="kpi-title">NET FARMER PAYOUTS DISBURSED</span>
                  <div className="kpi-badge-icon bg-blue-subtle text-blue"><DollarSign size={20} /></div>
                </div>
                <div className="kpi-num">₹6,12,000</div>
                <div className="kpi-trend text-emerald">
                  <TrendingUp size={14} />
                  <span>+22.0% above village arhtiya middlemen</span>
                </div>
              </div>

              <div className="kpi-tower-card border-amber">
                <div className="kpi-meta">
                  <span className="kpi-title">POST-HARVEST LOSS AVOIDED</span>
                  <div className="kpi-badge-icon bg-amber-subtle text-amber"><Sprout size={20} /></div>
                </div>
                <div className="kpi-num">14.8 <span className="kpi-unit">Metric Tonnes</span></div>
                <div className="kpi-trend text-amber">
                  <span>Saved through micro-hub pre-cooling & crating</span>
                </div>
              </div>

              <div className="kpi-tower-card border-purple">
                <div className="kpi-meta">
                  <span className="kpi-title">BUYER LANDED COST SAVINGS</span>
                  <div className="kpi-badge-icon bg-purple-subtle text-purple"><TrendingDown size={20} /></div>
                </div>
                <div className="kpi-num">18.4% <span className="kpi-unit">Net Savings</span></div>
                <div className="kpi-trend text-cyan">
                  <span>₹4.20/kg lower than multi-tier wholesale</span>
                </div>
              </div>
            </div>

            {/* Farmgate to Consumer Spread Card */}
            <div className="tower-card spread-analytics-card">
              <div className="card-header-flex">
                <div>
                  <h3 className="section-title">Farmgate-to-Retail Price Spread Compression</h3>
                  <p className="section-subtitle">
                    Real-time comparison of traditional 4-tier wholesale margins vs KrishiRoute transparent coordination
                  </p>
                </div>
                <span className="status-badge-verified">Core Economic Waterfall</span>
              </div>

              <div className="spread-comparison-grid">
                {/* Traditional APMC Middlemen Breakdown */}
                <div className="spread-panel traditional">
                  <div className="spread-panel-title text-red">
                    <span>Traditional 4-Tier Mandi Intermediary Model</span>
                  </div>
                  <div className="spread-big-stat">
                    Middlemen swallow <strong>54.2%</strong> of retail consumer spend
                  </div>
                  <div className="spread-bars">
                    <div className="spread-row">
                      <span>Farmer Farmgate Realization</span>
                      <strong className="text-secondary">45.8% (₹13.50/kg)</strong>
                    </div>
                    <div className="spread-row text-red">
                      <span>Village Arhtiya Discount Margin</span>
                      <strong>14.0% (₹4.20/kg)</strong>
                    </div>
                    <div className="spread-row text-red">
                      <span>APMC Mandi Cess, Hamali & Commission</span>
                      <strong>7.5% (₹2.25/kg)</strong>
                    </div>
                    <div className="spread-row text-red">
                      <span>Wholesale Secondary Trader Markup</span>
                      <strong>16.2% (₹4.85/kg)</strong>
                    </div>
                    <div className="spread-row text-red">
                      <span>Transit Spoilage & Breakage Loss</span>
                      <strong>16.5% (₹4.95/kg)</strong>
                    </div>
                  </div>
                  <div className="spread-footer-tag danger">
                    Retail Consumer Pays: ₹30.00/kg • Farmer Receives: ₹13.50/kg
                  </div>
                </div>

                {/* KrishiRoute Coordinated Model */}
                <div className="spread-panel krishiroute">
                  <div className="spread-panel-title text-emerald">
                    <span>KrishiRoute Direct VRP Coordinated Model</span>
                  </div>
                  <div className="spread-big-stat text-emerald">
                    Farmer retains <strong>81.2%</strong> of landed transaction spend
                  </div>
                  <div className="spread-bars">
                    <div className="spread-row text-emerald">
                      <span>Direct Farmer Farmgate Payout</span>
                      <strong>81.2% (₹18.40/kg)</strong>
                    </div>
                    <div className="spread-row text-cyan">
                      <span>VRP Multi-Stop Freight & Cold Transit</span>
                      <strong>11.8% (₹2.68/kg)</strong>
                    </div>
                    <div className="spread-row text-amber">
                      <span>Consolidation & Crated QC Staging</span>
                      <strong>5.5% (₹1.25/kg)</strong>
                    </div>
                    <div className="spread-row">
                      <span>Transparent Coordination Platform Fee</span>
                      <strong>1.5% (₹0.34/kg)</strong>
                    </div>
                    <div className="spread-row text-emerald">
                      <span>Transit Spoilage Loss</span>
                      <strong>&lt; 1.8% (Negligible)</strong>
                    </div>
                  </div>
                  <div className="spread-footer-tag success">
                    Landed Buyer Price: ₹22.67/kg (Saved 18.4%) • Farmer Receives: ₹18.40/kg (+36%)
                  </div>
                </div>
              </div>
            </div>

            {/* Live Dispatches Quick View */}
            <div className="tower-card" style={{ marginTop: '24px' }}>
              <div className="card-header-flex">
                <div>
                  <h3 className="section-title">Active Highway Dispatches</h3>
                  <p className="section-subtitle">Real-time GPS status and multi-FPO consolidation progress</p>
                </div>
                <button className="btn-tower-secondary" onClick={() => setActiveTab('dispatches')}>
                  <span>View All Dispatches</span>
                  <ChevronRight size={15} />
                </button>
              </div>

              <div className="table-responsive">
                <table className="tower-table">
                  <thead>
                    <tr>
                      <th>Dispatch ID</th>
                      <th>Crop & Volume</th>
                      <th>FPO Supply Route</th>
                      <th>Destination</th>
                      <th>Vehicle & Driver</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayOrders.map(order => (
                      <tr key={order._id}>
                        <td>
                          <span className="order-code">{order.orderNumber || order._id}</span>
                        </td>
                        <td>
                          <div className="font-semibold">{order.crop}</div>
                          <div className="text-secondary text-xs">{(order.totalQuantityKg / 1000).toFixed(1)} MT ({order.totalQuantityKg.toLocaleString()} kg)</div>
                        </td>
                        <td>
                          <div className="route-stops-cell">
                            {order.allocatedSuppliers && order.allocatedSuppliers.map((s, idx) => (
                              <span key={idx} className="fpo-stop-chip">
                                {s.location || s.fpoName} ({s.quantityKg ? `${s.quantityKg/1000}t` : ''})
                              </span>
                            ))}
                          </div>
                        </td>
                        <td>
                          <div className="dest-cell">
                            <MapPin size={13} className="text-emerald" />
                            <span>{order.destination}</span>
                          </div>
                        </td>
                        <td>
                          <div className="truck-cell">
                            <strong>{order.truckId}</strong>
                            <div className="text-xs text-secondary">{order.driverName}</div>
                          </div>
                        </td>
                        <td>
                          <span className={`status-pill ${order.status}`}>
                            {order.currentMilestone?.label || order.status}
                          </span>
                        </td>
                        <td>
                          <button 
                            className="btn-action-small"
                            onClick={() => { setSelectedOrder(order); setActiveTab('dispatches'); }}
                          >
                            <Eye size={13} />
                            <span>Inspect</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: FLEET & DISPATCHES */}
        {activeTab === 'dispatches' && (
          <div className="tower-body">
            <div className="section-banner">
              <div>
                <h2 className="banner-title">Fleet Dispatch & Multi-Stop Coordination</h2>
                <p className="banner-sub">
                  Oversee live vehicle routing, farm pickups, cold chain checkpoints, and delivery handoffs.
                </p>
              </div>
            </div>

            <div className="grid-dispatches-layout">
              {/* List of dispatches */}
              <div className="dispatches-list-col">
                {displayOrders.map(order => (
                  <div 
                    key={order._id}
                    className={`dispatch-card ${selectedOrder?._id === order._id ? 'selected' : ''}`}
                    onClick={() => setSelectedOrder(order)}
                  >
                    <div className="d-card-top">
                      <div className="d-order-meta">
                        <span className="d-id">{order.orderNumber || order._id}</span>
                        <span className={`status-pill ${order.status}`}>{order.status.replace('_', ' ').toUpperCase()}</span>
                      </div>
                      <div className="d-crop-amt">
                        <strong>{order.crop}</strong> • {(order.totalQuantityKg / 1000).toFixed(1)} MT
                      </div>
                    </div>

                    <div className="d-route-progress">
                      <div className="d-progress-line">
                        <div className="d-dot filled"></div>
                        <span className="d-label">Chittorgarh (12t)</span>
                      </div>
                      <div className="d-divider-line"></div>
                      <div className="d-progress-line">
                        <div className="d-dot filled"></div>
                        <span className="d-label">Tonk Cluster (8t)</span>
                      </div>
                      <div className="d-divider-line"></div>
                      <div className="d-progress-line">
                        <div className="d-dot active"></div>
                        <span className="d-label">Jaipur Hub</span>
                      </div>
                    </div>

                    <div className="d-card-bottom">
                      <div className="d-driver-info">
                        <Truck size={14} className="text-secondary" />
                        <span>{order.truckId} • {order.driverName}</span>
                      </div>
                      <div className="d-cost-total font-semibold text-emerald">
                        ₹{order.totalLandedCost?.toLocaleString() || '3,97,900'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Selected Dispatch Telemetry & Admin Controls */}
              <div className="dispatch-detail-col">
                {selectedOrder ? (
                  <div className="tower-card detail-panel">
                    <div className="detail-panel-header">
                      <div>
                        <div className="text-xs text-secondary">DISPATCH TELEMETRY</div>
                        <h3 className="detail-title">{selectedOrder.orderNumber || selectedOrder._id}</h3>
                        <div className="text-sm text-secondary">{selectedOrder.buyerName}</div>
                      </div>
                      <div className="detail-actions">
                        <span className={`status-pill ${selectedOrder.status}`}>
                          {selectedOrder.currentMilestone?.label || selectedOrder.status}
                        </span>
                      </div>
                    </div>

                    {/* Step Advance Quick Action Bar */}
                    <div className="admin-step-bar">
                      <div className="step-bar-title">OPERATIONS CONTROL: ADVANCE DISPATCH STAGE</div>
                      <div className="step-buttons-row">
                        <button 
                          className={`btn-step ${selectedOrder.currentMilestone?.step === 1 ? 'active' : ''}`}
                          onClick={() => handleStatusClick(selectedOrder._id, 'scheduled', 1, 'Dispatched from Hub, Heading to Farm')}
                        >
                          <span>1. Truck Dispatched</span>
                        </button>
                        <button 
                          className={`btn-step ${selectedOrder.currentMilestone?.step === 2 ? 'active' : ''}`}
                          onClick={() => handleStatusClick(selectedOrder._id, 'loading', 2, 'Loading Produce at Shree Krishi FPO')}
                        >
                          <span>2. Farm Loading</span>
                        </button>
                        <button 
                          className={`btn-step ${selectedOrder.currentMilestone?.step === 3 ? 'active' : ''}`}
                          onClick={() => handleStatusClick(selectedOrder._id, 'in_transit', 3, 'In Transit — Highway 79 En Route Jaipur')}
                        >
                          <span>3. Highway Transit</span>
                        </button>
                        <button 
                          className={`btn-step ${selectedOrder.currentMilestone?.step === 4 ? 'active' : ''}`}
                          onClick={() => handleStatusClick(selectedOrder._id, 'delivered', 4, 'Delivered & Buyer QC Accepted')}
                        >
                          <span>4. Delivered & Settled</span>
                        </button>
                      </div>
                    </div>

                    {/* Route Corridor Visualizer */}
                    <div className="route-map-panel">
                      <div className="panel-subhead">
                        <Navigation size={14} className="text-emerald" />
                        <span>Multi-FPO Pick-Up Corridor (Chittorgarh $\rightarrow$ Tonk $\rightarrow$ Jaipur)</span>
                      </div>

                      <div className="visual-route-strip">
                        <div className="route-box pickup">
                          <div className="rb-badge">Stop 1 (Origin)</div>
                          <div className="rb-name">Shree Krishi FPO</div>
                          <div className="rb-details">Chittorgarh, RJ • 12,000 kg</div>
                          <div className="rb-status text-emerald">✓ Loaded (07:30 AM)</div>
                        </div>

                        <div className="route-arrow-connector">
                          <ArrowRight size={20} />
                          <span>184 km</span>
                        </div>

                        <div className="route-box pickup">
                          <div className="rb-badge">Stop 2 (En Route)</div>
                          <div className="rb-name">GreenFields FPO</div>
                          <div className="rb-details">Tonk Cluster • 8,000 kg</div>
                          <div className="rb-status text-emerald">✓ Loaded (11:15 AM)</div>
                        </div>

                        <div className="route-arrow-connector">
                          <ArrowRight size={20} />
                          <span>112 km</span>
                        </div>

                        <div className="route-box destination">
                          <div className="rb-badge dest">Final Stop</div>
                          <div className="rb-name">{selectedOrder.destination}</div>
                          <div className="rb-details">20,000 kg Total</div>
                          <div className="rb-status text-cyan">ETA: 02:45 PM Today</div>
                        </div>
                      </div>
                    </div>

                    {/* Financial Escrow Breakdown */}
                    <div className="escrow-audit-table">
                      <div className="panel-subhead">
                        <DollarSign size={14} className="text-emerald" />
                        <span>Automated Settlement Waterfall</span>
                      </div>
                      <div className="escrow-rows">
                        <div className="e-row">
                          <span>Shree Krishi FPO (12,000 kg @ ₹18.00/kg):</span>
                          <strong>₹2,16,000</strong>
                        </div>
                        <div className="e-row">
                          <span>GreenFields Cooperative (8,000 kg @ ₹18.50/kg):</span>
                          <strong>₹1,48,000</strong>
                        </div>
                        <div className="e-row text-cyan">
                          <span>Total Multi-Stop Cold Freight (310 km):</span>
                          <strong>₹28,400</strong>
                        </div>
                        <div className="e-row">
                          <span>KrishiRoute Platform Fee (1.5%):</span>
                          <strong>₹5,500</strong>
                        </div>
                        <div className="e-row total-row text-emerald">
                          <span>Total Buyer Landed Cost:</span>
                          <strong>₹3,97,900 (₹19.89/kg)</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="tower-card placeholder-panel">
                    <Truck size={36} className="text-secondary mb-2" />
                    <p>Select a dispatch from the list to view telemetry and update route milestones.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: FPO NETWORK */}
        {activeTab === 'fpos' && (
          <div className="tower-body">
            <div className="section-banner">
              <div>
                <h2 className="banner-title">Registered Farmer Producer Organizations (FPOs)</h2>
                <p className="banner-sub">
                  Verified supplier clusters with certified crop varieties, geo-fenced farms, and automated bank accounts.
                </p>
              </div>
            </div>

            <div className="fpo-grid">
              <div className="tower-card fpo-card">
                <div className="fpo-header">
                  <div className="fpo-avatar">🌾</div>
                  <div>
                    <h4 className="fpo-name">Shree Krishi FPO</h4>
                    <div className="fpo-sub">Chittorgarh Cluster, Rajasthan</div>
                  </div>
                  <span className="status-badge-verified">Verified Partner</span>
                </div>
                <div className="fpo-details-list">
                  <div className="fpo-d-item">
                    <span>Member Farmers:</span>
                    <strong>420 Smallholders</strong>
                  </div>
                  <div className="fpo-d-item">
                    <span>Primary Crop:</span>
                    <strong>Tomato (Desi Hybrid Premium)</strong>
                  </div>
                  <div className="fpo-d-item">
                    <span>Current Available Lot:</span>
                    <strong>25 Metric Tonnes</strong>
                  </div>
                  <div className="fpo-d-item">
                    <span>Farmgate Asking Rate:</span>
                    <strong className="text-emerald">₹18.00 / kg</strong>
                  </div>
                  <div className="fpo-d-item">
                    <span>Escrow Account:</span>
                    <code>SBI A/C ...9841 (Direct UPI Enabled)</code>
                  </div>
                </div>
                <div className="fpo-card-actions">
                  <button 
                    className="btn-tower-primary w-full"
                    onClick={() => handleSimulatePayout('shree')}
                  >
                    {payoutsSimulated['shree'] === 'settled' 
                      ? '✓ ₹2,16,000 Settled Directly to FPO' 
                      : payoutsSimulated['shree'] 
                        ? 'Initiating Direct NEFT...' 
                        : 'Simulate Immediate Payout Release (₹2,16,000)'}
                  </button>
                </div>
              </div>

              <div className="tower-card fpo-card">
                <div className="fpo-header">
                  <div className="fpo-avatar">🌾</div>
                  <div>
                    <h4 className="fpo-name">GreenFields Cooperative</h4>
                    <div className="fpo-sub">Tonk Cluster, Rajasthan</div>
                  </div>
                  <span className="status-badge-verified">Verified Partner</span>
                </div>
                <div className="fpo-details-list">
                  <div className="fpo-d-item">
                    <span>Member Farmers:</span>
                    <strong>280 Smallholders</strong>
                  </div>
                  <div className="fpo-d-item">
                    <span>Primary Crop:</span>
                    <strong>Tomato (Grade A Red)</strong>
                  </div>
                  <div className="fpo-d-item">
                    <span>Current Available Lot:</span>
                    <strong>16 Metric Tonnes</strong>
                  </div>
                  <div className="fpo-d-item">
                    <span>Farmgate Asking Rate:</span>
                    <strong className="text-emerald">₹18.50 / kg</strong>
                  </div>
                  <div className="fpo-d-item">
                    <span>Escrow Account:</span>
                    <code>HDFC A/C ...5512 (Direct UPI Enabled)</code>
                  </div>
                </div>
                <div className="fpo-card-actions">
                  <button 
                    className="btn-tower-primary w-full"
                    onClick={() => handleSimulatePayout('greenfields')}
                  >
                    {payoutsSimulated['greenfields'] === 'settled' 
                      ? '✓ ₹1,48,000 Settled Directly to FPO' 
                      : payoutsSimulated['greenfields'] 
                        ? 'Initiating Direct NEFT...' 
                        : 'Simulate Immediate Payout Release (₹1,48,000)'}
                  </button>
                </div>
              </div>

              <div className="tower-card fpo-card">
                <div className="fpo-header">
                  <div className="fpo-avatar">🌾</div>
                  <div>
                    <h4 className="fpo-name">Kisan Pragati Producer Co</h4>
                    <div className="fpo-sub">Nashik Cluster, Maharashtra</div>
                  </div>
                  <span className="status-badge-verified">Verified Partner</span>
                </div>
                <div className="fpo-details-list">
                  <div className="fpo-d-item">
                    <span>Member Farmers:</span>
                    <strong>650 Smallholders</strong>
                  </div>
                  <div className="fpo-d-item">
                    <span>Primary Crop:</span>
                    <strong>Onion (Nashik Red Grade-A)</strong>
                  </div>
                  <div className="fpo-d-item">
                    <span>Current Available Lot:</span>
                    <strong>40 Metric Tonnes</strong>
                  </div>
                  <div className="fpo-d-item">
                    <span>Farmgate Asking Rate:</span>
                    <strong className="text-emerald">₹24.00 / kg</strong>
                  </div>
                  <div className="fpo-d-item">
                    <span>Escrow Account:</span>
                    <code>Bank of Baroda ...1190</code>
                  </div>
                </div>
                <div className="fpo-card-actions">
                  <button 
                    className="btn-tower-primary w-full"
                    onClick={() => handleSimulatePayout('nashik')}
                  >
                    {payoutsSimulated['nashik'] === 'settled' 
                      ? '✓ ₹3,60,000 Settled Directly to FPO' 
                      : payoutsSimulated['nashik'] 
                        ? 'Initiating Direct NEFT...' 
                        : 'Simulate Immediate Payout Release (₹3,60,000)'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: COLD HUBS & STORAGE */}
        {activeTab === 'coldhubs' && (
          <div className="tower-body">
            <div className="section-banner">
              <div>
                <h2 className="banner-title">Regional Pre-Cooling & Cold Micro-Hubs</h2>
                <p className="banner-sub">
                  Internet-of-Things (IoT) monitored temperature telemetry, storage capacity, and zero-break cold logistics.
                </p>
              </div>
            </div>

            <div className="grid-2">
              <div className="tower-card hub-card">
                <div className="hub-top">
                  <div>
                    <h3 className="hub-name">Tonk Agro-Cold Transit Hub</h3>
                    <div className="hub-location">Tonk-Jaipur Highway Corridor, Rajasthan</div>
                  </div>
                  <div className="temp-badge">
                    <Thermometer size={16} />
                    <span>4.8°C (Optimal)</span>
                  </div>
                </div>

                <div className="hub-stats-row">
                  <div className="hub-stat-item">
                    <span className="text-secondary text-xs">Total Capacity</span>
                    <strong>120 Metric Tonnes</strong>
                  </div>
                  <div className="hub-stat-item">
                    <span className="text-secondary text-xs">Utilized Space</span>
                    <strong className="text-cyan">58 MT (48%)</strong>
                  </div>
                  <div className="hub-stat-item">
                    <span className="text-secondary text-xs">Power Backup</span>
                    <strong className="text-emerald">Solar + Diesel Grid (100%)</strong>
                  </div>
                </div>

                <div className="hub-capacity-bar-container">
                  <div className="hub-bar-labels">
                    <span>Storage Fill Level</span>
                    <span>48% Occupied</span>
                  </div>
                  <div className="hub-bar-bg">
                    <div className="hub-bar-fill" style={{ width: '48%' }}></div>
                  </div>
                </div>

                <div className="hub-features">
                  <span className="tag">✓ Pre-cooling chambers</span>
                  <span className="tag">✓ Automated grading line</span>
                  <span className="tag">✓ Reusable plastic crate staging</span>
                </div>
              </div>

              <div className="tower-card hub-card">
                <div className="hub-top">
                  <div>
                    <h3 className="hub-name">Junnar Sub-Zero Cold Warehouse</h3>
                    <div className="hub-location">Junnar-Pune Highway, Maharashtra</div>
                  </div>
                  <div className="temp-badge">
                    <Thermometer size={16} />
                    <span>5.2°C (Optimal)</span>
                  </div>
                </div>

                <div className="hub-stats-row">
                  <div className="hub-stat-item">
                    <span className="text-secondary text-xs">Total Capacity</span>
                    <strong>200 Metric Tonnes</strong>
                  </div>
                  <div className="hub-stat-item">
                    <span className="text-secondary text-xs">Utilized Space</span>
                    <strong className="text-cyan">132 MT (66%)</strong>
                  </div>
                  <div className="hub-stat-item">
                    <span className="text-secondary text-xs">Power Backup</span>
                    <strong className="text-emerald">Solar Hybrid Grid (100%)</strong>
                  </div>
                </div>

                <div className="hub-capacity-bar-container">
                  <div className="hub-bar-labels">
                    <span>Storage Fill Level</span>
                    <span>66% Occupied</span>
                  </div>
                  <div className="hub-bar-bg">
                    <div className="hub-bar-fill" style={{ width: '66%' }}></div>
                  </div>
                </div>

                <div className="hub-features">
                  <span className="tag">✓ Ethylene scrubber</span>
                  <span className="tag">✓ Humidity control (92% RH)</span>
                  <span className="tag">✓ Reefer truck docking bays</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: FINANCIAL ESCROW & SETTLEMENTS */}
        {activeTab === 'escrow' && (
          <div className="tower-body">
            <div className="section-banner">
              <div>
                <h2 className="banner-title">Financial Escrow & Direct Farmer Settlements</h2>
                <p className="banner-sub">
                  Every order is backed by an automated escrow pool that guarantees instant payment to farmers upon digital QC sign-off.
                </p>
              </div>
            </div>

            <div className="escrow-metrics-grid">
              <div className="escrow-metric-card">
                <span className="e-m-label">TOTAL ESCROW COMMITTED</span>
                <div className="e-m-val text-emerald">₹12,85,000</div>
                <span className="e-m-sub">Secured against buyer orders</span>
              </div>
              <div className="escrow-metric-card">
                <span className="e-m-label">SETTLED IN LAST 24H</span>
                <div className="e-m-val text-cyan">₹6,12,000</div>
                <span className="e-m-sub">Direct RTGS / UPI to FPOs</span>
              </div>
              <div className="escrow-metric-card">
                <span className="e-m-label">AVERAGE PAYOUT SPEED</span>
                <div className="e-m-val text-amber">&lt; 15 Minutes</div>
                <span className="e-m-sub">vs 45-60 days at traditional mandis</span>
              </div>
            </div>

            <div className="tower-card" style={{ marginTop: '24px' }}>
              <h3 className="section-title">Settled Transactions Audit Trail</h3>
              <div className="table-responsive" style={{ marginTop: '16px' }}>
                <table className="tower-table">
                  <thead>
                    <tr>
                      <th>Ref Number</th>
                      <th>Beneficiary (FPO)</th>
                      <th>Crop Volume</th>
                      <th>Net Farmer Rate</th>
                      <th>Settlement Amount</th>
                      <th>Mode</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>TXN-881029</code></td>
                      <td>Shree Krishi FPO (Chittorgarh)</td>
                      <td>12 MT Tomato</td>
                      <td>₹18.00 / kg</td>
                      <td><strong className="text-emerald">₹2,16,000</strong></td>
                      <td>Direct RTGS</td>
                      <td><span className="status-pill delivered">✓ Settled</span></td>
                    </tr>
                    <tr>
                      <td><code>TXN-881030</code></td>
                      <td>GreenFields Cooperative (Tonk)</td>
                      <td>8 MT Tomato</td>
                      <td>₹18.50 / kg</td>
                      <td><strong className="text-emerald">₹1,48,000</strong></td>
                      <td>Direct IMPS</td>
                      <td><span className="status-pill delivered">✓ Settled</span></td>
                    </tr>
                    <tr>
                      <td><code>TXN-881031</code></td>
                      <td>Kisan Pragati FPO (Nashik)</td>
                      <td>15 MT Onion</td>
                      <td>₹24.00 / kg</td>
                      <td><strong className="text-emerald">₹3,60,000</strong></td>
                      <td>Direct RTGS</td>
                      <td><span className="status-pill delivered">✓ Settled</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 6: AI OPTIMIZER TUNING */}
        {activeTab === 'weights' && (
          <div className="tower-body">
            <div className="section-banner">
              <div>
                <h2 className="banner-title">Algorithmic Objective Weight Tuning</h2>
                <p className="banner-sub">
                  Calibrate the multi-objective Pareto solver across farmer income maximization, buyer landed savings, and spoilage reduction.
                </p>
              </div>
            </div>

            <div className="tower-card">
              <form onSubmit={handleSaveWeights}>
                <div className="grid-2">
                  <div className="slider-group-box">
                    <div className="s-label-flex">
                      <span>Farmer Farmgate Realization Weight (w₁)</span>
                      <strong className="text-emerald">{weights.farmerRealization}%</strong>
                    </div>
                    <p className="text-xs text-secondary mb-2">Prioritizes smallholder income retention and direct farmgate prices.</p>
                    <input 
                      type="range" 
                      min="10" 
                      max="70" 
                      value={weights.farmerRealization} 
                      onChange={e => setWeights({ ...weights, farmerRealization: Number(e.target.value) })}
                      className="range-slider"
                    />
                  </div>

                  <div className="slider-group-box">
                    <div className="s-label-flex">
                      <span>Buyer Landed Cost Minimization (w₂)</span>
                      <strong className="text-cyan">{weights.buyerLandedCost}%</strong>
                    </div>
                    <p className="text-xs text-secondary mb-2">Optimizes route consolidation to minimize per-kg freight expenses.</p>
                    <input 
                      type="range" 
                      min="10" 
                      max="70" 
                      value={weights.buyerLandedCost} 
                      onChange={e => setWeights({ ...weights, buyerLandedCost: Number(e.target.value) })}
                      className="range-slider"
                    />
                  </div>

                  <div className="slider-group-box">
                    <div className="s-label-flex">
                      <span>Post-Harvest Spoilage Reduction (w₃)</span>
                      <strong className="text-amber">{weights.wastageReduction}%</strong>
                    </div>
                    <p className="text-xs text-secondary mb-2">Penalizes transit legs exceeding produce shelf life and humidity limits.</p>
                    <input 
                      type="range" 
                      min="5" 
                      max="40" 
                      value={weights.wastageReduction} 
                      onChange={e => setWeights({ ...weights, wastageReduction: Number(e.target.value) })}
                      className="range-slider"
                    />
                  </div>

                  <div className="slider-group-box">
                    <div className="s-label-flex">
                      <span>Fulfilment Speed & Turnaround Weight (w₄)</span>
                      <strong className="text-purple">{weights.transitSpeed}%</strong>
                    </div>
                    <p className="text-xs text-secondary mb-2">Favors high-speed direct highway corridors over micro-consolidation delays.</p>
                    <input 
                      type="range" 
                      min="5" 
                      max="30" 
                      value={weights.transitSpeed} 
                      onChange={e => setWeights({ ...weights, transitSpeed: Number(e.target.value) })}
                      className="range-slider"
                    />
                  </div>
                </div>

                <div className="weights-action-footer">
                  <div className="text-xs text-secondary">
                    Total Weights: {weights.farmerRealization + weights.buyerLandedCost + weights.wastageReduction + weights.transitSpeed}% (Automatically normalized by solver)
                  </div>
                  <button type="submit" className="btn-tower-primary">
                    <Sliders size={16} />
                    <span>{weightSaved ? '✓ Parameters Applied to Live Corridors' : 'Apply Optimization Weights'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .control-tower-layout {
          display: flex;
          min-height: calc(100vh - 120px);
          background: var(--bg-main);
          color: var(--text-primary);
        }

        .tower-sidebar {
          width: 270px;
          min-width: 270px;
          background: var(--bg-card);
          border-right: 1px solid var(--border-color);
          padding: 24px 18px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .sidebar-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-bottom: 18px;
          border-bottom: 1px solid var(--border-color);
        }

        .tower-logo-badge {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: linear-gradient(135deg, #15803d 0%, #166534 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(21, 128, 61, 0.3);
        }

        .tower-title {
          font-family: var(--font-heading);
          font-size: 1.12rem;
          font-weight: 800;
          line-height: 1.2;
        }

        .tower-subtitle {
          font-size: 0.72rem;
          color: var(--text-secondary);
        }

        .sidebar-section-title {
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          margin-bottom: -10px;
        }

        .tower-nav {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .tower-nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 14px;
          border-radius: 9px;
          border: 1px solid transparent;
          background: transparent;
          color: var(--text-secondary);
          font-family: var(--font-heading);
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--trans-smooth);
          text-align: left;
        }

        .tower-nav-item:hover {
          background: var(--bg-card-subtle);
          color: var(--text-primary);
        }

        .tower-nav-item.active {
          background: rgba(22, 163, 74, 0.12);
          border-color: rgba(22, 163, 74, 0.3);
          color: var(--primary-green);
        }

        .tower-pill-counter {
          margin-left: auto;
          font-size: 0.7rem;
          padding: 2px 7px;
          border-radius: 20px;
          background: var(--bg-main);
          border: 1px solid var(--border-color);
          font-weight: 700;
        }

        .corridor-status-box {
          margin-top: auto;
          padding: 14px;
          border-radius: 10px;
          background: var(--bg-card-subtle);
          border: 1px solid var(--border-color);
          font-size: 0.78rem;
        }

        .c-status-header {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.82rem;
          margin-bottom: 6px;
        }

        .pulse-dot.green {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #16a34a;
          box-shadow: 0 0 8px #16a34a;
        }

        .c-corridor-desc {
          color: var(--text-secondary);
          line-height: 1.4;
          margin-bottom: 10px;
        }

        .c-metric {
          display: flex;
          justify-content: space-between;
          padding-top: 8px;
          border-top: 1px dashed var(--border-color);
        }

        .tower-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow-x: hidden;
        }

        .tower-topbar {
          padding: 16px 28px;
          border-bottom: 1px solid var(--border-color);
          background: var(--bg-card);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }

        .topbar-left {
          display: flex;
          align-items: center;
          gap: 18px;
          flex: 1;
        }

        .active-tag {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-secondary);
          background: var(--bg-card-subtle);
          padding: 6px 12px;
          border-radius: 20px;
          border: 1px solid var(--border-color);
          white-space: nowrap;
        }

        .pulse-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #16a34a;
          box-shadow: 0 0 6px #16a34a;
        }

        .topbar-search {
          position: relative;
          max-width: 440px;
          width: 100%;
        }

        .topbar-search input {
          width: 100%;
          padding: 8px 14px 8px 36px;
          border-radius: 8px;
          border: 1px solid var(--border-color);
          background: var(--bg-main);
          color: var(--text-primary);
          font-size: 0.84rem;
        }

        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }

        .topbar-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .btn-tower-secondary {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 8px 14px;
          border-radius: 8px;
          border: 1px solid var(--border-color);
          background: var(--bg-card);
          color: var(--text-primary);
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--trans-smooth);
        }

        .btn-tower-secondary:hover {
          background: var(--bg-card-subtle);
        }

        .btn-tower-primary {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 8px 16px;
          border-radius: 8px;
          border: none;
          background: var(--primary-green);
          color: #ffffff;
          font-size: 0.82rem;
          font-weight: 700;
          cursor: pointer;
          transition: var(--trans-smooth);
          box-shadow: 0 2px 8px var(--primary-green-glow);
        }

        .btn-tower-primary:hover {
          background: var(--primary-green-dark);
        }

        .tower-body {
          padding: 24px 28px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .kpi-banner-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
          gap: 18px;
        }

        .kpi-tower-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 14px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          box-shadow: var(--shadow-sm);
        }

        .kpi-tower-card.border-green { border-top: 4px solid #16a34a; }
        .kpi-tower-card.border-blue { border-top: 4px solid #0284c7; }
        .kpi-tower-card.border-amber { border-top: 4px solid #d97706; }
        .kpi-tower-card.border-purple { border-top: 4px solid #9333ea; }

        .kpi-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .kpi-title {
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          color: var(--text-muted);
        }

        .kpi-badge-icon {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .bg-green-subtle { background: rgba(22, 163, 74, 0.12); }
        .bg-blue-subtle { background: rgba(2, 132, 199, 0.12); }
        .bg-amber-subtle { background: rgba(217, 119, 6, 0.12); }
        .bg-purple-subtle { background: rgba(147, 51, 234, 0.12); }

        .text-green { color: #16a34a; }
        .text-blue { color: #0284c7; }
        .text-amber { color: #d97706; }
        .text-purple { color: #9333ea; }

        .kpi-num {
          font-family: var(--font-heading);
          font-size: 1.65rem;
          font-weight: 800;
          line-height: 1.1;
        }

        .kpi-unit {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .kpi-trend {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
          font-weight: 600;
        }

        .tower-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 14px;
          padding: 24px;
          box-shadow: var(--shadow-sm);
        }

        .card-header-flex {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 20px;
        }

        .section-title {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 800;
        }

        .section-subtitle {
          font-size: 0.82rem;
          color: var(--text-secondary);
          margin-top: 4px;
        }

        .status-badge-verified {
          background: rgba(22, 163, 74, 0.15);
          color: #16a34a;
          border: 1px solid rgba(22, 163, 74, 0.3);
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 0.74rem;
          font-weight: 700;
        }

        .spread-comparison-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        @media (max-width: 900px) {
          .spread-comparison-grid {
            grid-template-columns: 1fr;
          }
        }

        .spread-panel {
          border-radius: 12px;
          padding: 20px;
          background: var(--bg-card-subtle);
          border: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .spread-panel.traditional {
          border-left: 4px solid #ef4444;
        }

        .spread-panel.krishiroute {
          border-left: 4px solid #16a34a;
        }

        .spread-panel-title {
          font-family: var(--font-heading);
          font-size: 0.98rem;
          font-weight: 800;
        }

        .spread-big-stat {
          font-size: 0.88rem;
        }

        .spread-bars {
          display: flex;
          flex-direction: column;
          gap: 10px;
          font-size: 0.82rem;
        }

        .spread-row {
          display: flex;
          justify-content: space-between;
          padding-bottom: 6px;
          border-bottom: 1px dashed var(--border-color);
        }

        .spread-footer-tag {
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 0.78rem;
          font-weight: 700;
          text-align: center;
        }

        .spread-footer-tag.danger {
          background: rgba(239, 68, 68, 0.1);
          color: #dc2626;
        }

        .spread-footer-tag.success {
          background: rgba(22, 163, 74, 0.12);
          color: #15803d;
        }

        .tower-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.84rem;
        }

        .tower-table th {
          text-align: left;
          padding: 12px 14px;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          color: var(--text-muted);
          border-bottom: 1px solid var(--border-color);
          text-transform: uppercase;
        }

        .tower-table td {
          padding: 14px;
          border-bottom: 1px solid var(--border-color);
          vertical-align: middle;
        }

        .order-code {
          font-family: monospace;
          font-weight: 700;
          color: var(--primary-green);
        }

        .route-stops-cell {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .fpo-stop-chip {
          display: inline-block;
          font-size: 0.74rem;
          padding: 2px 7px;
          border-radius: 4px;
          background: var(--bg-card-subtle);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
        }

        .dest-cell {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .status-pill {
          display: inline-block;
          padding: 4px 9px;
          border-radius: 12px;
          font-size: 0.74rem;
          font-weight: 700;
          white-space: nowrap;
        }

        .status-pill.in_transit {
          background: rgba(2, 132, 199, 0.15);
          color: #0284c7;
        }

        .status-pill.scheduled {
          background: rgba(217, 119, 6, 0.15);
          color: #d97706;
        }

        .status-pill.delivered {
          background: rgba(22, 163, 74, 0.15);
          color: #16a34a;
        }

        .btn-action-small {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 5px 10px;
          border-radius: 6px;
          border: 1px solid var(--border-color);
          background: var(--bg-card);
          color: var(--text-primary);
          font-size: 0.78rem;
          font-weight: 600;
          cursor: pointer;
        }

        .grid-dispatches-layout {
          display: grid;
          grid-template-columns: 360px 1fr;
          gap: 20px;
        }

        @media (max-width: 1000px) {
          .grid-dispatches-layout {
            grid-template-columns: 1fr;
          }
        }

        .dispatches-list-col {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .dispatch-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 16px;
          cursor: pointer;
          transition: var(--trans-smooth);
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .dispatch-card:hover {
          border-color: var(--primary-green);
        }

        .dispatch-card.selected {
          border-color: var(--primary-green);
          background: rgba(22, 163, 74, 0.04);
          box-shadow: 0 0 0 2px rgba(22, 163, 74, 0.2);
        }

        .d-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .d-id {
          font-weight: 800;
          font-family: monospace;
          color: var(--text-primary);
        }

        .d-route-progress {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.72rem;
          color: var(--text-secondary);
        }

        .d-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--border-color);
        }

        .d-dot.filled {
          background: #16a34a;
        }

        .d-dot.active {
          background: #0284c7;
          box-shadow: 0 0 6px #0284c7;
        }

        .d-divider-line {
          flex: 1;
          height: 2px;
          background: var(--border-color);
        }

        .d-card-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.78rem;
          padding-top: 10px;
          border-top: 1px solid var(--border-color);
        }

        .d-driver-info {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .admin-step-bar {
          background: var(--bg-card-subtle);
          border: 1px solid var(--border-color);
          border-radius: 10px;
          padding: 14px;
          margin: 18px 0;
        }

        .step-bar-title {
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          color: var(--text-muted);
          margin-bottom: 10px;
        }

        .step-buttons-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
        }

        @media (max-width: 700px) {
          .step-buttons-row {
            grid-template-columns: 1fr 1fr;
          }
        }

        .btn-step {
          padding: 8px 10px;
          border-radius: 6px;
          border: 1px solid var(--border-color);
          background: var(--bg-card);
          font-size: 0.76rem;
          font-weight: 700;
          cursor: pointer;
          transition: var(--trans-smooth);
        }

        .btn-step.active {
          background: var(--primary-green);
          color: #ffffff;
          border-color: var(--primary-green);
        }

        .route-map-panel {
          margin: 20px 0;
          padding: 16px;
          border-radius: 10px;
          border: 1px solid var(--border-color);
          background: var(--bg-card-subtle);
        }

        .panel-subhead {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.82rem;
          font-weight: 700;
          margin-bottom: 14px;
        }

        .visual-route-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          flex-wrap: wrap;
        }

        .route-box {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 12px;
          flex: 1;
          min-width: 140px;
        }

        .rb-badge {
          font-size: 0.68rem;
          font-weight: 800;
          text-transform: uppercase;
          color: var(--primary-green);
          margin-bottom: 4px;
        }

        .rb-badge.dest {
          color: #0284c7;
        }

        .rb-name {
          font-weight: 700;
          font-size: 0.88rem;
        }

        .rb-details {
          font-size: 0.74rem;
          color: var(--text-secondary);
          margin: 2px 0 4px;
        }

        .rb-status {
          font-size: 0.74rem;
          font-weight: 700;
        }

        .route-arrow-connector {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 0.72rem;
          color: var(--text-secondary);
          font-weight: 600;
        }

        .escrow-audit-table {
          margin-top: 20px;
          padding: 16px;
          border-radius: 10px;
          border: 1px solid var(--border-color);
          background: var(--bg-card-subtle);
        }

        .escrow-rows {
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 0.82rem;
        }

        .e-row {
          display: flex;
          justify-content: space-between;
          padding-bottom: 6px;
          border-bottom: 1px dashed var(--border-color);
        }

        .e-row.total-row {
          border-bottom: none;
          padding-top: 6px;
          font-size: 0.92rem;
          font-weight: 800;
        }

        .fpo-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 20px;
        }

        .fpo-card {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .fpo-header {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .fpo-avatar {
          font-size: 1.8rem;
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: rgba(22, 163, 74, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .fpo-name {
          font-family: var(--font-heading);
          font-size: 1.05rem;
          font-weight: 800;
        }

        .fpo-sub {
          font-size: 0.76rem;
          color: var(--text-secondary);
        }

        .fpo-details-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 0.82rem;
        }

        .fpo-d-item {
          display: flex;
          justify-content: space-between;
          padding-bottom: 4px;
          border-bottom: 1px dashed var(--border-color);
        }

        .hub-card {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .hub-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .hub-name {
          font-family: var(--font-heading);
          font-size: 1.1rem;
          font-weight: 800;
        }

        .hub-location {
          font-size: 0.78rem;
          color: var(--text-secondary);
        }

        .temp-badge {
          display: flex;
          align-items: center;
          gap: 5px;
          background: rgba(2, 132, 199, 0.15);
          color: #0284c7;
          border: 1px solid rgba(2, 132, 199, 0.3);
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 0.78rem;
          font-weight: 700;
        }

        .hub-stats-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          background: var(--bg-card-subtle);
          padding: 12px;
          border-radius: 8px;
          border: 1px solid var(--border-color);
        }

        .hub-capacity-bar-container {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .hub-bar-labels {
          display: flex;
          justify-content: space-between;
          font-size: 0.76rem;
          color: var(--text-secondary);
        }

        .hub-bar-bg {
          height: 8px;
          background: var(--border-color);
          border-radius: 4px;
          overflow: hidden;
        }

        .hub-bar-fill {
          height: 100%;
          background: #0284c7;
          border-radius: 4px;
        }

        .hub-features {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .tag {
          font-size: 0.72rem;
          padding: 3px 8px;
          border-radius: 4px;
          background: var(--bg-card-subtle);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
        }

        .escrow-metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 18px;
        }

        .escrow-metric-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .e-m-label {
          font-size: 0.72rem;
          font-weight: 800;
          color: var(--text-muted);
          letter-spacing: 0.05em;
        }

        .e-m-val {
          font-family: var(--font-heading);
          font-size: 1.6rem;
          font-weight: 800;
        }

        .e-m-sub {
          font-size: 0.74rem;
          color: var(--text-secondary);
        }

        .slider-group-box {
          background: var(--bg-card-subtle);
          border: 1px solid var(--border-color);
          border-radius: 10px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .s-label-flex {
          display: flex;
          justify-content: space-between;
          font-size: 0.88rem;
          font-weight: 700;
        }

        .range-slider {
          width: 100%;
          accent-color: var(--primary-green);
          cursor: pointer;
        }

        .weights-action-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 24px;
          padding-top: 16px;
          border-top: 1px solid var(--border-color);
        }

        .section-banner {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 20px 24px;
          border-left: 4px solid var(--primary-green);
        }

        .banner-title {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 800;
        }

        .banner-sub {
          font-size: 0.82rem;
          color: var(--text-secondary);
          margin-top: 4px;
        }
      `}</style>
    </div>
  );
}
