import React, { useState, useEffect } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Play, Sparkles, CheckCircle, Database, Cpu, Terminal, ArrowRight, RefreshCw } from 'lucide-react';

interface LogLine {
  text: string;
  type: 'plan' | 'process' | 'eval' | 'success' | 'info';
  timestamp: string;
}

export const InteractiveRAGBuilder: React.FC = () => {
  const [prompt, setPrompt] = useState('Build a RAG pipeline that searches standard PDF files, stores them in Pinecone, and links Llama-3 to answer support tickets.');
  const [status, setStatus] = useState<'idle' | 'compiling' | 'success'>('idle');
  const [logs, setLogs] = useState<LogLine[]>([]);
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [currentProgress, setCurrentProgress] = useState(0);

  // Convex Mutation
  const addPipeline = useMutation(api.pipelines.add);

  const mockSteps = [
    { text: 'Parsing user prompt for architecture details...', type: 'plan' as const },
    { text: 'Analyzing text constraints and pipeline requirements...', type: 'info' as const },
    { text: 'Configuring document loaders and chunk size (Size: 512, Overlap: 50)...', type: 'process' as const },
    { text: 'Setting up embedding generator parameters...', type: 'process' as const },
    { text: 'Connecting vector database cluster...', type: 'process' as const },
    { text: 'Computing embeddings and indexing mock vectors...', type: 'process' as const },
    { text: 'Configuring retriever logic with MMR reranking...', type: 'process' as const },
    { text: 'Linking system instructions to prompt context templates...', type: 'process' as const },
    { text: 'Simulating query testing... Retrieval Latency: 22ms.', type: 'eval' as const },
    { text: 'Running sanity check tests... 100% tests passed.', type: 'eval' as const },
    { text: 'SUCCESS: RAG Pipeline compiled & deployed!', type: 'success' as const },
    { text: 'Pushed configuration to active pipeline catalog.', type: 'success' as const }
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

    const interval = setInterval(async () => {
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
        
        // Auto-save the parsed pipeline to Convex at the end of compilation!
        try {
          const lowerPrompt = prompt.toLowerCase();
          
          // Simple heuristics
          const detectedDB = lowerPrompt.includes('pinecone') ? 'Pinecone' 
                           : lowerPrompt.includes('qdrant') ? 'Qdrant' 
                           : lowerPrompt.includes('pgvector') ? 'pgvector' 
                           : 'ChromaDB';
          
          const detectedModel = lowerPrompt.includes('mistral') ? 'Mistral-7B' 
                              : lowerPrompt.includes('gpt') ? 'GPT-4o' 
                              : 'Llama-3-8B';

          const namePrefix = lowerPrompt.includes('support') ? 'Support Retriever'
                           : lowerPrompt.includes('pdf') ? 'PDF Knowledge Base'
                           : 'Prompt Compiled RAG';

          await addPipeline({
            name: `${namePrefix} (${detectedDB})`,
            description: `Auto-compiled from prompt: "${prompt.slice(0, 50)}..."`,
            provider: detectedDB,
            model: detectedModel,
            chunkSize: 512,
            chunkOverlap: 50,
            systemPrompt: 'You are a compiled RAG assistant. Answer questions using only retrieved prompt context.',
            appType: 'rag',
            scaleLimit: '50,000 Users',
            cloudTarget: 'AWS Fargate'
          });
        } catch (err) {
          console.error('Failed to auto-save compiled pipeline:', err);
        }

        setStatus('success');
      }
    }, 800);

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
    { id: 5, label: 'Catalog Registry', icon: CheckCircle }
  ];

  return (
    <div className="glass-card" style={{ padding: '30px', background: 'rgba(13, 17, 28, 0.4)' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <div>
          <h3 style={{ fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '10px', color: '#fff' }}>
            <Sparkles size={20} style={{ color: '#fff' }} />
            Prompt-to-RAG Compiler Wizard
          </h3>
          <p style={{ color: 'var(--muted-color)', fontSize: '0.85rem', marginTop: '4px' }}>
            Describe your pipeline features. The compiler will structure, trace, and auto-catalog it.
          </p>
        </div>
        
        {status !== 'idle' && (
          <button 
            onClick={handleReset} 
            className="nav-btn" 
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 14px', fontSize: '0.8rem' }}
          >
            <RefreshCw size={12} className={status === 'compiling' ? 'spin-anim' : ''} />
            Configure New Prompt
          </button>
        )}
      </div>

      <div className="interactive-rag-grid" style={{ gap: '30px' }}>
        {/* Left Column: Input / Log stream */}
        <div>
          {status === 'idle' ? (
            <form onSubmit={handleStart} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div className="input-group">
                <label className="input-label">Natural Language Specification</label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="input-field"
                  rows={4}
                  style={{ resize: 'none', lineHeight: '1.5' }}
                />
              </div>
              <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }}>
                <Play size={16} fill="currentColor" />
                Compile & Register
              </button>
            </form>
          ) : (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#e5e7eb', letterSpacing: '0.5px' }}>
                  {status === 'compiling' ? 'COMPILING SPECIFICATION...' : 'COMPILATION SUCCESSFUL'}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--muted-color)' }}>{currentProgress}%</span>
              </div>
              <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden', marginBottom: '20px' }}>
                <div 
                  style={{ 
                    height: '100%', 
                    width: `${currentProgress}%`, 
                    background: '#22c55e',
                    transition: 'width 0.4s ease'
                  }} 
                />
              </div>

              {/* Terminal Logs */}
              <div className="rag-builder-widget" style={{ minHeight: '260px', height: '260px', overflowY: 'auto' }}>
                <div className="terminal-header">
                  <div className="terminal-dots">
                    <span className="terminal-dot red" />
                    <span className="terminal-dot yellow" />
                    <span className="terminal-dot green" />
                  </div>
                  <span className="terminal-title">zyntral-compiler.sh</span>
                </div>
                <div className="terminal-body" style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  {logs.map((log, idx) => {
                    let color = '#94a3b8';
                    if (log.type === 'plan') color = '#f8fafc';
                    else if (log.type === 'eval') color = '#64748b';
                    else if (log.type === 'success') color = '#22c55e';
                    
                    return (
                      <div key={idx} style={{ fontSize: '0.8rem', color }}>
                        <span style={{ color: 'rgba(255,255,255,0.15)', marginRight: '8px' }}>[{log.timestamp}]</span>
                        {log.text}
                      </div>
                    );
                  })}
                  {status === 'compiling' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', color: 'var(--muted-color)' }}>
                      <span style={{ width: '6px', height: '12px', background: '#22c55e', animation: 'caret-blink 0.8s infinite', display: 'inline-block' }}></span>
                      <span>Indexing pipeline modules...</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Steps diagram */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '15px' }}>
          <span className="input-label" style={{ marginBottom: '5px' }}>Pipeline Topology Status</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {flowNodes.map((node, index) => {
              const IconComp = node.icon;
              const isActive = activeStep === node.id;
              const isFinished = activeStep > node.id || status === 'success';
              
              let styleBorder = 'rgba(255, 255, 255, 0.03)';
              let styleBg = 'rgba(255, 255, 255, 0.01)';
              let iconColor = 'var(--muted-color)';
              let textColor = 'var(--muted-color)';
              
              if (isActive) {
                styleBorder = 'rgba(34, 197, 94, 0.2)';
                styleBg = 'rgba(34, 197, 94, 0.02)';
                iconColor = '#ffffff';
                textColor = '#ffffff';
              } else if (isFinished) {
                styleBorder = 'rgba(255, 255, 255, 0.08)';
                styleBg = 'rgba(255, 255, 255, 0.02)';
                iconColor = '#cbd5e1';
                textColor = '#cbd5e1';
              }

              return (
                <div key={node.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                  <div 
                    style={{ 
                      width: '100%', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '12px', 
                      padding: '10px 18px', 
                      borderRadius: '8px', 
                      border: `1px solid ${styleBorder}`,
                      background: styleBg,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <IconComp size={16} style={{ color: iconColor }} />
                    <span style={{ fontSize: '0.85rem', fontWeight: 500, color: textColor }}>{node.label}</span>
                    {isFinished && <CheckCircle size={12} style={{ marginLeft: 'auto', color: 'var(--green)' }} />}
                    {isActive && <div className="pulse-dot" style={{ marginLeft: 'auto', width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }} />}
                  </div>
                  {index < flowNodes.length - 1 && (
                    <div style={{ width: '1px', height: '10px', background: isFinished ? 'rgba(255,255,255,0.1)' : 'rgba(255, 255, 255, 0.03)', margin: '1px 0' }}></div>
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
