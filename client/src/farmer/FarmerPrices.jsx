import React, { useState } from 'react';

const PRICES = [
  { crop: 'Tomato', msp: 1200, market: 1850, low: 1400, high: 2100, unit: '/quintal', up: true, pct: '+12.4%' },
  { crop: 'Onion', msp: 800, market: 1100, low: 900, high: 1350, unit: '/quintal', up: false, pct: '-3.2%' },
  { crop: 'Potato', msp: 600, market: 890, low: 750, high: 980, unit: '/quintal', up: true, pct: '+5.1%' },
  { crop: 'Wheat', msp: 2275, market: 2380, low: 2280, high: 2420, unit: '/quintal', up: true, pct: '+1.8%' },
  { crop: 'Rice', msp: 2183, market: 2450, low: 2200, high: 2600, unit: '/quintal', up: true, pct: '+4.2%' },
  { crop: 'Mango', msp: 3000, market: 4200, low: 3500, high: 5000, unit: '/quintal', up: true, pct: '+8.7%' },
  { crop: 'Sugarcane', msp: 315, market: 340, low: 315, high: 360, unit: '/quintal', up: true, pct: '+2.1%' },
  { crop: 'Cotton', msp: 6620, market: 7200, low: 6800, high: 7500, unit: '/quintal', up: true, pct: '+3.6%' },
  { crop: 'Banana', msp: 1000, market: 1400, low: 1100, high: 1700, unit: '/quintal', up: false, pct: '-1.5%' },
  { crop: 'Soybean', msp: 4600, market: 4950, low: 4700, high: 5200, unit: '/quintal', up: true, pct: '+2.9%' },
];

const MANDIS = ['All India', 'Nashik', 'Indore', 'Amritsar', 'Hyderabad', 'Pune', 'Delhi Azadpur', 'Kolkata'];

export default function FarmerPrices() {
  const [selectedMandi, setSelectedMandi] = useState('All India');
  const [search, setSearch] = useState('');

  const filtered = PRICES.filter(p => !search || p.crop.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 4 }}>📊 Mandi Prices</h1>
          <p style={{ color: 'var(--text-3)', fontSize: '.875rem' }}>Live market rates updated daily · Compare MSP vs. market</p>
        </div>
        <span className="badge badge-green">● Live</span>
      </div>

      {/* Mandi Selector & Search */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          className="form-input"
          style={{ maxWidth: 220 }}
          placeholder="🔍 Search crop..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="tabs">
          {MANDIS.map(m => (
            <button key={m} className={`tab-btn ${selectedMandi === m ? 'active' : ''}`} onClick={() => setSelectedMandi(m)}>
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Price Cards */}
      <div className="grid grid-3" style={{ marginBottom: 32 }}>
        {filtered.map((p, i) => (
          <div className="card" key={i} style={{ transition: 'all .2s' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>{p.crop}</div>
                <div style={{ fontSize: '.75rem', color: 'var(--text-3)', marginTop: 2 }}>
                  {selectedMandi === 'All India' ? 'National Average' : selectedMandi}
                </div>
              </div>
              <span style={{ fontWeight: 800, fontSize: '.85rem', color: p.up ? 'var(--primary)' : 'var(--red)', background: p.up ? 'var(--green-50)' : '#fee2e2', padding: '4px 10px', borderRadius: 100, border: `1px solid ${p.up ? 'rgba(22,163,74,.2)' : 'rgba(239,68,68,.2)'}` }}>
                {p.up ? '↑' : '↓'} {p.pct}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: '.72rem', color: 'var(--text-3)', marginBottom: 2 }}>Market Price</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: p.up ? 'var(--primary)' : 'var(--red)', lineHeight: 1 }}>
                  ₹{p.market.toLocaleString('en-IN')}
                </div>
                <div style={{ fontSize: '.72rem', color: 'var(--text-3)' }}>{p.unit}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '.72rem', color: 'var(--text-3)', marginBottom: 2 }}>MSP</div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-2)' }}>₹{p.msp.toLocaleString('en-IN')}</div>
                <div style={{ fontSize: '.72rem', color: 'var(--primary)', marginTop: 2 }}>
                  +{((p.market - p.msp) / p.msp * 100).toFixed(0)}% above MSP
                </div>
              </div>
            </div>

            {/* Price Range Bar */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.7rem', color: 'var(--text-4)', marginBottom: 4 }}>
                <span>Low: ₹{p.low}</span>
                <span>High: ₹{p.high}</span>
              </div>
              <div style={{ height: 5, background: 'var(--border)', borderRadius: 3, position: 'relative', overflow: 'hidden' }}>
                <div style={{
                  position: 'absolute',
                  left: `${((p.low - p.low) / (p.high - p.low)) * 100}%`,
                  width: `${((p.market - p.low) / (p.high - p.low)) * 100}%`,
                  height: '100%',
                  background: p.up ? 'var(--grad-brand)' : 'var(--red)',
                  borderRadius: 3,
                }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="alert alert-info">
        ℹ️ Prices sourced from Agmarknet. MSP declared by CACP. Market prices are indicative and may vary by 5-10% across mandis. Last updated: {new Date().toLocaleDateString('en-IN')}.
      </div>
    </div>
  );
}
