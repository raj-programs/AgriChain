import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import './DashboardLayout.css';

function getTitle(pathname) {
  const segments = pathname.split('/').filter(Boolean);
  const last = segments[segments.length - 1];
  return last ? last.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Dashboard';
}

export default function DashboardLayout({ children }) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const title = getTitle(location.pathname);
  const now = new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <div className="dashboard-wrapper">
        <Sidebar mobileOpen={sidebarOpen} />
        <div className="dashboard-main">
          <div className="dashboard-topbar">
            <div className="topbar-left">
              <button
                style={{ display: 'none', fontSize: '1.2rem', background: 'none', border: 'none', cursor: 'pointer' }}
                className="sidebar-toggle"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                ☰
              </button>
              <div className="topbar-title">{title}</div>
            </div>
            <div className="topbar-right">
              <span className="topbar-date">{now}</span>
            </div>
          </div>
          <div className="dashboard-content">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
