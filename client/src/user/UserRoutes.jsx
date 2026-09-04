import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import UserLogin from './UserLogin';
import UserRegister from './UserRegister';
import UserLayout from './UserLayout';
import UserHome from './UserHome';
import UserMarketplace from './UserMarketplace';
import UserOrders from './UserOrders';
import UserPools from './UserPools';
import UserProfile from './UserProfile';

export default function UserRoutes() {
  const [user, setUser] = useState(() => {
    try {
      const s = localStorage.getItem('kr_user');
      return s ? JSON.parse(s) : null;
    } catch { return null; }
  });
  const [authPage, setAuthPage] = useState('login');

  const handleLoginSuccess = (u) => {
    setUser(u);
    localStorage.setItem('kr_user', JSON.stringify(u));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('kr_user');
    setAuthPage('login');
  };

  if (!user) {
    return authPage === 'login'
      ? <UserLogin onLoginSuccess={handleLoginSuccess} onGoRegister={() => setAuthPage('register')} />
      : <UserRegister onRegisterSuccess={handleLoginSuccess} onGoLogin={() => setAuthPage('login')} />;
  }

  return (
    <UserLayout user={user} onLogout={handleLogout}>
      <Routes>
        <Route path="/" element={<Navigate to="home" replace />} />
        <Route path="home" element={<UserHome user={user} />} />
        <Route path="marketplace" element={<UserMarketplace user={user} />} />
        <Route path="orders" element={<UserOrders user={user} />} />
        <Route path="pools" element={<UserPools user={user} />} />
        <Route path="profile" element={<UserProfile user={user} onLogout={handleLogout} />} />
        <Route path="*" element={<Navigate to="home" replace />} />
      </Routes>
    </UserLayout>
  );
}
