import React, { useState } from 'react';
import { Server, Activity, ShieldCheck, RefreshCw } from 'lucide-react';

export const DeploymentEngine: React.FC = () => {
  const [deploying, setDeploying] = useState(false);
  const [activeTab, setActiveTab] = useState<'us' | 'eu' | 'ap'>('us');

  const triggerDeploy = () => {
    setDeploying(true);
    setTimeout(() => {
      setDeploying(false);
    }, 2000);
  };

  const regions = {
    us: { name: 'US-East (Virginia)', ping: '12ms', load: '42%', nodes: '12 active' },
    eu: { name: 'EU-West (Frankfurt)', ping: '38ms', load: '28%', nodes: '8 active' },
    ap: { name: 'AP-East (Hong Kong)', ping: '74ms', load: '14%', nodes: '6 active' }
  };

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', position: 'relative' }}>
      <div className="container" style={{ position: 'relative', zIndex: 5, marginBottom: '80px' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '45px', textAlign: 'center' }}>
          <span className="badge badge-cyan" style={{ marginBottom: '10px' }}>Global Deployment</span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '15px' }}>
            Deployment <span className="gradient-text">Engine</span>
          </h1>
          <p style={{ color: 'var(--muted-color)', maxWidth: '750px', margin: '0 auto', fontSize: '1.05rem', lineHeight: '1.8' }}>
            Coordinate decentralized agent clusters across low-latency node networks. Package prompts, vector compilations, and model fine-tunes into simple secure deployments.
          </p>
        </div>

        {/* Dashboard grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr', gap: '30px', alignItems: 'start' }}>
          
          {/* Main Console */}
          <div className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Server size={22} style={{ color: 'var(--fg-color)' }} />
                  Global Cluster Management
                </h3>
                <p style={{ color: 'var(--muted-color)', fontSize: '0.85rem', marginTop: '4px' }}>
                  Monitor latency profiles and compute configurations in real-time.
                </p>
              </div>
              <button 
                onClick={triggerDeploy}
                disabled={deploying}
                className="btn-primary" 
                style={{ padding: '8px 18px', fontSize: '0.85rem', opacity: deploying ? 0.7 : 1 }}
              >
                <RefreshCw size={14} className={deploying ? 'spin-anim' : ''} />
                {deploying ? 'Deploying...' : 'Redeploy Fleet'}
              </button>
            </div>

            {/* Region Tabs */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '15px' }}>
              {(Object.keys(regions) as Array<keyof typeof regions>).map(r => (
                <button
                  key={r}
                  onClick={() => setActiveTab(r)}
                  style={{
                    background: activeTab === r ? 'rgba(255,255,255,0.06)' : 'transparent',
                    border: activeTab === r ? '1px solid rgba(255,255,255,0.15)' : '1px solid transparent',
                    color: activeTab === r ? '#fff' : 'var(--muted-color)',
                    padding: '8px 16px',
                    borderRadius: '10px',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {r.toUpperCase()} Cluster
                </button>
              ))}
            </div>

            {/* Region Detail */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.04)' }}>
              <div>
                <span style={{ color: 'var(--muted-color)', fontSize: '0.8rem' }}>Active Region Location</span>
                <p style={{ color: '#fff', fontSize: '1rem', fontWeight: 600, marginTop: '4px' }}>{regions[activeTab].name}</p>
              </div>
              <div>
                <span style={{ color: 'var(--muted-color)', fontSize: '0.8rem' }}>Compute Workload Capacity</span>
                <p style={{ color: '#fff', fontSize: '1rem', fontWeight: 600, marginTop: '4px' }}>{regions[activeTab].load}</p>
              </div>
              <div>
                <span style={{ color: 'var(--muted-color)', fontSize: '0.8rem' }}>Average Ping Roundtrip</span>
                <p style={{ color: 'var(--green)', fontSize: '1rem', fontWeight: 600, marginTop: '4px', fontFamily: 'monospace' }}>{regions[activeTab].ping}</p>
              </div>
              <div>
                <span style={{ color: 'var(--muted-color)', fontSize: '0.8rem' }}>Provisioned Sub-Nodes</span>
                <p style={{ color: '#fff', fontSize: '1rem', fontWeight: 600, marginTop: '4px', fontFamily: 'monospace' }}>{regions[activeTab].nodes}</p>
              </div>
            </div>
          </div>

          {/* Quick config specs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Health Shield */}
            <div className="glass-card" style={{ padding: '25px', display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
              <ShieldCheck size={26} style={{ color: 'var(--green)', flexShrink: 0 }} />
              <div>
                <h4 style={{ fontSize: '1.05rem', marginBottom: '5px' }}>Zyntral Shield Enabled</h4>
                <p style={{ color: 'var(--muted-color)', fontSize: '0.85rem', lineHeight: '1.5' }}>
                  All deployed nodes are secured with isolated execution environments and audited network pathways.
                </p>
              </div>
            </div>

            {/* Spec details */}
            <div className="glass-card" style={{ padding: '25px' }}>
              <h4 style={{ fontSize: '1.05rem', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Activity size={16} /> Runtime Diagnostics
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem' }}>
                <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '8px' }}>
                  <span style={{ color: 'var(--muted-color)' }}>Framework Version:</span>
                  <span style={{ color: '#fff', fontWeight: 600, fontFamily: 'monospace' }}>v0.9.1-beta</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '8px' }}>
                  <span style={{ color: 'var(--muted-color)' }}>System Uptime:</span>
                  <span style={{ color: 'var(--green)', fontWeight: 600, fontFamily: 'monospace' }}>99.985%</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted-color)' }}>Active SDK Keys:</span>
                  <span style={{ color: '#fff', fontWeight: 600, fontFamily: 'monospace' }}>3 Keys</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

      </div>
      
      <style>{`
        .spin-anim {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default DeploymentEngine;
