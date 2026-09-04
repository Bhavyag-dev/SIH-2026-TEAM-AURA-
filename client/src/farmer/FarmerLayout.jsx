import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const NAV = [
  { id: 'home', label: 'Home', icon: '🏠', path: '/farmer/home' },
  { id: 'produce', label: 'My Produce', icon: '🌾', path: '/farmer/produce' },
  { id: 'orders', label: 'Orders', icon: '📦', path: '/farmer/orders' },
  { id: 'prices', label: 'Mandi Prices', icon: '📊', path: '/farmer/prices' },
  { id: 'profile', label: 'Profile', icon: '👤', path: '/farmer/profile' },
];

export default function FarmerLayout({ farmer, onLogout, children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="page-wrap">
      {/* Top Bar */}
      <header className="top-bar">
        <div className="top-bar-brand">
          <span style={{ fontSize: '1.3rem' }}>🌿</span>
          Krishi<span className="brand-dot">Route</span>
        </div>

        <nav className="top-bar-nav" style={{ marginLeft: 24 }}>
          {NAV.slice(0, 4).map(item => (
            <button
              key={item.id}
              className={`top-bar-link ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>

        <div className="top-bar-actions">
          <div className="user-chip" style={{ cursor: 'pointer' }} onClick={() => navigate('/farmer/profile')}>
            <div className="user-avatar">{farmer?.name?.charAt(0)?.toUpperCase() || 'F'}</div>
            <div>
              <div className="user-name">{farmer?.name || 'Farmer'}</div>
              <div className="user-role" style={{ color: 'var(--primary)' }}>Farmer</div>
            </div>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onLogout} title="Logout">🚪</button>
        </div>
      </header>

      {/* Page Content */}
      <main style={{ flex: 1, padding: '28px 32px', maxWidth: 1400, margin: '0 auto', width: '100%' }}>
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="bottom-nav" style={{ display: 'none' }}>
        {NAV.map(item => (
          <button
            key={item.id}
            className={`bottom-nav-item ${isActive(item.path) ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>
      <style>{`
        @media (max-width: 768px) {
          .top-bar-nav { display: none; }
          .bottom-nav { display: flex !important; }
          main { padding: 20px 16px 80px !important; }
        }
      `}</style>
    </div>
  );
}
