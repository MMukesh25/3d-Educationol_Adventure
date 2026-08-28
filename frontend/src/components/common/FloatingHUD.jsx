import React, { useState } from 'react';
import { Sparkles, Flame, User, Palette } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import soundService from '../../services/soundService';
import AvatarCustomizer from './AvatarCustomizer';

const FloatingHUD = () => {
  const { coins, stars, level, streakDays, avatar } = useGame();
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  const handleOpenCustomizer = () => {
    soundService.playPop();
    setShowAvatarModal(true);
  };

  return (
    <>
      <div style={{
        position: 'fixed',
        top: '90px',
        right: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        zIndex: 40,
        pointerEvents: 'auto'
      }}>
        {/* Coin Pill */}
        <div className="glass-panel anim-wiggle" style={{
          padding: '8px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: 'rgba(255, 255, 255, 0.85)',
          border: '3px solid #ffd166',
          borderRadius: '9999px',
          boxShadow: '0 8px 20px rgba(255, 209, 102, 0.35)'
        }}>
          <span style={{ fontSize: '24px' }}>🪙</span>
          <div>
            <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#b45309' }}>{coins}</span>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#92400e', marginLeft: '4px' }}>Coins</span>
          </div>
        </div>

        {/* Star Pill */}
        <div className="glass-panel anim-wiggle" style={{
          padding: '8px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: 'rgba(255, 255, 255, 0.85)',
          border: '3px solid #60a5fa',
          borderRadius: '9999px',
          boxShadow: '0 8px 20px rgba(96, 165, 250, 0.35)'
        }}>
          <span style={{ fontSize: '24px' }}>⭐</span>
          <div>
            <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1d4ed8' }}>{stars}</span>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1e40af', marginLeft: '4px' }}>Stars</span>
          </div>
        </div>

        {/* Level Badge & Streak */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {/* Level Pill */}
          <div className="glass-panel" style={{
            padding: '8px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'linear-gradient(135deg, #a855f7, #6366f1)',
            color: 'white',
            borderRadius: '9999px',
            border: '2px solid #c084fc',
            flex: 1,
            justifyContent: 'center'
          }}>
            <Sparkles size={16} />
            <span style={{ fontSize: '0.95rem', fontWeight: 800 }}>Lvl {level}</span>
          </div>

          {/* Streak Pill */}
          <div className="glass-panel" style={{
            padding: '8px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'linear-gradient(135deg, #f97316, #ef4444)',
            color: 'white',
            borderRadius: '9999px',
            border: '2px solid #fdba74',
            justifyContent: 'center'
          }}>
            <Flame size={16} />
            <span style={{ fontSize: '0.95rem', fontWeight: 800 }}>{streakDays}d</span>
          </div>
        </div>

        {/* Character Customizer Trigger Button */}
        <button
          onClick={handleOpenCustomizer}
          className="btn-fun btn-fun-coral anim-wiggle"
          style={{
            padding: '10px 16px',
            fontSize: '0.95rem',
            borderRadius: '9999px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <Palette size={18} />
          <span>My Avatar</span>
        </button>
      </div>

      {/* Avatar Customizer Modal */}
      {showAvatarModal && (
        <AvatarCustomizer onClose={() => setShowAvatarModal(false)} />
      )}
    </>
  );
};

export default FloatingHUD;
