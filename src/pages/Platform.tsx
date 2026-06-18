import React, { useState } from 'react';
import { InteractiveRAGBuilder } from '../components/InteractiveRAGBuilder';
import { InteractiveTrainer } from '../components/InteractiveTrainer';
import { Sparkles, Cpu, Users, Database, HelpCircle } from 'lucide-react';

export const Platform: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'rag' | 'train' | 'agents'>('rag');

  // Agent state management for the simulation
  const [agents, setAgents] = useState([
    { id: 1, name: 'Logistics Routing Coordinator', status: 'active', tasks: 1420, avgLatency: '42ms', uptime: '99.98%' },
    { id: 2, name: 'Supply Chain Procurement Agent', status: 'active', tasks: 894, avgLatency: '110ms', uptime: '99.91%' },
    { id: 3, name: 'Warehouse Stock Level Audit Bot', status: 'idle', tasks: 512, avgLatency: '85ms', uptime: '100.00%' },
    { id: 4, name: 'Enterprise Contract Compliance Auditor', status: 'active', tasks: 231, avgLatency: '350ms', uptime: '99.5%' }
  ]);

  const toggleAgent = (id: number) => {
    setAgents(prev => prev.map(a => {
      if (a.id === id) {
        return { ...a, status: a.status === 'active' ? 'idle' : 'active' };
      }
      return a;
    }));
  };

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', position: 'relative' }}>
      <div className="container" style={{ position: 'relative', zIndex: 5, marginBottom: '60px' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <span className="badge badge-cyan" style={{ marginBottom: '10px' }}>Developer Sandbox</span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Zyntral Developer Platform</h1>
          <p style={{ color: 'var(--muted-color)', marginTop: '5px', fontSize: '1.05rem' }}>
            Experiment with on-prompt RAG compiles, custom neural alignments, and agent orchestrators.
          </p>
        </div>

        {/* Tabs Controller */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '15px', 
          marginBottom: '40px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          paddingBottom: '20px'
        }}>
          {[
            { id: 'rag', label: 'Prompt-to-RAG', icon: Sparkles },
            { id: 'train', label: 'Fine-Tuning', icon: Cpu },
            { id: 'agents', label: 'Autonomous Agents', icon: Users }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 24px',
                  borderRadius: '30px',
                  background: isActive ? 'rgba(255,255,255,0.08)' : 'transparent',
                  border: isActive ? '1px solid rgba(255,255,255,0.25)' : '1px solid rgba(255,255,255,0.06)',
                  color: isActive ? '#fff' : 'var(--muted-color)',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: isActive ? '0 0 15px rgba(255, 255, 255, 0.03)' : 'none'
                }}
              >
                <Icon size={16} style={{ color: isActive ? '#ffffff' : 'var(--muted-color)' }} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Active Tab Content */}
        <div style={{ minHeight: '500px' }}>
          {activeTab === 'rag' && (
            <div style={{ animation: 'fade-in 0.4s ease' }}>
              <InteractiveRAGBuilder />
              <div style={{ marginTop: '30px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
                <div className="glass-card" style={{ padding: '25px' }}>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Database size={16} style={{ color: '#e5e7eb' }} />
                    Zero-Code DB Integrations
                  </h4>
                  <p style={{ color: 'var(--muted-color)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                    Zyntral compiles vector search drivers out-of-the-box. Connect standard indices like Pinecone, Milvus, Qdrant, Chroma, or local pgvector tables by describing security variables in your text prompt.
                  </p>
                </div>
                <div className="glass-card" style={{ padding: '25px' }}>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Sparkles size={16} style={{ color: '#d1d5db' }} />
                    Smart Retrieval Rerankers
                  </h4>
                  <p style={{ color: 'var(--muted-color)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                    The compiler automatically selects optimized chunking layouts and binds Cohere, BGE, or Cross-Encoder rerankers based on latency profiles determined during testing.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'train' && (
            <div style={{ animation: 'fade-in 0.4s ease' }}>
              <InteractiveTrainer />
              <div style={{ marginTop: '30px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
                <div className="glass-card" style={{ padding: '25px' }}>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Cpu size={16} style={{ color: '#d1d5db' }} />
                    Parameter Efficient Tuning
                  </h4>
                  <p style={{ color: 'var(--muted-color)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                    Our model compiler leverages Low-Rank Adaptation (LoRA) and QLoRA strategies to scale training down to cost-efficient margins. Fine-tune parameters locally on Zyntral-managed GPU clusters.
                  </p>
                </div>
                <div className="glass-card" style={{ padding: '25px' }}>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <HelpCircle size={16} style={{ color: '#9ca3af' }} />
                    Reinforcement Alignments
                  </h4>
                  <p style={{ color: 'var(--muted-color)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                    Quickly configure RLHF parameters or directly load preference data (DPO/KTO) through prompt directions to optimize model tone, format adherence, and compliance constraints.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'agents' && (
            <div style={{ animation: 'fade-in 0.4s ease' }} className="glass-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <div>
                  <h3 style={{ fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Users size={20} style={{ color: 'var(--green)' }} />
                    Autonomous Agent Orchestrator
                  </h3>
                  <p style={{ color: 'var(--muted-color)', fontSize: '0.85rem', marginTop: '4px' }}>
                    Manage background agent nodes deployed across your logistics, audits, and support threads.
                  </p>
                </div>
                <span className="badge badge-green">4 Nodes Deployed</span>
              </div>

              {/* Agent Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>
                {agents.map(agent => (
                  <div 
                    key={agent.id} 
                    style={{ 
                      display: 'grid', 
                      gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', 
                      alignItems: 'center',
                      background: 'rgba(0,0,0,0.3)',
                      border: '1px solid rgba(255,255,255,0.05)',
                      padding: '18px 25px',
                      borderRadius: '12px',
                      gap: '15px'
                    }}
                  >
                    <div>
                      <span style={{ fontWeight: 600, color: '#fff', fontSize: '0.95rem' }}>{agent.name}</span>
                    </div>
                    
                    <div>
                      <span style={{ color: 'var(--muted-color)', fontSize: '0.8rem', display: 'block' }}>Total Tasks</span>
                      <span style={{ fontFamily: 'monospace', fontWeight: 600, fontSize: '0.9rem', color: '#f3f4f6' }}>{agent.tasks}</span>
                    </div>

                    <div>
                      <span style={{ color: 'var(--muted-color)', fontSize: '0.8rem', display: 'block' }}>Avg Latency</span>
                      <span style={{ fontFamily: 'monospace', fontWeight: 600, fontSize: '0.9rem', color: '#f3f4f6' }}>{agent.avgLatency}</span>
                    </div>

                    <div>
                      <span style={{ color: 'var(--muted-color)', fontSize: '0.8rem', display: 'block' }}>Uptime Node</span>
                      <span style={{ fontFamily: 'monospace', fontWeight: 600, fontSize: '0.9rem', color: 'var(--green)' }}>{agent.uptime}</span>
                    </div>

                    <div style={{ justifySelf: 'end' }}>
                      <button 
                        onClick={() => toggleAgent(agent.id)}
                        style={{
                          padding: '6px 14px',
                          borderRadius: '20px',
                          border: '1px solid rgba(255,255,255,0.1)',
                          background: agent.status === 'active' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255,255,255,0.03)',
                          borderColor: agent.status === 'active' ? 'rgba(16, 185, 129, 0.4)' : 'rgba(255,255,255,0.1)',
                          color: agent.status === 'active' ? 'var(--green)' : 'var(--muted-color)',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        {agent.status === 'active' ? '● Active' : '○ Standby'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
      
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Platform;
