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
      // 1. Save locally in Convex database
      await addWaitlist({
        name: name.trim(),
        email: email.trim(),
        company: company.trim() || 'Self / Independent',
        useCase: useCase.trim() || 'Undecided'
      });

      // 2. Submit to Formspree dashboard endpoint
      await fetch("https://formspree.io/f/mykqjzng", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          company: company.trim() || 'Self / Independent',
          message: useCase.trim() || 'Undecided'
        })
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
    <div style={{
      backgroundColor: '#020204',
      backgroundImage: "radial-gradient(circle at 50% 0%, rgba(34, 197, 94, 0.08) 0%, rgba(2, 2, 4, 0.98) 70%)",
      minHeight: '100vh',
      paddingTop: '110px',
      paddingBottom: '40px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative'
    }}>
      <SEO
        title="Apply for Sandbox Waitlist"
        description="Submit your application to request developer sandbox access and obtain API keys for Zyntral AI compiler orchestration and node services."
        path="/waitlist"
        keywords={['Developer waitlist', 'API key access', 'GPU sandbox access', 'Zyntral keys']}
      />
      <div className="container" style={{ maxWidth: '650px', position: 'relative', zIndex: 5 }}>
        
        {!submitted ? (
          <div className="glass-card waitlist-card" style={{ 
            background: 'rgba(15, 15, 15, 0.7)', 
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.08)', 
            borderRadius: '24px', 
            color: '#f8fafc' 
          }}>
            
            <div style={{ textAlign: 'center', marginBottom: '35px' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '8px', color: '#ffffff', fontWeight: 800 }}>Join Zyntral Developer Beta</h2>
              <p style={{ color: '#8a99ad', fontSize: '0.95rem' }}>
                Register your startup or project to obtain early developer sandbox keys.
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div className="waitlist-grid" style={{ gap: '15px' }}>
                <div className="input-group" style={{ marginBottom: 0 }}>
                  <label className="input-label" style={{ color: '#8a99ad' }}>Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-field"
                    placeholder="John Doe"
                    style={{ background: 'rgba(0, 0, 0, 0.35)', border: '1px solid rgba(255, 255, 255, 0.08)', color: '#ffffff' }}
                  />
                </div>
                <div className="input-group" style={{ marginBottom: 0 }}>
                  <label className="input-label" style={{ color: '#8a99ad' }}>Work Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                    placeholder="john@company.com"
                    style={{ background: 'rgba(0, 0, 0, 0.35)', border: '1px solid rgba(255, 255, 255, 0.08)', color: '#ffffff' }}
                  />
                </div>
              </div>

              <div className="input-group" style={{ marginBottom: 0 }}>
                <label className="input-label" style={{ color: '#8a99ad' }}>Company</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="input-field"
                  placeholder="Zyntral Logistics Corp"
                  style={{ background: 'rgba(0, 0, 0, 0.35)', border: '1px solid rgba(255, 255, 255, 0.08)', color: '#ffffff' }}
                />
              </div>

              <div className="input-group" style={{ marginBottom: 0 }}>
                <label className="input-label" style={{ color: '#8a99ad' }}>What are you trying to build?</label>
                <textarea
                  value={useCase}
                  onChange={(e) => setUseCase(e.target.value)}
                  className="input-field"
                  rows={3}
                  style={{ resize: 'none', lineHeight: '1.5', background: 'rgba(0, 0, 0, 0.35)', border: '1px solid rgba(255, 255, 255, 0.08)', color: '#ffffff' }}
                  placeholder="e.g. Build an automated retrieval agent for legal contracts auditing..."
                />
              </div>

              <button 
                type="submit" 
                className="btn-primary" 
                style={{ 
                  justifyContent: 'center', 
                  marginTop: '10px',
                  background: '#22c55e',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px',
                  fontSize: '0.85rem',
                  boxShadow: 'none'
                }}
              >
                <Send size={16} /> Submit Application
              </button>

            </form>
          </div>
        ) : (
          <div className="glass-card waitlist-card" style={{ 
            textAlign: 'center', 
            background: 'rgba(15, 15, 15, 0.7)', 
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.08)', 
            borderRadius: '24px', 
            color: '#f8fafc' 
          }}>
            
            <div style={{ width: '65px', height: '65px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.12)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '25px', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
              <CheckCircle size={32} />
            </div>

            <h2 style={{ fontSize: '2rem', marginBottom: '10px', color: '#ffffff', fontWeight: 800 }}>Application Received</h2>
            <p style={{ color: '#8a99ad', maxWidth: '450px', margin: '0 auto 30px', fontSize: '0.95rem', lineHeight: '1.7' }}>
              Thank you, <strong>{name}</strong>! Your request was logged. We are reviewing sandbox requests sequentially.
            </p>

            <div style={{ background: 'rgba(0, 0, 0, 0.25)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '15px', padding: '20px', display: 'inline-block', minWidth: '220px', marginBottom: '35px' }}>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#8a99ad', letterSpacing: '1px', fontWeight: 650 }}>Your Waitlist Spot</span>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#22c55e', marginTop: '5px' }}>
                #{queueNumber}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
              <Link to="/" className="btn-secondary" style={{ padding: '10px 24px', fontSize: '0.9rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.06)', background: 'rgba(255, 255, 255, 0.02)', color: '#cbd5e1' }}>
                <ArrowLeft size={16} /> Return Home
              </Link>
              <Link to="/workspace" className="btn-primary" style={{ padding: '10px 24px', fontSize: '0.9rem', borderRadius: '8px', background: '#22c55e', color: '#fff', border: 'none', boxShadow: 'none' }}>
                Open Workspace <ArrowRight size={16} />
              </Link>
            </div>
            
            <div style={{ marginTop: '40px', fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <ShieldCheck size={14} style={{ color: '#10b981' }} />
              <span>Data encrypted & compiled using Zyntral Shield.</span>
            </div>
          </div>
        )}

      </div>

      <style>{`
        .waitlist-card {
          padding: 45px;
        }

        .waitlist-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }

        @media (max-width: 768px) {
          .waitlist-card {
            padding: 30px 16px !important;
          }
        }

        @media (max-width: 580px) {
          .waitlist-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Waitlist;
