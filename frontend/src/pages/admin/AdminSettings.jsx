import { useState, useEffect } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { settingsAPI } from '../../api/settings';

export default function AdminSettings() {
  const [settings, setSettings] = useState({});
  const [saved, setSaved] = useState(false);
  const [tab, setTab] = useState('general');
  const [loading, setLoading] = useState(true);

  const tabs = [
    { id: 'general', label: '⚙️ General' },
    { id: 'fees', label: '💰 Fees & Payments' },
    { id: 'security', label: '🔒 Security' },
    { id: 'maintenance', label: '🔧 Maintenance' },
  ];

  useEffect(() => {
    settingsAPI.get()
      .then(data => setSettings(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function handleSave(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    try {
      const updated = await settingsAPI.update(data);
      setSettings(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch {
      alert('Failed to save settings.');
    }
  }

  if (loading) {
    return <DashboardLayout><div style={{ textAlign: 'center', padding: '4rem', color: 'var(--gray)' }}>Loading settings...</div></DashboardLayout>;
  }

  return (
    <DashboardLayout>
      <div className="page-title">Platform Settings</div>
      <div className="page-subtitle">Configure global platform settings</div>
      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '1.5rem', alignItems: 'start' }}>
        <div className="card" style={{ padding: '0.75rem' }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ display: 'flex', width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: 'none', background: tab === t.id ? 'var(--accent-light)' : 'transparent', color: tab === t.id ? 'var(--primary)' : 'var(--dark-2)', fontWeight: tab === t.id ? 700 : 500, fontSize: '0.875rem', cursor: 'pointer', textAlign: 'left', marginBottom: '0.25rem' }}>
              {t.label}
            </button>
          ))}
        </div>
        <div className="card">
          {saved && <div style={{ background: '#d4edda', color: '#155724', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem', fontSize: '0.875rem', fontWeight: 600 }}>✅ Settings saved!</div>}
          {tab === 'general' && (
            <form onSubmit={handleSave}>
              <div className="card-header"><span className="card-title">⚙️ General Settings</span></div>
              <div className="form-group"><label>Platform Name</label><input name="platformName" defaultValue={settings.platformName} /></div>
              <div className="form-group"><label>Support Email</label><input name="supportEmail" defaultValue={settings.supportEmail} /></div>
              <div className="form-group"><label>Support Phone</label><input name="supportPhone" defaultValue={settings.supportPhone} /></div>
              <div className="form-group"><label>Max File Upload Size (MB)</label><input name="maxFileUploadSize" type="number" defaultValue={settings.maxFileUploadSize} /></div>
              <div className="form-group">
                <label>Supported Categories</label>
                <textarea name="categories" rows={3} defaultValue={settings.categories} />
              </div>
              <button type="submit" className="btn btn-primary">Save Settings</button>
            </form>
          )}
          {tab === 'fees' && (
            <form onSubmit={handleSave}>
              <div className="card-header"><span className="card-title">💰 Fee Configuration</span></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group"><label>Platform Fee (%)</label><input name="platformFee" type="number" defaultValue={settings.platformFee} step="0.1" /></div>
                <div className="form-group"><label>Listing Fee (₹)</label><input name="listingFee" type="number" defaultValue={settings.listingFee} /></div>
                <div className="form-group"><label>Minimum Order Value (₹)</label><input name="minOrderValue" type="number" defaultValue={settings.minOrderValue} /></div>
                <div className="form-group"><label>Max Trade Amount (₹)</label><input name="maxTradeAmount" type="number" defaultValue={settings.maxTradeAmount} /></div>
              </div>
              <div className="form-group">
                <label>Payment Gateway</label>
                <select name="paymentGateway" defaultValue={settings.paymentGateway}><option>Razorpay</option><option>PayU</option><option>PhonePe</option></select>
              </div>
              <button type="submit" className="btn btn-primary">Save Fee Config</button>
            </form>
          )}
          {tab === 'security' && (
            <form onSubmit={handleSave}>
              <div className="card-header"><span className="card-title">🔒 Security Settings</span></div>
              {[
                { label: 'Require KYC for all Farmers', key: 'requireKYC', defaultChecked: settings.requireKYC },
                { label: 'Require GST for Buyers above ₹10L', key: 'requireGST', defaultChecked: settings.requireGST },
                { label: 'Two-Factor Authentication (Admin)', key: 'twoFactorAdmin', defaultChecked: settings.twoFactorAdmin },
                { label: 'Auto-block suspicious accounts', key: 'autoBlockSuspicious', defaultChecked: settings.autoBlockSuspicious },
                { label: 'Email verification on signup', key: 'emailVerification', defaultChecked: settings.emailVerification },
              ].map(s => (
                <div key={s.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.875rem 0', borderBottom: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: '0.9rem', color: 'var(--dark-2)' }}>{s.label}</span>
                  <input type="checkbox" name={s.key} defaultChecked={s.defaultChecked} style={{ accentColor: 'var(--primary)', width: 18, height: 18 }} />
                </div>
              ))}
              <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>Save Security Settings</button>
            </form>
          )}
          {tab === 'maintenance' && (
            <div>
              <div className="card-header"><span className="card-title">🔧 Maintenance</span></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
                {[
                  { label: 'Clear Cache', desc: 'Clear server-side cache', btnLabel: 'Clear Cache', color: 'var(--warning)' },
                  { label: 'Export User Data', desc: 'Download all user data as CSV', btnLabel: 'Export CSV', color: 'var(--primary)' },
                  { label: 'Export Orders', desc: 'Download all orders data', btnLabel: 'Export CSV', color: 'var(--primary)' },
                  { label: 'Maintenance Mode', desc: 'Put platform in maintenance mode', btnLabel: 'Enable', color: 'var(--danger)' },
                ].map(a => (
                  <div key={a.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'var(--off-white)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>{a.label}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--gray)' }}>{a.desc}</div>
                    </div>
                    <button className="btn btn-sm btn-outline" style={{ borderColor: a.color, color: a.color }}>{a.btnLabel}</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
