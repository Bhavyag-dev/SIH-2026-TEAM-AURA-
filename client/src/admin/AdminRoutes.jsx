import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import AdminUsers from './AdminUsers';
import AdminOrders from './AdminOrders';
import AdminLogistics from './AdminLogistics';
import AdminAnalytics from './AdminAnalytics';
import AdminOptimizer from './AdminOptimizer';
import AdminLayout from './AdminLayout';

export default function AdminRoutes() {
  const [admin, setAdmin] = useState(() => {
    try {
      const s = localStorage.getItem('kr_admin');
      return s ? JSON.parse(s) : null;
    } catch { return null; }
  });

  const handleLoginSuccess = (user) => {
    setAdmin(user);
    localStorage.setItem('kr_admin', JSON.stringify(user));
  };

  const handleLogout = () => {
    setAdmin(null);
    localStorage.removeItem('kr_admin');
  };

  if (!admin) return <AdminLogin onLoginSuccess={handleLoginSuccess} />;

  return (
    <AdminLayout admin={admin} onLogout={handleLogout}>
      <Routes>
        <Route path="/" element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="logistics" element={<AdminLogistics />} />
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="optimizer" element={<AdminOptimizer />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </AdminLayout>
  );
}
