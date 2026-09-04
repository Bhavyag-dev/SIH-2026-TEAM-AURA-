import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MandiTicker from './components/MandiTicker';
import BuyerMobileApp from './components/BuyerMobileApp';
import FarmerMobileApp from './components/FarmerMobileApp';
import AdminControlTower from './components/AdminControlTower';
import * as api from './services/api';

export default function App() {
  const [theme, setTheme] = useState('light'); // Default to clean light modern theme
  const [activeRole, setActiveRole] = useState('buyer'); // 'buyer' | 'farmer' | 'admin'
  const [supplies, setSupplies] = useState([]);
  const [demands, setDemands] = useState([]);
  const [orders, setOrders] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [mandiPrices, setMandiPrices] = useState([]);
  const [macroData, setMacroData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Apply theme to document body
  useEffect(() => {
    document.body.className = theme === 'light' ? 'theme-light' : 'theme-dark';
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Initial load from backend API
  useEffect(() => {
    async function loadData() {
      try {
        const [
          suppliesRes, 
          demandsRes, 
          ordersRes, 
          vehiclesRes, 
          warehousesRes, 
          pricesRes, 
          macroRes
        ] = await Promise.all([
          api.fetchSupplies().catch(() => []),
          api.fetchDemands().catch(() => []),
          api.fetchOrders().catch(() => []),
          api.fetchVehicles().catch(() => []),
          api.fetchWarehouses().catch(() => []),
          api.fetchMandiPrices().catch(() => []),
          api.fetchMacroAnalytics().catch(() => null)
        ]);

        setSupplies(suppliesRes || []);
        setDemands(demandsRes || []);
        setOrders(ordersRes || []);
        setVehicles(vehiclesRes || []);
        setWarehouses(warehousesRes || []);
        setMandiPrices(pricesRes || []);
        setMacroData(macroRes || null);
      } catch (err) {
        console.error('Data initialization error:', err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Supply Actions
  const handleAddSupply = async (newSupply) => {
    try {
      const created = await api.createSupply(newSupply);
      if (created) {
        setSupplies(prev => [created, ...prev]);
      }
    } catch (err) {
      console.error('Failed to create supply lot:', err);
    }
  };

  // Order Milestone Actions
  const handleUpdateOrderStatus = async (orderId, status, step, label) => {
    try {
      const updated = await api.updateOrderStatus(orderId, status, step, label);
      if (updated) {
        setOrders(prev => prev.map(o => (o._id === orderId || o.id === orderId) ? updated : o));
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  // Re-run optimization
  const handleRunOptimizer = async (demandId) => {
    try {
      const res = await api.runOptimizer(demandId);
      return res;
    } catch (err) {
      console.error('Optimizer error:', err);
    }
  };

  return (
    <div className="app-layout">
      {/* Universal Navigation Header */}
      <Header 
        activeRole={activeRole} 
        setActiveRole={setActiveRole} 
        macroData={macroData}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Real-time Mandi Price Benchmark Marquee */}
      <MandiTicker prices={mandiPrices} />

      {/* Main Workspace Container */}
      <main className="app-container">
        {loading ? (
          <div className="loading-state">
            <div className="pulse-dot" style={{ width: '18px', height: '18px' }}></div>
            <p style={{ marginTop: '14px', color: 'var(--text-secondary)' }}>
              Loading KrishiRoute Agricultural Optimization Corridor...
            </p>
          </div>
        ) : (
          <>
            {/* 1. Buyer Mobile App (Clean Phone Interface) */}
            {activeRole === 'buyer' && (
              <div className="portal-mobile-wrapper">
                <div className="mobile-view-header">
                  <div className="m-tag">Buyer Portal (Mobile Experience)</div>
                  <h2 className="m-title">Direct Farmgate Procurement & Fulfilment</h2>
                  <p className="m-sub">
                    Multi-supplier demand aggregation, intelligent vehicle routing, and live GPS transit tracking.
                  </p>
                </div>
                <BuyerMobileApp onGoToAdmin={() => setActiveRole('admin')} />
              </div>
            )}

            {/* 2. Farmer Mobile App (Dedicated Kisan Interface) */}
            {activeRole === 'farmer' && (
              <div className="portal-mobile-wrapper">
                <div className="mobile-view-header">
                  <div className="m-tag">Farmer & FPO Portal (Mobile Experience)</div>
                  <h2 className="m-title">Kisan Lot Management & Direct Payouts</h2>
                  <p className="m-sub">
                    List fresh harvest lots, monitor guaranteed buyer contracts, and view instant bank settlements.
                  </p>
                </div>
                <FarmerMobileApp 
                  supplies={supplies} 
                  onAddSupply={handleAddSupply} 
                />
              </div>
            )}

            {/* 3. Admin Control Tower (Full-Screen Enterprise Dashboard) */}
            {activeRole === 'admin' && (
              <div className="portal-desktop-wrapper">
                <AdminControlTower 
                  orders={orders}
                  supplies={supplies}
                  vehicles={vehicles}
                  warehouses={warehouses}
                  demands={demands}
                  macroData={macroData}
                  onUpdateOrderStatus={handleUpdateOrderStatus}
                  onRunOptimizer={handleRunOptimizer}
                />
              </div>
            )}
          </>
        )}
      </main>

      {/* Professional Commercial Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <div>
            <strong>KrishiRoute</strong> • Intelligent Agricultural Transaction & Fulfilment Platform
          </div>
          <div className="text-muted">
            Direct Farmgate-to-Buyer Coordination • Verified Cold Logistics • Escrow Settlement
          </div>
        </div>
      </footer>

      <style>{`
        .app-layout {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .loading-state {
          min-height: 50vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .portal-mobile-wrapper {
          padding: 24px 16px 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .mobile-view-header {
          text-align: center;
          margin-bottom: 20px;
          max-width: 600px;
        }

        .m-tag {
          display: inline-block;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 3px 10px;
          border-radius: 20px;
          background: var(--primary-green-subtle);
          color: var(--primary-green-dark);
          border: 1px solid var(--primary-green-border);
          margin-bottom: 8px;
        }

        .m-title {
          font-family: var(--font-heading);
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.2;
        }

        .m-sub {
          font-size: 0.82rem;
          color: var(--text-secondary);
          margin-top: 6px;
        }

        .portal-desktop-wrapper {
          width: 100%;
        }

        .app-footer {
          margin-top: auto;
          background: var(--bg-card);
          border-top: 1px solid var(--border-color);
          padding: 18px 24px;
          font-size: 0.82rem;
          color: var(--text-secondary);
        }

        .footer-content {
          max-width: 1440px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }
      `}</style>
    </div>
  );
}
