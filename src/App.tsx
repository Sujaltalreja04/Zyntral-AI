import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useQuery } from 'convex/react';
import { api } from '../convex/_generated/api';
import { ParticlesBg } from './components/ParticlesBg';
const Home = React.lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const AdminPortal = React.lazy(() => import('./pages/AdminPortal').then(m => ({ default: m.AdminPortal })));
const Roadmap = React.lazy(() => import('./pages/Roadmap').then(m => ({ default: m.Roadmap })));
const Waitlist = React.lazy(() => import('./pages/Waitlist').then(m => ({ default: m.Waitlist })));
const Contact = React.lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));

// Platform section imports
const PlatformOverview = React.lazy(() => import('./pages/platform/Overview').then(m => ({ default: m.Overview })));
const AgentEngine = React.lazy(() => import('./pages/platform/AgentEngine').then(m => ({ default: m.AgentEngine })));
const KnowledgeEngine = React.lazy(() => import('./pages/platform/KnowledgeEngine').then(m => ({ default: m.KnowledgeEngine })));
const WorkflowEngine = React.lazy(() => import('./pages/platform/WorkflowEngine').then(m => ({ default: m.WorkflowEngine })));
const DeploymentEngine = React.lazy(() => import('./pages/platform/DeploymentEngine').then(m => ({ default: m.DeploymentEngine })));

// Solutions section imports
const EnterpriseAI = React.lazy(() => import('./pages/solutions/EnterpriseAI').then(m => ({ default: m.EnterpriseAI })));
const LogisticsIntelligence = React.lazy(() => import('./pages/solutions/LogisticsIntelligence').then(m => ({ default: m.LogisticsIntelligence })));
const SupplyChainAI = React.lazy(() => import('./pages/solutions/SupplyChainAI').then(m => ({ default: m.SupplyChainAI })));
const KnowledgeSystems = React.lazy(() => import('./pages/solutions/KnowledgeSystems').then(m => ({ default: m.KnowledgeSystems })));
const CustomAISystems = React.lazy(() => import('./pages/solutions/CustomAISystems').then(m => ({ default: m.CustomAISystems })));

// Research section imports
const ResearchOverview = React.lazy(() => import('./pages/research/Overview').then(m => ({ default: m.Overview })));
const AIAgents = React.lazy(() => import('./pages/research/AIAgents').then(m => ({ default: m.AIAgents })));
const RAGArchitectures = React.lazy(() => import('./pages/research/RAGArchitectures').then(m => ({ default: m.RAGArchitectures })));
const LLMInfrastructure = React.lazy(() => import('./pages/research/LLMInfrastructure').then(m => ({ default: m.LLMInfrastructure })));
const OpenSourceAnalysis = React.lazy(() => import('./pages/research/OpenSourceAnalysis').then(m => ({ default: m.OpenSourceAnalysis })));
const BuildLogs = React.lazy(() => import('./pages/research/BuildLogs').then(m => ({ default: m.BuildLogs })));
const ResearchPaperDynamic = React.lazy(() => import('./pages/research/ResearchPaperDynamic').then(m => ({ default: m.ResearchPaperDynamic })));

// About section imports
const Vision = React.lazy(() => import('./pages/about/Vision').then(m => ({ default: m.Vision })));
const Founder = React.lazy(() => import('./pages/about/Founder').then(m => ({ default: m.Founder })));
const Mission = React.lazy(() => import('./pages/about/Mission').then(m => ({ default: m.Mission })));

// Legal section imports
const PrivacyPolicy = React.lazy(() => import('./pages/legal/PrivacyPolicy').then(m => ({ default: m.PrivacyPolicy })));
const Terms = React.lazy(() => import('./pages/legal/Terms').then(m => ({ default: m.Terms })));

import logoImg from './assets/Zyntral LOGO REAL.jpg';
import { ChevronDown, Menu, X } from 'lucide-react';

// ScrollToTop component to reset viewport on route changes
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Navbar Dropdown menu configurations
interface DropdownItem {
  label: string;
  path: string;
}

interface NavCategory {
  key: string;
  label: string;
  items: DropdownItem[];
}

const NAVIGATION_CONFIG: NavCategory[] = [
  {
    key: 'platform',
    label: 'Platform',
    items: [
      { label: 'Overview', path: '/platform/overview' },
      { label: 'Agent Engine', path: '/platform/agent-engine' },
      { label: 'Knowledge Engine', path: '/platform/knowledge-engine' },
      { label: 'Workflow Engine', path: '/platform/workflow-engine' },
      { label: 'Deployment Engine', path: '/platform/deployment-engine' }
    ]
  },
  {
    key: 'solutions',
    label: 'Solutions',
    items: [
      { label: 'Enterprise AI', path: '/solutions/enterprise-ai' },
      { label: 'Logistics Intelligence', path: '/solutions/logistics-intelligence' },
      { label: 'Supply Chain AI', path: '/solutions/supply-chain-ai' },
      { label: 'Knowledge Systems', path: '/solutions/knowledge-systems' },
      { label: 'Custom AI Development', path: '/solutions/custom-ai-systems' }
    ]
  },
  {
    key: 'research',
    label: 'Research',
    items: [
      { label: 'Research Home', path: '/research' },
      { label: 'AI Agents', path: '/research/ai-agents' },
      { label: 'RAG Architectures', path: '/research/rag-architectures' },
      { label: 'LLM Infrastructure', path: '/research/llm-infrastructure' },
      { label: 'Open Source Analysis', path: '/research/open-source-analysis' },
      { label: 'Zyntral Build Logs', path: '/research/build-logs' }
    ]
  },
  {
    key: 'about',
    label: 'About',
    items: [
      { label: 'Vision', path: '/about/vision' },
      { label: 'Founder Story', path: '/about/founder' },
      { label: 'Mission', path: '/about/mission' }
    ]
  }
];

// Navbar inner component
const Navigation: React.FC = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const maintenanceVal = useQuery(api.settings.getVal, { key: 'maintenance' });
  const maintenance = maintenanceVal === 'true';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown and mobile menu when path changes
  useEffect(() => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isActiveCategory = (category: NavCategory) => {
    return category.items.some(item => location.pathname === item.path) || 
           (category.key === 'platform' && location.pathname === '/platform') ||
           (category.key === 'research' && location.pathname === '/research');
  };

  const isCurrentActive = (path: string) => location.pathname === path;

  // Do not show main navbar inside the admin dashboard to optimize focus space
  if (location.pathname === '/sujal' && sessionStorage.getItem('zyntral_admin_authed') === 'true') {
    return null;
  }

  const dropdownContainerStyle: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  };

  const dropdownMenuStyle = (categoryKey: string): React.CSSProperties => ({
    position: 'absolute',
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'rgba(5, 5, 12, 0.96)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '12px',
    padding: '10px',
    display: activeDropdown === categoryKey ? 'flex' : 'none',
    flexDirection: 'column',
    gap: '4px',
    minWidth: '220px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.6)',
    zIndex: 1001,
    marginTop: '10px',
    animation: activeDropdown === categoryKey ? 'slide-down 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards' : 'none'
  });

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} style={{ top: maintenance ? '40px' : '0px', transition: 'top 0.3s ease' }}>
        <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src={logoImg} alt="Zyntral Logo" style={{ height: '34px', width: 'auto', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.08)' }} />
          ZYNTRAL AI
        </Link>
        
        {/* Desktop nav links */}
        <ul className="nav-links desktop-only">
          {NAVIGATION_CONFIG.map(cat => (
            <li 
              key={cat.key} 
              style={dropdownContainerStyle}
              onMouseEnter={() => setActiveDropdown(cat.key)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <span 
                className={`nav-link ${isActiveCategory(cat) ? 'active' : ''}`} 
                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', paddingBottom: '10px', marginTop: '10px' }}
              >
                {cat.label}
                <ChevronDown size={12} style={{ 
                  transform: activeDropdown === cat.key ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease'
                }} />
              </span>

              {/* Dropdown Box */}
              <div style={dropdownMenuStyle(cat.key)}>
                {cat.items.map(item => (
                  <Link 
                    key={item.path} 
                    to={item.path} 
                    className={`dropdown-item-link ${isCurrentActive(item.path) ? 'active' : ''}`}
                    style={{
                      padding: '8px 12px',
                      color: isCurrentActive(item.path) ? '#fff' : 'var(--muted-color)',
                      textDecoration: 'none',
                      fontSize: '0.85rem',
                      fontWeight: 500,
                      borderRadius: '8px',
                      transition: 'all 0.2s ease',
                      display: 'block'
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </li>
          ))}
          
          <li>
            <Link to="/roadmap" className={`nav-link ${isCurrentActive('/roadmap') ? 'active' : ''}`}>
              Roadmap
            </Link>
          </li>
          
          <li>
            <Link to="/contact" className={`nav-link ${isCurrentActive('/contact') ? 'active' : ''}`}>
              Contact
            </Link>
          </li>

          <li>
            <Link to="/waitlist" className="nav-btn" style={{ fontSize: '0.85rem', padding: '8px 18px' }}>
              Waitlist
            </Link>
          </li>
        </ul>

        {/* Mobile menu trigger */}
        <button 
          className="mobile-only"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', display: 'none' }}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: `${(scrolled ? 70 : 80) + (maintenance ? 40 : 0)}px`,
          left: 0,
          right: 0,
          background: 'rgba(5, 5, 12, 0.98)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          padding: '20px',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          maxHeight: 'calc(100vh - 80px)',
          overflowY: 'auto'
        }}>
          {NAVIGATION_CONFIG.map(cat => (
            <div key={cat.key}>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--muted-color)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {cat.label}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingLeft: '10px' }}>
                {cat.items.map(item => (
                  <Link 
                    key={item.path} 
                    to={item.path} 
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ color: isCurrentActive(item.path) ? '#fff' : 'var(--muted-color)', textDecoration: 'none', fontSize: '0.9rem' }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '15px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <Link to="/roadmap" onClick={() => setMobileMenuOpen(false)} style={{ color: isCurrentActive('/roadmap') ? '#fff' : 'var(--muted-color)', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 600 }}>
              Roadmap
            </Link>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)} style={{ color: isCurrentActive('/contact') ? '#fff' : 'var(--muted-color)', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 600 }}>
              Contact
            </Link>
            <Link to="/waitlist" onClick={() => setMobileMenuOpen(false)} className="btn-primary" style={{ padding: '10px', fontSize: '0.9rem', justifyContent: 'center' }}>
              Join Waitlist
            </Link>
          </div>
        </div>
      )}

      {/* Inject custom styles */}
      <style>{`
        @keyframes slide-down {
          from { opacity: 0; transform: translate(-50%, 5px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
        .dropdown-item-link:hover {
          background: rgba(255, 255, 255, 0.05) !important;
          color: #fff !important;
        }
        @media (max-width: 960px) {
          .desktop-only {
            display: none !important;
          }
          .mobile-only {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
};

// Footer inner component
const Footer: React.FC = () => {
  const location = useLocation();

  // Hide footer in admin dashboard
  if (location.pathname === '/sujal' && sessionStorage.getItem('zyntral_admin_authed') === 'true') {
    return null;
  }

  return (
    <footer className="main-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img src={logoImg} alt="Zyntral Logo" style={{ height: '28px', width: 'auto', borderRadius: '3px', border: '1px solid rgba(255,255,255,0.08)' }} /> ZYNTRAL AI
            </h3>
            <p style={{ color: 'var(--muted-color)', fontSize: '0.85rem', lineHeight: '1.7', maxWidth: '300px', marginBottom: '15px' }}>
              The generative framework for prompt-to-RAG architectures, automated alignment training, and logistics-grade agent deployment.
            </p>
            <div style={{ display: 'flex', gap: '15px', marginTop: '15px' }}>
              <a href="https://github.com" target="_blank" rel="noreferrer" style={{ color: 'var(--muted-color)', textDecoration: 'none', fontSize: '0.8rem' }}>GitHub</a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ color: 'var(--muted-color)', textDecoration: 'none', fontSize: '0.8rem' }}>LinkedIn</a>
              <a href="https://x.com" target="_blank" rel="noreferrer" style={{ color: 'var(--muted-color)', textDecoration: 'none', fontSize: '0.8rem' }}>X / Twitter</a>
            </div>
          </div>
          
          <div>
            <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px' }}>Platform</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
              <li><Link to="/platform/overview" style={{ color: 'var(--muted-color)', textDecoration: 'none' }}>Overview</Link></li>
              <li><Link to="/platform/agent-engine" style={{ color: 'var(--muted-color)', textDecoration: 'none' }}>Agent Engine</Link></li>
              <li><Link to="/platform/knowledge-engine" style={{ color: 'var(--muted-color)', textDecoration: 'none' }}>Knowledge Engine</Link></li>
              <li><Link to="/platform/workflow-engine" style={{ color: 'var(--muted-color)', textDecoration: 'none' }}>Workflow Engine</Link></li>
              <li><Link to="/platform/deployment-engine" style={{ color: 'var(--muted-color)', textDecoration: 'none' }}>Deployment Engine</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px' }}>Solutions</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
              <li><Link to="/solutions/enterprise-ai" style={{ color: 'var(--muted-color)', textDecoration: 'none' }}>Enterprise AI</Link></li>
              <li><Link to="/solutions/logistics-intelligence" style={{ color: 'var(--muted-color)', textDecoration: 'none' }}>Logistics Intelligence</Link></li>
              <li><Link to="/solutions/supply-chain-ai" style={{ color: 'var(--muted-color)', textDecoration: 'none' }}>Supply Chain AI</Link></li>
              <li><Link to="/solutions/knowledge-systems" style={{ color: 'var(--muted-color)', textDecoration: 'none' }}>Knowledge Systems</Link></li>
              <li><Link to="/solutions/custom-ai-systems" style={{ color: 'var(--muted-color)', textDecoration: 'none' }}>Custom AI Development</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px' }}>Research & About</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
              <li><Link to="/research" style={{ color: 'var(--muted-color)', textDecoration: 'none' }}>Research Home</Link></li>
              <li><Link to="/research/ai-agents" style={{ color: 'var(--muted-color)', textDecoration: 'none' }}>AI Agents</Link></li>
              <li><Link to="/research/rag-architectures" style={{ color: 'var(--muted-color)', textDecoration: 'none' }}>RAG Architectures</Link></li>
              <li><Link to="/research/llm-infrastructure" style={{ color: 'var(--muted-color)', textDecoration: 'none' }}>LLM Infrastructure</Link></li>
              <li><Link to="/research/build-logs" style={{ color: 'var(--muted-color)', textDecoration: 'none' }}>Build Logs</Link></li>
              <li><Link to="/about/vision" style={{ color: 'var(--muted-color)', textDecoration: 'none' }}>Vision</Link></li>
              <li><Link to="/roadmap" style={{ color: 'var(--muted-color)', textDecoration: 'none' }}>Roadmap</Link></li>
            </ul>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '30px', flexWrap: 'wrap', gap: '15px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--muted-color)' }}>
            © {new Date().getFullYear()} Zyntral AI. All rights reserved. • zyntral.dev
          </span>
          <div style={{ display: 'flex', gap: '15px', fontSize: '0.8rem' }}>
            <Link to="/legal/privacy-policy" style={{ color: 'var(--muted-color)', textDecoration: 'none' }}>Privacy Policy</Link>
            <span style={{ color: 'rgba(255,255,255,0.15)' }}>•</span>
            <Link to="/legal/terms" style={{ color: 'var(--muted-color)', textDecoration: 'none' }}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const App: React.FC = () => {
  const maintenanceVal = useQuery(api.settings.getVal, { key: 'maintenance' });
  const maintenance = maintenanceVal === 'true';

  return (
    <Router>
      <ScrollToTop />
      
      {/* Visual Canvas Effects */}
      <ParticlesBg />
      <div className="ambient-glow" />
      <div className="ambient-glow-secondary" />

      {maintenance && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '40px',
          background: 'linear-gradient(90deg, rgba(239, 68, 68, 0.15) 0%, rgba(10, 10, 10, 0.95) 50%, rgba(239, 68, 68, 0.15) 100%)',
          color: '#fca5a5',
          borderBottom: '1px solid rgba(239, 68, 68, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.8rem',
          fontWeight: 600,
          letterSpacing: '1px',
          zIndex: 9999,
          fontFamily: 'monospace',
          backdropFilter: 'blur(8px)',
          transition: 'all 0.3s ease'
        }}>
          ⚠️ SYSTEM NOTICE: Enterprise Node in Maintenance Mode. Simulated network latency may occur.
        </div>
      )}
      
      {/* Navigation */}
      <Navigation />

      {/* Page Routing */}
      <div style={{ paddingTop: maintenance ? '40px' : '0px', transition: 'padding-top 0.3s ease' }}>
        <React.Suspense fallback={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', color: 'var(--muted-color)', fontFamily: 'monospace' }}>
            <span>Compiling runtime layout...</span>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
          
            {/* Platform Section */}
            <Route path="/platform" element={<PlatformOverview />} />
            <Route path="/platform/overview" element={<PlatformOverview />} />
            <Route path="/platform/agent-engine" element={<AgentEngine />} />
            <Route path="/platform/knowledge-engine" element={<KnowledgeEngine />} />
            <Route path="/platform/workflow-engine" element={<WorkflowEngine />} />
            <Route path="/platform/deployment-engine" element={<DeploymentEngine />} />
            
            {/* Solutions Section */}
            <Route path="/solutions/enterprise-ai" element={<EnterpriseAI />} />
            <Route path="/solutions/logistics-intelligence" element={<LogisticsIntelligence />} />
            <Route path="/solutions/supply-chain-ai" element={<SupplyChainAI />} />
            <Route path="/solutions/knowledge-systems" element={<KnowledgeSystems />} />
            <Route path="/solutions/custom-ai-systems" element={<CustomAISystems />} />
            
            {/* Research Section */}
            <Route path="/research" element={<ResearchOverview />} />
            <Route path="/research/overview" element={<ResearchOverview />} />
            <Route path="/research/ai-agents" element={<AIAgents />} />
            <Route path="/research/rag-architectures" element={<RAGArchitectures />} />
            <Route path="/research/llm-infrastructure" element={<LLMInfrastructure />} />
            <Route path="/research/open-source-analysis" element={<OpenSourceAnalysis />} />
            <Route path="/research/build-logs" element={<BuildLogs />} />
            <Route path="/research/:slug" element={<ResearchPaperDynamic />} />
            
            {/* Other Sections */}
            <Route path="/roadmap" element={<Roadmap />} />
            
            {/* About Section */}
            <Route path="/about/vision" element={<Vision />} />
            <Route path="/about/founder" element={<Founder />} />
            <Route path="/about/mission" element={<Mission />} />
            
            {/* Contact and Waitlist */}
            <Route path="/waitlist" element={<Waitlist />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Legal Section */}
            <Route path="/legal/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/legal/terms" element={<Terms />} />
            
            {/* Admin Dashboard */}
            <Route path="/sujal" element={<AdminPortal />} />
          </Routes>
        </React.Suspense>
      </div>

      {/* Footer */}
      <Footer />
    </Router>
  );
};

export default App;
