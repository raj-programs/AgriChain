import { useState, useEffect } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { ordersAPI } from '../../api/orders';

const statusOptions = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered'];

export default function FarmerOrders() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ordersAPI.getFarmerOrders()
      .then(data => setOrders(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'All' ? orders : orders.filter(o => o.status === filter);
  const statusBadge = s => s === 'Delivered' ? 'badge-success' : s === 'Processing' ? 'badge-warning' : s === 'Shipped' ? 'badge-info' : 'badge-primary';

  function handleStatusUpdate(orderId, newStatus) {
    ordersAPI.updateStatus(orderId, newStatus).then(updated => {
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: updated.status } : o));
    });
  }

  if (loading) {
    return <DashboardLayout><div style={{ textAlign: 'center', padding: '4rem', color: 'var(--gray)' }}>Loading orders...</div></DashboardLayout>;
  }

  return (
    <DashboardLayout>
      <div className="page-title">Orders Received</div>
      <div className="page-subtitle">Manage and fulfil incoming orders</div>

      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4,1fr)', marginBottom: '1.5rem' }}>
        {[
          { label: 'Total Orders', value: orders.length, icon: '📦' },
          { label: 'Pending', value: orders.filter(o => o.status === 'Pending').length, icon: '⏳' },
          { label: 'Shipped', value: orders.filter(o => o.status === 'Shipped').length, icon: '🚚' },
          { label: 'Delivered', value: orders.filter(o => o.status === 'Delivered').length, icon: '✅' },
        ].map(s => (
          <div key={s.label} className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '2rem' }}>{s.icon}</span>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--dark)' }}>{s.value}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--gray)', fontWeight: 600 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        {statusOptions.map(s => (
          <button key={s} className={`btn btn-sm ${filter === s ? 'btn-primary' : 'btn-outline'}`} onClick={() => setFilter(s)}>{s}</button>
        ))}
      </div>

      <div className="card">
        <div className="data-table-wrap">
          <table className="data-table">
            <thead>
              <tr><th>Order ID</th><th>Buyer</th><th>Crop</th><th>Qty</th><th>Amount</th><th>Date</th><th>Status</th><th>Action</th></tr>
            </thead>
            <tbody>
              {filtered.map(o => (
                <tr key={o.id}>
                  <td><strong>{o.id}</strong></td>
                  <td>{o.buyer}</td>
                  <td>{o.crop}</td>
                  <td>{o.quantity}kg</td>
                  <td><strong style={{ color: 'var(--primary)' }}>₹{o.amount.toLocaleString()}</strong></td>
                  <td style={{ color: 'var(--gray)', fontSize: '0.85rem' }}>{o.date}</td>
                  <td><span className={`badge ${statusBadge(o.status)}`}>{o.status}</span></td>
                  <td>
                    <select className="sort-select" style={{ fontSize: '0.78rem', padding: '0.3rem 0.5rem' }} defaultValue="" onChange={e => { if (e.target.value) handleStatusUpdate(o.id, e.target.value); e.target.value = ''; }}>
                      <option value="" disabled>Update</option>
                      <option>Processing</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--gray)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📭</div>
            <p>No {filter !== 'All' ? filter.toLowerCase() : ''} orders found</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
