import React from 'react';
import { Sparkles, Trophy, ArrowRight } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import soundService from '../../services/soundService';

const CelebrationModal = () => {
  const { celebration, closeCelebration } = useGame();

  if (!celebration.isOpen) return null;

  const handleContinue = () => {
    soundService.playPop();
    closeCelebration();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(15, 23, 42, 0.65)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: '20px'
    }}>
      <div className="glass-panel anim-float" style={{
        background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(254, 240, 138, 0.9))',
        border: '4px solid #ffd166',
        borderRadius: '32px',
        padding: '36px',
        maxWidth: '480px',
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.3)',
      }}>
        {/* Animated Celebration Icon */}
        <div style={{
          fontSize: '72px',
          marginBottom: '10px',
        }} className="anim-pulse">
          {celebration.leveledUp ? '👑' : '🎉'}
        </div>

        {/* Title */}
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 800,
          color: '#0f172a',
          marginBottom: '8px',
        }}>
          {celebration.title}
        </h2>

        {/* Message */}
        <p style={{
          fontSize: '1.25rem',
          fontWeight: 600,
          color: '#475569',
          marginBottom: '24px',
        }}>
          {celebration.message}
        </p>

        {/* Level Up Banner */}
        {celebration.leveledUp && (
          <div style={{
            background: 'linear-gradient(135deg, #a855f7, #6366f1)',
            color: 'white',
            padding: '12px 20px',
            borderRadius: '16px',
            fontWeight: 800,
            fontSize: '1.2rem',
            marginBottom: '20px',
            boxShadow: '0 8px 20px rgba(168, 85, 247, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}>
            <Sparkles size={24} />
            <span>LEVEL UP! You are now Level!</span>
          </div>
        )}

        {/* Rewards Earned Box */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          marginBottom: '28px',
        }}>
          {celebration.coinsEarned > 0 && (
            <div style={{
              background: 'white',
              border: '3px solid #ffd166',
              borderRadius: '20px',
              padding: '14px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 8px 16px rgba(255, 209, 102, 0.3)'
            }}>
              <span style={{ fontSize: '32px' }}>🪙</span>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#b45309' }}>
                  +{celebration.coinsEarned}
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#92400e' }}>
                  Coins
                </div>
              </div>
            </div>
          )}

          {celebration.starsEarned > 0 && (
            <div style={{
              background: 'white',
              border: '3px solid #60a5fa',
              borderRadius: '20px',
              padding: '14px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 8px 16px rgba(96, 165, 250, 0.3)'
            }}>
              <span style={{ fontSize: '32px' }}>⭐</span>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1d4ed8' }}>
                  +{celebration.starsEarned}
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e40af' }}>
                  Stars
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          className="btn-fun btn-fun-coral anim-pulse"
          style={{
            width: '100%',
            padding: '18px',
            fontSize: '1.3rem',
            borderRadius: '9999px',
          }}
        >
          <span>Keep Exploring!</span>
          <ArrowRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default CelebrationModal;
