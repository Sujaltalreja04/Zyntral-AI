import React from 'react';
import { BookOpen, Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export const RAGArchitectures: React.FC = () => {
  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', position: 'relative' }}>
      <div className="container" style={{ position: 'relative', zIndex: 5, marginBottom: '80px', maxWidth: '800px' }}>
        
        {/* Navigation Breadcrumb */}
        <div style={{ marginBottom: '30px', fontSize: '0.85rem' }}>
          <Link to="/research" style={{ color: 'var(--muted-color)', textDecoration: 'none' }}>Research</Link>
          <span style={{ color: 'var(--muted-color)', margin: '0 10px' }}>/</span>
          <span style={{ color: '#fff' }}>RAG Architectures</span>
        </div>

        {/* Paper Header */}
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '20px', lineHeight: '1.25' }}>
          On-Prompt Retrieval Compilation: Dynamically Adapting Chunking and Index Routing
        </h1>

        {/* Metadata */}
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '40px', paddingBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.08)', fontSize: '0.9rem', color: 'var(--muted-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Calendar size={16} />
            <span>May 2026</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <User size={16} />
            <span>Zyntral Research Labs</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <BookOpen size={16} />
            <span>Technical Report (ZTR-26-02)</span>
          </div>
        </div>

        {/* Abstract */}
        <div className="glass-card" style={{ padding: '35px', marginBottom: '40px', background: 'rgba(5, 5, 12, 0.4)' }}>
          <h3 style={{ fontSize: '1.15rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px', color: '#fff' }}>Abstract</h3>
          <p style={{ color: 'var(--fg-color)', fontSize: '0.95rem', lineHeight: '1.8', fontStyle: 'italic', fontWeight: 300 }}>
            "This report analyzes the performance improvements realized by Zyntral's prompt-to-RAG compilation workflow. We evaluate retrieval accuracy across multi-source enterprise index endpoints, outlining dynamic token routing architectures that reduce context pollution and minimize embedding latency."
          </p>
        </div>

        {/* Technical Outline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>1. Introduction</h2>
            <p style={{ color: 'var(--muted-color)', fontSize: '0.95rem', lineHeight: '1.7' }}>
              Standard Retrieval-Augmented Generation (RAG) frameworks rely on static parameters: a fixed chunk size, constant overlap settings, and static index endpoints. In contrast, Zyntral compiles retrieval drivers dynamically based on the semantic structure of the prompt.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>2. Dynamically Compiled Vector Indexes</h2>
            <p style={{ color: 'var(--muted-color)', fontSize: '0.95rem', lineHeight: '1.7' }}>
              By examining prompt layout queries, the Zyntral compiler generates custom database queries, chunking filters, and ranking thresholds on-demand, targeting only the relevant sub-indexes.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RAGArchitectures;
