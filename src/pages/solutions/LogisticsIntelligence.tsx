import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, Navigation, Activity, ArrowRight, Zap } from 'lucide-react';
import { SEO } from '../../components/SEO';

export const LogisticsIntelligence: React.FC = () => {
  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', position: 'relative' }}>
      <SEO
        title="Logistics Intelligence AI Systems"
        description="Empower logistics operators with automated route coordinators, delay predictors, and real-time fleet communication loops powered by Zyntral Agent clusters."
        path="/solutions/logistics-intelligence"
        keywords={['Logistics AI', 'dynamic routing', 'fleet coordination', 'delay prediction']}
      />
      <div className="container" style={{ position: 'relative', zIndex: 5, marginBottom: '80px' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '45px', textAlign: 'center' }}>
          <span className="badge badge-cyan" style={{ marginBottom: '10px' }}>Logistics Intelligence</span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '15px' }}>
            Predictive <span className="gradient-text">Logistics</span>
          </h1>
          <p style={{ color: 'var(--muted-color)', maxWidth: '750px', margin: '0 auto', fontSize: '1.05rem', lineHeight: '1.8' }}>
            Empower logistics operators with automated route coordinators, delay predictors, and real-time fleet communication loops powered by Zyntral Agent clusters.
          </p>
        </div>

        {/* Pillars Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', marginBottom: '50px' }}>
          <div className="glass-card">
            <div style={{ width: '45px', height: '45px', borderRadius: '10px', background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: '#fff' }}>
              <Truck size={20} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Fleet Coordination</h3>
            <p style={{ color: 'var(--muted-color)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Coordinate multiple dispatch systems using lightweight agent nodes. Automate driver notifications, tracking codes, and status updates on-the-fly.
            </p>
          </div>

          <div className="glass-card">
            <div style={{ width: '45px', height: '45px', borderRadius: '10px', background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: '#fff' }}>
              <Navigation size={20} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Dynamic Routing</h3>
            <p style={{ color: 'var(--muted-color)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Adjust routes in real-time based on live weather data, traffic patterns, and border times compiled by our retrieval engines.
            </p>
          </div>

          <div className="glass-card">
            <div style={{ width: '45px', height: '45px', borderRadius: '10px', background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: '#fff' }}>
              <Activity size={20} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Delay Predictors</h3>
            <p style={{ color: 'var(--muted-color)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Run predictive analytics on warehouse timelines and carrier performance. Proactively resolve bottlenecks before they impact deliveries.
            </p>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="glass-card" style={{ padding: '40px', textAlign: 'center', background: 'rgba(5, 5, 12, 0.65)' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '30px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '20px' }}>
            <Zap size={14} style={{ color: 'var(--green)' }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--muted-color)' }}>
              Operational Efficiency
            </span>
          </div>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '15px' }}>Optimize your supply chains</h2>
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

export default LogisticsIntelligence;
