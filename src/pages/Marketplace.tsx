import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Star, Bot, Code, LineChart, MessageSquare, Zap, ChevronRight, ShieldCheck, Database, HelpCircle, Sparkles } from 'lucide-react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { SEO } from '../components/SEO';

const CATEGORIES = ['All', 'Engineering', 'Marketing', 'Customer Support', 'Analytics', 'Security'];

export const DEFAULT_AGENTS = [
  {
    _id: 'seed-1',
    name: 'AutoDev Pro',
    category: 'Engineering',
    description: 'Autonomous coding agent that can build entire full-stack applications from a single prompt.',
    rating: 4.9,
    reviews: 1250,
    price: '$49/mo',
    icon: 'Code',
    iconColor: '#22c55e',
    tags: ['React', 'Node.js', 'Python'],
    status: 'Active'
  },
  {
    _id: 'seed-2',
    name: 'GrowthHacker AI',
    category: 'Marketing',
    description: 'Analyzes your market and automatically runs A/B tested ad campaigns across platforms.',
    rating: 4.7,
    reviews: 843,
    price: '$29/mo',
    icon: 'LineChart',
    iconColor: '#10b981',
    tags: ['SEO', 'Ads', 'Analytics'],
    status: 'Active'
  },
  {
    _id: 'seed-3',
    name: 'SupportBot Elite',
    category: 'Customer Support',
    description: 'Resolves 80% of customer tickets instantly with high emotional intelligence.',
    rating: 4.8,
    reviews: 2100,
    price: '$19/mo',
    icon: 'MessageSquare',
    iconColor: '#38bdf8',
    tags: ['Zendesk', 'Intercom', '24/7'],
    status: 'Active'
  },
  {
    _id: 'seed-4',
    name: 'DataCruncher',
    category: 'Analytics',
    description: 'Turns messy datasets into beautiful, actionable board-ready presentations.',
    rating: 4.6,
    reviews: 432,
    price: '$39/mo',
    icon: 'Database',
    iconColor: '#f59e0b',
    tags: ['SQL', 'Excel', 'DataViz'],
    status: 'Active'
  },
  {
    _id: 'seed-5',
    name: 'SecOps Sentinel',
    category: 'Security',
    description: 'Continuously monitors your infrastructure for vulnerabilities and automatically patches them.',
    rating: 4.9,
    reviews: 156,
    price: '$99/mo',
    icon: 'ShieldCheck',
    iconColor: '#22c55e',
    tags: ['Pentesting', 'AWS', 'Zero-Day'],
    status: 'Active'
  },
  {
    _id: 'seed-6',
    name: 'Copywriter Gen',
    category: 'Marketing',
    description: 'Generates high-converting copy for landing pages, emails, and social media.',
    rating: 4.5,
    reviews: 3200,
    price: '$15/mo',
    icon: 'Zap',
    iconColor: '#eab308',
    tags: ['Sales', 'Blog', 'Twitter'],
    status: 'Active'
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

  // Sanitize away any purple/magenta tints
  if (fallbackColor.toLowerCase().includes('8b5cf6') || 
      fallbackColor.toLowerCase().includes('ec4899') || 
      fallbackColor.toLowerCase().includes('a855f7')) {
    return '#22c55e';
  }
  return fallbackColor || '#22c55e';
};

const getIconComponent = (iconName: string, color: string) => {
  const props = { size: 28, color };
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
  const [searchFocused, setSearchFocused] = useState(false);

  const dbAgents = useQuery(api.agents.get);
  const seedAgents = useMutation(api.agents.seed);

  useEffect(() => {
    // Only attempt seed if Convex has answered with an empty array
    if (Array.isArray(dbAgents) && dbAgents.length === 0) {
      seedAgents({
        agents: DEFAULT_AGENTS.map(({ _id, ...rest }) => rest)
      }).catch(console.error);
    }
  }, [dbAgents, seedAgents]);

  const agents = (dbAgents && dbAgents.length > 0) ? dbAgents : DEFAULT_AGENTS;

  const filteredAgents = agents.filter((agent: any) => {
    const name = agent?.name || '';
    const desc = agent?.description || '';
    const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || agent?.category === selectedCategory;
    return matchesSearch && matchesCategory && (agent?.status === 'Active' || !agent?.status);
  });

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
        keywords={['AI agents', 'agent marketplace', 'autonomous AI', 'enterprise automation', 'Zyntral agents']}
      />

      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          {/* Subtle Pill Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(34, 197, 94, 0.08)',
            border: '1px solid rgba(34, 197, 94, 0.25)',
            padding: '6px 16px',
            borderRadius: '9999px',
            marginBottom: '20px',
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
            fontSize: '3.4rem', 
            fontWeight: '800', 
            marginBottom: '16px',
            letterSpacing: '-0.02em',
            background: 'linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            AI Agent Marketplace
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#94a3b8', maxWidth: '640px', margin: '0 auto', lineHeight: 1.6 }}>
            Discover, deploy, and scale world-class AI agents to automate your entire business and engineering workflow.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          marginBottom: '50px'
        }}>
          {/* Search Bar */}
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '580px',
            transition: 'all 0.25s ease'
          }}>
            <Search 
              size={19} 
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
              placeholder="Search agents by name or capability (e.g. 'React Developer', 'SEO')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              style={{
                width: '100%',
                padding: '14px 18px 14px 50px',
                borderRadius: '14px',
                backgroundColor: 'rgba(13, 14, 20, 0.85)',
                border: searchFocused ? '1px solid #22c55e' : '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: searchFocused ? '0 0 20px rgba(34, 197, 94, 0.2)' : '0 4px 20px rgba(0,0,0,0.3)',
                color: '#ffffff',
                fontSize: '0.95rem',
                outline: 'none',
                transition: 'all 0.25s ease'
              }}
            />
          </div>

          {/* Category Pill Menu aligned with Navbar styling */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '8px',
            background: '#0d0e14',
            border: '1px solid rgba(255, 255, 255, 0.07)',
            borderRadius: '9999px',
            padding: '6px 10px',
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
                <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.55, flexGrow: 1, marginBottom: '20px' }}>
                  {agent.description}
                </p>

                {/* Tags in sleek slate/neutral styling (NO PURPLE) */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '22px', flexWrap: 'wrap' }}>
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

                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/workspace', { state: { selectedAgent: agent.name } });
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
    </div>
  );
};
