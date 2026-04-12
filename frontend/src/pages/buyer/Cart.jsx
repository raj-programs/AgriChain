import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { cartAPI } from '../../api/cart';
import { ordersAPI } from '../../api/orders';

export default function Cart() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkout, setCheckout] = useState(false);
  const [orderTotal, setOrderTotal] = useState(0);

  useEffect(() => {
    cartAPI.get()
      .then(data => setItems(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  function updateQty(id, delta) {
    const item = items.find(i => i.id === id);
    if (!item) return;
    const newQty = Math.max(1, item.quantity + delta);
    cartAPI.updateItem(id, newQty).then(updated => {
      setItems(prev => prev.map(i => i.id === id ? { ...i, quantity: updated.quantity } : i));
    });
  }

  function removeItem(id) {
    cartAPI.removeItem(id).then(() => {
      setItems(prev => prev.filter(i => i.id !== id));
    });
  }

  const subtotal = items.reduce((acc, i) => acc + (i.crop?.price || 0) * i.quantity, 0);
  const shipping = 250;
  const total = subtotal + shipping;

  async function handleCheckout() {
    try {
      const orderItems = items.map(i => ({
        cropId: i.cropId,
        cropName: i.crop?.name || 'Unknown',
        farmerId: i.crop?.farmerId,
        farmer: i.crop?.farmer,
        quantity: i.quantity,
        amount: (i.crop?.price || 0) * i.quantity,
      }));
      await ordersAPI.placeOrder(orderItems, 'UPI');
      await cartAPI.clear();
      setOrderTotal(total + Math.round(subtotal * 0.02));
      setCheckout(true);
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to place order.');
    }
  }

  if (loading) {
    return <DashboardLayout><div style={{ textAlign: 'center', padding: '4rem', color: 'var(--gray)' }}>Loading cart...</div></DashboardLayout>;
  }

  if (checkout) {
    return (
      <DashboardLayout>
        <div style={{ maxWidth: 500, margin: '3rem auto', textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
          <h2 style={{ fontWeight: 800, marginBottom: '0.75rem' }}>Order Placed Successfully!</h2>
          <p style={{ color: 'var(--gray)', marginBottom: '2rem' }}>Your order has been placed. The farmer will confirm and ship within 2-3 business days.</p>
          <div className="card" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
            <div style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
              <span style={{ color: 'var(--gray)' }}>Order ID</span><strong>ORD-{Date.now().toString().slice(-6)}</strong>
            </div>
            <div style={{ padding: '0.5rem 0', display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
              <span style={{ color: 'var(--gray)' }}>Amount</span><strong style={{ color: 'var(--primary)' }}>₹{orderTotal.toLocaleString()}</strong>
            </div>
          </div>
          <Link to="/buyer/orders" className="btn btn-primary btn-lg">Track Order →</Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="page-title">Shopping Cart</div>
      <div className="page-subtitle">{items.length} item{items.length !== 1 ? 's' : ''} in your cart</div>

      {items.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--gray)' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛒</div>
          <h3 style={{ marginBottom: '0.75rem' }}>Your cart is empty</h3>
          <Link to="/marketplace" className="btn btn-primary">Browse Crops</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '1.5rem', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {items.map(item => item.crop && (
              <div key={item.id} className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img src={item.crop.image} alt={item.crop.name} style={{ width: 80, height: 80, borderRadius: 'var(--radius-md)', objectFit: 'cover', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.25rem' }}>{item.crop.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--gray)', marginBottom: '0.5rem' }}>👨‍🌾 {item.crop.farmer} · 📍 {item.crop.location}</div>
                  <div style={{ fontWeight: 800, color: 'var(--primary)' }}>₹{item.crop.price}/{item.crop.unit}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button className="btn btn-outline btn-sm" style={{ width: 32, height: 32, padding: 0 }} onClick={() => updateQty(item.id, -1)}>−</button>
                  <span style={{ fontWeight: 700, minWidth: 24, textAlign: 'center' }}>{item.quantity}</span>
                  <button className="btn btn-outline btn-sm" style={{ width: 32, height: 32, padding: 0 }} onClick={() => updateQty(item.id, 1)}>+</button>
                </div>
                <div style={{ minWidth: 80, textAlign: 'right' }}>
                  <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--dark)' }}>₹{(item.crop.price * item.quantity).toLocaleString()}</div>
                  <button className="btn btn-sm" style={{ color: 'var(--danger)', background: 'none', border: 'none', fontSize: '0.8rem', cursor: 'pointer', marginTop: '0.25rem' }} onClick={() => removeItem(item.id)}>🗑 Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="card" style={{ position: 'sticky', top: 'calc(var(--navbar-height) + 54px + 1.5rem)' }}>
            <div className="card-header"><span className="card-title">🧾 Order Summary</span></div>
            {[['Subtotal', `₹${subtotal.toLocaleString()}`], ['Shipping', `₹${shipping}`], ['Platform Fee (2%)', `₹${Math.round(subtotal * 0.02)}`]].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.625rem 0', borderBottom: '1px solid var(--border-light)', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--gray)' }}>{k}</span><span style={{ fontWeight: 600 }}>{v}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0 0.5rem', fontSize: '1.05rem' }}>
              <span style={{ fontWeight: 700 }}>Total</span>
              <span style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--primary)' }}>₹{(total + Math.round(subtotal * 0.02)).toLocaleString()}</span>
            </div>
            <div className="form-group" style={{ marginTop: '0.75rem' }}>
              <label>Payment Method</label>
              <select><option>💳 UPI / Net Banking</option><option>💰 Cash on Delivery</option><option>🏦 Bank Transfer</option></select>
            </div>
            <button className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }} onClick={handleCheckout}>
              Place Order →
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
