import { useState, useEffect } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { cropsAPI } from '../../api/crops';

export default function AdminCrops() {
  const [cropList, setCropList] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cropsAPI.getAll()
      .then(data => setCropList(data.map(c => ({ ...c, approvalStatus: c.approvalStatus || (c.available ? 'Approved' : 'Pending') }))))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  function updateApproval(id, status) {
    cropsAPI.update(id, { approvalStatus: status }).then(() => {
      setCropList(prev => prev.map(c => c.id === id ? { ...c, approvalStatus: status } : c));
    });
  }

  const filtered = cropList.filter(c => {
    const matchStatus = filter === 'All' || c.approvalStatus === filter;
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.farmer.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const approvalBadge = s => s === 'Approved' ? 'badge-success' : s === 'Pending' ? 'badge-warning' : 'badge-danger';

  if (loading) {
    return <DashboardLayout><div style={{ textAlign: 'center', padding: '4rem', color: 'var(--gray)' }}>Loading crops...</div></DashboardLayout>;
  }

  return (
    <DashboardLayout>
      <div className="page-title">Crop Management</div>
      <div className="page-subtitle">Review and approve crop listings from farmers</div>

      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <input placeholder="🔍 Search crops or farmers..." value={search} onChange={e => setSearch(e.target.value)} style={{ flex: 1, minWidth: 200, padding: '0.5rem 1rem', border: '1.5px solid var(--border)', borderRadius: 'var(--radius-md)', fontSize: '0.875rem', outline: 'none' }} />
        {['All', 'Approved', 'Pending', 'Rejected'].map(f => (
          <button key={f} className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-outline'}`} onClick={() => setFilter(f)}>{f}</button>
        ))}
      </div>

      <div className="card">
        <div className="data-table-wrap">
          <table className="data-table">
            <thead><tr><th>Crop</th><th>Farmer</th><th>Category</th><th>Price</th><th>Qty</th><th>Organic</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                      <img src={c.image} alt={c.name} style={{ width: 36, height: 36, borderRadius: 'var(--radius-sm)', objectFit: 'cover', flexShrink: 0 }} />
                      <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>{c.name}</span>
                    </div>
                  </td>
                  <td style={{ fontSize: '0.875rem' }}>👨‍🌾 {c.farmer}</td>
                  <td><span className="badge badge-primary">{c.category}</span></td>
                  <td><strong style={{ color: 'var(--primary)' }}>₹{c.price}/{c.unit}</strong></td>
                  <td>{c.quantity}{c.unit}</td>
                  <td>{c.organic ? <span className="badge badge-success">🌿 Yes</span> : <span style={{ color: 'var(--gray)', fontSize: '0.8rem' }}>No</span>}</td>
                  <td><span className={`badge ${approvalBadge(c.approvalStatus)}`}>{c.approvalStatus}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.375rem' }}>
                      {c.approvalStatus !== 'Approved' && <button className="btn btn-sm" style={{ background: '#d4edda', color: '#155724', border: 'none' }} onClick={() => updateApproval(c.id, 'Approved')}>✓ Approve</button>}
                      {c.approvalStatus !== 'Rejected' && <button className="btn btn-sm" style={{ background: '#fdf2f2', color: 'var(--danger)', border: 'none' }} onClick={() => updateApproval(c.id, 'Rejected')}>✕ Reject</button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
