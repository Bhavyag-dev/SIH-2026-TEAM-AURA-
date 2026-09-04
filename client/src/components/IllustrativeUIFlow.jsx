import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  MapPin, 
  Calendar, 
  Scale, 
  ShieldCheck, 
  Award, 
  Truck, 
  Coins, 
  FileText, 
  Users, 
  Settings, 
  TrendingUp,
  Home,
  Package,
  MessageSquare,
  User,
  Check
} from 'lucide-react';

export default function IllustrativeUIFlow({ onSwitchToLogistics }) {
  // Active states for interactions
  const [selectedSuppliers, setSelectedSuppliers] = useState(['shree', 'greenfields']);
  const [activeTab, setActiveTab] = useState('overview');
  const [supplierTab, setSupplierTab] = useState('all');

  const toggleSupplier = (id) => {
    setSelectedSuppliers(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  return (
    <div className="krishi-slide3-wrapper">
      {/* ========================================================================= */}
      {/* 1. TOP HEADER BRANDING (Exact match with Slide 3 image) */}
      {/* ========================================================================= */}
      <div className="krishi-slide3-header">
        <div className="k-logo-group">
          <div className="k-logo-leaves">
            <svg width="34" height="34" viewBox="0 0 32 32" fill="none">
              <path d="M7 25C7 25 9 17 17 13C25 9 27 6 27 6C27 6 25 15 19 20C13 25 7 25 7 25Z" fill="#15803d"/>
              <path d="M5 26C5 26 5 19 11 15C17 11 19 8 19 8C19 8 18 15 14 19C10 23 5 26 5 26Z" fill="#22c55e"/>
            </svg>
          </div>
          <div>
            <div className="k-logo-title">KrishiRoute</div>
            <div className="k-logo-tagline">Connect • Optimize • Nourish</div>
          </div>
        </div>

        <div className="k-header-slogan">
          <span>Smarter Routes. Stronger Farmers. A Greener Tomorrow.</span>
          <span className="slogan-leaf">🍃</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. NUMBERED STEP HEADERS WITH CONNECTOR ARROWS (1 -> 2 -> 3 -> 4) */}
      {/* ========================================================================= */}
      <div className="step-headers-grid">
        {/* Step 1 */}
        <div className="step-header-col">
          <div className="step-badge-row">
            <div className="step-num-badge">1</div>
            <div>
              <div className="step-badge-title">Create Demand</div>
              <div className="step-badge-sub">Buyer enters crop and requirements</div>
            </div>
          </div>
        </div>

        <div className="step-arrow-col">➔</div>

        {/* Step 2 */}
        <div className="step-header-col">
          <div className="step-badge-row">
            <div className="step-num-badge">2</div>
            <div>
              <div className="step-badge-title">View Matched Supply</div>
              <div className="step-badge-sub">AI matches the best farmers/FPOs</div>
            </div>
          </div>
        </div>

        <div className="step-arrow-col">➔</div>

        {/* Step 3 */}
        <div className="step-header-col">
          <div className="step-badge-row">
            <div className="step-num-badge">3</div>
            <div>
              <div className="step-badge-title">Optimized Plan</div>
              <div className="step-badge-sub">Best supply, route and storage plan</div>
            </div>
          </div>
        </div>

        <div className="step-arrow-col">➔</div>

        {/* Step 4 */}
        <div className="step-header-col">
          <div className="step-badge-row">
            <div className="step-num-badge">4</div>
            <div>
              <div className="step-badge-title">Results & Impact</div>
              <div className="step-badge-sub">Better for farmers and buyers</div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. THE 4 PIXEL-PERFECT IPHONE MOCKUPS */}
      {/* ========================================================================= */}
      <div className="phones-canvas-row">
        
        {/* ----------------------------------------------------------------------- */}
        {/* PHONE 1: CREATE DEMAND */}
        {/* ----------------------------------------------------------------------- */}
        <div className="iphone-bezel">
          <div className="dynamic-island"></div>
          
          <div className="phone-screen">
            {/* Top iOS Status Bar */}
            <div className="ios-bar">
              <span className="ios-time">9:41</span>
              <div className="ios-icons">
                <span>📶</span>
                <span>🔋</span>
              </div>
            </div>

            {/* App Nav */}
            <div className="screen-nav">
              <div className="screen-nav-brand">
                <span className="brand-dot-check">✓</span>
                <strong>KrishiRoute</strong>
              </div>
              <div className="screen-nav-profile">👤</div>
            </div>

            <div className="screen-body">
              {/* Post Your Demand Card */}
              <div className="phone-card">
                <div className="card-header-icon-row">
                  <span className="ch-icon">🏬</span>
                  <div>
                    <div className="ch-title">Post Your Demand</div>
                    <div className="ch-sub">Find the best supply, route and price</div>
                  </div>
                </div>

                {/* Field 1: Crop */}
                <div className="p-input-row">
                  <span className="pi-icon">🍅</span>
                  <div className="pi-field">
                    <span className="pi-label">Crop</span>
                    <span className="pi-val">Tomato</span>
                  </div>
                  <span className="pi-chevron">⌵</span>
                </div>

                {/* Field 2: Quantity */}
                <div className="p-input-row">
                  <span className="pi-icon">⚖️</span>
                  <div className="pi-field">
                    <span className="pi-label">Quantity (in tons)</span>
                    <span className="pi-val">20</span>
                  </div>
                  <span className="pi-chevron">⌵</span>
                </div>

                {/* Field 3: Quality */}
                <div className="p-input-row">
                  <span className="pi-icon">🎖️</span>
                  <div className="pi-field">
                    <span className="pi-label">Quality Grade</span>
                    <span className="pi-val">A (Premium)</span>
                  </div>
                  <span className="pi-chevron">⌵</span>
                </div>

                {/* Field 4: Location */}
                <div className="p-input-row">
                  <span className="pi-icon text-green">📍</span>
                  <div className="pi-field">
                    <span className="pi-label">Delivery Location</span>
                    <span className="pi-val">Jaipur, Rajasthan</span>
                  </div>
                  <span className="pi-chevron">⌵</span>
                </div>

                {/* Field 5: Date */}
                <div className="p-input-row">
                  <span className="pi-icon text-green">📅</span>
                  <div className="pi-field">
                    <span className="pi-label">Preferred Delivery Date</span>
                    <span className="pi-val">25 Sep 2025</span>
                  </div>
                  <span className="pi-chevron">⌵</span>
                </div>

                {/* Green Submit Button */}
                <button className="phone-btn-green">
                  <span>Find Suppliers</span>
                  <ArrowRight size={15} />
                </button>
              </div>

              {/* Bottom Landscape Tractor Illustration */}
              <div className="phone-illustration-box">
                <div className="illus-text">
                  <strong>Fresh produce</strong><br />
                  Stronger connections<br />
                  Better tomorrows
                </div>
                <div className="illus-graphic">
                  🚜
                </div>
              </div>
            </div>

            {/* iOS Bottom Home Bar & Navigation */}
            <div className="phone-bottom-tabs">
              <div className="tab-item active">
                <Home size={16} />
                <span>Home</span>
              </div>
              <div className="tab-item">
                <Package size={16} />
                <span>Orders</span>
              </div>
              <div className="tab-item">
                <MessageSquare size={16} />
                <span>Messages</span>
              </div>
              <div className="tab-item">
                <User size={16} />
                <span>Profile</span>
              </div>
            </div>
            <div className="ios-indicator"></div>
          </div>
        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* PHONE 2: VIEW MATCHED SUPPLY */}
        {/* ----------------------------------------------------------------------- */}
        <div className="iphone-bezel">
          <div className="dynamic-island"></div>
          
          <div className="phone-screen">
            <div className="ios-bar">
              <span className="ios-time">9:41</span>
              <div className="ios-icons">
                <span>📶</span>
                <span>🔋</span>
              </div>
            </div>

            <div className="screen-nav">
              <div className="screen-back-btn">‹</div>
              <strong style={{ fontSize: '0.92rem' }}>Matched Suppliers</strong>
              <div style={{ width: 20 }}></div>
            </div>

            <div className="screen-body">
              <div className="matched-query-text">
                Showing best matches for your demand<br />
                <strong>Tomato | 20 tons | Jaipur | 25 Sep 2025</strong>
              </div>

              {/* Filter Pills */}
              <div className="filter-pills-strip">
                <button 
                  onClick={() => setSupplierTab('all')} 
                  className={`fp-btn ${supplierTab === 'all' ? 'active' : ''}`}
                >
                  All Matches (5)
                </button>
                <button 
                  onClick={() => setSupplierTab('fpo')} 
                  className={`fp-btn ${supplierTab === 'fpo' ? 'active' : ''}`}
                >
                  FPOs (3)
                </button>
                <button 
                  onClick={() => setSupplierTab('farmer')} 
                  className={`fp-btn ${supplierTab === 'farmer' ? 'active' : ''}`}
                >
                  Farmers (2)
                </button>
              </div>

              {/* Supplier 1: Shree Krishi FPO */}
              <div className="supplier-card-p2">
                <div className="sc-top">
                  <div>
                    <div className="sc-name">Shree Krishi FPO</div>
                    <div className="sc-loc">📍 Chittorgarh, Rajasthan</div>
                  </div>
                  <span className="match-tag green-tag">92% Match</span>
                </div>

                <div className="sc-content-row">
                  <div className="tomato-thumb">
                    <img 
                      src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=160&auto=format&fit=crop&q=80" 
                      alt="Tomatoes" 
                    />
                  </div>
                  <div className="sc-specs">
                    <div className="spec-item">
                      <span className="sp-label">Available Quantity</span>
                      <span className="sp-val">25 tons</span>
                    </div>
                    <div className="spec-item">
                      <span className="sp-label">Price</span>
                      <span className="sp-val font-bold">₹18/kg</span>
                    </div>
                    <div className="spec-item">
                      <span className="sp-label">Quality Grade</span>
                      <span className="sp-val font-bold">A</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => toggleSupplier('shree')} 
                  className={`sc-btn ${selectedSuppliers.includes('shree') ? 'selected' : ''}`}
                >
                  {selectedSuppliers.includes('shree') ? 'Selected ✓' : 'Select'}
                </button>
              </div>

              {/* Supplier 2: GreenFields Cooperative */}
              <div className="supplier-card-p2">
                <div className="sc-top">
                  <div>
                    <div className="sc-name">GreenFields Cooperative</div>
                    <div className="sc-loc">📍 Tonk, Rajasthan</div>
                  </div>
                  <span className="match-tag green-tag">88% Match</span>
                </div>

                <div className="sc-content-row">
                  <div className="tomato-thumb">
                    <img 
                      src="https://images.unsplash.com/photo-1582284540020-8acbe03f4924?w=160&auto=format&fit=crop&q=80" 
                      alt="Tomatoes" 
                    />
                  </div>
                  <div className="sc-specs">
                    <div className="spec-item">
                      <span className="sp-label">Available Quantity</span>
                      <span className="sp-val">20 tons</span>
                    </div>
                    <div className="spec-item">
                      <span className="sp-label">Price</span>
                      <span className="sp-val font-bold">₹19/kg</span>
                    </div>
                    <div className="spec-item">
                      <span className="sp-label">Quality Grade</span>
                      <span className="sp-val font-bold">A</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => toggleSupplier('greenfields')} 
                  className={`sc-btn ${selectedSuppliers.includes('greenfields') ? 'selected' : ''}`}
                >
                  {selectedSuppliers.includes('greenfields') ? 'Selected ✓' : 'Select'}
                </button>
              </div>

              {/* Supplier 3: Kisan Pragati FPO */}
              <div className="supplier-card-p2">
                <div className="sc-top">
                  <div>
                    <div className="sc-name">Kisan Pragati FPO</div>
                    <div className="sc-loc">📍 Sikar, Rajasthan</div>
                  </div>
                  <span className="match-tag green-tag">85% Match</span>
                </div>

                <div className="sc-content-row">
                  <div className="tomato-thumb">
                    <img 
                      src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=160&auto=format&fit=crop&q=80" 
                      alt="Tomatoes" 
                    />
                  </div>
                  <div className="sc-specs">
                    <div className="spec-item">
                      <span className="sp-label">Available Quantity</span>
                      <span className="sp-val">30 tons</span>
                    </div>
                    <div className="spec-item">
                      <span className="sp-label">Price</span>
                      <span className="sp-val font-bold">₹20/kg</span>
                    </div>
                    <div className="spec-item">
                      <span className="sp-label">Quality Grade</span>
                      <span className="sp-val font-bold">A</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => toggleSupplier('pragati')} 
                  className={`sc-btn ${selectedSuppliers.includes('pragati') ? 'selected' : ''}`}
                >
                  {selectedSuppliers.includes('pragati') ? 'Selected ✓' : 'Select'}
                </button>
              </div>
            </div>

            <div className="ios-indicator"></div>
          </div>
        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* PHONE 3: OPTIMIZED PLAN */}
        {/* ----------------------------------------------------------------------- */}
        <div className="iphone-bezel">
          <div className="dynamic-island"></div>
          
          <div className="phone-screen">
            <div className="ios-bar">
              <span className="ios-time">9:47</span>
              <div className="ios-icons">
                <span>📶</span>
                <span>🔋</span>
              </div>
            </div>

            <div className="screen-nav">
              <div className="screen-back-btn">‹</div>
              <strong style={{ fontSize: '0.92rem' }}>Fulfilment Plan</strong>
              <div style={{ width: 20 }}></div>
            </div>

            <div className="screen-body">
              {/* Optimal Plan Banner */}
              <div className="optimal-plan-pill-banner">
                <span className="opt-check-badge">✓</span>
                <div>
                  <div className="opp-title">Optimal plan generated</div>
                  <div className="opp-sub">Lowest cost • Less waste • On-time delivery</div>
                </div>
              </div>

              {/* Subtabs: Overview / Route / Storage */}
              <div className="plan-subtabs-row">
                <button 
                  onClick={() => setActiveTab('overview')} 
                  className={`p-subtab ${activeTab === 'overview' ? 'active' : ''}`}
                >
                  Overview
                </button>
                <button 
                  onClick={() => setActiveTab('route')} 
                  className={`p-subtab ${activeTab === 'route' ? 'active' : ''}`}
                >
                  Route
                </button>
                <button 
                  onClick={() => setActiveTab('storage')} 
                  className={`p-subtab ${activeTab === 'storage' ? 'active' : ''}`}
                >
                  Storage
                </button>
              </div>

              {/* Section 1: Supply Allocation */}
              <div className="plan-block">
                <div className="block-title-row">
                  <span className="b-icon">📦</span>
                  <div>
                    <div className="b-title">Supply Allocation</div>
                    <div className="b-sub">2 suppliers | 20 tons</div>
                  </div>
                </div>

                <div className="supplier-alloc-row">
                  <div className="alloc-left">
                    <span className="tomato-mini">🍅</span>
                    <div>
                      <div className="sa-name">Shree Krishi FPO</div>
                      <div className="sa-tons">12 tons</div>
                    </div>
                  </div>
                  <div className="alloc-right">
                    <div className="sa-qty">12 tons</div>
                    <div className="sa-rate">₹18/kg</div>
                  </div>
                </div>

                <div className="supplier-alloc-row" style={{ marginTop: 6 }}>
                  <div className="alloc-left">
                    <span className="tomato-mini">🍅</span>
                    <div>
                      <div className="sa-name">GreenFields Cooperative</div>
                    </div>
                  </div>
                  <div className="alloc-right">
                    <div className="sa-qty">8 tons</div>
                    <div className="sa-rate">₹19/kg</div>
                  </div>
                </div>
              </div>

              {/* Section 2: Route Plan */}
              <div className="plan-block">
                <div className="block-title-row">
                  <span className="b-icon">🗺️</span>
                  <div>
                    <div className="b-title">Route Plan</div>
                    <div className="b-sub">Total Distance: 620 km | Estimated Time: 11 hours</div>
                  </div>
                </div>

                {/* Route Track Graphic */}
                <div className="route-stops-track">
                  <div className="stop-pt">
                    <div className="pt-circle"></div>
                    <div className="pt-label">Chittorgarh</div>
                    <div className="pt-sub">(12 tons)</div>
                  </div>

                  <div className="route-line-segment">
                    <div className="truck-marker">🚚</div>
                  </div>

                  <div className="stop-pt">
                    <div className="pt-circle"></div>
                    <div className="pt-label">Tonk</div>
                    <div className="pt-sub">(8 tons)</div>
                  </div>

                  <div className="route-line-segment"></div>

                  <div className="stop-pt">
                    <div className="pt-circle green"></div>
                    <div className="pt-label">Jaipur</div>
                    <div className="pt-sub">(Delivery)</div>
                  </div>
                </div>
              </div>

              {/* Section 3: Storage Decision */}
              <div className="plan-block storage-block">
                <div className="block-title-row">
                  <span className="b-icon">🏬</span>
                  <div>
                    <div className="b-title">Storage Decision</div>
                    <div className="storage-status-bold">No storage required</div>
                    <div className="storage-sub">Direct delivery within 24 hours</div>
                  </div>
                </div>
              </div>

              {/* Section 4: Estimated Total Cost */}
              <div className="total-cost-card">
                <div className="tc-left">
                  <span className="tc-icon">🪙</span>
                  <div>
                    <div className="tc-label">Estimated Total Cost</div>
                    <div className="tc-val">₹3,68,000</div>
                  </div>
                </div>
                <div className="tc-badge-save">
                  12% lower<br />than market rate
                </div>
              </div>
            </div>

            <div className="ios-indicator"></div>
          </div>
        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* PHONE 4: RESULTS & IMPACT */}
        {/* ----------------------------------------------------------------------- */}
        <div className="iphone-bezel">
          <div className="dynamic-island"></div>
          
          <div className="phone-screen">
            <div className="ios-bar">
              <span className="ios-time">9:47</span>
              <div className="ios-icons">
                <span>📶</span>
                <span>🔋</span>
              </div>
            </div>

            <div className="screen-nav">
              <div className="screen-back-btn">‹</div>
              <strong style={{ fontSize: '0.92rem' }}>Order Confirmed</strong>
              <div style={{ width: 20 }}></div>
            </div>

            <div className="screen-body" style={{ textAlign: 'center' }}>
              {/* Green Check with Confetti */}
              <div className="confirmed-confetti-circle">
                <div className="confetti-sparks">🎉</div>
                <div className="green-checkmark-circle">✓</div>
              </div>

              <div className="confirmed-headline">Your Order is Confirmed!</div>
              <div className="confirmed-sub">
                Fresh produce is on its way to a better tomorrow.
              </div>

              {/* Expected Impact 2x2 Grid */}
              <div className="expected-impact-box">
                <div className="eib-heading">Expected Impact</div>

                <div className="impact-2x2-grid">
                  {/* Quad 1 */}
                  <div className="impact-cell">
                    <div className="ic-icon green-bg">🌱</div>
                    <div className="ic-text">
                      <div className="ic-name">Farmer Realization</div>
                      <div className="ic-val text-green">↑ 18%</div>
                      <div className="ic-sub">Higher income for farmers</div>
                    </div>
                  </div>

                  {/* Quad 2 */}
                  <div className="impact-cell">
                    <div className="ic-icon green-bg">₹</div>
                    <div className="ic-text">
                      <div className="ic-name">Buyer Landed Cost</div>
                      <div className="ic-val text-green">↓ 12%</div>
                      <div className="ic-sub">Lower cost for buyers</div>
                    </div>
                  </div>

                  {/* Quad 3 */}
                  <div className="impact-cell">
                    <div className="ic-icon green-bg">♻️</div>
                    <div className="ic-text">
                      <div className="ic-name">Food Waste</div>
                      <div className="ic-val text-green">↓ 25%</div>
                      <div className="ic-sub">Less wastage in supply chain</div>
                    </div>
                  </div>

                  {/* Quad 4 */}
                  <div className="impact-cell">
                    <div className="ic-icon green-bg">🚚</div>
                    <div className="ic-text">
                      <div className="ic-name">Delivery Time</div>
                      <div className="ic-val text-green">On-time</div>
                      <div className="ic-sub">Optimized route and logistics</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Track Shipment & View Details Buttons */}
              <button 
                onClick={onSwitchToLogistics} 
                className="phone-btn-green" 
                style={{ marginTop: 14 }}
              >
                <span>Track Shipment</span>
                <ArrowRight size={15} />
              </button>

              <button className="phone-btn-outline" style={{ marginTop: 8 }}>
                View Order Details
              </button>

              {/* Quote & Landscape Illustration */}
              <div className="final-quote-strip">
                "Efficient supply chains for a brighter, greener future."
              </div>

              <div className="phone-illustration-box-farm">
                <div className="field-truck">🚚</div>
              </div>
            </div>

            <div className="ios-indicator"></div>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 4. BOTTOM PROCESS FLOW TRACKER (Exact match with Slide 3 footer) */}
      {/* ========================================================================= */}
      <div className="krishi-slide3-footer-tracker">
        <div className="tracker-steps-line">
          <div className="t-step">
            <div className="t-icon">
              <FileText size={18} />
            </div>
            <div className="t-label">Demand Created</div>
          </div>

          <div className="t-dotted-line"></div>

          <div className="t-step">
            <div className="t-icon">
              <Users size={18} />
            </div>
            <div className="t-label">Suppliers Matched</div>
          </div>

          <div className="t-dotted-line"></div>

          <div className="t-step">
            <div className="t-icon">
              <Settings size={18} />
            </div>
            <div className="t-label">Optimized Plan Generated</div>
          </div>

          <div className="t-dotted-line"></div>

          <div className="t-step">
            <div className="t-icon">
              <TrendingUp size={18} />
            </div>
            <div className="t-label">Better Outcomes</div>
          </div>
        </div>

        <div className="tracker-slogan">
          <span>From Fields to Futures</span>
          <span style={{ fontSize: '1rem' }}>🍃</span>
        </div>
      </div>

      <style>{`
        /* Root container matching Slide 3 Mint/White background */
        .krishi-slide3-wrapper {
          background: linear-gradient(180deg, #f0fdf4 0%, #ffffff 40%, #f0fdf4 100%);
          border-radius: 24px;
          padding: 28px 24px 20px;
          margin-top: 16px;
          border: 1px solid #dcfce7;
          box-shadow: 0 4px 24px rgba(22, 163, 74, 0.06);
          position: relative;
        }

        /* Top Header */
        .krishi-slide3-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .k-logo-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .k-logo-title {
          font-family: var(--font-heading);
          font-size: 1.7rem;
          font-weight: 800;
          color: #15803d;
          line-height: 1;
        }

        .k-logo-tagline {
          font-size: 0.8rem;
          color: #475569;
          font-weight: 600;
          letter-spacing: 0.02em;
        }

        .k-header-slogan {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.95rem;
          color: #0f172a;
        }

        /* Step Headers Row */
        .step-headers-grid {
          display: grid;
          grid-template-columns: 1fr 30px 1fr 30px 1fr 30px 1fr;
          align-items: center;
          gap: 6px;
          margin-bottom: 24px;
        }

        @media (max-width: 1100px) {
          .step-headers-grid {
            display: none;
          }
        }

        .step-badge-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .step-num-badge {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #15803d;
          color: #ffffff;
          font-weight: 800;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .step-badge-title {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 0.95rem;
          color: #0f172a;
        }

        .step-badge-sub {
          font-size: 0.74rem;
          color: #64748b;
          line-height: 1.2;
        }

        .step-arrow-col {
          text-align: center;
          color: #22c55e;
          font-size: 1.3rem;
          font-weight: 800;
        }

        /* Phones Grid Row */
        .phones-canvas-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          align-items: stretch;
        }

        @media (max-width: 1200px) {
          .phones-canvas-row {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 680px) {
          .phones-canvas-row {
            grid-template-columns: 1fr;
          }
        }

        /* iPhone Bezel Styling */
        .iphone-bezel {
          background: #000000;
          border-radius: 38px;
          padding: 8px;
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.25), 0 0 0 1px #334155;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .dynamic-island {
          width: 84px;
          height: 18px;
          background: #000000;
          border-radius: 20px;
          position: absolute;
          top: 14px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 20;
        }

        .phone-screen {
          background: #ffffff;
          border-radius: 30px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          flex: 1;
          min-height: 640px;
          position: relative;
          color: #0f172a;
        }

        .ios-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 18px 4px;
          font-size: 0.74rem;
          font-weight: 700;
          color: #0f172a;
          background: #ffffff;
          z-index: 10;
        }

        .ios-icons {
          display: flex;
          gap: 4px;
          font-size: 0.7rem;
        }

        .screen-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 6px 14px 8px;
          background: #ffffff;
          border-bottom: 1px solid #f1f5f9;
        }

        .screen-nav-brand {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #15803d;
          font-size: 0.95rem;
        }

        .brand-dot-check {
          background: #16a34a;
          color: #ffffff;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 0.65rem;
          font-weight: 900;
        }

        .screen-back-btn {
          font-size: 1.4rem;
          font-weight: 700;
          line-height: 1;
          cursor: pointer;
          color: #0f172a;
        }

        .screen-body {
          padding: 10px 12px;
          flex: 1;
          display: flex;
          flex-direction: column;
          background: #f8fafc;
          overflow-y: auto;
        }

        .ios-indicator {
          width: 90px;
          height: 4px;
          background: #0f172a;
          border-radius: 4px;
          margin: 6px auto 6px;
        }

        /* Phone 1 Specific */
        .phone-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 10px 10px 12px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.03);
        }

        .card-header-icon-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 10px;
        }

        .ch-icon { font-size: 1.2rem; }
        .ch-title { font-size: 0.86rem; font-weight: 800; color: #0f172a; line-height: 1.1; }
        .ch-sub { font-size: 0.68rem; color: #64748b; }

        .p-input-row {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 5px 8px;
          margin-bottom: 6px;
        }

        .pi-icon { font-size: 0.95rem; }
        .pi-field { flex: 1; display: flex; flex-direction: column; }
        .pi-label { font-size: 0.62rem; color: #64748b; font-weight: 600; line-height: 1; }
        .pi-val { font-size: 0.78rem; font-weight: 700; color: #0f172a; margin-top: 1px; }
        .pi-chevron { font-size: 0.72rem; color: #94a3b8; }

        .phone-btn-green {
          width: 100%;
          background: #15803d;
          color: #ffffff;
          border: none;
          border-radius: 8px;
          padding: 9px 12px;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.84rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          cursor: pointer;
          margin-top: 8px;
          transition: background 0.2s;
        }
        .phone-btn-green:hover { background: #166534; }

        .phone-btn-outline {
          width: 100%;
          background: transparent;
          color: #15803d;
          border: 1px solid #15803d;
          border-radius: 8px;
          padding: 8px 12px;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.8rem;
          cursor: pointer;
        }

        .phone-illustration-box {
          margin-top: auto;
          background: linear-gradient(180deg, #dcfce7 0%, #bbf7d0 100%);
          border-radius: 12px;
          padding: 10px 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.7rem;
          color: #14532d;
          line-height: 1.3;
          margin-top: 10px;
        }

        .illus-graphic { font-size: 1.6rem; }

        .phone-bottom-tabs {
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: 6px 0 2px;
          border-top: 1px solid #f1f5f9;
          background: #ffffff;
        }

        .tab-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 0.62rem;
          color: #94a3b8;
        }
        .tab-item.active { color: #15803d; font-weight: 700; }

        /* Phone 2 Specific */
        .matched-query-text {
          font-size: 0.68rem;
          color: #475569;
          text-align: center;
          margin-bottom: 8px;
          line-height: 1.3;
        }

        .filter-pills-strip {
          display: flex;
          gap: 4px;
          margin-bottom: 8px;
          justify-content: center;
        }

        .fp-btn {
          padding: 3px 8px;
          border-radius: 999px;
          font-size: 0.65rem;
          font-weight: 700;
          border: 1px solid #cbd5e1;
          background: #ffffff;
          color: #475569;
          cursor: pointer;
        }
        .fp-btn.active {
          background: #15803d;
          color: #ffffff;
          border-color: #15803d;
        }

        .supplier-card-p2 {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 8px 10px;
          margin-bottom: 8px;
        }

        .sc-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 6px;
        }

        .sc-name { font-size: 0.8rem; font-weight: 800; color: #0f172a; line-height: 1.1; }
        .sc-loc { font-size: 0.65rem; color: #64748b; }

        .match-tag {
          font-size: 0.64rem;
          font-weight: 800;
          padding: 2px 6px;
          border-radius: 4px;
        }
        .green-tag { background: #dcfce7; color: #15803d; }

        .sc-content-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 6px;
        }

        .tomato-thumb {
          width: 48px;
          height: 48px;
          border-radius: 8px;
          overflow: hidden;
          flex-shrink: 0;
        }
        .tomato-thumb img { width: 100%; height: 100%; object-fit: cover; }

        .sc-specs {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr;
          gap: 2px;
          font-size: 0.68rem;
          color: #334155;
        }

        .spec-item {
          display: flex;
          justify-content: space-between;
        }

        .sc-btn {
          width: 100%;
          background: #15803d;
          color: #ffffff;
          border: none;
          border-radius: 6px;
          padding: 5px;
          font-size: 0.74rem;
          font-weight: 700;
          cursor: pointer;
        }
        .sc-btn.selected { background: #166534; }

        /* Phone 3 Specific */
        .optimal-plan-pill-banner {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #dcfce7;
          border: 1px solid #86efac;
          border-radius: 10px;
          padding: 6px 10px;
          margin-bottom: 8px;
        }

        .opt-check-badge {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #15803d;
          color: #fff;
          font-size: 0.7rem;
          font-weight: 900;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .opp-title { font-size: 0.76rem; font-weight: 800; color: #14532d; line-height: 1.1; }
        .opp-sub { font-size: 0.62rem; color: #166534; }

        .plan-subtabs-row {
          display: flex;
          border-bottom: 1px solid #e2e8f0;
          margin-bottom: 8px;
        }

        .p-subtab {
          flex: 1;
          text-align: center;
          padding: 4px 0;
          font-size: 0.72rem;
          font-weight: 700;
          color: #64748b;
          border: none;
          background: transparent;
          cursor: pointer;
        }
        .p-subtab.active {
          color: #15803d;
          border-bottom: 2px solid #15803d;
        }

        .plan-block {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 8px 10px;
          margin-bottom: 8px;
        }

        .block-title-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
        }

        .b-icon { font-size: 1rem; }
        .b-title { font-size: 0.78rem; font-weight: 800; color: #0f172a; line-height: 1.1; }
        .b-sub { font-size: 0.64rem; color: #64748b; }

        .supplier-alloc-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.72rem;
          padding-top: 4px;
        }

        .alloc-left { display: flex; align-items: center; gap: 6px; }
        .tomato-mini { font-size: 0.8rem; }
        .sa-name { font-weight: 700; color: #0f172a; }
        .sa-tons { font-size: 0.62rem; color: #64748b; }
        .alloc-right { text-align: right; }
        .sa-qty { font-weight: 700; }
        .sa-rate { font-size: 0.65rem; color: #64748b; }

        .route-stops-track {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 4px 4px;
          margin-top: 4px;
        }

        .stop-pt { text-align: center; }
        .pt-circle {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #15803d;
          margin: 0 auto 3px;
        }
        .pt-circle.green { background: #16a34a; }
        .pt-label { font-size: 0.64rem; font-weight: 700; color: #0f172a; }
        .pt-sub { font-size: 0.58rem; color: #64748b; }

        .route-line-segment {
          flex: 1;
          height: 2px;
          background: #22c55e;
          position: relative;
          margin: 0 4px;
        }

        .truck-marker {
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 0.8rem;
        }

        .storage-block { background: #f0fdf4; border-color: #bbf7d0; }
        .storage-status-bold { font-size: 0.74rem; font-weight: 800; color: #15803d; }
        .storage-sub { font-size: 0.64rem; color: #166534; }

        .total-cost-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 8px 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
        }

        .tc-left { display: flex; align-items: center; gap: 8px; }
        .tc-icon { font-size: 1.3rem; }
        .tc-label { font-size: 0.62rem; color: #64748b; font-weight: 600; }
        .tc-val { font-family: var(--font-heading); font-size: 1.1rem; font-weight: 800; color: #0f172a; line-height: 1; }
        .tc-badge-save {
          background: #dcfce7;
          color: #15803d;
          font-size: 0.62rem;
          font-weight: 800;
          padding: 4px 6px;
          border-radius: 6px;
          text-align: right;
          line-height: 1.2;
        }

        /* Phone 4 Specific */
        .confirmed-confetti-circle {
          position: relative;
          width: 54px;
          height: 54px;
          margin: 8px auto 4px;
        }

        .confetti-sparks {
          position: absolute;
          top: -8px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 1.1rem;
        }

        .green-checkmark-circle {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #15803d;
          color: #ffffff;
          font-size: 1.6rem;
          font-weight: 900;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
        }

        .confirmed-headline {
          font-family: var(--font-heading);
          font-size: 1rem;
          font-weight: 800;
          color: #0f172a;
          margin-top: 4px;
        }

        .confirmed-sub {
          font-size: 0.68rem;
          color: #64748b;
          margin-bottom: 10px;
        }

        .expected-impact-box {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 10px 8px;
          text-align: left;
        }

        .eib-heading {
          font-size: 0.74rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 8px;
        }

        .impact-2x2-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 6px;
        }

        .impact-cell {
          background: #f8fafc;
          border-radius: 8px;
          padding: 6px;
          display: flex;
          gap: 6px;
          align-items: flex-start;
        }

        .ic-icon {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.72rem;
          flex-shrink: 0;
        }
        .green-bg { background: #dcfce7; color: #15803d; }

        .ic-name { font-size: 0.6rem; color: #64748b; font-weight: 600; line-height: 1.1; }
        .ic-val { font-family: var(--font-heading); font-size: 0.95rem; font-weight: 800; line-height: 1.2; margin: 1px 0; }
        .ic-sub { font-size: 0.55rem; color: #94a3b8; line-height: 1; }

        .final-quote-strip {
          font-size: 0.65rem;
          font-style: italic;
          color: #475569;
          margin-top: 10px;
        }

        .phone-illustration-box-farm {
          margin-top: auto;
          background: linear-gradient(180deg, #dcfce7 0%, #a7f3d0 100%);
          border-radius: 12px;
          height: 36px;
          position: relative;
          overflow: hidden;
          margin-top: 8px;
        }

        .field-truck {
          position: absolute;
          bottom: 4px;
          right: 18px;
          font-size: 1.2rem;
        }

        /* Bottom Process Flow Tracker (Footer) */
        .krishi-slide3-footer-tracker {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 28px;
          padding-top: 18px;
          border-top: 1px solid #dcfce7;
          flex-wrap: wrap;
          gap: 16px;
        }

        .tracker-steps-line {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .t-step {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .t-icon {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #15803d;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .t-label {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.84rem;
          color: #0f172a;
        }

        .t-dotted-line {
          width: 40px;
          height: 2px;
          border-top: 2px dashed #86efac;
        }

        @media (max-width: 900px) {
          .t-dotted-line { display: none; }
        }

        .tracker-slogan {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 0.92rem;
          color: #15803d;
        }
      `}</style>
    </div>
  );
}
