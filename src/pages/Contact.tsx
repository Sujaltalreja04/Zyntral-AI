import React, { useState } from 'react';
import { Send, CheckCircle, ArrowLeft, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { SEO } from '../components/SEO';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('general');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const addContact = useMutation(api.contacts.add);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    try {
      // 1. Commit message locally to Convex database
      await addContact({
        name: name.trim(),
        email: email.trim(),
        subject,
        message: message.trim()
      });

      // 2. Submit payload to Formspree dashboard
      await fetch("https://formspree.io/f/meebkoro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject: subject,
          message: message.trim()
        })
      });

      setSubmitted(true);
    } catch (err) {
      console.error('Failed to submit contact message', err);
      alert('Failed to send message. Please try again.');
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
        title="Contact Us - Technical Inquiries"
        description="Contact the Zyntral Labs team for developer support, custom enterprise licensing options, or custom GPU cluster coordination inquiries."
        path="/contact"
        keywords={['Contact Zyntral', 'developer support', 'enterprise sales', 'API help']}
      />
      <div className="container" style={{ maxWidth: '650px', position: 'relative', zIndex: 5 }}>
        
        {!submitted ? (
          <div className="glass-card contact-card" style={{ 
            background: 'rgba(15, 15, 15, 0.7)', 
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.08)', 
            borderRadius: '24px', 
            color: '#f8fafc' 
          }}>
            
            <div style={{ textAlign: 'center', marginBottom: '35px' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '8px', color: '#ffffff', fontWeight: 800 }}>Get In Touch</h2>
              <p style={{ color: '#8a99ad', fontSize: '0.95rem' }}>
                Contact the Zyntral Labs team for support or partnership inquiries.
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div className="contact-grid" style={{ gap: '15px' }}>
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
                  <label className="input-label" style={{ color: '#8a99ad' }}>Email Address</label>
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
                <label className="input-label" style={{ color: '#8a99ad' }}>Subject</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="input-field"
                  style={{ background: 'rgba(0, 0, 0, 0.35)', border: '1px solid rgba(255, 255, 255, 0.08)', color: '#ffffff', height: '42px' }}
                >
                  <option value="general">General Inquiry</option>
                  <option value="partnership">Partnerships & Integrations</option>
                  <option value="support">Developer Support</option>
                  <option value="press">Press / Media</option>
                </select>
              </div>

              <div className="input-group" style={{ marginBottom: 0 }}>
                <label className="input-label" style={{ color: '#8a99ad' }}>Message</label>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="input-field"
                  rows={4}
                  style={{ resize: 'none', lineHeight: '1.5', background: 'rgba(0, 0, 0, 0.35)', border: '1px solid rgba(255, 255, 255, 0.08)', color: '#ffffff' }}
                  placeholder="How can we help you?"
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
                <Send size={16} /> Send Message
              </button>

            </form>
          </div>
        ) : (
          <div className="glass-card contact-card" style={{ 
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

            <h2 style={{ fontSize: '2rem', marginBottom: '10px', color: '#ffffff', fontWeight: 800 }}>Message Sent</h2>
            <p style={{ color: '#8a99ad', maxWidth: '450px', margin: '0 auto 30px', fontSize: '0.95rem', lineHeight: '1.7' }}>
              Thank you for reaching out, <strong>{name}</strong>! We will get back to you shortly.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
              <Link to="/" className="btn-secondary" style={{ padding: '10px 24px', fontSize: '0.9rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.06)', background: 'rgba(255, 255, 255, 0.02)', color: '#cbd5e1' }}>
                <ArrowLeft size={16} /> Return Home
              </Link>
            </div>
            
            <div style={{ marginTop: '40px', fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <ShieldCheck size={14} style={{ color: '#10b981' }} />
              <span>Data encrypted and secured.</span>
            </div>
          </div>
        )}

      </div>

      <style>{`
        .contact-card {
          padding: 45px;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }

        @media (max-width: 768px) {
          .contact-card {
            padding: 30px 16px !important;
          }
        }

        @media (max-width: 580px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;
