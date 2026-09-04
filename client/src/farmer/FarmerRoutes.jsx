import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import FarmerLogin from './FarmerLogin';
import FarmerRegister from './FarmerRegister';
import FarmerLayout from './FarmerLayout';
import FarmerHome from './FarmerHome';
import FarmerProduce from './FarmerProduce';
import FarmerOrders from './FarmerOrders';
import FarmerPrices from './FarmerPrices';
import FarmerProfile from './FarmerProfile';

export default function FarmerRoutes() {
  const [farmer, setFarmer] = useState(() => {
    try {
      const s = localStorage.getItem('kr_farmer');
      return s ? JSON.parse(s) : null;
    } catch { return null; }
  });
  const [authPage, setAuthPage] = useState('login');

  const handleLoginSuccess = (user) => {
    setFarmer(user);
    localStorage.setItem('kr_farmer', JSON.stringify(user));
  };

  const handleLogout = () => {
    setFarmer(null);
    localStorage.removeItem('kr_farmer');
    setAuthPage('login');
  };

  if (!farmer) {
    return authPage === 'login'
      ? <FarmerLogin onLoginSuccess={handleLoginSuccess} onGoRegister={() => setAuthPage('register')} />
      : <FarmerRegister onRegisterSuccess={handleLoginSuccess} onGoLogin={() => setAuthPage('login')} />;
  }

  return (
    <FarmerLayout farmer={farmer} onLogout={handleLogout}>
      <Routes>
        <Route path="/" element={<Navigate to="home" replace />} />
        <Route path="home" element={<FarmerHome farmer={farmer} />} />
        <Route path="produce" element={<FarmerProduce farmer={farmer} />} />
        <Route path="orders" element={<FarmerOrders farmer={farmer} />} />
        <Route path="prices" element={<FarmerPrices />} />
        <Route path="profile" element={<FarmerProfile farmer={farmer} onLogout={handleLogout} />} />
        <Route path="*" element={<Navigate to="home" replace />} />
      </Routes>
    </FarmerLayout>
  );
}
