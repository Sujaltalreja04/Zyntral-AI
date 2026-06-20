import React from 'react';
import { Radio, Calendar, GitCommit, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BuildLogs: React.FC = () => {
  const logs = [
    {
      title: 'Decentralized Peer Negotiation Complete',
      date: 'June 18, 2026',
      content: 'Successfully verified multi-agent synchronization logic across latency-simulated edge servers. We observed a 35% improvement in processing latency under packet loss constraints.',
      metrics: '35% Latency Reduction'
    },
    {
      title: 'Prompt Compiler Sandbox Release',
      date: 'June 02, 2026',
      content: 'Provisioned public vector index connectors (Pinecone, Chroma) for on-prompt retrieval testing. Open sandbox keys are now available to all early developer waitlist subscribers.',
      metrics: 'Chroma & Pinecone Support'
    }
  ];

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', position: 'relative' }}>
      <div className="container" style={{ position: 'relative', zIndex: 5, marginBottom: '80px', maxWidth: '800px' }}>
        
        {/* Navigation Breadcrumb */}
        <div style={{ marginBottom: '30px', fontSize: '0.85rem' }}>
          <Link to="/research" style={{ color: 'var(--muted-color)', textDecoration: 'none' }}>Research</Link>
          <span style={{ color: 'var(--muted-color)', margin: '0 10px' }}>/</span>
          <span style={{ color: '#fff' }}>Build Logs</span>
        </div>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
          <Radio size={20} style={{ color: 'var(--green)' }} />
          <span className="badge badge-green" style={{ fontSize: '0.75rem' }}>Live Stream Updates</span>
        </div>
        
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '15px' }}>
          Zyntral Build <span className="gradient-text">Logs</span>
        </h1>
        <p style={{ color: 'var(--muted-color)', fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '40px' }}>
          Follow along with our active development stream as we build out prompt-to-RAG and autonomous agent runtimes in public.
        </p>

        {/* Updates list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {logs.map((log, idx) => (
            <div key={idx} className="glass-card" style={{ padding: '30px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '15px' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--muted-color)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Calendar size={14} /> {log.date}
                  </span>
                  <h3 style={{ fontSize: '1.3rem', color: '#fff', marginTop: '5px' }}>{log.title}</h3>
                </div>
                <span className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>{log.metrics}</span>
              </div>
              <p style={{ color: 'var(--muted-color)', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '20px' }}>
                {log.content}
              </p>
              <div style={{ display: 'flex', gap: '15px', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '15px', fontSize: '0.85rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--muted-color)' }}>
                  <GitCommit size={14} /> commit: <span style={{ color: '#fff', fontFamily: 'monospace' }}>z-{idx + 721}c4b</span>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--muted-color)', cursor: 'pointer' }}>
                  <Heart size={14} style={{ color: '#ff6b6b' }} /> Like update
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default BuildLogs;
