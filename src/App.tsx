import React, { useEffect, useState } from 'react';
import { BrowserRouter, HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useQuery } from 'convex/react';
import { api } from '../convex/_generated/api';

const Home = React.lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const Workspace = React.lazy(() => import('./pages/Workspace').then(m => ({ default: m.Workspace })));
const AdminPortal = React.lazy(() => import('./pages/AdminPortal').then(m => ({ default: m.AdminPortal })));
const Roadmap = React.lazy(() => import('./pages/Roadmap').then(m => ({ default: m.Roadmap })));
const Waitlist = React.lazy(() => import('./pages/Waitlist').then(m => ({ default: m.Waitlist })));
const Contact = React.lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const Platform = React.lazy(() => import('./pages/Platform').then(m => ({ default: m.Platform })));

// Legal section imports
const PrivacyPolicy = React.lazy(() => import('./pages/legal/PrivacyPolicy').then(m => ({ default: m.PrivacyPolicy })));
const Terms = React.lazy(() => import('./pages/legal/Terms').then(m => ({ default: m.Terms })));

import logoImg from './assets/Zyntral LOGO REAL.jpg';
import { Menu, X } from 'lucide-react';

// ScrollToTop component to reset viewport on route changes
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

interface NavigationItem {
  label: string;
  path: string;
}

const NAVIGATION_ITEMS: NavigationItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Workspace Console', path: '/workspace' },
  { label: 'Developer Sandbox', path: '/platform' },
  { label: 'Roadmap', path: '/roadmap' },
  { label: 'Contact', path: '/contact' }
];

// Navbar inner component
const Navigation: React.FC = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
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

  // Close mobile menu when path changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isCurrentActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  // Do not show main navbar inside the admin dashboard to optimize focus space
  if (location.pathname === '/sujal' && sessionStorage.getItem('zyntral_admin_authed') === 'true') {
    return null;
  }

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} style={{ top: maintenance ? '40px' : '0px', transition: 'top 0.3s ease' }}>
        <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src={logoImg} alt="Zyntral Logo" style={{ height: '34px', width: 'auto', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.08)' }} />
          ZYNTRAL AI
        </Link>
        
        <ul className="nav-links desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          {/* Centered Dark Pill Menu */}
          <div style={{ 
            background: '#12131a', 
            borderRadius: '9999px', 
            padding: '8px 24px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '24px',
            border: '1px solid rgba(255,255,255,0.06)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
          }}>
            {NAVIGATION_ITEMS.map(item => (
              <li key={item.path} style={{ listStyle: 'none' }}>
                <Link 
                  to={item.path} 
                  className={`nav-link ${isCurrentActive(item.path) ? 'active' : ''}`}
                  style={{ 
                    fontSize: '0.72rem', 
                    letterSpacing: '1px', 
                    textTransform: 'uppercase', 
                    fontWeight: 700,
                    color: isCurrentActive(item.path) ? '#ffffff' : '#94a3b8',
                    transition: 'color 0.2s'
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </div>
        </ul>

        {/* Right Action Button */}
        <div className="desktop-only">
          <Link to="/waitlist" className="btn-primary" style={{ 
            background: '#ffffff', 
            color: '#000000', 
            borderRadius: '9999px', 
            padding: '8px 20px', 
            fontSize: '0.72rem', 
            fontWeight: 800, 
            letterSpacing: '0.5px', 
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 4px 15px rgba(255,255,255,0.1)',
            border: 'none'
          }}>
            Get Started <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>→</span>
          </Link>
        </div>        {/* Mobile menu trigger */}
        <button 
          className="mobile-only"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}
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
          background: 'rgba(8, 10, 16, 0.98)',
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
          {NAVIGATION_ITEMS.map(item => (
            <Link 
              key={item.path} 
              to={item.path} 
              onClick={() => setMobileMenuOpen(false)}
              style={{ 
                color: isCurrentActive(item.path) ? '#fff' : 'var(--muted-color)', 
                textDecoration: 'none', 
                fontSize: '1rem',
                fontWeight: 500
              }}
            >
              {item.label}
            </Link>
          ))}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '15px' }}>
            <Link 
              to="/waitlist" 
              onClick={() => setMobileMenuOpen(false)} 
              className="btn-primary" 
              style={{ padding: '10px', fontSize: '0.9rem', justifyContent: 'center', width: '100%' }}
            >
              Join Waitlist
            </Link>
          </div>
        </div>
      )}
 
      {/* Inject custom styles */}
      <style>{`
        .mobile-only {
          display: none !important;
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

  // Hide footer in admin dashboard and workspace console
  if (
    (location.pathname === '/sujal' && sessionStorage.getItem('zyntral_admin_authed') === 'true') ||
    location.pathname === '/workspace'
  ) {
    return null;
  }

  return (
    <footer className="main-footer">
      <div className="container">
        <div className="footer-grid" style={{ gridTemplateColumns: '2fr 1fr 1fr' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img src={logoImg} alt="Zyntral Logo" style={{ height: '28px', width: 'auto', borderRadius: '3px', border: '1px solid rgba(255,255,255,0.08)' }} /> ZYNTRAL AI
            </h3>
            <p style={{ color: 'var(--muted-color)', fontSize: '0.85rem', lineHeight: '1.7', maxWidth: '300px', marginBottom: '15px' }}>
              A clean visual workspace to configure, catalog, and test your customized RAG pipelines and autonomous agent parameters.
            </p>
            <div style={{ display: 'flex', gap: '15px', marginTop: '15px' }}>
              <a href="https://github.com" target="_blank" rel="noreferrer" style={{ color: 'var(--muted-color)', textDecoration: 'none', fontSize: '0.8rem' }}>GitHub</a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ color: 'var(--muted-color)', textDecoration: 'none', fontSize: '0.8rem' }}>LinkedIn</a>
              <a href="https://x.com" target="_blank" rel="noreferrer" style={{ color: 'var(--muted-color)', textDecoration: 'none', fontSize: '0.8rem' }}>X / Twitter</a>
            </div>
          </div>
          
          <div>
            <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px' }}>Product</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
              <li><Link to="/" style={{ color: 'var(--muted-color)', textDecoration: 'none' }}>Home</Link></li>
              <li><Link to="/workspace" style={{ color: 'var(--muted-color)', textDecoration: 'none' }}>Workspace Console</Link></li>
              <li><Link to="/roadmap" style={{ color: 'var(--muted-color)', textDecoration: 'none' }}>Roadmap</Link></li>
              <li><Link to="/waitlist" style={{ color: 'var(--muted-color)', textDecoration: 'none' }}>Join Waitlist</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px' }}>Developer</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
              <li><Link to="/contact" style={{ color: 'var(--muted-color)', textDecoration: 'none' }}>Contact Us</Link></li>
              <li><Link to="/legal/privacy-policy" style={{ color: 'var(--muted-color)', textDecoration: 'none' }}>Privacy Policy</Link></li>
              <li><Link to="/legal/terms" style={{ color: 'var(--muted-color)', textDecoration: 'none' }}>Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '30px', flexWrap: 'wrap', gap: '15px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--muted-color)' }}>
            © {new Date().getFullYear()} Zyntral AI. All rights reserved. • zyntral.dev
          </span>
        </div>
      </div>
    </footer>
  );
};

export const App: React.FC = () => {
  const maintenanceVal = useQuery(api.settings.getVal, { key: 'maintenance' });
  const maintenance = maintenanceVal === 'true';

  // Detect Electron environment to switch to HashRouter for local filesystem loading
  const isElectron = window.navigator.userAgent.toLowerCase().includes('electron');
  const RouterComponent = isElectron ? HashRouter : BrowserRouter;

  return (
    <RouterComponent>
      <ScrollToTop />

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
            <span>Loading Workspace Layout...</span>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/workspace" element={<Workspace />} />
            <Route path="/platform" element={<Platform />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/waitlist" element={<Waitlist />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/legal/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/legal/terms" element={<Terms />} />
            <Route path="/sujal" element={<AdminPortal />} />
          </Routes>
        </React.Suspense>
      </div>

      {/* Footer */}
      <Footer />
    </RouterComponent>
  );
};

export default App;
