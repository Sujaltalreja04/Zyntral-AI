import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Cpu, Layers, ArrowRight, Zap } from 'lucide-react';
import { SEO } from '../../components/SEO';

export const EnterpriseAI: React.FC = () => {
  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', position: 'relative' }}>
      <SEO
        title="Enterprise AI Systems"
        description="Deploy custom prompt-to-RAG compilers, model alignment dashboards, and secure autonomous agent loops built for large-scale enterprise environments."
        path="/solutions/enterprise-ai"
        keywords={['Enterprise AI', 'SFT', 'DPO tuning', 'enterprise vector database', 'tenant isolation']}
      />
      <div className="container" style={{ position: 'relative', zIndex: 5, marginBottom: '80px' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '45px', textAlign: 'center' }}>
          <span className="badge badge-cyan" style={{ marginBottom: '10px' }}>Enterprise solutions</span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '15px' }}>
            Enterprise <span className="gradient-text">AI Systems</span>
          </h1>
          <p style={{ color: 'var(--muted-color)', maxWidth: '750px', margin: '0 auto', fontSize: '1.05rem', lineHeight: '1.8' }}>
            Deploy custom prompt-to-RAG compilers, alignment training dashboards, and autonomous agent loops tailored for large-scale enterprise environments.
          </p>
        </div>

        {/* Pillars Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', marginBottom: '50px' }}>
          <div className="glass-card">
            <div style={{ width: '45px', height: '45px', borderRadius: '10px', background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: '#fff' }}>
              <ShieldCheck size={20} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Security & Compliance</h3>
            <p style={{ color: 'var(--muted-color)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Isolated tenant instances, custom encrypted databases, and fine-grain user permission controls. Built to meet strict enterprise data compliance benchmarks.
            </p>
          </div>

          <div className="glass-card">
            <div style={{ width: '45px', height: '45px', borderRadius: '10px', background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: '#fff' }}>
              <Cpu size={20} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Fine-Tuned Models</h3>
            <p style={{ color: 'var(--muted-color)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Custom alignment training models (DPO, RLHF, SFT) fine-tuned on custom organizational datasets to guarantee brand voice and functional safety.
            </p>
          </div>

          <div className="glass-card">
            <div style={{ width: '45px', height: '45px', borderRadius: '10px', background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: '#fff' }}>
              <Layers size={20} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Systems Integrations</h3>
            <p style={{ color: 'var(--muted-color)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Direct API configurations linking Zyntral runtime node clusters with legacy enterprise ERPs, vector indices, and databases.
            </p>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="glass-card" style={{ padding: '40px', textAlign: 'center', background: 'rgba(5, 5, 12, 0.65)' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '30px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '20px' }}>
            <Zap size={14} style={{ color: 'var(--green)' }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--muted-color)' }}>
              Tailored Integrations
            </span>
          </div>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '15px' }}>Custom deployment keys for your team</h2>
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

export default EnterpriseAI;
