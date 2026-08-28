import React from 'react';
import soundService from '../../services/soundService';

const MascotGuide = ({ message, emoji = '🐶', name = 'Professor Paws' }) => {
  const handleClick = () => {
    soundService.playPop();
  };

  return (
    <div
      onClick={handleClick}
      className="glass-panel anim-float"
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        padding: '12px 20px',
        background: 'rgba(255, 255, 255, 0.92)',
        border: '3px solid #38bdf8',
        borderRadius: '24px',
        boxShadow: '0 10px 25px rgba(56, 189, 248, 0.25)',
        maxWidth: '380px',
        zIndex: 40,
        cursor: 'pointer',
      }}
    >
      <div style={{
        fontSize: '40px',
        background: 'linear-gradient(135deg, #ffd166, #ff9e9e)',
        width: '54px',
        height: '54px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
      }}>
        {emoji}
      </div>
      <div>
        <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase' }}>
          {name}
        </div>
        <div style={{ fontSize: '1rem', fontWeight: 700, color: '#1e293b', lineHeight: 1.2 }}>
          {message}
        </div>
      </div>
    </div>
  );
};

export default MascotGuide;
