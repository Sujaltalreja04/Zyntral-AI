import React from 'react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', position: 'relative' }}>
      <div className="container" style={{ position: 'relative', zIndex: 5, marginBottom: '80px', maxWidth: '800px' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '45px' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '15px' }}>
            Privacy <span className="gradient-text">Policy</span>
          </h1>
          <p style={{ color: 'var(--muted-color)', fontSize: '0.95rem' }}>
            Last updated: June 20, 2026
          </p>
        </div>

        {/* Policy Body */}
        <div className="glass-card" style={{ padding: '35px', display: 'flex', flexDirection: 'column', gap: '25px', lineHeight: '1.7', fontSize: '0.95rem', color: 'var(--muted-color)' }}>
          <section>
            <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '10px' }}>1. Information We Compile</h3>
            <p>
              Zyntral AI compiles account details (names, email addresses, startup metadata) and developer sandbox input logs to improve our prompt-to-RAG compilation models.
            </p>
          </section>

          <section>
            <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '10px' }}>2. Data Isolation</h3>
            <p>
              All compiled datasets, preference training logs, and vector database schemas are isolated within secure tenant containers. We do not share organizational prompt data across client boundaries.
            </p>
          </section>

          <section>
            <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '10px' }}>3. User Rights</h3>
            <p>
              Developers can request complete removal of their waitlist registries or model sandbox configurations at any time by contacting our support team.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;
