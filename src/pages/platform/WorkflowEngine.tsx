import React from 'react';
import { InteractiveTrainer } from '../../components/InteractiveTrainer';
import { SEO } from '../../components/SEO';
import { Cpu, HelpCircle, GitFork } from 'lucide-react';

export const WorkflowEngine: React.FC = () => {
  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', position: 'relative' }}>
      <SEO
        title="Workflow Engine - Multi-Agent Orchestration"
        description="Configure and automate advanced fine-tuning training loops. Connect dataset revisions, LoRA/QLoRA tuning configurations, and preference alignments."
        path="/platform/workflow-engine"
        keywords={['Workflow engine', 'agent workflows', 'model alignment', 'fine-tuning pipelines']}
      />
      <div className="container" style={{ position: 'relative', zIndex: 5, marginBottom: '80px' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '45px', textAlign: 'center' }}>
          <span className="badge badge-purple" style={{ marginBottom: '10px' }}>Alignment & Training</span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '15px' }}>
            Workflow <span className="gradient-text">Engine</span>
          </h1>
          <p style={{ color: 'var(--muted-color)', maxWidth: '750px', margin: '0 auto', fontSize: '1.05rem', lineHeight: '1.8' }}>
            Configure and run advanced alignment training flows. Automate supervised fine-tuning loops and align target models with custom preference metrics.
          </p>
        </div>

        {/* Interactive Trainer */}
        <div style={{ animation: 'fade-in 0.4s ease', marginBottom: '40px' }}>
          <InteractiveTrainer />
        </div>

        {/* Technical Details Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginBottom: '40px' }}>
          <div className="glass-card" style={{ padding: '25px' }}>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Cpu size={18} style={{ color: '#fff' }} />
              Parameter Efficient Tuning
            </h4>
            <p style={{ color: 'var(--muted-color)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Our model compiler leverages Low-Rank Adaptation (LoRA) and QLoRA strategies to scale training down to cost-efficient margins. Fine-tune parameters locally on Zyntral-managed GPU clusters.
            </p>
          </div>
          
          <div className="glass-card" style={{ padding: '25px' }}>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <HelpCircle size={18} style={{ color: '#fff' }} />
              Reinforcement Alignments
            </h4>
            <p style={{ color: 'var(--muted-color)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Quickly configure RLHF parameters or directly load preference data (DPO/KTO) through prompt directions to optimize model tone, format adherence, and compliance constraints.
            </p>
          </div>
        </div>

        {/* Workflow Pipelines Status */}
        <div className="glass-card" style={{ padding: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
            <GitFork size={20} style={{ color: 'var(--muted-color)' }} />
            <h3 style={{ fontSize: '1.2rem' }}>Automated Alignment Pipelines</h3>
          </div>
          <p style={{ color: 'var(--muted-color)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '20px' }}>
            Zyntral workflows integrate with git-based dataset revisions. Automatically trigger custom fine-tuning pipelines when new gold-standard prompt evaluations are committed to target branches.
          </p>
          <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '10px', padding: '15px', display: 'inline-flex', gap: '20px', fontSize: '0.8rem', fontFamily: 'monospace' }}>
            <div>
              <span style={{ color: 'var(--muted-color)' }}>ACTIVE PIPELINE:</span> <span style={{ color: '#fff', fontWeight: 600 }}>dpo-alignment-prod</span>
            </div>
            <div>
              <span style={{ color: 'var(--muted-color)' }}>TRIGGER:</span> <span style={{ color: '#fff', fontWeight: 600 }}>main-dataset-update</span>
            </div>
            <div>
              <span style={{ color: 'var(--muted-color)' }}>STATUS:</span> <span style={{ color: 'var(--green)', fontWeight: 600 }}>IDLE (IDLE_SUCCESS)</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default WorkflowEngine;
