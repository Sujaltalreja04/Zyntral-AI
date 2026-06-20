import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Cpu, Users, Database, ArrowRight, Layers } from 'lucide-react';
import { ArchitectureDiagram } from '../../components/ArchitectureDiagram';
import { SEO } from '../../components/SEO';

export const Overview: React.FC = () => {
  const engines = [
    {
      title: 'Agent Engine',
      desc: 'Orchestrate autonomous agent networks, monitor background logs, and configure tasks.',
      path: '/platform/agent-engine',
      icon: Users,
      badge: '4 Deployed',
      textColor: 'var(--green)'
    },
    {
      title: 'Knowledge Engine',
      desc: 'Design and compile prompt-to-RAG architectures with instant vector DB connections.',
      path: '/platform/knowledge-engine',
      icon: Database,
      badge: 'Active compilers',
      textColor: '#60a5fa'
    },
    {
      title: 'Workflow Engine',
      desc: 'Configure alignment training loops (LoRA, DPO, RLHF) and custom data flows.',
      path: '/platform/workflow-engine',
      icon: Cpu,
      badge: 'Fine-tuning ready',
      textColor: '#f472b6'
    },
    {
      title: 'Deployment Engine',
      desc: 'Deploy pre-built operational model nodes to GPU clusters and track latencies.',
      path: '/platform/deployment-engine',
      icon: Sparkles,
      badge: 'v0.9.1 Sandbox',
      textColor: '#e5e7eb'
    }
  ];

  return (
    <div className="page-container-padding">
      <SEO
        title="Platform Overview - Developer Console"
        description="Explore the Zyntral AI platform overview detailing the architecture diagram, Agent Engine, Knowledge Engine, Workflow Engine, and Deployment Engine."
        path="/platform/overview"
        keywords={['Developer platform', 'AI architecture', 'RAG compiler', 'agent console']}
      />
      <div className="container" style={{ position: 'relative', zIndex: 5, marginBottom: '80px' }}>
        
        {/* Header */}
        <div className="section-header">
          <span className="badge badge-cyan" style={{ marginBottom: '10px' }}>Technical Architecture</span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '15px' }}>
            Zyntral <span className="gradient-text">Developer Platform</span>
          </h1>
          <p style={{ color: 'var(--muted-color)', maxWidth: '700px', margin: '0 auto', fontSize: '1.05rem', lineHeight: '1.8' }}>
            A unified execution model converting prompt directives into database integrations, custom model weights, and containerized runtime orchestrations.
          </p>
        </div>

        {/* Decomposed SVG Diagram */}
        <ArchitectureDiagram />

        {/* Engine Summaries */}
        <div className="grid-pillars" style={{ marginBottom: '60px' }}>
          {engines.map((engine, idx) => {
            const Icon = engine.icon;
            return (
              <div key={idx} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '260px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                    <div className="card-icon-wrapper" style={{ color: engine.textColor }}>
                      <Icon size={22} />
                    </div>
                    <span className="badge" style={{ background: 'rgba(255, 255, 255, 0.04)', color: engine.textColor, border: `1px solid rgba(255,255,255,0.08)`, fontSize: '0.7rem' }}>
                      {engine.badge}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '12px' }}>{engine.title}</h3>
                  <p style={{ color: 'var(--muted-color)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '20px' }}>
                    {engine.desc}
                  </p>
                </div>
                <Link to={engine.path} className="btn-secondary" style={{ padding: '8px 18px', fontSize: '0.85rem', width: 'fit-content', border: '1px solid rgba(255,255,255,0.08)' }}>
                  Launch Simulator <ArrowRight size={14} style={{ marginLeft: '4px' }} />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Future Capabilities */}
        <div className="glass-card" style={{ padding: '40px', background: 'rgba(5, 5, 12, 0.65)' }}>
          <div className="grid-halves">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px' }}>
                <Layers size={16} />
                <span style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--muted-color)' }}>Future Capability</span>
              </div>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '15px' }}>Decentralized Node Networks</h2>
              <p style={{ color: 'var(--muted-color)', fontSize: '0.95rem', lineHeight: '1.7' }}>
                We are developing direct hardware configurations that allow developers to connect local workstations or dedicated server clusters directly to the Zyntral orchestration cloud. By sharing compute resources, teams can significantly reduce fine-tuning expenses.
              </p>
            </div>
            
            <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '15px', padding: '25px', fontFamily: 'monospace', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', gap: '6px', marginBottom: '15px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#6b7280' }}></span>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#9ca3af' }}></span>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#d1d5db' }}></span>
              </div>
              <p style={{ color: '#6b7280' }}>// Future CLI command specs</p>
              <p style={{ color: 'var(--fg-color)', marginTop: '5px' }}><span style={{ color: '#60a5fa' }}>$</span> zyntral join-network --node-id=z-301</p>
              <p style={{ color: 'var(--muted-color)', marginTop: '8px' }}>✓ Initializing secure node tunnel...</p>
              <p style={{ color: 'var(--muted-color)' }}>✓ Enrolled in global cluster routing index</p>
              <p style={{ color: 'var(--green)', marginTop: '12px' }}>🚀 NODE CONNECTED (Sharing 16GB VRAM)</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Overview;
