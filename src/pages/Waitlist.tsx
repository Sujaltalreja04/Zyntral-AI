import React, { useState } from 'react';
import { Send, CheckCircle, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { SEO } from '../components/SEO';

export const Waitlist: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [useCase, setUseCase] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [queueNumber, setQueueNumber] = useState(0);

  const waitlist = useQuery(api.waitlist.get) || [];
  const addWaitlist = useMutation(api.waitlist.add);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    try {
      await addWaitlist({
        name: name.trim(),
        email: email.trim(),
        company: company.trim() || 'Self / Independent',
        useCase: useCase.trim() || 'Undecided'
      });
      
      // Setup queue number (mocked base + size)
      setQueueNumber(138 + waitlist.length);
      setSubmitted(true);
    } catch (err) {
      console.error('Failed to submit waitlist application', err);
      alert('Failed to register application. Please try again.');
    }
  };

  return (
    <div style={{ paddingTop: '120px', minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      <SEO
        title="Apply for Sandbox Waitlist"
        description="Submit your application to request developer sandbox access and obtain API keys for Zyntral AI compiler orchestration and node services."
        path="/waitlist"
        keywords={['Developer waitlist', 'API key access', 'GPU sandbox access', 'Zyntral keys']}
      />
      <div className="container" style={{ maxWidth: '650px', position: 'relative', zIndex: 5 }}>
        
        {!submitted ? (
          <div className="glass-card" style={{ background: 'rgba(5, 5, 12, 0.6)', padding: '45px' }}>
            <div className="glow-glow"></div>
            
            <div style={{ textAlign: 'center', marginBottom: '35px' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>Join Zyntral Developer Beta</h2>
              <p style={{ color: 'var(--muted-color)', fontSize: '0.95rem' }}>
                Register your startup or project to obtain early developer sandbox keys.
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div className="input-group" style={{ marginBottom: 0 }}>
                  <label className="input-label">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-field"
                    placeholder="John Doe"
                  />
                </div>
                <div className="input-group" style={{ marginBottom: 0 }}>
                  <label className="input-label">Work Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div className="input-group" style={{ marginBottom: 0 }}>
                <label className="input-label">Company</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="input-field"
                  placeholder="Zyntral Logistics Corp"
                />
              </div>

              <div className="input-group" style={{ marginBottom: 0 }}>
                <label className="input-label">What are you trying to build?</label>
                <textarea
                  value={useCase}
                  onChange={(e) => setUseCase(e.target.value)}
                  className="input-field"
                  rows={3}
                  style={{ resize: 'none', lineHeight: '1.5' }}
                  placeholder="e.g. Build an automated retrieval agent for legal contracts auditing..."
                />
              </div>

              <button type="submit" className="btn-primary" style={{ justifyContent: 'center', marginTop: '10px' }}>
                <Send size={16} />
                Submit Application
              </button>

            </form>
          </div>
        ) : (
          <div className="glass-card" style={{ textAlign: 'center', padding: '50px', background: 'rgba(5, 5, 12, 0.6)' }}>
            <div className="glow-glow" style={{ background: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.08) 0%, transparent 60%)' }}></div>
            
            <div style={{ width: '65px', height: '65px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '25px', color: 'var(--green)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
              <CheckCircle size={32} />
            </div>

            <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>Application Received</h2>
            <p style={{ color: 'var(--muted-color)', maxWidth: '450px', margin: '0 auto 30px', fontSize: '0.95rem', lineHeight: '1.7' }}>
              Thank you, <strong style={{ color: '#fff' }}>{name}</strong>! Your request was logged. We are reviewing sandbox requests sequentially.
            </p>

            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '15px', padding: '20px', display: 'inline-block', minWidth: '220px', marginBottom: '35px' }}>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--muted-color)', letterSpacing: '1px' }}>Your Waitlist Spot</span>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: '#ffffff', marginTop: '5px' }}>
                #{queueNumber}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
              <Link to="/" className="btn-secondary" style={{ padding: '10px 24px', fontSize: '0.9rem' }}>
                <ArrowLeft size={16} /> Return Home
              </Link>
              <Link to="/platform" className="btn-primary" style={{ padding: '10px 24px', fontSize: '0.9rem' }}>
                Explore Platform <ArrowRight size={16} />
              </Link>
            </div>
            
            <div style={{ marginTop: '40px', fontSize: '0.75rem', color: 'var(--muted-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <ShieldCheck size={14} style={{ color: '#d1d5db' }} />
              <span>Data encrypted & compiled using Zyntral Shield.</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Waitlist;
