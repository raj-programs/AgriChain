import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import './Auth.css';

const steps = ['Role & Info', 'Details'];

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [role, setRole] = useState('Farmer');
  const [form, setForm] = useState({ name: '', email: '', phoneNo: '', password: '', dob: '', addressLane1: '', addressLane2: '', city: '', state: '', postalCode: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function handleFormChange(k, v) { setForm(prev => ({ ...prev, [k]: v })); }

  async function handleSubmit() {
    setLoading(true);
    setError('');
    try {
      // Combine address fields into single string
      const addressParts = [form.addressLane1, form.addressLane2, form.city, form.state, form.postalCode].filter(Boolean);
      const address = addressParts.join(', ');
      const user = await register({ fullName: form.name, email: form.email, password: form.password, role, phoneNo: form.phoneNo, address, dob: form.dob });
      if (user.role === 'Farmer') navigate('/farmer/dashboard');
      else if (user.role === 'Buyer') navigate('/buyer/dashboard');
      else navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      {/* Left */}
      <div className="auth-left">
        <div className="auth-brand">
          <div className="logo">Agri<span>Chain</span></div>
          <div className="tagline">India's Farmer-First Platform</div>
        </div>
        <div className="auth-hero-content">
          <h2>Join 2,400+ Farmers & Buyers</h2>
          <p>Create your free account and start trading directly. No middlemen, no hidden fees, no hassle.</p>
          <div className="auth-feature-list">
            {['100% Free to register', 'Verified buyer & seller network', 'Secure escrow payments', 'Real-time order tracking', 'Dedicated support team'].map(f => (
              <div key={f} className="auth-feature"><div className="auth-feature-icon">✓</div><span>{f}</span></div>
            ))}
          </div>
        </div>
        <div className="auth-bottom">© 2025 AgriChain Technologies Pvt Ltd</div>
      </div>

      {/* Right */}
      <div className="auth-right">
        <div className="auth-form-container">
          <h1 className="auth-form-title">Create Account</h1>
          <p className="auth-form-subtitle">Step {step + 1} of {steps.length} — {steps[step]}</p>

          {/* Progress */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
            {steps.map((s, i) => (
              <div key={s} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= step ? 'var(--primary)' : 'var(--border)' }} />
            ))}
          </div>

          {error && (
            <div style={{ background: '#fdf2f2', color: 'var(--danger)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem', fontSize: '0.875rem', fontWeight: 600 }}>⚠️ {error}</div>
          )}

          {/* Step 0: Role & Basic Info */}
          {step === 0 && (
            <>
              <div className="role-selector">
                {[{ id: 'Farmer', icon: '👨‍🌾', name: 'Farmer' }, { id: 'Buyer', icon: '🏪', name: 'Buyer' }].map(r => (
                  <button key={r.id} className={`role-btn${role === r.id ? ' active' : ''}`} type="button" onClick={() => setRole(r.id)}>
                    <span className="role-icon">{r.icon}</span>
                    <span className="role-name">{r.name}</span>
                  </button>
                ))}
              </div>
              <div className="form-group">
                <label>{role === 'Buyer' ? 'Business Name' : 'Full Name'} *</label>
                <input required placeholder={role === 'Buyer' ? 'FreshMart Pvt Ltd' : 'Rajesh Kumar'} value={form.name} onChange={e => handleFormChange('name', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <input type="email" required placeholder="you@example.com" value={form.email} onChange={e => handleFormChange('email', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Password *</label>
                <div className="password-toggle">
                  <input type={showPw ? 'text' : 'password'} required placeholder="Min. 8 characters" value={form.password} onChange={e => handleFormChange('password', e.target.value)} />
                  <button type="button" className="toggle-btn" onClick={() => setShowPw(!showPw)}>{showPw ? '🙈' : '👁️'}</button>
                </div>
              </div>
              <button type="button" className="btn btn-primary btn-lg auth-submit" onClick={() => setStep(1)}>Continue →</button>
            </>
          )}

          {/* Step 1: Details & Submit */}
          {step === 1 && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>Mobile Number *</label>
                  <input type="tel" required placeholder="+91 98765 43210" value={form.phoneNo} onChange={e => handleFormChange('phoneNo', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Date of Birth</label>
                  <input type="date" value={form.dob} onChange={e => handleFormChange('dob', e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <label>Address Line 1 *</label>
                <input required placeholder="House No, Street Name" value={form.addressLane1} onChange={e => handleFormChange('addressLane1', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Address Line 2</label>
                <input placeholder="Area, Landmark (optional)" value={form.addressLane2} onChange={e => handleFormChange('addressLane2', e.target.value)} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>City / Village *</label>
                  <input required placeholder="Your city" value={form.city} onChange={e => handleFormChange('city', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>State *</label>
                  <select required value={form.state} onChange={e => handleFormChange('state', e.target.value)}>
                    <option value="">Select state</option>
                    {['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'].map(s => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Postal Code *</label>
                  <input required placeholder="110001" value={form.postalCode} onChange={e => handleFormChange('postalCode', e.target.value)} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" className="btn btn-outline btn-lg" style={{ flex: 1 }} onClick={() => setStep(0)}>← Back</button>
                <button type="button" className="btn btn-primary btn-lg" style={{ flex: 2 }} onClick={handleSubmit} disabled={loading}>
                  {loading ? '⏳ Creating Account...' : '✓ Create Account'}
                </button>
              </div>
            </>
          )}

          <div className="auth-footer-text">
            Already have an account? <Link to="/login">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
