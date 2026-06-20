import React from 'react';
import { BookOpen, Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LLMInfrastructure: React.FC = () => {
  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', position: 'relative' }}>
      <div className="container" style={{ position: 'relative', zIndex: 5, marginBottom: '80px', maxWidth: '800px' }}>
        
        {/* Navigation Breadcrumb */}
        <div style={{ marginBottom: '30px', fontSize: '0.85rem' }}>
          <Link to="/research" style={{ color: 'var(--muted-color)', textDecoration: 'none' }}>Research</Link>
          <span style={{ color: 'var(--muted-color)', margin: '0 10px' }}>/</span>
          <span style={{ color: '#fff' }}>LLM Infrastructure</span>
        </div>

        {/* Paper Header */}
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '20px', lineHeight: '1.25' }}>
          Automating Model Alignment: Prompt-Directed Direct Preference Optimization (DPO) Loops
        </h1>

        {/* Metadata */}
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '40px', paddingBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.08)', fontSize: '0.9rem', color: 'var(--muted-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Calendar size={16} />
            <span>March 2026</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <User size={16} />
            <span>Zyntral Research Labs</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <BookOpen size={16} />
            <span>Technical Report (ZTR-26-01)</span>
          </div>
        </div>

        {/* Abstract */}
        <div className="glass-card" style={{ padding: '35px', marginBottom: '40px', background: 'rgba(5, 5, 12, 0.4)' }}>
          <h3 style={{ fontSize: '1.15rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px', color: '#fff' }}>Abstract</h3>
          <p style={{ color: 'var(--fg-color)', fontSize: '0.95rem', lineHeight: '1.8', fontStyle: 'italic', fontWeight: 300 }}>
            "Aligning neural language models to strict execution constraints requires high-overhead human feedback loops. This report describes a workflow where prompt directives generate preference pairs automatically, enabling rapid fine-tuning on decentralized worker nodes."
          </p>
        </div>

        {/* Technical Outline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>1. Introduction</h2>
            <p style={{ color: 'var(--muted-color)', fontSize: '0.95rem', lineHeight: '1.7' }}>
              For models deployed in operational pipelines, following strict constraints (e.g. valid JSON formatting, deterministic function calls) is critical. Zyntral automates alignment training using prompt-guided synthetic preference pairs to refine target weights.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>2. Synthetic Preference Orchestration</h2>
            <p style={{ color: 'var(--muted-color)', fontSize: '0.95rem', lineHeight: '1.7' }}>
              We outline how model outputs are scored using semantic analyzers and compiled into alignment datasets. These preference arrays are then ingested by LoRA layers to adjust weights in active nodes.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LLMInfrastructure;
