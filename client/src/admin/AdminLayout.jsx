import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊', path: '/admin/dashboard' },
  { id: 'orders', label: 'Orders', icon: '📦', path: '/admin/orders' },
  { id: 'users', label: 'Users', icon: '👥', path: '/admin/users' },
  { id: 'logistics', label: 'Logistics', icon: '🚛', path: '/admin/logistics' },
  { id: 'optimizer', label: 'AI Optimizer', icon: '🤖', path: '/admin/optimizer' },
  { id: 'analytics', label: 'Analytics', icon: '📈', path: '/admin/analytics' },
];

export default function AdminLayout({ admin, onLogout, children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.body.className = `theme-${next}`;
  };

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <div className="layout-sidebar">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">🌿</div>
          <div>
            <div className="sidebar-logo-text">KrishiRoute</div>
            <div className="sidebar-logo-sub">Admin Panel</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="sidebar-section-label">MAIN MENU</div>
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              className={`sidebar-link ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
            >
              <span className="sidebar-link-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}

          <div className="sidebar-section-label" style={{ marginTop: 12 }}>SYSTEM</div>
          <button className="sidebar-link" onClick={toggleTheme}>
            <span className="sidebar-link-icon">{theme === 'light' ? '🌙' : '☀️'}</span>
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </button>
          <button className="sidebar-link" style={{ color: 'var(--red)' }} onClick={onLogout}>
            <span className="sidebar-link-icon">🚪</span>
            Sign Out
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="user-chip">
            <div className="user-avatar">
              {admin?.name ? admin.name.charAt(0).toUpperCase() : 'A'}
            </div>
            <div>
              <div className="user-name">{admin?.name || 'Admin'}</div>
              <div className="user-role">Administrator</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}
