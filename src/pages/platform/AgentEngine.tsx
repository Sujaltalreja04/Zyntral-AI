import React, { useState } from 'react';
import { Users, Server, Plus } from 'lucide-react';

interface AgentNode {
  id: number;
  name: string;
  status: 'active' | 'idle';
  tasks: number;
  avgLatency: string;
  uptime: string;
}

export const AgentEngine: React.FC = () => {
  const [agents, setAgents] = useState<AgentNode[]>([
    { id: 1, name: 'Logistics Routing Coordinator', status: 'active', tasks: 1420, avgLatency: '42ms', uptime: '99.98%' },
    { id: 2, name: 'Supply Chain Procurement Agent', status: 'active', tasks: 894, avgLatency: '110ms', uptime: '99.91%' },
    { id: 3, name: 'Warehouse Stock Level Audit Bot', status: 'idle', tasks: 512, avgLatency: '85ms', uptime: '100.00%' },
    { id: 4, name: 'Enterprise Contract Compliance Auditor', status: 'active', tasks: 231, avgLatency: '350ms', uptime: '99.5%' }
  ]);

  const [newAgentName, setNewAgentName] = useState('');
  const [newAgentLatency, setNewAgentLatency] = useState('60ms');

  const toggleAgent = (id: number) => {
    setAgents(prev => prev.map(a => {
      if (a.id === id) {
        return { ...a, status: a.status === 'active' ? 'idle' : 'active' };
      }
      return a;
    }));
  };

  const handleAddAgent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAgentName.trim()) return;

    const newAgent: AgentNode = {
      id: Date.now(),
      name: newAgentName,
      status: 'active',
      tasks: 0,
      avgLatency: newAgentLatency,
      uptime: '100.00%'
    };

    setAgents(prev => [...prev, newAgent]);
    setNewAgentName('');
  };

  const activeCount = agents.filter(a => a.status === 'active').length;

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', position: 'relative' }}>
      <div className="container" style={{ position: 'relative', zIndex: 5, marginBottom: '80px' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '45px', textAlign: 'center' }}>
          <span className="badge badge-green" style={{ marginBottom: '10px' }}>Runtime Module</span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '15px' }}>
            Agent <span className="gradient-text">Engine</span>
          </h1>
          <p style={{ color: 'var(--muted-color)', maxWidth: '750px', margin: '0 auto', fontSize: '1.05rem', lineHeight: '1.8' }}>
            Provision and orchestrate autonomous AI agents. Configure multi-agent clusters, monitor active processing threads, and handle live operational loops.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px', alignItems: 'start' }}>
          
          {/* Agent Orchestrator Container */}
          <div className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '15px' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Users size={22} style={{ color: 'var(--green)' }} />
                  Autonomous Agent Orchestrator
                </h3>
                <p style={{ color: 'var(--muted-color)', fontSize: '0.85rem', marginTop: '4px' }}>
                  Manage and monitor background agent nodes deployed across your environments.
                </p>
              </div>
              <span className="badge badge-green">{activeCount} of {agents.length} Nodes Active</span>
            </div>

            {/* Agent List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {agents.map(agent => (
                <div 
                  key={agent.id} 
                  style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '2.2fr 1fr 1fr 1fr 1fr', 
                    alignItems: 'center',
                    background: 'rgba(0,0,0,0.3)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    padding: '18px 25px',
                    borderRadius: '12px',
                    gap: '15px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div>
                    <span style={{ fontWeight: 600, color: '#fff', fontSize: '0.95rem', display: 'block' }}>{agent.name}</span>
                    <span style={{ fontSize: '0.75rem', color: agent.status === 'active' ? 'var(--green)' : 'var(--muted-color)', display: 'flex', alignItems: 'center', gap: '5px', marginTop: '3px' }}>
                      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: agent.status === 'active' ? 'var(--green)' : '#6b7280', display: 'inline-block' }}></span>
                      {agent.status === 'active' ? 'Operational' : 'Paused / Standby'}
                    </span>
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
                    <span style={{ fontFamily: 'monospace', fontWeight: 600, fontSize: '0.9rem', color: agent.status === 'active' ? 'var(--green)' : 'var(--muted-color)' }}>{agent.uptime}</span>
                  </div>

                  <div style={{ justifySelf: 'end' }}>
                    <button 
                      onClick={() => toggleAgent(agent.id)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '20px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        background: agent.status === 'active' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(255,255,255,0.03)',
                        borderColor: agent.status === 'active' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(255,255,255,0.08)',
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

          {/* Provisioning Panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Deploy New Agent */}
            <div className="glass-card" style={{ padding: '25px' }}>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Plus size={18} style={{ color: '#fff' }} />
                Deploy Node
              </h4>
              <form onSubmit={handleAddAgent} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div className="input-group" style={{ marginBottom: 0 }}>
                  <label className="input-label" style={{ fontSize: '0.75rem' }}>Agent Identifier</label>
                  <input
                    type="text"
                    required
                    value={newAgentName}
                    onChange={(e) => setNewAgentName(e.target.value)}
                    className="input-field"
                    placeholder="e.g. Audit Coordinator Bot"
                    style={{ padding: '10px 14px', fontSize: '0.85rem' }}
                  />
                </div>
                <div className="input-group" style={{ marginBottom: 0 }}>
                  <label className="input-label" style={{ fontSize: '0.75rem' }}>Target Base Latency</label>
                  <select
                    value={newAgentLatency}
                    onChange={(e) => setNewAgentLatency(e.target.value)}
                    className="input-field"
                    style={{ padding: '10px 14px', fontSize: '0.85rem', background: 'rgba(0, 0, 0, 0.4)' }}
                  >
                    <option value="25ms">Ultra-Fast (25ms)</option>
                    <option value="60ms">Balanced (60ms)</option>
                    <option value="120ms">Robust (120ms)</option>
                    <option value="450ms">Deep Reasoning (450ms)</option>
                  </select>
                </div>
                <button type="submit" className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.85rem', justifyContent: 'center' }}>
                  Initialize Node
                </button>
              </form>
            </div>

            {/* Clusters Status */}
            <div className="glass-card" style={{ padding: '25px' }}>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Server size={18} style={{ color: 'var(--muted-color)' }} />
                Cluster Infrastructure
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem' }}>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted-color)' }}>GPU Cluster Status:</span>
                  <span style={{ fontWeight: 600, color: 'var(--green)' }}>Healthy [99.98%]</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted-color)' }}>Total Provisioned Memory:</span>
                  <span style={{ fontWeight: 600, fontFamily: 'monospace' }}>512GB VRAM</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted-color)' }}>Global Queue Latency:</span>
                  <span style={{ fontWeight: 600, fontFamily: 'monospace' }}>12ms</span>
                </li>
              </ul>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
};

export default AgentEngine;
