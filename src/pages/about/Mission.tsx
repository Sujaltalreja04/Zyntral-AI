import React from 'react';
import { Target, Shield } from 'lucide-react';
import { SEO } from '../../components/SEO';

export const Mission: React.FC = () => {
  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', position: 'relative' }}>
      <SEO
        title="Our Mission - Democratizing AI Compilation"
        description="Learn about the Zyntral AI operational philosophy and our mission to democratize complex prompt compilation and model training loops."
        path="/about/mission"
        keywords={['Zyntral mission', 'operational AI philosophy', 'LoRA cost efficiency']}
      />
      <div className="container" style={{ position: 'relative', zIndex: 5, marginBottom: '80px', maxWidth: '800px' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '45px', textAlign: 'center' }}>
          <span className="badge badge-cyan" style={{ marginBottom: '10px' }}>Our Mission</span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '15px' }}>
            Operational <span className="gradient-text">AI Systems</span>
          </h1>
          <p style={{ color: 'var(--muted-color)', fontSize: '1.05rem', lineHeight: '1.8' }}>
            Democratizing complex prompt compilation and model alignment training loops for developers globally.
          </p>
        </div>

        {/* Why Zyntral Exists */}
        <div className="glass-card" style={{ padding: '35px', marginBottom: '30px', background: 'rgba(5, 5, 12, 0.45)' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Target size={18} />
            Why Zyntral Exists
          </h3>
          <p style={{ color: 'var(--muted-color)', fontSize: '0.95rem', lineHeight: '1.7' }}>
            We believe AI should go beyond text generation. To drive operational decisions, AI needs a low-latency compiler framework that connects vector databases and deploys autonomous, secure reasoning nodes instantly.
          </p>
        </div>

        {/* Operational Philosophy */}
        <div className="glass-card" style={{ padding: '35px', background: 'rgba(5, 5, 12, 0.45)' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Shield size={18} style={{ color: 'var(--green)' }} />
            Operational Philosophy
          </h3>
          <p style={{ color: 'var(--muted-color)', fontSize: '0.95rem', lineHeight: '1.7' }}>
            Our development decisions focus on three key rules:
          </p>
          <ul style={{ color: 'var(--muted-color)', fontSize: '0.9rem', lineHeight: '1.7', paddingLeft: '20px', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li><strong>Action over Chat:</strong> AI systems should run API routines and handle DB queries, not just chat.</li>
            <li><strong>Decentralization:</strong> Runtime edge nodes should work reliably during regional network splits.</li>
            <li><strong>Cost Efficiency:</strong> LoRA parameter alignment ensures high-speed execution under strict budget limits.</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Mission;
