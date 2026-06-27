import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { SEO } from '../components/SEO';
import { 
  Database, Cpu, ArrowRight, Play, 
  Sliders, Terminal, Sparkles, MessageSquare,
  BarChart2, Search, ChevronDown,
  FileText, Cloud, Layers, PlusCircle, Code, Copy, Download, Check
} from 'lucide-react';

interface MockChunk {
  score: number;
  text: string;
  source: string;
}

interface CanvasNode {
  id: string;
  type: 'source' | 'database' | 'model' | 'cloud';
  name: string;
  details: string;
  icon: any;
  color: string;
}

// Donut Chart Component
const DonutChart: React.FC<{ data: { label: string; value: number; color: string }[] }> = ({ data }) => {
  const total = data.reduce((acc, d) => acc + d.value, 0);
  let accumulatedAngle = 0;

  return (
    <div className="donut-chart-wrapper" style={{ alignItems: 'center' }}>
      <div style={{ position: 'relative', width: '130px', height: '130px', flexShrink: 0 }}>
        <svg width="100%" height="100%" viewBox="0 0 42 42" className="donut">
          <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
          {data.map((item, idx) => {
            const percentage = total > 0 ? (item.value / total) * 100 : 0;
            const strokeDashArray = `${percentage} ${100 - percentage}`;
            const strokeDashOffset = 100 - accumulatedAngle + 25;
            accumulatedAngle += percentage;

            return (
              <circle
                key={idx}
                cx="21"
                cy="21"
                r="15.915"
                fill="transparent"
                stroke={item.color}
                strokeWidth="4"
                strokeDasharray={strokeDashArray}
                strokeDashoffset={strokeDashOffset}
                style={{ transition: 'stroke-dasharray 0.3s ease' }}
              />
            );
          })}
        </svg>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>
            {total > 0 ? `${Math.round((data[0]?.value / total) * 100)}%` : '0%'}
          </span>
          <span style={{ fontSize: '0.6rem', color: '#8a99ad', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.5px' }}>
            {data[0]?.label || 'Active'}
          </span>
        </div>
      </div>
      
      {/* Legend */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem' }}>
        {data.map((item, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color }} />
            <span style={{ color: '#8a99ad', fontWeight: 500, width: '80px' }}>{item.label}</span>
            <span style={{ color: '#ffffff', fontWeight: 700 }}>{item.value}</span>
            <span style={{ color: '#475569' }}>({total > 0 ? Math.round((item.value / total) * 100) : 0}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Workspace: React.FC = () => {
  // Convex queries & mutations
  const pipelines = useQuery(api.pipelines.get) || [];
  const addPipeline = useMutation(api.pipelines.add);

  // Tabs layout
  const [activeTab, setActiveTab] = useState<'analytics' | 'builder' | 'create' | 'execution'>('builder');

  // Command Palette
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [commandSearchQuery, setCommandSearchQuery] = useState('');

  // Preset Templates
  const PRODUCTION_TEMPLATES = [
    {
      name: "Customer Support AI SaaS",
      prompt: "Build an automated customer support AI agent for handling software inquiries. Ingest product documents, scan websites for answers, and forward complex tickets to Zendesk.",
      provider: "pgvector",
      model: "Llama-3-8B",
      appType: "rag",
      scale: "50,000 Users",
      cloud: "AWS Fargate"
    },
    {
      name: "Autonomous Contract Analyst",
      prompt: "Develop an autonomous legal assistant to review commercial agreements. Extract clauses, analyze compliance risks against handbook guidelines, and highlight exceptions.",
      provider: "Qdrant",
      model: "GPT-4o",
      appType: "website",
      scale: "10,000 Users",
      cloud: "Vercel Edge"
    },
    {
      name: "Medical Records Retrieval Hub",
      prompt: "Create an enterprise clinical records retrieval pipeline. Search patient case histories, filter by medical department metadata, and sync updates automatically.",
      provider: "Pinecone",
      model: "Mistral-7B",
      appType: "training",
      scale: "100,000+ Users",
      cloud: "Google Cloud"
    }
  ];

  // Visual Builder Canvas Nodes
  const [canvasNodes, setCanvasNodes] = useState<CanvasNode[]>([
    { id: 'src-1', type: 'source', name: 'File Ingestion', details: 'PDFs, DOCX, TXT files', icon: FileText, color: '#22c55e' },
    { id: 'db-1', type: 'database', name: 'PostgreSQL DB', details: 'pgvector extension', icon: Database, color: '#4ade80' },
    { id: 'model-1', type: 'model', name: 'Llama-3-8B', details: 'Meta local weights', icon: Cpu, color: '#cbd5e1' },
    { id: 'cloud-1', type: 'cloud', name: 'AWS ECS Fargate', details: 'Serverless deployment', icon: Cloud, color: '#a1a1aa' }
  ]);

  // App Creator Prompt Configurator Form
  const [promptInput, setPromptInput] = useState('Build a customer support AI platform capable of serving 50,000 users. Use enterprise RAG across PDFs and websites, multi-agent orchestration, PostgreSQL, Redis, and deploy on AWS.');
  const [appType, setAppType] = useState('rag'); // website, rag, training
  const [dbProvider, setDbProvider] = useState('pgvector'); // pgvector, Pinecone, Qdrant, ChromaDB
  const [scaleLimit, setScaleLimit] = useState('50,000 Users'); // 10k, 50k, 100k+
  const [cloudTarget, setCloudTarget] = useState('AWS Fargate'); // AWS, Vercel, Google Cloud, Azure
  const [modelType, setModelType] = useState('Llama-3-8B'); // Llama-3-8B, GPT-4o, Mistral-7B

  // Log compilation states
  const [buildLogs, setBuildLogs] = useState<string[]>([]);
  const [isCompiling, setIsCompiling] = useState(false);
  const [compiledFiles, setCompiledFiles] = useState<{ name: string; content: string }[]>([]);
  const [selectedFileName, setSelectedFileName] = useState<string>('');

  // UI Interactive States
  const [copyingFile, setCopyingFile] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Playground test panel states
  const [queryInput, setQueryInput] = useState('');
  const [chatLog, setChatLog] = useState<{ query: string; answer: string; chunks: MockChunk[]; latency: number }[]>([]);
  const [isQuerying, setIsQuerying] = useState(false);

  // Form notifications
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Calculator Estimates mapping
  const getBudgetEstimate = () => {
    let base = 0;
    if (cloudTarget === 'AWS Fargate') base += 65;
    else if (cloudTarget === 'Vercel Edge') base += 10;
    else base += 45; // GCP / Azure

    if (dbProvider === 'Pinecone') base += 70;
    else if (dbProvider === 'pgvector') base += 15;
    else base += 25; // Qdrant / Chroma

    if (scaleLimit === '50,000 Users') base *= 1.8;
    else if (scaleLimit === '100,000+ Users') base *= 3.5;

    return Math.round(base);
  };

  const getLatencyEstimate = () => {
    let latency = 0;
    // Database search time
    if (dbProvider === 'pgvector') latency += 14;
    else if (dbProvider === 'Pinecone') latency += 48;
    else if (dbProvider === 'Qdrant') latency += 22;
    else latency += 8; // ChromaDB

    // Model runtime latency
    if (modelType === 'Llama-3-8B') latency += 115;
    else if (modelType === 'GPT-4o') latency += 240;
    else latency += 85; // Mistral-7B

    return latency;
  };

  const getVramEstimate = () => {
    if (modelType === 'Llama-3-8B') return '16.0 GB (Local Host)';
    if (modelType === 'Mistral-7B') return '8.5 GB (Local Host)';
    return '0.0 GB (SaaS Cloud)';
  };

  const getComplianceEstimate = () => {
    if (cloudTarget === 'AWS Fargate' && dbProvider === 'pgvector') return 'SOC-2, HIPAA, GDPR';
    if (cloudTarget === 'Vercel Edge') return 'GDPR Compliant';
    return 'SOC-2 Certified';
  };

  // Auto Scroll Refs
  const terminalEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [buildLogs]);

  // Load preset template
  const handleLoadTemplate = (tpl: typeof PRODUCTION_TEMPLATES[0]) => {
    setPromptInput(tpl.prompt);
    setDbProvider(tpl.provider);
    setAppType(tpl.appType);
    setScaleLimit(tpl.scale);
    setCloudTarget(tpl.cloud);
    setModelType(tpl.model);
    setSuccessMsg(`Loaded preset template: "${tpl.name}"`);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  // Copy code to clipboard
  const handleCopyCode = () => {
    const file = compiledFiles.find(f => f.name === selectedFileName);
    if (!file) return;
    navigator.clipboard.writeText(file.content);
    setCopyingFile(true);
    setTimeout(() => setCopyingFile(false), 2000);
  };

  // Download entire compiled code stack bundle
  const handleDownloadBundle = () => {
    if (compiledFiles.length === 0) return;
    
    // Package files into a JSON structure
    const bundleObj = {
      project: "Zyntral Generated AI Architecture",
      compiledAt: new Date().toISOString(),
      database: dbProvider,
      model: modelType,
      targetCloud: cloudTarget,
      files: compiledFiles
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(bundleObj, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `zyntral_stack_${dbProvider.toLowerCase()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  // Compile Trigger (Form submit)
  const handleCompileApp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptInput.trim()) {
      setErrorMsg('Application prompt target cannot be empty.');
      return;
    }

    setIsCompiling(true);
    setActiveTab('execution');
    setBuildLogs(["[00:01] Starting Zyntral compiler daemon...", "[00:02] Parsing prompt specifications..."]);
    setCompiledFiles([]);
    setErrorMsg('');

    try {
      // Save built configuration to Convex
      await addPipeline({
        name: `App Stack - ${dbProvider}`,
        description: promptInput.substring(0, 100) + "...",
        provider: dbProvider,
        model: modelType,
        chunkSize: 512,
        chunkOverlap: 50,
        systemPrompt: `You are an AI assistant configured to run compiled RAG retrievals on ${dbProvider} database under scale of ${scaleLimit}.`,
        appType: appType,
        scaleLimit: scaleLimit,
        cloudTarget: cloudTarget
      });

      // Simulated compilation steps
      setTimeout(() => {
        setBuildLogs(prev => [...prev, "[00:04] Ingestion source nodes identified.", "[00:06] Designing schema definition mappings..."]);
      }, 1000);

      setTimeout(() => {
        setBuildLogs(prev => [...prev, `[00:10] ✓ Compiled schema.sql database layout for ${dbProvider}.`, `[00:14] ✓ Configured deployment targets for ${cloudTarget}.`]);
      }, 2500);

      setTimeout(() => {
        setBuildLogs(prev => [
          ...prev, 
          "[00:20] ✓ Compiled runtime agent workflows (agent.py).", 
          "[00:25] ✓ Generated cloud provisioning configs (main.tf).",
          `[00:30] ✓ Provisioning complete: App deployed successfully at ${cloudTarget}.`,
          "Status: Running."
        ]);

        // Code structures generated by the compilation
        const files = [
          {
            name: "schema.sql",
            content: `-- Target DB: ${dbProvider}\nCREATE TABLE document_chunks (\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  content TEXT NOT NULL,\n  metadata JSONB DEFAULT '{}',\n  embedding VECTOR(1536) -- Match embedding space dims\n);\n\nCREATE INDEX idx_vector_cos ON document_chunks USING hnsw (embedding vector_cosine_ops);`
          },
          {
            name: "main.tf",
            content: `# Target Cloud: ${cloudTarget}\nprovider "aws" {\n  region = "us-east-1"\n}\n\nresource "aws_ecs_cluster" "app_cluster" {\n  name = "zyntral-runtime-cluster"\n}\n\nresource "aws_ecs_task_definition" "app_task" {\n  family = "zyntral-agent-runner"\n  container_definitions = jsonencode([\n    {\n      name  = "runtime-agent"\n      image = "zyntral/runtime-agent:latest"\n      cpu   = 256\n      memory = 512\n    }\n  ])\n}`
          },
          {
            name: "agent.py",
            content: `# Generation LLM: ${modelType}\nimport os\nfrom zyntral_runtime import RAGCompiler, AgentOrchestrator\n\n# Load runtime compiled vectors\nrag = RAGCompiler(db="${dbProvider}", chunk_size=512)\nagent = AgentOrchestrator(model="${modelType}")\n\ndef run_workflow(user_query):\n    context = rag.retrieve_context(user_query)\n    prompt = f"Context:\\n{context}\\n\\nQuery: {user_query}"\n    return agent.generate_response(prompt)\n`
          },
          {
            name: "docker-compose.yml",
            content: `version: "3.8"\nservices:\n  backend-api:\n    image: zyntral/runtime-backend:latest\n    ports:\n      - "8080:8080"\n    environment:\n      - DB_PROVIDER=${dbProvider}\n      - LLM_MODEL=${modelType}\n      - SCALE_LIMIT=${scaleLimit}\n  vector-db:\n    image: ${dbProvider.toLowerCase()}/database:latest\n    ports:\n      - "5432:5432"`
          }
        ];

        setCompiledFiles(files);
        setSelectedFileName(files[0].name);
        setIsCompiling(false);
      }, 4500);

    } catch (err) {
      console.error(err);
      setBuildLogs(prev => [...prev, "Error: Compilation failed. check connections."]);
      setIsCompiling(false);
    }
  };

  // Add items from palette to visual canvas
  const handleAddCanvasNode = (type: 'source' | 'database' | 'model' | 'cloud', name: string, details: string) => {
    setCanvasNodes(prev => {
      const filtered = prev.filter(n => n.type !== type);
      const color = type === 'source' ? '#22c55e' : type === 'database' ? '#4ade80' : type === 'model' ? '#cbd5e1' : '#a1a1aa';
      return [
        ...filtered,
        { id: `${type}-${Date.now()}`, type, name, details, icon: type === 'source' ? FileText : type === 'database' ? Database : type === 'model' ? Cpu : Cloud, color }
      ];
    });
  };

  const handleRemoveCanvasNode = (id: string) => {
    setCanvasNodes(prev => prev.filter(n => n.id !== id));
  };

  // Quick compilation trigger from Visual Canvas
  const handleCompileCanvas = async () => {
    const dbNode = canvasNodes.find(n => n.type === 'database');
    const modelNode = canvasNodes.find(n => n.type === 'model');
    const cloudNode = canvasNodes.find(n => n.type === 'cloud');

    if (dbNode) setDbProvider(dbNode.name.includes('PostgreSQL') ? 'pgvector' : dbNode.name.replace(' DB', ''));
    if (modelNode) setModelType(modelNode.name);
    if (cloudNode) setCloudTarget(cloudNode.name.includes('AWS') ? 'AWS Fargate' : cloudNode.name);

    await handleCompileApp(new Event('submit') as any);
  };

  // Query Playground Chat
  const handlePlaygroundQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryInput.trim()) return;

    setIsQuerying(true);
    const mockLatency = Math.floor(Math.random() * 80) + getLatencyEstimate() - 20;

    const sampleChunks: MockChunk[] = [
      { score: 0.94, text: `Successfully connected to compiled ${dbProvider} database. Target pipeline matches prompt configurations.`, source: 'schema.sql' },
      { score: 0.81, text: `Deployment configurations mapped to ${cloudTarget} ECS runtime instance containers.`, source: 'main.tf' }
    ];

    setTimeout(() => {
      const mockAnswer = `Your compiled Zyntral application processed this request through the ${modelType} runtime layer. Using the ${dbProvider} index matching your blueprint parameters, context was fetched within ${mockLatency}ms with high similarity matching.`;
      
      setChatLog(prev => [
        { query: queryInput, answer: mockAnswer, chunks: sampleChunks, latency: mockLatency },
        ...prev
      ]);
      setQueryInput('');
      setIsQuerying(false);
    }, 1000);
  };

  // Command Palette commands list
  const defaultCommands = [
    { label: 'View Insights & Stats', action: () => { setActiveTab('analytics'); setIsCommandPaletteOpen(false); }, icon: '📊' },
    { label: 'Open Visual Canvas Builder', action: () => { setActiveTab('builder'); setIsCommandPaletteOpen(false); }, icon: '🎛️' },
    { label: 'Create New Configuration Wizard', action: () => { setActiveTab('create'); setIsCommandPaletteOpen(false); }, icon: '✍️' },
    { label: 'Inspect Execution Console', action: () => { setActiveTab('execution'); setIsCommandPaletteOpen(false); }, icon: '💻' }
  ];

  const filteredCommands = defaultCommands.filter(c => 
    c.label.toLowerCase().includes(commandSearchQuery.toLowerCase())
  );

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
        setCommandSearchQuery('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Format stats data
  const chartData = [
    { label: 'pgvector', value: pipelines.filter((p: any) => p.provider === 'pgvector').length || 8, color: '#22c55e' },
    { label: 'Pinecone', value: pipelines.filter((p: any) => p.provider === 'Pinecone').length || 4, color: '#86efac' },
    { label: 'Qdrant', value: pipelines.filter((p: any) => p.provider === 'Qdrant').length || 3, color: '#15803d' },
    { label: 'ChromaDB', value: pipelines.filter((p: any) => p.provider === 'ChromaDB').length || 2, color: '#cbd5e1' }
  ];

  const modelCounts = {
    'Llama-3-8B': pipelines.filter((p: any) => p.model === 'Llama-3-8B').length || 10,
    'Mistral-7B': pipelines.filter((p: any) => p.model === 'Mistral-7B').length || 4,
    'GPT-4o': pipelines.filter((p: any) => p.model === 'GPT-4o').length || 6,
  };
  const totalModels = modelCounts['Llama-3-8B'] + modelCounts['Mistral-7B'] + modelCounts['GPT-4o'];

  return (
    <div style={{
      backgroundColor: '#020204',
      backgroundImage: "radial-gradient(circle at 50% 0%, rgba(34, 197, 94, 0.08) 0%, rgba(2, 2, 4, 0.98) 70%)",
      minHeight: '100vh',
      paddingTop: '100px',
      paddingBottom: '40px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative'
    }}>
      <SEO
        title="Visual Workspace Console"
        description="Assemble, catalog, compile, and deploy production-ready AI infrastructures."
        path="/workspace"
      />

      {/* Outer Card Container */}
      <div className="workspace-container" style={{
        width: '94%',
        maxWidth: '1380px',
        background: 'rgba(15, 15, 15, 0.7)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        boxShadow: '0 30px 100px rgba(0, 0, 0, 0.75)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        color: '#f8fafc',
        fontFamily: "'Inter', sans-serif"
      }}>
        
        {/* Left Sidebar */}
        <div className="workspace-sidebar" style={{
          background: 'rgba(0, 0, 0, 0.25)',
          padding: '24px 16px'
        }}>
          <div>
            <div className="workspace-select" style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '10px',
              padding: '10px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontWeight: 650,
              fontSize: '0.82rem',
              cursor: 'pointer',
              marginBottom: '20px',
              color: '#ffffff'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1rem' }}>⚙️</span>
                <span>Workspace Node</span>
              </div>
              <ChevronDown size={14} style={{ color: '#8a99ad' }} />
            </div>

            {/* Search command shortcut */}
            <div 
              className="workspace-search"
              onClick={() => setIsCommandPaletteOpen(true)}
              style={{ position: 'relative', marginBottom: '24px', cursor: 'pointer' }}
            >
              <Search size={14} style={{ position: 'absolute', left: '12px', top: '11px', color: '#8a99ad' }} />
              <input 
                type="text" 
                placeholder="Search console commands..." 
                style={{
                  width: '100%',
                  padding: '8px 12px 8px 32px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  outline: 'none',
                  cursor: 'pointer',
                  color: '#ffffff'
                }}
                readOnly
              />
              <span style={{
                position: 'absolute',
                right: '8px',
                top: '7px',
                fontSize: '0.65rem',
                color: '#8a99ad',
                background: 'rgba(255,255,255,0.05)',
                padding: '2px 6px',
                borderRadius: '4px',
                fontWeight: 'bold'
              }}>⌘K</span>
            </div>

            {/* Navigation Tabs */}
            <div className="workspace-nav" style={{ gap: '4px' }}>
              <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#8a99ad', textTransform: 'uppercase', letterSpacing: '1px', paddingLeft: '8px', marginBottom: '8px', display: 'block' }}>
                Console Panels
              </span>
              
              <button 
                onClick={() => setActiveTab('builder')}
                style={{
                  background: activeTab === 'builder' ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 12px',
                  textAlign: 'left',
                  fontSize: '0.85rem',
                  fontWeight: activeTab === 'builder' ? 650 : 500,
                  color: activeTab === 'builder' ? '#ffffff' : '#8a99ad',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  width: '100%',
                  transition: 'background 0.2s'
                }}
              >
                <Layers size={16} /> Visual Canvas
              </button>

              <button 
                onClick={() => setActiveTab('create')}
                style={{
                  background: activeTab === 'create' ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 12px',
                  textAlign: 'left',
                  fontSize: '0.85rem',
                  fontWeight: activeTab === 'create' ? 650 : 500,
                  color: activeTab === 'create' ? '#ffffff' : '#8a99ad',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  width: '100%',
                  transition: 'background 0.2s'
                }}
              >
                <Sliders size={16} /> App Creator Wizard
              </button>

              <button 
                onClick={() => setActiveTab('execution')}
                style={{
                  background: activeTab === 'execution' ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 12px',
                  textAlign: 'left',
                  fontSize: '0.85rem',
                  fontWeight: activeTab === 'execution' ? 650 : 500,
                  color: activeTab === 'execution' ? '#ffffff' : '#8a99ad',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  width: '100%',
                  transition: 'background 0.2s'
                }}
              >
                <Terminal size={16} /> Execution Console
              </button>

              <button 
                onClick={() => setActiveTab('analytics')}
                style={{
                  background: activeTab === 'analytics' ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 12px',
                  textAlign: 'left',
                  fontSize: '0.85rem',
                  fontWeight: activeTab === 'analytics' ? 650 : 500,
                  color: activeTab === 'analytics' ? '#ffffff' : '#8a99ad',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  width: '100%',
                  transition: 'background 0.2s'
                }}
              >
                <BarChart2 size={16} /> Product Insights
              </button>
            </div>
          </div>

          {/* User badge */}
          <div className="workspace-user-profile" style={{
            paddingTop: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #a1a1aa 0%, #3f3f46 100%)',
              color: '#000000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '0.85rem'
            }}>
              U
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 650, color: '#ffffff' }}>Developer Node</div>
              <div style={{ fontSize: '0.65rem', color: '#8a99ad' }}>active session</div>
            </div>
          </div>
        </div>

        {/* Right Dashboard Area */}
        <div className="workspace-main" style={{
          display: 'flex',
          flexDirection: 'column'
        }}>
          
          {/* Top Info Header */}
          <div style={{
            padding: '24px 30px 0 30px',
            background: 'rgba(0, 0, 0, 0.15)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', flexWrap: 'wrap', gap: '15px' }}>
              <div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px', color: '#ffffff' }}>
                  💻 Zyntral Developer Console
                </h2>
                <p style={{ fontSize: '0.8rem', color: '#8a99ad', marginTop: '3px' }}>
                  Assemble, catalog, compile, and deploy production-ready AI infrastructures.
                </p>
              </div>
            </div>

            {/* Quick switcher buttons */}
            <div className="workspace-tabs-bar" style={{ gap: '24px' }}>
              <button 
                onClick={() => setActiveTab('builder')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  borderBottom: activeTab === 'builder' ? '2px solid #22c55e' : '2px solid transparent',
                  paddingBottom: '12px',
                  fontSize: '0.85rem',
                  fontWeight: activeTab === 'builder' ? 700 : 500,
                  color: activeTab === 'builder' ? '#ffffff' : '#8a99ad',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                🎛️ Visual Canvas
              </button>

              <button 
                onClick={() => setActiveTab('create')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  borderBottom: activeTab === 'create' ? '2px solid #22c55e' : '2px solid transparent',
                  paddingBottom: '12px',
                  fontSize: '0.85rem',
                  fontWeight: activeTab === 'create' ? 700 : 500,
                  color: activeTab === 'create' ? '#ffffff' : '#8a99ad',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                ✍️ App Creator Wizard
              </button>
              
              <button 
                onClick={() => setActiveTab('execution')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  borderBottom: activeTab === 'execution' ? '2px solid #22c55e' : '2px solid transparent',
                  paddingBottom: '12px',
                  fontSize: '0.85rem',
                  fontWeight: activeTab === 'execution' ? 700 : 500,
                  color: activeTab === 'execution' ? '#ffffff' : '#8a99ad',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                💻 Execution Console
              </button>

              <button 
                onClick={() => setActiveTab('analytics')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  borderBottom: activeTab === 'analytics' ? '2px solid #22c55e' : '2px solid transparent',
                  paddingBottom: '12px',
                  fontSize: '0.85rem',
                  fontWeight: activeTab === 'analytics' ? 700 : 500,
                  color: activeTab === 'analytics' ? '#ffffff' : '#8a99ad',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                📊 Product Insights
              </button>
            </div>
          </div>

          {/* Main content body */}
          <div style={{
            flex: 1,
            background: 'transparent',
            padding: '30px',
            overflowY: 'auto'
          }}>

            {/* TAB: VISUAL CANVAS */}
            {activeTab === 'builder' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.015)', border: '1px solid rgba(255, 255, 255, 0.04)', borderRadius: '16px', padding: '20px' }}>
                  <h3 style={{ fontSize: '1rem', color: '#ffffff', marginBottom: '8px' }}>Visual Architecture Blueprint</h3>
                  <p style={{ color: '#8a99ad', fontSize: '0.82rem', marginBottom: '20px' }}>
                    Click items in the component palette below to build your deployment pipelines dynamically.
                  </p>
                  
                  {/* Canvas Blueprint Grid */}
                  <div style={{
                    minHeight: '220px',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '16px',
                    padding: '35px 24px',
                    background: 'rgba(0, 0, 0, 0.35)',
                    backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 0)',
                    backgroundSize: '24px 24px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0px',
                    position: 'relative'
                  }}>
                    {canvasNodes.length === 0 ? (
                      <span style={{ color: '#475569', fontSize: '0.8rem', fontFamily: 'monospace' }}>
                        Blueprint canvas empty. Load elements below to start compiling.
                      </span>
                    ) : (
                      canvasNodes.map((node, index) => {
                        const Icon = node.icon;
                        return (
                          <React.Fragment key={node.id}>
                            <div className="canvas-card-wrapper" style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                              
                              {/* Left Port Dot */}
                              {index > 0 && (
                                <div style={{
                                  position: 'absolute',
                                  left: '-6px',
                                  top: 'calc(50% - 5px)',
                                  width: '10px',
                                  height: '10px',
                                  borderRadius: '50%',
                                  background: '#22c55e',
                                  border: '2px solid #000',
                                  zIndex: 10
                                }} />
                              )}

                              <div className="glass-card visual-node-card" style={{
                                padding: '16px 20px',
                                border: `1px solid ${node.color}40`,
                                background: 'rgba(15, 15, 15, 0.95)',
                                borderRadius: '12px',
                                minWidth: '160px',
                                boxShadow: `0 4px 20px ${node.color}08`,
                                transform: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                position: 'relative',
                                margin: '0 8px'
                              }}>
                                <div style={{ color: node.color }}><Icon size={20} /></div>
                                <div>
                                  <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#ffffff' }}>{node.name}</div>
                                  <div style={{ fontSize: '0.62rem', color: '#8a99ad', marginTop: '2px' }}>{node.details}</div>
                                </div>
                                <button 
                                  onClick={() => handleRemoveCanvasNode(node.id)}
                                  style={{
                                    position: 'absolute',
                                    top: '4px',
                                    right: '4px',
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#475569',
                                    cursor: 'pointer',
                                    fontSize: '0.75rem'
                                  }}
                                >
                                  ✕
                                </button>
                              </div>

                              {/* Right Port Dot */}
                              {index < canvasNodes.length - 1 && (
                                <div style={{
                                  position: 'absolute',
                                  right: '-6px',
                                  top: 'calc(50% - 5px)',
                                  width: '10px',
                                  height: '10px',
                                  borderRadius: '50%',
                                  background: '#22c55e',
                                  border: '2px solid #000',
                                  zIndex: 10
                                }} />
                              )}
                            </div>

                            {/* Bezier SVG Line Connector */}
                            {index < canvasNodes.length - 1 && (
                              <div style={{ width: '60px', height: '40px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg width="100%" height="100%" viewBox="0 0 60 40" style={{ pointerEvents: 'none' }}>
                                  <path 
                                    d="M 0 20 C 30 20, 30 20, 60 20" 
                                    stroke="url(#connectorGrad)" 
                                    strokeWidth="2.5" 
                                    fill="none" 
                                    strokeDasharray="5 3"
                                    className="data-wire-flow"
                                  />
                                  <defs>
                                    <linearGradient id="connectorGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                      <stop offset="0%" stopColor={node.color} />
                                      <stop offset="100%" stopColor={canvasNodes[index + 1].color} />
                                    </linearGradient>
                                  </defs>
                                </svg>
                              </div>
                            )}
                          </React.Fragment>
                        );
                      })
                    )}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                    <button 
                      onClick={handleCompileCanvas}
                      className="btn-primary"
                      disabled={canvasNodes.length === 0 || isCompiling}
                      style={{
                        background: 'linear-gradient(135deg, #22c55e 0%, #15803d 100%)',
                        border: 'none',
                        boxShadow: '0 0 15px rgba(34, 197, 94, 0.2)'
                      }}
                    >
                      <Code size={16} /> {isCompiling ? "Compiling..." : "Compile Visual Blueprint Stack"}
                    </button>
                  </div>
                </div>

                {/* Palette Select list */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
                  {[
                    {
                      category: "Sources",
                      items: [
                        { name: "File Ingestion", details: "PDFs, DOCX, TXT", type: 'source' as const },
                        { name: "Website Scraper", details: "Web crawler indexer", type: 'source' as const },
                        { name: "Slack Linker", details: "Message stream API", type: 'source' as const }
                      ]
                    },
                    {
                      category: "Databases",
                      items: [
                        { name: "PostgreSQL DB", details: "pgvector extension", type: 'database' as const },
                        { name: "Qdrant Node", details: "Local database store", type: 'database' as const },
                        { name: "Pinecone Index", details: "Cloud vector driver", type: 'database' as const }
                      ]
                    },
                    {
                      category: "LLM Weights",
                      items: [
                        { name: "Llama-3-8B", details: "Meta parameter setup", type: 'model' as const },
                        { name: "GPT-4o", details: "OpenAI runtime model", type: 'model' as const },
                        { name: "Mistral-7B", details: "Mistral weights format", type: 'model' as const }
                      ]
                    },
                    {
                      category: "Deployment Target",
                      items: [
                        { name: "AWS ECS Fargate", details: "Serverless containers", type: 'cloud' as const },
                        { name: "Vercel Edge", details: "Global CDN handlers", type: 'cloud' as const },
                        { name: "Google Cloud Run", details: "Containerized tasks", type: 'cloud' as const }
                      ]
                    }
                  ].map((cat, cIdx) => (
                    <div key={cIdx} className="glass-card" style={{ padding: '20px', background: 'rgba(255, 255, 255, 0.015)', border: '1px solid rgba(255, 255, 255, 0.04)', borderRadius: '12px', boxShadow: 'none' }}>
                      <span style={{ fontSize: '0.66rem', fontWeight: 800, color: '#22c55e', textTransform: 'uppercase', display: 'block', marginBottom: '15px' }}>
                        {cat.category}
                      </span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {cat.items.map((item, idx) => (
                          <div
                            key={idx}
                            onClick={() => handleAddCanvasNode(item.type, item.name, item.details)}
                            style={{
                              padding: '10px 12px',
                              borderRadius: '8px',
                              background: 'rgba(255,255,255,0.02)',
                              border: '1px solid rgba(255,255,255,0.04)',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              fontSize: '0.78rem',
                              transition: 'all 0.2s'
                            }}
                            className="palette-item-hover"
                          >
                            <div>
                              <div style={{ fontWeight: 'bold', color: '#ffffff' }}>{item.name}</div>
                              <div style={{ fontSize: '0.62rem', color: '#8a99ad' }}>{item.details}</div>
                            </div>
                            <PlusCircle size={14} style={{ color: '#22c55e' }} />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: APP CREATOR WIZARD */}
            {activeTab === 'create' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                
                {/* Enterprise preset templates */}
                <div>
                  <span style={{ fontSize: '0.66rem', fontWeight: 800, color: '#22c55e', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '12px', fontFamily: 'monospace' }}>
                    Enterprise App Stack Templates
                  </span>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                    {PRODUCTION_TEMPLATES.map((tpl, idx) => (
                      <div 
                        key={idx}
                        onClick={() => handleLoadTemplate(tpl)}
                        className="glass-card template-card"
                        style={{
                          padding: '20px',
                          cursor: 'pointer',
                          background: 'rgba(255, 255, 255, 0.01)',
                          border: '1px solid rgba(255, 255, 255, 0.04)',
                          borderRadius: '14px',
                          boxShadow: 'none',
                          transform: 'none',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '10px'
                        }}
                      >
                        <h4 style={{ fontSize: '0.9rem', color: '#ffffff', fontWeight: 700 }}>{tpl.name}</h4>
                        <p style={{ fontSize: '0.7rem', color: '#8a99ad', lineHeight: '1.4', flex: 1 }}>{tpl.prompt}</p>
                        
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '5px' }}>
                          <span style={{ fontSize: '0.58rem', background: 'rgba(34, 197, 94, 0.08)', color: '#4ade80', padding: '2px 6px', borderRadius: '4px' }}>
                            {tpl.provider}
                          </span>
                          <span style={{ fontSize: '0.58rem', background: 'rgba(255, 255, 255, 0.04)', color: '#cbd5e1', padding: '2px 6px', borderRadius: '4px' }}>
                            {tpl.cloud}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Prompt Configurator Columns (Form + Specs calculator) */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '30px', alignItems: 'start' }}>
                  
                  {/* Parameter Selection Form */}
                  <form onSubmit={handleCompileApp} className="glass-card" style={{ padding: '30px', background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', boxShadow: 'none', transform: 'none' }}>
                    <h3 style={{ fontSize: '1.1rem', color: '#ffffff', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Sliders size={18} style={{ color: '#22c55e' }} /> Configure App Parameters
                    </h3>

                    {errorMsg && (
                      <div style={{ padding: '10px 14px', background: 'rgba(220, 38, 38, 0.1)', border: '1px solid rgba(220, 38, 38, 0.2)', borderRadius: '8px', color: '#fca5a5', fontSize: '0.8rem', marginBottom: '20px' }}>
                        {errorMsg}
                      </div>
                    )}

                    {successMsg && (
                      <div style={{ padding: '10px 14px', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.2)', borderRadius: '8px', color: '#86efac', fontSize: '0.8rem', marginBottom: '20px' }}>
                        {successMsg}
                      </div>
                    )}

                    <div className="input-group">
                      <label className="input-label" style={{ color: '#8a99ad' }}>Describe your Production AI App</label>
                      <textarea 
                        rows={4}
                        value={promptInput} 
                        onChange={(e) => setPromptInput(e.target.value)} 
                        className="input-field" 
                        placeholder="e.g. Build an automated customer support AI agent for handling software inquiries..."
                        style={{ resize: 'none', background: 'rgba(0, 0, 0, 0.3)', border: '1px solid rgba(255, 255, 255, 0.08)', color: '#ffffff' }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                      <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="input-label" style={{ color: '#8a99ad' }}>Application Core</label>
                        <select 
                          value={appType} 
                          onChange={(e) => setAppType(e.target.value)} 
                          className="input-field"
                          style={{ background: 'rgba(0, 0, 0, 0.3)', border: '1px solid rgba(255, 255, 255, 0.08)', color: '#ffffff', height: '40px' }}
                        >
                          <option value="rag">Enterprise RAG Pipeline</option>
                          <option value="website">Autonomous Agent Workflow</option>
                          <option value="training">LLM Fine-Tuning Stack</option>
                        </select>
                      </div>

                      <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="input-label" style={{ color: '#8a99ad' }}>Database Driver</label>
                        <select 
                          value={dbProvider} 
                          onChange={(e) => setDbProvider(e.target.value)} 
                          className="input-field"
                          style={{ background: 'rgba(0, 0, 0, 0.3)', border: '1px solid rgba(255, 255, 255, 0.08)', color: '#ffffff', height: '40px' }}
                        >
                          <option value="pgvector">pgvector (PostgreSQL)</option>
                          <option value="Qdrant">Qdrant Node</option>
                          <option value="Pinecone">Pinecone Cloud</option>
                          <option value="ChromaDB">ChromaDB Local</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px', marginBottom: '25px' }}>
                      <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="input-label" style={{ color: '#8a99ad' }}>User Capacity Scale</label>
                        <select 
                          value={scaleLimit} 
                          onChange={(e) => setScaleLimit(e.target.value)} 
                          className="input-field"
                          style={{ background: 'rgba(0, 0, 0, 0.3)', border: '1px solid rgba(255, 255, 255, 0.08)', color: '#ffffff', height: '40px' }}
                        >
                          <option value="10,000 Users">10,000 Concurrent Users</option>
                          <option value="50,000 Users">50,000 Concurrent Users</option>
                          <option value="100,000+ Users">100,000+ Concurrent Users</option>
                        </select>
                      </div>

                      <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="input-label" style={{ color: '#8a99ad' }}>Deployment Target</label>
                        <select 
                          value={cloudTarget} 
                          onChange={(e) => setCloudTarget(e.target.value)} 
                          className="input-field"
                          style={{ background: 'rgba(0, 0, 0, 0.3)', border: '1px solid rgba(255, 255, 255, 0.08)', color: '#ffffff', height: '40px' }}
                        >
                          <option value="AWS Fargate">AWS ECS / Fargate</option>
                          <option value="Vercel Edge">Vercel Edge Functions</option>
                          <option value="Google Cloud">Google Cloud Run</option>
                          <option value="Azure Tasks">Azure Container Apps</option>
                        </select>
                      </div>
                    </div>

                    <div className="input-group" style={{ marginBottom: '25px' }}>
                      <label className="input-label" style={{ color: '#8a99ad' }}>LLM Core Router</label>
                      <select 
                        value={modelType} 
                        onChange={(e) => setModelType(e.target.value)} 
                        className="input-field"
                        style={{ background: 'rgba(0, 0, 0, 0.3)', border: '1px solid rgba(255, 255, 255, 0.08)', color: '#ffffff', height: '40px' }}
                      >
                        <option value="Llama-3-8B">Llama-3-8B (Meta Parameter weights)</option>
                        <option value="GPT-4o">GPT-4o Cloud Router (OpenAI SaaS)</option>
                        <option value="Mistral-7B">Mistral-7B (Local Model runner)</option>
                      </select>
                    </div>

                    <button 
                      type="submit" 
                      className="btn-primary" 
                      disabled={isCompiling}
                      style={{ 
                        width: '100%', 
                        justifyContent: 'center',
                        background: 'linear-gradient(135deg, #22c55e 0%, #15803d 100%)',
                        color: '#ffffff',
                        border: 'none',
                        fontWeight: 700,
                        borderRadius: '8px',
                        padding: '12px',
                        fontSize: '0.85rem',
                        boxShadow: '0 0 15px rgba(34, 197, 94, 0.2)'
                      }}
                    >
                      <Play size={14} fill="currentColor" /> {isCompiling ? "Compiling Architecture..." : "Compile & Provision Infrastructure"}
                    </button>
                  </form>

                  {/* Provisioning calculator sidebar */}
                  <div className="glass-card" style={{ padding: '30px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '16px', height: '100%' }}>
                    <h3 style={{ fontSize: '1rem', color: '#ffffff', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '10px' }}>
                      📋 Provisioning Spec Summary
                    </h3>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      <div>
                        <span style={{ fontSize: '0.66rem', color: '#8a99ad', textTransform: 'uppercase', display: 'block', fontWeight: 600 }}>Estimated Hosting Cost</span>
                        <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#22c55e', marginTop: '4px' }}>
                          ${getBudgetEstimate()}<span style={{ fontSize: '0.85rem', fontWeight: 'normal', color: '#8a99ad' }}>/mo</span>
                        </div>
                        <span style={{ fontSize: '0.62rem', color: '#475569' }}>Based on AWS Fargate compute + index rates.</span>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '15px' }}>
                        <div>
                          <span style={{ fontSize: '0.66rem', color: '#8a99ad', textTransform: 'uppercase', display: 'block' }}>Index Latency</span>
                          <span style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', display: 'block', marginTop: '2px' }}>
                            ~{getLatencyEstimate()}ms
                          </span>
                        </div>
                        <div>
                          <span style={{ fontSize: '0.66rem', color: '#8a99ad', textTransform: 'uppercase', display: 'block' }}>VRAM overhead</span>
                          <span style={{ fontSize: '0.82rem', fontWeight: 650, color: '#ffffff', display: 'block', marginTop: '3px' }}>
                            {getVramEstimate()}
                          </span>
                        </div>
                      </div>

                      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '15px' }}>
                        <span style={{ fontSize: '0.66rem', color: '#8a99ad', textTransform: 'uppercase', display: 'block' }}>Compliance Standards</span>
                        <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#cbd5e1', display: 'block', marginTop: '4px' }}>
                          ✓ {getComplianceEstimate()}
                        </span>
                      </div>

                      <div style={{ background: 'rgba(34,197,94,0.02)', border: '1px solid rgba(34,197,94,0.08)', borderRadius: '8px', padding: '12px 15px', marginTop: '10px' }}>
                        <span style={{ fontSize: '0.72rem', color: '#86efac', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>
                          ⚡ Optimization Hint:
                        </span>
                        <p style={{ fontSize: '0.68rem', color: '#8a99ad', lineHeight: '1.4' }}>
                          Deploying on {cloudTarget} with {dbProvider} ensures low latency query times and matches the {scaleLimit} capability parameters.
                        </p>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* TAB: EXECUTION CONSOLE */}
            {activeTab === 'execution' && (
              <div className="workspace-playground-grid" style={{ gap: '30px' }}>
                
                {/* Left Column: Build Logger / Code Inspector */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  
                  {/* Compilation log stream */}
                  <div className="glass-card" style={{ padding: '24px', background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', boxShadow: 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px' }}>
                      <Terminal size={16} style={{ color: '#22c55e' }} />
                      <h4 style={{ fontSize: '0.9rem', color: '#ffffff', fontWeight: 700 }}>Build Terminal Stream</h4>
                    </div>

                    <div style={{
                      background: '#010205',
                      border: '1px solid rgba(255,255,255,0.03)',
                      borderRadius: '8px',
                      padding: '12px 14px',
                      height: '140px',
                      overflowY: 'auto',
                      fontFamily: 'monospace',
                      fontSize: '0.68rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px'
                    }}>
                      {buildLogs.length === 0 ? (
                        <span style={{ color: '#475569', fontStyle: 'italic' }}>
                          No active compilation log. Launch a build in the visual canvas or wizard panels.
                        </span>
                      ) : (
                        buildLogs.map((log, idx) => (
                          <div 
                            key={idx} 
                            style={{ 
                              lineHeight: '1.4', 
                              color: log.includes('✓') || log.includes('Running')
                                ? '#22c55e' 
                                : log.startsWith('Error:')
                                  ? '#fca5a5'
                                  : '#8a99ad' 
                            }}
                          >
                            {log}
                          </div>
                        ))
                      )}
                      <div ref={terminalEndRef} />
                    </div>
                  </div>

                  {/* Compiled Code File Explorer */}
                  {compiledFiles.length > 0 && (
                    <div className="glass-card" style={{ padding: '24px', background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', boxShadow: 'none', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '10px' }}>
                        <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#22c55e', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          Compiled Workspace Files
                        </span>
                        
                        <button 
                          onClick={handleDownloadBundle}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: downloadSuccess ? '#22c55e' : '#cbd5e1',
                            cursor: 'pointer',
                            fontSize: '0.72rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontWeight: 650
                          }}
                        >
                          {downloadSuccess ? <Check size={12} /> : <Download size={12} />} 
                          {downloadSuccess ? 'Exported!' : 'Export Stack Zip'}
                        </button>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: '20px', minHeight: '220px' }}>
                        {/* File Selector */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', borderRight: '1px solid rgba(255,255,255,0.05)', paddingRight: '10px' }}>
                          {compiledFiles.map((file, idx) => (
                            <button
                              key={idx}
                              onClick={() => setSelectedFileName(file.name)}
                              style={{
                                background: selectedFileName === file.name ? 'rgba(255,255,255,0.04)' : 'transparent',
                                border: 'none',
                                borderRadius: '6px',
                                padding: '6px 10px',
                                color: selectedFileName === file.name ? '#ffffff' : '#8a99ad',
                                fontSize: '0.72rem',
                                fontWeight: selectedFileName === file.name ? 'bold' : 'normal',
                                textAlign: 'left',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
                              }}
                            >
                              <Code size={12} /> {file.name}
                            </button>
                          ))}
                        </div>

                        {/* File Code Display */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', height: '100%', position: 'relative' }}>
                          <button
                            onClick={handleCopyCode}
                            style={{
                              position: 'absolute',
                              top: '8px',
                              right: '8px',
                              background: 'rgba(255,255,255,0.05)',
                              border: '1px solid rgba(255,255,255,0.05)',
                              borderRadius: '4px',
                              padding: '4px 8px',
                              color: copyingFile ? '#22c55e' : '#cbd5e1',
                              fontSize: '0.62rem',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              zIndex: 10
                            }}
                          >
                            {copyingFile ? <Check size={10} /> : <Copy size={10} />}
                            {copyingFile ? 'Copied' : 'Copy'}
                          </button>

                          <textarea
                            value={compiledFiles.find(f => f.name === selectedFileName)?.content || ''}
                            onChange={(e) => {
                              const updatedContent = e.target.value;
                              setCompiledFiles(prev => 
                                prev.map(f => f.name === selectedFileName ? { ...f, content: updatedContent } : f)
                              );
                            }}
                            style={{
                              flex: 1,
                              background: '#010205',
                              border: '1px solid rgba(255, 255, 255, 0.05)',
                              padding: '12px 14px',
                              borderRadius: '8px',
                              fontSize: '0.72rem',
                              fontFamily: 'monospace',
                              color: '#cbd5e1',
                              margin: 0,
                              minHeight: '220px',
                              maxHeight: '220px',
                              width: '100%',
                              resize: 'none',
                              outline: 'none',
                              lineHeight: '1.4'
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                </div>

                {/* Right Column: Execution Query Sandbox */}
                <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', minHeight: '450px', background: 'rgba(255, 255, 255, 0.015)', border: '1px solid rgba(255, 255, 255, 0.04)', borderRadius: '16px', transform: 'none', boxShadow: 'none' }}>
                  <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '15px', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <MessageSquare size={16} style={{ color: '#22c55e' }} />
                      <h3 style={{ fontSize: '1rem', color: '#ffffff' }}>Active Query Sandbox</h3>
                    </div>
                  </div>

                  {/* Sandbox Chat logs */}
                  <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', padding: '12px', maxHeight: '280px', border: '1px solid rgba(255, 255, 255, 0.04)', background: 'rgba(0, 0, 0, 0.2)', borderRadius: '8px', marginBottom: '15px' }}>
                    {chatLog.length === 0 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#8a99ad', textAlign: 'center', padding: '30px' }}>
                        <Sparkles size={20} style={{ marginBottom: '8px', color: '#22c55e' }} />
                        <span style={{ fontSize: '0.78rem' }}>
                          Compile an app stack above, then type queries here to test prompt execution pathways live.
                        </span>
                      </div>
                    ) : (
                      chatLog.map((log, idx) => (
                        <div key={idx} style={{ borderBottom: idx < chatLog.length - 1 ? '1px solid rgba(255, 255, 255, 0.04)' : 'none', paddingBottom: '12px' }}>
                          <div style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                            <span style={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#8a99ad' }}>User:</span>
                            <span style={{ fontSize: '0.78rem', color: '#ffffff' }}>{log.query}</span>
                          </div>
                          <div style={{ display: 'flex', gap: '8px', paddingLeft: '8px', borderLeft: '2px solid #22c55e' }}>
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                                <span style={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#cbd5e1' }}>Zyntral Engine:</span>
                                <span style={{ fontSize: '0.64rem', color: '#22c55e', fontFamily: 'monospace' }}>({log.latency}ms latency)</span>
                              </div>
                              <span style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: '1.4' }}>{log.answer}</span>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                    {isQuerying && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem', color: '#8a99ad', fontFamily: 'monospace' }}>
                        <span style={{ width: '6px', height: '10px', background: '#22c55e', animation: 'caret-blink 0.8s infinite', display: 'inline-block' }}></span>
                        <span>Querying compiled stack...</span>
                      </div>
                    )}
                  </div>

                  {/* Chat input box */}
                  <form onSubmit={handlePlaygroundQuery} style={{ display: 'flex', gap: '10px' }}>
                    <input
                      type="text"
                      value={queryInput}
                      onChange={(e) => setQueryInput(e.target.value)}
                      className="input-field"
                      placeholder="Ask the active compiled application a question..."
                      disabled={isQuerying}
                      style={{ background: 'rgba(0, 0, 0, 0.3)', border: '1px solid rgba(255, 255, 255, 0.08)', color: '#ffffff' }}
                    />
                    <button 
                      type="submit" 
                      className="btn-primary" 
                      disabled={isQuerying || !queryInput.trim()}
                      style={{ 
                        padding: '0 16px', 
                        borderRadius: '8px',
                        background: '#22c55e',
                        color: '#ffffff',
                        border: 'none',
                        boxShadow: 'none'
                      }}
                    >
                      <ArrowRight size={16} />
                    </button>
                  </form>
                </div>

              </div>
            )}

            {/* TAB: PRODUCT INSIGHTS */}
            {activeTab === 'analytics' && (
              <div className="workspace-analytics-grid" style={{ gap: '24px' }}>
                
                {/* Insights Summary */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  
                  {/* Summary Card */}
                  <div className="glass-card" style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.04)', borderRadius: '16px', padding: '24px', transform: 'none', boxShadow: 'none' }}>
                    <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#8a99ad', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Summary</span>
                    <h3 style={{ fontSize: '1.1rem', color: '#ffffff', margin: '8px 0 12px 0' }}>Compiled Corpus Report</h3>
                    <p style={{ fontSize: '0.85rem', color: '#8a99ad', lineHeight: '1.6', marginBottom: '24px' }}>
                      Your Zyntral OS is currently tracking {pipelines.length || 8} compiled database indexes and infrastructure sets. System nodes are synced in real-time with Convex.
                    </p>
                    
                    {/* Mini stats count */}
                    <div className="workspace-stats-grid" style={{ gap: '12px' }}>
                      <div style={{ border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '10px', textAlign: 'center', background: 'rgba(0,0,0,0.1)' }}>
                        <div style={{ fontSize: '0.6rem', color: '#8a99ad', textTransform: 'uppercase', fontWeight: 600 }}>Pipelines</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>{pipelines.length || 8}</div>
                      </div>
                      <div style={{ border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '10px', textAlign: 'center', background: 'rgba(0,0,0,0.1)' }}>
                        <div style={{ fontSize: '0.6rem', color: '#8a99ad', textTransform: 'uppercase', fontWeight: 600 }}>Chunks</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>{(pipelines.length || 8) * 46}</div>
                      </div>
                      <div style={{ border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '10px', textAlign: 'center', background: 'rgba(0,0,0,0.1)' }}>
                        <div style={{ fontSize: '0.6rem', color: '#8a99ad', textTransform: 'uppercase', fontWeight: 600 }}>Db Providers</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>4</div>
                      </div>
                      <div style={{ border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '10px', textAlign: 'center', background: 'rgba(0,0,0,0.1)' }}>
                        <div style={{ fontSize: '0.6rem', color: '#8a99ad', textTransform: 'uppercase', fontWeight: 600 }}>Avg Overlap</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>50</div>
                      </div>
                    </div>
                  </div>

                  {/* Operational guidelines */}
                  <div className="glass-card" style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.04)', borderRadius: '16px', padding: '24px', transform: 'none', boxShadow: 'none' }}>
                    <h3 style={{ fontSize: '1rem', color: '#ffffff', marginBottom: '16px' }}>Core Area Guidelines</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                        <span style={{ background: 'rgba(255,255,255,0.05)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.1)', width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold', flexShrink: 0 }}>1</span>
                        <div>
                          <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>pgvector Database Default</h4>
                          <p style={{ fontSize: '0.78rem', color: '#8a99ad', marginTop: '2px' }}>
                            Relational pgvector connections optimize compliance metrics for multi-tenant pipelines.
                          </p>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                        <span style={{ background: 'rgba(255,255,255,0.05)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.1)', width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold', flexShrink: 0 }}>2</span>
                        <div>
                          <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>Llama parameter indexing</h4>
                          <p style={{ fontSize: '0.78rem', color: '#8a99ad', marginTop: '2px' }}>
                            Local Llama-3-8B weights are prioritised to safeguard dataset security boundaries.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Focus Distribution Donut chart */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div className="glass-card" style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.04)', borderRadius: '16px', padding: '24px', transform: 'none', boxShadow: 'none' }}>
                    <h3 style={{ fontSize: '1rem', color: '#ffffff', marginBottom: '20px' }}>Active Database Distribution</h3>
                    <DonutChart data={chartData} />
                  </div>

                  <div className="glass-card" style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.04)', borderRadius: '16px', padding: '24px', transform: 'none', boxShadow: 'none' }}>
                    <h3 style={{ fontSize: '1rem', color: '#ffffff', marginBottom: '16px' }}>Core Models Tracked</h3>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 500, marginBottom: '6px' }}>
                          <span style={{ color: '#8a99ad' }}>Llama-3-8B</span>
                          <span style={{ color: '#ffffff', fontWeight: 700 }}>
                            {totalModels > 0 ? Math.round((modelCounts['Llama-3-8B'] / totalModels) * 100) : 50}%
                          </span>
                        </div>
                        <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', background: '#22c55e', width: `${totalModels > 0 ? (modelCounts['Llama-3-8B'] / totalModels) * 100 : 50}%`, borderRadius: '3px' }} />
                        </div>
                      </div>

                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 500, marginBottom: '6px' }}>
                          <span style={{ color: '#8a99ad' }}>GPT-4o Cloud</span>
                          <span style={{ color: '#ffffff', fontWeight: 700 }}>
                            {totalModels > 0 ? Math.round((modelCounts['GPT-4o'] / totalModels) * 100) : 30}%
                          </span>
                        </div>
                        <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', background: '#cbd5e1', width: `${totalModels > 0 ? (modelCounts['GPT-4o'] / totalModels) * 100 : 30}%`, borderRadius: '3px' }} />
                        </div>
                      </div>

                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 500, marginBottom: '6px' }}>
                          <span style={{ color: '#8a99ad' }}>Mistral-7B Local</span>
                          <span style={{ color: '#ffffff', fontWeight: 700 }}>
                            {totalModels > 0 ? Math.round((modelCounts['Mistral-7B'] / totalModels) * 100) : 20}%
                          </span>
                        </div>
                        <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', background: '#15803d', width: `${totalModels > 0 ? (modelCounts['Mistral-7B'] / totalModels) * 100 : 20}%`, borderRadius: '3px' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}

          </div>
        </div>

      </div>

      {/* Command Palette Modal */}
      {isCommandPaletteOpen && (
        <>
          <div 
            onClick={() => setIsCommandPaletteOpen(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(4px)',
              zIndex: 9999
            }}
          />
          
          <div style={{
            position: 'fixed',
            top: '30%',
            left: '50%',
            transform: 'translate(-50%, -30%)',
            width: '90%',
            maxWidth: '520px',
            background: 'rgba(15, 15, 15, 0.95)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            zIndex: 10000,
            overflow: 'hidden',
            fontFamily: "'Inter', sans-serif"
          }}>
            <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', padding: '16px 20px' }}>
              <Search size={18} style={{ color: '#8a99ad', marginRight: '12px' }} />
              <input
                type="text"
                placeholder="Type a command to run..."
                value={commandSearchQuery}
                onChange={(e) => setCommandSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  border: 'none',
                  fontSize: '0.95rem',
                  color: '#ffffff',
                  outline: 'none',
                  background: 'transparent'
                }}
                autoFocus
              />
            </div>

            <div style={{ maxHeight: '250px', overflowY: 'auto', padding: '8px' }}>
              {filteredCommands.map((cmd, idx) => (
                <div
                  key={idx}
                  onClick={() => cmd.action()}
                  style={{
                    padding: '10px 14px',
                    borderRadius: '8px',
                    color: '#cbd5e1',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                  className="palette-item-hover"
                >
                  <span>{cmd.icon}</span>
                  <span>{cmd.label}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <style>{`
        .palette-item-hover:hover {
          background: rgba(255, 255, 255, 0.06) !important;
          color: #ffffff !important;
        }

        .template-card:hover {
          border-color: rgba(34, 197, 94, 0.25) !important;
          background: rgba(34, 197, 94, 0.02) !important;
          transform: translateY(-2px) !important;
        }

        .workspace-container {
          display: grid;
          grid-template-columns: 250px 1fr;
          height: calc(100vh - 140px);
          min-height: 760px;
          max-height: 900px;
          overflow: hidden;
        }

        .workspace-sidebar {
          border-right: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .workspace-main {
          height: 100%;
          overflow: hidden;
        }

        .workspace-nav {
          display: flex;
          flex-direction: column;
        }

        .workspace-analytics-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
        }

        .donut-chart-wrapper {
          display: flex;
          gap: 30px;
        }

        .workspace-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }

        .workspace-catalog-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
        }

        .workspace-playground-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
        }

        .workspace-tabs-bar {
          display: flex;
        }

        @keyframes wireFlow {
          to {
            stroke-dashoffset: -20;
          }
        }

        .data-wire-flow {
          animation: wireFlow 1.2s linear infinite;
        }

        @media (max-width: 960px) {
          .workspace-container {
            grid-template-columns: 1fr !important;
            height: auto !important;
            min-height: 100vh !important;
            max-height: none !important;
            overflow: visible !important;
          }

          .workspace-sidebar {
            border-right: none !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
            flex-direction: column !important;
            justify-content: flex-start !important;
            gap: 16px !important;
          }

          .workspace-main {
            height: auto !important;
            overflow: visible !important;
          }

          .workspace-analytics-grid,
          .workspace-catalog-grid,
          .workspace-playground-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }

          .workspace-tabs-bar {
            overflow-x: auto !important;
            scrollbar-width: none !important;
          }
          .workspace-tabs-bar::-webkit-scrollbar {
            display: none !important;
          }
          .workspace-tabs-bar button {
            white-space: nowrap !important;
          }
        }

        @media (max-width: 580px) {
          .workspace-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          
          .donut-chart-wrapper {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            gap: 20px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Workspace;
