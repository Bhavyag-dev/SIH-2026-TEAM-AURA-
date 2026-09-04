import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import MandiTicker from './components/MandiTicker';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import BuyerApp from './components/BuyerApp';
import FarmerApp from './components/FarmerApp';
import AdminControlTower from './components/AdminControlTower';
import * as api from './services/api';

export default function App() {
  const [theme, setTheme] = useState('light');
  
  // Stored authenticated user session
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('krishiroute_user');
      return saved ? JSON.parse(saved) : {
        _id: 'usr_buyer_jaipur',
        name: 'Rajesh Singhania',
        phone: '+91 98290 44910',
        email: 'rajesh.singhania@rajasthanfresh.in',
        role: 'buyer'
      };
    } catch {
      return null;
    }
  });

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

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('krishiroute_user', JSON.stringify(user));
    } catch (e) {
      console.error('Failed to persist user session', e);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('krishiroute_user');
    } catch (e) {
      console.error('Failed to remove user session', e);
    }
  };

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
    <BrowserRouter>
      <div className="app-layout">
        <Routes>
          {/* Public Auth Routes */}
          <Route 
            path="/login" 
            element={
              <LoginPage onLoginSuccess={handleLoginSuccess} />
            } 
          />

          <Route 
            path="/register" 
            element={
              <RegisterPage onRegisterSuccess={handleLoginSuccess} />
            } 
          />

          {/* 1. Buyer Portal Route: Full-screen responsive app */}
          <Route 
            path="/buyer" 
            element={
              <>
                <AppNavbar 
                  currentUser={currentUser} 
                  onLogout={handleLogout}
                  theme={theme}
                  onToggleTheme={toggleTheme}
                />
                <MandiTicker prices={mandiPrices} />
                <BuyerApp currentUser={currentUser} />
              </>
            } 
          />

          {/* 2. Farmer Portal Route: Full-screen responsive app */}
          <Route 
            path="/farmer" 
            element={
              <>
                <AppNavbar 
                  currentUser={currentUser} 
                  onLogout={handleLogout}
                  theme={theme}
                  onToggleTheme={toggleTheme}
                />
                <MandiTicker prices={mandiPrices} />
                <FarmerApp 
                  currentUser={currentUser}
                  supplies={supplies} 
                  onAddSupply={handleAddSupply} 
                />
              </>
            } 
          />

          {/* 3. Admin Portal Route: Full desktop control tower */}
          <Route 
            path="/admin" 
            element={
              <>
                <AppNavbar 
                  currentUser={currentUser} 
                  onLogout={handleLogout}
                  theme={theme}
                  onToggleTheme={toggleTheme}
                />
                <MandiTicker prices={mandiPrices} />
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
              </>
            } 
          />

          {/* Root Smart Redirect */}
          <Route 
            path="/" 
            element={
              <Navigate 
                to={
                  currentUser 
                    ? (currentUser.role === 'admin' ? '/admin' : currentUser.role === 'farmer' ? '/farmer' : '/buyer')
                    : '/login'
                } 
                replace 
              />
            } 
          />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      <style>{`
        .app-layout {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background-color: var(--bg-app);
        }
      `}</style>
    </BrowserRouter>
  );
}
