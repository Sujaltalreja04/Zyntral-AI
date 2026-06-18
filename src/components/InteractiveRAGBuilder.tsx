import React, { useState, useEffect } from 'react';
import { Play, Sparkles, CheckCircle, Database, Cpu, Terminal, ArrowRight, RefreshCw } from 'lucide-react';

interface LogLine {
  text: string;
  type: 'plan' | 'process' | 'eval' | 'success' | 'info';
  timestamp: string;
}

export const InteractiveRAGBuilder: React.FC = () => {
  const [prompt, setPrompt] = useState('Build a RAG pipeline that ingests product manuals from PDF files, chunks them, stores them in a vector DB, and links Llama-3 to answer customer service requests.');
  const [status, setStatus] = useState<'idle' | 'compiling' | 'success'>('idle');
  const [logs, setLogs] = useState<LogLine[]>([]);
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [currentProgress, setCurrentProgress] = useState(0);

  const mockSteps = [
    { text: 'Parsing user prompt for architecture details...', type: 'plan' as const },
    { text: 'Detected sources: [PDF Files]. LLM: [Llama-3]. Vector DB: [ChromaDB].', type: 'info' as const },
    { text: 'Configuring document loaders and chunk size (Size: 512, Overlap: 50)...', type: 'process' as const },
    { text: 'Setting up HuggingFace embedding generator (bge-large-en)...', type: 'process' as const },
    { text: 'Connecting Vector database: Initializing ChromaDB database clusters...', type: 'process' as const },
    { text: 'Computing embeddings and indexing mock vectors...', type: 'process' as const },
    { text: 'Configuring Retriever logic with MMR reranking...', type: 'process' as const },
    { text: 'Linking system instructions to Llama-3-70B model context...', type: 'process' as const },
    { text: 'Simulating query testing... Retrieval Latency: 28ms. LLM Latency: 1.1s.', type: 'eval' as const },
    { text: 'Running sanity check tests... 100% tests passed.', type: 'eval' as const },
    { text: 'SUCCESS: RAG Pipeline compiled & deployed!', type: 'success' as const },
    { text: 'API Live: https://api.zyntral.ai/v1/rag-service-592', type: 'success' as const }
  ];

  useEffect(() => {
    if (status !== 'compiling') return;

    let step = 0;
    setActiveStep(0);
    setLogs([
      {
        text: 'Initializing Zyntral AI Compiler v1.4.0...',
        type: 'info',
        timestamp: new Date().toLocaleTimeString()
      }
    ]);

    const interval = setInterval(() => {
      if (step < mockSteps.length) {
        const item = mockSteps[step];
        setLogs((prev) => [
          ...prev,
          {
            text: item.text,
            type: item.type,
            timestamp: new Date().toLocaleTimeString()
          }
        ]);
        
        // Match flowchart node highlight logic
        if (step < 2) setActiveStep(0); // Parsing & Planning
        else if (step < 4) setActiveStep(1); // Ingestion & Embedding
        else if (step < 6) setActiveStep(2); // Vector DB Indexing
        else if (step < 8) setActiveStep(3); // Retrieval Logic & Prompt
        else if (step < 10) setActiveStep(4); // LLM & Evaluation
        else setActiveStep(5); // Success Deploy

        setCurrentProgress(Math.floor(((step + 1) / mockSteps.length) * 100));
        step++;
      } else {
        clearInterval(interval);
        setStatus('success');
      }
    }, 1200);

    return () => clearInterval(interval);
  }, [status]);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setStatus('compiling');
    setCurrentProgress(0);
  };

  const handleReset = () => {
    setStatus('idle');
    setLogs([]);
    setActiveStep(-1);
    setCurrentProgress(0);
  };

  const flowNodes = [
    { id: 0, label: 'Prompt Parser', icon: Sparkles },
    { id: 1, label: 'Document Loader', icon: Database },
    { id: 2, label: 'Vector Indexer', icon: Cpu },
    { id: 3, label: 'MMR Retriever', icon: Terminal },
    { id: 4, label: 'LLM Generator', icon: ArrowRight },
    { id: 5, label: 'Production API', icon: CheckCircle }
  ];

  return (
    <div className="glass-card" style={{ padding: '40px', background: 'rgba(5, 5, 12, 0.5)' }}>
      <div className="glow-glow"></div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', position: 'relative', zIndex: 2 }}>
        <div>
          <h3 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', color: '#fff' }}>
            <Sparkles size={24} style={{ color: '#e5e7eb' }} />
            Prompt-to-RAG Compiler
          </h3>
          <p style={{ color: 'var(--muted-color)', fontSize: '0.9rem', marginTop: '5px' }}>
            Enter your requirements to generate an end-to-end LLM retrieval pipeline.
          </p>
        </div>
        
        {status !== 'idle' && (
          <button 
            onClick={handleReset} 
            className="nav-btn" 
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 18px', fontSize: '0.85rem' }}
          >
            <RefreshCw size={14} className={status === 'compiling' ? 'spin-anim' : ''} />
            Reset Canvas
          </button>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '30px', position: 'relative', zIndex: 2 }}>
        {/* Left Side: Controls and Logging */}
        <div>
          {status === 'idle' ? (
            <form onSubmit={handleStart} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div className="input-group">
                <label className="input-label">Natural Language Prompt</label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="input-field"
                  rows={4}
                  style={{ resize: 'none', fontFamily: 'var(--font-sans)', lineHeight: '1.5' }}
                />
              </div>
              <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }}>
                <Play size={18} fill="currentColor" />
                Compile RAG System
              </button>
            </form>
          ) : (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#e5e7eb' }}>
                  {status === 'compiling' ? 'COMPILING ARCHITECTURE...' : 'DEPLOYMENT COMPLETE'}
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--muted-color)' }}>{currentProgress}%</span>
              </div>
              <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden', marginBottom: '20px' }}>
                <div 
                  style={{ 
                    height: '100%', 
                    width: `${currentProgress}%`, 
                    background: 'linear-gradient(90deg, #ffffff, #6b7280)',
                    transition: 'width 0.4s ease'
                  }} 
                />
              </div>

              {/* Console Logs */}
              <div className="rag-builder-widget" style={{ height: '280px', overflowY: 'auto' }}>
                <div className="terminal-header">
                  <div className="terminal-dots">
                    <span className="terminal-dot red" />
                    <span className="terminal-dot yellow" />
                    <span className="terminal-dot green" />
                  </div>
                  <span className="terminal-title">compiler-logs.sh</span>
                </div>
                <div className="terminal-body" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {logs.map((log, idx) => {
                    let color = '#d1d5db';
                    if (log.type === 'plan') color = '#e5e7eb';
                    else if (log.type === 'process') color = '#d1d5db';
                    else if (log.type === 'eval') color = '#9ca3af';
                    else if (log.type === 'success') color = '#ffffff';
                    else if (log.type === 'info') color = '#9ca3af';
                    
                    return (
                      <div key={idx} style={{ fontSize: '0.85rem', color }}>
                        <span style={{ color: 'rgba(255,255,255,0.25)', marginRight: '8px' }}>[{log.timestamp}]</span>
                        {log.text}
                      </div>
                    );
                  })}
                  {status === 'compiling' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.85rem', color: 'var(--muted-color)' }}>
                      <span style={{ width: '6px', height: '12px', background: '#d1d5db', animation: 'caret-blink 0.8s infinite', display: 'inline-block' }}></span>
                      <span>Compiling pipeline...</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Visual Flowchart */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '15px' }}>
          <span className="input-label" style={{ marginBottom: '5px' }}>Pipeline Topology</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {flowNodes.map((node, index) => {
              const IconComp = node.icon;
              const isActive = activeStep === node.id;
              const isFinished = activeStep > node.id || status === 'success';
              
              let styleBorder = 'rgba(255, 255, 255, 0.05)';
              let styleBg = 'rgba(255, 255, 255, 0.02)';
              let iconColor = 'var(--muted-color)';
              let textColor = 'var(--muted-color)';
              
              if (isActive) {
                styleBorder = 'rgba(255, 255, 255, 0.3)';
                styleBg = 'rgba(255, 255, 255, 0.06)';
                iconColor = '#ffffff';
                textColor = '#ffffff';
              } else if (isFinished) {
                styleBorder = 'rgba(255, 255, 255, 0.15)';
                styleBg = 'rgba(255, 255, 255, 0.03)';
                iconColor = '#d1d5db';
                textColor = '#e5e7eb';
              }

              return (
                <div key={node.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                  <div 
                    style={{ 
                      width: '100%', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '15px', 
                      padding: '12px 20px', 
                      borderRadius: '10px', 
                      border: `1px solid ${styleBorder}`,
                      background: styleBg,
                      transition: 'all 0.3s ease',
                      boxShadow: isActive ? '0 0 15px rgba(255, 255, 255, 0.05)' : 'none'
                    }}
                  >
                    <IconComp size={18} style={{ color: iconColor }} />
                    <span style={{ fontSize: '0.9rem', fontWeight: 500, color: textColor }}>{node.label}</span>
                    {isFinished && <CheckCircle size={14} style={{ marginLeft: 'auto', color: '#d1d5db' }} />}
                    {isActive && <div className="pulse-dot" style={{ marginLeft: 'auto', width: '8px', height: '8px', borderRadius: '50%', background: '#ffffff' }} />}
                  </div>
                  {index < flowNodes.length - 1 && (
                    <div style={{ width: '1px', height: '12px', background: isFinished ? '#6b7280' : 'rgba(255, 255, 255, 0.05)', margin: '2px 0' }}></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .spin-anim {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .pulse-dot {
          animation: pulse 1.5s infinite;
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default InteractiveRAGBuilder;
