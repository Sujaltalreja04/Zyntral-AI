import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Terminal, Globe, Award, Shield, ChevronRight, Zap } from 'lucide-react';
import logoImg from '../assets/Zyntral LOGO REAL.jpg';
import { HeroScene3D } from '../components/HeroScene3D';

export const Home: React.FC = () => {
  // Typing Effect
  const words = [
    "Design and deploy RAG pipelines on-prompt...",
    "Automate agentic decision systems...",
    "Train and align custom LLMs in minutes...",
    "The Roboflow for the RAG and LLM era."
  ];
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(80);

  useEffect(() => {
    let timer: number;
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      timer = window.setTimeout(() => {
        setText(currentWord.substring(0, text.length - 1));
        setTypingSpeed(40);
      }, typingSpeed);
    } else {
      timer = window.setTimeout(() => {
        setText(currentWord.substring(0, text.length + 1));
        setTypingSpeed(80);
      }, typingSpeed);
    }

    if (!isDeleting && text === currentWord) {
      timer = window.setTimeout(() => {
        setIsDeleting(true);
      }, 1500);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex]);

  // Launch Countdown Timer
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const launchDate = new Date("2027-02-14T00:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = launchDate - now;

      if (difference <= 0) {
        clearInterval(interval);
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '100px', position: 'relative', overflow: 'hidden' }}>
        {/* 3D Background Scene */}
        <HeroScene3D />
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 5 }}>
          
          <div style={{ marginBottom: '25px', display: 'flex', justifyContent: 'center' }}>
            <img 
              src={logoImg} 
              alt="Zyntral Logo" 
              style={{ 
                width: '130px', 
                height: '130px', 
                borderRadius: '50%', 
                border: '1px solid rgba(255, 255, 255, 0.08)', 
                boxShadow: '0 0 40px rgba(255, 255, 255, 0.08)',
                objectFit: 'cover'
              }} 
            />
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '30px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '25px', animation: 'float 4s ease-in-out infinite' }}>
            <Zap size={14} style={{ color: '#e5e7eb' }} />
            <span style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--muted-color)' }}>
              Next-Gen AI Systems Creator
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: '1.15', fontWeight: 900, marginBottom: '20px' }}>
            Engineering Intelligent Systems <br />
            <span className="gradient-text">For The Future</span>
          </h1>

          <p style={{ color: 'var(--muted-color)', fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto 25px', lineHeight: '1.8' }}>
            Zyntral AI allows you to design, train, and deploy complete RAG pipelines and autonomous LLM agents with simple prompts. We build logistics intelligence, supply chain optimization, and enterprise solutions.
          </p>

          {/* Typing Container */}
          <div style={{ height: '35px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '40px' }}>
            <div style={{ padding: '8px 18px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', fontFamily: 'monospace', fontSize: '0.95rem', color: '#d1d5db', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Terminal size={14} />
              <span>{text}</span>
              <span style={{ width: '2px', height: '14px', background: '#d1d5db', animation: 'caret-blink 0.8s infinite' }} />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <Link to="/platform" className="btn-primary">
              Launch Platform Demo <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="btn-secondary">
              Join Waitlist
            </Link>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section style={{ padding: '100px 0', position: 'relative' }}>
        <div className="container" style={{ position: 'relative', zIndex: 5 }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '2.5rem' }}>What We Build</h2>
            <p style={{ color: 'var(--muted-color)', marginTop: '10px' }}>
              Empowering core industries with custom, scalable neural network operations.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            
            <div className="glass-card">
              <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: '#e5e7eb' }}>
                <Globe size={24} />
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '12px' }}>🚚 Logistics Intelligence</h3>
              <p style={{ color: 'var(--muted-color)', fontSize: '0.95rem', lineHeight: '1.7' }}>
                Predictive logistics, route optimization, fleet routing, and operational intelligence.
              </p>
            </div>

            <div className="glass-card">
              <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: '#d1d5db' }}>
                <Terminal size={24} />
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '12px' }}>📦 Supply Chain AI</h3>
              <p style={{ color: 'var(--muted-color)', fontSize: '0.95rem', lineHeight: '1.7' }}>
                Inventory intelligence, procurement optimization, demand forecasting, and vendor visibility.
              </p>
            </div>

            <div className="glass-card">
              <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: '#9ca3af' }}>
                <Award size={24} />
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '12px' }}>🏆 Sports Intelligence</h3>
              <p style={{ color: 'var(--muted-color)', fontSize: '0.95rem', lineHeight: '1.7' }}>
                Performance analytics, athlete evaluation, team strategy simulator, and AI decision systems.
              </p>
            </div>

            <div className="glass-card">
              <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: 'var(--green)' }}>
                <Shield size={24} />
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '12px' }}>🤖 Enterprise AI</h3>
              <p style={{ color: 'var(--muted-color)', fontSize: '0.95rem', lineHeight: '1.7' }}>
                Custom prompt-to-RAG, model fine-tuning dashboards, autonomous agents, and systems integrations.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Vision Statement */}
      <section style={{ padding: '80px 0', position: 'relative', background: 'rgba(5, 5, 8, 0.4)' }}>
        <div className="container" style={{ textAlign: 'center', zIndex: 5, position: 'relative' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '25px', fontFamily: 'var(--font-display)' }}>Our Core Vision</h2>
          <p style={{ fontSize: '1.4rem', color: '#e5e7eb', maxWidth: '900px', margin: '0 auto', lineHeight: '1.8', fontStyle: 'italic', fontWeight: 300 }}>
            "We believe AI should not simply generate static text content. It should drive operational decisions, optimize complex physical systems, automate work loops, and create measurable economic impact."
          </p>
        </div>
      </section>

      {/* Countdown / Launching Soon Section */}
      <section style={{ padding: '100px 0', textAlign: 'center', position: 'relative' }}>
        <div className="container" style={{ position: 'relative', zIndex: 5 }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '15px' }}>Launching Soon</h2>
            <p style={{ color: 'var(--muted-color)', marginBottom: '40px' }}>
              Our multi-purpose developer suite and pre-built operational model nodes are launching soon.
            </p>
            
            {/* Timer Grid */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '50px' }}>
              {[
                { label: 'Days', val: timeLeft.days },
                { label: 'Hours', val: timeLeft.hours },
                { label: 'Min', val: timeLeft.minutes },
                { label: 'Sec', val: timeLeft.seconds }
              ].map((time, idx) => (
                <div 
                  key={idx} 
                  className="glass-card" 
                  style={{ 
                    padding: '20px 25px', 
                    minWidth: '110px',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    background: 'rgba(10, 10, 18, 0.6)'
                  }}
                >
                  <div style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: '#ffffff' }}>
                    {String(time.val).padStart(2, '0')}
                  </div>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--muted-color)', marginTop: '5px', display: 'block' }}>
                    {time.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="glass-card" style={{ display: 'inline-flex', alignItems: 'center', gap: '15px', padding: '15px 30px' }}>
              <span style={{ fontSize: '0.95rem' }}>Want early developer beta access?</span>
              <Link to="/contact" className="nav-btn" style={{ fontSize: '0.85rem', padding: '8px 18px' }}>
                Register Waitlist <ChevronRight size={14} style={{ display: 'inline', verticalAlign: 'middle' }} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
