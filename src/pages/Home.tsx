import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Terminal, Globe, Award, Shield, ChevronRight, Zap, Cpu, Database } from 'lucide-react';
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

  // Launch Countdown Timer (For Roadmap Preview)
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
      {/* 1. Hero Section */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '100px', position: 'relative', overflow: 'hidden' }}>
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
            <Link to="/waitlist" className="btn-secondary">
              Join Waitlist
            </Link>
          </div>
        </div>
      </section>

      {/* 2. What is Zyntral */}
      <section style={{ padding: '100px 0', borderTop: '1px solid rgba(255, 255, 255, 0.03)', position: 'relative' }}>
        <div className="container" style={{ position: 'relative', zIndex: 5 }}>
          <div className="grid-halves">
            <div>
              <span className="badge badge-cyan" style={{ marginBottom: '15px' }}>Introduction</span>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', lineHeight: '1.2' }}>
                The Generative Framework <br />
                <span className="gradient-text">For RAG and Agent Ops</span>
              </h2>
              <p style={{ color: 'var(--muted-color)', fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '20px' }}>
                Zyntral compiles low-level database drivers, fine-tuning setups, and containerized runtime orchestrations directly from high-level prompt inputs. Instead of manually coding API bridges, developers describe what database to query and what agent to run, letting Zyntral handle model alignments and regional hosting.
              </p>
              <div style={{ display: 'flex', gap: '25px', marginTop: '30px' }}>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-display)' }}>10x</div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--muted-color)' }}>Faster Prototyping</span>
                </div>
                <div style={{ borderLeft: '1px solid rgba(255,255,255,0.08)', paddingLeft: '25px' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-display)' }}>42ms</div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--muted-color)' }}>Avg Node Latency</span>
                </div>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '30px', background: 'rgba(5, 5, 12, 0.5)' }}>
              <div style={{ display: 'flex', gap: '6px', marginBottom: '15px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#6b7280' }}></span>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#9ca3af' }}></span>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#d1d5db' }}></span>
              </div>
              <h4 style={{ fontSize: '0.9rem', color: '#fff', fontFamily: 'monospace', marginBottom: '15px' }}>zyntral.config.yaml</h4>
              <pre style={{ fontSize: '0.8rem', color: 'var(--muted-color)', overflowX: 'auto', fontFamily: 'monospace', lineHeight: '1.6' }}>
{`compiler:
  engine: knowledge-v2
  embeddings: BGE-M3
  reranker: cohere-v3
  vector_db:
    provider: pinecone
    index: zyntral-fleet
runtime:
  region: us-east
  nodes: 4
  autoscaling: true`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* 3. How It Works */}
      <section style={{ padding: '100px 0', background: 'rgba(5, 5, 8, 0.4)', borderTop: '1px solid rgba(255, 255, 255, 0.03)' }}>
        <div className="container" style={{ position: 'relative', zIndex: 5 }}>
          <div className="section-header">
            <span className="badge badge-cyan" style={{ marginBottom: '10px' }}>Workflow Path</span>
            <h2 style={{ fontSize: '2.5rem' }}>How It Works</h2>
            <p style={{ color: 'var(--muted-color)', marginTop: '10px' }}>
              Three steps from natural language prompts to live serverless agent nodes.
            </p>
          </div>

          <div className="grid-pillars">
            <div className="glass-card">
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', fontWeight: 800, color: '#fff' }}>
                1
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>Describe Requirements</h3>
              <p style={{ color: 'var(--muted-color)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Input your RAG index schemas, tool requirements, and agent negotiation policies in high-level prompts.
              </p>
            </div>

            <div className="glass-card">
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', fontWeight: 800, color: '#fff' }}>
                2
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>Compile Infrastructure</h3>
              <p style={{ color: 'var(--muted-color)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Zyntral compilers automatically generate vector database drivers, setup custom LoRA training layers, and build execution parameters.
              </p>
            </div>

            <div className="glass-card">
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', fontWeight: 800, color: '#fff' }}>
                3
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>Deploy to Edge</h3>
              <p style={{ color: 'var(--muted-color)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Package nodes deploy instantly across GPU clusters. Manage real-time data flow, latencies, and active agent threads.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Modules */}
      <section style={{ padding: '100px 0', borderTop: '1px solid rgba(255, 255, 255, 0.03)' }}>
        <div className="container" style={{ position: 'relative', zIndex: 5 }}>
          <div className="section-header">
            <span className="badge badge-purple" style={{ marginBottom: '10px' }}>Architecture Pillars</span>
            <h2 style={{ fontSize: '2.5rem' }}>Core System Engines</h2>
            <p style={{ color: 'var(--muted-color)', marginTop: '10px' }}>
              The five core components powering the Zyntral generative infrastructure.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '20px' }}>
            {[
              { title: 'Agent Engine', desc: 'Decentralized multi-agent coordinator nodes.', path: '/platform/agent-engine', icon: Cpu },
              { title: 'Knowledge Engine', desc: 'Prompt-to-RAG compilation with live indexes.', path: '/platform/knowledge-engine', icon: Database },
              { title: 'Workflow Engine', desc: 'Automated LoRA and DPO fine-tuning setups.', path: '/platform/workflow-engine', icon: Zap },
              { title: 'Deployment Engine', desc: 'Secure GPU regional deployment logs.', path: '/platform/deployment-engine', icon: Shield }
            ].map((module, idx) => {
              const Icon = module.icon;
              return (
                <Link key={idx} to={module.path} style={{ textDecoration: 'none' }}>
                  <div className="glass-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '25px' }}>
                    <div>
                      <Icon size={20} style={{ color: 'var(--muted-color)', marginBottom: '15px' }} />
                      <h3 style={{ fontSize: '1.15rem', color: '#fff', marginBottom: '8px' }}>{module.title}</h3>
                      <p style={{ color: 'var(--muted-color)', fontSize: '0.85rem', lineHeight: '1.5' }}>{module.desc}</p>
                    </div>
                    <span style={{ fontSize: '0.8rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '15px' }}>
                      Configure <ChevronRight size={12} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Industries */}
      <section style={{ padding: '100px 0', borderTop: '1px solid rgba(255, 255, 255, 0.03)', background: 'rgba(5, 5, 8, 0.2)' }}>
        <div className="container" style={{ position: 'relative', zIndex: 5 }}>
          <div className="section-header">
            <span className="badge badge-cyan" style={{ marginBottom: '10px' }}>Target Industries</span>
            <h2 style={{ fontSize: '2.5rem' }}>Where We Deploy</h2>
            <p style={{ color: 'var(--muted-color)', marginTop: '10px' }}>
              Optimizing complex physical systems and business databases with custom AI designs.
            </p>
          </div>

          <div className="grid-pillars">
            <div className="glass-card">
              <div className="card-icon-wrapper" style={{ marginBottom: '20px', color: '#e5e7eb' }}>
                <Globe size={24} />
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '12px' }}>🚚 Logistics Intelligence</h3>
              <p style={{ color: 'var(--muted-color)', fontSize: '0.95rem', lineHeight: '1.7' }}>
                Predictive logistics, dynamic route optimizations, fleet scheduling, and carrier communication loops.
              </p>
            </div>

            <div className="glass-card">
              <div className="card-icon-wrapper" style={{ marginBottom: '20px', color: '#d1d5db' }}>
                <Terminal size={24} />
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '12px' }}>📦 Supply Chain AI</h3>
              <p style={{ color: 'var(--muted-color)', fontSize: '0.95rem', lineHeight: '1.7' }}>
                Inventory forecasting, supply chain audits, automated vendor query processors, and procurement optimizations.
              </p>
            </div>

            <div className="glass-card">
              <div className="card-icon-wrapper" style={{ marginBottom: '20px', color: '#9ca3af' }}>
                <Award size={24} />
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '12px' }}>🏆 Sports Intelligence</h3>
              <p style={{ color: 'var(--muted-color)', fontSize: '0.95rem', lineHeight: '1.7' }}>
                Performance analytics, team selection modeling, athlete diagnostics, and predictive strategic outcomes.
              </p>
            </div>

            <div className="glass-card">
              <div className="card-icon-wrapper" style={{ marginBottom: '20px', color: 'var(--green)' }}>
                <Shield size={24} />
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '12px' }}>🤖 Enterprise AI</h3>
              <p style={{ color: 'var(--muted-color)', fontSize: '0.95rem', lineHeight: '1.7' }}>
                Custom prompt-to-RAG compilation, fine-tune dashboards, secure data storage, and legacy ERP bridges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Vision Statement */}
      <section style={{ padding: '100px 0', position: 'relative', background: 'rgba(5, 5, 8, 0.4)', borderTop: '1px solid rgba(255, 255, 255, 0.03)' }}>
        <div className="container" style={{ textAlign: 'center', zIndex: 5, position: 'relative' }}>
          <span className="badge badge-cyan" style={{ marginBottom: '15px' }}>Core Philosophy</span>
          <h2 style={{ fontSize: '2rem', marginBottom: '25px', fontFamily: 'var(--font-display)' }}>Our Vision</h2>
          <p style={{ fontSize: '1.4rem', color: '#e5e7eb', maxWidth: '900px', margin: '0 auto', lineHeight: '1.8', fontStyle: 'italic', fontWeight: 300 }}>
            "We believe AI should not simply generate static text content. It should drive operational decisions, optimize complex physical systems, automate work loops, and create measurable economic impact."
          </p>
        </div>
      </section>

      {/* 7. Roadmap Preview */}
      <section style={{ padding: '100px 0', borderTop: '1px solid rgba(255, 255, 255, 0.03)' }}>
        <div className="container" style={{ position: 'relative', zIndex: 5 }}>
          <div className="grid-halves">
            <div>
              <span className="badge badge-cyan" style={{ marginBottom: '10px' }}>Launch Timeline</span>
              <h2 style={{ fontSize: '2rem', marginBottom: '15px' }}>Roadmap Preview</h2>
              <p style={{ color: 'var(--muted-color)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '25px' }}>
                Zyntral is currently operating in Phase 2: Local Orchestrators. We are testing local consensus mechanisms and edge GPU nodes ahead of our private developer beta release.
              </p>
              <Link to="/roadmap" className="btn-secondary" style={{ padding: '10px 24px', fontSize: '0.9rem' }}>
                View Full Roadmap <ArrowRight size={14} />
              </Link>
            </div>

            {/* Timer Grid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
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
                      padding: '15px 20px', 
                      minWidth: '75px',
                      borderColor: 'rgba(255, 255, 255, 0.08)',
                      background: 'rgba(10, 10, 18, 0.6)',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: '#ffffff' }}>
                      {String(time.val).padStart(2, '0')}
                    </div>
                    <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--muted-color)', marginTop: '3px', display: 'block' }}>
                      {time.label}
                    </span>
                  </div>
                ))}
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--muted-color)', textAlign: 'center' }}>Estimated Private Beta Launch</span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Waitlist CTA */}
      <section style={{ padding: '100px 0', borderTop: '1px solid rgba(255, 255, 255, 0.03)', background: 'rgba(5, 5, 12, 0.6)' }}>
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 5 }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '15px' }}>Obtain Developer Beta Access</h2>
            <p style={{ color: 'var(--muted-color)', marginBottom: '30px', fontSize: '0.95rem', lineHeight: '1.6' }}>
              Register your team or project to receive sandbox developer credentials and start compiling prompt-to-RAG architectures.
            </p>
            <Link to="/waitlist" className="btn-primary" style={{ padding: '14px 40px' }}>
              Apply For Waitlist <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
