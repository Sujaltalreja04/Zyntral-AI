import React from 'react';
import { BookOpen, Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AIAgents: React.FC = () => {
  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', position: 'relative' }}>
      <div className="container" style={{ position: 'relative', zIndex: 5, marginBottom: '80px', maxWidth: '800px' }}>
        
        {/* Navigation Breadcrumb */}
        <div style={{ marginBottom: '30px', fontSize: '0.85rem' }}>
          <Link to="/platform" style={{ color: 'var(--muted-color)', textDecoration: 'none' }}>Research</Link>
          <span style={{ color: 'var(--muted-color)', margin: '0 10px' }}>/</span>
          <span style={{ color: '#fff' }}>AI Agents</span>
        </div>

        {/* Paper Header */}
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '20px', lineHeight: '1.25' }}>
          Decentralized Multi-Agent Coordination in Latency-Constrained Physical Environments
        </h1>

        {/* Metadata */}
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '40px', paddingBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.08)', fontSize: '0.9rem', color: 'var(--muted-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Calendar size={16} />
            <span>June 2026</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <User size={16} />
            <span>Zyntral Research Labs</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <BookOpen size={16} />
            <span>Technical Report (ZTR-26-04)</span>
          </div>
        </div>

        {/* Paper Layout */}
        <div className="glass-card" style={{ padding: '35px', marginBottom: '40px', background: 'rgba(5, 5, 12, 0.4)' }}>
          <h3 style={{ fontSize: '1.15rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px', color: '#fff' }}>Abstract</h3>
          <p style={{ color: 'var(--fg-color)', fontSize: '0.95rem', lineHeight: '1.8', fontStyle: 'italic', fontWeight: 300 }}>
            "This research introduces the Zyntral Agentic Runtime (ZAR), an execution layout configured specifically for coordinating autonomous agent networks in distributed logistics networks. We address the problem of agent-to-agent negotiation under variable network latency and packet loss conditions, demonstrating that localized prompt compilers can reduce routing overhead by up to 40%."
          </p>
        </div>

        {/* Technical Outline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>1. Introduction</h2>
            <p style={{ color: 'var(--muted-color)', fontSize: '0.95rem', lineHeight: '1.7' }}>
              Traditional orchestration patterns rely on centralized servers to validate agent outputs and direct workflow states. In industrial logistics, this structure fails under high network latency or local connection drops. We present a peer-to-peer negotiation framework built on top of quantized LLMs deployed locally on Edge-GPU nodes.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>2. Multi-Agent Negotiation Topology</h2>
            <p style={{ color: 'var(--muted-color)', fontSize: '0.95rem', lineHeight: '1.7' }}>
              Zyntral utilizes a consensus-directed state graph where agent outputs are validated asynchronously. This minimizes blocking conditions during execution loops and ensures fleet coordination continues even during temporary network splits.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AIAgents;
