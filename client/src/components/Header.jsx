import React from 'react';
import { 
  Sprout, 
  Building2, 
  Cpu, 
  Users, 
  Truck, 
  ShieldCheck, 
  Sun,
  Moon,
  Smartphone,
  Layers,
  ArrowRightLeft
} from 'lucide-react';

export default function Header({ 
  activeRole, 
  setActiveRole, 
  macroData,
  theme,
  onToggleTheme 
}) {
  const portals = [
    { 
      id: 'buyer', 
      label: 'Buyer Mobile App', 
      shortLabel: 'Buyer App',
      icon: Smartphone, 
      sub: 'Demand & VRP Procurement',
      badge: 'Mobile'
    },
    { 
      id: 'farmer', 
      label: 'Farmer Mobile App', 
      shortLabel: 'Farmer App',
      icon: Sprout, 
      sub: 'Harvest Lots & Earnings',
      badge: 'Mobile'
    },
    { 
      id: 'admin', 
      label: 'Admin Control Tower', 
      shortLabel: 'Admin Panel',
      icon: ShieldCheck, 
      sub: 'Fleet & Escrow Operations',
      badge: 'Desktop'
    }
  ];

  return (
    <header className="header-wrapper">
      {/* Main Brand & Tagline Bar */}
      <div className="main-nav-bar">
        <div className="nav-brand">
          <div className="brand-logo-icon">
            <Sprout size={26} className="sprout-icon" />
          </div>
          <div>
            <div className="brand-title">
              Krishi<span className="brand-highlight">Route</span>
              <span className="brand-edition">Enterprise</span>
            </div>
            <div className="brand-subtitle">
              Connect • Optimize • Nourish | <em>Intelligent Agricultural Transaction & Fulfilment Platform</em>
            </div>
          </div>
        </div>

        {/* Global Impact Micro-Metrics */}
        <div className="nav-right-cluster">
          {macroData && (
            <div className="header-stats-pill">
              <div className="h-stat-item">
                <span className="h-stat-label">Farmer Realization</span>
                <span className="h-stat-val text-emerald">+{macroData.avgFarmerIncomeUpliftPercent || 22.0}%</span>
              </div>
              <div className="h-stat-divider"></div>
              <div className="h-stat-item">
                <span className="h-stat-label">Landed Savings</span>
                <span className="h-stat-val text-cyan">-{macroData.avgBuyerLandedCostSavingsPercent || 18.4}%</span>
              </div>
              <div className="h-stat-divider"></div>
              <div className="h-stat-item">
                <span className="h-stat-label">Waste Avoided</span>
                <span className="h-stat-val text-amber">14.8 MT</span>
              </div>
            </div>
          )}

          {/* Night / Light Mode Toggle */}
          <button 
            onClick={onToggleTheme} 
            className="theme-toggle-pill"
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          >
            {theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}
            <span>{theme === 'light' ? 'Night' : 'Light'}</span>
          </button>
        </div>
      </div>

      {/* Clean Portal Navigation Switcher Strip */}
      <div className="portal-switcher-container">
        <div className="portal-nav-pills">
          {portals.map((p) => {
            const Icon = p.icon;
            const isActive = activeRole === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActiveRole(p.id)}
                className={`portal-tab-btn ${isActive ? 'active' : ''}`}
              >
                <div className="tab-icon-wrap">
                  <Icon size={18} />
                </div>
                <div className="tab-text-wrap">
                  <div className="tab-title-line">
                    <span className="tab-label">{p.label}</span>
                    <span className="tab-device-badge">{p.badge}</span>
                  </div>
                  <span className="tab-sub">{p.sub}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <style>{`
        .header-wrapper {
          background: var(--bg-nav);
          border-bottom: 1px solid var(--border-color);
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
        }

        .main-nav-bar {
          max-width: 1440px;
          margin: 0 auto;
          padding: 12px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .brand-logo-icon {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          background: var(--grad-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          box-shadow: 0 4px 12px var(--primary-green-glow);
        }

        .brand-title {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.1;
          color: var(--text-primary);
        }

        .brand-highlight {
          color: var(--primary-green);
        }

        .brand-edition {
          font-size: 0.68rem;
          color: var(--primary-green);
          margin-left: 8px;
          padding: 2px 7px;
          border-radius: 4px;
          background: var(--primary-green-subtle);
          border: 1px solid var(--primary-green-border);
          vertical-align: middle;
          font-weight: 700;
          letter-spacing: 0.04em;
        }

        .brand-subtitle {
          font-size: 0.76rem;
          color: var(--text-muted);
          letter-spacing: 0.01em;
          margin-top: 2px;
        }

        .nav-right-cluster {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .header-stats-pill {
          display: flex;
          align-items: center;
          background: var(--bg-card-subtle);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 6px 14px;
          gap: 14px;
        }

        @media (max-width: 800px) {
          .header-stats-pill {
            display: none;
          }
        }

        .h-stat-item {
          display: flex;
          flex-direction: column;
        }

        .h-stat-label {
          font-size: 0.65rem;
          text-transform: uppercase;
          color: var(--text-muted);
          font-weight: 700;
        }

        .h-stat-val {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 0.95rem;
        }

        .text-emerald { color: #16a34a; }
        .text-cyan { color: #0284c7; }
        .text-amber { color: #d97706; }

        .h-stat-divider {
          width: 1px;
          height: 22px;
          background: var(--border-color);
        }

        .theme-toggle-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          background: var(--bg-card-subtle);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          padding: 6px 12px;
          border-radius: 20px;
          cursor: pointer;
          font-size: 0.78rem;
          font-weight: 600;
          transition: var(--trans-smooth);
        }

        .theme-toggle-pill:hover {
          border-color: var(--primary-green);
          color: var(--primary-green);
        }

        .portal-switcher-container {
          background: var(--bg-card-subtle);
          border-top: 1px solid var(--border-color);
          padding: 8px 24px;
        }

        .portal-nav-pills {
          max-width: 1440px;
          margin: 0 auto;
          display: flex;
          gap: 12px;
          overflow-x: auto;
        }

        .portal-tab-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 16px;
          border-radius: 10px;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          cursor: pointer;
          transition: var(--trans-smooth);
          text-align: left;
          min-width: 200px;
        }

        .portal-tab-btn:hover {
          border-color: var(--primary-green);
          color: var(--text-primary);
        }

        .portal-tab-btn.active {
          background: rgba(22, 163, 74, 0.08);
          border-color: var(--primary-green);
          color: var(--primary-green);
          box-shadow: 0 2px 8px rgba(22, 163, 74, 0.15);
        }

        .tab-icon-wrap {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          background: var(--bg-card-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
          color: currentColor;
          flex-shrink: 0;
        }

        .portal-tab-btn.active .tab-icon-wrap {
          background: var(--primary-green);
          color: #ffffff;
        }

        .tab-text-wrap {
          display: flex;
          flex-direction: column;
        }

        .tab-title-line {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .tab-label {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.88rem;
          color: var(--text-primary);
        }

        .portal-tab-btn.active .tab-label {
          color: var(--primary-green);
        }

        .tab-device-badge {
          font-size: 0.62rem;
          font-weight: 700;
          text-transform: uppercase;
          padding: 1px 5px;
          border-radius: 4px;
          background: var(--bg-card-subtle);
          border: 1px solid var(--border-color);
          color: var(--text-muted);
        }

        .portal-tab-btn.active .tab-device-badge {
          background: rgba(22, 163, 74, 0.15);
          border-color: rgba(22, 163, 74, 0.3);
          color: var(--primary-green);
        }

        .tab-sub {
          font-size: 0.72rem;
          color: var(--text-muted);
        }
      `}</style>
    </header>
  );
}
