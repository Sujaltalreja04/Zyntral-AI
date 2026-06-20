import React from 'react';

export const Terms: React.FC = () => {
  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', position: 'relative' }}>
      <div className="container" style={{ position: 'relative', zIndex: 5, marginBottom: '80px', maxWidth: '800px' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '45px' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '15px' }}>
            Terms of <span className="gradient-text">Service</span>
          </h1>
          <p style={{ color: 'var(--muted-color)', fontSize: '0.95rem' }}>
            Last updated: June 20, 2026
          </p>
        </div>

        {/* Terms Body */}
        <div className="glass-card" style={{ padding: '35px', display: 'flex', flexDirection: 'column', gap: '25px', lineHeight: '1.7', fontSize: '0.95rem', color: 'var(--muted-color)' }}>
          <section>
            <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '10px' }}>1. Acceptable Use</h3>
            <p>
              By accessing the Zyntral developer sandbox, you agree to deploy agent clusters in accordance with local computing regulations. Misuse of GPU assets is strictly prohibited.
            </p>
          </section>

          <section>
            <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '10px' }}>2. Compiler Warranties</h3>
            <p>
              Zyntral AI compiles RAG structures based on user prompt directions. While we verify query performance, Zyntral is not responsible for query accuracy errors arising from underlying index databases.
            </p>
          </section>

          <section>
            <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '10px' }}>3. Account Termination</h3>
            <p>
              Zyntral Labs reserves the right to pause developer credentials or suspend GPU nodes that exceed standard latency queues or violate safety guidelines.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
};

export default Terms;
