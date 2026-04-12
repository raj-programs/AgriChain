import { useState, useEffect } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { ordersAPI } from '../../api/orders';

export default function BuyerOrders() {
  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ordersAPI.getBuyerOrders()
      .then(data => setOrders(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const statusBadge = s => s === 'Delivered' ? 'badge-success' : s === 'Shipped' ? 'badge-info' : 'badge-warning';
  const statusIcon  = s => s === 'Delivered' ? '✅' : s === 'Shipped' ? '🚚' : '⏳';

  if (loading) {
    return <DashboardLayout><div style={{ textAlign: 'center', padding: '4rem', color: 'var(--gray)' }}>Loading orders...</div></DashboardLayout>;
  }

  return (
    <DashboardLayout>
      <div className="page-title">My Orders</div>
      <div className="page-subtitle">Track and manage all your purchases</div>

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 380px' : '1fr', gap: '1.5rem' }}>
        <div className="card">
          <div className="card-header">
            <span className="card-title">📦 Order History</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--gray)' }}>{orders.length} orders</span>
          </div>
          <div className="data-table-wrap">
            <table className="data-table">
              <thead><tr><th>Order ID</th><th>Farmer</th><th>Crop</th><th>Qty</th><th>Amount</th><th>Date</th><th>Status</th><th>Action</th></tr></thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o.id} style={{ cursor: 'pointer' }} onClick={() => setSelected(o)}>
                    <td><strong>{o.id}</strong></td>
                    <td>👨‍🌾 {o.farmer}</td>
                    <td>{o.crop}</td>
                    <td>{o.quantity}kg</td>
                    <td><strong style={{ color: 'var(--primary)' }}>₹{o.amount.toLocaleString()}</strong></td>
                    <td style={{ color: 'var(--gray)', fontSize: '0.85rem' }}>{o.date}</td>
                    <td><span className={`badge ${statusBadge(o.status)}`}>{statusIcon(o.status)} {o.status}</span></td>
                    <td><button className="btn btn-outline btn-sm" onClick={e => { e.stopPropagation(); setSelected(o); }}>Track</button></td>
                  </tr>
                ))}
                {orders.length === 0 && <tr><td colSpan={8} style={{ textAlign: 'center', padding: '3rem', color: 'var(--gray)' }}>No orders yet</td></tr>}
              </tbody>
            </table>
          </div>
        </div>

        {selected && (
          <div className="card" style={{ position: 'sticky', top: 'calc(var(--navbar-height) + 54px + 1.5rem)' }}>
            <div className="card-header">
              <span className="card-title">📋 {selected.id}</span>
              <button style={{ background: 'none', border: 'none', fontSize: '1.25rem', cursor: 'pointer', color: 'var(--gray)' }} onClick={() => setSelected(null)}>✕</button>
            </div>
            <span className={`badge ${statusBadge(selected.status)}`} style={{ marginBottom: '1.25rem', display: 'inline-flex' }}>
              {statusIcon(selected.status)} {selected.status}
            </span>
            {[['Crop', selected.crop], ['Farmer', selected.farmer], ['Quantity', `${selected.quantity}kg`], ['Amount', `₹${selected.amount.toLocaleString()}`], ['Order Date', selected.date], ['Tracking #', selected.tracking]].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.625rem 0', borderBottom: '1px solid var(--border-light)', fontSize: '0.875rem' }}>
                <span style={{ color: 'var(--gray)' }}>{k}</span>
                <span style={{ fontWeight: 600 }}>{v}</span>
              </div>
            ))}
            <div style={{ marginTop: '1.25rem' }}>
              <div style={{ fontWeight: 700, fontSize: '0.875rem', marginBottom: '1rem' }}>Delivery Progress</div>
              {['Order Placed', 'Confirmed by Farmer', 'Picked Up', 'In Transit', 'Delivered'].map((step, i) => {
                const stepIdx = selected.status === 'Delivered' ? 4 : selected.status === 'Shipped' ? 3 : selected.status === 'Processing' ? 2 : 1;
                const done = i <= stepIdx;
                return (
                  <div key={step} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: done ? 'var(--primary)' : 'var(--border)', color: done ? '#fff' : 'var(--gray-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, flexShrink: 0 }}>
                      {done ? '✓' : i + 1}
                    </div>
                    <span style={{ fontSize: '0.85rem', fontWeight: done ? 600 : 400, color: done ? 'var(--dark)' : 'var(--gray-light)' }}>{step}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
