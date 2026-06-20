import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { BookOpen, Calendar, User, ArrowLeft } from 'lucide-react';
import { RESEARCH_ARTICLES } from '../../data/researchData';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';

export const ResearchPaperDynamic: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const dbArticle = useQuery(api.research.getBySlug, slug ? { slug } : "skip");
  const loading = dbArticle === undefined;

  let article: {
    category: string;
    title: string;
    desc: string;
    date: string;
    path: string;
    content?: string;
  } | null | undefined = dbArticle;
  if (!loading && !dbArticle && slug) {
    // Search fallback static data
    article = RESEARCH_ARTICLES.find(a => a.path.replace('/research/', '') === slug) || null;
  }

  if (loading) {
    return (
      <div className="page-container-padding" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: 'var(--muted-color)', fontSize: '1rem', fontFamily: 'monospace' }}>Loading paper logs...</span>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="page-container-padding" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div className="glass-card" style={{ maxWidth: '450px', padding: '40px' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '15px' }}>Paper Not Found</h2>
          <p style={{ color: 'var(--muted-color)', fontSize: '0.95rem', marginBottom: '25px', lineHeight: '1.6' }}>
            The requested technical report could not be compiled or located in the system databases.
          </p>
          <Link to="/research" className="btn-primary" style={{ padding: '10px 24px', fontSize: '0.85rem' }}>
            <ArrowLeft size={14} /> Back to Research Home
          </Link>
        </div>
      </div>
    );
  }

  // Split content into paragraphs for clean rendering
  const paragraphs = (article.content || article.desc || '')
    .split('\n\n')
    .filter((p: string) => p.trim().length > 0);

  return (
    <div className="page-container-padding">
      <div className="container" style={{ position: 'relative', zIndex: 5, marginBottom: '80px', maxWidth: '800px' }}>
        
        {/* Navigation Breadcrumb */}
        <div style={{ marginBottom: '30px', fontSize: '0.85rem' }}>
          <Link to="/research" style={{ color: 'var(--muted-color)', textDecoration: 'none' }}>Research</Link>
          <span style={{ color: 'var(--muted-color)', margin: '0 10px' }}>/</span>
          <span style={{ color: '#fff' }}>{article.category}</span>
        </div>

        {/* Paper Header */}
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '20px', lineHeight: '1.25' }}>
          {article.title}
        </h1>

        {/* Metadata */}
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '40px', paddingBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.08)', fontSize: '0.9rem', color: 'var(--muted-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Calendar size={16} />
            <span>{article.date}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <User size={16} />
            <span>Zyntral Research Labs</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <BookOpen size={16} />
            <span>Technical Report (compiled)</span>
          </div>
        </div>

        {/* Abstract Box */}
        <div className="glass-card" style={{ padding: '35px', marginBottom: '40px', background: 'rgba(5, 5, 12, 0.4)' }}>
          <h3 style={{ fontSize: '1.15rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px', color: '#fff' }}>Abstract</h3>
          <p style={{ color: 'var(--fg-color)', fontSize: '0.95rem', lineHeight: '1.8', fontStyle: 'italic', fontWeight: 300 }}>
            "{article.desc}"
          </p>
        </div>

        {/* Technical Outline & Content paragraphs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          {paragraphs.map((p: string, idx: number) => (
            <p key={idx} style={{ color: 'var(--muted-color)', fontSize: '1rem', lineHeight: '1.8' }}>
              {p}
            </p>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ResearchPaperDynamic;
