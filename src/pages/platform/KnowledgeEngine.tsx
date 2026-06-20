import React from 'react';
import { InteractiveRAGBuilder } from '../../components/InteractiveRAGBuilder';
import { Database, Sparkles, Server } from 'lucide-react';

export const KnowledgeEngine: React.FC = () => {
  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', position: 'relative' }}>
      <div className="container" style={{ position: 'relative', zIndex: 5, marginBottom: '80px' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '45px', textAlign: 'center' }}>
          <span className="badge badge-cyan" style={{ marginBottom: '10px' }}>Storage & Compilation</span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '15px' }}>
            Knowledge <span className="gradient-text">Engine</span>
          </h1>
          <p style={{ color: 'var(--muted-color)', maxWidth: '750px', margin: '0 auto', fontSize: '1.05rem', lineHeight: '1.8' }}>
            Design and compile vector databases on-prompt. Create customized chunking, select optimized embeddings, and bind real-time semantic query pathways.
          </p>
        </div>

        {/* Interactive RAG Builder */}
        <div style={{ animation: 'fade-in 0.4s ease', marginBottom: '40px' }}>
          <InteractiveRAGBuilder />
        </div>

        {/* Technical Details Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginBottom: '40px' }}>
          <div className="glass-card" style={{ padding: '25px' }}>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Database size={18} style={{ color: '#fff' }} />
              Zero-Code DB Integrations
            </h4>
            <p style={{ color: 'var(--muted-color)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Zyntral compiles vector search drivers out-of-the-box. Connect standard indices like Pinecone, Milvus, Qdrant, Chroma, or local pgvector tables by describing security variables in your text prompt.
            </p>
          </div>
          
          <div className="glass-card" style={{ padding: '25px' }}>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={18} style={{ color: '#fff' }} />
              Smart Retrieval Rerankers
            </h4>
            <p style={{ color: 'var(--muted-color)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              The compiler automatically selects optimized chunking layouts and binds Cohere, BGE, or Cross-Encoder rerankers based on latency profiles determined during testing.
            </p>
          </div>
        </div>

        {/* Storage Stats */}
        <div className="glass-card" style={{ padding: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
            <Server size={20} style={{ color: 'var(--muted-color)' }} />
            <h3 style={{ fontSize: '1.2rem' }}>Knowledge Base Status</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--muted-color)', textTransform: 'uppercase', letterSpacing: '1px' }}>Global Vector Count</span>
              <div style={{ fontSize: '1.6rem', fontWeight: 700, fontFamily: 'monospace', color: '#fff', marginTop: '5px' }}>14,892,104</div>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--muted-color)', textTransform: 'uppercase', letterSpacing: '1px' }}>Average Query Time</span>
              <div style={{ fontSize: '1.6rem', fontWeight: 700, fontFamily: 'monospace', color: 'var(--green)', marginTop: '5px' }}>18.4ms</div>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--muted-color)', textTransform: 'uppercase', letterSpacing: '1px' }}>Retrieval Precision</span>
              <div style={{ fontSize: '1.6rem', fontWeight: 700, fontFamily: 'monospace', color: '#fff', marginTop: '5px' }}>99.2%</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default KnowledgeEngine;
