import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Sprout, 
  Building2, 
  ShieldCheck, 
  ArrowRight, 
  MapPin, 
  Phone, 
  Mail, 
  Lock, 
  CheckCircle2, 
  DollarSign, 
  Briefcase,
  Layers,
  ChevronDown
} from 'lucide-react';
import * as api from '../services/api';

export default function RegisterPage({ onRegisterSuccess }) {
  const navigate = useNavigate();
  const [role, setRole] = useState('buyer'); // 'buyer' | 'farmer' | 'admin'
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    state: 'Rajasthan',
    district: 'Jaipur',
    location: '',
    // Farmer specific
    fpoName: 'Shree Krishi Farmer Producer Co',
    landAreaAcres: '10',
    primaryCrop: 'Tomato',
    bankAccount: 'SBI A/C 38291048291',
    upiId: '',
    // Buyer specific
    companyName: 'Jaipur Mega Agro Mart',
    gstin: '08AAAAA0000A1Z5',
    deliveryAddress: 'Muhana Mandi Wholesale Terminal, Jaipur'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setError('Please fill in your name and phone number.');
      return;
    }

    if (formData.password && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const payload = {
        ...formData,
        role,
        upiId: formData.upiId || `${formData.phone.replace(/[^0-9]/g, '')}@upi`
      };

      const res = await api.registerUser(payload);
      if (res.success && res.user) {
        if (onRegisterSuccess) onRegisterSuccess(res.user);
        if (role === 'admin') navigate('/admin');
        else if (role === 'farmer') navigate('/farmer');
        else navigate('/buyer');
      } else {
        setError(res.error || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Could not connect to registration server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page-layout">
      <div className="register-card-box">
        <div className="reg-top-bar">
          <div className="brand-badge-small">
            <Sprout size={20} className="text-emerald" />
            <span>KrishiRoute Enterprise</span>
          </div>
          <Link to="/login" className="login-link-pill">
            Already registered? Sign In
          </Link>
        </div>

        <div className="reg-header">
          <h2>Create New Account</h2>
          <p>Join the direct farmgate procurement and logistics network</p>
        </div>

        {error && (
          <div className="auth-error-banner">
            <span>⚠️ {error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="reg-form">
          {/* Step 1: Select User Role */}
          <div className="form-section-title">1. SELECT YOUR PORTAL ROLE</div>
          <div className="role-selector-grid">
            <div 
              className={`role-option-card ${role === 'buyer' ? 'selected' : ''}`}
              onClick={() => setRole('buyer')}
            >
              <div className="role-opt-icon buyer-icon"><Building2 size={22} /></div>
              <div className="role-opt-text">
                <strong>Wholesale Buyer</strong>
                <span>Procure bulk produce, demand aggregation, locked logistics</span>
              </div>
            </div>

            <div 
              className={`role-option-card ${role === 'farmer' ? 'selected' : ''}`}
              onClick={() => setRole('farmer')}
            >
              <div className="role-opt-icon farmer-icon"><Sprout size={22} /></div>
              <div className="role-opt-text">
                <strong>Farmer / FPO Producer</strong>
                <span>List harvest lots, guaranteed buyer contracts, instant bank payouts</span>
              </div>
            </div>

            <div 
              className={`role-option-card ${role === 'admin' ? 'selected' : ''}`}
              onClick={() => setRole('admin')}
            >
              <div className="role-opt-icon admin-icon"><ShieldCheck size={22} /></div>
              <div className="role-opt-text">
                <strong>Fleet / Platform Admin</strong>
                <span>Logistics coordination, corridor telemetry & escrow settlements</span>
              </div>
            </div>
          </div>

          {/* Step 2: Contact Details */}
          <div className="form-section-title" style={{ marginTop: '20px' }}>
            2. PERSONAL & CONTACT INFORMATION
          </div>
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input 
                type="text" 
                placeholder="e.g. Rajesh Singhania"
                value={formData.name}
                onChange={e => handleChange('name', e.target.value)}
                className="form-input-clean"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Mobile Number *</label>
              <input 
                type="text" 
                placeholder="+91 98290 44910"
                value={formData.phone}
                onChange={e => handleChange('phone', e.target.value)}
                className="form-input-clean"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input 
                type="email" 
                placeholder="name@business.com"
                value={formData.email}
                onChange={e => handleChange('email', e.target.value)}
                className="form-input-clean"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input 
                type="password" 
                placeholder="Choose a password"
                value={formData.password}
                onChange={e => handleChange('password', e.target.value)}
                className="form-input-clean"
              />
            </div>
          </div>

          {/* Step 3: Location Details */}
          <div className="form-section-title" style={{ marginTop: '20px' }}>
            3. REGION & CORRIDOR LOCATION
          </div>
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">State *</label>
              <select 
                value={formData.state} 
                onChange={e => handleChange('state', e.target.value)}
                className="form-select-clean"
              >
                <option value="Rajasthan">Rajasthan (Pilot Corridor RJ-01)</option>
                <option value="Maharashtra">Maharashtra (Agri Corridor MH-02)</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Punjab">Punjab</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">District / Cluster *</label>
              <input 
                type="text" 
                placeholder="e.g. Jaipur / Chittorgarh / Tonk / Nashik"
                value={formData.district}
                onChange={e => handleChange('district', e.target.value)}
                className="form-input-clean"
                required
              />
            </div>
          </div>

          {/* Step 4: Role Specific Business Information */}
          <div className="form-section-title" style={{ marginTop: '20px' }}>
            4. {role === 'farmer' ? 'FARM & SETTLEMENT DETAILS' : role === 'buyer' ? 'COMMERCIAL PROCUREMENT DETAILS' : 'DISPATCH CREDENTIALS'}
          </div>

          {role === 'farmer' && (
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">FPO / Cooperative Society Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Shree Krishi FPO"
                  value={formData.fpoName}
                  onChange={e => handleChange('fpoName', e.target.value)}
                  className="form-input-clean"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Primary Produce Crop</label>
                <select 
                  value={formData.primaryCrop} 
                  onChange={e => handleChange('primaryCrop', e.target.value)}
                  className="form-select-clean"
                >
                  <option value="Tomato">Tomato (Hybrid / Desi)</option>
                  <option value="Onion">Nashik Red Onion</option>
                  <option value="Wheat">Wheat (Sharbati)</option>
                  <option value="Potato">Potato (Kufri Pukhraj)</option>
                  <option value="Citrus">Nagpur Mandarin Orange</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Land Holding Area (in Acres)</label>
                <input 
                  type="number" 
                  placeholder="e.g. 10"
                  value={formData.landAreaAcres}
                  onChange={e => handleChange('landAreaAcres', e.target.value)}
                  className="form-input-clean"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Direct Bank Account / UPI (For Escrow Payouts)</label>
                <input 
                  type="text" 
                  placeholder="SBI A/C / 9829044910@upi"
                  value={formData.bankAccount}
                  onChange={e => handleChange('bankAccount', e.target.value)}
                  className="form-input-clean"
                />
              </div>
            </div>
          )}

          {role === 'buyer' && (
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Company / Retail Enterprise Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. FreshBazaar Hypermarkets Pvt Ltd"
                  value={formData.companyName}
                  onChange={e => handleChange('companyName', e.target.value)}
                  className="form-input-clean"
                />
              </div>

              <div className="form-group">
                <label className="form-label">GSTIN / Registration Number (Optional)</label>
                <input 
                  type="text" 
                  placeholder="e.g. 08AAAAA0000A1Z5"
                  value={formData.gstin}
                  onChange={e => handleChange('gstin', e.target.value)}
                  className="form-input-clean"
                />
              </div>

              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label className="form-label">Central Receiving Warehouse Address</label>
                <input 
                  type="text" 
                  placeholder="e.g. Jaipur Central Logistics Hub, Muhana Terminal"
                  value={formData.deliveryAddress}
                  onChange={e => handleChange('deliveryAddress', e.target.value)}
                  className="form-input-clean"
                />
              </div>
            </div>
          )}

          {role === 'admin' && (
            <div className="grid-2">
              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label className="form-label">Corridor Operations Hub</label>
                <input 
                  type="text" 
                  value="Rajasthan Central Corridor (Jaipur - Tonk - Chittorgarh)"
                  className="form-input-clean"
                  disabled
                />
              </div>
            </div>
          )}

          <div className="reg-submit-wrap">
            <button 
              type="submit" 
              className="btn-reg-submit"
              disabled={loading}
            >
              {loading ? 'Creating Your Account...' : `Complete Registration as ${role.toUpperCase()}`}
              <ArrowRight size={18} />
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .register-page-layout {
          min-height: 100vh;
          background: #f8fafc;
          padding: 30px 16px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .register-card-box {
          width: 100%;
          max-width: 840px;
          background: #ffffff;
          border-radius: 20px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 20px 40px -15px rgba(15, 23, 42, 0.08);
          padding: 36px 42px;
        }

        @media (max-width: 600px) {
          .register-card-box {
            padding: 24px 18px;
          }
        }

        .reg-top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .brand-badge-small {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.15rem;
          color: #0f172a;
        }

        .login-link-pill {
          font-size: 0.78rem;
          font-weight: 700;
          color: #059669;
          text-decoration: none;
          background: #ecfdf5;
          padding: 6px 14px;
          border-radius: 20px;
          border: 1px solid rgba(5, 150, 105, 0.2);
          transition: all 0.2s;
        }

        .login-link-pill:hover {
          background: #d1fae5;
        }

        .reg-header h2 {
          font-family: var(--font-heading);
          font-size: 1.7rem;
          font-weight: 800;
          color: #0f172a;
        }

        .reg-header p {
          font-size: 0.86rem;
          color: #64748b;
          margin-top: 4px;
          margin-bottom: 24px;
        }

        .auth-error-banner {
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #dc2626;
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 0.82rem;
          font-weight: 600;
          margin-bottom: 20px;
        }

        .form-section-title {
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: #059669;
          margin-bottom: 12px;
        }

        .role-selector-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        @media (max-width: 760px) {
          .role-selector-grid {
            grid-template-columns: 1fr;
          }
        }

        .role-option-card {
          border: 1.5px solid #e2e8f0;
          border-radius: 12px;
          padding: 14px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: flex-start;
          gap: 12px;
          background: #f8fafc;
        }

        .role-option-card:hover {
          border-color: #059669;
          background: #ffffff;
        }

        .role-option-card.selected {
          border-color: #059669;
          background: #ecfdf5;
          box-shadow: 0 0 0 2px rgba(5, 150, 105, 0.2);
        }

        .role-opt-icon {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .buyer-icon { background: rgba(2, 132, 199, 0.12); color: #0284c7; }
        .farmer-icon { background: rgba(5, 150, 105, 0.12); color: #059669; }
        .admin-icon { background: rgba(217, 119, 6, 0.12); color: #d97706; }

        .role-opt-text strong {
          display: block;
          font-size: 0.84rem;
          color: #0f172a;
        }

        .role-opt-text span {
          display: block;
          font-size: 0.7rem;
          color: #64748b;
          margin-top: 3px;
          line-height: 1.3;
        }

        .form-input-clean, .form-select-clean {
          width: 100%;
          padding: 10px 12px;
          border-radius: 8px;
          border: 1px solid #cbd5e1;
          font-family: inherit;
          font-size: 0.86rem;
          color: #0f172a;
          outline: none;
          background: #ffffff;
          transition: border-color 0.2s;
        }

        .form-input-clean:focus, .form-select-clean:focus {
          border-color: #059669;
          box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.15);
        }

        .reg-submit-wrap {
          margin-top: 32px;
          padding-top: 20px;
          border-top: 1px solid #e2e8f0;
        }

        .btn-reg-submit {
          width: 100%;
          padding: 14px;
          border-radius: 10px;
          border: none;
          background: #059669;
          color: #ffffff;
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(5, 150, 105, 0.25);
          transition: background 0.2s;
        }

        .btn-reg-submit:hover {
          background: #047857;
        }
      `}</style>
    </div>
  );
}
