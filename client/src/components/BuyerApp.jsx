import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Truck, 
  Home, 
  Package, 
  MessageSquare, 
  User, 
  ChevronLeft,
  ChevronDown,
  Navigation,
  PhoneCall,
  Sparkles,
  Layers,
  Check,
  Building2,
  Clock,
  ShieldCheck,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

export default function BuyerApp({ currentUser }) {
  const navigate = useNavigate();
  // Active screen: 'home' | 'matched' | 'plan' | 'confirmed' | 'tracking'
  const [currentScreen, setCurrentScreen] = useState('home');
  const [activeNavTab, setActiveNavTab] = useState('demand');

  // Form State
  const [demandForm, setDemandForm] = useState({
    crop: 'Tomato',
    quantity: '20',
    unit: 'tons',
    qualityGrade: 'A (Premium)',
    deliveryLocation: 'Jaipur Central Hub, Rajasthan',
    preferredDate: '25 Sep 2025'
  });

  // Supplier selection
  const [selectedSuppliers, setSelectedSuppliers] = useState(['shree', 'greenfields']);
  const [supplierFilter, setSupplierFilter] = useState('all');
  const [planTab, setPlanTab] = useState('overview');

  const toggleSupplier = (id) => {
    setSelectedSuppliers(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  return (
    <div className="full-app-page">
      {/* App Top Flow Navigation Bar */}
      <div className="app-stage-header">
        <div className="stage-header-inner">
          <div className="stage-title-wrap">
            <div className="stage-crumb">BUYER PROCUREMENT PORTAL</div>
            <h1 className="stage-heading">
              {currentScreen === 'home' && 'Create Produce Demand (RFQ)'}
              {currentScreen === 'matched' && 'Algorithmic Multi-FPO Match'}
              {currentScreen === 'plan' && 'Optimized VRP Fulfilment Plan'}
              {currentScreen === 'confirmed' && 'Procurement Order Confirmed'}
              {currentScreen === 'tracking' && 'Live Cold-Chain Telemetry & Transit'}
            </h1>
          </div>

          {/* Stepper Breadcrumbs */}
          <div className="stepper-track">
            <button 
              onClick={() => setCurrentScreen('home')} 
              className={`step-btn ${currentScreen === 'home' ? 'active' : 'completed'}`}
            >
              <span className="step-circle">1</span>
              <span>Post Demand</span>
            </button>
            <div className="step-connector"></div>

            <button 
              onClick={() => setCurrentScreen('matched')} 
              className={`step-btn ${currentScreen === 'matched' ? 'active' : ['plan', 'confirmed', 'tracking'].includes(currentScreen) ? 'completed' : ''}`}
            >
              <span className="step-circle">2</span>
              <span>Matched FPOs</span>
            </button>
            <div className="step-connector"></div>

            <button 
              onClick={() => setCurrentScreen('plan')} 
              className={`step-btn ${currentScreen === 'plan' ? 'active' : ['confirmed', 'tracking'].includes(currentScreen) ? 'completed' : ''}`}
            >
              <span className="step-circle">3</span>
              <span>Fulfilment Plan</span>
            </button>
            <div className="step-connector"></div>

            <button 
              onClick={() => setCurrentScreen('confirmed')} 
              className={`step-btn ${currentScreen === 'confirmed' ? 'active' : currentScreen === 'tracking' ? 'completed' : ''}`}
            >
              <span className="step-circle">4</span>
              <span>Order Confirmed</span>
            </button>
            <div className="step-connector"></div>

            <button 
              onClick={() => setCurrentScreen('tracking')} 
              className={`step-btn ${currentScreen === 'tracking' ? 'active' : ''}`}
            >
              <span className="step-circle">5</span>
              <span>Live GPS Tracking</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area: Responsive Full-Page Container */}
      <div className="app-main-canvas">
        {/* ========================================================================= */}
        {/* SCREEN 1: POST DEMAND */}
        {/* ========================================================================= */}
        {currentScreen === 'home' && (
          <div className="screen-container-wide">
            <div className="demand-grid-layout">
              {/* Left Form Card */}
              <div className="surface-card primary-form-card">
                <div className="card-top-title">
                  <div className="card-badge-icon">🏬</div>
                  <div>
                    <h2 className="card-main-heading">Post Your Produce Demand</h2>
                    <p className="card-sub-text">Define required crop, grade, volume and delivery terminal</p>
                  </div>
                </div>

                <div className="form-fields-grid">
                  {/* Field 1: Crop */}
                  <div className="field-group">
                    <label className="field-label">Crop Type</label>
                    <div className="input-box">
                      <span className="ib-icon">🍅</span>
                      <select 
                        value={demandForm.crop} 
                        onChange={e => setDemandForm({ ...demandForm, crop: e.target.value })}
                        className="native-select"
                      >
                        <option value="Tomato">Tomato (Desi Hybrid Premium)</option>
                        <option value="Onion">Nashik Red Onion (Export Grade)</option>
                        <option value="Wheat">Wheat (Sharbati Sehore)</option>
                        <option value="Potato">Potato (Kufri Pukhraj)</option>
                        <option value="Orange">Nagpur Mandarin Orange</option>
                      </select>
                      <ChevronDown size={16} className="ib-arrow" />
                    </div>
                  </div>

                  {/* Field 2: Quantity */}
                  <div className="field-group">
                    <label className="field-label">Required Quantity</label>
                    <div className="input-box">
                      <span className="ib-icon">⚖️</span>
                      <input 
                        type="number" 
                        value={demandForm.quantity} 
                        onChange={e => setDemandForm({ ...demandForm, quantity: e.target.value })}
                        className="native-input"
                      />
                      <span className="unit-pill">tons (200 Q)</span>
                    </div>
                  </div>

                  {/* Field 3: Quality Grade */}
                  <div className="field-group">
                    <label className="field-label">Quality Grade Acceptance</label>
                    <div className="input-box">
                      <span className="ib-icon">🎖️</span>
                      <select 
                        value={demandForm.qualityGrade} 
                        onChange={e => setDemandForm({ ...demandForm, qualityGrade: e.target.value })}
                        className="native-select"
                      >
                        <option value="A (Premium)">Grade A (Firm, Fresh, Premium Retail)</option>
                        <option value="B (Standard)">Grade B (Standard Wholesale Mandi)</option>
                        <option value="C (Processing)">Grade C (Puree & Processing Industrial)</option>
                      </select>
                      <ChevronDown size={16} className="ib-arrow" />
                    </div>
                  </div>

                  {/* Field 4: Delivery Location */}
                  <div className="field-group">
                    <label className="field-label">Destination Warehouse / Terminal</label>
                    <div className="input-box">
                      <MapPin size={18} className="ib-icon text-emerald" />
                      <input 
                        type="text" 
                        value={demandForm.deliveryLocation} 
                        onChange={e => setDemandForm({ ...demandForm, deliveryLocation: e.target.value })}
                        className="native-input"
                      />
                    </div>
                  </div>

                  {/* Field 5: Delivery Date */}
                  <div className="field-group" style={{ gridColumn: 'span 2' }}>
                    <label className="field-label">Preferred Delivery Date Window</label>
                    <div className="input-box">
                      <Calendar size={18} className="ib-icon text-emerald" />
                      <input 
                        type="text" 
                        value={demandForm.preferredDate} 
                        onChange={e => setDemandForm({ ...demandForm, preferredDate: e.target.value })}
                        className="native-input"
                      />
                    </div>
                  </div>
                </div>

                <div className="action-button-row">
                  <button 
                    onClick={() => setCurrentScreen('matched')}
                    className="btn-procure-main"
                  >
                    <span>Find Optimal Suppliers & Corridors</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>

              {/* Right Side Info & Mandi Benchmark Card */}
              <div className="side-banner-column">
                <div className="surface-card highlight-mint-card">
                  <div className="hmc-header">
                    <span className="tractor-badge">🚜</span>
                    <div>
                      <h3 className="hmc-title">Fresh Produce. Direct Farmgate.</h3>
                      <p className="hmc-sub">Stronger connections • Transparent pricing • Lower landed cost</p>
                    </div>
                  </div>

                  <div className="mandi-comparison-pill-box">
                    <div className="m-comp-row">
                      <span>Conventional Mandi Wholesale:</span>
                      <strong>₹22.50 / kg</strong>
                    </div>
                    <div className="m-comp-row text-emerald">
                      <span>KrishiRoute Direct Farmgate Target:</span>
                      <strong>₹18.00–₹18.50 / kg</strong>
                    </div>
                    <div className="m-comp-savings">
                      ✓ Estimated Savings: <strong>18.4% (₹4.20/kg lower)</strong>
                    </div>
                  </div>
                </div>

                <div className="surface-card">
                  <h4 className="sec-sm-title">Guaranteed Escrow Security</h4>
                  <p className="sec-sm-desc">
                    Your payment is locked safely in automated escrow. Funds are released to verified FPO bank accounts only after physical QC inspection at Jaipur terminal.
                  </p>
                  <div className="escrow-tags">
                    <span className="tag-clean">✓ 100% Digital RTGS</span>
                    <span className="tag-clean">✓ Zero Middleman Commission</span>
                    <span className="tag-clean">✓ Cold-Chain GPS Monitored</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SCREEN 2: MATCHED SUPPLIERS */}
        {/* ========================================================================= */}
        {currentScreen === 'matched' && (
          <div className="screen-container-wide">
            <div className="query-meta-strip">
              <div>
                <span className="text-secondary text-xs uppercase font-bold">OPTIMAL MATCHING RESULTS</span>
                <h3 className="text-lg font-bold">
                  {demandForm.crop} • {demandForm.quantity} tons for {demandForm.deliveryLocation}
                </h3>
              </div>
              <div className="filter-pill-cluster">
                <button 
                  onClick={() => setSupplierFilter('all')} 
                  className={`filter-btn ${supplierFilter === 'all' ? 'active' : ''}`}
                >
                  All Matches (5)
                </button>
                <button 
                  onClick={() => setSupplierFilter('fpo')} 
                  className={`filter-btn ${supplierFilter === 'fpo' ? 'active' : ''}`}
                >
                  FPOs (3)
                </button>
                <button 
                  onClick={() => setSupplierFilter('farmer')} 
                  className={`filter-btn ${supplierFilter === 'farmer' ? 'active' : ''}`}
                >
                  Farmers (2)
                </button>
              </div>
            </div>

            <div className="suppliers-grid">
              {/* Supplier 1: Shree Krishi FPO */}
              <div className={`surface-card supplier-card-full ${selectedSuppliers.includes('shree') ? 'selected-card' : ''}`}>
                <div className="sup-top">
                  <div>
                    <h3 className="sup-title">Shree Krishi FPO</h3>
                    <div className="sup-location">📍 Chittorgarh Cluster, Rajasthan (184 km from Jaipur)</div>
                  </div>
                  <span className="match-tag-green">92% Match</span>
                </div>

                <div className="sup-content-row">
                  <div className="sup-img-box">
                    <img 
                      src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&auto=format&fit=crop&q=80" 
                      alt="Tomatoes" 
                    />
                  </div>
                  <div className="sup-specs-grid">
                    <div className="spec-col">
                      <span className="spec-lbl">Available Lot</span>
                      <strong className="spec-val">25 tons</strong>
                    </div>
                    <div className="spec-col">
                      <span className="spec-lbl">Farmgate Asking Rate</span>
                      <strong className="spec-val text-emerald">₹18.00 / kg</strong>
                    </div>
                    <div className="spec-col">
                      <span className="spec-lbl">Quality Grade</span>
                      <strong className="spec-val">Grade A (Desi Hybrid)</strong>
                    </div>
                    <div className="spec-col">
                      <span className="spec-lbl">Harvest Window</span>
                      <strong className="spec-val">Tomorrow (06:00 AM)</strong>
                    </div>
                  </div>
                </div>

                <div className="sup-footer">
                  <button 
                    onClick={() => toggleSupplier('shree')} 
                    className={`btn-select-fpo ${selectedSuppliers.includes('shree') ? 'is-selected' : ''}`}
                  >
                    {selectedSuppliers.includes('shree') ? '✓ Allocated in Fulfilment Plan (12 tons)' : 'Select for Order Allocation'}
                  </button>
                </div>
              </div>

              {/* Supplier 2: GreenFields Cooperative */}
              <div className={`surface-card supplier-card-full ${selectedSuppliers.includes('greenfields') ? 'selected-card' : ''}`}>
                <div className="sup-top">
                  <div>
                    <h3 className="sup-title">GreenFields Cooperative</h3>
                    <div className="sup-location">📍 Tonk Cluster, Rajasthan (112 km from Jaipur)</div>
                  </div>
                  <span className="match-tag-green">88% Match</span>
                </div>

                <div className="sup-content-row">
                  <div className="sup-img-box">
                    <img 
                      src="https://images.unsplash.com/photo-1582284540020-8acbe03f4924?w=400&auto=format&fit=crop&q=80" 
                      alt="Tomatoes" 
                    />
                  </div>
                  <div className="sup-specs-grid">
                    <div className="spec-col">
                      <span className="spec-lbl">Available Lot</span>
                      <strong className="spec-val">20 tons</strong>
                    </div>
                    <div className="spec-col">
                      <span className="spec-lbl">Farmgate Asking Rate</span>
                      <strong className="spec-val text-emerald">₹19.00 / kg</strong>
                    </div>
                    <div className="spec-col">
                      <span className="spec-lbl">Quality Grade</span>
                      <strong className="spec-val">Grade A (Red Ripe)</strong>
                    </div>
                    <div className="spec-col">
                      <span className="spec-lbl">Harvest Window</span>
                      <strong className="spec-val">Ready for Pickup</strong>
                    </div>
                  </div>
                </div>

                <div className="sup-footer">
                  <button 
                    onClick={() => toggleSupplier('greenfields')} 
                    className={`btn-select-fpo ${selectedSuppliers.includes('greenfields') ? 'is-selected' : ''}`}
                  >
                    {selectedSuppliers.includes('greenfields') ? '✓ Allocated in Fulfilment Plan (8 tons)' : 'Select for Order Allocation'}
                  </button>
                </div>
              </div>

              {/* Supplier 3: Kisan Pragati FPO */}
              <div className={`surface-card supplier-card-full ${selectedSuppliers.includes('pragati') ? 'selected-card' : ''}`}>
                <div className="sup-top">
                  <div>
                    <h3 className="sup-title">Kisan Pragati FPO</h3>
                    <div className="sup-location">📍 Sikar Cluster, Rajasthan (125 km from Jaipur)</div>
                  </div>
                  <span className="match-tag-green">85% Match</span>
                </div>

                <div className="sup-content-row">
                  <div className="sup-img-box">
                    <img 
                      src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&auto=format&fit=crop&q=80" 
                      alt="Tomatoes" 
                    />
                  </div>
                  <div className="sup-specs-grid">
                    <div className="spec-col">
                      <span className="spec-lbl">Available Lot</span>
                      <strong className="spec-val">30 tons</strong>
                    </div>
                    <div className="spec-col">
                      <span className="spec-lbl">Farmgate Asking Rate</span>
                      <strong className="spec-val text-emerald">₹20.00 / kg</strong>
                    </div>
                    <div className="spec-col">
                      <span className="spec-lbl">Quality Grade</span>
                      <strong className="spec-val">Grade A</strong>
                    </div>
                    <div className="spec-col">
                      <span className="spec-lbl">Harvest Window</span>
                      <strong className="spec-val">2 Days Available</strong>
                    </div>
                  </div>
                </div>

                <div className="sup-footer">
                  <button 
                    onClick={() => toggleSupplier('pragati')} 
                    className={`btn-select-fpo ${selectedSuppliers.includes('pragati') ? 'is-selected' : ''}`}
                  >
                    {selectedSuppliers.includes('pragati') ? '✓ Selected' : 'Select'}
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Action Floating Bar */}
            <div className="floating-action-banner">
              <div>
                <div className="text-xs text-secondary font-bold">CONSOLIDATED PROCURING LOT</div>
                <div className="text-base font-bold text-emerald">
                  2 Suppliers Selected • 20 Tons Total (12t + 8t)
                </div>
              </div>
              <div className="floating-action-buttons">
                <button onClick={() => setCurrentScreen('home')} className="btn-clean-secondary">
                  <ChevronLeft size={16} />
                  <span>Back to Demand</span>
                </button>
                <button onClick={() => setCurrentScreen('plan')} className="btn-procure-main">
                  <span>Proceed to Fulfilment Plan</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SCREEN 3: FULFILMENT PLAN */}
        {/* ========================================================================= */}
        {currentScreen === 'plan' && (
          <div className="screen-container-wide">
            {/* Status Banner */}
            <div className="optimal-plan-header-banner">
              <div className="oph-icon">✓</div>
              <div>
                <h3 className="oph-title">Optimal Plan Generated Successfully</h3>
                <p className="oph-sub">Lowest logistics cost • &lt;1.8% Spoilage rate • Guaranteed on-time delivery</p>
              </div>
            </div>

            {/* Plan Subtabs */}
            <div className="plan-tabs-cluster">
              <button 
                onClick={() => setPlanTab('overview')} 
                className={`tab-btn-pill ${planTab === 'overview' ? 'active' : ''}`}
              >
                Overview & Economics
              </button>
              <button 
                onClick={() => setPlanTab('route')} 
                className={`tab-btn-pill ${planTab === 'route' ? 'active' : ''}`}
              >
                VRP Highway Route
              </button>
              <button 
                onClick={() => setPlanTab('storage')} 
                className={`tab-btn-pill ${planTab === 'storage' ? 'active' : ''}`}
              >
                Cold Storage Decision
              </button>
            </div>

            <div className="grid-2" style={{ marginTop: '20px' }}>
              {/* Supply Allocation Box */}
              <div className="surface-card">
                <div className="box-header-row">
                  <div className="box-icon-wrap">📦</div>
                  <div>
                    <h3 className="box-title">Supply Allocation</h3>
                    <p className="box-sub">2 Suppliers Aggregated | 20 Tons (200 Quintals)</p>
                  </div>
                </div>

                <div className="allocation-table">
                  <div className="alloc-row">
                    <div className="alloc-fpo-info">
                      <span className="crop-dot">🍅</span>
                      <div>
                        <strong>Shree Krishi FPO</strong>
                        <span>Chittorgarh Cluster</span>
                      </div>
                    </div>
                    <div className="alloc-num text-right">
                      <strong>12 Tons</strong>
                      <span className="text-emerald font-bold">₹18.00 / kg</span>
                    </div>
                  </div>

                  <div className="alloc-row">
                    <div className="alloc-fpo-info">
                      <span className="crop-dot">🍅</span>
                      <div>
                        <strong>GreenFields Cooperative</strong>
                        <span>Tonk Cluster</span>
                      </div>
                    </div>
                    <div className="alloc-num text-right">
                      <strong>8 Tons</strong>
                      <span className="text-emerald font-bold">₹19.00 / kg</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Route Plan Corridor Box */}
              <div className="surface-card">
                <div className="box-header-row">
                  <div className="box-icon-wrap">🗺️</div>
                  <div>
                    <h3 className="box-title">Vehicle Routing Corridor</h3>
                    <p className="box-sub">Total Distance: 620 km | Estimated Transit Time: 11 Hours</p>
                  </div>
                </div>

                <div className="route-corridor-strip">
                  <div className="corridor-stop">
                    <div className="c-dot start"></div>
                    <div className="c-name">Chittorgarh</div>
                    <div className="c-tons">12 tons loaded</div>
                  </div>

                  <div className="corridor-segment">
                    <span className="segment-km">184 km</span>
                    <div className="segment-line"></div>
                    <span className="truck-symbol">🚚</span>
                  </div>

                  <div className="corridor-stop">
                    <div className="c-dot stop2"></div>
                    <div className="c-name">Tonk</div>
                    <div className="c-tons">8 tons loaded</div>
                  </div>

                  <div className="corridor-segment">
                    <span className="segment-km">112 km</span>
                    <div className="segment-line"></div>
                  </div>

                  <div className="corridor-stop">
                    <div className="c-dot dest"></div>
                    <div className="c-name">Jaipur</div>
                    <div className="c-tons">20t Delivered</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Storage Decision Banner */}
            <div className="surface-card highlight-mint-card" style={{ marginTop: '20px' }}>
              <div className="storage-banner-flex">
                <div className="sbf-left">
                  <div className="box-icon-wrap">🏬</div>
                  <div>
                    <h4 className="font-bold text-base text-emerald">Storage Decision: Direct Express Haulage</h4>
                    <p className="text-sm text-secondary">
                      Transit duration is 11 hours (well within the 72-hour fresh shelf life of Tomato Grade A).
                      No intermediate cold warehouse staging required, saving ₹12,000 in handling costs.
                    </p>
                  </div>
                </div>
                <div className="sbf-badge">
                  <span>✓ 0 Storage Delay</span>
                </div>
              </div>
            </div>

            {/* Total Cost Waterfall & Confirmation */}
            <div className="surface-card total-cost-card" style={{ marginTop: '20px' }}>
              <div className="tcc-left">
                <div className="tcc-label">TOTAL ESTIMATED PROCUREMENT COST</div>
                <div className="tcc-price">₹3,68,000</div>
                <div className="tcc-sub">Includes produce farmgate payout, multi-stop cold haulage & platform escrow</div>
              </div>
              <div className="tcc-right">
                <span className="savings-badge-pill">
                  12% Lower Than APMC Market Rate (Saved ₹48,000)
                </span>
                <div className="tcc-buttons">
                  <button onClick={() => setCurrentScreen('matched')} className="btn-clean-secondary">
                    Back to Matches
                  </button>
                  <button onClick={() => setCurrentScreen('confirmed')} className="btn-procure-main">
                    <span>Confirm Order & Lock Escrow</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SCREEN 4: ORDER CONFIRMED */}
        {/* ========================================================================= */}
        {currentScreen === 'confirmed' && (
          <div className="screen-container-narrow text-center">
            <div className="surface-card confirmation-main-card">
              <div className="big-check-ring">
                <Check size={38} className="text-white" />
              </div>

              <h2 className="confirmed-heading">Your Order is Confirmed!</h2>
              <p className="confirmed-subtitle">
                Escrow funds locked safely. Fresh produce is on its way to a better tomorrow.
              </p>

              {/* 2x2 Impact Grid */}
              <div className="impact-2x2-box">
                <div className="impact-grid-title">Expected Supply Chain Impact</div>

                <div className="grid-2">
                  <div className="impact-stat-item">
                    <div className="isi-icon bg-green-subtle text-emerald">🌱</div>
                    <div className="isi-text">
                      <span className="isi-label">Farmer Realization</span>
                      <strong className="isi-val text-emerald">↑ 18% Uplift</strong>
                      <span className="isi-desc">Higher take-home pay for smallholders</span>
                    </div>
                  </div>

                  <div className="impact-stat-item">
                    <div className="isi-icon bg-blue-subtle text-cyan">🪙</div>
                    <div className="isi-text">
                      <span className="isi-label">Buyer Landed Cost</span>
                      <strong className="isi-val text-cyan">↓ 12% Savings</strong>
                      <span className="isi-desc">Lower landed cost for buyers</span>
                    </div>
                  </div>

                  <div className="impact-stat-item">
                    <div className="isi-icon bg-amber-subtle text-amber">♻️</div>
                    <div className="isi-text">
                      <span className="isi-label">Food Waste</span>
                      <strong className="isi-val text-amber">↓ 25% Reduction</strong>
                      <span className="isi-desc">Less wastage in transit corridor</span>
                    </div>
                  </div>

                  <div className="impact-stat-item">
                    <div className="isi-icon bg-green-subtle text-emerald">🚚</div>
                    <div className="isi-text">
                      <span className="isi-label">Delivery Schedule</span>
                      <strong className="isi-val text-emerald">On-Time Guaranteed</strong>
                      <span className="isi-desc">Optimized route and fleet logistics</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="confirmed-cta-cluster">
                <button 
                  onClick={() => setCurrentScreen('tracking')}
                  className="btn-procure-main w-full"
                >
                  <Truck size={18} />
                  <span>Track Live GPS Shipment Telemetry</span>
                  <ArrowRight size={18} />
                </button>

                <button 
                  onClick={() => setCurrentScreen('plan')}
                  className="btn-clean-secondary w-full"
                  style={{ marginTop: '10px' }}
                >
                  <span>Review Order Breakdown & Invoices</span>
                </button>
              </div>

              <div className="eco-quote-footer">
                <em>"Efficient supply chains for a brighter, greener future."</em>
                <span className="eqf-truck">🚚</span>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SCREEN 5: LIVE GPS TRACKING */}
        {/* ========================================================================= */}
        {currentScreen === 'tracking' && (
          <div className="screen-container-wide">
            <div className="tracking-top-banner">
              <div>
                <span className="live-indicator-pill">
                  <span className="pulse-dot"></span>
                  LIVE TELEMETRY ACTIVE
                </span>
                <h2 className="text-xl font-bold mt-1">Dispatch #ORD-98241 • Tata Prima Reefer</h2>
              </div>
              <div className="eta-big-box">
                <span className="text-xs text-secondary font-bold">ESTIMATED TIME OF ARRIVAL</span>
                <div className="text-2xl font-bold text-emerald">02:45 PM Today</div>
              </div>
            </div>

            <div className="grid-2" style={{ marginTop: '20px' }}>
              {/* Map & Truck Telemetry */}
              <div className="surface-card">
                <div className="live-map-viewport">
                  <div className="map-highway-strip">
                    <div className="map-city-mark">Chittorgarh</div>
                    <div className="map-road-track">
                      <div className="map-truck-icon">🚚</div>
                    </div>
                    <div className="map-city-mark">Tonk</div>
                    <div className="map-road-track"></div>
                    <div className="map-city-mark final">Jaipur Hub</div>
                  </div>
                </div>

                <div className="telemetry-readouts-grid">
                  <div className="t-readout">
                    <span className="tr-lbl">Current Speed</span>
                    <strong className="tr-val">52 km/h</strong>
                  </div>
                  <div className="t-readout">
                    <span className="tr-lbl">Reefer Temperature</span>
                    <strong className="tr-val text-emerald">4.8°C (Optimal)</strong>
                  </div>
                  <div className="t-readout">
                    <span className="tr-lbl">Current Highway</span>
                    <strong className="tr-val">NH-79 Jaipur Bypass</strong>
                  </div>
                  <div className="t-readout">
                    <span className="tr-lbl">Escrow Status</span>
                    <strong className="tr-val text-emerald">✓ Funded & Locked</strong>
                  </div>
                </div>

                {/* Driver Contact Card */}
                <div className="driver-profile-card">
                  <div className="dp-avatar">👨‍✈️</div>
                  <div className="dp-info">
                    <strong>Harish Gurjar</strong>
                    <span>Verified Logistics Partner • Tata Prima Reefer (RJ-14-GA-8921)</span>
                  </div>
                  <a href="tel:+919829011421" className="btn-call-driver">
                    <PhoneCall size={15} />
                    <span>Call Driver</span>
                  </a>
                </div>
              </div>

              {/* Real-Time Milestones Checkpoints */}
              <div className="surface-card">
                <h3 className="section-title">Dispatch Milestones</h3>
                <p className="section-subtitle">Real-time GPS geofence confirmations</p>

                <div className="milestones-timeline-clean">
                  <div className="m-step done">
                    <div className="m-step-icon">✓</div>
                    <div className="m-step-text">
                      <strong>Farm Pickup 1 — Shree Krishi FPO (Chittorgarh)</strong>
                      <span>07:30 AM • 12,000 kg Tomato Grade A Loaded & Inspected</span>
                    </div>
                  </div>

                  <div className="m-step done">
                    <div className="m-step-icon">✓</div>
                    <div className="m-step-text">
                      <strong>Farm Pickup 2 — GreenFields Cooperative (Tonk)</strong>
                      <span>11:15 AM • 8,000 kg Tomato Grade A Consolidated</span>
                    </div>
                  </div>

                  <div className="m-step in-transit">
                    <div className="m-step-icon pulse">●</div>
                    <div className="m-step-text">
                      <strong>Highway Transit — En Route to Jaipur</strong>
                      <span className="text-emerald">Current: Passing Tonk Toll Plaza • ETA 02:45 PM</span>
                    </div>
                  </div>

                  <div className="m-step pending">
                    <div className="m-step-icon">○</div>
                    <div className="m-step-text">
                      <strong>Jaipur Central Distribution Terminal</strong>
                      <span>Scheduled 02:45 PM • Automated Direct Payout Release</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-color">
                  <button onClick={() => setCurrentScreen('home')} className="btn-clean-secondary w-full">
                    Create Another Produce Requisition
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .full-app-page {
          min-height: calc(100vh - 70px);
          background: #f8fafc;
          padding-bottom: 60px;
        }

        .app-stage-header {
          background: #ffffff;
          border-bottom: 1px solid #e2e8f0;
          padding: 20px 24px;
        }

        .stage-header-inner {
          max-width: 1300px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 18px;
        }

        .stage-crumb {
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: #059669;
          margin-bottom: 2px;
        }

        .stage-heading {
          font-family: var(--font-heading);
          font-size: 1.45rem;
          font-weight: 800;
          color: #0f172a;
        }

        .stepper-track {
          display: flex;
          align-items: center;
          gap: 8px;
          overflow-x: auto;
        }

        .step-btn {
          display: flex;
          align-items: center;
          gap: 7px;
          background: transparent;
          border: none;
          font-family: var(--font-heading);
          font-size: 0.82rem;
          font-weight: 700;
          color: #94a3b8;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .step-circle {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 1.5px solid #cbd5e1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.72rem;
        }

        .step-btn.active {
          color: #059669;
        }

        .step-btn.active .step-circle {
          background: #059669;
          color: #ffffff;
          border-color: #059669;
        }

        .step-btn.completed {
          color: #0f172a;
        }

        .step-btn.completed .step-circle {
          background: #ecfdf5;
          color: #059669;
          border-color: #059669;
        }

        .step-connector {
          width: 24px;
          height: 2px;
          background: #e2e8f0;
        }

        .app-main-canvas {
          max-width: 1300px;
          margin: 28px auto 0;
          padding: 0 20px;
        }

        .screen-container-wide {
          width: 100%;
        }

        .screen-container-narrow {
          max-width: 680px;
          margin: 0 auto;
        }

        .surface-card {
          background: #ffffff;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          padding: 24px;
          box-shadow: 0 4px 12px -2px rgba(15, 23, 42, 0.04);
        }

        .demand-grid-layout {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 24px;
        }

        @media (max-width: 900px) {
          .demand-grid-layout {
            grid-template-columns: 1fr;
          }
        }

        .card-top-title {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 24px;
        }

        .card-badge-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: #ecfdf5;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
        }

        .card-main-heading {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 800;
          color: #0f172a;
        }

        .card-sub-text {
          font-size: 0.8rem;
          color: #64748b;
        }

        .form-fields-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        @media (max-width: 600px) {
          .form-fields-grid {
            grid-template-columns: 1fr;
          }
          .form-fields-grid > * {
            grid-column: span 1 !important;
          }
        }

        .field-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .field-label {
          font-size: 0.74rem;
          font-weight: 700;
          color: #334155;
        }

        .input-box {
          display: flex;
          align-items: center;
          gap: 8px;
          border: 1px solid #cbd5e1;
          border-radius: 10px;
          padding: 8px 12px;
          background: #ffffff;
          transition: all 0.2s;
        }

        .input-box:focus-within {
          border-color: #059669;
          box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.15);
        }

        .ib-icon {
          font-size: 1.1rem;
        }

        .native-select, .native-input {
          flex: 1;
          border: none;
          outline: none;
          font-family: inherit;
          font-size: 0.88rem;
          font-weight: 600;
          color: #0f172a;
          background: transparent;
        }

        .unit-pill {
          font-size: 0.72rem;
          font-weight: 700;
          color: #64748b;
          background: #f1f5f9;
          padding: 2px 8px;
          border-radius: 6px;
        }

        .action-button-row {
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid #e2e8f0;
        }

        .btn-procure-main {
          width: 100%;
          padding: 13px 20px;
          border-radius: 10px;
          border: none;
          background: #059669;
          color: #ffffff;
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          transition: background 0.2s;
          box-shadow: 0 4px 14px rgba(5, 150, 105, 0.25);
        }

        .btn-procure-main:hover {
          background: #047857;
        }

        .btn-clean-secondary {
          padding: 11px 18px;
          border-radius: 10px;
          border: 1px solid #cbd5e1;
          background: #ffffff;
          color: #334155;
          font-family: var(--font-heading);
          font-size: 0.88rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-clean-secondary:hover {
          background: #f8fafc;
          border-color: #94a3b8;
        }

        .side-banner-column {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .highlight-mint-card {
          background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
          border-color: #a7f3d0;
        }

        .hmc-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .tractor-badge {
          font-size: 2rem;
        }

        .hmc-title {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 800;
          color: #064e3b;
        }

        .hmc-sub {
          font-size: 0.76rem;
          color: #047857;
        }

        .mandi-comparison-pill-box {
          background: rgba(255, 255, 255, 0.7);
          border-radius: 12px;
          padding: 14px;
          border: 1px solid rgba(5, 150, 105, 0.2);
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 0.82rem;
        }

        .m-comp-row {
          display: flex;
          justify-content: space-between;
        }

        .m-comp-savings {
          margin-top: 6px;
          padding-top: 6px;
          border-top: 1px dashed rgba(5, 150, 105, 0.3);
          font-weight: 700;
          color: #047857;
        }

        .sec-sm-title {
          font-family: var(--font-heading);
          font-size: 0.96rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 6px;
        }

        .sec-sm-desc {
          font-size: 0.82rem;
          color: #64748b;
          line-height: 1.5;
          margin-bottom: 14px;
        }

        .escrow-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .tag-clean {
          font-size: 0.72rem;
          font-weight: 700;
          color: #059669;
          background: #ecfdf5;
          padding: 3px 8px;
          border-radius: 4px;
          border: 1px solid rgba(5, 150, 105, 0.2);
        }

        /* Screen 2: Suppliers */
        .query-meta-strip {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .filter-pill-cluster {
          display: flex;
          gap: 8px;
        }

        .filter-btn {
          padding: 6px 14px;
          border-radius: 20px;
          border: 1px solid #cbd5e1;
          background: #ffffff;
          font-size: 0.78rem;
          font-weight: 700;
          color: #64748b;
          cursor: pointer;
        }

        .filter-btn.active {
          background: #059669;
          color: #ffffff;
          border-color: #059669;
        }

        .suppliers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .supplier-card-full {
          display: flex;
          flex-direction: column;
          gap: 16px;
          transition: all 0.2s;
        }

        .supplier-card-full.selected-card {
          border-color: #059669;
          box-shadow: 0 4px 20px rgba(5, 150, 105, 0.12);
        }

        .sup-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .sup-title {
          font-family: var(--font-heading);
          font-size: 1.1rem;
          font-weight: 800;
          color: #0f172a;
        }

        .sup-location {
          font-size: 0.76rem;
          color: #64748b;
          margin-top: 2px;
        }

        .match-tag-green {
          background: #ecfdf5;
          color: #059669;
          border: 1px solid rgba(5, 150, 105, 0.25);
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 0.74rem;
          font-weight: 800;
        }

        .sup-content-row {
          display: flex;
          gap: 16px;
          align-items: center;
        }

        .sup-img-box {
          width: 80px;
          height: 80px;
          border-radius: 12px;
          overflow: hidden;
          background: #f1f5f9;
          flex-shrink: 0;
        }

        .sup-img-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .sup-specs-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          flex: 1;
        }

        .spec-col {
          display: flex;
          flex-direction: column;
        }

        .spec-lbl {
          font-size: 0.68rem;
          color: #64748b;
        }

        .spec-val {
          font-size: 0.88rem;
          color: #0f172a;
        }

        .btn-select-fpo {
          width: 100%;
          padding: 10px;
          border-radius: 8px;
          border: 1.5px solid #059669;
          background: #ffffff;
          color: #059669;
          font-family: var(--font-heading);
          font-size: 0.84rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-select-fpo.is-selected {
          background: #059669;
          color: #ffffff;
        }

        .floating-action-banner {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 16px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 10px 30px -5px rgba(0,0,0,0.08);
          position: sticky;
          bottom: 20px;
          z-index: 10;
        }

        .floating-action-buttons {
          display: flex;
          gap: 12px;
        }

        /* Screen 3: Fulfilment Plan */
        .optimal-plan-header-banner {
          background: #ecfdf5;
          border: 1px solid #a7f3d0;
          border-radius: 12px;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .oph-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #059669;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          font-size: 1rem;
        }

        .oph-title {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 800;
          color: #064e3b;
        }

        .oph-sub {
          font-size: 0.8rem;
          color: #047857;
        }

        .plan-tabs-cluster {
          display: flex;
          gap: 8px;
          margin-top: 20px;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 10px;
        }

        .tab-btn-pill {
          padding: 8px 16px;
          border-radius: 20px;
          border: 1px solid #cbd5e1;
          background: #ffffff;
          font-size: 0.82rem;
          font-weight: 700;
          color: #475569;
          cursor: pointer;
        }

        .tab-btn-pill.active {
          background: #059669;
          color: #ffffff;
          border-color: #059669;
        }

        .box-header-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 18px;
        }

        .box-icon-wrap {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: #ecfdf5;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
        }

        .box-title {
          font-family: var(--font-heading);
          font-size: 1.05rem;
          font-weight: 800;
          color: #0f172a;
        }

        .box-sub {
          font-size: 0.76rem;
          color: #64748b;
        }

        .allocation-table {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .alloc-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 14px;
          background: #f8fafc;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
        }

        .alloc-fpo-info {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .alloc-fpo-info strong {
          display: block;
          font-size: 0.88rem;
          color: #0f172a;
        }

        .alloc-fpo-info span {
          font-size: 0.74rem;
          color: #64748b;
        }

        .alloc-num strong {
          display: block;
          font-size: 0.95rem;
        }

        .alloc-num span {
          font-size: 0.78rem;
        }

        .route-corridor-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 10px;
        }

        .corridor-stop {
          text-align: center;
        }

        .c-dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          margin: 0 auto 6px;
        }
        .c-dot.start { background: #059669; }
        .c-dot.stop2 { background: #0284c7; }
        .c-dot.dest { background: #064e3b; }

        .c-name {
          font-weight: 800;
          font-size: 0.82rem;
          color: #0f172a;
        }

        .c-tons {
          font-size: 0.7rem;
          color: #64748b;
        }

        .corridor-segment {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }

        .segment-line {
          width: 100%;
          height: 3px;
          background: #cbd5e1;
          margin: 4px 0;
        }

        .segment-km {
          font-size: 0.68rem;
          color: #64748b;
          font-weight: 700;
        }

        .truck-symbol {
          position: absolute;
          top: -12px;
          font-size: 1.2rem;
        }

        .storage-banner-flex {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .sbf-left {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .sbf-badge {
          background: #ffffff;
          color: #059669;
          padding: 6px 14px;
          border-radius: 20px;
          font-weight: 800;
          font-size: 0.82rem;
          border: 1px solid #a7f3d0;
        }

        .total-cost-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #0f172a;
          color: #ffffff;
          border: none;
        }

        .tcc-label {
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: #94a3b8;
        }

        .tcc-price {
          font-family: var(--font-heading);
          font-size: 2.2rem;
          font-weight: 800;
          color: #ffffff;
        }

        .tcc-sub {
          font-size: 0.78rem;
          color: #94a3b8;
        }

        .tcc-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 12px;
        }

        .savings-badge-pill {
          background: #15803d;
          color: #86efac;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.78rem;
          font-weight: 700;
        }

        .tcc-buttons {
          display: flex;
          gap: 10px;
        }

        /* Screen 4: Confirmation */
        .confirmation-main-card {
          padding: 40px 32px;
        }

        .big-check-ring {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: #059669;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 18px;
          box-shadow: 0 10px 25px rgba(5, 150, 105, 0.35);
        }

        .confirmed-heading {
          font-family: var(--font-heading);
          font-size: 1.8rem;
          font-weight: 800;
          color: #0f172a;
        }

        .confirmed-subtitle {
          font-size: 0.92rem;
          color: #64748b;
          margin-top: 4px;
          margin-bottom: 28px;
        }

        .impact-2x2-box {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 20px;
          text-align: left;
          margin-bottom: 28px;
        }

        .impact-grid-title {
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          color: #334155;
          margin-bottom: 14px;
        }

        .impact-stat-item {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 12px;
          display: flex;
          gap: 10px;
        }

        .isi-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          flex-shrink: 0;
        }

        .isi-label { font-size: 0.7rem; color: #64748b; font-weight: 600; display: block; }
        .isi-val { font-size: 1.05rem; font-weight: 800; display: block; margin: 1px 0; }
        .isi-desc { font-size: 0.68rem; color: #94a3b8; display: block; }

        .confirmed-cta-cluster {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .eco-quote-footer {
          margin-top: 24px;
          font-size: 0.82rem;
          color: #64748b;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        /* Screen 5: Live Tracking */
        .tracking-top-banner {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 20px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .live-indicator-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #ecfdf5;
          color: #059669;
          font-size: 0.72rem;
          font-weight: 800;
          padding: 3px 10px;
          border-radius: 20px;
          border: 1px solid rgba(5, 150, 105, 0.2);
        }

        .live-map-viewport {
          background: #0f172a;
          border-radius: 12px;
          padding: 36px 20px;
          color: #ffffff;
          margin-bottom: 20px;
        }

        .map-highway-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .map-city-mark {
          font-weight: 800;
          font-size: 0.85rem;
        }
        .map-city-mark.final { color: #86efac; }

        .map-road-track {
          flex: 1;
          height: 4px;
          background: #334155;
          margin: 0 14px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .map-truck-icon {
          position: absolute;
          font-size: 1.4rem;
          top: -14px;
          animation: pulseGlow 1.5s infinite;
        }

        .telemetry-readouts-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          background: #f8fafc;
          padding: 14px;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
          margin-bottom: 20px;
        }

        .t-readout {
          display: flex;
          flex-direction: column;
        }
        .tr-lbl { font-size: 0.68rem; color: #64748b; font-weight: 600; }
        .tr-val { font-size: 0.92rem; font-weight: 800; color: #0f172a; }

        .driver-profile-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px;
          background: #f8fafc;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
        }

        .dp-avatar { font-size: 1.8rem; }
        .dp-info strong { display: block; font-size: 0.92rem; }
        .dp-info span { font-size: 0.74rem; color: #64748b; }

        .btn-call-driver {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #059669;
          color: #ffffff;
          padding: 8px 14px;
          border-radius: 8px;
          font-size: 0.82rem;
          font-weight: 700;
          text-decoration: none;
        }

        .milestones-timeline-clean {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-top: 18px;
        }

        .m-step {
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }

        .m-step-icon {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #e2e8f0;
          color: #64748b;
          font-size: 0.74rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .m-step.done .m-step-icon {
          background: #059669;
          color: #ffffff;
        }

        .m-step.in-transit .m-step-icon {
          background: #ecfdf5;
          color: #059669;
          border: 2px solid #059669;
        }

        .m-step-text strong {
          display: block;
          font-size: 0.86rem;
          color: #0f172a;
        }

        .m-step-text span {
          font-size: 0.74rem;
          color: #64748b;
        }
      `}</style>
    </div>
  );
}
