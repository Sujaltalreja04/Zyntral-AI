import React from 'react';
import { Link } from 'react-router-dom';
import { Settings, Cpu, HardDrive, ArrowRight, Zap } from 'lucide-react';
import { SEO } from '../../components/SEO';

export const CustomAISystems: React.FC = () => {
  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', position: 'relative' }}>
      <SEO
        title="Custom AI Development & Bespoke Systems"
        description="Collaborate directly with Zyntral Labs to build custom prompt compilers, bespoke agent topologies, and dedicated neural network models."
        path="/solutions/custom-ai-systems"
        keywords={['Custom AI systems', 'bespoke agent topologies', 'dedicated compute GPU', 'neural nodes']}
      />
      <div className="container" style={{ position: 'relative', zIndex: 5, marginBottom: '80px' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '45px', textAlign: 'center' }}>
          <span className="badge badge-cyan" style={{ marginBottom: '10px' }}>Bespoke Engineering</span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '15px' }}>
            Custom <span className="gradient-text">AI Systems</span>
          </h1>
          <p style={{ color: 'var(--muted-color)', maxWidth: '750px', margin: '0 auto', fontSize: '1.05rem', lineHeight: '1.8' }}>
            Collaborate directly with Zyntral Labs to build custom prompt compilers, bespoke agent topologies, and dedicated neural network models.
          </p>
        </div>

        {/* Pillars Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', marginBottom: '50px' }}>
          <div className="glass-card">
            <div style={{ width: '45px', height: '45px', borderRadius: '10px', background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: '#fff' }}>
              <Settings size={20} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Bespoke Architectures</h3>
            <p style={{ color: 'var(--muted-color)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Tailored agent architectures built to handle unique business rules, specialized databases, and custom API integrations.
            </p>
          </div>

          <div className="glass-card">
            <div style={{ width: '45px', height: '45px', borderRadius: '10px', background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: '#fff' }}>
              <Cpu size={20} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Model Adaptations</h3>
            <p style={{ color: 'var(--muted-color)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Fine-tune custom model structures specifically for low-latency operational environments or specialized logical reasoning tasks.
            </p>
          </div>

          <div className="glass-card">
            <div style={{ width: '45px', height: '45px', borderRadius: '10px', background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: '#fff' }}>
              <HardDrive size={20} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Dedicated Compute</h3>
            <p style={{ color: 'var(--muted-color)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Access isolated, high-performance GPU clusters managed by Zyntral Labs, offering guaranteed runtimes and scaling profiles.
            </p>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="glass-card" style={{ padding: '40px', textAlign: 'center', background: 'rgba(5, 5, 12, 0.65)' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '30px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '20px' }}>
            <Zap size={14} style={{ color: 'var(--green)' }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--muted-color)' }}>
              Dedicated Support
            </span>
          </div>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '15px' }}>Build bespoke neural nodes</h2>
          <p style={{ color: 'var(--muted-color)', fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto 30px', lineHeight: '1.7' }}>
            Get in touch with our solutions engineers to organize dedicated sandbox testing slots for your team or provision secure GPU clusters.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
            <Link to="/waitlist" className="btn-primary" style={{ padding: '10px 24px', fontSize: '0.9rem' }}>
              Request Sandbox Access <ArrowRight size={14} />
            </Link>
            <Link to="/contact" className="btn-secondary" style={{ padding: '10px 24px', fontSize: '0.9rem' }}>
              Contact Team
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CustomAISystems;
