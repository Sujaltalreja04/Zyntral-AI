import React from 'react';
import * as LucideIcons from 'lucide-react';
import { ROADMAP_STEPS } from '../data/roadmapData';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { SEO } from '../components/SEO';

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
    <div style={{
      backgroundColor: '#020204',
      backgroundImage: "radial-gradient(circle at 50% 0%, rgba(34, 197, 94, 0.08) 0%, rgba(2, 2, 4, 0.98) 70%)",
      minHeight: '100vh',
      paddingTop: '110px',
      paddingBottom: '40px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative'
    }}>
      <SEO
        title="Product Roadmap & Launch Timeline"
        description="Follow the Zyntral AI compiler and edge node development phases, release updates, and planned launch milestones."
        path="/roadmap"
        keywords={['Zyntral roadmap', 'AI roadmap', 'release timeline', 'product phases']}
      />
      
      {/* Floating Roadmap Container */}
      <div className="roadmap-container" style={{
        width: '94%',
        maxWidth: '850px',
        background: 'rgba(15, 15, 15, 0.7)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '24px',
        boxShadow: '0 30px 100px rgba(0, 0, 0, 0.75)',
        color: '#f8fafc',
        fontFamily: "'Inter', sans-serif"
      }}>
        
        {/* Header */}
        <div className="section-header" style={{ marginBottom: '40px', textAlign: 'center' }}>
          <span className="badge badge-cyan" style={{ marginBottom: '10px', background: 'rgba(255,255,255,0.04)', color: '#8a99ad', border: '1px solid rgba(255,255,255,0.08)' }}>Launch Timeline</span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '15px', color: '#ffffff' }}>
            Zyntral <span style={{ background: 'linear-gradient(135deg, #ffffff 0%, #3b82f6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Roadmap</span>
          </h1>
          <p style={{ color: '#8a99ad', fontSize: '1.05rem', lineHeight: '1.7', maxWidth: '650px', margin: '0 auto' }}>
            Follow our development milestones as we transition from research prototypes to a globally distributed compute marketplace.
          </p>
        </div>

        {/* Timeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '35px', position: 'relative', paddingLeft: '24px' }}>
          {/* Vertical line indicator */}
          <div style={{ position: 'absolute', left: '0', top: '10px', bottom: '10px', width: '2px', background: 'linear-gradient(to bottom, #10b981 30%, #3b82f6 50%, #8b5cf6 70%, #cbd5e1 100%)' }}></div>

          {steps.map((step, idx) => {
            const Icon = getIcon(step);
            return (
              <div key={idx} className="glass-card" style={{ padding: '24px', background: 'rgba(255, 255, 255, 0.015)', border: '1px solid rgba(255, 255, 255, 0.05)', transform: 'none', boxShadow: 'none', position: 'relative', borderRadius: '12px' }}>
                {/* Timeline dot connector */}
                <div style={{
                  position: 'absolute',
                  left: '-30px',
                  top: '32px',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: step.statusColor,
                  border: '2px solid #020204'
                }}></div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div className="card-icon-wrapper" style={{ color: step.statusColor, background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)', width: '40px', height: '40px', borderRadius: '8px' }}>
                      <Icon size={16} />
                    </div>
                    <h3 style={{ fontSize: '1.15rem', color: '#ffffff', fontWeight: 700 }}>{step.phase}</h3>
                  </div>
                  <span className="badge" style={{ background: 'rgba(255, 255, 255, 0.04)', color: step.statusColor, border: `1px solid ${step.statusColor}25`, fontSize: '0.7rem', textTransform: 'uppercase' }}>
                    {step.status}
                  </span>
                </div>
                
                <p style={{ color: '#cbd5e1', fontSize: '0.88rem', lineHeight: '1.7', paddingLeft: '2px' }}>
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>

      <style>{`
        .roadmap-container {
          padding: 50px 40px;
        }

        @media (max-width: 768px) {
          .roadmap-container {
            padding: 30px 16px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Roadmap;
