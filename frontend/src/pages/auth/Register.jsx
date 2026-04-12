import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import './Auth.css';

const steps = ['Role & Info', 'Details', 'Verify'];

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [role, setRole] = useState('farmer');
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '', state: '', city: '', gstNumber: '' });
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpSent, setOtpSent] = useState(false);
  const [showPw, setShowPw] = useState(false);

  function handleFormChange(k, v) { setForm(prev => ({ ...prev, [k]: v })); }
  function handleOtp(i, val) {
    const next = [...otp];
    next[i] = val.slice(-1);
    setOtp(next);
    if (val && i < 5) document.getElementById(`otp-${i + 1}`)?.focus();
  }

  function handleSendOtp() { setOtpSent(true); setStep(2); }

  async function handleFinish() {
    try {
      const user = await register({ ...form, role });
      if (user.role === 'farmer') navigate('/farmer/dashboard');
      else if (user.role === 'buyer') navigate('/buyer/dashboard');
      else navigate('/admin/dashboard');
    } catch (err) {
      alert(err.response?.data?.error || 'Registration failed.');
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

          {/* Step 0: Role & Basic Info */}
          {step === 0 && (
            <>
              <div className="role-selector">
                {[{ id: 'farmer', icon: '👨‍🌾', name: 'Farmer' }, { id: 'buyer', icon: '🏪', name: 'Buyer' }].map(r => (
                  <button key={r.id} className={`role-btn${role === r.id ? ' active' : ''}`} type="button" onClick={() => setRole(r.id)}>
                    <span className="role-icon">{r.icon}</span>
                    <span className="role-name">{r.name}</span>
                  </button>
                ))}
              </div>
              <div className="form-group">
                <label>{role === 'buyer' ? 'Business Name' : 'Full Name'} *</label>
                <input required placeholder={role === 'buyer' ? 'FreshMart Pvt Ltd' : 'Rajesh Kumar'} value={form.name} onChange={e => handleFormChange('name', e.target.value)} />
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

          {/* Step 1: Details */}
          {step === 1 && (
            <>
              <div className="form-group">
                <label>Mobile Number *</label>
                <input type="tel" required placeholder="+91 98765 43210" value={form.phone} onChange={e => handleFormChange('phone', e.target.value)} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>State *</label>
                  <select required value={form.state} onChange={e => handleFormChange('state', e.target.value)}>
                    <option value="">Select state</option>
                    {['Punjab', 'Maharashtra', 'Karnataka', 'Gujarat', 'UP', 'Bihar', 'Haryana', 'Kerala', 'Tamil Nadu', 'Rajasthan'].map(s => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>City *</label>
                  <input required placeholder="Your city" value={form.city} onChange={e => handleFormChange('city', e.target.value)} />
                </div>
              </div>
              {role === 'farmer' && (
                <div className="form-group">
                  <label>Aadhaar / Kisan ID</label>
                  <input placeholder="For KYC verification" />
                </div>
              )}
              {role === 'buyer' && (
                <div className="form-group">
                  <label>GST Number</label>
                  <input placeholder="22AAAAA0000A1Z5" value={form.gstNumber} onChange={e => handleFormChange('gstNumber', e.target.value)} />
                </div>
              )}
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" className="btn btn-outline btn-lg" style={{ flex: 1 }} onClick={() => setStep(0)}>← Back</button>
                <button type="button" className="btn btn-primary btn-lg" style={{ flex: 2 }} onClick={handleSendOtp}>Send OTP →</button>
              </div>
            </>
          )}

          {/* Step 2: OTP Verify */}
          {step === 2 && (
            <>
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📱</div>
                <p style={{ color: 'var(--gray)', fontSize: '0.9rem' }}>
                  We've sent a 6-digit verification code to<br />
                  <strong style={{ color: 'var(--dark)' }}>{form.phone || '+91 XXXXX XXXXX'}</strong>
                </p>
              </div>
              <div className="otp-inputs">
                {otp.map((digit, i) => (
                  <input key={i} id={`otp-${i}`} type="text" maxLength={1} value={digit} onChange={e => handleOtp(i, e.target.value)} />
                ))}
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--gray)', textAlign: 'center', marginBottom: '1.5rem' }}>
                Didn't receive? <button type="button" style={{ color: 'var(--primary)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>Resend OTP</button>
              </p>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button type="button" className="btn btn-outline btn-lg" style={{ flex: 1 }} onClick={() => setStep(1)}>← Back</button>
                <button type="button" className="btn btn-primary btn-lg" style={{ flex: 2 }} onClick={handleFinish}>
                  ✓ Verify & Create Account
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
