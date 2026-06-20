import { Award, Compass, Cpu, ShieldAlert, Globe } from 'lucide-react';
import React from 'react';

export interface RoadmapStep {
  phase: string;
  status: string;
  statusColor: string;
  badgeBg: string;
  desc: string;
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
}

export const ROADMAP_STEPS: RoadmapStep[] = [
  {
    phase: 'Phase 1: Research Phase',
    status: 'Completed',
    statusColor: 'var(--green)',
    badgeBg: 'rgba(16, 185, 129, 0.12)',
    desc: 'Completed initial studies on peer-to-peer agent consensus and synthetic preference generation. Outlined dynamic vector index routing.',
    icon: Award
  },
  {
    phase: 'Phase 2: Architecture Phase',
    status: 'Completed',
    statusColor: 'var(--green)',
    badgeBg: 'rgba(16, 185, 129, 0.12)',
    desc: 'Designed core prompt-to-RAG compiler pipelines, edge node clustering protocols, and container isolation parameters.',
    icon: Compass
  },
  {
    phase: 'Phase 3: Prototype Phase',
    status: 'In Progress',
    statusColor: '#60a5fa',
    badgeBg: 'rgba(59, 130, 246, 0.12)',
    desc: 'Developing sandbox compiler environments and deploying mock multi-agent orchestrator grids. Enabling public Pinecone/Chroma connections.',
    icon: Cpu
  },
  {
    phase: 'Phase 4: Private Beta',
    status: 'Upcoming',
    statusColor: '#a855f7',
    badgeBg: 'rgba(168, 85, 247, 0.12)',
    desc: 'Provisioning early developer keys to waitlist applicants. Commencing high-throughput load tests on local GPU edge server nodes.',
    icon: ShieldAlert
  },
  {
    phase: 'Phase 5: Public Launch',
    status: 'Future / Launching 2027',
    statusColor: 'var(--muted-color)',
    badgeBg: 'rgba(255, 255, 255, 0.05)',
    desc: 'Opening the Zyntral decentralized GPU compute marketplace, hosting regional agent workflows and custom LoRA fine-tunes globally.',
    icon: Globe
  }
];
