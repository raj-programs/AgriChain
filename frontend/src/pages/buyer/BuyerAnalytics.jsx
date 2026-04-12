import { useState, useEffect } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import StatsCard from '../../components/StatsCard/StatsCard';
import { analyticsAPI } from '../../api/analytics';

const spendData = [8200, 12500, 9800, 15200, 18000, 22000];
const spendMonths = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'];

export default function BuyerAnalytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    analyticsAPI.getBuyerAnalytics().then(d => setData(d)).catch(() => {});
  }, []);

  const max = Math.max(...spendData);
  const stats = data?.stats || {};
  return (
    <DashboardLayout>
      <div className="page-title">Procurement Analytics</div>
      <div className="page-subtitle">Insights into your buying patterns and spending</div>

      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4,1fr)', marginBottom: '1.5rem' }}>
        <StatsCard icon="💰" label="Total Spent" value="₹1.2L" change="15% this month" changeType="up" color="var(--primary)" bg="var(--accent-light)" />
        <StatsCard icon="📦" label="Total Orders" value="34" change="8 new orders" changeType="up" color="var(--info)" bg="#d1ecf1" />
        <StatsCard icon="🌾" label="Unique Farmers" value="12" color="var(--orange)" bg="var(--orange-light)" />
        <StatsCard icon="💸" label="Avg. Savings" value="38%" change="vs retail price" changeType="up" color="var(--success)" bg="#d4edda" />
      </div>

      <div className="two-col">
        {/* Spend Trend */}
        <div className="card">
          <div className="card-header"><span className="card-title">📈 Procurement Spend Trend</span></div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: 140, paddingBottom: '1.5rem' }}>
            {spendData.map((v, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 600, marginBottom: 4 }}>₹{(v / 1000).toFixed(0)}k</div>
                <div title={`${spendMonths[i]}: ₹${v.toLocaleString()}`} style={{ width: '100%', height: `${(v / max) * 100}%`, background: 'linear-gradient(180deg, var(--orange), var(--orange-dark))', borderRadius: '3px 3px 0 0' }} />
                <div style={{ fontSize: '0.72rem', color: 'var(--gray)', marginTop: 4 }}>{spendMonths[i]}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="card">
          <div className="card-header"><span className="card-title">🥧 Spending by Category</span></div>
          {[
            { label: 'Grains', pct: 42, color: 'var(--primary)' },
            { label: 'Vegetables', pct: 28, color: 'var(--success)' },
            { label: 'Fruits', pct: 20, color: 'var(--orange)' },
            { label: 'Spices', pct: 10, color: 'var(--warning)' },
          ].map(c => (
            <div key={c.label} style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem', fontSize: '0.875rem' }}>
                <span style={{ fontWeight: 600, color: 'var(--dark)' }}>{c.label}</span>
                <span style={{ color: c.color, fontWeight: 700 }}>{c.pct}%</span>
              </div>
              <div style={{ height: 8, background: 'var(--border-light)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: `${c.pct}%`, height: '100%', background: c.color, borderRadius: 4, transition: 'width 0.5s ease' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Farmers */}
      <div className="card" style={{ marginTop: '1.5rem' }}>
        <div className="card-header"><span className="card-title">👨‍🌾 Top Farmers by Order Volume</span></div>
        <div className="data-table-wrap">
          <table className="data-table">
            <thead><tr><th>Farmer</th><th>Location</th><th>Orders</th><th>Total Spent</th><th>Last Order</th></tr></thead>
            <tbody>
              {[
                { name: 'Rajesh Kumar', location: 'Punjab', orders: 12, spent: 48000, last: '2025-04-01' },
                { name: 'Anita Sharma', location: 'Karnataka', orders: 8, spent: 22400, last: '2025-04-10' },
                { name: 'Suresh Patil', location: 'Maharashtra', orders: 5, spent: 15000, last: '2025-04-06' },
              ].map(f => (
                <tr key={f.name}>
                  <td><strong>👨‍🌾 {f.name}</strong></td>
                  <td>📍 {f.location}</td>
                  <td>{f.orders}</td>
                  <td><strong style={{ color: 'var(--primary)' }}>₹{f.spent.toLocaleString()}</strong></td>
                  <td style={{ color: 'var(--gray)', fontSize: '0.85rem' }}>{f.last}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
