import React, { useState } from 'react';
import * as api from '../services/api';

export default function AdminOptimizer() {
  const [demands, setDemands] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    crop: 'Tomato', quantityKg: 5000,
    deliveryLocation: 'Mumbai APMC',
    targetDate: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
  });

  const handle = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const runOptimizer = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await api.runOptimizer(null, form);
      setResult(res);
    } catch {
      setResult({ error: 'Optimizer failed. Backend may be unavailable.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">🤖 AI Route Optimizer</h1>
          <p className="page-subtitle">Run AI-powered supply chain optimization</p>
        </div>
        <span className="badge badge-purple">AI Powered</span>
      </div>

      <div className="page-body">
        <div className="grid grid-2" style={{ alignItems: 'start' }}>
          {/* Input Panel */}
          <div className="card">
            <h3 style={{ fontWeight: 700, marginBottom: 20 }}>Configure Demand</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="form-group">
                <label className="form-label">Crop / Produce</label>
                <select className="form-select" name="crop" value={form.crop} onChange={handle}>
                  {['Tomato','Onion','Potato','Wheat','Rice','Mango','Banana','Sugarcane'].map(c => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Quantity (kg)</label>
                <input className="form-input" type="number" name="quantityKg" value={form.quantityKg} onChange={handle} min={100} />
              </div>
              <div className="form-group">
                <label className="form-label">Delivery Location</label>
                <input className="form-input" type="text" name="deliveryLocation" value={form.deliveryLocation} onChange={handle} />
              </div>
              <div className="form-group">
                <label className="form-label">Target Date</label>
                <input className="form-input" type="date" name="targetDate" value={form.targetDate} onChange={handle} />
              </div>
              <button className="btn btn-primary btn-lg" onClick={runOptimizer} disabled={loading}>
                {loading ? <span className="spinner" style={{ width: 18, height: 18 }} /> : '🚀'}
                {loading ? 'Optimizing routes...' : 'Run Optimizer'}
              </button>
            </div>
          </div>

          {/* Result Panel */}
          <div>
            {loading && (
              <div className="card" style={{ textAlign: 'center', padding: 48 }}>
                <div className="spinner" style={{ margin: '0 auto 16px', width: 40, height: 40, borderWidth: 3 }} />
                <h3 style={{ marginBottom: 8 }}>Analyzing routes...</h3>
                <p style={{ color: 'var(--text-3)', fontSize: '.875rem' }}>AI is computing optimal supply chain paths</p>
              </div>
            )}

            {result && !loading && (
              result.error ? (
                <div className="alert alert-error" style={{ borderRadius: 16 }}>⚠️ {result.error}</div>
              ) : (
                <div className="card anim-fade-up">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <h3 style={{ fontWeight: 700 }}>✅ Optimization Complete</h3>
                    <span className="badge badge-green">Success</span>
                  </div>

                  {result.plan && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                      {/* Summary */}
                      <div className="grid grid-2" style={{ gap: 12 }}>
                        <div style={kpiBox}>
                          <div className="stat-label">Total Cost</div>
                          <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--primary)' }}>
                            ₹{(result.plan.totalCost || 0).toLocaleString('en-IN')}
                          </div>
                        </div>
                        <div style={kpiBox}>
                          <div className="stat-label">CO₂ Saved</div>
                          <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--blue)' }}>
                            {result.plan.co2SavedKg || 0}kg
                          </div>
                        </div>
                      </div>

                      {/* Route Steps */}
                      {result.plan.routes && result.plan.routes.length > 0 && (
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '.85rem', marginBottom: 10, color: 'var(--text-2)' }}>Route Plan</div>
                          {result.plan.routes.map((r, i) => (
                            <div key={i} style={routeCard}>
                              <div style={{ fontWeight: 700, fontSize: '.9rem' }}>
                                {r.from} → {r.to}
                              </div>
                              <div style={{ fontSize: '.78rem', color: 'var(--text-3)', marginTop: 4 }}>
                                {r.vehicleType} · {r.distanceKm}km · {r.estimatedHrs}hrs
                              </div>
                              <span className="badge badge-green" style={{ marginTop: 6 }}>₹{(r.cost || 0).toLocaleString('en-IN')}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {!result.plan && (
                    <pre style={{ fontSize: '.75rem', background: 'var(--bg-raised)', padding: 14, borderRadius: 8, overflow: 'auto', whiteSpace: 'pre-wrap', color: 'var(--text-2)' }}>
                      {JSON.stringify(result, null, 2)}
                    </pre>
                  )}
                </div>
              )
            )}

            {!result && !loading && (
              <div className="card" style={{ textAlign: 'center', padding: 48 }}>
                <div style={{ fontSize: '3rem', marginBottom: 16 }}>🤖</div>
                <h3 style={{ marginBottom: 8 }}>AI Optimizer Ready</h3>
                <p style={{ color: 'var(--text-3)', fontSize: '.875rem' }}>Configure demand parameters and run the optimizer to see optimal supply chain routes</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const kpiBox = {
  background: 'var(--bg-raised)',
  border: '1px solid var(--border)',
  borderRadius: 10,
  padding: '14px 16px',
};

const routeCard = {
  background: 'var(--bg-raised)',
  border: '1px solid var(--border)',
  borderRadius: 10,
  padding: '12px 14px',
  marginBottom: 8,
};
