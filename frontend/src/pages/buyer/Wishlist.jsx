import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { wishlistAPI } from '../../api/wishlist';

export default function Wishlist() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    wishlistAPI.get()
      .then(data => setItems(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  function remove(id) {
    wishlistAPI.remove(id).then(() => {
      setItems(prev => prev.filter(c => c.id !== id));
    });
  }

  if (loading) {
    return <DashboardLayout><div style={{ textAlign: 'center', padding: '4rem', color: 'var(--gray)' }}>Loading wishlist...</div></DashboardLayout>;
  }

  return (
    <DashboardLayout>
      <div className="page-title">Wishlist</div>
      <div className="page-subtitle">{items.length} saved items</div>

      {items.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--gray)' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>❤️</div>
          <h3 style={{ marginBottom: '0.75rem' }}>Your wishlist is empty</h3>
          <Link to="/marketplace" className="btn btn-primary">Browse Crops</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {items.map(c => (
            <div key={c.id} className="card" style={{ overflow: 'hidden', padding: 0 }}>
              <div style={{ position: 'relative', height: 160 }}>
                <img src={c.image} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <button onClick={() => remove(c.id)} style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>❤️</button>
                {c.organic && <span className="badge badge-success" style={{ position: 'absolute', top: '0.75rem', left: '0.75rem' }}>🌿 Organic</span>}
              </div>
              <div style={{ padding: '1rem' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.25rem' }}>{c.category}</div>
                <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.375rem' }}>{c.name}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--gray)', marginBottom: '0.75rem' }}>👨‍🌾 {c.farmer} · 📍 {c.location}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--primary)' }}>₹{c.price}/{c.unit}</span>
                  <Link to="/marketplace" className="btn btn-primary btn-sm">Add to Cart</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
