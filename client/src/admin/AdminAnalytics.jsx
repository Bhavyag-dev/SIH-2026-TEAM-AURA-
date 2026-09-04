import React from 'react';

const CROP_PRICES = [
  { crop: 'Tomato', msp: 1200, market: 1850, change: '+12.4%', trend: 'up' },
  { crop: 'Onion', msp: 800, market: 1100, change: '-3.2%', trend: 'down' },
  { crop: 'Potato', msp: 600, market: 890, change: '+5.1%', trend: 'up' },
  { crop: 'Wheat', msp: 2275, market: 2380, change: '+1.8%', trend: 'up' },
  { crop: 'Rice', msp: 2183, market: 2450, change: '+4.2%', trend: 'up' },
  { crop: 'Mango', msp: 3000, market: 4200, change: '+8.7%', trend: 'up' },
];

const WASTE_DATA = [
  { route: 'Nashik → Mumbai', wastePct: 4.2, distanceKm: 165, vehicleType: 'Refrigerated Truck' },
  { route: 'Indore → Delhi', wastePct: 8.1, distanceKm: 785, vehicleType: 'Standard Truck' },
  { route: 'Amritsar → Chandigarh', wastePct: 2.8, distanceKm: 220, vehicleType: 'Refrigerated Van' },
  { route: 'Patna → Kolkata', wastePct: 11.3, distanceKm: 590, vehicleType: 'Standard Truck' },
];

export default function AdminAnalytics() {
  const avgWaste = WASTE_DATA.reduce((s, d) => s + d.wastePct, 0) / WASTE_DATA.length;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Analytics & Reports</h1>
          <p className="page-subtitle">Platform insights, market prices and waste analytics</p>
        </div>
        <button className="btn btn-secondary btn-sm">📥 Export Report</button>
      </div>

      <div className="page-body">
        {/* Platform KPIs */}
        <div className="grid grid-4" style={{ marginBottom: 28 }}>
          <div className="stat-card anim-fade-up">
            <span className="stat-label">Waste Reduced</span>
            <span className="stat-value text-green">32%</span>
            <span className="stat-sub">vs. national avg 40%</span>
          </div>
          <div className="stat-card anim-fade-up" style={{ animationDelay: '.05s' }}>
            <span className="stat-label">Farmer Income Boost</span>
            <span className="stat-value text-amber">+₹2.4L</span>
            <span className="stat-sub">avg. per farmer annually</span>
          </div>
          <div className="stat-card anim-fade-up" style={{ animationDelay: '.1s' }}>
            <span className="stat-label">Routes Optimized</span>
            <span className="stat-value text-blue">1,847</span>
            <span className="stat-sub">+12% this month</span>
          </div>
          <div className="stat-card anim-fade-up" style={{ animationDelay: '.15s' }}>
            <span className="stat-label">CO₂ Saved</span>
            <span className="stat-value" style={{ color: 'var(--cyan)' }}>84T</span>
            <span className="stat-sub">carbon emissions avoided</span>
          </div>
        </div>

        <div className="grid grid-2" style={{ marginBottom: 24 }}>
          {/* Mandi Prices */}
          <div className="card">
            <h3 style={{ fontWeight: 700, marginBottom: 16 }}>🌾 Live Mandi Prices</h3>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Crop</th>
                    <th>MSP (₹/q)</th>
                    <th>Market</th>
                    <th>Change</th>
                  </tr>
                </thead>
                <tbody>
                  {CROP_PRICES.map((c, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 600 }}>{c.crop}</td>
                      <td style={{ color: 'var(--text-3)', fontSize: '.82rem' }}>₹{c.msp}</td>
                      <td style={{ fontWeight: 600 }}>₹{c.market}</td>
                      <td>
                        <span style={{ color: c.trend === 'up' ? 'var(--primary)' : 'var(--red)', fontWeight: 700, fontSize: '.82rem' }}>
                          {c.trend === 'up' ? '↑' : '↓'} {c.change}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Waste by Route */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ fontWeight: 700 }}>🗑️ Waste by Route</h3>
              <span className="badge badge-amber">Avg: {avgWaste.toFixed(1)}%</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {WASTE_DATA.map((d, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                    <div>
                      <div style={{ fontSize: '.85rem', fontWeight: 600 }}>{d.route}</div>
                      <div style={{ fontSize: '.75rem', color: 'var(--text-3)' }}>{d.vehicleType} · {d.distanceKm}km</div>
                    </div>
                    <span style={{ fontWeight: 700, color: d.wastePct > 8 ? 'var(--red)' : d.wastePct > 5 ? 'var(--amber)' : 'var(--primary)', fontSize: '.9rem' }}>
                      {d.wastePct}%
                    </span>
                  </div>
                  <div style={{ height: 6, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${(d.wastePct / 15) * 100}%`,
                      background: d.wastePct > 8 ? 'var(--red)' : d.wastePct > 5 ? 'var(--amber)' : 'var(--primary)',
                      borderRadius: 3,
                      transition: 'width .5s var(--ease)',
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SDG Impact */}
        <div className="card">
          <h3 style={{ fontWeight: 700, marginBottom: 16 }}>🎯 SDG Impact Metrics</h3>
          <div className="grid grid-4">
            {[
              { goal: 'SDG 1', title: 'No Poverty', desc: '1,247 farmers with income increase >₹1L/yr', color: '#e11d48', pct: 68 },
              { goal: 'SDG 2', title: 'Zero Hunger', desc: 'Reduced post-harvest loss by 32% on platform routes', color: '#d97706', pct: 74 },
              { goal: 'SDG 12', title: 'Responsible Consumption', desc: '84T CO₂ avoided, 840T food saved from waste', color: '#16a34a', pct: 55 },
              { goal: 'SDG 13', title: 'Climate Action', desc: '12% fewer truck trips via route optimization', color: '#0284c7', pct: 42 },
            ].map((s, i) => (
              <div key={i} style={{ padding: '16px', background: 'var(--bg-raised)', borderRadius: 12, border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '.7rem', flexShrink: 0 }}>
                    {s.goal}
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '.85rem' }}>{s.title}</div>
                </div>
                <p style={{ fontSize: '.75rem', color: 'var(--text-3)', marginBottom: 10, lineHeight: 1.5 }}>{s.desc}</p>
                <div style={{ height: 4, background: 'var(--border)', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${s.pct}%`, background: s.color, borderRadius: 2 }} />
                </div>
                <div style={{ marginTop: 4, fontSize: '.72rem', color: 'var(--text-3)', fontWeight: 600 }}>{s.pct}% target achieved</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
