import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ParticlesBg } from './components/ParticlesBg';
import { Home } from './pages/Home';
import { Platform } from './pages/Platform';
import { Contact } from './pages/Contact';
import { AdminPortal } from './pages/AdminPortal';

import logoImg from './assets/Zyntral LOGO REAL.jpg';

// ScrollToTop component to reset viewport on route changes
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Navbar inner component to access location hooks
const Navigation: React.FC = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  // Do not show main navbar inside the admin dashboard to optimize focus space
  if (location.pathname === '/admin' && sessionStorage.getItem('zyntral_admin_authed') === 'true') {
    return null;
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <img src={logoImg} alt="Zyntral Logo" style={{ height: '34px', width: 'auto', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.08)' }} />
        ZYNTRAL AI
      </Link>
      
      <ul className="nav-links">
        <li>
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/platform" className={`nav-link ${isActive('/platform') ? 'active' : ''}`}>
            Platform
          </Link>
        </li>
        <li>
          <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`}>
            Waitlist
          </Link>
        </li>
        <li>
          <Link to="/admin" className="nav-btn" style={{ fontSize: '0.85rem' }}>
            System Console
          </Link>
        </li>
      </ul>
    </nav>
  );
};

// Footer inner component
const Footer: React.FC = () => {
  const location = useLocation();

  // Hide footer in admin dashboard
  if (location.pathname === '/admin' && sessionStorage.getItem('zyntral_admin_authed') === 'true') {
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
            <p style={{ color: 'var(--muted-color)', fontSize: '0.85rem', lineHeight: '1.7', maxWidth: '300px' }}>
              The generative framework for prompt-to-RAG architectures, automated alignment training, and logistics-grade agent deployment.
            </p>
          </div>
          
          <div>
            <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px' }}>Modules</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
              <li><Link to="/platform" style={{ color: 'var(--muted-color)', textDecoration: 'none' }}>RAG Compiler</Link></li>
              <li><Link to="/platform" style={{ color: 'var(--muted-color)', textDecoration: 'none' }}>Model Alignment</Link></li>
              <li><Link to="/platform" style={{ color: 'var(--muted-color)', textDecoration: 'none' }}>Agent Networks</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px' }}>Solutions</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
              <li><span style={{ color: 'var(--muted-color)' }}>Logistics OS</span></li>
              <li><span style={{ color: 'var(--muted-color)' }}>Supply Chain AI</span></li>
              <li><span style={{ color: 'var(--muted-color)' }}>Sports Intelligence</span></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px' }}>Contact</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
              <li><Link to="/contact" style={{ color: 'var(--muted-color)', textDecoration: 'none' }}>Beta Waitlist</Link></li>
              <li><span style={{ color: 'var(--muted-color)' }}>contact@zyntral.ai</span></li>
              <li style={{ display: 'flex', gap: '15px', marginTop: '5px' }}>
                <a href="https://github.com" style={{ color: 'var(--muted-color)', textDecoration: 'none', fontSize: '0.8rem' }}>GitHub</a>
                <a href="https://twitter.com" style={{ color: 'var(--muted-color)', textDecoration: 'none', fontSize: '0.8rem' }}>Twitter</a>
              </li>
            </ul>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '30px', flexWrap: 'wrap', gap: '15px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--muted-color)' }}>
            © {new Date().getFullYear()} Zyntral AI. All rights reserved. • zyntral.dev
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: 'rgba(16, 185, 129, 0.08)', borderRadius: '20px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }}></span>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#a7f3d0', fontFamily: 'monospace' }}>SYSTEMS: OPERATIONAL [100%]</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      
      {/* Visual Canvas Effects */}
      <ParticlesBg />
      <div className="ambient-glow" />
      <div className="ambient-glow-secondary" />
      
      {/* Navigation */}
      <Navigation />

      {/* Page Routing */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/platform" element={<Platform />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminPortal />} />
      </Routes>

      {/* Footer */}
      <Footer />
    </Router>
  );
};

export default App;
