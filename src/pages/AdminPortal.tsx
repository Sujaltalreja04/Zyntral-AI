import React, { useState, useEffect } from 'react';
import { Server, Users, Terminal, LogOut, CheckCircle, Database, Plus, Trash2 } from 'lucide-react';
import logoImg from '../assets/Zyntral LOGO REAL.jpg';

interface WaitlistEntry {
  id: string;
  name: string;
  email: string;
  company: string;
  useCase: string;
  submittedAt: string;
}

export const AdminPortal: React.FC = () => {
  const [passcode, setPasscode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [adminTab, setAdminTab] = useState<'overview' | 'submissions' | 'logs'>('overview');
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([]);
  const [systemLogs, setSystemLogs] = useState<string[]>([]);

  // Check if already authenticated (simple sessionStorage persist)
  useEffect(() => {
    if (sessionStorage.getItem('zyntral_admin_authed') === 'true') {
      setIsUnlocked(true);
    }
    loadWaitlist();
  }, []);

  const loadWaitlist = () => {
    const data = localStorage.getItem('zyntral_waitlist');
    setWaitlist(data ? JSON.parse(data) : []);
  };

  // Generate simulated console logs in background when unlocked
  useEffect(() => {
    if (!isUnlocked) return;

    setSystemLogs([
      `[${new Date().toLocaleTimeString()}] System booted: Zyntral AI Enterprise Node active`,
      `[${new Date().toLocaleTimeString()}] Cluster status: GPU-Node-A (Active), GPU-Node-B (Idle)`,
      `[${new Date().toLocaleTimeString()}] Connected to ChromaDB cluster at vector-east-01`,
      `[${new Date().toLocaleTimeString()}] Listening for API gateway requests...`
    ]);

    const interval = setInterval(() => {
      const logsList = [
        `[${new Date().toLocaleTimeString()}] RAG API: Routed query to zyntral-v1-rag-592 (latency 28ms)`,
        `[${new Date().toLocaleTimeString()}] Metrics: Token generation velocity stable at 1450 tokens/sec`,
        `[${new Date().toLocaleTimeString()}] Sync: Flushed waitlist buffer to encrypted DB`,
        `[${new Date().toLocaleTimeString()}] Fine-Tuner: Saved checkpoint for model mistral-7b-v0.2`,
        `[${new Date().toLocaleTimeString()}] Security: Health audit complete. 0 threats detected.`
      ];
      const randomLog = logsList[Math.floor(Math.random() * logsList.length)];
      setSystemLogs(prev => [randomLog, ...prev.slice(0, 15)]);
    }, 4000);

    return () => clearInterval(interval);
  }, [isUnlocked]);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'zyntral2026') {
      setIsUnlocked(true);
      setErrorMsg('');
      sessionStorage.setItem('zyntral_admin_authed', 'true');
    } else {
      setErrorMsg('Access Denied. Cryptographic signature signature mismatch.');
      setPasscode('');
    }
  };

  const handleLogout = () => {
    setIsUnlocked(false);
    sessionStorage.removeItem('zyntral_admin_authed');
  };

  const handleClearWaitlist = () => {
    if (window.confirm('Are you sure you want to purge all waitlist submissions?')) {
      localStorage.removeItem('zyntral_waitlist');
      setWaitlist([]);
    }
  };

  const handleAddMockEntry = () => {
    const mocks = [
      { name: 'Sarah Jenkins', email: 'sarah@uber.com', company: 'Uber Technologies', useCase: 'RAG system to query global fleet maintenance files.' },
      { name: 'David Miller', email: 'd.miller@fedex.com', company: 'FedEx Corp', useCase: 'Automated warehouse stock tracking assistant.' },
      { name: 'Alex Rivera', email: 'alex@draftkings.com', company: 'DraftKings Inc', useCase: 'Sports performance forecasting agent.' }
    ];
    
    const randomMock = mocks[Math.floor(Math.random() * mocks.length)];
    const existing = localStorage.getItem('zyntral_waitlist');
    const waitlistArr: WaitlistEntry[] = existing ? JSON.parse(existing) : [];

    const newEntry: WaitlistEntry = {
      id: Math.random().toString(36).substring(2, 9),
      name: randomMock.name,
      email: randomMock.email,
      company: randomMock.company,
      useCase: randomMock.useCase,
      submittedAt: new Date().toLocaleString()
    };

    waitlistArr.push(newEntry);
    localStorage.setItem('zyntral_waitlist', JSON.stringify(waitlistArr));
    setWaitlist(waitlistArr);
  };

  if (!isUnlocked) {
    return (
      <div className="admin-lock-screen">
        <div className="glass-card" style={{ maxWidth: '420px', width: '100%', padding: '40px', background: 'rgba(5, 5, 12, 0.75)' }}>
          <div className="glow-glow" style={{ background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.04) 0%, transparent 60%)' }}></div>
          
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{ width: '70px', height: '70px', borderRadius: '50%', overflow: 'hidden', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 0 20px rgba(255,255,255,0.05)' }}>
              <img src={logoImg} alt="Zyntral Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-display)' }}>ZYNTRAL SYSTEM LOCK</h2>
            <p style={{ color: 'var(--muted-color)', fontSize: '0.85rem', marginTop: '6px' }}>
              Authentication required. Enter system decryption passcode.
            </p>
          </div>

          <form onSubmit={handleUnlock} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div className="input-group" style={{ marginBottom: '0' }}>
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="input-field"
                placeholder="••••••••"
                style={{ textAlign: 'center', fontFamily: 'monospace', letterSpacing: '3px' }}
              />
            </div>
            
            {errorMsg && (
              <div style={{ fontSize: '0.8rem', color: '#ef4444', textAlign: 'center', fontWeight: 500 }}>
                {errorMsg}
              </div>
            )}

            <button type="submit" className="btn-primary" style={{ justifyContent: 'center' }}>
              Unlock System Dashboard
            </button>
          </form>
          
          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.75rem', color: 'var(--muted-color)' }}>
            Passcode hint: <code>zyntral2026</code>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--green)' }} />
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 'bold', letterSpacing: '1px' }}>ZYNTRAL OS</span>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '20px' }}>
          {[
            { id: 'overview', label: 'System Overview', icon: Server },
            { id: 'submissions', label: 'Waitlist Requests', icon: Users, count: waitlist.length },
            { id: 'logs', label: 'Security Logs', icon: Terminal }
          ].map(tab => {
            const Icon = tab.icon;
            const isSel = adminTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setAdminTab(tab.id as any)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  background: isSel ? 'rgba(255,255,255,0.05)' : 'transparent',
                  border: 'none',
                  color: isSel ? '#fff' : 'var(--muted-color)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                  width: '100%'
                }}
              >
                <Icon size={16} style={{ color: isSel ? '#ffffff' : 'var(--muted-color)' }} />
                <span>{tab.label}</span>
                {tab.count !== undefined && tab.count > 0 && (
                  <span style={{ marginLeft: 'auto', background: '#ffffff', color: '#000', fontSize: '0.7rem', padding: '2px 6px', borderRadius: '10px', fontWeight: 'bold' }}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <button 
          onClick={handleLogout} 
          className="btn-secondary" 
          style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center', padding: '10px', borderRadius: '8px', fontSize: '0.85rem' }}
        >
          <LogOut size={14} /> Exit Dashboard
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="dashboard-content" style={{ marginTop: '60px' }}>
        
        {adminTab === 'overview' && (
          <div>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '20px', fontFamily: 'var(--font-display)' }}>System Monitor</h2>
            
            {/* Grid of Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
              {[
                { title: 'Waitlist Requests', val: waitlist.length, icon: Users, color: '#e5e7eb' },
                { title: 'Compiled RAG Pools', val: 147, icon: Database, color: '#d1d5db' },
                { title: 'Fine-Tuned Hubs', val: 42, icon: Server, color: '#9ca3af' },
                { title: 'System Security', val: 'Secure', icon: CheckCircle, color: 'var(--green)' }
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="glass-card" style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', color: stat.color }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--muted-color)', fontWeight: 500 }}>{stat.title}</span>
                      <Icon size={18} />
                    </div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginTop: '10px', fontFamily: 'var(--font-display)' }}>
                      {stat.val}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Health Monitor */}
            <div className="glass-card" style={{ padding: '30px' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '15px' }}>Cluster Clusters Health</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--muted-color)' }}>
                    <span>GPU-Node-A (Fine-Tuning Loop)</span>
                    <span style={{ color: 'var(--green)' }}>Active (Online)</span>
                  </div>
                  <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden', marginTop: '6px' }}>
                    <div style={{ width: '82%', height: '100%', background: 'var(--green)' }}></div>
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--muted-color)' }}>
                    <span>Vector DB Retrieval Nodes</span>
                    <span style={{ color: 'var(--green)' }}>Stable (9ms Query Latency)</span>
                  </div>
                  <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden', marginTop: '6px' }}>
                    <div style={{ width: '95%', height: '100%', background: 'var(--green)' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {adminTab === 'submissions' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <div>
                <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-display)' }}>Waitlist Submissions</h2>
                <p style={{ color: 'var(--muted-color)', fontSize: '0.85rem', marginTop: '4px' }}>
                  Manage incoming sandboxing requests submitted via the contact portal.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  onClick={handleAddMockEntry} 
                  className="nav-btn" 
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', padding: '8px 16px', background: 'rgba(255, 255, 255, 0.04)', borderColor: 'rgba(255, 255, 255, 0.15)' }}
                >
                  <Plus size={14} style={{ color: '#e5e7eb' }} /> Mock submission
                </button>
                {waitlist.length > 0 && (
                  <button 
                    onClick={handleClearWaitlist} 
                    className="nav-btn" 
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', padding: '8px 16px', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)', background: 'rgba(239, 68, 68, 0.05)' }}
                  >
                    <Trash2 size={14} /> Purge waitlist
                  </button>
                )}
              </div>
            </div>

            {waitlist.length === 0 ? (
              <div className="glass-card" style={{ padding: '60px', textAlign: 'center', background: 'rgba(0,0,0,0.2)' }}>
                <Users size={40} style={{ color: 'var(--muted-color)', marginBottom: '15px' }} />
                <h4 style={{ fontSize: '1.1rem', color: '#f3f4f6' }}>No Submissions Registered</h4>
                <p style={{ color: 'var(--muted-color)', fontSize: '0.85rem', maxWidth: '350px', margin: '8px auto 0' }}>
                  Decryption buffers are empty. Navigate to the contact page to generate a request or click "Mock submission".
                </p>
              </div>
            ) : (
              <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      {['User Info', 'Company', 'Use Case Description', 'Date Registered'].map((header, i) => (
                        <th key={i} style={{ padding: '16px 20px', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--muted-color)', fontWeight: 600 }}>{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {waitlist.map((entry) => (
                      <tr key={entry.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background 0.2s' }}>
                        <td style={{ padding: '16px 20px' }}>
                          <div style={{ fontWeight: 600, color: '#fff' }}>{entry.name}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--muted-color)', marginTop: '2px' }}>{entry.email}</div>
                        </td>
                        <td style={{ padding: '16px 20px', fontSize: '0.9rem' }}>{entry.company}</td>
                        <td style={{ padding: '16px 20px', fontSize: '0.85rem', color: 'var(--muted-color)', maxWidth: '280px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }} title={entry.useCase}>
                          {entry.useCase}
                        </td>
                        <td style={{ padding: '16px 20px', fontSize: '0.8rem', color: 'var(--muted-color)', fontFamily: 'monospace' }}>
                          {entry.submittedAt.split(',')[0]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {adminTab === 'logs' && (
          <div>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '20px', fontFamily: 'var(--font-display)' }}>Security Logs Console</h2>
            
            <div className="rag-builder-widget" style={{ minHeight: '400px', height: 'auto' }}>
              <div className="terminal-header">
                <div className="terminal-dots">
                  <span className="terminal-dot red" />
                  <span className="terminal-dot yellow" />
                  <span className="terminal-dot green" />
                </div>
                <span className="terminal-title">zyntral-kernel-stream.log</span>
              </div>
              <div className="terminal-body" style={{ fontFamily: 'monospace', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {systemLogs.map((log, index) => (
                  <div key={index} style={{ color: log.includes('Security') ? '#e5e7eb' : log.includes('Fine-Tuner') ? '#9ca3af' : '#d1d5db' }}>
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default AdminPortal;
