import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, ArrowLeft, Home } from 'lucide-react';
import { SEO } from '../components/SEO';

export const NotFound: React.FC = () => {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#020204',
      backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(34, 197, 94, 0.08) 0%, rgba(2, 2, 4, 0.98) 70%)',
      color: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif'
    }}>
      <SEO
        title="404 - Page Not Found"
        description="The requested page could not be found on Zyntral AI."
        noindex={true}
      />

      <div style={{
        maxWidth: '560px',
        width: '100%',
        textAlign: 'center',
        background: 'rgba(15, 15, 20, 0.7)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '24px',
        padding: '50px 30px',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)'
      }}>
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '20px',
          backgroundColor: 'rgba(34, 197, 94, 0.08)',
          border: '1px solid rgba(34, 197, 94, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px'
        }}>
          <Bot size={36} color="#22c55e" />
        </div>

        <span style={{
          fontSize: '0.75rem',
          fontWeight: 700,
          color: '#22c55e',
          textTransform: 'uppercase',
          letterSpacing: '1.5px',
          display: 'block',
          marginBottom: '8px'
        }}>
          Error 404
        </span>

        <h1 style={{
          fontSize: '2.4rem',
          fontWeight: 800,
          marginBottom: '14px',
          letterSpacing: '-0.02em',
          background: 'linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Node Not Found
        </h1>

        <p style={{ color: '#94a3b8', fontSize: '0.96rem', lineHeight: 1.6, marginBottom: '32px' }}>
          The requested coordinate or cluster route does not exist or has been relocated.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#22c55e',
              color: '#020204',
              padding: '10px 22px',
              borderRadius: '9999px',
              fontWeight: 700,
              fontSize: '0.88rem',
              textDecoration: 'none',
              boxShadow: '0 0 20px rgba(34, 197, 94, 0.35)',
              transition: 'all 0.2s'
            }}
          >
            <Home size={16} /> Return to Home
          </Link>

          <Link
            to="/marketplace"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              color: '#cbd5e1',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '10px 20px',
              borderRadius: '9999px',
              fontWeight: 600,
              fontSize: '0.88rem',
              textDecoration: 'none',
              transition: 'all 0.2s'
            }}
          >
            <ArrowLeft size={16} /> Explore Marketplace
          </Link>
        </div>
      </div>
    </div>
  );
};
