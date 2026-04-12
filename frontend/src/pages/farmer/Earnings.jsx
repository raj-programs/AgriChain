import { useState, useEffect } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import StatsCard from '../../components/StatsCard/StatsCard';
import { analyticsAPI } from '../../api/analytics';

export default function Earnings() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    analyticsAPI.getEarnings()
      .then(d => setData(d))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading || !data) {
    return <DashboardLayout><div style={{ textAlign: 'center', padding: '4rem', color: 'var(--gray)' }}>Loading earnings...</div></DashboardLayout>;
  }

  return (
    <DashboardLayout>
      <div className="page-title">Earnings Summary</div>
      <div className="page-subtitle">Track your income and transaction history</div>

      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4,1fr)', marginBottom: '1.5rem' }}>
        <StatsCard icon="💰" label="Total Earnings" value={`₹${data.totalEarnings.toLocaleString()}`} change="18% vs last month" changeType="up" color="var(--primary)" bg="var(--accent-light)" />
        <StatsCard icon="🏦" label="Net Earnings" value={`₹${data.netEarnings.toLocaleString()}`} color="var(--success)" bg="#d4edda" />
        <StatsCard icon="📊" label="Platform Fees" value={`₹${data.totalFees.toLocaleString()}`} color="var(--warning)" bg="#fff3cd" />
        <StatsCard icon="📦" label="Transactions" value={String(data.transactions.length)} color="var(--info)" bg="#d1ecf1" />
      </div>

      <div className="two-col">
        <div className="card">
          <div className="card-header">
            <span className="card-title">📈 Monthly Breakdown</span>
            <button className="btn btn-outline btn-sm">Download CSV</button>
          </div>
          <div className="data-table-wrap">
            <table className="data-table">
              <thead><tr><th>Month</th><th>Revenue</th><th>Fees</th><th>Net</th></tr></thead>
              <tbody>
                {data.months.slice(-6).map((m, i) => {
                  const rev = data.monthlyRevenue[data.monthlyRevenue.length - 6 + i];
                  const fee = Math.round(rev * 0.02);
                  return (
                    <tr key={m}>
                      <td>{m}</td>
                      <td style={{ color: 'var(--success)' }}>+₹{rev.toLocaleString()}</td>
                      <td style={{ color: 'var(--danger)' }}>-₹{fee.toLocaleString()}</td>
                      <td><strong>₹{(rev - fee).toLocaleString()}</strong></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-header"><span className="card-title">🧾 Recent Transactions</span></div>
          {data.transactions.map(t => (
            <div key={t.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid var(--border-light)' }}>
              <div>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--dark)' }}>{t.description}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--gray)' }}>{t.id} · {t.date}</div>
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: t.type === 'credit' ? 'var(--success)' : 'var(--danger)' }}>
                {t.type === 'credit' ? '+' : ''}₹{Math.abs(t.amount).toLocaleString()}
              </div>
            </div>
          ))}
          {data.transactions.length === 0 && (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--gray)' }}>No transactions yet</div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
