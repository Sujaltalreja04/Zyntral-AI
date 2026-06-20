import React from 'react';
import { Network } from 'lucide-react';

export const ArchitectureDiagram: React.FC = () => {
  return (
    <div className="glass-card" style={{ padding: '40px', marginBottom: '50px', background: 'rgba(5, 5, 12, 0.65)' }}>
      <h3 style={{ fontSize: '1.2rem', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Network size={20} />
        System Compilation & Execution Path
      </h3>
      
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <svg viewBox="0 0 800 240" fill="none" style={{ minWidth: '600px', width: '100%', height: 'auto' }}>
          {/* Definitions for Glow Filters */}
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Path Flow Lines */}
          {/* Path 1: Prompt Input -> Zyntral Compiler */}
          <path d="M 170 120 L 290 120" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
          <path d="M 170 120 L 290 120" stroke="#fff" strokeWidth="2" strokeDasharray="8 8" className="flow-dash-fast" />

          {/* Path 2: Zyntral Compiler -> DB Index */}
          <path d="M 430 120 L 480 120 M 480 120 L 480 60 L 530 60" stroke="rgba(255,255,255,0.15)" strokeWidth="2" fill="none" />
          <path d="M 430 120 L 480 120 M 480 120 L 480 60 L 530 60" stroke="#60a5fa" strokeWidth="2" strokeDasharray="8 8" className="flow-dash-fast" fill="none" />

          {/* Path 3: Zyntral Compiler -> LoRA Weights */}
          <path d="M 430 120 L 480 120 M 480 120 L 480 180 L 530 180" stroke="rgba(255,255,255,0.15)" strokeWidth="2" fill="none" />
          <path d="M 430 120 L 480 120 M 480 120 L 480 180 L 530 180" stroke="#f472b6" strokeWidth="2" strokeDasharray="8 8" className="flow-dash-fast" fill="none" />

          {/* Path 4: DB Index & LoRA -> Edge GPU Deployed Nodes */}
          <path d="M 650 60 L 680 60 M 680 60 L 680 120 L 700 120" stroke="rgba(255,255,255,0.15)" strokeWidth="2" fill="none" />
          <path d="M 650 180 L 680 180 M 680 180 L 680 120 L 700 120" stroke="rgba(255,255,255,0.15)" strokeWidth="2" fill="none" />
          <path d="M 650 60 L 680 60 M 680 60 L 680 120 L 700 120" stroke="var(--green)" strokeWidth="2" strokeDasharray="8 8" className="flow-dash-fast" fill="none" />
          <path d="M 650 180 L 680 180 M 680 180 L 680 120 L 700 120" stroke="var(--green)" strokeWidth="2" strokeDasharray="8 8" className="flow-dash-fast" fill="none" />

          {/* Node 1: Prompt Input */}
          <rect x="20" y="80" width="150" height="80" rx="10" fill="rgba(15,15,25,0.85)" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
          <text x="35" y="115" fill="#fff" fontSize="13" fontFamily="monospace" fontWeight="600">Developer</text>
          <text x="35" y="135" fill="var(--muted-color)" fontSize="11" fontFamily="monospace">Prompt Directives</text>

          {/* Node 2: Zyntral Compiler */}
          <rect x="290" y="80" width="140" height="80" rx="10" fill="rgba(15,15,25,0.85)" stroke="rgba(255,255,255,0.2)" strokeWidth="2" filter="url(#glow)" />
          <text x="315" y="115" fill="#fff" fontSize="13" fontFamily="monospace" fontWeight="600">Zyntral</text>
          <text x="315" y="135" fill="var(--muted-color)" fontSize="11" fontFamily="monospace">Core Compiler</text>

          {/* Node 3: DB Connectors */}
          <rect x="530" y="30" width="120" height="60" rx="8" fill="rgba(15,15,25,0.85)" stroke="rgba(96,165,250,0.3)" strokeWidth="1.5" />
          <text x="545" y="55" fill="#60a5fa" fontSize="11" fontFamily="monospace" fontWeight="600">DB Connectors</text>
          <text x="545" y="70" fill="var(--muted-color)" fontSize="9" fontFamily="monospace">Pinecone, pgvector</text>

          {/* Node 4: LoRA Alignment Weights */}
          <rect x="530" y="150" width="120" height="60" rx="8" fill="rgba(15,15,25,0.85)" stroke="rgba(244,114,182,0.3)" strokeWidth="1.5" />
          <text x="545" y="175" fill="#f472b6" fontSize="11" fontFamily="monospace" fontWeight="600">LoRA Weights</text>
          <text x="545" y="190" fill="var(--muted-color)" fontSize="9" fontFamily="monospace">DPO Alignment</text>

          {/* Node 5: Edge Node Deployed */}
          <rect x="700" y="90" width="80" height="60" rx="8" fill="rgba(15,15,25,0.85)" stroke="rgba(16,185,129,0.3)" strokeWidth="1.5" />
          <text x="715" y="115" fill="var(--green)" fontSize="11" fontFamily="monospace" fontWeight="600">Edge GPU</text>
          <text x="715" y="130" fill="var(--muted-color)" fontSize="9" fontFamily="monospace">Runtime Node</text>
        </svg>
      </div>

      <style>{`
        .flow-dash-fast {
          animation: stroke-move 1s linear infinite;
        }
        @keyframes stroke-move {
          to { stroke-dashoffset: -16; }
        }
      `}</style>
    </div>
  );
};

export default ArchitectureDiagram;
