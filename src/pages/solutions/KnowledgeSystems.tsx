import React from 'react';
import { Link } from 'react-router-dom';
import { Database, Search, ShieldAlert, ArrowRight, Zap } from 'lucide-react';

export const KnowledgeSystems: React.FC = () => {
  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', position: 'relative' }}>
      <div className="container" style={{ position: 'relative', zIndex: 5, marginBottom: '80px' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '45px', textAlign: 'center' }}>
          <span className="badge badge-cyan" style={{ marginBottom: '10px' }}>Solutions / Knowledge Systems</span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '15px' }}>
            Semantic <span className="gradient-text">Knowledge Retrieval</span>
          </h1>
          <p style={{ color: 'var(--muted-color)', maxWidth: '750px', margin: '0 auto', fontSize: '1.05rem', lineHeight: '1.8' }}>
            Compile enterprise search indices and context-aware retrieval databases. Reduce development times and avoid manual API configurations.
          </p>
        </div>

        {/* Pillars Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', marginBottom: '50px' }}>
          <div className="glass-card">
            <div style={{ width: '45px', height: '45px', borderRadius: '10px', background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: '#fff' }}>
              <Database size={20} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Unified Index Routing</h3>
            <p style={{ color: 'var(--muted-color)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Access Pinecone, pgvector, and Milvus instances simultaneously. Zyntral routes semantic questions to the target database index dynamically based on user needs.
            </p>
          </div>

          <div className="glass-card">
            <div style={{ width: '45px', height: '45px', borderRadius: '10px', background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: '#fff' }}>
              <Search size={20} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Smart Reranking</h3>
            <p style={{ color: 'var(--muted-color)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Leverage Cross-Encoder and Cohere reranking models out-of-the-box. Optimize retrieval relevance and minimize prompt context token sizes.
            </p>
          </div>

          <div className="glass-card">
            <div style={{ width: '45px', height: '45px', borderRadius: '10px', background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: '#fff' }}>
              <ShieldAlert size={20} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Strict Compliance</h3>
            <p style={{ color: 'var(--muted-color)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Run queries inside completely isolated VPC networks, protecting sensitive documents and corporate logs from data leakage.
            </p>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="glass-card" style={{ padding: '40px', textAlign: 'center', background: 'rgba(5, 5, 12, 0.65)' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '30px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '20px' }}>
            <Zap size={14} style={{ color: 'var(--green)' }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--muted-color)' }}>
              Knowledge Compilation
            </span>
          </div>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '15px' }}>Access your files semantically</h2>
          <p style={{ color: 'var(--muted-color)', fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto 30px', lineHeight: '1.7' }}>
            Talk to Zyntral engineers to provision dedicated vector pipeline tests and evaluate retrieval speeds on your corpus.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
            <Link to="/waitlist" className="btn-primary" style={{ padding: '10px 24px', fontSize: '0.9rem' }}>
              Apply For Waitlist <ArrowRight size={14} />
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

export default KnowledgeSystems;
