import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

export default function ForgotPassword() {
  const [step, setStep] = useState(0); // 0=email, 1=otp, 2=new pw, 3=done
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  function handleOtp(i, val) {
    const next = [...otp];
    next[i] = val.slice(-1);
    setOtp(next);
    if (val && i < 5) document.getElementById(`fp-otp-${i + 1}`)?.focus();
  }

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-brand">
          <div className="logo">Agri<span>Chain</span></div>
          <div className="tagline">India's Farmer-First Platform</div>
        </div>
        <div className="auth-hero-content">
          <h2>Reset Your Password</h2>
          <p>Don't worry — it happens to the best of us. We'll get you back in no time.</p>
          <div className="auth-feature-list">
            {['Secure password reset via OTP', 'Code sent to registered email/phone', 'New password set in under 2 minutes'].map(f => (
              <div key={f} className="auth-feature"><div className="auth-feature-icon">✓</div><span>{f}</span></div>
            ))}
          </div>
        </div>
        <div className="auth-bottom">© 2025 AgriChain Technologies Pvt Ltd</div>
      </div>

      <div className="auth-right">
        <div className="auth-form-container">
          {step === 0 && (
            <>
              <h1 className="auth-form-title">Forgot Password?</h1>
              <p className="auth-form-subtitle">Enter your email and we'll send you a reset code.</p>
              <div style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '1.5rem' }}>🔐</div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" required placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <button className="btn btn-primary btn-lg auth-submit" onClick={() => setStep(1)} disabled={!email}>
                📧 Send Reset Code
              </button>
              <div className="auth-footer-text"><Link to="/login">← Back to Login</Link></div>
            </>
          )}

          {step === 1 && (
            <>
              <h1 className="auth-form-title">Enter OTP</h1>
              <p className="auth-form-subtitle">6-digit code sent to {email}</p>
              <div style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '1.5rem' }}>📱</div>
              <div className="otp-inputs">
                {otp.map((d, i) => (
                  <input key={i} id={`fp-otp-${i}`} type="text" maxLength={1} value={d} onChange={e => handleOtp(i, e.target.value)} />
                ))}
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--gray)', textAlign: 'center', marginBottom: '1.5rem' }}>
                Resend code in <strong>00:45</strong>
              </p>
              <button className="btn btn-primary btn-lg auth-submit" onClick={() => setStep(2)}>
                Verify Code →
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <h1 className="auth-form-title">New Password</h1>
              <p className="auth-form-subtitle">Choose a strong, unique password for your account.</p>
              <div className="form-group">
                <label>New Password</label>
                <input type="password" placeholder="Min. 8 characters" value={password} onChange={e => setPassword(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input type="password" placeholder="Repeat your new password" value={confirm} onChange={e => setConfirm(e.target.value)} />
              </div>
              <button className="btn btn-primary btn-lg auth-submit" onClick={() => setStep(3)} disabled={!password || password !== confirm}>
                ✓ Reset Password
              </button>
            </>
          )}

          {step === 3 && (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
              <h2 style={{ fontWeight: 800, marginBottom: '0.75rem' }}>Password Reset!</h2>
              <p style={{ color: 'var(--gray)', marginBottom: '2rem' }}>Your password has been updated successfully. You can now log in with your new password.</p>
              <Link to="/login" className="btn btn-primary btn-lg" style={{ display: 'inline-flex' }}>→ Go to Login</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
