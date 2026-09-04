import React, { useState, useEffect } from 'react';
import { 
  Truck, 
  MapPin, 
  Navigation, 
  Clock, 
  Fuel, 
  ShieldCheck, 
  Warehouse, 
  Leaf,
  CheckCircle2
} from 'lucide-react';

export default function RouteVisualizer({ route, vehicle, aggregationHub, onMilestoneUpdate }) {
  const [animProgress, setAnimProgress] = useState(0.65); // 0 to 1 position of vehicle

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimProgress(prev => (prev >= 1 ? 0 : prev + 0.02));
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const stops = route?.stops || [
    { sequence: 1, name: 'Sahyadri FPO (Lasalgaon)', type: 'farm_pickup', action: 'Load 90 Quintals' },
    { sequence: 2, name: 'Godavari Krishi (Niphad)', type: 'farm_pickup', action: 'Load 80 Quintals' },
    { sequence: 3, name: 'Sinnar Agro Belt', type: 'farm_pickup', action: 'Load 30 Quintals' },
    { sequence: 4, name: 'BigBasket Bhiwandi Central DC', type: 'buyer_dropoff', action: 'Direct Landed Delivery' }
  ];

  const totalDist = route?.totalDistanceKm || 238;
  const transitHours = route?.estimatedTransitHours || 5.7;

  return (
    <div className="route-visualizer-card glass-card">
      <div className="rv-header">
        <div>
          <div className="rv-badge">
            <Navigation size={14} className="text-cyan" />
            <span>VRP-OPTIMIZED MULTI-STOP LOGISTICS CORRIDOR</span>
          </div>
          <h3 style={{ marginTop: '4px' }}>Optimal Transit & Farm Collection Manifest</h3>
        </div>

        <div className="rv-telemetry-strip">
          <div className="telem-item">
            <Navigation size={14} className="text-cyan" />
            <span><strong>{totalDist}</strong> km total</span>
          </div>
          <div className="telem-item">
            <Clock size={14} className="text-amber" />
            <span><strong>{transitHours}</strong> hrs transit</span>
          </div>
          <div className="telem-item">
            <Truck size={14} className="text-emerald" />
            <span>{vehicle?.model || 'MH-15-EG-8291'} ({vehicle?.vehicleType || 'Tata 1613 Crated 12T'})</span>
          </div>
        </div>
      </div>

      {/* SVG Interactive Corridor Map */}
      <div className="map-canvas-container">
        <svg viewBox="0 0 800 240" className="route-svg">
          <defs>
            <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>

            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background gridlines */}
          <line x1="50" y1="60" x2="750" y2="60" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />
          <line x1="50" y1="120" x2="750" y2="120" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />
          <line x1="50" y1="180" x2="750" y2="180" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />

          {/* Connecting Transit Path */}
          <path
            d="M 90 120 C 230 40, 370 200, 520 120 S 680 70, 710 120"
            fill="none"
            stroke="rgba(52, 211, 153, 0.2)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M 90 120 C 230 40, 370 200, 520 120 S 680 70, 710 120"
            fill="none"
            stroke="url(#routeGrad)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="8 6"
          />

          {/* Dynamic Stop Nodes */}
          {stops.map((stop, i) => {
            const count = stops.length;
            const x = 90 + (i / Math.max(1, count - 1)) * 620;
            const y = i % 2 === 0 ? 120 : 80;
            const isDest = i === count - 1;

            return (
              <g key={i} transform={`translate(${x}, ${y})`}>
                <circle 
                  r={isDest ? 22 : 18} 
                  fill={isDest ? '#b45309' : '#047857'} 
                  stroke={isDest ? '#f59e0b' : '#22c55e'} 
                  strokeWidth="3" 
                  filter="url(#glow)" 
                />
                <text y="5" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700">
                  {i + 1}
                </text>
                <text 
                  y={i % 2 === 0 ? 38 : -22} 
                  textAnchor="middle" 
                  fill={isDest ? '#d97706' : '#15803d'} 
                  fontSize="11" 
                  fontWeight="700"
                >
                  {stop.city || stop.name?.split('(')[0] || `Stop ${i+1}`}
                </text>
                <text 
                  y={i % 2 === 0 ? 52 : -10} 
                  textAnchor="middle" 
                  fill="#64748b" 
                  fontSize="9"
                >
                  {stop.action?.slice(0, 20) || 'Pickup'}
                </text>
              </g>
            );
          })}

          {/* Animated Vehicle marker along path */}
          <g transform={`translate(${90 + animProgress * 620}, ${120 + Math.sin(animProgress * Math.PI * 2) * 35})`}>
            <circle r="16" fill="#16a34a" filter="url(#glow)" />
            <text y="5" textAnchor="middle" fill="#ffffff" fontSize="14">🚚</text>
          </g>
        </svg>
      </div>

      {/* Stop Sequence Cards */}
      <div className="stops-timeline">
        {stops.map((stop, idx) => (
          <div key={idx} className="stop-step">
            <div className="stop-step-header">
              <span className={`stop-seq-badge ${stop.type === 'buyer_dropoff' ? 'seq-dest' : 'seq-pickup'}`}>
                {stop.type === 'buyer_dropoff' ? 'DESTINATION' : `STOP ${idx + 1}`}
              </span>
              <span className="stop-time">ETA: +{Math.round((idx * 1.5 + 0.5) * 10) / 10}h</span>
            </div>
            <div className="stop-name">{stop.name}</div>
            <div className="stop-action text-secondary">{stop.action}</div>
          </div>
        ))}
      </div>

      {/* Environmental & Logistics Cost Assurance Banner */}
      <div className="eco-assurance-strip">
        <div className="eco-item">
          <Leaf size={16} className="text-emerald" />
          <span><strong>Multi-Pickup Consolidator:</strong> Eliminated 3 individual uncoordinated tempos (Saved 68 kg CO₂)</span>
        </div>
        <div className="eco-item">
          <ShieldCheck size={16} className="text-cyan" />
          <span><strong>Live GPS & Temperature Logger:</strong> Crated palletization maintaining &lt;14°C ambient</span>
        </div>
      </div>

      <style>{`
        .route-visualizer-card {
          margin-top: 24px;
          border: 1px solid var(--border-medium);
        }

        .rv-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 20px;
        }

        .rv-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.74rem;
          font-weight: 800;
          color: #38bdf8;
          letter-spacing: 0.04em;
        }

        .rv-telemetry-strip {
          display: flex;
          align-items: center;
          gap: 16px;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--border-subtle);
          padding: 8px 16px;
          border-radius: 10px;
          font-size: 0.84rem;
        }

        .telem-item {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--text-secondary);
        }

        .map-canvas-container {
          background: radial-gradient(circle at 50% 50%, rgba(16, 56, 38, 0.4), rgba(4, 15, 10, 0.95));
          border: 1px solid var(--border-subtle);
          border-radius: 14px;
          padding: 20px 10px;
          overflow-x: auto;
        }

        .route-svg {
          width: 100%;
          min-width: 650px;
          height: auto;
          display: block;
        }

        .stops-timeline {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
          gap: 16px;
          margin-top: 20px;
        }

        .stop-step {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-subtle);
          padding: 14px;
          border-radius: 10px;
        }

        .stop-step-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }

        .stop-seq-badge {
          font-size: 0.68rem;
          font-weight: 800;
          padding: 2px 6px;
          border-radius: 4px;
        }

        .seq-pickup {
          background: rgba(16, 185, 129, 0.2);
          color: #34d399;
          border: 1px solid rgba(16, 185, 129, 0.3);
        }

        .seq-dest {
          background: rgba(245, 158, 11, 0.2);
          color: #fbbf24;
          border: 1px solid rgba(245, 158, 11, 0.3);
        }

        .stop-time {
          font-size: 0.72rem;
          color: var(--text-muted);
        }

        .stop-name {
          font-weight: 700;
          font-size: 0.88rem;
          color: #fff;
        }

        .stop-action {
          font-size: 0.78rem;
          margin-top: 4px;
        }

        .eco-assurance-strip {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
          background: rgba(16, 185, 129, 0.06);
          border: 1px solid rgba(16, 185, 129, 0.2);
          border-radius: 10px;
          padding: 12px 18px;
          margin-top: 20px;
          font-size: 0.84rem;
        }

        .eco-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
        }
      `}</style>
    </div>
  );
}
