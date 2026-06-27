import React, { useState } from 'react';
import { InteractiveRAGBuilder } from '../components/InteractiveRAGBuilder';
import { InteractiveTrainer } from '../components/InteractiveTrainer';
import { SEO } from '../components/SEO';
import { Sparkles, Cpu, Users, Database, HelpCircle, Trash2, Calendar, HardDrive } from 'lucide-react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

export const Platform: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'rag' | 'train' | 'agents'>('rag');

  // Convex integration
  const pipelines = useQuery(api.pipelines.get) || [];
  const removePipeline = useMutation(api.pipelines.remove);

  // Agent state management for the visualizer
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

  const handleDeletePipeline = async (id: any) => {
    if (window.confirm('Are you sure you want to delete this compiled pipeline stack?')) {
      try {
        await removePipeline({ id });
      } catch (err) {
        alert('Failed to delete pipeline.');
      }
    }
  };

  return (
    <div style={{
      backgroundColor: '#020204',
      backgroundImage: "radial-gradient(circle at 50% 0%, rgba(34, 197, 94, 0.08) 0%, rgba(2, 2, 4, 0.98) 70%)",
      paddingTop: '110px',
      minHeight: '100vh',
      position: 'relative'
    }}>
      <SEO
        title="Developer Sandbox - Visual AI RAG & Training Compilers"
        description="Experiment with prompt-to-RAG compilation structures, neural fine-tuning loops, and orchestrate active agent nodes."
        path="/platform"
      />

      <div className="container" style={{ position: 'relative', zIndex: 5, marginBottom: '60px' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <span className="badge" style={{ marginBottom: '10px', background: 'rgba(34, 197, 94, 0.08)', color: '#4ade80', border: '1px solid rgba(34, 197, 94, 0.2)' }}>
            Developer Sandbox
          </span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff' }}>Zyntral Developer Platform</h1>
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
                  background: isActive ? 'rgba(34, 197, 94, 0.04)' : 'transparent',
                  border: isActive ? '1px solid rgba(34, 197, 94, 0.25)' : '1px solid rgba(255, 255, 255, 0.06)',
                  color: isActive ? '#fff' : 'var(--muted-color)',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: isActive ? '0 0 15px rgba(34, 197, 94, 0.05)' : 'none'
                }}
              >
                <Icon size={16} style={{ color: isActive ? '#22c55e' : 'var(--muted-color)' }} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Active Tab Content */}
        <div style={{ minHeight: '500px' }}>
          {activeTab === 'rag' && (
            <div style={{ animation: 'fade-in 0.4s ease', display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <InteractiveRAGBuilder />

              {/* Live Pipelines Catalog Registry */}
              <div className="glass-card" style={{ padding: '25px', background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '1.2rem', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 700 }}>
                    <HardDrive size={18} style={{ color: '#22c55e' }} />
                    Active Sandbox Pipeline Catalog
                  </h3>
                  <span className="badge" style={{ background: 'rgba(34, 197, 94, 0.08)', color: '#4ade80', border: '1px solid rgba(34, 197, 94, 0.2)', fontSize: '0.75rem' }}>
                    {pipelines.length} Registers
                  </span>
                </div>

                {pipelines.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '30px 20px', color: 'var(--muted-color)', fontSize: '0.85rem', fontFamily: 'monospace' }}>
                    No prompt-compiled pipelines found in Convex database. Run a compile above to build one!
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                    {pipelines.map((pipe: any) => (
                      <div 
                        key={pipe._id} 
                        style={{ 
                          padding: '20px', 
                          background: 'rgba(0,0,0,0.3)', 
                          border: '1px solid rgba(255,255,255,0.05)', 
                          borderRadius: '12px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '12px',
                          position: 'relative'
                        }}
                      >
                        <button 
                          onClick={() => handleDeletePipeline(pipe._id)}
                          style={{
                            position: 'absolute',
                            top: '15px',
                            right: '15px',
                            background: 'transparent',
                            border: 'none',
                            color: '#ef4444',
                            cursor: 'pointer',
                            padding: '4px',
                            opacity: 0.7,
                            transition: 'opacity 0.2s ease'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                          onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
                          title="Delete Pipeline Stack"
                        >
                          <Trash2 size={14} />
                        </button>

                        <div>
                          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', paddingRight: '20px' }}>{pipe.name}</h4>
                          <span style={{ fontSize: '0.7rem', color: 'var(--muted-color)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                            <Calendar size={10} /> {pipe.createdAt || 'Just now'}
                          </span>
                        </div>

                        <p style={{ 
                          fontSize: '0.8rem', 
                          color: 'var(--muted-color)', 
                          lineHeight: '1.5',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          minHeight: '36px',
                          margin: 0
                        }}>
                          {pipe.description}
                        </p>

                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '4px' }}>
                          <span className="badge" style={{ fontSize: '0.62rem', background: 'rgba(255,255,255,0.03)', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.06)' }}>
                            {pipe.model}
                          </span>
                          <span className="badge" style={{ fontSize: '0.62rem', background: 'rgba(34,197,94,0.04)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.15)' }}>
                            {pipe.provider}
                          </span>
                          {pipe.appType && (
                            <span className="badge" style={{ fontSize: '0.62rem', background: 'rgba(255,255,255,0.03)', color: '#94a3b8' }}>
                              Type: {pipe.appType.toUpperCase()}
                            </span>
                          )}
                          {pipe.cloudTarget && (
                            <span className="badge" style={{ fontSize: '0.62rem', background: 'rgba(255,255,255,0.03)', color: '#94a3b8' }}>
                              Cloud: {pipe.cloudTarget}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
                <div className="glass-card" style={{ padding: '25px', background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.04)' }}>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px', color: '#ffffff' }}>
                    <Database size={16} style={{ color: '#22c55e' }} />
                    Zero-Code DB Integrations
                  </h4>
                  <p style={{ color: 'var(--muted-color)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                    Zyntral compiles vector search drivers out-of-the-box. Connect standard indices like Pinecone, Milvus, Qdrant, Chroma, or local pgvector tables by describing security variables in your text prompt.
                  </p>
                </div>
                <div className="glass-card" style={{ padding: '25px', background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.04)' }}>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px', color: '#ffffff' }}>
                    <Sparkles size={16} style={{ color: '#cbd5e1' }} />
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
                <div className="glass-card" style={{ padding: '25px', background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.04)' }}>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px', color: '#ffffff' }}>
                    <Cpu size={16} style={{ color: '#22c55e' }} />
                    Parameter Efficient Tuning
                  </h4>
                  <p style={{ color: 'var(--muted-color)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                    Our model compiler leverages Low-Rank Adaptation (LoRA) and QLoRA strategies to scale training down to cost-efficient margins. Fine-tune parameters locally on Zyntral-managed GPU clusters.
                  </p>
                </div>
                <div className="glass-card" style={{ padding: '25px', background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.04)' }}>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px', color: '#ffffff' }}>
                    <HelpCircle size={16} style={{ color: '#cbd5e1' }} />
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
            <div style={{ animation: 'fade-in 0.4s ease', background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.04)' }} className="glass-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <div>
                  <h3 style={{ fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '10px', color: '#ffffff' }}>
                    <Users size={20} style={{ color: '#22c55e' }} />
                    Autonomous Agent Orchestrator
                  </h3>
                  <p style={{ color: 'var(--muted-color)', fontSize: '0.85rem', marginTop: '4px' }}>
                    Manage background agent nodes deployed across your logistics, audits, and support threads.
                  </p>
                </div>
                <span className="badge" style={{ background: 'rgba(34, 197, 94, 0.08)', color: '#4ade80', border: '1px solid rgba(34, 197, 94, 0.2)' }}>4 Nodes Deployed</span>
              </div>

              {/* Agent Grid */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
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
                      <span style={{ fontFamily: 'monospace', fontWeight: 600, fontSize: '0.9rem', color: '#22c55e' }}>{agent.uptime}</span>
                    </div>

                    <div style={{ justifySelf: 'end' }}>
                      <button 
                        onClick={() => toggleAgent(agent.id)}
                        style={{
                          padding: '6px 14px',
                          borderRadius: '20px',
                          border: '1px solid rgba(255,255,255,0.1)',
                          background: agent.status === 'active' ? 'rgba(34, 197, 94, 0.08)' : 'rgba(255,255,255,0.03)',
                          borderColor: agent.status === 'active' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255,255,255,0.1)',
                          color: agent.status === 'active' ? '#4ade80' : 'var(--muted-color)',
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
