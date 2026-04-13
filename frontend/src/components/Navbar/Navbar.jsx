import { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function handleLogout() {
    logout();
    navigate('/');
    setDropOpen(false);
  }

  const dashboardPath = user
    ? user.role === 'farmer' ? '/farmer/dashboard'
      : user.role === 'buyer' ? '/buyer/dashboard'
        : '/admin/dashboard'
    : '/login';

  const publicLinks = [
    { to: '/', label: 'Home' },
    { to: '/marketplace', label: 'Marketplace' },
    { to: '/how-it-works', label: 'How It Works' },
    { to: '/about', label: 'About Us' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <nav className="navbar">
        <div className="navbar-inner">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <div className="logo-icon">🌿</div>
            <span className="logo-text">Agri<span>Chain</span></span>
          </Link>

          {/* Desktop Links */}
          <div className="navbar-links">
            {publicLinks.map(l => (
              <NavLink key={l.to} to={l.to} end={l.to === '/'} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                {l.label}
              </NavLink>
            ))}
            {user && (
              <NavLink to={dashboardPath} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                Dashboard
              </NavLink>
            )}
          </div>

          {/* Desktop Actions */}
          {!user ? (
            <div className="navbar-actions">
              <Link to="/login" className="btn btn-outline btn-sm">Login</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
            </div>
          ) : (
            <div className="navbar-user">

              <div className="user-avatar-btn" onClick={() => setDropOpen(!dropOpen)} ref={dropRef}>

                <span className="user-name">{user.name}</span>
                <span>▾</span>
                {dropOpen && (
                  <div className="user-dropdown">
                    <div className="dropdown-header">
                      <div className="d-name">{user.name}</div>
                      <div className="d-role">{user.role}</div>
                    </div>
                    <Link to={dashboardPath} className="dropdown-item" onClick={() => setDropOpen(false)}>📊 Dashboard</Link>
                    <Link to={`/${user.role}/settings`} className="dropdown-item" onClick={() => setDropOpen(false)}>⚙️ Settings</Link>
                    <div className="dropdown-divider" />
                    <button className="dropdown-item logout" onClick={handleLogout}>🚪 Logout</button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Hamburger */}
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {publicLinks.map(l => (
          <NavLink key={l.to} to={l.to} end={l.to === '/'} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            onClick={() => setMenuOpen(false)}>
            {l.label}
          </NavLink>
        ))}
        {user && (
          <NavLink to={dashboardPath} className="nav-link" onClick={() => setMenuOpen(false)}>Dashboard</NavLink>
        )}
        {!user ? (
          <div className="navbar-actions">
            <Link to="/login" className="btn btn-outline" onClick={() => setMenuOpen(false)}>Login</Link>
            <Link to="/register" className="btn btn-primary" onClick={() => setMenuOpen(false)}>Register</Link>
          </div>
        ) : (
          <button className="btn btn-outline" onClick={() => { handleLogout(); setMenuOpen(false); }}>Logout</button>
        )}
      </div>
    </>
  );
}
