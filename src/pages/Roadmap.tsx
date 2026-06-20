import React from 'react';
import * as LucideIcons from 'lucide-react';
import { ROADMAP_STEPS } from '../data/roadmapData';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

export const Roadmap: React.FC = () => {
  const dbSteps = useQuery(api.roadmap.get);
  const steps = dbSteps && dbSteps.length > 0 
    ? [...dbSteps].sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0))
    : ROADMAP_STEPS.map((s, i) => ({ ...s, orderIndex: i }));

  const getIcon = (step: any) => {
    if (typeof step.icon === 'string') {
      const Icon = (LucideIcons as any)[step.icon];
      return Icon || LucideIcons.HelpCircle;
    }
    return step.icon || LucideIcons.HelpCircle;
  };

  return (
    <div className="page-container-padding">
      <div className="container" style={{ position: 'relative', zIndex: 5, marginBottom: '80px', maxWidth: '750px' }}>
        
        {/* Header */}
        <div className="section-header">
          <span className="badge badge-cyan" style={{ marginBottom: '10px' }}>Launch Timeline</span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '15px' }}>
            Zyntral <span className="gradient-text">Roadmap</span>
          </h1>
          <p style={{ color: 'var(--muted-color)', fontSize: '1.05rem', lineHeight: '1.8' }}>
            Follow our development milestones as we transition from research prototypes to a globally distributed compute marketplace.
          </p>
        </div>

        {/* Timeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', position: 'relative', paddingLeft: '20px' }}>
          {/* Vertical line indicator */}
          <div style={{ position: 'absolute', left: '0', top: '10px', bottom: '10px', width: '2px', background: 'linear-gradient(to bottom, var(--green) 30%, #60a5fa 50%, #a855f7 70%, rgba(255,255,255,0.05))' }}></div>

          {steps.map((step, idx) => {
            const Icon = getIcon(step);
            return (
              <div key={idx} className="glass-card" style={{ padding: '30px', position: 'relative' }}>
                {/* Timeline dot connector */}
                <div style={{
                  position: 'absolute',
                  left: '-26px',
                  top: '40px',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: step.statusColor,
                  boxShadow: `0 0 10px ${step.statusColor}`,
                  border: '2px solid var(--bg-color)'
                }}></div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '15px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div className="card-icon-wrapper" style={{ color: step.statusColor }}>
                      <Icon size={18} />
                    </div>
                    <h3 style={{ fontSize: '1.25rem', color: '#fff' }}>{step.phase}</h3>
                  </div>
                  <span className="badge" style={{ background: step.badgeBg, color: step.statusColor, border: `1px solid ${step.statusColor}25`, fontSize: '0.7rem' }}>
                    {step.status}
                  </span>
                </div>
                <p style={{ color: 'var(--muted-color)', fontSize: '0.95rem', lineHeight: '1.7' }}>
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default Roadmap;
