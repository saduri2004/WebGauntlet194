import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [phishingCount, setPhishingCount] = useState<number>(() => {
    const savedCount = localStorage.getItem('phishingAttempts');
    return savedCount ? parseInt(savedCount, 10) : 0;
  });

  useEffect(() => {
    const newCount = phishingCount + 1;
    setPhishingCount(newCount);
    localStorage.setItem('phishingAttempts', newCount.toString());
  }, []);

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="pii-warning" style={{
      padding: '2rem',
      maxWidth: '800px',
      margin: '2rem auto',
      backgroundColor: '#1a1a1a',
      color: '#fff',
      border: '3px solid #ff0000',
      borderRadius: '8px',
      boxShadow: '0 0 20px rgba(255, 0, 0, 0.5)',
      textAlign: 'center'
    }}>
      <h1 style={{ 
        color: '#ff0000', 
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem'
      }}>
        ⚠️ PHISHING ATTEMPT DETECTED ⚠️
      </h1>
      
      <div style={{ 
        backgroundColor: '#2a2a2a',
        padding: '1.5rem',
        borderRadius: '4px',
        marginBottom: '1.5rem',
        border: '1px solid #ff0000'
      }}>
        <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
          You were redirected from a malicious phishing attempt that tried to steal your personal information:
        </p>
        <ul style={{ 
          textAlign: 'left', 
          listStyle: 'none',
          padding: '0',
          margin: '0'
        }}>
          <li style={{ 
            padding: '0.5rem',
            marginBottom: '0.5rem',
            backgroundColor: '#3a3a3a',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            🎣 Fake identity verification popup
          </li>
          <li style={{ 
            padding: '0.5rem',
            marginBottom: '0.5rem',
            backgroundColor: '#3a3a3a',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            ⚠️ Attempted to collect sensitive personal data
          </li>
          <li style={{ 
            padding: '0.5rem',
            marginBottom: '0.5rem',
            backgroundColor: '#3a3a3a',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            🔗 Suspicious external redirect
          </li>
        </ul>
      </div>

      <p style={{ 
        fontSize: '1.1rem',
        color: '#ff6b6b',
        marginBottom: '1.5rem'
      }}>
        This is a common phishing tactic used to steal your identity.
        Never enter personal information in unexpected popups or redirects!
      </p>

      <button 
        onClick={handleGoBack}
        style={{
          backgroundColor: '#ff0000',
          color: 'white',
          border: 'none',
          padding: '1rem 2rem',
          fontSize: '1.1rem',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '1.5rem',
          fontWeight: 'bold',
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: '#cc0000',
            transform: 'scale(1.05)'
          }
        }}
      >
        ← Return to Safety
      </button>

      <div style={{ 
        color: '#ff6b6b',
        fontSize: '0.9rem',
        padding: '1rem',
        backgroundColor: '#2a2a2a',
        borderRadius: '4px',
        display: 'inline-block'
      }}>
        Phishing attempts blocked: {phishingCount} time{phishingCount !== 1 ? 's' : ''}
      </div>
    </div>
  );
}

export default App;
