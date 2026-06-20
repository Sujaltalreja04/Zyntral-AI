import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, Database, Compass, ArrowRight, Zap } from 'lucide-react';
import { SEO } from '../../components/SEO';

export const SupplyChainAI: React.FC = () => {
  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', position: 'relative' }}>
      <SEO
        title="Supply Chain Optimization AI"
        description="Automate stock level audits, streamline vendor communication, and deploy predictive demand models using custom Zyntral prompt workflows."
        path="/solutions/supply-chain-ai"
        keywords={['Supply chain AI', 'inventory intelligence', 'demand forecasting', 'vendor coordination']}
      />
      <div className="container" style={{ position: 'relative', zIndex: 5, marginBottom: '80px' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '45px', textAlign: 'center' }}>
          <span className="badge badge-cyan" style={{ marginBottom: '10px' }}>Supply Chain solutions</span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '15px' }}>
            Supply Chain <span className="gradient-text">Optimization</span>
          </h1>
          <p style={{ color: 'var(--muted-color)', maxWidth: '750px', margin: '0 auto', fontSize: '1.05rem', lineHeight: '1.8' }}>
            Automate stock level audits, streamline vendor communication, and deploy predictive demand models using custom Zyntral prompt workflows.
          </p>
        </div>

        {/* Pillars Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', marginBottom: '50px' }}>
          <div className="glass-card">
            <div style={{ width: '45px', height: '45px', borderRadius: '10px', background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: '#fff' }}>
              <Layers size={20} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Inventory Intelligence</h3>
            <p style={{ color: 'var(--muted-color)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Run automated stock auditing routines. Automatically flag discrepancies, coordinate stock levels, and predict replenishment cycles.
            </p>
          </div>

          <div className="glass-card">
            <div style={{ width: '45px', height: '45px', borderRadius: '10px', background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: '#fff' }}>
              <Database size={20} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Demand Forecasting</h3>
            <p style={{ color: 'var(--muted-color)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Utilize custom time-series fine-tuned models to predict market demands. Keep your operations running lean with precise procurement bounds.
            </p>
          </div>

          <div className="glass-card">
            <div style={{ width: '45px', height: '45px', borderRadius: '10px', background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: '#fff' }}>
              <Compass size={20} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Vendor Coordination</h3>
            <p style={{ color: 'var(--muted-color)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Deploy communication bots that interface directly with carriers and manufacturers. Automate order confirmations, query resolution, and delivery logs.
            </p>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="glass-card" style={{ padding: '40px', textAlign: 'center', background: 'rgba(5, 5, 12, 0.65)' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '30px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '20px' }}>
            <Zap size={14} style={{ color: 'var(--green)' }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--muted-color)' }}>
              Precision Logistics
            </span>
          </div>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '15px' }}>Enhance vendor visibility</h2>
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

export default SupplyChainAI;
