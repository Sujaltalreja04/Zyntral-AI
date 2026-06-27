import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { 
  ArrowRight, Settings, Database, Shield, Cpu
} from 'lucide-react';
import logoImg from '../assets/Zyntral LOGO REAL.jpg';

interface SimulatorQuery {
  title: string;
  query: string;
  logs: string[];
}

// Animated Green/Silver System Flow Schematic (Replaces 3D)
const CompilerSchematic: React.FC<{ isQuerying: boolean }> = ({ isQuerying }) => {
  return (
    <div style={{
      width: '100%',
      height: '350px',
      border: '1px solid rgba(34, 197, 94, 0.15)',
      background: 'rgba(5, 5, 8, 0.85)',
      borderRadius: '20px',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 15px 30px rgba(0,0,0,0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Laser scanning line overlay */}
      {isQuerying && (
        <div style={{
          position: 'absolute',
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #22c55e, transparent)',
          boxShadow: '0 0 8px #22c55e, 0 0 15px #22c55e',
          animation: 'scannerSweep 2s linear infinite',
          zIndex: 5
        }} />
      )}

      {/* SVG System Architecture Connections */}
      <svg width="100%" height="100%" viewBox="0 0 450 320" style={{ position: 'absolute' }}>
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#22c55e" />
          </marker>
          <marker id="arrow-grey" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#4b5563" />
          </marker>
        </defs>

        {/* Links from Prompt input to Central Core */}
        <line x1="80" y1="160" x2="190" y2="160" stroke={isQuerying ? "#22c55e" : "#4b5563"} strokeWidth="1.5" strokeDasharray={isQuerying ? "4,4" : "none"} markerEnd={isQuerying ? "url(#arrow)" : "url(#arrow-grey)"} style={{ animation: isQuerying ? 'dashFlow 10s linear infinite' : 'none' }} />

        {/* Links radiating from Core to Sub-nodes */}
        <path d="M 230 130 C 230 90, 310 70, 340 70" fill="none" stroke={isQuerying ? "#22c55e" : "#4b5563"} strokeWidth="1.5" strokeDasharray={isQuerying ? "4,4" : "none"} markerEnd={isQuerying ? "url(#arrow)" : "url(#arrow-grey)"} />
        <path d="M 245 160 C 290 160, 310 130, 340 130" fill="none" stroke={isQuerying ? "#22c55e" : "#4b5563"} strokeWidth="1.5" strokeDasharray={isQuerying ? "4,4" : "none"} markerEnd={isQuerying ? "url(#arrow)" : "url(#arrow-grey)"} />
        <path d="M 245 170 C 290 170, 310 200, 340 200" fill="none" stroke={isQuerying ? "#22c55e" : "#4b5563"} strokeWidth="1.5" strokeDasharray={isQuerying ? "4,4" : "none"} markerEnd={isQuerying ? "url(#arrow)" : "url(#arrow-grey)"} />
        <path d="M 230 200 C 230 240, 310 260, 340 260" fill="none" stroke={isQuerying ? "#22c55e" : "#4b5563"} strokeWidth="1.5" strokeDasharray={isQuerying ? "4,4" : "none"} markerEnd={isQuerying ? "url(#arrow)" : "url(#arrow-grey)"} />

        {/* LEFT NODE: Prompt Directive */}
        <g transform="translate(10, 125)">
          <rect x="0" y="0" width="100" height="70" rx="10" fill="rgba(15, 15, 15, 0.9)" stroke={isQuerying ? "#22c55e" : "#3f3f46"} strokeWidth="1.5" />
          <text x="50" y="28" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">PROMPT_SPEC</text>
          <text x="50" y="44" fill="#a1a1aa" fontSize="7.5" fontFamily="monospace" textAnchor="middle">
            {isQuerying ? "ACTIVE SCAN" : "AWAITING IN"}
          </text>
          <circle cx="50" cy="56" r="3.5" fill={isQuerying ? "#22c55e" : "#4b5563"} style={{ animation: isQuerying ? 'pulseIndicator 1s infinite' : 'none' }} />
        </g>

        {/* CENTRAL NODE: Zyntral Core Compiler */}
        <g transform="translate(180, 120)">
          <circle cx="40" cy="40" r="38" fill="rgba(20, 20, 20, 0.95)" stroke={isQuerying ? "#22c55e" : "#3f3f46"} strokeWidth="2" />
          <circle cx="40" cy="40" r="28" fill="none" stroke={isQuerying ? "#22c55e" : "#3f3f46"} strokeWidth="1" strokeDasharray="5,3" style={{ transformOrigin: '40px 40px', animation: 'slowRotate 20s linear infinite' }} />
          <text x="40" y="38" fill="#ffffff" fontSize="9.5" fontWeight="black" fontFamily="monospace" textAnchor="middle">ZYNTRAL</text>
          <text x="40" y="50" fill={isQuerying ? "#22c55e" : "#a1a1aa"} fontSize="7" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
            {isQuerying ? "COMPILING" : "KERNEL_IDLE"}
          </text>
        </g>

        {/* RIGHT TOP NODE: pgvector / SQL */}
        <g transform="translate(340, 50)">
          <rect x="0" y="0" width="100" height="36" rx="6" fill="rgba(15, 15, 15, 0.9)" stroke={isQuerying ? "#22c55e" : "#3f3f46"} strokeWidth="1.2" />
          <text x="50" y="16" fill="#ffffff" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">DATABASE</text>
          <text x="50" y="27" fill="#a1a1aa" fontSize="7.5" fontFamily="monospace" textAnchor="middle">PostgreSQL / Redis</text>
        </g>

        {/* RIGHT MIDDLE TOP: RAG Vector Store */}
        <g transform="translate(340, 110)">
          <rect x="0" y="0" width="100" height="36" rx="6" fill="rgba(15, 15, 15, 0.9)" stroke={isQuerying ? "#22c55e" : "#3f3f46"} strokeWidth="1.2" />
          <text x="50" y="16" fill="#ffffff" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">VECTOR_STORE</text>
          <text x="50" y="27" fill="#a1a1aa" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Qdrant Index</text>
        </g>

        {/* RIGHT MIDDLE BOTTOM: Cloud Deploy IaC */}
        <g transform="translate(340, 180)">
          <rect x="0" y="0" width="100" height="36" rx="6" fill="rgba(15, 15, 15, 0.9)" stroke={isQuerying ? "#22c55e" : "#3f3f46"} strokeWidth="1.2" />
          <text x="50" y="16" fill="#ffffff" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">INFRASTRUCTURE</text>
          <text x="50" y="27" fill="#a1a1aa" fontSize="7.5" fontFamily="monospace" textAnchor="middle">AWS ECS / Terraform</text>
        </g>

        {/* RIGHT BOTTOM NODE: Autonomous Agents */}
        <g transform="translate(340, 240)">
          <rect x="0" y="0" width="100" height="36" rx="6" fill="rgba(15, 15, 15, 0.9)" stroke={isQuerying ? "#22c55e" : "#3f3f46"} strokeWidth="1.2" />
          <text x="50" y="16" fill="#ffffff" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">AI_AGENTS</text>
          <text x="50" y="27" fill="#a1a1aa" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Tool Orchestrator</text>
        </g>
      </svg>
      
      {/* Top Details Panel */}
      <div style={{
        position: 'absolute',
        top: '16px',
        left: '16px',
        fontFamily: 'monospace',
        fontSize: '0.62rem',
        color: '#8a99ad',
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '2px'
      }}>
        <span style={{ color: '#22c55e', fontWeight: 'bold' }}>[KERNEL SYSTEM BLUEPRINT]</span>
        <span>DAEMON STATUS: {isQuerying ? "BUILDING RUNTIME" : "STANDBY"}</span>
      </div>

      {isQuerying && (
        <div style={{
          position: 'absolute',
          bottom: '16px',
          right: '16px',
          fontFamily: 'monospace',
          fontSize: '0.65rem',
          color: '#22c55e',
          background: 'rgba(34, 197, 94, 0.1)',
          border: '1px solid rgba(34, 197, 94, 0.25)',
          padding: '4px 8px',
          borderRadius: '4px',
          pointerEvents: 'none'
        }}>
          COMPILING INFRASTRUCTURE...
        </div>
      )}
    </div>
  );
};

export const Home: React.FC = () => {
  const homepageSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Zyntral AI",
    "operatingSystem": "All",
    "applicationCategory": "DeveloperApplication",
    "description": "Build Production-Ready AI Infrastructure from a Single Prompt.",
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD"
    }
  };

  const SIMULATOR_QUERIES: SimulatorQuery[] = [
    {
      title: "Support Platform",
      query: "Build a customer support AI platform capable of serving 50,000 users. Use enterprise RAG across PDFs and websites, multi-agent orchestration, PostgreSQL, Redis, authentication, billing, analytics, and deploy on AWS.",
      logs: [
        "[10:51:01] Processing spec: 'Build a customer support AI platform (50k users)...'",
        "[10:51:02] Loading embedding models: text-embedding-3-large",
        "[10:51:03] ✓ System Architecture compiled successfully.",
        "[10:51:04] ✓ Production Backend active (Node.js/Express layers).",
        "[10:51:05] ✓ Enterprise RAG Pipeline configured (hybrid Qdrant store).",
        "[10:51:06] ✓ AI Agents tool calling & memory active.",
        "[10:51:07] ✓ Database Design established (PostgreSQL / Redis caching).",
        "[10:51:08] ✓ Authentication & API Layer rules active.",
        "[10:51:09] ✓ Infrastructure as Code (Terraform) created.",
        "[10:51:10] ✓ Deployment Configuration (AWS ECS/Fargate) ready.",
        "[10:51:11] ✓ Monitoring & Logging active.",
        "[10:51:12] ✓ Everything connected. Everything production-ready."
      ]
    },
    {
      title: "Knowledge Assistant",
      query: "Generate a multi-tenant knowledge assistant. Semantic search across PDFs, metadata filtering, version control, and human approval loops. Deploy on Vercel.",
      logs: [
        "[10:52:10] Processing spec: 'Multi-tenant knowledge assistant'...",
        "[10:52:11] Generating embedding query representation...",
        "[10:52:12] ✓ System Architecture compiled successfully.",
        "[10:52:13] ✓ Production Backend active.",
        "[10:52:14] ✓ Enterprise RAG Pipeline configured.",
        "[10:52:15] ✓ Database Design established.",
        "[10:52:16] ✓ Deployment Configuration (Vercel edge) ready.",
        "[10:52:17] ✓ Monitoring & Logging active."
      ]
    }
  ];

  // RAG Simulator States
  const [selectedQueryIdx, setSelectedQueryIdx] = useState<number | null>(null);
  const [simulatorLogs, setSimulatorLogs] = useState<string[]>([]);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Quickstart Terminal States
  const [cliTab, setCliTab] = useState<'npm' | 'yarn' | 'pnpm'>('npm');
  const [copied, setCopied] = useState<boolean>(false);
  const [terminalInput, setTerminalInput] = useState<string>('');
  const [terminalLines, setTerminalLines] = useState<string[]>([
    "Zyntral Core CLI v1.4.0 active.",
    "Type 'help' to view available operations or trigger a simulator query above.",
    ""
  ]);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Trigger auto scroll for simulator logs & terminal
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [simulatorLogs]);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalLines]);

  // Copy Clipboard Helper
  const getInstallCommand = () => {
    if (cliTab === 'npm') return 'npx @zyntral/core init';
    if (cliTab === 'yarn') return 'yarn dlx @zyntral/core init';
    return 'pnpm dlx @zyntral/core init';
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getInstallCommand());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Run RAG Simulation
  const startSimulation = (queryIdx: number) => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSelectedQueryIdx(queryIdx);
    setSimulatorLogs([]);

    const query = SIMULATOR_QUERIES[queryIdx];
    let logIdx = 0;

    const interval = setInterval(() => {
      if (logIdx < query.logs.length) {
        setSimulatorLogs(prev => [...prev, query.logs[logIdx]]);
        logIdx++;
      } else {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 500);
  };

  // Handle Terminal CLI Inputs
  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const command = terminalInput.trim();
    if (!command) return;

    const newLines = [...terminalLines, `guest@zyntral:~$ ${command}`];
    const cmdClean = command.toLowerCase().split(' ')[0];

    switch (cmdClean) {
      case 'help':
        newLines.push(
          "Available direct commands:",
          "  help           Display functional directions",
          "  init           Simulate Zyntral compiler configuration build",
          "  status         Display running hardware and compiler node metadata",
          "  clear          Clear log history buffer"
        );
        break;
      case 'init':
        newLines.push(
          "Initializing Zyntral compiler framework...",
          "✓ Created client workspace directory: ./src/db",
          "✓ Created schema definition manifest: ./zyntral.config.json",
          "✓ Configured standard edge node endpoint routing mapping",
          "Zyntral compiler initialized! Ready to run queries."
        );
        break;
      case 'status':
        newLines.push(
          "--- CLUSTER NODES ---",
          "Sandbox Node Status: ONLINE",
          "Active Channels:     3 RAG pipelines cataloged",
          "Connected Driver:    Qdrant / pgvector API pool",
          "Local System Load:   14.2% CPU / 4.1GB Memory"
        );
        break;
      case 'clear':
        setTerminalLines([]);
        setTerminalInput('');
        return;
      default:
        newLines.push(`Command "${command}" not recognized. Type "help" to display options.`);
    }

    setTerminalLines([...newLines, ""]);
    setTerminalInput('');
  };

  return (
    <div style={{
      backgroundColor: '#020204',
      backgroundImage: "radial-gradient(circle at 50% 0%, rgba(34, 197, 94, 0.08) 0%, rgba(2, 2, 4, 0.98) 70%)",
      minHeight: '100vh',
      paddingTop: '110px',
      paddingBottom: '60px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Matrix/Sci-Fi Grid Effect */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: "linear-gradient(rgba(34, 197, 94, 0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 197, 94, 0.015) 1px, transparent 1px)",
        backgroundSize: '30px 30px',
        pointerEvents: 'none',
        zIndex: 1
      }} />

      {/* Decorative Blur Glows */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '25%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(34, 197, 94, 0.05) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        pointerEvents: 'none',
        zIndex: 1
      }} />
      <div style={{
        position: 'absolute',
        bottom: '15%',
        right: '15%',
        width: '450px',
        height: '450px',
        background: 'radial-gradient(circle, rgba(161, 161, 170, 0.03) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        pointerEvents: 'none',
        zIndex: 1
      }} />

      <SEO
        title="Build Production-Ready AI Infrastructure from a Single Prompt"
        description="Generate enterprise-ready AI systems including scalable RAG pipelines, autonomous AI agents, backend architecture, databases, APIs, and cloud infrastructure."
        path="/"
        schema={homepageSchema}
      />
      
      {/* Outer Visual Container */}
      <div className="home-container" style={{
        width: '94%',
        maxWidth: '1280px',
        background: 'rgba(15, 15, 15, 0.7)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        boxShadow: '0 30px 100px rgba(0, 0, 0, 0.75)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        color: '#f8fafc',
        display: 'flex',
        flexDirection: 'column',
        gap: '60px',
        fontFamily: "'Inter', sans-serif",
        position: 'relative',
        zIndex: 2
      }}>

        {/* Top Mini Telemetry panel */}
        <div className="home-telemetry-grid" style={{ gap: '12px', width: '100%', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '20px' }}>
          {[
            { label: "Compiler Engine", value: "STABLE PROTOCOL", color: "#22c55e" },
            { label: "Decentralized Nodes", value: "3 STACK OPERATIONS", color: "#a1a1aa" },
            { label: "Consensus Drivers", value: "QDRANT / PGVECTOR", color: "#22c55e" },
            { label: "Telemetry Latency", value: "12ms P99 METRICS", color: "#cbd5e1" }
          ].map((metric, i) => (
            <div key={i} style={{
              background: 'rgba(255, 255, 255, 0.01)',
              border: '1px solid rgba(255, 255, 255, 0.03)',
              borderRadius: '8px',
              padding: '10px 14px',
              fontFamily: 'monospace'
            }}>
              <div style={{ fontSize: '0.58rem', color: '#8a99ad', textTransform: 'uppercase', letterSpacing: '1px' }}>{metric.label}</div>
              <div style={{ fontSize: '0.76rem', fontWeight: 800, color: metric.color, marginTop: '3px' }}>{metric.value}</div>
            </div>
          ))}
        </div>
        
        {/* Hero Section */}
        <section style={{ position: 'relative' }}>
          <div className="grid-halves" style={{ gap: '50px', alignItems: 'center' }}>
            
            {/* Left Column: Headline and CTAs */}
            <div style={{ textAlign: 'left' }}>
              <div style={{ marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                <img 
                  src={logoImg} 
                  alt="Zyntral Logo" 
                  style={{ 
                    width: '58px', 
                    height: '58px', 
                    borderRadius: '12px', 
                    border: '1px solid rgba(255, 255, 255, 0.08)', 
                    boxShadow: '0 0 20px rgba(34, 197, 94, 0.15)',
                    objectFit: 'cover'
                  }} 
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: '0.62rem', fontWeight: 800, color: '#22c55e', textTransform: 'uppercase', letterSpacing: '2.5px' }}>
                    Zyntral Labs
                  </span>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#f8fafc', fontFamily: 'monospace' }}>
                    DEV_KERNEL.SYS
                  </span>
                </div>
              </div>

              <h1 style={{ 
                fontSize: 'clamp(2.3rem, 4vw, 3.5rem)', 
                lineHeight: '1.1', 
                fontWeight: 900, 
                marginBottom: '10px', 
                letterSpacing: '-1.8px', 
                color: '#ffffff',
                fontFamily: 'var(--font-display)'
              }}>
                Build Production-Ready <br /> AI Infrastructure <br />
                <span style={{ 
                  background: 'linear-gradient(135deg, #22c55e 0%, #cbd5e1 50%, #ffffff 100%)', 
                  WebkitBackgroundClip: 'text', 
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block',
                  marginTop: '4px'
                }}>
                  from a Single Prompt
                </span>
              </h1>
              
              <div style={{ fontFamily: 'monospace', color: '#cbd5e1', fontSize: '0.88rem', fontWeight: 'bold', marginBottom: '20px' }}>
                &gt; Not another AI code generator.
              </div>

              <p style={{ color: '#8a99ad', fontSize: '0.98rem', marginBottom: '35px', lineHeight: '1.68', maxWidth: '580px' }}>
                Generate enterprise-ready AI systems—including scalable RAG pipelines, autonomous AI agents, backend architecture, databases, APIs, authentication, deployment, and cloud infrastructure—from natural language.
              </p>

              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                <Link to="/workspace" className="btn-primary" style={{ 
                  background: 'linear-gradient(135deg, #22c55e 0%, #15803d 100%)', 
                  color: '#fff', 
                  boxShadow: '0 0 25px rgba(34, 197, 94, 0.25)', 
                  borderRadius: '8px', 
                  padding: '12px 24px', 
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  border: 'none',
                  transition: 'all 0.2s'
                }}>
                  Start Building <ArrowRight size={16} />
                </Link>
                <Link to="/contact" className="btn-secondary" style={{ 
                  borderRadius: '8px', 
                  padding: '12px 24px', 
                  fontSize: '0.85rem', 
                  fontWeight: 650,
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  color: '#cbd5e1',
                  transition: 'background 0.2s'
                }}>
                  Book a Demo
                </Link>
              </div>
            </div>

            {/* Right Column: Animated System Flow Schematic */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', position: 'relative' }}>
              <CompilerSchematic isQuerying={isSimulating} />

              {/* Simulation triggers panel */}
              <div style={{
                background: 'rgba(15, 23, 42, 0.4)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '16px',
                padding: '16px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#22c55e', textTransform: 'uppercase', letterSpacing: '1px', fontFamily: 'monospace' }}>
                    SIMULATE_PROMPT_COMPILE
                  </span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {SIMULATOR_QUERIES.map((q, idx) => (
                      <button
                        key={idx}
                        disabled={isSimulating}
                        onClick={() => startSimulation(idx)}
                        style={{
                          padding: '6px 10px',
                          borderRadius: '6px',
                          background: selectedQueryIdx === idx ? 'rgba(34, 197, 94, 0.12)' : 'rgba(255, 255, 255, 0.01)',
                          border: selectedQueryIdx === idx ? '1px solid rgba(34, 197, 94, 0.35)' : '1px solid rgba(255, 255, 255, 0.05)',
                          color: selectedQueryIdx === idx ? '#22c55e' : '#8a99ad',
                          fontSize: '0.66rem',
                          fontFamily: 'monospace',
                          cursor: isSimulating ? 'not-allowed' : 'pointer',
                          transition: 'all 0.2s',
                          outline: 'none'
                        }}
                      >
                        {q.title.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Simulated trace output console */}
                <div style={{
                  background: '#02040a',
                  border: '1px solid rgba(255,255,255,0.03)',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  height: '110px',
                  overflowY: 'auto',
                  fontFamily: 'monospace',
                  fontSize: '0.65rem',
                  color: '#22c55e',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '3px'
                }}>
                  {simulatorLogs.length === 0 ? (
                    <span style={{ color: '#475569', fontStyle: 'italic' }}>
                      Await prompt directive spec... Select a mock blueprint trigger to simulate compile sequence.
                    </span>
                  ) : (
                    simulatorLogs.map((log, idx) => (
                      <div key={idx} style={{ 
                        lineHeight: '1.4', 
                        color: log.includes('✓') ? '#22c55e' : '#a1a1aa' 
                      }}>
                        {log}
                      </div>
                    ))
                  )}
                  <div ref={logsEndRef} />
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* Developers Section */}
        <section style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '40px', textAlign: 'center' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#22c55e', textTransform: 'uppercase', letterSpacing: '2px', fontFamily: 'monospace' }}>
              TRUSTED BY DEVELOPERS BUILDING THE NEXT GENERATION OF AI PRODUCTS
            </span>
            <p style={{ color: '#cbd5e1', fontSize: '0.96rem', marginTop: '12px', lineHeight: '1.6' }}>
              Whether you're building an AI SaaS, enterprise assistant, internal copilot, or autonomous workflow, Zyntral creates the engineering foundation so your team can focus on solving real business problems.
            </p>
          </div>
        </section>

        {/* More than Code Generation */}
        <section style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '50px' }}>
          <div className="grid-halves" style={{ gap: '40px' }}>
            <div>
              <span style={{ fontSize: '0.64rem', fontWeight: 800, color: '#22c55e', textTransform: 'uppercase', letterSpacing: '2.5px', fontFamily: 'monospace' }}>
                BEYOND AUTO-COMPLETION
              </span>
              <h2 style={{ fontSize: '2rem', color: '#ffffff', fontWeight: 800, marginTop: '8px', fontFamily: 'var(--font-display)' }}>
                More Than AI Code Generation
              </h2>
              <div style={{ height: '2px', width: '60px', background: '#22c55e', marginTop: '15px' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', color: '#ffffff', fontWeight: 700, marginBottom: '15px' }}>
                Today's AI builders generate demos. Zyntral generates production-ready systems.
              </h3>
              <p style={{ color: '#8a99ad', fontSize: '0.92rem', lineHeight: '1.7' }}>
                Instead of stitching together dozens of frameworks, cloud services, and infrastructure tools, simply describe your product. Zyntral designs, assembles, and configures the complete architecture—ready for development, customization, and deployment.
              </p>
            </div>
          </div>
        </section>

        {/* Feature Pillars */}
        <section style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '50px' }}>
          <div className="section-header" style={{ marginBottom: '40px', textAlign: 'center' }}>
            <span style={{ fontSize: '0.64rem', fontWeight: 800, color: '#22c55e', textTransform: 'uppercase', letterSpacing: '2.5px', fontFamily: 'monospace' }}>
              ZYNTRAL_CORE_ENGINE
            </span>
            <h2 style={{ fontSize: '1.8rem', color: '#ffffff', fontWeight: 800, marginTop: '8px', fontFamily: 'var(--font-display)' }}>
              Production-Grade AI Components
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            {[
              {
                title: "Production-Grade RAG",
                icon: Database,
                color: "#22c55e",
                intro: "Enterprise Retrieval-Augmented Generation shouldn't stop at uploading PDFs. Zyntral automatically generates intelligent retrieval systems with:",
                bullets: [
                  "Multi-source document ingestion",
                  "Semantic & Hybrid Search",
                  "Metadata Filtering & Chunking",
                  "Background Indexing & Version Control",
                  "Access Control & Citations",
                  "Multi-Tenant Support & Evaluation"
                ]
              },
              {
                title: "Intelligent AI Agents",
                icon: Cpu,
                color: "#86efac",
                intro: "Generate autonomous AI agents capable of operations, support, legal, logistics, and enterprise automation:",
                bullets: [
                  "Tool Calling workflows",
                  "Multi-Agent Collaboration",
                  "Memory Management structures",
                  "Workflow Orchestration",
                  "Human Approval Loops",
                  "External API Integration"
                ]
              },
              {
                title: "Infrastructure That Scales",
                icon: Settings,
                color: "#cbd5e1",
                intro: "Modern AI applications require more than prompts. Zyntral automatically sets up your execution framework:",
                bullets: [
                  "Backend Services & APIs",
                  "Databases & Vector Storage",
                  "Background Workers & Caching",
                  "Queues & File Storage",
                  "Monitoring & Logging channels",
                  "Deployment Pipelines"
                ]
              },
              {
                title: "Enterprise by Design",
                icon: Shield,
                color: "#a1a1aa",
                intro: "Every generated project follows production engineering practices. No vendor lock-in. Own your code. Deploy anywhere:",
                bullets: [
                  "Modular Architecture rules",
                  "Secure Authentication",
                  "Scalable API Layers",
                  "Cloud Deployment setups",
                  "Infrastructure as Code",
                  "Observability & Management"
                ]
              }
            ].map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div key={i} className="glass-card flex-pillar" style={{ 
                  padding: '24px', 
                  background: 'rgba(255, 255, 255, 0.01)', 
                  border: '1px solid rgba(255, 255, 255, 0.04)', 
                  borderRadius: '16px',
                  transition: 'all 0.3s ease',
                  boxShadow: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '15px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div className="card-icon-wrapper" style={{ 
                      color: pillar.color, 
                      background: 'rgba(255, 255, 255, 0.02)', 
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      width: '38px',
                      height: '38px',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon size={18} />
                    </div>
                    <h3 style={{ fontSize: '1.05rem', color: '#ffffff', fontWeight: 700 }}>{pillar.title}</h3>
                  </div>

                  <p style={{ color: '#8a99ad', fontSize: '0.78rem', lineHeight: '1.6' }}>{pillar.intro}</p>

                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', margin: 0, padding: 0 }}>
                    {pillar.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', fontSize: '0.74rem', color: '#cbd5e1' }}>
                        <span style={{ color: pillar.color, fontWeight: 'bold' }}>•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* Traditional vs Zyntral Comparison */}
        <section style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '50px' }}>
          <div className="section-header" style={{ marginBottom: '40px', textAlign: 'center' }}>
            <span style={{ fontSize: '0.64rem', fontWeight: 800, color: '#22c55e', textTransform: 'uppercase', letterSpacing: '2.5px', fontFamily: 'monospace' }}>
              COMPARATIVE_ANALYSIS
            </span>
            <h2 style={{ fontSize: '1.8rem', color: '#ffffff', fontWeight: 800, marginTop: '8px', fontFamily: 'var(--font-display)' }}>
              Why Zyntral?
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            {/* Traditional Column */}
            <div className="glass-card" style={{ padding: '30px', background: 'rgba(255, 255, 255, 0.01)', border: '1px solid rgba(255, 255, 255, 0.04)', borderRadius: '16px', boxShadow: 'none' }}>
              <h3 style={{ fontSize: '1.1rem', color: '#cbd5e1', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#475569' }} />
                Traditional AI Development
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', padding: 0, margin: 0 }}>
                {[
                  "Weeks of infrastructure setup",
                  "Multiple disconnected tools",
                  "Manual architecture decisions",
                  "Boilerplate engineering",
                  "Slow development iteration",
                  "Complex server deployments"
                ].map((item, idx) => (
                  <li key={idx} style={{ fontSize: '0.82rem', color: '#8a99ad', display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span style={{ color: '#475569', fontWeight: 'bold' }}>✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Zyntral Column */}
            <div className="glass-card" style={{ padding: '30px', background: 'rgba(34, 197, 94, 0.02)', border: '1px solid rgba(34, 197, 94, 0.15)', borderRadius: '16px', boxShadow: '0 0 30px rgba(34, 197, 94, 0.04)' }}>
              <h3 style={{ fontSize: '1.1rem', color: '#ffffff', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }} />
                With Zyntral
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', padding: 0, margin: 0 }}>
                {[
                  "Prompt-driven infrastructure generation",
                  "Production-ready architecture",
                  "Enterprise-grade AI systems",
                  "Deployment-ready projects",
                  "Complete ownership of generated code",
                  "Extensible modular frameworks"
                ].map((item, idx) => (
                  <li key={idx} style={{ fontSize: '0.82rem', color: '#ffffff', display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span style={{ color: '#22c55e', fontWeight: 'bold' }}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Developer CLI panel / Quickstart Widget */}
        <section style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '50px' }}>
          <div className="grid-halves" style={{ gap: '50px', alignItems: 'center' }}>
            
            <div style={{ textAlign: 'left' }}>
              <span style={{ fontSize: '0.64rem', fontWeight: 800, color: '#22c55e', textTransform: 'uppercase', letterSpacing: '2.5px', fontFamily: 'monospace' }}>
                DEVELOPER_SANDBOX
              </span>
              <h2 style={{ fontSize: '1.8rem', color: '#ffffff', fontWeight: 800, marginTop: '8px', fontFamily: 'var(--font-display)' }}>
                Initialize Daemon Workspace
              </h2>
              <p style={{ color: '#8a99ad', fontSize: '0.86rem', marginTop: '12px', lineHeight: '1.6' }}>
                Load parameters, target vector drivers, and mapping schemas in seconds. Zero runtime configuration hassles. Built for Teams Building Serious AI Products.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '20px', fontFamily: 'monospace', fontSize: '0.75rem', color: '#64748b' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#22c55e' }}>[✓]</span> CORE DEPS: 0 PYTHON DEPENDENCY BOUNDARIES
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#22c55e' }}>[✓]</span> PLUG_IN: PGVECTOR / QDRANT / PINECONE
                </div>
              </div>
            </div>

            {/* Quickstart Tab Panel Widget */}
            <div style={{
              background: '#040712',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              
              {/* Tab Selector */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '12px' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {(['npm', 'yarn', 'pnpm'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setCliTab(tab)}
                      style={{
                        padding: '4px 8px',
                        fontSize: '0.7rem',
                        fontFamily: 'monospace',
                        fontWeight: 650,
                        borderRadius: '4px',
                        background: cliTab === tab ? 'rgba(255,255,255,0.05)' : 'transparent',
                        border: 'none',
                        color: cliTab === tab ? '#ffffff' : '#22c55e',
                        cursor: 'pointer',
                        transition: 'all 0.15s'
                      }}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                
                {/* Copy Button */}
                <button
                  onClick={handleCopy}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#22c55e',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.7rem',
                    fontFamily: 'monospace',
                    fontWeight: 600
                  }}
                >
                  <span>{copied ? 'COPIED' : 'COPY_SCRIPT'}</span>
                </button>
              </div>

              {/* Install Command Display */}
              <div style={{
                background: '#010205',
                border: '1px solid rgba(255,255,255,0.02)',
                borderRadius: '8px',
                padding: '12px 14px',
                fontFamily: 'monospace',
                fontSize: '0.76rem',
                color: '#22c55e'
              }}>
                <code>{getInstallCommand()}</code>
              </div>

              {/* Interactive Terminal Shell Simulator */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '0.62rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '1px', fontFamily: 'monospace' }}>
                  CONSOLE OPERATIONS SHELL
                </span>
                
                <div style={{
                  background: '#010205',
                  border: '1px solid rgba(255,255,255,0.03)',
                  borderRadius: '8px',
                  padding: '12px 14px',
                  height: '130px',
                  overflowY: 'auto',
                  fontFamily: 'monospace',
                  fontSize: '0.68rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}>
                  {terminalLines.map((line, idx) => (
                    <div 
                      key={idx} 
                      style={{ 
                        lineHeight: '1.4', 
                        color: line.startsWith('guest@') 
                          ? '#ffffff' 
                          : line.startsWith('✓') || line.includes('ONLINE')
                            ? '#22c55e' 
                            : line.startsWith('Error:')
                              ? '#f87171'
                              : '#8a99ad' 
                      }}
                    >
                      {line}
                    </div>
                  ))}
                  <div ref={terminalEndRef} />
                </div>

                <form onSubmit={handleTerminalSubmit} style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    placeholder="Type console commands (e.g. help, init, status)..."
                    style={{
                      flex: 1,
                      background: '#010205',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      borderRadius: '6px',
                      padding: '8px 12px',
                      color: '#ffffff',
                      fontSize: '0.7rem',
                      fontFamily: 'monospace',
                      outline: 'none'
                    }}
                  />
                  <button 
                    type="submit" 
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: '6px',
                      padding: '0 14px',
                      color: '#ffffff',
                      fontSize: '0.7rem',
                      fontFamily: 'monospace',
                      cursor: 'pointer',
                      fontWeight: 600,
                      outline: 'none'
                    }}
                  >
                    EXECUTE
                  </button>
                </form>
              </div>

            </div>

          </div>
        </section>

        {/* Bottom Call to Action Banner */}
        <section style={{ 
          borderTop: '1px solid rgba(255, 255, 255, 0.06)', 
          paddingTop: '55px', 
          textAlign: 'center',
          background: 'radial-gradient(circle at center, rgba(34, 197, 94, 0.03) 0%, transparent 70%)',
          borderRadius: '24px',
          padding: '40px'
        }}>
          <div style={{ maxWidth: '750px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
            <h2 style={{ fontSize: '2rem', color: '#ffffff', fontWeight: 800, fontFamily: 'var(--font-display)' }}>
              Start Building Production AI
            </h2>
            <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.6' }}>
              Stop generating prototypes. Start generating production-ready AI infrastructure. Describe your product. We'll generate the engineering behind it.
            </p>
            <Link to="/workspace" className="btn-primary" style={{ 
              background: 'linear-gradient(135deg, #22c55e 0%, #15803d 100%)', 
              color: '#fff', 
              boxShadow: '0 0 25px rgba(34, 197, 94, 0.25)', 
              borderRadius: '8px', 
              padding: '12px 30px', 
              fontSize: '0.88rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              border: 'none',
              marginTop: '10px'
            }}>
              Start Building <ArrowRight size={18} />
            </Link>
          </div>
        </section>

        {/* SEO Keyword-Rich Technical FAQs */}
        <section style={{ marginTop: '70px', paddingTop: '50px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="badge" style={{ background: 'rgba(34, 197, 94, 0.08)', color: '#4ade80', border: '1px solid rgba(34, 197, 94, 0.2)' }}>
              Developer FAQ
            </span>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '10px', color: '#ffffff' }}>
              Zyntral Artificial Intelligence Infrastructure
            </h2>
            <p style={{ color: 'var(--muted-color)', fontSize: '0.9rem', maxWidth: '600px', margin: '8px auto 0' }}>
              Deep dive into technical parameters, vector capabilities, and deployment architecture compiled by Sujal Talreja and the core engineering team.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '800px', margin: '0 auto' }}>
            {[
              {
                q: "What is Zyntral AI and who created the platform?",
                a: "Zyntral AI (Zyntral Artificial Intelligence) is a state-of-the-art on-prompt RAG builder, website generator, and production ready app builder. Designed by lead architect Sujal Talreja (also known as Sujal Kishore Kumar Talreja or Sujal K Talreja), Zyntral automatically compiles natural language prompts into complete, deployable software architectures including databases, LLM routes, and cloud configs."
              },
              {
                q: "How does the Zyntral RAG builder optimize indexing speed?",
                a: "The Zyntral compiler configures vector drivers (like pgvector, Pinecone, or Qdrant) with optimized chunk sizes and overlap indexes based on your prompt specs. Retrieval latency averages under 30ms, backed by GPU-accelerated MMR (Maximal Marginal Relevance) and hybrid search configurations."
              },
              {
                q: "What cloud platforms are targeted by the Zyntral website generator?",
                a: "Our compiler automatically designs and provisions infrastructure files (using Terraform, Docker, and shell scripts) targeting secure container runtimes on AWS Fargate, Google Cloud Run, Vercel Edge, and Azure Container Tasks."
              },
              {
                q: "Can I customize the generated code manually?",
                a: "Yes. Every compiled pipeline or app stack generated by Zyntral runs on standard open protocols. You can edit the compiled scripts (like schema.sql, main.tf, and agent.py) directly within the interactive workspace code playground or export the entire bundle as a standard zip stack."
              }
            ].map((faq, idx) => (
              <div key={idx} className="glass-card" style={{ padding: '24px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.03)' }}>
                <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>{faq.q}</h4>
                <p style={{ fontSize: '0.86rem', color: 'var(--muted-color)', lineHeight: '1.6', margin: 0 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Dynamic CSS rules for radar sweep and rotation fallback animations */}
      <style>{`
        @keyframes scannerSweep {
          0% {
            top: 0%;
          }
          50% {
            top: 100%;
          }
          100% {
            top: 0%;
          }
        }
        
        @keyframes slowRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes pulseIndicator {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; transform: scale(1.1); }
        }

        @keyframes dashFlow {
          to {
            stroke-dashoffset: -40;
          }
        }

        .home-container {
          padding: 50px 40px;
        }

        .home-telemetry-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }

        @media (max-width: 768px) {
          .home-container {
            padding: 30px 16px !important;
          }
          .home-telemetry-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 480px) {
          .home-telemetry-grid {
            grid-template-columns: 1fr !important;
          }
        }

        .flex-pillar {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }

        .flex-pillar:hover {
          transform: translateY(-4px) !important;
          background: rgba(255, 255, 255, 0.02) !important;
          border-color: rgba(34, 197, 94, 0.2) !important;
          box-shadow: 0 8px 24px rgba(34, 197, 94, 0.03) !important;
        }

        rect, circle, line, path {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
      `}</style>
    </div>
  );
};

export const HomeDefault = Home;
export default Home;
