import React from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { User, ShieldCheck } from 'lucide-react';
import { SEO } from '../../components/SEO';

interface FounderProfile {
  name: string;
  role: string;
  storyPara1: string;
  storyPara2: string;
  mission: string;
}

const DEFAULT_PROFILE: FounderProfile = {
  name: 'Sujal Talreja',
  role: 'Founder & Lead Architect at Zyntral AI.',
  storyPara1: 'Having built several custom AI pipelines for enterprise clients, Sujal saw firsthand the friction developers face when transitioning from local notebook prototypes to containerized, compliant runtime servers.',
  storyPara2: 'The manual coordination of API endpoints, index queries, and alignment dataset runs was a major bottleneck. Sujal founded Zyntral AI to compile these backend connections automatically, speeding up deployment from weeks to minutes.',
  mission: 'Our mission is to build robust, open-standard compilers and runtime nodes. We focus on optimizing edge GPU scheduling, parameter efficient tuning configurations (LoRA, DPO), and consensus-based state protocols to deliver high-speed, secure AI operations.'
};

export const Founder: React.FC = () => {
  const dbProfile = useQuery(api.about.getFounder);
  const profile = dbProfile || DEFAULT_PROFILE;

  const nameParts = profile.name.split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', position: 'relative' }}>
      <SEO
        title="Founder Story - Sujal Talreja"
        description="Learn more about Sujal Talreja, Founder & Lead Architect of Zyntral AI, and his work building on-prompt RAG compilers and autonomous agent pipelines."
        path="/about/founder"
        keywords={['Sujal talreja', 'Sujal k talreja', 'Sujal kishore kumar talreja', 'Sujal zyntral', 'Talreja', 'Zyntral AI Founder']}
      />
      <div className="container" style={{ position: 'relative', zIndex: 5, marginBottom: '80px', maxWidth: '800px' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '45px', textAlign: 'center' }}>
          <span className="badge badge-cyan" style={{ marginBottom: '10px' }}>Founder Story</span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '15px' }}>
            {firstName} {lastName && <span className="gradient-text">{lastName}</span>}
          </h1>
          <p style={{ color: 'var(--muted-color)', fontSize: '1.05rem', lineHeight: '1.8' }}>
            {profile.role}
          </p>
        </div>

        {/* Founder Story */}
        <div className="glass-card" style={{ padding: '35px', marginBottom: '30px', background: 'rgba(5, 5, 12, 0.45)' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <User size={18} />
            Founder Story
          </h3>
          <p style={{ color: 'var(--muted-color)', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '15px' }}>
            {profile.storyPara1}
          </p>
          <p style={{ color: 'var(--muted-color)', fontSize: '0.95rem', lineHeight: '1.7' }}>
            {profile.storyPara2}
          </p>
        </div>

        {/* Technical Mission */}
        <div className="glass-card" style={{ padding: '35px', background: 'rgba(5, 5, 12, 0.45)' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={18} style={{ color: 'var(--green)' }} />
            Technical Mission
          </h3>
          <p style={{ color: 'var(--muted-color)', fontSize: '0.95rem', lineHeight: '1.7' }}>
            {profile.mission}
          </p>
        </div>

      </div>
    </div>
  );
};

export default Founder;
