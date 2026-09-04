import React, { useState } from 'react';
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
  RotateCcw,
  Sparkles,
  Layers,
  Check
} from 'lucide-react';

export default function BuyerMobileApp({ onGoToAdmin }) {
  // Navigation inside the Buyer Mobile App: 'home' | 'matched' | 'plan' | 'confirmed' | 'tracking'
  const [currentScreen, setCurrentScreen] = useState('home');
  const [viewMode, setViewMode] = useState('single'); // 'single' | 'multi'
  const [bottomTab, setBottomTab] = useState('home');

  // Form State
  const [demandForm, setDemandForm] = useState({
    crop: 'Tomato',
    quantity: '20',
    unit: 'tons',
    qualityGrade: 'A (Premium)',
    deliveryLocation: 'Jaipur, Rajasthan',
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

  const handleBottomTabClick = (tab) => {
    setBottomTab(tab);
    if (tab === 'home') setCurrentScreen('home');
    if (tab === 'orders') setCurrentScreen('confirmed');
    if (tab === 'tracking') setCurrentScreen('tracking');
  };

  // Screen 1: Post Demand
  const renderScreen1 = (isMulti = false) => (
    <div className="screen-content-wrapper">
      {/* App Bar */}
      <div className="app-nav-header">
        <div className="app-brand-left">
          <span className="brand-dot-check">✓</span>
          <span className="brand-name-text">KrishiRoute</span>
        </div>
        <div className="app-header-avatar">
          <User size={16} />
        </div>
      </div>

      <div className="scrollable-screen-body">
        {/* Post Your Demand Card */}
        <div className="demand-input-card">
          <div className="demand-card-header">
            <span className="d-icon-badge">🏬</span>
            <div>
              <div className="d-card-title">Post Your Demand</div>
              <div className="d-card-sub">Find the best supply, route and price</div>
            </div>
          </div>

          {/* Input 1: Crop */}
          <div className="modern-field-row">
            <span className="f-icon">🍅</span>
            <div className="f-body">
              <span className="f-label">Crop</span>
              <select 
                value={demandForm.crop} 
                onChange={e => setDemandForm({ ...demandForm, crop: e.target.value })}
                className="f-select-native"
              >
                <option value="Tomato">Tomato</option>
                <option value="Onion">Nashik Red Onion</option>
                <option value="Wheat">Wheat (Sharbati)</option>
                <option value="Orange">Nagpur Mandarin Orange</option>
              </select>
            </div>
            <ChevronDown size={14} className="f-arrow" />
          </div>

          {/* Input 2: Quantity */}
          <div className="modern-field-row">
            <span className="f-icon">⚖️</span>
            <div className="f-body">
              <span className="f-label">Quantity (in tons)</span>
              <input 
                type="number" 
                value={demandForm.quantity} 
                onChange={e => setDemandForm({ ...demandForm, quantity: e.target.value })}
                className="f-input-native"
              />
            </div>
            <ChevronDown size={14} className="f-arrow" />
          </div>

          {/* Input 3: Quality Grade */}
          <div className="modern-field-row">
            <span className="f-icon">🎖️</span>
            <div className="f-body">
              <span className="f-label">Quality Grade</span>
              <select 
                value={demandForm.qualityGrade} 
                onChange={e => setDemandForm({ ...demandForm, qualityGrade: e.target.value })}
                className="f-select-native"
              >
                <option value="A (Premium)">A (Premium)</option>
                <option value="B (Standard)">B (Standard)</option>
                <option value="C (Processing)">C (Processing)</option>
              </select>
            </div>
            <ChevronDown size={14} className="f-arrow" />
          </div>

          {/* Input 4: Delivery Location */}
          <div className="modern-field-row">
            <MapPin size={16} className="text-primary-green" />
            <div className="f-body">
              <span className="f-label">Delivery Location</span>
              <input 
                type="text" 
                value={demandForm.deliveryLocation} 
                onChange={e => setDemandForm({ ...demandForm, deliveryLocation: e.target.value })}
                className="f-input-native"
              />
            </div>
            <ChevronDown size={14} className="f-arrow" />
          </div>

          {/* Input 5: Preferred Delivery Date */}
          <div className="modern-field-row">
            <Calendar size={16} className="text-primary-green" />
            <div className="f-body">
              <span className="f-label">Preferred Delivery Date</span>
              <input 
                type="text" 
                value={demandForm.preferredDate} 
                onChange={e => setDemandForm({ ...demandForm, preferredDate: e.target.value })}
                className="f-input-native"
              />
            </div>
            <ChevronDown size={14} className="f-arrow" />
          </div>

          {/* Find Suppliers CTA Button */}
          <button 
            onClick={() => setCurrentScreen('matched')}
            className="app-primary-btn"
          >
            <span>Find Suppliers</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Fresh Produce Banner */}
        <div className="fresh-produce-landscape-card">
          <div className="fp-text">
            <strong>Fresh produce</strong><br />
            Stronger connections<br />
            Better tomorrows
          </div>
          <div className="fp-tractor">🚜</div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="app-bottom-navbar">
        <button onClick={() => handleBottomTabClick('home')} className={`nav-tab-btn ${bottomTab === 'home' ? 'active' : ''}`}>
          <Home size={18} />
          <span>Home</span>
        </button>
        <button onClick={() => handleBottomTabClick('orders')} className={`nav-tab-btn ${bottomTab === 'orders' ? 'active' : ''}`}>
          <Package size={18} />
          <span>Orders</span>
        </button>
        <button onClick={() => handleBottomTabClick('messages')} className={`nav-tab-btn ${bottomTab === 'messages' ? 'active' : ''}`}>
          <MessageSquare size={18} />
          <span>Messages</span>
        </button>
        <button onClick={() => handleBottomTabClick('profile')} className={`nav-tab-btn ${bottomTab === 'profile' ? 'active' : ''}`}>
          <User size={18} />
          <span>Profile</span>
        </button>
      </div>
      <div className="ios-bottom-indicator"></div>
    </div>
  );

  // Screen 2: Matched Suppliers
  const renderScreen2 = (isMulti = false) => (
    <div className="screen-content-wrapper">
      <div className="app-nav-header with-back">
        <button onClick={() => setCurrentScreen('home')} className="back-icon-btn">
          <ChevronLeft size={20} />
        </button>
        <div className="screen-nav-title">Matched Suppliers</div>
        <div style={{ width: 24 }}></div>
      </div>

      <div className="scrollable-screen-body">
        <div className="matched-query-summary">
          Showing best matches for your demand<br />
          <strong>{demandForm.crop} | {demandForm.quantity} tons | Jaipur | {demandForm.preferredDate}</strong>
        </div>

        {/* Filter Pills */}
        <div className="filter-tabs-row">
          <button 
            onClick={() => setSupplierFilter('all')} 
            className={`tab-filter-btn ${supplierFilter === 'all' ? 'active' : ''}`}
          >
            All Matches (5)
          </button>
          <button 
            onClick={() => setSupplierFilter('fpo')} 
            className={`tab-filter-btn ${supplierFilter === 'fpo' ? 'active' : ''}`}
          >
            FPOs (3)
          </button>
          <button 
            onClick={() => setSupplierFilter('farmer')} 
            className={`tab-filter-btn ${supplierFilter === 'farmer' ? 'active' : ''}`}
          >
            Farmers (2)
          </button>
        </div>

        {/* Supplier 1: Shree Krishi FPO */}
        <div className="supplier-item-card">
          <div className="sic-top">
            <div>
              <div className="sic-name">Shree Krishi FPO</div>
              <div className="sic-loc">📍 Chittorgarh, Rajasthan</div>
            </div>
            <span className="match-pill green-pill">92% Match</span>
          </div>

          <div className="sic-body-row">
            <div className="crop-photo-wrap">
              <img 
                src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=200&auto=format&fit=crop&q=80" 
                alt="Tomatoes" 
              />
            </div>
            <div className="crop-spec-list">
              <div className="csl-item">
                <span>Available Quantity</span>
                <strong>25 tons</strong>
              </div>
              <div className="csl-item">
                <span>Price</span>
                <strong className="text-primary-green">₹18/kg</strong>
              </div>
              <div className="csl-item">
                <span>Quality Grade</span>
                <strong>A</strong>
              </div>
            </div>
          </div>

          <button 
            onClick={() => toggleSupplier('shree')} 
            className={`select-supplier-btn ${selectedSuppliers.includes('shree') ? 'selected' : ''}`}
          >
            {selectedSuppliers.includes('shree') ? 'Selected ✓' : 'Select'}
          </button>
        </div>

        {/* Supplier 2: GreenFields Cooperative */}
        <div className="supplier-item-card">
          <div className="sic-top">
            <div>
              <div className="sic-name">GreenFields Cooperative</div>
              <div className="sic-loc">📍 Tonk, Rajasthan</div>
            </div>
            <span className="match-pill green-pill">88% Match</span>
          </div>

          <div className="sic-body-row">
            <div className="crop-photo-wrap">
              <img 
                src="https://images.unsplash.com/photo-1582284540020-8acbe03f4924?w=200&auto=format&fit=crop&q=80" 
                alt="Tomatoes" 
              />
            </div>
            <div className="crop-spec-list">
              <div className="csl-item">
                <span>Available Quantity</span>
                <strong>20 tons</strong>
              </div>
              <div className="csl-item">
                <span>Price</span>
                <strong className="text-primary-green">₹19/kg</strong>
              </div>
              <div className="csl-item">
                <span>Quality Grade</span>
                <strong>A</strong>
              </div>
            </div>
          </div>

          <button 
            onClick={() => toggleSupplier('greenfields')} 
            className={`select-supplier-btn ${selectedSuppliers.includes('greenfields') ? 'selected' : ''}`}
          >
            {selectedSuppliers.includes('greenfields') ? 'Selected ✓' : 'Select'}
          </button>
        </div>

        {/* Supplier 3: Kisan Pragati FPO */}
        <div className="supplier-item-card">
          <div className="sic-top">
            <div>
              <div className="sic-name">Kisan Pragati FPO</div>
              <div className="sic-loc">📍 Sikar, Rajasthan</div>
            </div>
            <span className="match-pill green-pill">85% Match</span>
          </div>

          <div className="sic-body-row">
            <div className="crop-photo-wrap">
              <img 
                src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=200&auto=format&fit=crop&q=80" 
                alt="Tomatoes" 
              />
            </div>
            <div className="crop-spec-list">
              <div className="csl-item">
                <span>Available Quantity</span>
                <strong>30 tons</strong>
              </div>
              <div className="csl-item">
                <span>Price</span>
                <strong className="text-primary-green">₹20/kg</strong>
              </div>
              <div className="csl-item">
                <span>Quality Grade</span>
                <strong>A</strong>
              </div>
            </div>
          </div>

          <button 
            onClick={() => toggleSupplier('pragati')} 
            className={`select-supplier-btn ${selectedSuppliers.includes('pragati') ? 'selected' : ''}`}
          >
            {selectedSuppliers.includes('pragati') ? 'Selected ✓' : 'Select'}
          </button>
        </div>

        {/* Action Button */}
        <button 
          onClick={() => setCurrentScreen('plan')} 
          className="app-primary-btn" 
          style={{ marginTop: 8, marginBottom: 12 }}
        >
          <span>Generate Fulfilment Plan</span>
          <ArrowRight size={16} />
        </button>
      </div>
      <div className="ios-bottom-indicator"></div>
    </div>
  );

  // Screen 3: Fulfilment Plan
  const renderScreen3 = (isMulti = false) => (
    <div className="screen-content-wrapper">
      <div className="app-nav-header with-back">
        <button onClick={() => setCurrentScreen('matched')} className="back-icon-btn">
          <ChevronLeft size={20} />
        </button>
        <div className="screen-nav-title">Fulfilment Plan</div>
        <div style={{ width: 24 }}></div>
      </div>

      <div className="scrollable-screen-body">
        {/* Green Status Pill Banner */}
        <div className="optimal-plan-banner">
          <span className="opb-circle-check">✓</span>
          <div>
            <div className="opb-title">Optimal plan generated</div>
            <div className="opb-sub">Lowest cost • Less waste • On-time delivery</div>
          </div>
        </div>

        {/* Subtabs: Overview | Route | Storage */}
        <div className="plan-tabs-bar">
          <button 
            onClick={() => setPlanTab('overview')} 
            className={`pt-btn ${planTab === 'overview' ? 'active' : ''}`}
          >
            Overview
          </button>
          <button 
            onClick={() => setPlanTab('route')} 
            className={`pt-btn ${planTab === 'route' ? 'active' : ''}`}
          >
            Route
          </button>
          <button 
            onClick={() => setPlanTab('storage')} 
            className={`pt-btn ${planTab === 'storage' ? 'active' : ''}`}
          >
            Storage
          </button>
        </div>

        {/* Section 1: Supply Allocation */}
        <div className="plan-detail-card">
          <div className="pdc-title-row">
            <span className="pdc-icon">📦</span>
            <div>
              <div className="pdc-heading">Supply Allocation</div>
              <div className="pdc-sub">2 suppliers | 20 tons</div>
            </div>
          </div>

          <div className="alloc-item">
            <div className="alloc-left">
              <span className="t-icon">🍅</span>
              <div>
                <div className="al-name">Shree Krishi FPO</div>
              </div>
            </div>
            <div className="alloc-right">
              <div className="al-tons">12 tons</div>
              <div className="al-price">₹18/kg</div>
            </div>
          </div>

          <div className="alloc-item" style={{ marginTop: 6 }}>
            <div className="alloc-left">
              <span className="t-icon">🍅</span>
              <div>
                <div className="al-name">GreenFields Cooperative</div>
              </div>
            </div>
            <div className="alloc-right">
              <div className="al-tons">8 tons</div>
              <div className="al-price">₹19/kg</div>
            </div>
          </div>
        </div>

        {/* Section 2: Route Plan */}
        <div className="plan-detail-card">
          <div className="pdc-title-row">
            <span className="pdc-icon">🗺️</span>
            <div>
              <div className="pdc-heading">Route Plan</div>
              <div className="pdc-sub">Total Distance: 620 km | Estimated Time: 11 hours</div>
            </div>
          </div>

          <div className="route-flow-diagram">
            <div className="rf-point">
              <div className="rf-dot"></div>
              <div className="rf-city">Chittorgarh</div>
              <div className="rf-tonnage">(12 tons)</div>
            </div>

            <div className="rf-line">
              <span className="rf-truck">🚚</span>
            </div>

            <div className="rf-point">
              <div className="rf-dot"></div>
              <div className="rf-city">Tonk</div>
              <div className="rf-tonnage">(8 tons)</div>
            </div>

            <div className="rf-line"></div>

            <div className="rf-point">
              <div className="rf-dot destination"></div>
              <div className="rf-city">Jaipur</div>
              <div className="rf-tonnage">(Delivery)</div>
            </div>
          </div>
        </div>

        {/* Section 3: Storage Decision */}
        <div className="plan-detail-card storage-card-green">
          <div className="pdc-title-row">
            <span className="pdc-icon">🏬</span>
            <div>
              <div className="pdc-heading text-forest">Storage Decision</div>
              <div className="storage-bold-text">No storage required</div>
              <div className="storage-sub-text">Direct delivery within 24 hours</div>
            </div>
          </div>
        </div>

        {/* Section 4: Estimated Total Cost */}
        <div className="total-cost-banner-card">
          <div className="tcb-left">
            <span className="tcb-icon">🪙</span>
            <div>
              <div className="tcb-label">Estimated Total Cost</div>
              <div className="tcb-val">₹3,68,000</div>
            </div>
          </div>
          <div className="tcb-badge">
            12% lower<br />than market rate
          </div>
        </div>

        {/* Confirm Order Button */}
        <button 
          onClick={() => setCurrentScreen('confirmed')} 
          className="app-primary-btn" 
          style={{ marginTop: 10, marginBottom: 12 }}
        >
          <span>Confirm & Lock Route</span>
          <ArrowRight size={16} />
        </button>
      </div>
      <div className="ios-bottom-indicator"></div>
    </div>
  );

  // Screen 4: Order Confirmed
  const renderScreen4 = (isMulti = false) => (
    <div className="screen-content-wrapper">
      <div className="app-nav-header with-back">
        <button onClick={() => setCurrentScreen('home')} className="back-icon-btn">
          <ChevronLeft size={20} />
        </button>
        <div className="screen-nav-title">Order Confirmed</div>
        <div style={{ width: 24 }}></div>
      </div>

      <div className="scrollable-screen-body text-center">
        {/* Big Celebration Checkmark */}
        <div className="confirmation-celebration-badge">
          <div className="circle-check-large">✓</div>
        </div>

        <h2 className="confirmed-main-title">Your Order is Confirmed!</h2>
        <p className="confirmed-tagline">
          Fresh produce is on its way to a better tomorrow.
        </p>

        {/* Expected Impact 2x2 Grid */}
        <div className="expected-impact-wrapper">
          <div className="ei-title">Expected Impact</div>

          <div className="ei-grid-2x2">
            <div className="ei-cell">
              <div className="ei-round-icon green-soft">🌱</div>
              <div className="ei-content">
                <div className="ei-name">Farmer Realization</div>
                <div className="ei-stat text-primary-green">↑ 18%</div>
                <div className="ei-desc">Higher income for farmers</div>
              </div>
            </div>

            <div className="ei-cell">
              <div className="ei-round-icon blue-soft">🪙</div>
              <div className="ei-content">
                <div className="ei-name">Buyer Landed Cost</div>
                <div className="ei-stat text-cyan">↓ 12%</div>
                <div className="ei-desc">Lower cost for buyers</div>
              </div>
            </div>

            <div className="ei-cell">
              <div className="ei-round-icon amber-soft">♻️</div>
              <div className="ei-content">
                <div className="ei-name">Food Waste</div>
                <div className="ei-stat text-amber">↓ 25%</div>
                <div className="ei-desc">Less wastage in supply chain</div>
              </div>
            </div>

            <div className="ei-cell">
              <div className="ei-round-icon green-soft">🚚</div>
              <div className="ei-content">
                <div className="ei-name">Delivery Time</div>
                <div className="ei-stat text-primary-green">On-time</div>
                <div className="ei-desc">Optimized route and logistics</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <button 
          onClick={() => setCurrentScreen('tracking')}
          className="app-primary-btn"
          style={{ marginTop: 14 }}
        >
          <span>Track Shipment</span>
          <ArrowRight size={16} />
        </button>

        <button 
          onClick={() => setCurrentScreen('plan')}
          className="app-outline-btn"
          style={{ marginTop: 8 }}
        >
          <span>View Order Details</span>
        </button>

        <div className="confirmed-slogan-footer">
          <em>"Efficient supply chains for a brighter, greener future."</em>
          <div className="footer-mini-truck">🚚</div>
        </div>
      </div>
      <div className="ios-bottom-indicator"></div>
    </div>
  );

  // Screen 5: Live GPS Tracking
  const renderScreen5 = () => (
    <div className="screen-content-wrapper">
      <div className="app-nav-header with-back">
        <button onClick={() => setCurrentScreen('confirmed')} className="back-icon-btn">
          <ChevronLeft size={20} />
        </button>
        <div className="screen-nav-title">Live GPS Tracking</div>
        <div style={{ width: 24 }}></div>
      </div>

      <div className="scrollable-screen-body">
        {/* GPS Map Header */}
        <div className="map-mockup-card">
          <div className="map-badge-live">
            <span className="pulse-dot green"></span>
            <span>LIVE GPS • NH-79</span>
          </div>
          <div className="map-eta-box">
            <span className="eta-lbl">ESTIMATED ARRIVAL</span>
            <span className="eta-val">02:45 PM Today</span>
          </div>
          <div className="map-graphic-center">
            <div className="road-path">
              <div className="truck-marker">🚚</div>
            </div>
          </div>
        </div>

        {/* Driver Contact Card */}
        <div className="driver-contact-card">
          <div className="dc-left">
            <div className="dc-avatar">👨‍✈️</div>
            <div>
              <div className="dc-name">Harish Gurjar</div>
              <div className="dc-vehicle">Tata Prima Reefer • RJ-14-GA-8921</div>
            </div>
          </div>
          <a href="tel:+919829011421" className="dc-call-btn">
            <PhoneCall size={14} />
            <span>Call Driver</span>
          </a>
        </div>

        {/* Real-Time Milestones */}
        <div className="plan-detail-card" style={{ marginTop: 12 }}>
          <div className="pdc-title-row">
            <Navigation size={16} className="text-primary-green" />
            <div className="pdc-heading">Dispatch Milestones</div>
          </div>

          <div className="milestones-vertical-list">
            <div className="milestone-v-item done">
              <div className="mv-icon">✓</div>
              <div className="mv-text">
                <strong>Farm Pickup 1 — Chittorgarh (12 MT)</strong>
                <span className="mv-time">07:30 AM • Shree Krishi FPO (Completed)</span>
              </div>
            </div>

            <div className="milestone-v-item done">
              <div className="mv-icon">✓</div>
              <div className="mv-text">
                <strong>Farm Pickup 2 — Tonk Cluster (8 MT)</strong>
                <span className="mv-time">11:15 AM • GreenFields Cooperative (Completed)</span>
              </div>
            </div>

            <div className="milestone-v-item in-progress">
              <div className="mv-icon pulse-active">●</div>
              <div className="mv-text">
                <strong>En Route Highway 79 (Jaipur Corridor)</strong>
                <span className="mv-time">Current: Speed 52 km/h • 4.8°C Cold Chain Maintained</span>
              </div>
            </div>

            <div className="milestone-v-item pending">
              <div className="mv-icon">○</div>
              <div className="mv-text">
                <strong>Jaipur Central Distribution Center</strong>
                <span className="mv-time">ETA: 02:45 PM • Final QC & Escrow Disbursement</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ios-bottom-indicator"></div>
    </div>
  );

  return (
    <div className="buyer-app-container">
      {/* Top Experience Control Strip */}
      <div className="app-experience-bar">
        {/* Step Quick Jump Pills */}
        <div className="step-pills-row">
          <button 
            onClick={() => { setViewMode('single'); setCurrentScreen('home'); }}
            className={`step-pill ${currentScreen === 'home' ? 'active' : ''}`}
          >
            1. Post Demand
          </button>
          <button 
            onClick={() => { setViewMode('single'); setCurrentScreen('matched'); }}
            className={`step-pill ${currentScreen === 'matched' ? 'active' : ''}`}
          >
            2. Matched Suppliers
          </button>
          <button 
            onClick={() => { setViewMode('single'); setCurrentScreen('plan'); }}
            className={`step-pill ${currentScreen === 'plan' ? 'active' : ''}`}
          >
            3. Fulfilment Plan
          </button>
          <button 
            onClick={() => { setViewMode('single'); setCurrentScreen('confirmed'); }}
            className={`step-pill ${currentScreen === 'confirmed' ? 'active' : ''}`}
          >
            4. Order Confirmed
          </button>
          <button 
            onClick={() => { setViewMode('single'); setCurrentScreen('tracking'); }}
            className={`step-pill ${currentScreen === 'tracking' ? 'active' : ''}`}
          >
            5. Live GPS Tracking
          </button>
        </div>

        {/* View Mode Toggle: Single Phone vs 4 Screens */}
        <div className="view-mode-toggle">
          <button 
            onClick={() => setViewMode('single')}
            className={`mode-btn ${viewMode === 'single' ? 'active' : ''}`}
            title="Interactive Single Phone Experience"
          >
            <span>📱 Interactive App</span>
          </button>
          <button 
            onClick={() => setViewMode('multi')}
            className={`mode-btn ${viewMode === 'multi' ? 'active' : ''}`}
            title="View All 4 Screens Side-by-Side"
          >
            <span>📱📱 All 4 Screens View</span>
          </button>
        </div>
      </div>

      {/* VIEW MODE 1: SINGLE INTERACTIVE PHONE */}
      {viewMode === 'single' && (
        <div className="mobile-app-shell">
          <div className="iphone-hardware-frame">
            {/* Top Dynamic Island */}
            <div className="dynamic-island">
              <div className="island-camera"></div>
            </div>

            {/* App Screen */}
            <div className="app-screen">
              {/* iOS Status Bar */}
              <div className="ios-status-bar">
                <span className="ios-clock">9:41</span>
                <div className="ios-icons">
                  <span>📶</span>
                  <span>5G</span>
                  <span>🔋</span>
                </div>
              </div>

              {currentScreen === 'home' && renderScreen1()}
              {currentScreen === 'matched' && renderScreen2()}
              {currentScreen === 'plan' && renderScreen3()}
              {currentScreen === 'confirmed' && renderScreen4()}
              {currentScreen === 'tracking' && renderScreen5()}
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODE 2: ALL 4 SCREENS SIDE-BY-SIDE (Clean, working app - Zero Hackathon/Slide clutter) */}
      {viewMode === 'multi' && (
        <div className="multi-phones-panorama">
          {/* Phone 1 */}
          <div className="iphone-hardware-frame multi-frame">
            <div className="dynamic-island"><div className="island-camera"></div></div>
            <div className="app-screen">
              <div className="ios-status-bar">
                <span className="ios-clock">9:41</span>
                <div className="ios-icons"><span>📶</span><span>🔋</span></div>
              </div>
              {renderScreen1(true)}
            </div>
          </div>

          {/* Phone 2 */}
          <div className="iphone-hardware-frame multi-frame">
            <div className="dynamic-island"><div className="island-camera"></div></div>
            <div className="app-screen">
              <div className="ios-status-bar">
                <span className="ios-clock">9:41</span>
                <div className="ios-icons"><span>📶</span><span>🔋</span></div>
              </div>
              {renderScreen2(true)}
            </div>
          </div>

          {/* Phone 3 */}
          <div className="iphone-hardware-frame multi-frame">
            <div className="dynamic-island"><div className="island-camera"></div></div>
            <div className="app-screen">
              <div className="ios-status-bar">
                <span className="ios-clock">9:47</span>
                <div className="ios-icons"><span>📶</span><span>🔋</span></div>
              </div>
              {renderScreen3(true)}
            </div>
          </div>

          {/* Phone 4 */}
          <div className="iphone-hardware-frame multi-frame">
            <div className="dynamic-island"><div className="island-camera"></div></div>
            <div className="app-screen">
              <div className="ios-status-bar">
                <span className="ios-clock">9:47</span>
                <div className="ios-icons"><span>📶</span><span>🔋</span></div>
              </div>
              {renderScreen4(true)}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .buyer-app-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }

        .app-experience-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          max-width: 1360px;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 12px;
          padding: 0 10px;
        }

        .step-pills-row {
          display: flex;
          gap: 8px;
          overflow-x: auto;
        }

        .step-pill {
          padding: 7px 14px;
          border-radius: 20px;
          font-family: var(--font-heading);
          font-size: 0.78rem;
          font-weight: 700;
          border: 1px solid var(--border-color);
          background: var(--bg-card);
          color: var(--text-secondary);
          cursor: pointer;
          transition: var(--trans-smooth);
          white-space: nowrap;
        }

        .step-pill:hover {
          border-color: #15803d;
          color: #15803d;
        }

        .step-pill.active {
          background: #15803d;
          color: #ffffff;
          border-color: #15803d;
          box-shadow: 0 2px 8px rgba(21, 128, 61, 0.25);
        }

        .view-mode-toggle {
          display: flex;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 10px;
          padding: 3px;
          gap: 4px;
        }

        .mode-btn {
          padding: 6px 12px;
          border-radius: 7px;
          border: none;
          background: transparent;
          font-family: var(--font-heading);
          font-size: 0.76rem;
          font-weight: 700;
          color: var(--text-secondary);
          cursor: pointer;
          transition: var(--trans-smooth);
        }

        .mode-btn.active {
          background: rgba(21, 128, 61, 0.12);
          color: #15803d;
        }

        .mobile-app-shell {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px;
          width: 100%;
        }

        .multi-phones-panorama {
          display: flex;
          gap: 22px;
          overflow-x: auto;
          padding: 10px 16px 30px;
          width: 100%;
          justify-content: center;
        }

        @media (max-width: 1300px) {
          .multi-phones-panorama {
            justify-content: flex-start;
          }
        }

        .iphone-hardware-frame {
          width: 375px;
          min-width: 375px;
          background: #000000;
          border-radius: 46px;
          padding: 10px;
          box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.35), 0 0 0 1px #334155;
          position: relative;
        }

        .multi-frame {
          width: 310px;
          min-width: 310px;
          border-radius: 40px;
          padding: 8px;
        }

        .dynamic-island {
          width: 90px;
          height: 20px;
          background: #000000;
          border-radius: 20px;
          position: absolute;
          top: 15px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: 10px;
        }

        .island-camera {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #1e293b;
        }

        .app-screen {
          background: #ffffff;
          border-radius: 38px;
          overflow: hidden;
          min-height: 680px;
          display: flex;
          flex-direction: column;
          color: #0f172a;
          position: relative;
        }

        .multi-frame .app-screen {
          border-radius: 32px;
          min-height: 620px;
        }

        .ios-status-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 20px 4px;
          font-size: 0.74rem;
          font-weight: 700;
          color: #0f172a;
          background: #ffffff;
          z-index: 20;
        }

        .ios-icons {
          display: flex;
          gap: 4px;
          font-size: 0.68rem;
        }

        .screen-content-wrapper {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .app-nav-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 6px 14px;
          background: #ffffff;
          border-bottom: 1px solid #f1f5f9;
        }

        .app-brand-left {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .brand-dot-check {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #15803d;
          color: #ffffff;
          font-size: 0.65rem;
          font-weight: 900;
        }

        .brand-name-text {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.05rem;
          color: #15803d;
        }

        .app-header-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #475569;
        }

        .back-icon-btn {
          background: transparent;
          border: none;
          color: #0f172a;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
        }

        .screen-nav-title {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 0.95rem;
          color: #0f172a;
        }

        .scrollable-screen-body {
          flex: 1;
          padding: 10px 12px;
          background: #f8fafc;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }

        /* Post Demand Card */
        .demand-input-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 12px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);
        }

        .demand-card-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 10px;
        }

        .d-icon-badge { font-size: 1.2rem; }
        .d-card-title { font-family: var(--font-heading); font-weight: 800; font-size: 0.92rem; color: #0f172a; line-height: 1.1; }
        .d-card-sub { font-size: 0.68rem; color: #64748b; }

        .modern-field-row {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 9px;
          padding: 5px 8px;
          margin-bottom: 7px;
        }

        .f-icon { font-size: 0.95rem; }
        .f-body { flex: 1; display: flex; flex-direction: column; }
        .f-label { font-size: 0.62rem; color: #64748b; font-weight: 600; line-height: 1; }
        .f-select-native, .f-input-native {
          border: none;
          background: transparent;
          font-family: inherit;
          font-weight: 700;
          font-size: 0.8rem;
          color: #0f172a;
          outline: none;
          padding: 1px 0 0;
        }
        .f-arrow { color: #94a3b8; }

        .app-primary-btn {
          width: 100%;
          background: #15803d;
          color: #ffffff;
          border: none;
          border-radius: 10px;
          padding: 10px 14px;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.84rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          margin-top: 8px;
          transition: background 0.2s;
        }
        .app-primary-btn:hover { background: #166534; }

        .app-outline-btn {
          width: 100%;
          background: transparent;
          color: #15803d;
          border: 1.5px solid #15803d;
          border-radius: 10px;
          padding: 8px 14px;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.8rem;
          cursor: pointer;
        }

        .fresh-produce-landscape-card {
          margin-top: auto;
          background: linear-gradient(180deg, #dcfce7 0%, #bbf7d0 100%);
          border-radius: 12px;
          padding: 10px 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.72rem;
          color: #14532d;
          line-height: 1.25;
          margin-top: 12px;
        }
        .fp-tractor { font-size: 1.8rem; }

        /* Matched Suppliers */
        .matched-query-summary {
          font-size: 0.7rem;
          color: #475569;
          text-align: center;
          margin-bottom: 8px;
          line-height: 1.25;
        }

        .filter-tabs-row {
          display: flex;
          gap: 6px;
          margin-bottom: 10px;
          justify-content: center;
        }

        .tab-filter-btn {
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 0.68rem;
          font-weight: 700;
          border: 1px solid #cbd5e1;
          background: #ffffff;
          color: #475569;
          cursor: pointer;
        }
        .tab-filter-btn.active {
          background: #15803d;
          color: #ffffff;
          border-color: #15803d;
        }

        .supplier-item-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 9px 11px;
          margin-bottom: 9px;
        }

        .sic-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 6px;
        }

        .sic-name { font-size: 0.84rem; font-weight: 800; color: #0f172a; line-height: 1.1; }
        .sic-loc { font-size: 0.65rem; color: #64748b; margin-top: 1px; }

        .match-pill {
          padding: 2px 7px;
          border-radius: 999px;
          font-size: 0.68rem;
          font-weight: 700;
        }
        .green-pill {
          background: #dcfce7;
          color: #15803d;
        }

        .sic-body-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
        }

        .crop-photo-wrap {
          width: 46px;
          height: 46px;
          border-radius: 8px;
          overflow: hidden;
          background: #f1f5f9;
          flex-shrink: 0;
        }
        .crop-photo-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .crop-spec-list {
          flex: 1;
          display: flex;
          justify-content: space-between;
          font-size: 0.68rem;
        }

        .csl-item {
          display: flex;
          flex-direction: column;
        }
        .csl-item span { color: #64748b; font-size: 0.62rem; }
        .csl-item strong { font-size: 0.74rem; }

        .select-supplier-btn {
          width: 100%;
          padding: 6px;
          border-radius: 8px;
          border: 1px solid #15803d;
          background: #ffffff;
          color: #15803d;
          font-size: 0.74rem;
          font-weight: 700;
          cursor: pointer;
          transition: var(--trans-smooth);
        }

        .select-supplier-btn.selected {
          background: #15803d;
          color: #ffffff;
        }

        /* Fulfilment Plan Screen */
        .optimal-plan-banner {
          background: #dcfce7;
          border: 1px solid #bbf7d0;
          border-radius: 10px;
          padding: 8px 12px;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 10px;
        }

        .opb-circle-check {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #15803d;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.72rem;
          font-weight: 900;
        }

        .opb-title { font-size: 0.8rem; font-weight: 800; color: #14532d; }
        .opb-sub { font-size: 0.65rem; color: #166534; }

        .plan-tabs-bar {
          display: flex;
          border-bottom: 1px solid #e2e8f0;
          margin-bottom: 10px;
        }

        .pt-btn {
          flex: 1;
          padding: 6px;
          background: transparent;
          border: none;
          font-size: 0.74rem;
          font-weight: 600;
          color: #64748b;
          cursor: pointer;
        }

        .pt-btn.active {
          color: #15803d;
          font-weight: 800;
          border-bottom: 2px solid #15803d;
        }

        .plan-detail-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 10px 12px;
          margin-bottom: 8px;
        }

        .pdc-title-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }
        .pdc-icon { font-size: 1.1rem; }
        .pdc-heading { font-size: 0.82rem; font-weight: 800; color: #0f172a; }
        .pdc-sub { font-size: 0.65rem; color: #64748b; }

        .alloc-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.74rem;
        }
        .alloc-left { display: flex; align-items: center; gap: 6px; }
        .al-name { font-weight: 700; color: #0f172a; }
        .alloc-right { display: flex; gap: 8px; }
        .al-tons { font-weight: 600; color: #475569; }
        .al-price { font-weight: 700; color: #15803d; }

        .route-flow-diagram {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 4px;
        }

        .rf-point { text-align: center; }
        .rf-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #15803d;
          margin: 0 auto 3px;
        }
        .rf-dot.destination { background: #0284c7; }
        .rf-city { font-weight: 800; font-size: 0.72rem; }
        .rf-tonnage { font-size: 0.62rem; color: #64748b; }

        .rf-line {
          flex: 1;
          height: 2px;
          background: #cbd5e1;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .rf-truck {
          position: absolute;
          font-size: 0.85rem;
          top: -10px;
        }

        .storage-card-green {
          background: #f0fdf4;
          border-color: #bbf7d0;
        }
        .text-forest { color: #14532d; }
        .storage-bold-text { font-size: 0.78rem; font-weight: 800; color: #15803d; margin-top: 2px; }
        .storage-sub-text { font-size: 0.65rem; color: #166534; }

        .total-cost-banner-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 8px 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .tcb-left { display: flex; align-items: center; gap: 8px; }
        .tcb-icon { font-size: 1.2rem; }
        .tcb-label { font-size: 0.65rem; color: #64748b; font-weight: 600; }
        .tcb-val { font-size: 1.15rem; font-weight: 800; color: #0f172a; }
        .tcb-badge {
          background: #dcfce7;
          color: #15803d;
          padding: 3px 8px;
          border-radius: 6px;
          font-size: 0.65rem;
          font-weight: 700;
          text-align: right;
          line-height: 1.2;
        }

        /* Screen 4: Order Confirmed */
        .confirmation-celebration-badge {
          margin: 12px auto 8px;
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: #15803d;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 14px rgba(21, 128, 61, 0.3);
        }

        .circle-check-large {
          font-size: 1.8rem;
          color: #ffffff;
          font-weight: 900;
        }

        .confirmed-main-title {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.15rem;
          color: #0f172a;
          margin-bottom: 2px;
        }

        .confirmed-tagline {
          font-size: 0.72rem;
          color: #64748b;
          margin-bottom: 12px;
        }

        .expected-impact-wrapper {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 10px 12px;
          text-align: left;
        }

        .ei-title {
          font-size: 0.76rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 8px;
        }

        .ei-grid-2x2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }

        .ei-cell {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 8px;
          display: flex;
          gap: 6px;
          align-items: flex-start;
        }

        .ei-round-icon {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          flex-shrink: 0;
        }
        .green-soft { background: #dcfce7; }
        .blue-soft { background: #e0f2fe; }
        .amber-soft { background: #fef3c7; }

        .ei-content { display: flex; flex-direction: column; }
        .ei-name { font-size: 0.65rem; color: #64748b; font-weight: 600; }
        .ei-stat { font-size: 0.88rem; font-weight: 800; line-height: 1.1; margin: 1px 0; }
        .ei-desc { font-size: 0.58rem; color: #94a3b8; line-height: 1.1; }

        .confirmed-slogan-footer {
          margin-top: 14px;
          font-size: 0.7rem;
          color: #64748b;
          background: #f0fdf4;
          border: 1px solid #dcfce7;
          border-radius: 8px;
          padding: 8px 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .footer-mini-truck { font-size: 1.2rem; }

        /* Screen 5: Tracking */
        .map-mockup-card {
          height: 130px;
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          border-radius: 12px;
          padding: 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          color: #ffffff;
          position: relative;
          overflow: hidden;
        }

        .map-badge-live {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: rgba(0, 0, 0, 0.4);
          padding: 2px 8px;
          border-radius: 20px;
          font-size: 0.65rem;
          font-weight: 700;
          color: #4ade80;
          width: fit-content;
        }

        .map-eta-box {
          display: flex;
          flex-direction: column;
        }
        .eta-lbl { font-size: 0.6rem; color: #94a3b8; font-weight: 700; }
        .eta-val { font-size: 1.05rem; font-weight: 800; color: #ffffff; }

        .map-graphic-center {
          position: absolute;
          right: 18px;
          top: 50%;
          transform: translateY(-50%);
        }
        .truck-marker {
          font-size: 2.2rem;
          filter: drop-shadow(0 2px 6px rgba(0,0,0,0.5));
          animation: pulseGlow 1.8s infinite;
        }

        .driver-contact-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 8px 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 10px;
        }
        .dc-left { display: flex; align-items: center; gap: 8px; }
        .dc-avatar { font-size: 1.3rem; }
        .dc-name { font-size: 0.78rem; font-weight: 800; color: #0f172a; }
        .dc-vehicle { font-size: 0.65rem; color: #64748b; }
        .dc-call-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          background: #dcfce7;
          color: #15803d;
          padding: 5px 8px;
          border-radius: 6px;
          font-size: 0.68rem;
          font-weight: 700;
          text-decoration: none;
        }

        .milestones-vertical-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding-left: 4px;
          margin-top: 6px;
        }
        .milestone-v-item {
          display: flex;
          gap: 8px;
          align-items: flex-start;
          font-size: 0.7rem;
        }
        .mv-icon {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #e2e8f0;
          color: #64748b;
          font-size: 0.65rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .milestone-v-item.done .mv-icon {
          background: #15803d;
          color: #ffffff;
        }
        .milestone-v-item.in-progress .mv-icon {
          background: #dcfce7;
          color: #15803d;
          border: 1px solid #15803d;
        }
        .mv-text { display: flex; flex-direction: column; }
        .mv-text strong { font-size: 0.74rem; color: #0f172a; }
        .mv-time { font-size: 0.62rem; color: #64748b; margin-top: 1px; }

        /* Bottom Nav Bar */
        .app-bottom-navbar {
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: 6px 0 2px;
          background: #ffffff;
          border-top: 1px solid #f1f5f9;
        }

        .nav-tab-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          background: transparent;
          border: none;
          color: #94a3b8;
          font-size: 0.62rem;
          font-weight: 600;
          cursor: pointer;
        }

        .nav-tab-btn.active {
          color: #15803d;
          font-weight: 800;
        }

        .ios-bottom-indicator {
          width: 110px;
          height: 3px;
          background: #0f172a;
          border-radius: 3px;
          margin: 4px auto 3px;
        }
      `}</style>
    </div>
  );
}
