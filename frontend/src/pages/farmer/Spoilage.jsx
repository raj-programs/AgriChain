import { useState, useEffect } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { spoilageAPI } from '../../api/spoilage';

export default function Spoilage() {
  const [reports, setReports] = useState([]);
  const [form, setForm] = useState({ crop: '', quantity: '', reason: '', date: '', description: '' });
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    spoilageAPI.getAll()
      .then(data => setReports(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const newReport = await spoilageAPI.create(form);
      setReports(prev => [newReport, ...prev]);
      setForm({ crop: '', quantity: '', reason: '', date: '', description: '' });
      setShowForm(false);
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to submit report.');
    }
  }

  if (loading) {
    return <DashboardLayout><div style={{ textAlign: 'center', padding: '4rem', color: 'var(--gray)' }}>Loading...</div></DashboardLayout>;
  }

  return (
    <DashboardLayout>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <div className="page-title">Spoilage Reports</div>
          <div className="page-subtitle">Report crop losses for insurance and records</div>
        </div>
        <button className="btn btn-orange" onClick={() => setShowForm(!showForm)}>⚠️ Report Spoilage</button>
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: '1.5rem', borderLeft: '4px solid var(--danger)' }}>
          <div className="card-header"><span className="card-title">⚠️ New Spoilage Report</span></div>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label>Crop Name *</label>
                <input required placeholder="e.g., Tomatoes" value={form.crop} onChange={e => setForm({ ...form, crop: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Quantity Lost (kg) *</label>
                <input type="number" required min="1" placeholder="100" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Reason *</label>
                <select required value={form.reason} onChange={e => setForm({ ...form, reason: e.target.value })}>
                  <option value="">Select reason</option>
                  {['Heavy rainfall', 'Drought', 'Transportation delay', 'Market rejection', 'Pest/disease', 'Storage failure', 'Other'].map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Date of Incident *</label>
                <input type="date" required value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
              </div>
            </div>
            <div className="form-group">
              <label>Additional Details</label>
              <textarea rows={3} placeholder="Describe the spoilage in detail..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button type="button" className="btn btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
              <button type="submit" className="btn btn-orange">Submit Report</button>
            </div>
          </form>
        </div>
      )}

      <div className="card">
        <div className="card-header"><span className="card-title">📋 All Reports</span></div>
        {reports.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--gray)' }}>No spoilage reports</div>
        ) : (
          <div className="data-table-wrap">
            <table className="data-table">
              <thead>
                <tr><th>Crop</th><th>Quantity Lost</th><th>Reason</th><th>Date</th><th>Est. Value</th><th>Status</th></tr>
              </thead>
              <tbody>
                {reports.map(r => (
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
        )}
      </div>
    </DashboardLayout>
  );
}
