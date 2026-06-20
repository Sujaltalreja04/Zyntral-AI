import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, ArrowRight } from 'lucide-react';
import { RESEARCH_ARTICLES } from '../../data/researchData';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { SEO } from '../../components/SEO';

export const Overview: React.FC = () => {
  const dbArticles = useQuery(api.research.get);
  const articles = dbArticles && dbArticles.length > 0 ? dbArticles : RESEARCH_ARTICLES;

  return (
    <div className="page-container-padding">
      <SEO
        title="Research Publications & Tech Reports"
        description="Explore open-standard technical papers on multi-agent consensus, prompt-directed DPO, and on-prompt dynamic RAG compilation published by Zyntral Labs."
        path="/research"
        keywords={['AI Research', 'technical reports', 'RAG compile papers', 'agentic design']}
      />
      <div className="container" style={{ position: 'relative', zIndex: 5, marginBottom: '80px', maxWidth: '900px' }}>
        
        {/* Header */}
        <div className="section-header">
          <span className="badge badge-cyan" style={{ marginBottom: '10px' }}>Zyntral Research Labs</span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '15px' }}>
            Research <span className="gradient-text">Home</span>
          </h1>
          <p style={{ color: 'var(--muted-color)', fontSize: '1.05rem', lineHeight: '1.8' }}>
            Guiding the development of low-latency retrieval systems, autonomous agent topologies, and automated neural alignments.
          </p>
        </div>

        {/* Featured Card */}
        {articles.length > 0 && (
          <div className="glass-card" style={{ padding: '35px', marginBottom: '40px', background: 'rgba(5, 5, 12, 0.45)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px', fontSize: '0.8rem', color: 'var(--muted-color)' }}>
              <Calendar size={14} />
              <span>Latest Publication • {articles[0].date}</span>
            </div>
            <h2 style={{ fontSize: '1.6rem', marginBottom: '15px', color: '#fff' }}>
              {articles[0].title}
            </h2>
            <p style={{ color: 'var(--muted-color)', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '25px' }}>
              {articles[0].desc}
            </p>
            <Link to={articles[0].path} className="btn-primary" style={{ padding: '10px 22px', fontSize: '0.85rem' }}>
              Read Paper <ArrowRight size={14} />
            </Link>
          </div>
        )}

        {/* Directory List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {articles.slice(1).map((art: any, idx: number) => (
            <div key={idx} className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '0.8rem', color: 'var(--muted-color)' }}>
                  <span className="badge badge-purple" style={{ fontSize: '0.7rem' }}>{art.category}</span>
                  <span>•</span>
                  <span>{art.date}</span>
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: '#fff' }}>{art.title}</h3>
                <p style={{ color: 'var(--muted-color)', fontSize: '0.9rem', lineHeight: '1.6' }}>{art.desc}</p>
              </div>
              <Link to={art.path} className="btn-secondary" style={{ padding: '10px 20px', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
                View Logs <BookOpen size={14} style={{ marginLeft: '4px' }} />
              </Link>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Overview;
