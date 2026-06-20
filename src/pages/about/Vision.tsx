import React from 'react';
import { HelpCircle, Target } from 'lucide-react';

export const Vision: React.FC = () => {
  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', position: 'relative' }}>
      <div className="container" style={{ position: 'relative', zIndex: 5, marginBottom: '80px', maxWidth: '800px' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '45px', textAlign: 'center' }}>
          <span className="badge badge-cyan" style={{ marginBottom: '10px' }}>Our Vision</span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '15px' }}>
            Zyntral <span className="gradient-text">Vision</span>
          </h1>
          <p style={{ color: 'var(--muted-color)', fontSize: '1.05rem', lineHeight: '1.8' }}>
            Learn more about why we are building Zyntral AI and where we are heading.
          </p>
        </div>

        {/* Why Zyntral Exists */}
        <div className="glass-card" style={{ padding: '35px', marginBottom: '30px', background: 'rgba(5, 5, 12, 0.45)' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <HelpCircle size={18} />
            Why Zyntral Exists
          </h3>
          <p style={{ color: 'var(--muted-color)', fontSize: '0.95rem', lineHeight: '1.7' }}>
            Traditional LLM frameworks make it simple to prototype agent loops but complex to run them in production at scale. High latency overheads, data compliance risks, and soaring commercial API token costs make enterprise deployments difficult. Zyntral exists to compile database drivers and train models directly from prompt instructions, providing a secure serverless agent runtime.
          </p>
        </div>

        {/* Long-Term Vision */}
        <div className="glass-card" style={{ padding: '35px', background: 'rgba(5, 5, 12, 0.45)' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Target size={18} style={{ color: 'var(--green)' }} />
            Long-Term Vision
          </h3>
          <p style={{ color: 'var(--muted-color)', fontSize: '0.95rem', lineHeight: '1.7' }}>
            In the long term, Zyntral aims to establish a decentralized computing marketplace. Developers will be able to host low-latency agent nodes on regional GPU nodes, compile prompt retrieval indexes, and trigger git-revisioned training aligners asynchronously, creating a serverless infrastructure layer for the agentic age.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Vision;
