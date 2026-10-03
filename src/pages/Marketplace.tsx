import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Star, Bot, Code, LineChart, MessageSquare, Zap, ChevronRight, 
  ShieldCheck, Database, HelpCircle, Sparkles, X, CheckCircle2, ArrowRight,
  Layers, SlidersHorizontal, Cpu, Clock
} from 'lucide-react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { SEO } from '../components/SEO';

const CATEGORIES = ['All', 'Engineering', 'Marketing', 'Customer Support', 'Analytics', 'Security'];

export const DEFAULT_AGENTS = [
  {
    _id: 'seed-1',
    name: 'AutoDev Pro',
    category: 'Engineering',
    description: 'Autonomous coding agent that builds entire full-stack applications, generates unit tests, and reviews pull requests from a single prompt.',
    rating: 4.9,
    reviews: 1250,
    price: '$49/mo',
    icon: 'Code',
    iconColor: '#22c55e',
    tags: ['React', 'Node.js', 'Python', 'TypeScript'],
    status: 'Active',
    model: 'Claude 3.5 Sonnet / Llama-3-70B',
    latency: '180ms avg response',
    tools: ['GitHub API', 'Docker Sandbox', 'ESLint', 'PostgreSQL'],
    capabilities: [
      'Multi-file architectural refactoring',
      'Automated unit & integration test generation',
      'Direct GitHub Pull Request reviews and commits',
      'Real-time runtime error tracing and self-repair'
    ]
  },
  {
    _id: 'seed-2',
    name: 'GrowthHacker AI',
    category: 'Marketing',
    description: 'Analyzes competitive landscapes, drafts high-converting campaigns, and automatically runs A/B tested ad copy across channels.',
    rating: 4.7,
    reviews: 843,
    price: '$29/mo',
    icon: 'LineChart',
    iconColor: '#10b981',
    tags: ['SEO', 'Ads', 'Analytics', 'Copywriting'],
    status: 'Active',
    model: 'GPT-4o / Mistral Large',
    latency: '240ms avg response',
    tools: ['Google Ads API', 'Meta Pixel', 'Semrush', 'HubSpot'],
    capabilities: [
      'Autonomous keyword and backlink opportunity analysis',
      'Continuous multivariate ad copy testing',
      'Predictive conversion rate optimization',
      'Weekly automated executive performance reporting'
    ]
  },
  {
    _id: 'seed-3',
    name: 'SupportBot Elite',
    category: 'Customer Support',
    description: 'Resolves 80% of customer support tickets instantly with high emotional intelligence, deep product knowledge, and ticket triage.',
    rating: 4.8,
    reviews: 2100,
    price: '$19/mo',
    icon: 'MessageSquare',
    iconColor: '#38bdf8',
    tags: ['Zendesk', 'Intercom', '24/7', 'RAG'],
    status: 'Active',
    model: 'Llama-3-8B Fine-Tuned',
    latency: '120ms avg response',
    tools: ['Zendesk', 'Intercom', 'Slack', 'Notion KB'],
    capabilities: [
      'Instant semantic documentation retrieval via RAG',
      'Empathetic sentiment and tone calibration',
      'Smart escalation to human tier-3 engineers',
      'Multi-lingual support across 48+ languages'
    ]
  },
  {
    _id: 'seed-4',
    name: 'DataCruncher',
    category: 'Analytics',
    description: 'Turns complex unstructured datasets and SQL tables into actionable, board-ready presentations, heatmaps, and forecasts.',
    rating: 4.6,
    reviews: 432,
    price: '$39/mo',
    icon: 'Database',
    iconColor: '#f59e0b',
    tags: ['SQL', 'Excel', 'DataViz', 'BI'],
    status: 'Active',
    model: 'GPT-4o Data Analyst',
    latency: '310ms avg response',
    tools: ['Snowflake', 'BigQuery', 'Postgres', 'PowerBI'],
    capabilities: [
      'Natural language to complex SQL query generation',
      'Automated anomaly and trend detection in timeseries data',
      'Instant interactive SVG chart and visual generation',
      'Executive summary briefs exported to PDF and slides'
    ]
  },
  {
    _id: 'seed-5',
    name: 'SecOps Sentinel',
    category: 'Security',
    description: 'Continuously audits container infrastructure, identifies zero-day CVEs, and creates pull requests with validated vulnerability patches.',
    rating: 4.9,
    reviews: 156,
    price: '$99/mo',
    icon: 'ShieldCheck',
    iconColor: '#22c55e',
    tags: ['Pentesting', 'AWS', 'Zero-Day', 'CI/CD'],
    status: 'Active',
    model: 'SecLlama / DeepSeek Coder',
    latency: '220ms avg response',
    tools: ['AWS Security Hub', 'Snyk API', 'Trivy', 'GitHub Security'],
    capabilities: [
      'Container image vulnerability scanning',
      'IAM privilege escalation vulnerability discovery',
      'Automated dependency security patch pull requests',
      'SOC2 and ISO 27001 continuous compliance checks'
    ]
  },
  {
    _id: 'seed-6',
    name: 'Copywriter Gen',
    category: 'Marketing',
    description: 'Generates high-converting copy for landing pages, lifecycle email campaigns, product launches, and developer documentation.',
    rating: 4.5,
    reviews: 3200,
    price: '$15/mo',
    icon: 'Zap',
    iconColor: '#eab308',
    tags: ['Sales', 'Blog', 'Email', 'LandingPages'],
    status: 'Active',
    model: 'Mistral-7B / Claude 3.5 Haiku',
    latency: '150ms avg response',
    tools: ['Mailchimp', 'Webflow', 'WordPress', 'Figma'],
    capabilities: [
      'High-CTR headline and hero section generation',
      'Tone-matched lifecycle onboarding email sequences',
      'SEO-optimized technical blog posts and documentation',
      'A/B test variations with real-time score predictions'
    ]
  }
];

// Normalize icon colors to enforce website theme palette (emerald, cyan, amber, green)
const getThemeIconColor = (name: string, fallbackColor: string) => {
  if (name === 'SupportBot Elite') return '#38bdf8';
  if (name === 'Copywriter Gen') return '#eab308';
  if (name === 'AutoDev Pro') return '#22c55e';
  if (name === 'SecOps Sentinel') return '#22c55e';
  if (name === 'GrowthHacker AI') return '#10b981';
  if (name === 'DataCruncher') return '#f59e0b';

  if (fallbackColor?.toLowerCase().includes('8b5cf6') || 
      fallbackColor?.toLowerCase().includes('ec4899') || 
      fallbackColor?.toLowerCase().includes('a855f7')) {
    return '#22c55e';
  }
  return fallbackColor || '#22c55e';
};

const getIconComponent = (iconName: string, color: string, size = 28) => {
  const props = { size, color };
  switch (iconName) {
    case 'Code': return <Code {...props} />;
    case 'LineChart': return <LineChart {...props} />;
    case 'MessageSquare': return <MessageSquare {...props} />;
    case 'Database': return <Database {...props} />;
    case 'ShieldCheck': return <ShieldCheck {...props} />;
    case 'Zap': return <Zap {...props} />;
    case 'Bot': return <Bot {...props} />;
    default: return <HelpCircle {...props} />;
  }
};

export const Marketplace: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'rating' | 'reviews' | 'price'>('rating');
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeAgentModal, setActiveAgentModal] = useState<any | null>(null);

  const dbAgents = useQuery(api.agents.get);
  const seedAgents = useMutation(api.agents.seed);

  useEffect(() => {
    if (Array.isArray(dbAgents) && dbAgents.length === 0) {
      seedAgents({
        agents: DEFAULT_AGENTS.map(({ _id, ...rest }) => rest)
      }).catch(console.error);
    }
  }, [dbAgents, seedAgents]);

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveAgentModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const agents = useMemo(() => {
    if (dbAgents && dbAgents.length > 0) {
      // Merge with default enrichments for capabilities/tools if needed
      return dbAgents.map((dba: any) => {
        const fallback = DEFAULT_AGENTS.find(def => def.name === dba.name);
        return {
          ...fallback,
          ...dba,
          capabilities: dba.capabilities || fallback?.capabilities || [
            'Autonomous goal planning and step breakdown',
            'Context-aware enterprise data retrieval',
            'Automatic exception handling and tool fallback'
          ],
          tools: dba.tools || fallback?.tools || ['REST APIs', 'Cloud Storage', 'PostgreSQL'],
          model: dba.model || fallback?.model || 'Enterprise Fine-Tuned LLM',
          latency: dba.latency || fallback?.latency || '< 250ms avg response'
        };
      });
    }
    return DEFAULT_AGENTS;
  }, [dbAgents]);

  const filteredAgents = useMemo(() => {
    return agents
      .filter((agent: any) => {
        const name = agent?.name || '';
        const desc = agent?.description || '';
        const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              (agent?.tags || []).some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesCategory = selectedCategory === 'All' || agent?.category === selectedCategory;
        return matchesSearch && matchesCategory && (agent?.status === 'Active' || !agent?.status);
      })
      .sort((a: any, b: any) => {
        if (sortBy === 'rating') return (b.rating ?? 0) - (a.rating ?? 0);
        if (sortBy === 'reviews') return (b.reviews ?? 0) - (a.reviews ?? 0);
        if (sortBy === 'price') {
          const numA = parseFloat((a.price || '0').replace(/[^0-9.]/g, '')) || 0;
          const numB = parseFloat((b.price || '0').replace(/[^0-9.]/g, '')) || 0;
          return numA - numB;
        }
        return 0;
      });
  }, [agents, searchQuery, selectedCategory, sortBy]);

  // Rich Schema.org JSON-LD Structured Data for Google Search
  const structuredData = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Zyntral AI Agent Marketplace',
    description: 'Explore, customize, and deploy enterprise-grade autonomous AI agents for software engineering, analytics, security, and customer support.',
    url: 'https://www.zyntral.dev/marketplace',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: filteredAgents.length,
      itemListElement: filteredAgents.map((agent: any, index: number) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'SoftwareApplication',
          name: agent.name,
          applicationCategory: agent.category,
          description: agent.description,
          offers: {
            '@type': 'Offer',
            price: (agent.price || '0').replace(/[^0-9.]/g, '') || '0',
            priceCurrency: 'USD'
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: agent.rating ?? 4.8,
            reviewCount: agent.reviews ?? 100
          }
        }
      }))
    }
  }), [filteredAgents]);

  const handleDeploy = (agent: any) => {
    setActiveAgentModal(null);
    navigate('/workspace', { 
      state: { 
        selectedAgent: agent.name,
        category: agent.category,
        description: agent.description,
        model: agent.model || 'Llama-3-8B',
        prompt: `Deploy pre-configured ${agent.name} autonomous agent workflow for ${agent.category.toLowerCase()} tasks. Utilize ${agent.tools?.join(', ') || 'RAG & Tool APIs'}.`
      } 
    });
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#020204',
      backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(34, 197, 94, 0.09) 0%, rgba(2, 2, 4, 0.98) 65%)',
      color: '#ffffff',
      paddingTop: '110px',
      paddingBottom: '90px',
      fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif'
    }}>
      <SEO
        title="AI Agent Marketplace | Autonomous Production Agents"
        description="Discover, deploy, and scale world-class AI agents to automate your engineering, security, marketing, and support workflows."
        path="/marketplace"
        keywords={['AI agents', 'agent marketplace', 'autonomous AI', 'enterprise automation', 'Zyntral agents', 'RAG agents']}
        schema={structuredData}
      />

      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '46px' }}>
          {/* Subtle Pill Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(34, 197, 94, 0.08)',
            border: '1px solid rgba(34, 197, 94, 0.25)',
            padding: '6px 16px',
            borderRadius: '9999px',
            marginBottom: '18px',
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '1px',
            color: '#22c55e',
            textTransform: 'uppercase'
          }}>
            <Sparkles size={13} color="#22c55e" />
            <span>Zyntral Agent Ecosystem</span>
          </div>

          <h1 style={{ 
            fontSize: '3.3rem', 
            fontWeight: '800', 
            marginBottom: '14px',
            letterSpacing: '-0.02em',
            background: 'linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            AI Agent Marketplace
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#94a3b8', maxWidth: '640px', margin: '0 auto', lineHeight: 1.6 }}>
            Discover, customize, and deploy enterprise-grade autonomous AI agents to accelerate engineering, analytics, and ops.
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          marginBottom: '35px'
        }}>
          {/* Search Input */}
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '580px',
            transition: 'all 0.25s ease'
          }}>
            <Search 
              size={18} 
              style={{ 
                position: 'absolute', 
                left: '18px', 
                top: '50%',
                transform: 'translateY(-50%)',
                color: searchFocused ? '#22c55e' : '#64748b',
                transition: 'color 0.2s ease'
              }} 
            />
            <input 
              type="text" 
              placeholder="Search by agent name, capability, or tag (e.g. 'React', 'Zendesk', 'SQL')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              style={{
                width: '100%',
                padding: '14px 18px 14px 48px',
                borderRadius: '14px',
                backgroundColor: 'rgba(13, 14, 20, 0.85)',
                border: searchFocused ? '1px solid #22c55e' : '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: searchFocused ? '0 0 20px rgba(34, 197, 94, 0.2)' : '0 4px 20px rgba(0,0,0,0.3)',
                color: '#ffffff',
                fontSize: '0.94rem',
                outline: 'none',
                transition: 'all 0.25s ease'
              }}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#64748b',
                  cursor: 'pointer'
                }}
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Category Pill Menu */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '8px',
            background: '#0d0e14',
            border: '1px solid rgba(255, 255, 255, 0.07)',
            borderRadius: '9999px',
            padding: '5px 8px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.35)'
          }}>
            {CATEGORIES.map(category => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  style={{
                    padding: '7px 18px',
                    borderRadius: '9999px',
                    backgroundColor: isActive ? '#22c55e' : 'transparent',
                    border: 'none',
                    color: isActive ? '#020204' : '#94a3b8',
                    cursor: 'pointer',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '0.82rem',
                    letterSpacing: '0.3px',
                    boxShadow: isActive ? '0 0 16px rgba(34, 197, 94, 0.35)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = '#ffffff';
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = '#94a3b8';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Counter and Sort Controls Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          padding: '0 4px',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ fontSize: '0.86rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ 
              display: 'inline-block', 
              width: '8px', 
              height: '8px', 
              borderRadius: '50%', 
              backgroundColor: '#22c55e',
              boxShadow: '0 0 8px #22c55e' 
            }} />
            Showing <strong style={{ color: '#ffffff' }}>{filteredAgents.length}</strong> Production-Ready Agents
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.82rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <SlidersHorizontal size={13} /> Sort by:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              style={{
                backgroundColor: '#0d0e14',
                color: '#cbd5e1',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '6px 12px',
                fontSize: '0.82rem',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Popular</option>
              <option value="price">Price (Low to High)</option>
            </select>
          </div>
        </div>

        {/* Agent Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '24px'
        }}>
          {filteredAgents.map((agent: any) => {
            const themeColor = getThemeIconColor(agent.name, agent.iconColor);
            return (
              <div
                key={agent._id || agent.name}
                onClick={() => setActiveAgentModal(agent)}
                style={{
                  backgroundColor: 'rgba(13, 14, 20, 0.7)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '16px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 14px 32px rgba(0, 0, 0, 0.5), 0 0 20px rgba(34, 197, 94, 0.12)';
                  e.currentTarget.style.borderColor = 'rgba(34, 197, 94, 0.35)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                }}
              >
                {/* Header: Icon + Category Badge */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div style={{ 
                    width: '54px', 
                    height: '54px', 
                    borderRadius: '12px', 
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(255, 255, 255, 0.07)'
                  }}>
                    {getIconComponent(agent.icon, themeColor)}
                  </div>
                  <div style={{
                    backgroundColor: 'rgba(34, 197, 94, 0.08)',
                    color: '#22c55e',
                    border: '1px solid rgba(34, 197, 94, 0.2)',
                    padding: '4px 10px',
                    borderRadius: '9999px',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    letterSpacing: '0.6px',
                    textTransform: 'uppercase'
                  }}>
                    {agent.category}
                  </div>
                </div>

                {/* Title & Description */}
                <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '8px', color: '#f3f4f6' }}>
                  {agent.name}
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.55, flexGrow: 1, marginBottom: '18px' }}>
                  {agent.description}
                </p>

                {/* Tags in sleek slate/neutral styling (NO PURPLE) */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
                  {(agent.tags || []).map((tag: string) => (
                    <span 
                      key={tag} 
                      style={{ 
                        fontSize: '0.74rem', 
                        color: '#cbd5e1', 
                        backgroundColor: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        padding: '3px 9px',
                        borderRadius: '6px',
                        fontWeight: 500
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Card Footer: Rating, Pricing & Deploy Button */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  paddingTop: '16px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.06)'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '3px' }}>
                      <Star size={14} color="#f59e0b" fill="#f59e0b" />
                      <span style={{ fontWeight: 600, fontSize: '0.88rem', color: '#f3f4f6' }}>
                        {agent.rating ?? 4.8}
                      </span>
                      <span style={{ color: '#64748b', fontSize: '0.78rem' }}>
                        ({agent.reviews ?? 0})
                      </span>
                    </div>
                    <div style={{ fontSize: '1.08rem', fontWeight: 800, color: '#ffffff' }}>
                      {agent.price || 'Free'}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveAgentModal(agent);
                      }}
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        color: '#cbd5e1',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        padding: '8px 14px',
                        borderRadius: '9999px',
                        fontWeight: 600,
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'}
                    >
                      Inspect
                    </button>

                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeploy(agent);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        backgroundColor: '#ffffff',
                        color: '#020204',
                        border: 'none',
                        padding: '8px 18px',
                        borderRadius: '9999px',
                        fontWeight: 700,
                        fontSize: '0.82rem',
                        letterSpacing: '0.3px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 2px 10px rgba(255, 255, 255, 0.1)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#22c55e';
                        e.currentTarget.style.color = '#020204';
                        e.currentTarget.style.boxShadow = '0 0 16px rgba(34, 197, 94, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#ffffff';
                        e.currentTarget.style.color = '#020204';
                        e.currentTarget.style.boxShadow = '0 2px 10px rgba(255, 255, 255, 0.1)';
                      }}
                    >
                      Deploy <ChevronRight size={15} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty Search Result State */}
        {filteredAgents.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '70px 20px', 
            color: '#94a3b8',
            background: 'rgba(13, 14, 20, 0.4)',
            borderRadius: '16px',
            border: '1px dashed rgba(255, 255, 255, 0.08)'
          }}>
            <Bot size={44} style={{ margin: '0 auto 14px', color: '#22c55e', opacity: 0.7 }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#f3f4f6', marginBottom: '8px' }}>
              No matching AI agents found
            </h3>
            <p style={{ fontSize: '0.92rem', color: '#64748b' }}>
              Try adjusting your search query or reset your category filter.
            </p>
          </div>
        )}
      </div>

      {/* Interactive Agent Inspect Modal */}
      {activeAgentModal && (
        <div 
          onClick={() => setActiveAgentModal(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            zIndex: 9999
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#0a0b10',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              borderRadius: '20px',
              maxWidth: '680px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '32px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 35px rgba(34, 197, 94, 0.15)',
              position: 'relative'
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveAgentModal(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#94a3b8',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.color = '#94a3b8';
              }}
            >
              <X size={16} />
            </button>

            {/* Modal Header */}
            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', marginBottom: '24px' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                backgroundColor: 'rgba(34, 197, 94, 0.08)',
                border: '1px solid rgba(34, 197, 94, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {getIconComponent(
                  activeAgentModal.icon, 
                  getThemeIconColor(activeAgentModal.name, activeAgentModal.iconColor),
                  32
                )}
              </div>
              <div style={{ flexGrow: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                  <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                    {activeAgentModal.name}
                  </h2>
                  <span style={{
                    backgroundColor: 'rgba(34, 197, 94, 0.1)',
                    color: '#22c55e',
                    border: '1px solid rgba(34, 197, 94, 0.25)',
                    padding: '2px 8px',
                    borderRadius: '9999px',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    textTransform: 'uppercase'
                  }}>
                    {activeAgentModal.category}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#94a3b8', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Star size={14} color="#f59e0b" fill="#f59e0b" />
                    <span style={{ color: '#ffffff', fontWeight: 600 }}>{activeAgentModal.rating}</span>
                    <span>({activeAgentModal.reviews} reviews)</span>
                  </div>
                  <span>•</span>
                  <div style={{ color: '#22c55e', fontWeight: 700 }}>
                    {activeAgentModal.price}
                  </div>
                </div>
              </div>
            </div>

            {/* Overview Description */}
            <p style={{ color: '#cbd5e1', fontSize: '0.98rem', lineHeight: 1.6, marginBottom: '24px' }}>
              {activeAgentModal.description}
            </p>

            {/* Spec Badges Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '12px',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '24px'
            }}>
              <div>
                <div style={{ fontSize: '0.74rem', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Cpu size={13} color="#22c55e" /> LLM Backbone
                </div>
                <div style={{ fontSize: '0.9rem', color: '#f3f4f6', fontWeight: 600 }}>
                  {activeAgentModal.model}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.74rem', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={13} color="#22c55e" /> Execution SLA
                </div>
                <div style={{ fontSize: '0.9rem', color: '#f3f4f6', fontWeight: 600 }}>
                  {activeAgentModal.latency}
                </div>
              </div>
            </div>

            {/* Capabilities Checklist */}
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.8px', color: '#94a3b8', marginBottom: '12px', fontWeight: 700 }}>
                Core Agent Capabilities
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {(activeAgentModal.capabilities || []).map((cap: string, i: number) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <CheckCircle2 size={16} color="#22c55e" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '0.92rem', color: '#e2e8f0', lineHeight: 1.4 }}>
                      {cap}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Integrated Tools */}
            <div style={{ marginBottom: '32px' }}>
              <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.8px', color: '#94a3b8', marginBottom: '10px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Layers size={14} color="#22c55e" /> Supported Connectors & APIs
              </h4>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {(activeAgentModal.tools || []).map((t: string) => (
                  <span 
                    key={t}
                    style={{
                      fontSize: '0.78rem',
                      color: '#cbd5e1',
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      padding: '4px 10px',
                      borderRadius: '6px'
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <button
                onClick={() => setActiveAgentModal(null)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '9999px',
                  backgroundColor: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#94a3b8',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
              <button
                onClick={() => handleDeploy(activeAgentModal)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '10px 24px',
                  borderRadius: '9999px',
                  backgroundColor: '#22c55e',
                  border: 'none',
                  color: '#020204',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  boxShadow: '0 0 20px rgba(34, 197, 94, 0.4)',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#16a34a'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#22c55e'}
              >
                Deploy into Workspace <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
