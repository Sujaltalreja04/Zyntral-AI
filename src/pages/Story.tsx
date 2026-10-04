import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ExternalLink, Mail, Zap, Shield, Code2,
  Layers, Terminal, Sparkles, ChevronRight
} from 'lucide-react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { SEO } from '../components/SEO';
import logoImg from '../assets/Zyntral LOGO REAL.jpg';


/* ─── tiny animated counter hook ─── */
function useCounter(target: number, duration = 1600) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      obs.disconnect();
      let start: number | null = null;
      const step = (ts: number) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / duration, 1);
        setVal(Math.floor(p * target));
        if (p < 1) requestAnimationFrame(step);
        else setVal(target);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);
  return { val, ref };
}

/* ─── Typewriter component ─── */
function Typewriter({ lines }: { lines: string[] }) {
  const [displayed, setDisplayed] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);

  useEffect(() => {
    setDisplayed([]);
    setCurrentLine(0);
    setCurrentChar(0);
  }, [lines]);

  useEffect(() => {
    if (currentLine >= lines.length) return;
    if (currentChar < lines[currentLine].length) {
      const t = setTimeout(() => setCurrentChar(c => c + 1), 20);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setDisplayed(d => [...d, lines[currentLine]]);
        setCurrentLine(l => l + 1);
        setCurrentChar(0);
      }, 160);
      return () => clearTimeout(t);
    }
  }, [currentLine, currentChar, lines]);

  return (
    <div style={{ fontFamily: '"Fira Code", "JetBrains Mono", monospace', fontSize: '0.83rem', lineHeight: 1.8 }}>
      {displayed.map((line, i) => (
        <div key={i} style={{ color: line.startsWith('✓') ? '#4ade80' : '#94a3b8' }}>
          {line}
        </div>
      ))}
      {currentLine < lines.length && (
        <div style={{ color: '#cbd5e1' }}>
          {lines[currentLine].slice(0, currentChar)}
          <span style={{ animation: 'blink 1s step-end infinite', color: '#4ade80' }}>▋</span>
        </div>
      )}
    </div>
  );
}

export const Story: React.FC = () => {
  const dbFounder = useQuery(api.about.getFounder);
  const founderImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTADu7BXxQ1fewdgYcgyu7bPqGlf650HfMQZRxhR0SCLg&s=10';

  const [activeTab, setActiveTab] = useState<'rag' | 'agent' | 'infra'>('rag');
  const [demoRunning, setDemoRunning] = useState(false);
  const [demoKey, setDemoKey] = useState(0);

  const DEMOS = {
    rag: {
      label: 'RAG Pipeline',
      icon: Layers,
      color: '#4ade80',
      spec: 'Hybrid pgvector + Qdrant index, multi-tenant auth, semantic reranker',
      lines: [
        '$ zyntral compile --spec "enterprise-rag" --env production',
        '[→] Parsing architectural directive...',
        '[→] AST synthesis: pgvector hybrid search pipeline OK',
        '[→] Qdrant collection schema (dim: 1536, metric: cosine)',
        '[→] Multi-tenant row-level security applied',
        '[→] Reranker: cross-encoder/ms-marco-MiniLM-L-6-v2',
        '✓  Build complete — 0 errors — 180ms total latency',
      ],
    },
    agent: {
      label: 'Agent Swarm',
      icon: Sparkles,
      color: '#a78bfa',
      spec: 'Orchestrate AutoDev Pro + SecOps Sentinel, sub-180ms tool sandbox',
      lines: [
        '$ zyntral agent spawn --fleet autodev,secops',
        '[→] Initialising agent coordination cluster...',
        '[→] AutoDev Pro containerised — isolated Git workspace',
        '[→] SecOps Sentinel loaded (OWASP Top 10 + CVE scanner)',
        '[→] IPC memory bus via Convex cloud sync established',
        '✓  2 autonomous agents active — HEALTHY & LISTENING',
      ],
    },
    infra: {
      label: 'Cloud IaC',
      icon: Terminal,
      color: '#38bdf8',
      spec: 'Terraform + Docker Compose for AWS ECS Fargate + Redis',
      lines: [
        '$ zyntral infra generate --target aws-ecs --cache redis',
        '[→] Ingesting cloud deployment constraints...',
        '[→] Terraform plan: 14 AWS resources declared',
        '[→] Redis cluster v7.2 with read replicas provisioned',
        '[→] TLS 1.3 endpoints hardened, rate-limiting applied',
        '✓  Infrastructure blueprint compiled — zero-downtime rollout',
      ],
    },
  };

  const runDemo = (tab: 'rag' | 'agent' | 'infra') => {
    setActiveTab(tab);
    setDemoRunning(false);
    setTimeout(() => { setDemoKey(k => k + 1); setDemoRunning(true); }, 80);
  };

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'Zyntral AI — Origin & Founder',
    description: 'How Zyntral AI was conceived and built by solo founder Sujal K Talreja.',
    url: 'https://www.zyntral.dev/about',
  };

  const { val: agentCount, ref: agentRef } = useCounter(40);
  const { val: devCount, ref: devRef } = useCounter(2800);
  const { val: latency, ref: latRef } = useCounter(180);

  return (
    <>
      <SEO
        title="Our Story & Founder | Zyntral AI"
        description="How Sujal K Talreja built Zyntral AI — an on-prompt AI compiler and autonomous agent marketplace — from scratch as a solo engineer."
        path="/about"
        keywords={['Sujal K Talreja', 'Zyntral AI Story', 'About Zyntral AI', 'Founder', 'On-Prompt Compiler']}
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Our Story', path: '/about' }]}
        schema={structuredData}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@700;800;900&family=Fira+Code:wght@400;500&display=swap');
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse-dot { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.6);opacity:.5} }
        @keyframes orbit { from{transform:rotate(0deg) translateX(72px) rotate(0deg)} to{transform:rotate(360deg) translateX(72px) rotate(-360deg)} }

        .story-root {
          font-family:'Inter',sans-serif;
          background:#070910;
          min-height:100vh;
          padding-top:100px;
          padding-bottom:100px;
          color:#f1f5f9;
        }
        .story-fadein { animation: fadeUp .7s ease both; }
        .tab-btn { cursor:pointer; border:none; outline:none; transition:all .2s; }
        .tab-btn:hover { opacity:.85; }
        .stat-card { transition:transform .2s, box-shadow .2s; }
        .stat-card:hover { transform:translateY(-5px); box-shadow:0 20px 60px rgba(0,0,0,.5)!important; }
        .tl-card { transition:border-color .25s, box-shadow .25s; }
        .tl-card:hover { border-color:rgba(74,222,128,.3)!important; box-shadow:0 10px 40px rgba(74,222,128,.05)!important; }
        .pillar-card { transition:all .2s; }
        .pillar-card:hover { transform:translateY(-6px); background:rgba(255,255,255,.04)!important; border-color:rgba(74,222,128,.28)!important; }
        .cta-primary { transition:all .25s; }
        .cta-primary:hover { transform:translateY(-2px); box-shadow:0 0 44px rgba(74,222,128,.55)!important; }
        .cta-ghost { transition:all .25s; }
        .cta-ghost:hover { background:rgba(255,255,255,.07)!important; transform:translateY(-2px); }
        @media(max-width:800px){
          .founder-inner { grid-template-columns:1fr!important; }
          .stats-row { grid-template-columns:1fr 1fr!important; }
        }
        @media(max-width:520px){
          .stats-row { grid-template-columns:1fr!important; }
          .agents-grid { grid-template-columns:1fr!important; }
        }
      `}</style>

      <div className="story-root">
        <div style={{ maxWidth:1120, margin:'0 auto', padding:'0 22px', display:'flex', flexDirection:'column', gap:88 }}>

          {/* ══════════ HERO ══════════ */}
          <section className="story-fadein" style={{ textAlign:'center', position:'relative' }}>
            <div style={{ position:'absolute', top:'-100px', left:'50%', transform:'translateX(-50%)', width:600, height:340, background:'radial-gradient(ellipse,rgba(74,222,128,.1) 0%,transparent 70%)', pointerEvents:'none', filter:'blur(50px)' }} />

            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(74,222,128,.06)', border:'1px solid rgba(74,222,128,.18)', padding:'6px 18px', borderRadius:999, marginBottom:28, fontSize:'.7rem', fontWeight:700, letterSpacing:'1.5px', color:'#4ade80', textTransform:'uppercase' }}>
              <img src={logoImg} alt="Zyntral" style={{ width:15, height:15, borderRadius:3 }} />
              Origin Story
            </div>

            <h1 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'clamp(2.6rem,6vw,5rem)', fontWeight:900, lineHeight:1.07, letterSpacing:'-2.5px', marginBottom:24, color:'#ffffff' }}>
              One Engineer.<br />
              <span style={{ background:'linear-gradient(105deg,#4ade80 0%,#86efac 45%,#fff 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                One Conviction.
              </span>
            </h1>

            <p style={{ fontSize:'1.1rem', color:'#7c8fa8', lineHeight:1.8, maxWidth:620, margin:'0 auto 40px', fontWeight:400 }}>
              Zyntral AI wasn't born in a boardroom. It grew out of a real frustration with how broken AI infrastructure development had become — and an unshakeable belief that developers deserve something radically better.
            </p>

            <div style={{ display:'flex', justifyContent:'center', gap:12, flexWrap:'wrap' }}>
              <Link to="/marketplace" className="cta-primary" style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#4ade80', color:'#030805', padding:'11px 26px', borderRadius:10, fontWeight:700, fontSize:'.9rem', textDecoration:'none', boxShadow:'0 0 30px rgba(74,222,128,.28)' }}>
                Explore the Platform <ArrowRight size={15} />
              </Link>
              <Link to="/contact" className="cta-ghost" style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.1)', color:'#e2e8f0', padding:'11px 24px', borderRadius:10, fontWeight:600, fontSize:'.9rem', textDecoration:'none' }}>
                Talk to Sujal
              </Link>
            </div>
          </section>

          {/* ══════════ STATS ══════════ */}
          <section>
            <div className="stats-row" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:18 }}>
              {([
                { ref: agentRef, val: agentCount, suffix:'+', label:'Autonomous Agents', sub:'live in marketplace' },
                { ref: devRef,   val: devCount,   suffix:'+', label:'Developer Sessions', sub:'on the platform' },
                { ref: latRef,   val: latency,    suffix:'ms', label:'P99 Compile Latency', sub:'deterministic SLA' },
              ] as { ref: React.RefObject<HTMLDivElement>, val: number, suffix: string, label: string, sub: string }[]).map((s,i) => (
                <div key={i} ref={s.ref} className="stat-card" style={{ background:'rgba(255,255,255,.022)', border:'1px solid rgba(255,255,255,.07)', borderRadius:20, padding:'30px 24px', textAlign:'center' }}>
                  <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'clamp(1.9rem,4vw,3.2rem)', fontWeight:900, color:'#fff', lineHeight:1 }}>
                    {s.val.toLocaleString()}<span style={{ color:'#4ade80' }}>{s.suffix}</span>
                  </div>
                  <div style={{ fontSize:'.88rem', fontWeight:700, color:'#e2e8f0', marginTop:10 }}>{s.label}</div>
                  <div style={{ fontSize:'.72rem', color:'#475569', marginTop:4 }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </section>

          {/* ══════════ FOUNDER SPOTLIGHT ══════════ */}
          <section>
            <div className="founder-inner" style={{ display:'grid', gridTemplateColumns:'300px 1fr', gap:40, alignItems:'start', background:'rgba(255,255,255,.018)', border:'1px solid rgba(255,255,255,.07)', borderRadius:26, padding:'44px 48px', position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', top:-60, right:-60, width:360, height:360, background:'radial-gradient(circle,rgba(74,222,128,.11) 0%,transparent 65%)', pointerEvents:'none', filter:'blur(32px)' }} />

              {/* Portrait */}
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', gap:16, position:'relative', zIndex:1 }}>
                <div style={{ position:'relative', width:148, height:148 }}>
                  <div style={{ position:'absolute', inset:-20, borderRadius:'50%', border:'1px dashed rgba(74,222,128,.2)' }} />
                  <div style={{ position:'absolute', top:'50%', left:'50%', marginTop:-72, marginLeft:-5 }}>
                    <div style={{ width:10, height:10, background:'#4ade80', borderRadius:'50%', animation:'orbit 7s linear infinite', boxShadow:'0 0 10px #4ade80' }} />
                  </div>
                  <img
                    src={founderImage}
                    alt="Sujal K Talreja — Founder of Zyntral AI"
                    style={{ width:'100%', height:'100%', objectFit:'cover', borderRadius:'50%', border:'3px solid rgba(74,222,128,.38)', boxShadow:'0 0 0 7px rgba(74,222,128,.07), 0 16px 48px rgba(0,0,0,.75)', display:'block' }}
                  />
                </div>
                <div>
                  <div style={{ fontSize:'1.4rem', fontWeight:800, color:'#fff', letterSpacing:'-.4px' }}>
                    {dbFounder?.name || 'Sujal K Talreja'}
                  </div>
                  <div style={{ fontSize:'.76rem', fontWeight:700, color:'#4ade80', letterSpacing:'1px', textTransform:'uppercase', marginTop:5 }}>
                    Founder · Owner · Lead Architect
                  </div>
                </div>
                <div style={{ display:'inline-flex', alignItems:'center', gap:7, background:'rgba(74,222,128,.07)', border:'1px solid rgba(74,222,128,.18)', padding:'5px 14px', borderRadius:999, fontSize:'.7rem', color:'#f1f5f9', fontWeight:600 }}>
                  <div style={{ width:7, height:7, borderRadius:'50%', background:'#4ade80', animation:'pulse-dot 2.2s ease-in-out infinite' }} />
                  Building in public · Solo dev
                </div>
                <div style={{ display:'flex', gap:10, marginTop:4 }}>
                  <a href="https://github.com/Sujaltalreja04" target="_blank" rel="noopener noreferrer"
                    style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:'.76rem', color:'#94a3b8', textDecoration:'none', background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.08)', padding:'6px 14px', borderRadius:8, transition:'all .2s' }}
                    onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.color='#fff'; (e.currentTarget as HTMLElement).style.borderColor='rgba(255,255,255,.2)';}}
                    onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.color='#94a3b8'; (e.currentTarget as HTMLElement).style.borderColor='rgba(255,255,255,.08)';}}
                  >
                    <ExternalLink size={13} /> GitHub
                  </a>
                  <Link to="/contact" style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:'.76rem', color:'#4ade80', textDecoration:'none', background:'rgba(74,222,128,.07)', border:'1px solid rgba(74,222,128,.2)', padding:'6px 14px', borderRadius:8 }}>
                    <Mail size={13} /> Message
                  </Link>
                </div>
              </div>

              {/* Right copy */}
              <div style={{ display:'flex', flexDirection:'column', gap:24, position:'relative', zIndex:1 }}>
                <div style={{ fontSize:'.7rem', fontWeight:800, color:'#4ade80', letterSpacing:'1.5px', textTransform:'uppercase' }}>The Core Conviction</div>
                <blockquote style={{ margin:0, borderLeft:'3px solid #4ade80', paddingLeft:22, fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'clamp(1.05rem,2.2vw,1.35rem)', fontWeight:700, lineHeight:1.58, color:'#ffffff', fontStyle:'normal' }}>
                  "{dbFounder?.mission || "AI infrastructure shouldn't be manual plumbing. You state your architectural intent — the compiler builds and validates the machine."}"
                </blockquote>
                <p style={{ color:'#7c8fa8', fontSize:'.96rem', lineHeight:1.8, margin:0 }}>
                  {dbFounder?.storyPara1 || 'Zyntral AI is 100% owned, directed, and engineered by Sujal K Talreja. No corporate committees, no investor roadmaps diluting the vision. Every feature ships because a developer needs it — not because a quarterly report demands it. That independence is a deliberate design decision, not a limitation.'}
                </p>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(170px,1fr))', gap:12, marginTop:4 }}>
                  {[
                    { icon:Shield,   title:'100% Sovereign',  sub:'Zero external ownership' },
                    { icon:Zap,      title:'Sub-180ms SLA',   sub:'Deterministic every time' },
                    { icon:Code2,    title:'AST Compiled',    sub:'No hallucinated APIs' },
                  ].map(({ icon:Icon, title, sub }, i) => (
                    <div key={i} style={{ background:'rgba(255,255,255,.025)', border:'1px solid rgba(255,255,255,.06)', borderRadius:14, padding:'13px 15px', display:'flex', alignItems:'center', gap:12 }}>
                      <div style={{ background:'rgba(74,222,128,.09)', borderRadius:9, padding:8, flexShrink:0 }}>
                        <Icon size={15} color="#4ade80" />
                      </div>
                      <div>
                        <div style={{ fontSize:'.82rem', fontWeight:700, color:'#fff' }}>{title}</div>
                        <div style={{ fontSize:'.68rem', color:'#475569', marginTop:2 }}>{sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ══════════ TIMELINE ══════════ */}
          <section>
            <div style={{ textAlign:'center', marginBottom:56 }}>
              <div style={{ fontSize:'.7rem', fontWeight:800, color:'#4ade80', letterSpacing:'1.5px', textTransform:'uppercase', marginBottom:12 }}>Chronology</div>
              <h2 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'clamp(1.8rem,4vw,2.8rem)', fontWeight:900, color:'#fff', letterSpacing:'-1px', margin:'0 0 14px' }}>
                How Zyntral Was Built
              </h2>
              <p style={{ color:'#475569', fontSize:'1rem', maxWidth:540, margin:'0 auto' }}>
                Four acts spanning from a broken AI stack to a sovereign engineering platform.
              </p>
            </div>

            <div style={{ position:'relative', paddingLeft:34 }}>
              <div style={{ position:'absolute', left:6, top:14, bottom:14, width:2, background:'linear-gradient(to bottom,#4ade80 0%,#16a34a 45%,rgba(255,255,255,.1) 85%,transparent 100%)', borderRadius:2 }} />

              <div style={{ display:'flex', flexDirection:'column', gap:24 }}>

                {/* ACT 01 */}
                <div style={{ position:'relative' }}>
                  <div style={{ position:'absolute', left:-27, top:22, width:13, height:13, borderRadius:'50%', background:'#4ade80', boxShadow:'0 0 14px #4ade80', border:'3px solid #070910' }} />
                  <div className="tl-card" style={{ background:'rgba(255,255,255,.018)', border:'1px solid rgba(255,255,255,.07)', borderRadius:22, padding:'30px 34px', display:'flex', flexDirection:'column', gap:18 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:10, flexWrap:'wrap' }}>
                      <span style={{ background:'rgba(74,222,128,.09)', color:'#4ade80', border:'1px solid rgba(74,222,128,.22)', padding:'3px 10px', borderRadius:6, fontSize:'.68rem', fontWeight:800, fontFamily:'monospace', letterSpacing:'.5px' }}>ACT 01 · EARLY 2024</span>
                    </div>
                    <h3 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'clamp(1.15rem,2.5vw,1.55rem)', fontWeight:800, color:'#fff', margin:0, letterSpacing:'-.3px' }}>The Broken Stack Problem</h3>
                    <p style={{ color:'#7c8fa8', fontSize:'.96rem', lineHeight:1.78, margin:0 }}>
                      Every enterprise RAG project required stitching 12+ libraries — chunkers, tokenizers, vector DBs, embedding APIs, Terraform configs. Developers spent weeks on glue code and months debugging production failures. This wasn't an AI problem; it was a tooling crisis.
                    </p>
                    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:14 }}>
                      <div style={{ background:'rgba(239,68,68,.04)', border:'1px solid rgba(239,68,68,.14)', borderRadius:14, padding:'18px 20px' }}>
                        <div style={{ fontSize:'.7rem', fontWeight:800, color:'#f87171', marginBottom:10, textTransform:'uppercase', letterSpacing:'.5px' }}>✕ Legacy Stack</div>
                        <ul style={{ margin:0, paddingLeft:18, color:'#94a3b8', fontSize:'.86rem', lineHeight:1.65 }}>
                          <li>12+ fragmented packages to manage</li>
                          <li>3–5 weeks to reach a working prototype</li>
                          <li>Unpredictable chunking errors in production</li>
                          <li>No unified type-safety or test coverage</li>
                        </ul>
                      </div>
                      <div style={{ background:'rgba(74,222,128,.04)', border:'1px solid rgba(74,222,128,.18)', borderRadius:14, padding:'18px 20px' }}>
                        <div style={{ fontSize:'.7rem', fontWeight:800, color:'#4ade80', marginBottom:10, textTransform:'uppercase', letterSpacing:'.5px' }}>✓ Zyntral Approach</div>
                        <ul style={{ margin:0, paddingLeft:18, color:'#e2e8f0', fontSize:'.86rem', lineHeight:1.65 }}>
                          <li>Single natural-language architectural prompt</li>
                          <li>Instant synthesis of schemas, vectors & APIs</li>
                          <li>180ms deterministic compilation time</li>
                          <li>Enterprise-ready out of the box</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ACT 02 */}
                <div style={{ position:'relative' }}>
                  <div style={{ position:'absolute', left:-27, top:22, width:13, height:13, borderRadius:'50%', background:'#4ade80', boxShadow:'0 0 14px #4ade80', border:'3px solid #070910' }} />
                  <div className="tl-card" style={{ background:'rgba(255,255,255,.018)', border:'1px solid rgba(255,255,255,.07)', borderRadius:22, padding:'30px 34px', display:'flex', flexDirection:'column', gap:18 }}>
                    <span style={{ background:'rgba(74,222,128,.09)', color:'#4ade80', border:'1px solid rgba(74,222,128,.22)', padding:'3px 10px', borderRadius:6, fontSize:'.68rem', fontWeight:800, fontFamily:'monospace', alignSelf:'flex-start' }}>ACT 02 · MID 2024</span>
                    <h3 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'clamp(1.15rem,2.5vw,1.55rem)', fontWeight:800, color:'#fff', margin:0, letterSpacing:'-.3px' }}>Engineering the On-Prompt Compiler</h3>
                    <p style={{ color:'#7c8fa8', fontSize:'.96rem', lineHeight:1.78, margin:0 }}>
                      Working alone, Sujal built the first functional AST compiler for AI infrastructure. Unlike LLM completions that hallucinate syntax, Zyntral compiles intent into deterministic, validated schemas — PostgreSQL tables with pgvector, Qdrant collections, and containerised API runtimes — verified at every layer.
                    </p>
                    <div style={{ background:'#040609', border:'1px solid rgba(74,222,128,.18)', borderRadius:14, padding:'20px 22px', fontFamily:'"Fira Code",monospace', fontSize:'.8rem', lineHeight:1.75 }}>
                      <div style={{ color:'#4ade80', marginBottom:8, fontWeight:600 }}>// ZYNTRAL COMPILER PIPELINE</div>
                      {[
                        '1. Directive → Lexical Tokenizer → Constraint Resolver',
                        '2. AST Synthesis → Deterministic Schema Validator',
                        '3. Code Generation → Type-Safe TS / Express Middleware',
                        '4. Verdict: 0 ERRORS · 180ms TOTAL LATENCY',
                      ].map((line, i) => (
                        <div key={i} style={{ color: i === 3 ? '#86efac' : '#64748b' }}>{line}</div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ACT 03 */}
                <div style={{ position:'relative' }}>
                  <div style={{ position:'absolute', left:-27, top:22, width:13, height:13, borderRadius:'50%', background:'#a78bfa', boxShadow:'0 0 14px #a78bfa', border:'3px solid #070910' }} />
                  <div className="tl-card" style={{ background:'rgba(255,255,255,.018)', border:'1px solid rgba(255,255,255,.07)', borderRadius:22, padding:'30px 34px', display:'flex', flexDirection:'column', gap:18 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:10, flexWrap:'wrap' }}>
                      <span style={{ background:'rgba(167,139,250,.09)', color:'#a78bfa', border:'1px solid rgba(167,139,250,.22)', padding:'3px 10px', borderRadius:6, fontSize:'.68rem', fontWeight:800, fontFamily:'monospace', alignSelf:'flex-start' }}>ACT 03 · 2025</span>
                      <span style={{ display:'inline-flex', alignItems:'center', gap:5, fontSize:'.68rem', fontWeight:700, color:'#a78bfa' }}>
                        <div style={{ width:6, height:6, borderRadius:'50%', background:'#a78bfa', animation:'pulse-dot 2s ease-in-out infinite' }} />
                        LIVE ECOSYSTEM
                      </span>
                    </div>
                    <h3 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'clamp(1.15rem,2.5vw,1.55rem)', fontWeight:800, color:'#fff', margin:0, letterSpacing:'-.3px' }}>The Autonomous Agent Marketplace</h3>
                    <p style={{ color:'#7c8fa8', fontSize:'.96rem', lineHeight:1.78, margin:0 }}>
                      Retrieval without execution is only half the paradigm. Sujal designed and launched the Zyntral Agent Marketplace — production-hardened autonomous agents that run directly on compiled RAG infrastructure, with isolated sandboxing and real-time telemetry.
                    </p>
                    <div className="agents-grid" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(210px,1fr))', gap:12 }}>
                      {[
                        { name:'AutoDev Pro',      role:'Full-stack code engineering & refactor',         icon:Code2 },
                        { name:'SecOps Sentinel',  role:'Continuous CVE + auth vulnerability patching',   icon:Shield },
                        { name:'SupportBot Elite', role:'Sub-180ms semantic customer triage',             icon:Zap },
                        { name:'GrowthHacker AI',  role:'Autonomous ad & retention optimisation',         icon:Sparkles },
                      ].map(({ name, role, icon:Icon }, i) => (
                        <div key={i} style={{ background:'rgba(167,139,250,.04)', border:'1px solid rgba(167,139,250,.12)', borderRadius:12, padding:'14px 16px', display:'flex', alignItems:'center', gap:12 }}>
                          <div style={{ background:'rgba(167,139,250,.1)', borderRadius:8, padding:7, flexShrink:0 }}>
                            <Icon size={15} color="#a78bfa" />
                          </div>
                          <div>
                            <div style={{ fontSize:'.83rem', fontWeight:700, color:'#fff' }}>{name}</div>
                            <div style={{ fontSize:'.69rem', color:'#475569', marginTop:2 }}>{role}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ACT 04 */}
                <div style={{ position:'relative' }}>
                  <div style={{ position:'absolute', left:-27, top:22, width:13, height:13, borderRadius:'50%', background:'#f8fafc', boxShadow:'0 0 14px rgba(248,250,252,.6)', border:'3px solid #070910' }} />
                  <div className="tl-card" style={{ background:'rgba(255,255,255,.018)', border:'1px solid rgba(255,255,255,.07)', borderRadius:22, padding:'30px 34px', display:'flex', flexDirection:'column', gap:18 }}>
                    <span style={{ background:'rgba(255,255,255,.06)', color:'#f8fafc', border:'1px solid rgba(255,255,255,.12)', padding:'3px 10px', borderRadius:6, fontSize:'.68rem', fontWeight:800, fontFamily:'monospace', alignSelf:'flex-start' }}>ACT 04 · 2026 & BEYOND</span>
                    <h3 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'clamp(1.15rem,2.5vw,1.55rem)', fontWeight:800, color:'#fff', margin:0, letterSpacing:'-.3px' }}>Sovereign Horizon</h3>
                    <p style={{ color:'#7c8fa8', fontSize:'.96rem', lineHeight:1.78, margin:0 }}>
                      Today Zyntral AI is fiercely independent. Sujal continues all core engineering — building toward a distributed edge network where LoRA fine-tuning and agent inference run across regional peer nodes, bringing enterprise-grade AI at a fraction of hyperscaler cost.
                    </p>
                    <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
                      {['Zero venture red tape', '100% developer-centric', 'Continuous daily deployments', 'Open roadmap'].map((c, i) => (
                        <span key={i} style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:'.78rem', color:'#cbd5e1', background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.08)', padding:'5px 13px', borderRadius:999 }}>
                          <span style={{ color:'#4ade80' }}>✓</span> {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* ══════════ LIVE TERMINAL DEMO ══════════ */}
          <section>
            <div style={{ background:'rgba(4,6,10,.9)', border:'1px solid rgba(74,222,128,.18)', borderRadius:24, overflow:'hidden', boxShadow:'0 24px 72px rgba(0,0,0,.55)' }}>
              <div style={{ padding:'20px 28px', borderBottom:'1px solid rgba(255,255,255,.06)', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
                <div>
                  <div style={{ fontSize:'.68rem', fontWeight:800, color:'#4ade80', letterSpacing:'1.3px', textTransform:'uppercase', marginBottom:4 }}>Interactive Demo</div>
                  <div style={{ fontSize:'1.2rem', fontWeight:800, color:'#fff' }}>Compiler in Action</div>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:'.7rem', fontFamily:'monospace', color:'#4ade80', fontWeight:700 }}>
                  <div style={{ width:7, height:7, borderRadius:'50%', background:'#4ade80', animation:'pulse-dot 2.2s ease-in-out infinite' }} /> ENGINE READY
                </div>
              </div>

              <div style={{ display:'flex', borderBottom:'1px solid rgba(255,255,255,.06)', padding:'0 10px' }}>
                {(['rag','agent','infra'] as const).map(tab => {
                  const d = DEMOS[tab];
                  const active = activeTab === tab;
                  return (
                    <button key={tab} className="tab-btn" onClick={() => runDemo(tab)} style={{ display:'flex', alignItems:'center', gap:7, padding:'13px 18px', background:'none', borderBottom: active ? `2px solid ${d.color}` : '2px solid transparent', color: active ? d.color : '#475569', fontSize:'.8rem', fontWeight: active ? 700 : 500 }}>
                      <d.icon size={13} />{d.label}
                    </button>
                  );
                })}
              </div>

              <div style={{ padding:'22px 28px', minHeight:210 }}>
                <div style={{ fontSize:'.7rem', color:'#334155', fontFamily:'monospace', marginBottom:14 }}>▸ {DEMOS[activeTab].spec}</div>
                {demoRunning ? (
                  <Typewriter key={`${activeTab}-${demoKey}`} lines={DEMOS[activeTab].lines} />
                ) : (
                  <div style={{ display:'flex', flexDirection:'column', gap:12, alignItems:'flex-start' }}>
                    <div style={{ fontSize:'.83rem', color:'#334155', fontFamily:'monospace' }}>Select a scenario above to run the compiler live ↑</div>
                    <button className="tab-btn" onClick={() => runDemo(activeTab)} style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(74,222,128,.08)', border:'1px solid rgba(74,222,128,.22)', color:'#4ade80', padding:'8px 18px', borderRadius:8, fontSize:'.82rem', fontWeight:700 }}>
                      <Zap size={13} /> Run Demo
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* ══════════ PILLARS ══════════ */}
          <section>
            <div style={{ textAlign:'center', marginBottom:48 }}>
              <div style={{ fontSize:'.7rem', fontWeight:800, color:'#4ade80', letterSpacing:'1.5px', textTransform:'uppercase', marginBottom:12 }}>Architecture</div>
              <h2 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'clamp(1.8rem,4vw,2.8rem)', fontWeight:900, color:'#fff', letterSpacing:'-1px', margin:0 }}>
                Built on Different Principles
              </h2>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:18 }}>
              {[
                { num:'01', icon:Code2,    title:'Zero Glue Code',           desc:'State your requirements once. The compiler instantiates full infrastructure — no manual connector loops or brittle wrapper scripts.' },
                { num:'02', icon:Shield,   title:'Mathematical Determinism', desc:'Multi-pass AST synthesis delivers consistent, type-safe infrastructure on every compile. No hallucinations. No surprises.' },
                { num:'03', icon:Zap,      title:'Sub-180ms P99 Latency',    desc:'Optimised TypeScript with C++ acceleration for real-time enterprise response SLAs at any scale.' },
                { num:'04', icon:Terminal, title:'Direct Architect Access',   desc:'Sovereign and operated by Sujal. No sales calls, no committee approval — work directly with the person who built it.' },
              ].map(({ num, icon:Icon, title, desc }, i) => (
                <div key={i} className="pillar-card" style={{ background:'rgba(255,255,255,.02)', border:'1px solid rgba(255,255,255,.07)', borderRadius:20, padding:'26px 24px', display:'flex', flexDirection:'column', gap:13 }}>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                    <div style={{ background:'rgba(74,222,128,.08)', borderRadius:10, padding:9 }}>
                      <Icon size={16} color="#4ade80" />
                    </div>
                    <span style={{ fontFamily:'monospace', fontSize:'.76rem', fontWeight:900, color:'rgba(74,222,128,.28)', letterSpacing:'1px' }}>{num}</span>
                  </div>
                  <h3 style={{ fontSize:'1.02rem', fontWeight:800, color:'#fff', margin:0 }}>{title}</h3>
                  <p style={{ fontSize:'.87rem', color:'#475569', lineHeight:1.67, margin:0 }}>{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ══════════ CTA ══════════ */}
          <section>
            <div style={{ background:'linear-gradient(135deg,rgba(74,222,128,.07) 0%,rgba(255,255,255,.015) 100%)', border:'1px solid rgba(74,222,128,.2)', borderRadius:28, padding:'54px 44px', textAlign:'center', position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', top:'-70px', left:'50%', transform:'translateX(-50%)', width:500, height:260, background:'radial-gradient(ellipse,rgba(74,222,128,.09) 0%,transparent 70%)', pointerEvents:'none', filter:'blur(36px)' }} />
              <div style={{ position:'relative', zIndex:1 }}>
                <h2 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'clamp(1.8rem,4vw,2.7rem)', fontWeight:900, color:'#fff', letterSpacing:'-1px', marginBottom:14 }}>
                  Ready to Build Without Limits?
                </h2>
                <p style={{ color:'#7c8fa8', fontSize:'1.04rem', maxWidth:560, margin:'0 auto 32px', lineHeight:1.72 }}>
                  Explore the autonomous agent marketplace or open the developer console and compile your first AI infrastructure in under 3 seconds.
                </p>
                <div style={{ display:'flex', justifyContent:'center', gap:14, flexWrap:'wrap' }}>
                  <Link to="/marketplace" className="cta-primary" style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#4ade80', color:'#030805', padding:'12px 28px', borderRadius:11, fontWeight:700, fontSize:'.92rem', textDecoration:'none', boxShadow:'0 0 32px rgba(74,222,128,.32)' }}>
                    Explore Agent Marketplace <ChevronRight size={16} />
                  </Link>
                  <Link to="/workspace" className="cta-ghost" style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.1)', color:'#e2e8f0', padding:'12px 26px', borderRadius:11, fontWeight:600, fontSize:'.92rem', textDecoration:'none' }}>
                    Open Developer Console
                  </Link>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </>
  );
};

export default Story;


