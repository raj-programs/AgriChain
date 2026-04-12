import { useState, useEffect } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { reportsAPI } from '../../api/reports';

export default function Reports() {
  const [fraudReports, setFraudReports] = useState([]);
  const [spoilageReports, setSpoilageReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    reportsAPI.getAll()
      .then(data => {
        setFraudReports(data.fraudReports || []);
        setSpoilageReports(data.spoilageReports || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const severityBadge = s => s === 'High' ? 'badge-danger' : s === 'Medium' ? 'badge-warning' : 'badge-info';
  const statusBadge   = s => s === 'Resolved' ? 'badge-success' : s === 'Under Review' ? 'badge-warning' : 'badge-primary';

  function updateStatus(id, status) {
    reportsAPI.updateStatus(id, status).then(() => {
      setFraudReports(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    });
  }

  if (loading) {
    return <DashboardLayout><div style={{ textAlign: 'center', padding: '4rem', color: 'var(--gray)' }}>Loading reports...</div></DashboardLayout>;
  }

  return (
    <DashboardLayout>
      <div className="page-title">Reports & Monitoring</div>
      <div className="page-subtitle">Review fraud reports, spoilage claims, and platform violations</div>

      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3,1fr)', marginBottom: '1.5rem' }}>
        {[
          { label: 'Open Reports', value: fraudReports.filter(r => r.status !== 'Resolved').length, icon: '🚩', color: 'var(--danger)' },
          { label: 'Resolved', value: fraudReports.filter(r => r.status === 'Resolved').length, icon: '✅', color: 'var(--success)' },
          { label: 'Spoilage Claims', value: spoilageReports.length, icon: '⚠️', color: 'var(--warning)' },
        ].map(s => (
          <div key={s.label} className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '2rem' }}>{s.icon}</span>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--gray)', fontWeight: 600 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div className="card-header"><span className="card-title">🚩 Fraud & Violation Reports</span></div>
        <div className="data-table-wrap">
          <table className="data-table">
            <thead><tr><th>Report ID</th><th>Type</th><th>Reporter</th><th>Reported Party</th><th>Date</th><th>Severity</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {fraudReports.map(r => (
                <tr key={r.id}>
                  <td><strong>{r.id}</strong></td>
                  <td>{r.type}</td>
                  <td style={{ fontSize: '0.85rem' }}>{r.reporter}</td>
                  <td style={{ fontSize: '0.85rem', color: 'var(--danger)' }}>{r.reported}</td>
                  <td style={{ color: 'var(--gray)', fontSize: '0.85rem' }}>{r.date}</td>
                  <td><span className={`badge ${severityBadge(r.severity)}`}>{r.severity}</span></td>
                  <td><span className={`badge ${statusBadge(r.status)}`}>{r.status}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.375rem' }}>
                      {r.status !== 'Resolved' && <button className="btn btn-sm" style={{ background: '#d4edda', color: '#155724', border: 'none' }} onClick={() => updateStatus(r.id, 'Resolved')}>✓ Resolve</button>}
                      <button className="btn btn-outline btn-sm">Details</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <div className="card-header"><span className="card-title">⚠️ Spoilage Claims</span></div>
        <div className="data-table-wrap">
          <table className="data-table">
            <thead><tr><th>Crop</th><th>Quantity</th><th>Reason</th><th>Date</th><th>Est. Value</th><th>Status</th></tr></thead>
            <tbody>
              {spoilageReports.map(r => (
                <tr key={r.id}>
                  <td><strong>{r.crop}</strong></td>
                  <td>{r.quantity}kg</td>
                  <td>{r.reason}</td>
                  <td style={{ color: 'var(--gray)', fontSize: '0.85rem' }}>{r.date}</td>
                  <td><strong style={{ color: 'var(--danger)' }}>₹{r.value?.toLocaleString()}</strong></td>
                  <td><span className={`badge ${r.status === 'Submitted' ? 'badge-primary' : 'badge-warning'}`}>{r.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
