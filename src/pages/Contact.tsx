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
      await addContact({
        name: name.trim(),
        email: email.trim(),
        subject,
        message: message.trim()
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Failed to submit contact message', err);
      alert('Failed to send message. Please try again.');
    }
  };

  return (
    <div style={{ paddingTop: '120px', minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      <SEO
        title="Contact Us - Technical Inquiries"
        description="Contact the Zyntral Labs team for developer support, custom enterprise licensing options, or custom GPU cluster coordination inquiries."
        path="/contact"
        keywords={['Contact Zyntral', 'developer support', 'enterprise sales', 'API help']}
      />
      <div className="container" style={{ maxWidth: '650px', position: 'relative', zIndex: 5 }}>
        
        {!submitted ? (
          <div className="glass-card" style={{ background: 'rgba(5, 5, 12, 0.6)', padding: '45px' }}>
            <div className="glow-glow"></div>
            
            <div style={{ textAlign: 'center', marginBottom: '35px' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>Get In Touch</h2>
              <p style={{ color: 'var(--muted-color)', fontSize: '0.95rem' }}>
                Contact the Zyntral Labs team for support or partnership inquiries.
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
                  <label className="input-label">Email Address</label>
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
                <label className="input-label">Subject</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="input-field"
                  style={{ background: 'rgba(0,0,0,0.4)' }}
                >
                  <option value="general">General Inquiry</option>
                  <option value="partnership">Partnerships & Integrations</option>
                  <option value="support">Developer Support</option>
                  <option value="press">Press / Media</option>
                </select>
              </div>

              <div className="input-group" style={{ marginBottom: 0 }}>
                <label className="input-label">Message</label>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="input-field"
                  rows={4}
                  style={{ resize: 'none', lineHeight: '1.5' }}
                  placeholder="How can we help you?"
                />
              </div>

              <button type="submit" className="btn-primary" style={{ justifyContent: 'center', marginTop: '10px' }}>
                <Send size={16} />
                Send Message
              </button>

            </form>
          </div>
        ) : (
          <div className="glass-card" style={{ textAlign: 'center', padding: '50px', background: 'rgba(5, 5, 12, 0.6)' }}>
            <div className="glow-glow" style={{ background: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.08) 0%, transparent 60%)' }}></div>
            
            <div style={{ width: '65px', height: '65px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '25px', color: 'var(--green)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
              <CheckCircle size={32} />
            </div>

            <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>Message Sent</h2>
            <p style={{ color: 'var(--muted-color)', maxWidth: '450px', margin: '0 auto 30px', fontSize: '0.95rem', lineHeight: '1.7' }}>
              Thank you for reaching out, <strong style={{ color: '#fff' }}>{name}</strong>! We will get back to you shortly.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
              <Link to="/" className="btn-secondary" style={{ padding: '10px 24px', fontSize: '0.9rem' }}>
                <ArrowLeft size={16} /> Return Home
              </Link>
            </div>
            
            <div style={{ marginTop: '40px', fontSize: '0.75rem', color: 'var(--muted-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <ShieldCheck size={14} style={{ color: '#d1d5db' }} />
              <span>Data encrypted and secured.</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Contact;
