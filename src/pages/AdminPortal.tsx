import React, { useState, useEffect, useRef } from 'react';
import { 
  Server, Users, Terminal, LogOut, Database, Plus, Trash2, 
  Edit2, Save, X, ChevronUp, ChevronDown, ChevronRight, Mail, Settings, 
  User, Download, Send, AlertTriangle, RefreshCw, Eye, EyeOff
} from 'lucide-react';
import logoImg from '../assets/Zyntral LOGO REAL.jpg';
import { ROADMAP_STEPS } from '../data/roadmapData';
import { RESEARCH_ARTICLES } from '../data/researchData';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

interface ContactMessage {
  _id: any;
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
  status: string;
}

interface FounderProfile {
  name: string;
  role: string;
  storyPara1: string;
  storyPara2: string;
  mission: string;
}

const DEFAULT_FOUNDER: FounderProfile = {
  name: 'Sujal Talreja',
  role: 'Founder & Lead Architect at Zyntral AI.',
  storyPara1: 'Having built several custom AI pipelines for enterprise clients, Sujal saw firsthand the friction developers face when transitioning from local notebook prototypes to containerized, compliant runtime servers.',
  storyPara2: 'The manual coordination of API endpoints, index queries, and alignment dataset runs was a major bottleneck. Sujal founded Zyntral AI to compile these backend connections automatically, speeding up deployment from weeks to minutes.',
  mission: 'Our mission is to build robust, open-standard compilers and runtime nodes. We focus on optimizing edge GPU scheduling, parameter efficient tuning configurations (LoRA, DPO), and consensus-based state protocols to deliver high-speed, secure AI operations.'
};

export const AdminPortal: React.FC = () => {
  const [passcode, setPasscode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [adminTab, setAdminTab] = useState<'overview' | 'submissions' | 'contacts' | 'roadmap' | 'research' | 'about' | 'settings' | 'logs'>('overview');

  // Convex Queries
  const waitlist = useQuery(api.waitlist.get) || [];
  const contactMessages = useQuery(api.contacts.get) || [];
  const roadmap = useQuery(api.roadmap.get) || [];
  const research = useQuery(api.research.get) || [];
  const dbFounder = useQuery(api.about.getFounder);
  const passcodeVal = useQuery(api.settings.getVal, { key: 'passcode' });
  const maintenanceVal = useQuery(api.settings.getVal, { key: 'maintenance' });

  // Convex Mutations
  const updateWaitlistStatus = useMutation(api.waitlist.updateStatus);
  const deleteWaitlistEntry = useMutation(api.waitlist.remove);
  const purgeWaitlist = useMutation(api.waitlist.purge);
  const addWaitlistMock = useMutation(api.waitlist.add);

  const updateContactStatus = useMutation(api.contacts.updateStatus);
  const deleteContactMessage = useMutation(api.contacts.remove);

  const seedRoadmap = useMutation(api.roadmap.seed);
  const addRoadmapStep = useMutation(api.roadmap.add);
  const updateRoadmapStep = useMutation(api.roadmap.update);
  const deleteRoadmapStep = useMutation(api.roadmap.remove);
  const reorderRoadmap = useMutation(api.roadmap.reorder);

  const seedResearch = useMutation(api.research.seed);
  const addResearchArticle = useMutation(api.research.add);
  const updateResearchArticle = useMutation(api.research.update);
  const deleteResearchArticle = useMutation(api.research.remove);

  const updateFounder = useMutation(api.about.updateFounder);
  
  const setSettingVal = useMutation(api.settings.setVal);
  const resetAllDb = useMutation(api.settings.resetAll);

  // Search & Filter States
  const [waitlistSearch, setWaitlistSearch] = useState('');
  const [waitlistFilter, setWaitlistFilter] = useState<'All' | 'Pending' | 'Approved' | 'Rejected'>('All');
  
  const [contactSearch, setContactSearch] = useState('');
  const [contactFilter, setContactFilter] = useState<'All' | 'Unread' | 'Read' | 'Replied'>('All');

  // Editing States
  const [editingRoadmapId, setEditingRoadmapId] = useState<any>(null);
  const [editingResearchId, setEditingResearchId] = useState<any>(null);

  // Roadmap Form Fields
  const [rmPhase, setRmPhase] = useState('');
  const [rmStatus, setRmStatus] = useState('');
  const [rmStatusColor, setRmStatusColor] = useState('');
  const [rmBadgeBg, setRmBadgeBg] = useState('');
  const [rmDesc, setRmDesc] = useState('');
  const [rmIcon, setRmIcon] = useState('HelpCircle');

  // Research Form Fields
  const [resCategory, setResCategory] = useState('');
  const [resTitle, setResTitle] = useState('');
  const [resDesc, setResDesc] = useState('');
  const [resDate, setResDate] = useState('');
  const [resSlug, setResSlug] = useState('');
  const [resContent, setResContent] = useState('');

  // Founder Profile Fields
  const [fdName, setFdName] = useState('');
  const [fdRole, setFdRole] = useState('');
  const [fdStoryPara1, setFdStoryPara1] = useState('');
  const [fdStoryPara2, setFdStoryPara2] = useState('');
  const [fdMission, setFdMission] = useState('');

  // Settings States
  const [newPasscode, setNewPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  // Message Reply Modal
  const [replyMessage, setReplyMessage] = useState<ContactMessage | null>(null);
  const [replyBody, setReplyBody] = useState('');

  // Interactive Terminal states
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLines, setTerminalLines] = useState<string[]>([
    'Zyntral AI Kernel v0.9.5-beta initializing...',
    'Decrypting Convex security stream tunnels...',
    'Convex Datastore Connection: ONLINE (Real-time sync active)',
    'Type "help" to display operational directives.',
    ''
  ]);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Sync session auth
  useEffect(() => {
    if (sessionStorage.getItem('zyntral_admin_authed') === 'true') {
      setIsUnlocked(true);
    }
  }, []);

  // Database auto-seeding on mount if Convex collections are empty
  useEffect(() => {
    if (roadmap && roadmap.length === 0) {
      const initialRoadmap = ROADMAP_STEPS.map((step, idx) => ({
        phase: step.phase,
        status: step.status,
        statusColor: step.statusColor,
        badgeBg: step.badgeBg,
        desc: step.desc,
        icon: (step.icon as any).name || 'Compass',
        orderIndex: idx
      }));
      seedRoadmap({ steps: initialRoadmap }).catch(err => console.error('Roadmap seed error:', err));
    }
  }, [roadmap, seedRoadmap]);

  useEffect(() => {
    if (research && research.length === 0) {
      seedResearch({ articles: RESEARCH_ARTICLES }).catch(err => console.error('Research seed error:', err));
    }
  }, [research, seedResearch]);

  // Sync settings queries
  useEffect(() => {
    if (maintenanceVal !== undefined) {
      setMaintenanceMode(maintenanceVal === 'true');
    }
  }, [maintenanceVal]);

  useEffect(() => {
    if (passcodeVal) {
      setNewPasscode(passcodeVal);
    }
  }, [passcodeVal]);

  // Sync founder biography overrides
  useEffect(() => {
    if (dbFounder) {
      setFdName(dbFounder.name);
      setFdRole(dbFounder.role);
      setFdStoryPara1(dbFounder.storyPara1);
      setFdStoryPara2(dbFounder.storyPara2);
      setFdMission(dbFounder.mission);
    } else {
      setFdName(DEFAULT_FOUNDER.name);
      setFdRole(DEFAULT_FOUNDER.role);
      setFdStoryPara1(DEFAULT_FOUNDER.storyPara1);
      setFdStoryPara2(DEFAULT_FOUNDER.storyPara2);
      setFdMission(DEFAULT_FOUNDER.mission);
    }
  }, [dbFounder]);

  // Auto scroll terminal
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalLines]);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const currentPasscode = passcodeVal || 'zyntral2026';
    if (passcode === currentPasscode) {
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

  // Waitlist Operations
  const handleClearWaitlist = async () => {
    if (window.confirm('Are you sure you want to purge all waitlist submissions in Convex?')) {
      try {
        await purgeWaitlist();
        setTerminalLines(prev => [...prev, `[${new Date().toLocaleTimeString()}] WAITLIST: Purged all entries`]);
      } catch (err) {
        alert('Failed to purge waitlist');
      }
    }
  };

  const handleAddMockEntry = async () => {
    const mocks = [
      { name: 'Sarah Jenkins', email: 'sarah@uber.com', company: 'Uber Technologies', useCase: 'RAG system to query global fleet maintenance files.' },
      { name: 'David Miller', email: 'd.miller@fedex.com', company: 'FedEx Corp', useCase: 'Automated warehouse stock tracking assistant.' },
      { name: 'Alex Rivera', email: 'alex@draftkings.com', company: 'DraftKings Inc', useCase: 'Sports performance forecasting agent.' }
    ];
    
    const randomMock = mocks[Math.floor(Math.random() * mocks.length)];
    try {
      await addWaitlistMock({
        name: randomMock.name,
        email: randomMock.email,
        company: randomMock.company,
        useCase: randomMock.useCase
      });
      setTerminalLines(prev => [...prev, `[${new Date().toLocaleTimeString()}] WAITLIST: Inserted mock user ${randomMock.name}`]);
    } catch (err) {
      alert('Failed to insert mock');
    }
  };

  const handleDeleteWaitlist = async (id: any) => {
    try {
      await deleteWaitlistEntry({ id });
    } catch (err) {
      alert('Failed to delete entry');
    }
  };

  const handleApproveWaitlist = async (id: any) => {
    const apiKey = `zyntral_live_ak_${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`;
    try {
      await updateWaitlistStatus({ id, status: 'Approved', apiKey });
      const item = waitlist.find((w: any) => w._id === id);
      if (item) {
        setTerminalLines(prev => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] WAITLIST: Approved user ${item.name} (${item.email}) and generated API keys`
        ]);
      }
    } catch (err) {
      alert('Failed to approve entry');
    }
  };

  const handleRejectWaitlist = async (id: any) => {
    try {
      await updateWaitlistStatus({ id, status: 'Rejected', apiKey: null });
    } catch (err) {
      alert('Failed to reject entry');
    }
  };

  const handleExportWaitlist = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(waitlist, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "zyntral-waitlist-export.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    
    setTerminalLines(prev => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] SYSTEM: Flushed waitlist registry database into JSON export download`
    ]);
  };

  // Contacts Inbox Operations
  const handleMarkContactStatus = async (id: any, status: 'Unread' | 'Read') => {
    try {
      await updateContactStatus({ id, status });
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleDeleteContact = async (id: any) => {
    if (window.confirm('Delete this message entry in Convex?')) {
      try {
        await deleteContactMessage({ id });
      } catch (err) {
        alert('Failed to delete contact');
      }
    }
  };

  const handleOpenReplyModal = (msg: ContactMessage) => {
    setReplyMessage(msg);
    setReplyBody(`Hello ${msg.name},\n\nThank you for reaching out to Zyntral Labs regarding "${msg.subject}".\n\n[Your Response Here]\n\nBest regards,\nSujal Talreja\nZyntral AI Team`);
    
    // Mark as read when replying
    if (msg.status === 'Unread') {
      handleMarkContactStatus(msg._id, 'Read');
    }
  };

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyMessage || !replyBody.trim()) return;

    try {
      await updateContactStatus({ id: replyMessage._id, status: 'Replied' });
      // Append to system logs
      setTerminalLines(prev => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] SMTP: Dispatched reply email connection to ${replyMessage.email} regarding "${replyMessage.subject}"`
      ]);
      setReplyMessage(null);
      setReplyBody('');
      alert(`Reply email simulated and dispatched to ${replyMessage.email}`);
    } catch (err) {
      alert('Failed to send reply');
    }
  };

  // Roadmap Operations
  const startEditRoadmap = (id: any) => {
    const step = roadmap.find((r: any) => r._id === id);
    if (!step) return;
    setEditingRoadmapId(id);
    setRmPhase(step.phase);
    setRmStatus(step.status);
    setRmStatusColor(step.statusColor);
    setRmBadgeBg(step.badgeBg);
    setRmDesc(step.desc);
    setRmIcon(step.icon);
  };

  const saveRoadmapStep = async (id: any) => {
    try {
      await updateRoadmapStep({
        id,
        phase: rmPhase,
        status: rmStatus,
        statusColor: rmStatusColor,
        badgeBg: rmBadgeBg,
        desc: rmDesc,
        icon: rmIcon
      });
      setEditingRoadmapId(null);
    } catch (err) {
      alert('Failed to save roadmap step');
    }
  };

  const handleDeleteRoadmapStep = async (id: any) => {
    if (window.confirm('Delete this roadmap phase in Convex?')) {
      try {
        await deleteRoadmapStep({ id });
      } catch (err) {
        alert('Failed to delete step');
      }
    }
  };

  const handleAddRoadmapStep = async () => {
    try {
      await addRoadmapStep({
        phase: 'New Phase',
        status: 'Upcoming',
        statusColor: '#60a5fa',
        badgeBg: 'rgba(59, 130, 246, 0.12)',
        desc: 'Milestone details here...',
        icon: 'HelpCircle',
        orderIndex: roadmap.length
      });
    } catch (err) {
      alert('Failed to add step');
    }
  };

  const moveRoadmapStep = async (idx: number, direction: 'up' | 'down') => {
    const sorted = [...roadmap].sort((a: any, b: any) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0));
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= sorted.length) return;
    
    const temp = sorted[idx];
    sorted[idx] = sorted[targetIdx];
    sorted[targetIdx] = temp;

    const orderedIds = sorted.map((item: any) => item._id);
    try {
      await reorderRoadmap({ orderedIds });
    } catch (err) {
      alert('Failed to reorder steps');
    }
  };

  // Research Operations
  const startEditResearch = (id: any) => {
    const art = research.find((r: any) => r._id === id);
    if (!art) return;
    setEditingResearchId(id);
    setResCategory(art.category);
    setResTitle(art.title);
    setResDesc(art.desc);
    setResDate(art.date);
    setResSlug(art.path.replace('/research/', ''));
    setResContent(art.content || '');
  };

  const saveResearchArticle = async (id: any) => {
    try {
      await updateResearchArticle({
        id,
        category: resCategory,
        title: resTitle,
        desc: resDesc,
        date: resDate,
        path: `/research/${resSlug}`,
        content: resContent
      });
      setEditingResearchId(null);
    } catch (err) {
      alert('Failed to save research article');
    }
  };

  const handleDeleteResearchArticle = async (id: any) => {
    if (window.confirm('Delete this research article in Convex?')) {
      try {
        await deleteResearchArticle({ id });
      } catch (err) {
        alert('Failed to delete article');
      }
    }
  };

  const handleAddResearchArticle = async () => {
    try {
      await addResearchArticle({
        category: 'General',
        title: 'New Research Paper',
        desc: 'Short abstract summary...',
        date: 'Updated Live',
        path: '/research/new-paper',
        content: 'Write full content paragraphs here...'
      });
    } catch (err) {
      alert('Failed to add article');
    }
  };

  // Founder Bio operations
  const saveFounderProfile = async () => {
    try {
      await updateFounder({
        name: fdName,
        role: fdRole,
        storyPara1: fdStoryPara1,
        storyPara2: fdStoryPara2,
        mission: fdMission
      });
      alert('Founder profile overrides committed to Convex database successfully.');
    } catch (err) {
      alert('Failed to save biography');
    }
  };

  // Settings Save & Resets
  const saveSystemSettings = async () => {
    if (!newPasscode.trim()) {
      alert('Passcode cannot be empty.');
      return;
    }
    try {
      await setSettingVal({ key: 'passcode', value: newPasscode });
      await setSettingVal({ key: 'maintenance', value: maintenanceMode ? 'true' : 'false' });
      alert('System settings overrides committed to Convex database.');
    } catch (err) {
      alert('Failed to save settings');
    }
  };

  const handleResetSystemData = async () => {
    if (window.confirm('WARNING: This will wipe all waitlist registries, contact inbox messages, custom roadmap milestones, research publications, and founder overrides in the Convex DB, returning system to defaults. Continue?')) {
      try {
        await resetAllDb();
        alert('Convex database tables flushed. Reloading systems to trigger re-seeding...');
        window.location.reload();
      } catch (err) {
        alert('Failed to reset system data');
      }
    }
  };

  // Command Shell execution
  const handleTerminalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const input = terminalInput.trim();
    if (!input) return;

    const commandParts = input.split(' ');
    const command = commandParts[0].toLowerCase();
    const argument = commandParts[1];

    const currentLines = [...terminalLines, `zyntral-kernel@root:~$ ${input}`];

    switch (command) {
      case 'help':
        currentLines.push(
          'Operational Directives Shell v0.9.5',
          'Available commands:',
          '  help                  Display this guidance listing',
          '  status                Display CPU cores, registry counts, vector latencies',
          '  nodes                 Show operational hardware cluster server nodes',
          '  clear                 Flush shell history output buffer',
          '  reboot                Simulate full kernel node server reload',
          '  maintenance --on/off  Enable/Disable simulated maintenance mode'
        );
        break;
      case 'status':
        currentLines.push(
          '--- SYSTEM METRICS LOG ---',
          `Zyntral Server Node:  ONLINE (Convex DB)`,
          `Waitlist Registry:    ${waitlist.length} applicants`,
          `Contact Inbox:        ${contactMessages.length} entries`,
          `Roadmap Milestones:   ${roadmap.length} active phases`,
          `Active VRAM Share:    40.0 GB across cluster`,
          `Maintenance Banner:   ${maintenanceMode ? 'ACTIVE' : 'OFFLINE'}`
        );
        break;
      case 'nodes':
        currentLines.push(
          '--- HARDWARE CLUSTER STATUS ---',
          'GPU-Node-A: ONLINE | VRAM: 16GB | Load: 82% | Task: LoRA compilation',
          'GPU-Node-B: ONLINE | VRAM: 24GB | Load:  4% | Task: Idle standby',
          'DB-Vector:  ONLINE | Latency: 8ms  | Type: Compiled RAG index host'
        );
        break;
      case 'clear':
        setTerminalLines([]);
        setTerminalInput('');
        return;
      case 'reboot':
        currentLines.push(
          '⚠️ KERNEL REBOOT INITIATED (RE-RESOLVING TUNNELS)...',
          'Closing secure socket tunnels...',
          'Flushing metrics cache buffers...',
          'Loading Zyntral Kernel Image v0.9.5-beta (SHA: a1f8b4)...',
          '✓ Restoring GPU network fabrics...',
          '✓ System nodes recovered. All compilers running.'
        );
        break;
      case 'maintenance':
        if (argument === '--on') {
          try {
            await setSettingVal({ key: 'maintenance', value: 'true' });
            setMaintenanceMode(true);
            currentLines.push('✓ Directive processed: Maintenance Mode set to ACTIVE.');
          } catch (err) {
            currentLines.push('Error: Failed to write setting to database.');
          }
        } else if (argument === '--off') {
          try {
            await setSettingVal({ key: 'maintenance', value: 'false' });
            setMaintenanceMode(false);
            currentLines.push('✓ Directive processed: Maintenance Mode set to INACTIVE.');
          } catch (err) {
            currentLines.push('Error: Failed to write setting to database.');
          }
        } else {
          currentLines.push('Syntax Error: Use "maintenance --on" or "maintenance --off".');
        }
        break;
      default:
        currentLines.push(`Directive "${command}" not recognized. Type "help" for syntax.`);
    }

    setTerminalLines(currentLines);
    setTerminalInput('');
  };

  // Waitlist search filter logic
  const filteredWaitlist = waitlist.filter((w: any) => {
    const matchSearch = 
      w.name.toLowerCase().includes(waitlistSearch.toLowerCase()) ||
      w.email.toLowerCase().includes(waitlistSearch.toLowerCase()) ||
      w.company.toLowerCase().includes(waitlistSearch.toLowerCase()) ||
      w.useCase.toLowerCase().includes(waitlistSearch.toLowerCase());
    const matchFilter = waitlistFilter === 'All' || w.status === waitlistFilter;
    return matchSearch && matchFilter;
  });

  // Contact inbox search filter logic
  const filteredContacts = contactMessages.filter((c: any) => {
    const matchSearch = 
      c.name.toLowerCase().includes(contactSearch.toLowerCase()) ||
      c.email.toLowerCase().includes(contactSearch.toLowerCase()) ||
      c.subject.toLowerCase().includes(contactSearch.toLowerCase()) ||
      c.message.toLowerCase().includes(contactSearch.toLowerCase());
    const matchFilter = contactFilter === 'All' || c.status === contactFilter;
    return matchSearch && matchFilter;
  });

  // Sort roadmap phases by orderIndex
  const sortedRoadmap = [...roadmap].sort((a: any, b: any) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0));

  if (!isUnlocked) {
    return (
      <div className="admin-lock-screen">
        <div className="glass-card" style={{ maxWidth: '420px', width: '100%', padding: '40px', background: 'rgba(5, 5, 12, 0.75)' }}>
          <div className="glow-glow" style={{ background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.04) 0%, transparent 60%)' }}></div>
          
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{ width: '70px', height: '70px', borderRadius: '50%', overflow: 'hidden', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 0 20px rgba(255,255,255,0.05)' }}>
              <img src={logoImg} alt="Zyntral Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-display)', letterSpacing: '1px' }}>ZYNTRAL OS LOCK</h2>
            <p style={{ color: 'var(--muted-color)', fontSize: '0.85rem', marginTop: '6px' }}>
              Authentication required. Enter decryption passcode.
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
      <aside className="dashboard-sidebar" style={{ zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingBottom: '15px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: maintenanceMode ? '#f59e0b' : 'var(--green)' }} />
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 'bold', letterSpacing: '1px' }}>ZYNTRAL OS v0.9</span>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '15px', overflowY: 'auto', flex: 1 }}>
          {[
            { id: 'overview', label: 'System Overview', icon: Server },
            { id: 'submissions', label: 'Waitlist Registry', icon: Users, count: waitlist.filter((w: any) => w.status === 'Pending').length },
            { id: 'contacts', label: 'Contact Messages', icon: Mail, count: contactMessages.filter((c: any) => c.status === 'Unread').length },
            { id: 'roadmap', label: 'Roadmap Stages', icon: ChevronRight },
            { id: 'research', label: 'Research Papers', icon: Database },
            { id: 'about', label: 'Founder Profile', icon: User },
            { id: 'logs', label: 'Interactive Shell', icon: Terminal },
            { id: 'settings', label: 'System Settings', icon: Settings }
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
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: isSel ? 'rgba(255,255,255,0.06)' : 'transparent',
                  border: 'none',
                  color: isSel ? '#fff' : 'var(--muted-color)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  transition: 'all 0.15s ease',
                  width: '100%'
                }}
              >
                <Icon size={15} style={{ color: isSel ? '#ffffff' : 'var(--muted-color)' }} />
                <span>{tab.label}</span>
                {tab.count !== undefined && tab.count > 0 && (
                  <span style={{ marginLeft: 'auto', background: '#fff', color: '#000', fontSize: '0.65rem', padding: '2px 5px', borderRadius: '8px', fontWeight: 'bold' }}>
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
          style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', padding: '8px 12px', borderRadius: '8px', fontSize: '0.8rem' }}
        >
          <LogOut size={13} /> Exit Dashboard
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="dashboard-content" style={{ marginTop: '60px', zIndex: 10 }}>
        
        {/* Tab 1: Overview */}
        {adminTab === 'overview' && (
          <div>
            <h2 style={{ fontSize: '1.6rem', marginBottom: '20px', fontFamily: 'var(--font-display)' }}>System Monitor</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '30px' }}>
              {[
                { title: 'Pending Waitlist', val: waitlist.filter((w: any) => w.status === 'Pending').length, icon: Users, color: '#f59e0b' },
                { title: 'Inbox Messages', val: contactMessages.filter((c: any) => c.status === 'Unread').length, icon: Mail, color: '#60a5fa' },
                { title: 'Research Articles', val: research.length, icon: Database, color: '#d1d5db' },
                { title: 'Maintenance Node', val: maintenanceMode ? 'ACTIVE' : 'OFFLINE', icon: AlertTriangle, color: maintenanceMode ? '#ef4444' : 'var(--green)' }
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="glass-card" style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', color: stat.color }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--muted-color)', fontWeight: 500 }}>{stat.title}</span>
                      <Icon size={16} />
                    </div>
                    <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', marginTop: '10px', fontFamily: 'var(--font-display)' }}>
                      {stat.val}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="glass-card" style={{ padding: '25px', marginBottom: '30px' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '15px' }}>Cluster Core Diagnostics</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--muted-color)' }}>
                    <span>GPU-Node-A (Orchestrator Sandbox)</span>
                    <span style={{ color: 'var(--green)' }}>Active (ONLINE)</span>
                  </div>
                  <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', marginTop: '6px' }}>
                    <div style={{ width: '82%', height: '100%', background: 'var(--green)' }}></div>
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--muted-color)' }}>
                    <span>GPU-Node-B (Private Fine-Tuner)</span>
                    <span style={{ color: 'var(--muted-color)' }}>Idle Standby (ONLINE)</span>
                  </div>
                  <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', marginTop: '6px' }}>
                    <div style={{ width: '4%', height: '100%', background: '#6b7280' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '25px' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '15px' }}>Database & Socket Tunnels</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--muted-color)' }}>
                    <span>Convex Datastore latency</span>
                    <span style={{ color: 'var(--green)' }}>Real-time (Active)</span>
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--muted-color)' }}>
                    <span>Active Gateway Sockets</span>
                    <span style={{ color: 'var(--green)' }}>Encryption Verified (SSL)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Waitlist Registry */}
        {adminTab === 'submissions' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
              <div>
                <h2 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-display)' }}>Waitlist Submissions</h2>
                <p style={{ color: 'var(--muted-color)', fontSize: '0.85rem', marginTop: '2px' }}>
                  Manage developer requests, toggle approval statuses, export logs, and generate API keys.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={handleExportWaitlist} className="nav-btn" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', padding: '6px 12px' }}>
                  <Download size={13} /> Export JSON
                </button>
                <button onClick={handleAddMockEntry} className="nav-btn" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', padding: '6px 12px' }}>
                  <Plus size={13} /> Mock Entry
                </button>
                {waitlist.length > 0 && (
                  <button onClick={handleClearWaitlist} className="nav-btn" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', padding: '6px 12px', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)', background: 'rgba(239, 68, 68, 0.05)' }}>
                    <Trash2 size={13} /> Purge All
                  </button>
                )}
              </div>
            </div>

            {/* Filter controls */}
            <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <input 
                type="text" 
                placeholder="Search registry (name, email, company, usecase)..." 
                value={waitlistSearch}
                onChange={e => setWaitlistSearch(e.target.value)}
                className="input-field"
                style={{ flex: 1, minWidth: '250px', padding: '8px 12px', fontSize: '0.85rem', marginBottom: 0 }}
              />
              
              <select 
                value={waitlistFilter} 
                onChange={e => setWaitlistFilter(e.target.value as any)}
                className="input-field"
                style={{ width: '150px', padding: '8px 12px', fontSize: '0.85rem', background: '#0a0a12', marginBottom: 0 }}
              >
                <option value="All">All States</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            {filteredWaitlist.length === 0 ? (
              <div className="glass-card" style={{ padding: '50px', textAlign: 'center', background: 'rgba(0,0,0,0.1)' }}>
                <Users size={35} style={{ color: 'var(--muted-color)', marginBottom: '10px' }} />
                <h4 style={{ fontSize: '1rem', color: '#f3f4f6' }}>No matching applicants found</h4>
              </div>
            ) : (
              <div className="glass-card" style={{ padding: '0', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
                  <thead>
                    <tr style={{ background: 'rgba(255,255,255,0.01)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      {['Developer Info', 'Company', 'Use Case Description', 'API Key Status', 'Registered Date', 'Actions'].map((header, i) => (
                        <th key={i} style={{ padding: '14px 18px', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--muted-color)', fontWeight: 600 }}>{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredWaitlist.map((entry: any) => (
                      <tr key={entry._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <td style={{ padding: '14px 18px' }}>
                          <div style={{ fontWeight: 600, color: '#fff', fontSize: '0.85rem' }}>{entry.name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--muted-color)', marginTop: '2px' }}>{entry.email}</div>
                        </td>
                        <td style={{ padding: '14px 18px', fontSize: '0.85rem' }}>{entry.company}</td>
                        <td style={{ padding: '14px 18px', fontSize: '0.8rem', color: 'var(--muted-color)', maxWidth: '250px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }} title={entry.useCase}>
                          {entry.useCase}
                        </td>
                        <td style={{ padding: '14px 18px' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <span className="badge" style={{
                              background: entry.status === 'Approved' ? 'rgba(16,185,129,0.1)' : entry.status === 'Rejected' ? 'rgba(239,68,68,0.1)' : 'rgba(245,158,11,0.1)',
                              color: entry.status === 'Approved' ? 'var(--green)' : entry.status === 'Rejected' ? '#ef4444' : '#f59e0b',
                              border: `1px solid ${entry.status === 'Approved' ? 'var(--green)30' : entry.status === 'Rejected' ? '#ef444430' : '#f59e0b30'}`,
                              fontSize: '0.65rem',
                              width: 'fit-content'
                            }}>
                              {entry.status}
                            </span>
                            {entry.apiKey && (
                              <code style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', background: 'rgba(255,255,255,0.05)', padding: '2px 4px', borderRadius: '4px', width: 'fit-content' }} onClick={() => {
                                navigator.clipboard.writeText(entry.apiKey || '');
                                alert('API Key copied to clipboard!');
                              }}>
                                {entry.apiKey.substring(0, 18)}...
                              </code>
                            )}
                          </div>
                        </td>
                        <td style={{ padding: '14px 18px', fontSize: '0.8rem', color: 'var(--muted-color)', fontFamily: 'monospace' }}>
                          {entry.submittedAt}
                        </td>
                        <td style={{ padding: '14px 18px' }}>
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            {entry.status !== 'Approved' && (
                              <button 
                                onClick={() => handleApproveWaitlist(entry._id)} 
                                style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.2)', color: 'var(--green)', cursor: 'pointer', padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem' }}
                              >
                                Approve
                              </button>
                            )}
                            {entry.status !== 'Rejected' && (
                              <button 
                                onClick={() => handleRejectWaitlist(entry._id)} 
                                style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444', cursor: 'pointer', padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem' }}
                              >
                                Reject
                              </button>
                            )}
                            <button 
                              onClick={() => handleDeleteWaitlist(entry._id)} 
                              style={{ background: 'transparent', border: 'none', color: '#6b7280', cursor: 'pointer', padding: '4px' }}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Contact Messages Inbox */}
        {adminTab === 'contacts' && (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-display)' }}>Contacts Inbox</h2>
              <p style={{ color: 'var(--muted-color)', fontSize: '0.85rem', marginTop: '2px' }}>
                Read message submissions, mark status logs, and simulate SMTP mail replies.
              </p>
            </div>

            {/* Filter controls */}
            <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <input 
                type="text" 
                placeholder="Search messages (name, email, subject, text)..." 
                value={contactSearch}
                onChange={e => setContactSearch(e.target.value)}
                className="input-field"
                style={{ flex: 1, minWidth: '250px', padding: '8px 12px', fontSize: '0.85rem', marginBottom: 0 }}
              />
              
              <select 
                value={contactFilter} 
                onChange={e => setContactFilter(e.target.value as any)}
                className="input-field"
                style={{ width: '150px', padding: '8px 12px', fontSize: '0.85rem', background: '#0a0a12', marginBottom: 0 }}
              >
                <option value="All">All Messages</option>
                <option value="Unread">Unread</option>
                <option value="Read">Read</option>
                <option value="Replied">Replied</option>
              </select>
            </div>

            {filteredContacts.length === 0 ? (
              <div className="glass-card" style={{ padding: '50px', textAlign: 'center', background: 'rgba(0,0,0,0.1)' }}>
                <Mail size={35} style={{ color: 'var(--muted-color)', marginBottom: '10px' }} />
                <h4 style={{ fontSize: '1rem', color: '#f3f4f6' }}>No message submissions found</h4>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {filteredContacts.map((msg: any) => (
                  <div 
                    key={msg._id} 
                    className="glass-card" 
                    style={{ 
                      padding: '20px', 
                      background: msg.status === 'Unread' ? 'rgba(255,255,255,0.02)' : 'var(--glass-bg)',
                      borderLeft: msg.status === 'Unread' ? '3px solid #fff' : msg.status === 'Replied' ? '3px solid var(--green)' : '1px solid rgba(255,255,255,0.08)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <h4 style={{ color: '#fff', fontSize: '0.95rem' }}>{msg.name}</h4>
                          <span style={{ fontSize: '0.75rem', color: 'var(--muted-color)' }}>&lt;{msg.email}&gt;</span>
                          <span className="badge" style={{
                            background: msg.status === 'Replied' ? 'rgba(16,185,129,0.1)' : msg.status === 'Read' ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.12)',
                            color: msg.status === 'Replied' ? 'var(--green)' : msg.status === 'Read' ? 'var(--muted-color)' : '#fff',
                            fontSize: '0.6rem'
                          }}>
                            {msg.status}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#e5e7eb', marginTop: '6px', fontWeight: 600 }}>
                          Subject: {msg.subject.toUpperCase()}
                        </div>
                      </div>
                      
                      <div style={{ fontSize: '0.75rem', color: 'var(--muted-color)', fontFamily: 'monospace' }}>
                        {msg.submittedAt}
                      </div>
                    </div>

                    <p style={{ color: 'var(--muted-color)', fontSize: '0.85rem', marginTop: '12px', lineHeight: '1.6', background: 'rgba(0,0,0,0.15)', padding: '12px', borderRadius: '8px', whiteSpace: 'pre-wrap' }}>
                      {msg.message}
                    </p>

                    <div style={{ display: 'flex', gap: '10px', marginTop: '15px', justifyContent: 'flex-end' }}>
                      {msg.status === 'Unread' && (
                        <button 
                          onClick={() => handleMarkContactStatus(msg._id, 'Read')}
                          className="nav-btn"
                          style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                        >
                          Mark Read
                        </button>
                      )}
                      {msg.status === 'Read' && (
                        <button 
                          onClick={() => handleMarkContactStatus(msg._id, 'Unread')}
                          className="nav-btn"
                          style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                        >
                          Mark Unread
                        </button>
                      )}
                      <button 
                        onClick={() => handleOpenReplyModal(msg)}
                        className="btn-primary"
                        style={{ padding: '4px 10px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        <Send size={11} /> Reply
                      </button>
                      <button 
                        onClick={() => handleDeleteContact(msg._id)}
                        style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px' }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Roadmap Timeline Editor */}
        {adminTab === 'roadmap' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h2 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-display)' }}>Roadmap Timeline Editor</h2>
                <p style={{ color: 'var(--muted-color)', fontSize: '0.85rem', marginTop: '2px' }}>
                  Manage, reorder, and configure Zyntral timeline stages dynamically in Convex.
                </p>
              </div>
              <button onClick={handleAddRoadmapStep} className="btn-primary" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
                <Plus size={13} /> Add Stage
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: editingRoadmapId !== null ? '1.2fr 1fr' : '1fr', gap: '25px', alignItems: 'start' }}>
              {/* List */}
              <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {sortedRoadmap.map((step, idx) => (
                  <div key={step._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.15)', border: '1px solid rgba(255,255,255,0.05)', padding: '12px 18px', borderRadius: '10px' }}>
                    <div>
                      <span className="badge" style={{ background: step.badgeBg, color: step.statusColor, border: `1px solid ${step.statusColor}25`, fontSize: '0.6rem' }}>{step.status}</span>
                      <h4 style={{ color: '#fff', fontSize: '0.95rem', marginTop: '6px' }}>{step.phase}</h4>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <button disabled={idx === 0} onClick={() => moveRoadmapStep(idx, 'up')} style={{ background: 'transparent', border: 'none', color: idx === 0 ? 'rgba(255,255,255,0.05)' : 'var(--muted-color)', cursor: idx === 0 ? 'default' : 'pointer' }}><ChevronUp size={15} /></button>
                      <button disabled={idx === sortedRoadmap.length - 1} onClick={() => moveRoadmapStep(idx, 'down')} style={{ background: 'transparent', border: 'none', color: idx === sortedRoadmap.length - 1 ? 'rgba(255,255,255,0.05)' : 'var(--muted-color)', cursor: idx === sortedRoadmap.length - 1 ? 'default' : 'pointer' }}><ChevronDown size={15} /></button>
                      
                      <button onClick={() => startEditRoadmap(step._id)} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', marginLeft: '8px' }}><Edit2 size={14} /></button>
                      <button onClick={() => handleDeleteRoadmapStep(step._id)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={14} /></button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Editing Form */}
              {editingRoadmapId !== null && (
                <div className="glass-card" style={{ padding: '25px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                    <h3 style={{ fontSize: '1.1rem' }}>Configure Stage</h3>
                    <button onClick={() => setEditingRoadmapId(null)} style={{ background: 'transparent', border: 'none', color: 'var(--muted-color)', cursor: 'pointer' }}><X size={16} /></button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div className="input-group" style={{ marginBottom: 0 }}>
                      <label className="input-label" style={{ fontSize: '0.7rem' }}>Phase Identifier</label>
                      <input type="text" value={rmPhase} onChange={e => setRmPhase(e.target.value)} className="input-field" style={{ padding: '8px 12px', fontSize: '0.8rem', marginBottom: 0 }} />
                    </div>
                    <div className="input-group" style={{ marginBottom: 0 }}>
                      <label className="input-label" style={{ fontSize: '0.7rem' }}>Status State</label>
                      <input type="text" value={rmStatus} onChange={e => setRmStatus(e.target.value)} className="input-field" style={{ padding: '8px 12px', fontSize: '0.8rem', marginBottom: 0 }} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="input-label" style={{ fontSize: '0.7rem' }}>Color Hex/Var</label>
                        <input type="text" value={rmStatusColor} onChange={e => setRmStatusColor(e.target.value)} className="input-field" style={{ padding: '8px 12px', fontSize: '0.8rem', marginBottom: 0 }} />
                      </div>
                      <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="input-label" style={{ fontSize: '0.7rem' }}>Badge BG</label>
                        <input type="text" value={rmBadgeBg} onChange={e => setRmBadgeBg(e.target.value)} className="input-field" style={{ padding: '8px 12px', fontSize: '0.8rem', marginBottom: 0 }} />
                      </div>
                    </div>
                    <div className="input-group" style={{ marginBottom: 0 }}>
                      <label className="input-label" style={{ fontSize: '0.7rem' }}>Lucide Icon</label>
                      <select value={rmIcon} onChange={e => setRmIcon(e.target.value)} className="input-field" style={{ padding: '8px 12px', fontSize: '0.8rem', background: '#0a0a12', marginBottom: 0 }}>
                        <option value="Award">Award</option>
                        <option value="Compass">Compass</option>
                        <option value="Cpu">Cpu</option>
                        <option value="ShieldAlert">ShieldAlert</option>
                        <option value="Globe">Globe</option>
                        <option value="HelpCircle">HelpCircle</option>
                      </select>
                    </div>
                    <div className="input-group" style={{ marginBottom: 0 }}>
                      <label className="input-label" style={{ fontSize: '0.7rem' }}>Stage Description</label>
                      <textarea value={rmDesc} onChange={e => setRmDesc(e.target.value)} className="input-field" rows={2} style={{ resize: 'none', lineHeight: '1.4', fontSize: '0.8rem', marginBottom: 0 }} />
                    </div>

                    <button onClick={() => saveRoadmapStep(editingRoadmapId)} className="btn-primary" style={{ padding: '8px', fontSize: '0.8rem', justifyContent: 'center' }}>
                      <Save size={13} /> Commit Changes
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 5: Research Catalog Editor */}
        {adminTab === 'research' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h2 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-display)' }}>Research Catalog Editor</h2>
                <p style={{ color: 'var(--muted-color)', fontSize: '0.85rem', marginTop: '2px' }}>
                  Manage articles and draft dynamic catcher reports code-free in Convex.
                </p>
              </div>
              <button onClick={handleAddResearchArticle} className="btn-primary" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
                <Plus size={13} /> Create Article
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: editingResearchId !== null ? '1fr 1fr' : '1fr', gap: '25px', alignItems: 'start' }}>
              {/* List */}
              <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {research.map((art: any) => (
                  <div key={art._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.15)', border: '1px solid rgba(255,255,255,0.05)', padding: '12px 18px', borderRadius: '10px' }}>
                    <div>
                      <span className="badge badge-purple" style={{ fontSize: '0.6rem' }}>{art.category}</span>
                      <h4 style={{ color: '#fff', fontSize: '0.95rem', marginTop: '6px' }}>{art.title}</h4>
                      <div style={{ fontSize: '0.7rem', color: 'var(--muted-color)', marginTop: '2px' }}>Slug: <code>{art.path.replace('/research/', '')}</code></div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => startEditResearch(art._id)} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}><Edit2 size={14} /></button>
                      <button onClick={() => handleDeleteResearchArticle(art._id)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={14} /></button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Editing Form */}
              {editingResearchId !== null && (
                <div className="glass-card" style={{ padding: '25px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                    <h3 style={{ fontSize: '1.1rem' }}>Configure Article</h3>
                    <button onClick={() => setEditingResearchId(null)} style={{ background: 'transparent', border: 'none', color: 'var(--muted-color)', cursor: 'pointer' }}><X size={16} /></button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '12px' }}>
                      <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="input-label" style={{ fontSize: '0.7rem' }}>Article Title</label>
                        <input type="text" value={resTitle} onChange={e => setResTitle(e.target.value)} className="input-field" style={{ padding: '8px 12px', fontSize: '0.8rem', marginBottom: 0 }} />
                      </div>
                      <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="input-label" style={{ fontSize: '0.7rem' }}>Category Label</label>
                        <input type="text" value={resCategory} onChange={e => setResCategory(e.target.value)} className="input-field" style={{ padding: '8px 12px', fontSize: '0.8rem', marginBottom: 0 }} />
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '12px' }}>
                      <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="input-label" style={{ fontSize: '0.7rem' }}>Pub Date</label>
                        <input type="text" value={resDate} onChange={e => setResDate(e.target.value)} className="input-field" style={{ padding: '8px 12px', fontSize: '0.8rem', marginBottom: 0 }} />
                      </div>
                      <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="input-label" style={{ fontSize: '0.7rem' }}>Path Slug</label>
                        <input type="text" value={resSlug} onChange={e => setResSlug(e.target.value)} className="input-field" style={{ padding: '8px 12px', fontSize: '0.8rem', marginBottom: 0 }} />
                      </div>
                    </div>
                    <div className="input-group" style={{ marginBottom: 0 }}>
                      <label className="input-label" style={{ fontSize: '0.7rem' }}>Short Abstract</label>
                      <textarea value={resDesc} onChange={e => setResDesc(e.target.value)} className="input-field" rows={2} style={{ resize: 'none', lineHeight: '1.4', fontSize: '0.8rem', marginBottom: 0 }} />
                    </div>
                    <div className="input-group" style={{ marginBottom: 0 }}>
                      <label className="input-label" style={{ fontSize: '0.7rem' }}>Full Content Paragraphs (split with double newlines)</label>
                      <textarea value={resContent} onChange={e => setResContent(e.target.value)} className="input-field" rows={4} style={{ resize: 'vertical', lineHeight: '1.4', fontSize: '0.8rem', marginBottom: 0 }} />
                    </div>

                    <button onClick={() => saveResearchArticle(editingResearchId)} className="btn-primary" style={{ padding: '8px', fontSize: '0.8rem', justifyContent: 'center' }}>
                      <Save size={13} /> Commit Changes
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 6: About Profile Editor */}
        {adminTab === 'about' && (
          <div className="glass-card" style={{ padding: '25px', maxWidth: '700px' }}>
            <h2 style={{ fontSize: '1.6rem', marginBottom: '15px', fontFamily: 'var(--font-display)' }}>Founder Profile Editor</h2>
            <p style={{ color: 'var(--muted-color)', fontSize: '0.85rem', marginBottom: '20px' }}>
              Override biography text and mission statement fields rendered on `/about/founder` in Convex.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div className="input-group" style={{ marginBottom: 0 }}>
                <label className="input-label">Founder Name</label>
                <input 
                  type="text" 
                  value={fdName} 
                  onChange={e => setFdName(e.target.value)} 
                  className="input-field"
                  placeholder="Sujal Talreja"
                />
              </div>

              <div className="input-group" style={{ marginBottom: 0 }}>
                <label className="input-label">Role Subheader</label>
                <input 
                  type="text" 
                  value={fdRole} 
                  onChange={e => setFdRole(e.target.value)} 
                  className="input-field"
                  placeholder="Founder & Lead Architect at Zyntral AI."
                />
              </div>

              <div className="input-group" style={{ marginBottom: 0 }}>
                <label className="input-label">Story Paragraph 1</label>
                <textarea 
                  value={fdStoryPara1} 
                  onChange={e => setFdStoryPara1(e.target.value)} 
                  className="input-field"
                  rows={3}
                  style={{ resize: 'none', lineHeight: '1.5' }}
                />
              </div>

              <div className="input-group" style={{ marginBottom: 0 }}>
                <label className="input-label">Story Paragraph 2</label>
                <textarea 
                  value={fdStoryPara2} 
                  onChange={e => setFdStoryPara2(e.target.value)} 
                  className="input-field"
                  rows={3}
                  style={{ resize: 'none', lineHeight: '1.5' }}
                />
              </div>

              <div className="input-group" style={{ marginBottom: 0 }}>
                <label className="input-label">Technical Mission Statement</label>
                <textarea 
                  value={fdMission} 
                  onChange={e => setFdMission(e.target.value)} 
                  className="input-field"
                  rows={3}
                  style={{ resize: 'none', lineHeight: '1.5' }}
                />
              </div>

              <button onClick={saveFounderProfile} className="btn-primary" style={{ marginTop: '10px', justifyContent: 'center' }}>
                <Save size={15} /> Save Biography Overrides
              </button>
            </div>
          </div>
        )}

        {/* Tab 7: Interactive Shell console */}
        {adminTab === 'logs' && (
          <div>
            <h2 style={{ fontSize: '1.6rem', marginBottom: '20px', fontFamily: 'var(--font-display)' }}>Interactive Shell</h2>
            
            <div className="rag-builder-widget" style={{ minHeight: '450px', height: 'auto', display: 'flex', flexDirection: 'column', background: 'rgba(2, 2, 5, 0.95)' }}>
              <div className="terminal-header" style={{ flexShrink: 0 }}>
                <div className="terminal-dots">
                  <span className="terminal-dot red" />
                  <span className="terminal-dot yellow" />
                  <span className="terminal-dot green" />
                </div>
                <span className="terminal-title">zyntral-kernel@secure-node:~</span>
              </div>
              
              <div className="terminal-body" style={{ flexGrow: 1, fontFamily: 'monospace', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '6px', overflowY: 'auto', maxHeight: '350px', padding: '15px' }}>
                {terminalLines.map((log, index) => (
                  <div key={index} style={{ 
                    color: log.startsWith('zyntral-kernel@') ? '#fff' : log.includes('Error') ? '#fca5a5' : log.includes('ONLINE') || log.includes('ONLINE') ? 'var(--green)' : '#9ca3af',
                    whiteSpace: 'pre-wrap'
                  }}>
                    {log}
                  </div>
                ))}
                <div ref={terminalEndRef} />
              </div>

              <form onSubmit={handleTerminalSubmit} style={{ display: 'flex', borderTop: '1px solid rgba(255,255,255,0.08)', background: '#030307', padding: '10px 15px', alignItems: 'center' }}>
                <span style={{ color: 'var(--green)', fontFamily: 'monospace', fontSize: '0.85rem', marginRight: '8px', userSelect: 'none' }}>
                  zyntral-kernel@root:~$
                </span>
                <input 
                  type="text" 
                  value={terminalInput}
                  onChange={e => setTerminalInput(e.target.value)}
                  placeholder="Type 'help' to see directives..."
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: '#fff',
                    fontFamily: 'monospace',
                    fontSize: '0.85rem'
                  }}
                  autoFocus
                />
              </form>
            </div>
          </div>
        )}

        {/* Tab 8: System Settings */}
        {adminTab === 'settings' && (
          <div className="glass-card" style={{ padding: '25px', maxWidth: '600px' }}>
            <h2 style={{ fontSize: '1.6rem', marginBottom: '15px', fontFamily: 'var(--font-display)' }}>System Configuration</h2>
            <p style={{ color: 'var(--muted-color)', fontSize: '0.85rem', marginBottom: '25px' }}>
              Manage admin passcode triggers, enable simulated maintenance overlays, or flush Convex datastore.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="input-group" style={{ marginBottom: 0 }}>
                <label className="input-label">Admin Passcode Lock</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type={showPasscode ? 'text' : 'password'} 
                    value={newPasscode}
                    onChange={e => setNewPasscode(e.target.value)}
                    className="input-field"
                    style={{ paddingRight: '40px' }}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPasscode(!showPasscode)}
                    style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: 'var(--muted-color)', cursor: 'pointer' }}
                  >
                    {showPasscode ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(0,0,0,0.15)', padding: '15px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.03)' }}>
                <input 
                  type="checkbox"
                  id="maintenance_toggle"
                  checked={maintenanceMode}
                  onChange={e => setMaintenanceMode(e.target.checked)}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <label htmlFor="maintenance_toggle" style={{ fontSize: '0.85rem', color: '#fff', cursor: 'pointer', userSelect: 'none' }}>
                  <strong>Enable Maintenance Mode</strong>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted-color)', marginTop: '2px' }}>
                    Displays a warning banner at the top of client pages.
                  </div>
                </label>
              </div>

              <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                <button onClick={saveSystemSettings} className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                  <Save size={15} /> Save Configurations
                </button>
                
                <button onClick={handleResetSystemData} className="btn-secondary" style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)', display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
                  <RefreshCw size={14} /> Wipe Convex DB
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Reply Message Modal */}
      {replyMessage && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(4px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div className="glass-card" style={{ maxWidth: '600px', width: '100%', padding: '30px', background: 'rgba(10,10,18,0.95)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#fff' }}>Simulate Reply Dispatcher</h3>
              <button onClick={() => setReplyMessage(null)} style={{ background: 'transparent', border: 'none', color: 'var(--muted-color)', cursor: 'pointer' }}><X size={18} /></button>
            </div>

            <form onSubmit={handleSendReply} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div className="input-group" style={{ marginBottom: 0 }}>
                  <label className="input-label" style={{ fontSize: '0.75rem' }}>Recipient Name</label>
                  <input type="text" className="input-field" value={replyMessage.name} disabled style={{ background: 'rgba(255,255,255,0.02)', color: 'rgba(255,255,255,0.5)', cursor: 'not-allowed', marginBottom: 0, fontSize: '0.8rem', padding: '8px 12px' }} />
                </div>
                <div className="input-group" style={{ marginBottom: 0 }}>
                  <label className="input-label" style={{ fontSize: '0.75rem' }}>Recipient Email</label>
                  <input type="text" className="input-field" value={replyMessage.email} disabled style={{ background: 'rgba(255,255,255,0.02)', color: 'rgba(255,255,255,0.5)', cursor: 'not-allowed', marginBottom: 0, fontSize: '0.8rem', padding: '8px 12px' }} />
                </div>
              </div>

              <div className="input-group" style={{ marginBottom: 0 }}>
                <label className="input-label" style={{ fontSize: '0.75rem' }}>Message Subject</label>
                <input type="text" className="input-field" value={`Re: ${replyMessage.subject.toUpperCase()}`} disabled style={{ background: 'rgba(255,255,255,0.02)', color: 'rgba(255,255,255,0.5)', cursor: 'not-allowed', marginBottom: 0, fontSize: '0.8rem', padding: '8px 12px' }} />
              </div>

              <div className="input-group" style={{ marginBottom: 0 }}>
                <label className="input-label" style={{ fontSize: '0.75rem' }}>Email Reply Body</label>
                <textarea 
                  value={replyBody} 
                  onChange={e => setReplyBody(e.target.value)} 
                  className="input-field" 
                  rows={8} 
                  style={{ resize: 'none', fontSize: '0.85rem', lineHeight: '1.5', fontFamily: 'sans-serif' }}
                  required
                />
              </div>

              <button type="submit" className="btn-primary" style={{ justifyContent: 'center', marginTop: '10px' }}>
                <Send size={14} /> Send Simulated Response
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminPortal;
