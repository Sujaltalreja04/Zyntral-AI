import React, { useState, useEffect } from 'react';
import { Search, Star, Bot, Code, LineChart, MessageSquare, Zap, ChevronRight, ShieldCheck, Database, HelpCircle } from 'lucide-react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

const CATEGORIES = ['All', 'Engineering', 'Marketing', 'Customer Support', 'Analytics', 'Security'];

const getIconComponent = (iconName: string, color: string) => {
  const props = { size: 32, color };
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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const agents = useQuery(api.agents.get) || [];
  const seedAgents = useMutation(api.agents.seed);

  useEffect(() => {
    if (agents && agents.length === 0) {
      seedAgents({
        agents: [
          { name: 'AutoDev Pro', category: 'Engineering', description: 'Autonomous coding agent that can build entire full-stack applications from a single prompt.', rating: 4.9, reviews: 1250, price: '$49/mo', icon: 'Code', iconColor: '#3b82f6', tags: ['React', 'Node.js', 'Python'], status: 'Active' },
          { name: 'GrowthHacker AI', category: 'Marketing', description: 'Analyzes your market and automatically runs A/B tested ad campaigns across platforms.', rating: 4.7, reviews: 843, price: '$29/mo', icon: 'LineChart', iconColor: '#10b981', tags: ['SEO', 'Ads', 'Analytics'], status: 'Active' },
          { name: 'SupportBot Elite', category: 'Customer Support', description: 'Resolves 80% of customer tickets instantly with high emotional intelligence.', rating: 4.8, reviews: 2100, price: '$19/mo', icon: 'MessageSquare', iconColor: '#8b5cf6', tags: ['Zendesk', 'Intercom', '24/7'], status: 'Active' },
          { name: 'DataCruncher', category: 'Analytics', description: 'Turns messy datasets into beautiful, actionable board-ready presentations.', rating: 4.6, reviews: 432, price: '$39/mo', icon: 'Database', iconColor: '#f59e0b', tags: ['SQL', 'Excel', 'DataViz'], status: 'Active' },
          { name: 'SecOps Sentinel', category: 'Security', description: 'Continuously monitors your infrastructure for vulnerabilities and automatically patches them.', rating: 4.9, reviews: 156, price: '$99/mo', icon: 'ShieldCheck', iconColor: '#ef4444', tags: ['Pentesting', 'AWS', 'Zero-Day'], status: 'Active' },
          { name: 'Copywriter Gen', category: 'Marketing', description: 'Generates high-converting copy for landing pages, emails, and social media.', rating: 4.5, reviews: 3200, price: '$15/mo', icon: 'Zap', iconColor: '#ec4899', tags: ['Sales', 'Blog', 'Twitter'], status: 'Active' }
        ]
      }).catch(console.error);
    }
  }, [agents, seedAgents]);

  const filteredAgents = agents.filter((agent: any) => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          agent.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || agent.category === selectedCategory;
    return matchesSearch && matchesCategory && agent.status === 'Active';
  });

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#050508',
      color: '#ffffff',
      paddingTop: '100px',
      paddingBottom: '80px',
      fontFamily: '"Inter", "Outfit", sans-serif'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ 
            fontSize: '3.5rem', 
            fontWeight: '800', 
            marginBottom: '20px',
            background: 'linear-gradient(90deg, #ffffff, #a1a1aa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            AI Agent Marketplace
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#a1a1aa', maxWidth: '600px', margin: '0 auto' }}>
            Discover, deploy, and scale world-class AI agents to automate your entire business workflow.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          marginBottom: '40px'
        }}>
          {/* Search Bar */}
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <Search style={{ position: 'absolute', left: '16px', top: '16px', color: '#a1a1aa' }} size={20} />
            <input 
              type="text" 
              placeholder="Search for agents (e.g. 'React Developer', 'SEO Expert')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '16px 16px 16px 48px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
            />
          </div>

          {/* Category Pills */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '999px',
                  backgroundColor: selectedCategory === category ? '#3b82f6' : 'rgba(255, 255, 255, 0.05)',
                  border: `1px solid ${selectedCategory === category ? '#3b82f6' : 'rgba(255, 255, 255, 0.1)'}`,
                  color: selectedCategory === category ? '#ffffff' : '#a1a1aa',
                  cursor: 'pointer',
                  fontWeight: '500',
                  transition: 'all 0.2s',
                  fontSize: '0.9rem'
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Agent Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '24px'
        }}>
          {filteredAgents.map(agent => (
            <div
              key={agent._id}
              style={{
                backgroundColor: 'rgba(15, 15, 20, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s, box-shadow 0.3s, border-color 0.3s',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(59, 130, 246, 0.15)';
                e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  borderRadius: '12px', 
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(255, 255, 255, 0.05)'
                }}>
                  {getIconComponent(agent.icon, agent.iconColor)}
                </div>
                <div style={{
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  color: '#3b82f6',
                  padding: '4px 10px',
                  borderRadius: '999px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase'
                }}>
                  {agent.category}
                </div>
              </div>

              <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '8px' }}>{agent.name}</h3>
              <p style={{ color: '#a1a1aa', fontSize: '0.95rem', lineHeight: '1.5', flexGrow: 1, marginBottom: '20px' }}>
                {agent.description}
              </p>

              <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
                {agent.tags.map(tag => (
                  <span key={tag} style={{ 
                    fontSize: '0.75rem', 
                    color: '#8b5cf6', 
                    backgroundColor: 'rgba(139, 92, 246, 0.1)',
                    padding: '2px 8px',
                    borderRadius: '4px'
                  }}>
                    #{tag}
                  </span>
                ))}
              </div>

              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                paddingTop: '16px',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                    <Star size={14} color="#f59e0b" fill="#f59e0b" />
                    <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{agent.rating}</span>
                    <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>({agent.reviews})</span>
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: '700' }}>{agent.price}</div>
                </div>
                <button style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  backgroundColor: '#ffffff',
                  color: '#000000',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}>
                  Deploy <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredAgents.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#a1a1aa' }}>
            <Bot size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>No agents found</h3>
            <p>Try adjusting your search or category filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};
