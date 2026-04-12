import { useState, useEffect } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { usersAPI } from '../../api/users';

export default function UsersManagement() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    usersAPI.getAll()
      .then(data => setUsers(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = users.filter(u => {
    const matchRole = filter === 'All' || u.role.toLowerCase() === filter.toLowerCase();
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    return matchRole && matchSearch;
  });

  function updateStatus(id, status) {
    usersAPI.updateStatus(id, status).then(updated => {
      setUsers(prev => prev.map(u => u.id === id ? { ...u, ...updated } : u));
    });
  }

  const getStatus = u => u.verified ? 'Verified' : u.blocked ? 'Blocked' : 'Pending';
  const statusBadge = s => s === 'Verified' ? 'badge-success' : s === 'Pending' ? 'badge-warning' : 'badge-danger';

  if (loading) {
    return <DashboardLayout><div style={{ textAlign: 'center', padding: '4rem', color: 'var(--gray)' }}>Loading users...</div></DashboardLayout>;
  }

  return (
    <DashboardLayout>
      <div className="page-title">User Management</div>
      <div className="page-subtitle">Verify, manage, and monitor all platform users</div>

      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4,1fr)', marginBottom: '1.5rem' }}>
        {[
          { label: 'Total Users', value: users.length, icon: '👥' },
          { label: 'Verified', value: users.filter(u => u.verified).length, icon: '✅' },
          { label: 'Pending', value: users.filter(u => !u.verified && !u.blocked).length, icon: '⏳' },
          { label: 'Blocked', value: users.filter(u => u.blocked).length, icon: '🚫' },
        ].map(s => (
          <div key={s.label} className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '1.75rem' }}>{s.icon}</span>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{s.value}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--gray)', fontWeight: 600 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <input placeholder="🔍 Search users..." value={search} onChange={e => setSearch(e.target.value)} style={{ flex: 1, minWidth: 200, padding: '0.5rem 1rem', border: '1.5px solid var(--border)', borderRadius: 'var(--radius-md)', fontSize: '0.875rem', outline: 'none' }} />
        {['All', 'Farmer', 'Buyer'].map(f => (
          <button key={f} className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-outline'}`} onClick={() => setFilter(f)}>{f}</button>
        ))}
      </div>

      <div className="card">
        <div className="data-table-wrap">
          <table className="data-table">
            <thead>
              <tr><th>User</th><th>Role</th><th>Joined</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map(u => {
                const status = getStatus(u);
                return (
                  <tr key={u.id}>
                    <td>
                      <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>{u.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--gray)' }}>{u.email}</div>
                    </td>
                    <td><span className={`badge ${u.role === 'farmer' ? 'badge-primary' : 'badge-info'}`}>{u.role}</span></td>
                    <td style={{ fontSize: '0.82rem', color: 'var(--gray)' }}>{u.joined}</td>
                    <td><span className={`badge ${statusBadge(status)}`}>{status}</span></td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.375rem' }}>
                        {status !== 'Verified' && (
                          <button className="btn btn-sm" style={{ background: '#d4edda', color: '#155724', border: 'none' }} onClick={() => updateStatus(u.id, 'Verified')}>✓ Verify</button>
                        )}
                        {status !== 'Blocked' && (
                          <button className="btn btn-sm" style={{ background: '#fdf2f2', color: 'var(--danger)', border: 'none' }} onClick={() => updateStatus(u.id, 'Blocked')}>🚫 Block</button>
                        )}
                        {status === 'Blocked' && (
                          <button className="btn btn-sm btn-outline" onClick={() => updateStatus(u.id, 'Verified')}>Unblock</button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--gray)' }}>No users found</div>
        )}
      </div>
    </DashboardLayout>
  );
}
