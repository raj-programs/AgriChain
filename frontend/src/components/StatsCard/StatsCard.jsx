import './StatsCard.css';

export default function StatsCard({ icon, label, value, change, changeType = 'up', color = 'var(--primary)', bg = 'var(--accent-light)' }) {
  return (
    <div className="stats-card" style={{ '--card-color': color, '--card-bg': bg }}>
      <div className="stats-icon">{icon}</div>
      <div className="stats-content">
        <div className="stats-label">{label}</div>
        <div className="stats-value">{value}</div>
        {change && (
          <div className={`stats-change ${changeType}`}>
            {changeType === 'up' ? '↑' : '↓'} {change}
          </div>
        )}
      </div>
    </div>
  );
}
