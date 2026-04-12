import { useState, useEffect } from 'react';
import PublicLayout from '../../layouts/PublicLayout';
import { statsAPI } from '../../api/stats';
import './About.css';

const values = [
  { icon: '⚖️', title: 'Fairness', desc: 'Every farmer deserves a fair price. We ensure transparent pricing with no hidden fees.' },
  { icon: '🔍', title: 'Transparency', desc: 'Open pricing, clear transactions, and honest communication at every step.' },
  { icon: '🤝', title: 'Trust', desc: 'Verified farmers and buyers. Escrow payments. Every trade is safe and secure.' },
  { icon: '♻️', title: 'Sustainability', desc: 'Reducing food waste, supporting organic farming, and building green supply chains.' },
  { icon: '💡', title: 'Innovation', desc: 'Using technology to solve age-old problems in agriculture — simply and affordably.' },
  { icon: '🌱', title: 'Empowerment', desc: 'Giving farmers data, tools, and market access to take control of their livelihoods.' },
];

const impact = [
  { value: '₹120 Cr+', label: 'Trade Facilitated' },
  { value: '2,400+', label: 'Farmers Empowered' },
  { value: '18 States', label: 'Across India' },
  { value: '45%', label: 'Avg. Income Increase' },
];

export default function About() {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    statsAPI.getTeam().then(data => setTeamMembers(data)).catch(() => {});
  }, []);

  return (
    <PublicLayout>
      {/* Hero */}
      <div className="about-hero">
        <div className="container">
          <div className="tag" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', marginBottom: '1rem' }}>About AgriChain</div>
          <h1>Built for the Indian Farmer</h1>
          <p>AgriChain was born out of a simple but powerful idea — that farmers deserve fair value for their hard work, and technology can make that happen.</p>
        </div>
      </div>

      {/* Mission & Vision */}
      <section className="about-section">
        <div className="container">
          <div className="section-header">
            <div className="tag">Who We Are</div>
            <h2>Our Mission & Vision</h2>
          </div>
          <div className="mission-vision-grid">
            <div className="mv-card mission">
              <div className="mv-icon">🎯</div>
              <h3>Our Mission</h3>
              <p>To eliminate agricultural middlemen and build a fair, direct trading ecosystem where every Indian farmer earns the full value of their produce. We leverage technology to create transparency, trust, and efficiency in the agricultural supply chain.</p>
            </div>
            <div className="mv-card vision">
              <div className="mv-icon">🌅</div>
              <h3>Our Vision</h3>
              <p>A future where every Indian farmer — regardless of farm size or location — has direct access to the best markets in the country. Where food is fresh, farmers are prosperous, and the supply chain is zero-waste.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="about-section about-section-alt">
        <div className="container">
          <div className="section-header">
            <div className="tag">Our Values</div>
            <h2>What We Stand For</h2>
          </div>
          <div className="values-grid">
            {values.map(v => (
              <div key={v.title} className="value-card">
                <div className="value-icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="about-section">
        <div className="container">
          <div className="section-header">
            <div className="tag">Our Impact</div>
            <h2>Numbers That Matter</h2>
          </div>
          <div className="impact-grid">
            {impact.map(i => (
              <div key={i.label} className="impact-card">
                <div className="impact-value">{i.value}</div>
                <div className="impact-label">{i.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="about-section about-section-alt">
        <div className="container">
          <div className="section-header">
            <div className="tag">The Team</div>
            <h2>Meet the People Behind AgriChain</h2>
            <p>A passionate team of technologists, agri-experts, and social entrepreneurs.</p>
          </div>
          <div className="team-grid">
            {teamMembers.map(t => (
              <div key={t.name} className="team-card">
                <img src={t.avatar} alt={t.name} />
                <div className="team-name">{t.name}</div>
                <div className="team-role">{t.role}</div>
                <div className="team-bio">{t.bio}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
