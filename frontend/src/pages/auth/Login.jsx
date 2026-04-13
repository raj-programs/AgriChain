import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import './Auth.css';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  // Removed 'role' state as it's now detected automatically after login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // login() now returns the user object with the 'role' fetched from the DB
      const user = await login(email, password);

      // Automatic Redirection Logic
      if (user.role === 'farmer') {
        navigate('/farmer/dashboard');
      } else if (user.role === 'buyer' || user.role === 'customer') {
        navigate('/buyer/dashboard');
      } else if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      // Supabase errors usually come in a .message property
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      {/* Left Side: Branding & Features */}
      <div className="auth-left">
        <div className="auth-brand">
          <div className="logo">Agri<span>Chain</span></div>
          <div className="tagline">India's Farmer-First Platform</div>
        </div>
        <div className="auth-hero-content">
          <h2>Welcome Back to AgriChain</h2>
          <p>Continue building fair, transparent, and direct agricultural trade. Your dashboard is waiting.</p>
          <div className="auth-feature-list">
            {['Access live market prices', 'Connect directly with buyers', 'Track all your orders in real-time', 'View earnings & analytics'].map(f => (
              <div key={f} className="auth-feature">
                <div className="auth-feature-icon">✓</div>
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="auth-bottom">© 2026 AgriChain Technologies Pvt Ltd</div>
      </div>

      {/* Right Side: Login Form */}
      <div className="auth-right">
        <div className="auth-form-container">
          <h1 className="auth-form-title">Sign In</h1>
          
          <div className="auth-divider">Sign in with your email</div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                required 
                placeholder="you@example.com" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="password-toggle">
                <input 
                  type={showPw ? 'text' : 'password'} 
                  required 
                  placeholder="Enter your password" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                />
                <button 
                  type="button" 
                  className="toggle-btn" 
                  onClick={() => setShowPw(!showPw)}
                >
                  {showPw ? '🙈' : '👁️'}
                </button>
              </div>
            </div>
            
            {error && (
              <div style={{ color: 'red', fontSize: '0.875rem', marginBottom: '1rem', fontWeight: '500' }}>
                ⚠️ {error}
              </div>
            )}

            <button type="submit" className="btn btn-primary btn-lg auth-submit" disabled={loading}>
              {loading ? '⏳ Verifying...' : '→ Sign In'}
            </button>
          </form>

          <div className="auth-footer-text">
            Don't have an account? <Link to="/register">Create one free</Link>
          </div>
        </div>
      </div>
    </div>
  );
}