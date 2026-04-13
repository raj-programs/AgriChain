import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import StatsCard from '../../components/StatsCard/StatsCard';
import { statsAPI } from '../../api/stats';
import { usersAPI } from '../../api/users';
import { analyticsAPI } from '../../api/analytics';

export default function AdminDashboard() {
  const [adminStats, setAdminStats] = useState({});
  const [users, setUsers] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      statsAPI.getAdminStats().catch(() => ({})),
      usersAPI.getAll().catch(() => []),
      analyticsAPI.getAdminAnalytics().catch(() => null),
    ]).then(([statsData, usersData, analyticsData]) => {
      setAdminStats(statsData);
      setUsers(usersData);
      setAnalytics(analyticsData);
    }).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <DashboardLayout><div style={{ textAlign: 'center', padding: '4rem', color: 'var(--gray)' }}>Loading dashboard...</div></DashboardLayout>;
  }

  const monthlyRevenue = analytics?.monthlyRevenue || [];
  const months = analytics?.months || [];
  const max = Math.max(...monthlyRevenue, 1);

  return (
    <DashboardLayout>
      <div className="page-title">Admin Dashboard</div>
      <div className="page-subtitle">Platform-wide overview and management</div>

      {adminStats.pendingApprovals > 0 && (
        <div style={{ background: '#fff3cd', border: '1px solid #ffc107', borderRadius: 'var(--radius-md)', padding: '0.875rem 1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', fontWeight: 600 }}>
          ⚠️ {adminStats.pendingApprovals} users pending verification · {adminStats.flaggedReports} flagged reports
          <Link to="/admin/users" style={{ marginLeft: 'auto', color: 'var(--primary)', fontWeight: 700 }}>Review Now →</Link>
        </div>
      )}

      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4,1fr)', marginBottom: '1.5rem' }}>
        <StatsCard icon="👥" label="Total Users" value={(adminStats.totalUsers || users.length).toLocaleString()} change="48 new this week" changeType="up" color="var(--primary)" bg="var(--accent-light)" />
        <StatsCard icon="🌾" label="Crop Listings" value={(adminStats.totalCrops || 0).toLocaleString()} change="120 new today" changeType="up" color="var(--success)" bg="#d4edda" />
        <StatsCard icon="📦" label="Total Orders" value={(adminStats.totalOrders || 0).toLocaleString()} change="234 this week" changeType="up" color="var(--info)" bg="#d1ecf1" />
        <StatsCard icon="💰" label="Platform Revenue" value={adminStats.totalRevenue || '₹0'} change="22% this month" changeType="up" color="var(--orange)" bg="var(--orange-light)" />
      </div>

      <div className="two-col">
        <div className="card">
          <div className="card-header">
            <span className="card-title">📈 Platform Revenue</span>
            <span className="badge badge-success">2025</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: 140, paddingBottom: '1.5rem' }}>
            {monthlyRevenue.map((v, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                <div style={{ width: '100%', height: `${(v / max) * 100}%`, background: 'linear-gradient(180deg, var(--primary-light), var(--primary))', borderRadius: '3px 3px 0 0' }} />
                <div style={{ fontSize: '0.6rem', color: 'var(--gray-light)', marginTop: 4 }}>{(months[i] || '').slice(0, 1)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">👥 Recent Users</span>
            <Link to="/admin/users" style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}>View All</Link>
          </div>
          <div className="data-table-wrap">
            <table className="data-table">
              <thead><tr><th>Name</th><th>Role</th><th>Joined</th><th>Status</th></tr></thead>
              <tbody>
                {users.slice(0, 4).map(u => (
                  <tr key={u.id}>
                    <td>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{u.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--gray)' }}>{u.email}</div>
                    </td>
                    <td><span className={`badge ${u.role === 'farmer' ? 'badge-primary' : 'badge-info'}`}>{u.role}</span></td>
                    <td style={{ fontSize: '0.82rem', color: 'var(--gray)' }}>{u.joined}</td>
                    <td><span className={`badge ${u.verified ? 'badge-success' : u.blocked ? 'badge-danger' : 'badge-warning'}`}>{u.verified ? 'Verified' : u.blocked ? 'Blocked' : 'Pending'}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: '1.5rem' }}>
        <div className="card-header"><span className="card-title">⚡ Admin Quick Actions</span></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem' }}>
          {[
            { icon: '👥', label: 'Verify Users', count: adminStats.pendingApprovals || 0, link: '/admin/users', color: 'var(--warning)', bg: '#fff3cd' },
            { icon: '🌾', label: 'Approve Crops', count: 8, link: '/admin/crops', color: 'var(--primary)', bg: 'var(--accent-light)' },
            { icon: '🚩', label: 'Review Reports', count: adminStats.flaggedReports || 0, link: '/admin/reports', color: 'var(--danger)', bg: '#fdf2f2' },
            { icon: '⚖️', label: 'Resolve Disputes', count: adminStats.activeDisputes || 0, link: '/admin/orders', color: 'var(--info)', bg: '#d1ecf1' },
          ].map(a => (
            <Link key={a.label} to={a.link} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', padding: '1.25rem', borderRadius: 'var(--radius-lg)', background: a.bg, textDecoration: 'none', position: 'relative', border: '1px solid rgba(0,0,0,0.04)' }}>
              {a.count > 0 && <span style={{ position: 'absolute', top: '0.5rem', right: '0.75rem', background: a.color, color: '#fff', fontSize: '0.68rem', fontWeight: 700, padding: '0.1rem 0.4rem', borderRadius: 'var(--radius-full)' }}>{a.count}</span>}
              <span style={{ fontSize: '1.75rem' }}>{a.icon}</span>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: a.color }}>{a.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
