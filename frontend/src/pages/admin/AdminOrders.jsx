import { useState, useEffect } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { ordersAPI } from '../../api/orders';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ordersAPI.getAllOrders()
      .then(data => setOrders(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const statusBadge = s => s === 'Delivered' ? 'badge-success' : s === 'Processing' ? 'badge-warning' : s === 'Shipped' ? 'badge-info' : 'badge-primary';
  const filtered = filter === 'All' ? orders : orders.filter(o => o.status === filter);

  if (loading) {
    return <DashboardLayout><div style={{ textAlign: 'center', padding: '4rem', color: 'var(--gray)' }}>Loading orders...</div></DashboardLayout>;
  }

  return (
    <DashboardLayout>
      <div className="page-title">Order Management</div>
      <div className="page-subtitle">Monitor and manage all platform orders and disputes</div>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        {['All', 'Pending', 'Processing', 'Shipped', 'Delivered'].map(f => (
          <button key={f} className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-outline'}`} onClick={() => setFilter(f)}>{f}</button>
        ))}
      </div>

      <div className="card">
        <div className="data-table-wrap">
          <table className="data-table">
            <thead><tr><th>Order ID</th><th>Crop</th><th>Quantity</th><th>Amount</th><th>Date</th><th>Type</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {filtered.map(o => (
                <tr key={o.id}>
                  <td><strong>{o.id}</strong></td>
                  <td>{o.crop}</td>
                  <td>{o.quantity}kg</td>
                  <td><strong style={{ color: 'var(--primary)' }}>₹{o.amount.toLocaleString()}</strong></td>
                  <td style={{ color: 'var(--gray)', fontSize: '0.85rem' }}>{o.date}</td>
                  <td><span style={{ fontSize: '0.78rem', color: 'var(--gray)' }}>{o.type}</span></td>
                  <td><span className={`badge ${statusBadge(o.status)}`}>{o.status}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.375rem' }}>
                      <button className="btn btn-outline btn-sm">View</button>
                      <button className="btn btn-sm" style={{ background: '#fdf2f2', color: 'var(--danger)', border: 'none' }}>Flag</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--gray)' }}>No orders found</div>
        )}
      </div>
    </DashboardLayout>
  );
}
