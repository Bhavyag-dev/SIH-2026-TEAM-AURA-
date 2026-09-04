import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Sprout, 
  Building2, 
  ShieldCheck, 
  LogOut, 
  Sun, 
  Moon, 
  User,
  ExternalLink
} from 'lucide-react';

export default function AppNavbar({ currentUser, onLogout, theme, onToggleTheme }) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    if (onLogout) onLogout();
    navigate('/login');
  };

  return (
    <header className="app-navbar-wrapper">
      <div className="navbar-container">
        {/* Brand */}
        <div className="navbar-brand-section">
          <NavLink to="/" className="brand-logo-link">
            <div className="nav-logo-icon">
              <Sprout size={22} className="text-white" />
            </div>
            <div>
              <div className="brand-title-text">
                Krishi<span className="brand-accent">Route</span>
              </div>
              <div className="brand-sub-tag">Connect • Optimize • Nourish</div>
            </div>
          </NavLink>
        </div>

        {/* Portals Route Navigation Links */}
        <nav className="portal-routes-nav">
          <NavLink 
            to="/buyer" 
            className={({ isActive }) => `nav-route-item ${isActive ? 'active' : ''}`}
          >
            <Building2 size={16} />
            <span>Buyer App</span>
          </NavLink>

          <NavLink 
            to="/farmer" 
            className={({ isActive }) => `nav-route-item ${isActive ? 'active' : ''}`}
          >
            <Sprout size={16} />
            <span>Farmer App</span>
          </NavLink>

          <NavLink 
            to="/admin" 
            className={({ isActive }) => `nav-route-item ${isActive ? 'active' : ''}`}
          >
            <ShieldCheck size={16} />
            <span>Admin Control Tower</span>
          </NavLink>
        </nav>

        {/* Right User Meta & Actions */}
        <div className="navbar-actions-section">
          {/* Theme Toggle */}
          <button 
            onClick={onToggleTheme} 
            className="btn-theme-pill"
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          >
            {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
            <span>{theme === 'light' ? 'Night' : 'Light'}</span>
          </button>

          {/* User Profile Pill */}
          {currentUser ? (
            <div className="user-profile-badge">
              <div className="user-avatar-dot">
                <User size={14} />
              </div>
              <div className="user-meta-lines">
                <strong className="user-name-str">{currentUser.name}</strong>
                <span className="user-role-str">{currentUser.role?.toUpperCase()}</span>
              </div>
              <button 
                onClick={handleLogoutClick} 
                className="btn-logout-icon"
                title="Sign Out"
              >
                <LogOut size={15} />
              </button>
            </div>
          ) : (
            <NavLink to="/login" className="btn-signin-nav">
              Sign In
            </NavLink>
          )}
        </div>
      </div>

      <style>{`
        .app-navbar-wrapper {
          background: var(--bg-nav);
          border-bottom: 1px solid var(--border-color);
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
        }

        .navbar-container {
          max-width: 1440px;
          margin: 0 auto;
          padding: 10px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }

        .brand-logo-link {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }

        .nav-logo-icon {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(5, 150, 105, 0.3);
        }

        .brand-title-text {
          font-family: var(--font-heading);
          font-size: 1.35rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          line-height: 1.1;
        }

        .brand-accent {
          color: #059669;
        }

        .brand-sub-tag {
          font-size: 0.68rem;
          color: var(--text-muted);
        }

        .portal-routes-nav {
          display: flex;
          gap: 6px;
          background: var(--bg-card-subtle);
          padding: 4px;
          border-radius: 10px;
          border: 1px solid var(--border-color);
        }

        @media (max-width: 768px) {
          .portal-routes-nav {
            display: none;
          }
        }

        .nav-route-item {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: 8px;
          font-family: var(--font-heading);
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-secondary);
          text-decoration: none;
          transition: all 0.2s;
        }

        .nav-route-item:hover {
          color: var(--text-primary);
        }

        .nav-route-item.active {
          background: #ffffff;
          color: #059669;
          font-weight: 700;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
        }

        .navbar-actions-section {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .btn-theme-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          background: var(--bg-card-subtle);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.76rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .user-profile-badge {
          display: flex;
          align-items: center;
          gap: 10px;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          padding: 4px 10px 4px 6px;
          border-radius: 24px;
        }

        .user-avatar-dot {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #ecfdf5;
          color: #059669;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .user-meta-lines {
          display: flex;
          flex-direction: column;
        }

        .user-name-str {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.1;
        }

        .user-role-str {
          font-size: 0.62rem;
          font-weight: 800;
          color: #059669;
        }

        .btn-logout-icon {
          background: transparent;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          transition: color 0.2s;
        }

        .btn-logout-icon:hover {
          color: #dc2626;
        }

        .btn-signin-nav {
          background: #059669;
          color: #ffffff;
          padding: 6px 16px;
          border-radius: 8px;
          font-size: 0.82rem;
          font-weight: 700;
          text-decoration: none;
        }
      `}</style>
    </header>
  );
}
