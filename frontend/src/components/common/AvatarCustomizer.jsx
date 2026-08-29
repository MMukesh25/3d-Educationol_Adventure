import React, { useState } from 'react';
import { X, Check, Sparkles } from './Icons';
import { useGame } from '../../context/GameContext';
import soundService from '../../services/soundService';

const AvatarCustomizer = ({ onClose }) => {
  const { avatar, updateAvatarSettings } = useGame();
  const [currentAvatar, setCurrentAvatar] = useState({ ...avatar });
  const [activeTab, setActiveTab] = useState('hats');

  const hats = [
    { id: 'none', name: 'No Hat', emoji: '🚫' },
    { id: 'royal_crown', name: 'Royal Crown', emoji: '👑' },
    { id: 'wizard_hat', name: 'Wizard Star Hat', emoji: '🧙‍♂️' },
    { id: 'detective_cap', name: 'Detective Cap', emoji: '🕵️' },
    { id: 'party_hat', name: 'Party Cone', emoji: '🥳' },
    { id: 'space_helmet', name: 'Astro Helmet', emoji: '👨‍🚀' },
  ];

  const pets = [
    { id: 'puppy', name: 'Playful Puppy', emoji: '🐶' },
    { id: 'kitten', name: 'Cute Kitten', emoji: '🐱' },
    { id: 'baby_dragon', name: 'Baby Dragon', emoji: '🐉' },
    { id: 'fluffy_bunny', name: 'Fluffy Bunny', emoji: '🐰' },
    { id: 'robot_drone', name: 'Robo Drone', emoji: '🛸' },
  ];

  const skinColors = ['#ffcc80', '#ffe0b2', '#d7ccc8', '#a1887f', '#8d6e63', '#ffab91'];
  const hairColors = ['#3e2723', '#5d4037', '#e65100', '#ffd54f', '#d50000', '#29b6f6'];
  const outfitColors = ['#29b6f6', '#ff5722', '#4caf50', '#9c27b0', '#e91e63', '#ffd600'];

  const handleSave = () => {
    soundService.playFanfare();
    updateAvatarSettings(currentAvatar);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(15, 23, 42, 0.7)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 110,
      padding: '20px'
    }}>
      <div className="glass-panel" style={{
        background: 'white',
        borderRadius: '32px',
        maxWidth: '680px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '30px',
        position: 'relative',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.25)'
      }}>
        {/* Close Button */}
        <button
          onClick={() => {
            soundService.playPop();
            onClose();
          }}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: '#fee2e2',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#ef4444'
          }}
        >
          <X size={24} />
        </button>

        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>
            🎨 Character Wardrobe
          </h2>
          <p style={{ color: '#64748b', fontWeight: 600 }}>
            Style your friendly 3D explorer buddy!
          </p>
        </div>

        {/* Avatar Visual Preview Box */}
        <div style={{
          background: 'linear-gradient(135deg, #e0f2fe, #f0fdf4)',
          borderRadius: '24px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '24px',
          border: '3px dashed #38bdf8'
        }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            {/* Hat Overlay */}
            <div style={{
              fontSize: '44px',
              position: 'absolute',
              top: '-32px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 2,
            }}>
              {hats.find(h => h.id === currentAvatar.hat)?.emoji !== '🚫' &&
                hats.find(h => h.id === currentAvatar.hat)?.emoji}
            </div>

            {/* Avatar Head & Body */}
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              backgroundColor: currentAvatar.skinColor,
              border: `4px solid ${currentAvatar.hairColor}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px',
              boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)',
              position: 'relative',
            }}>
              😄
            </div>

            {/* Pet Companion next to avatar */}
            <div style={{
              position: 'absolute',
              bottom: '-10px',
              right: '-40px',
              fontSize: '40px',
            }} className="anim-float">
              {pets.find(p => p.id === currentAvatar.pet)?.emoji}
            </div>
          </div>

          <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
            <span style={{
              background: currentAvatar.outfitColor,
              color: 'white',
              padding: '4px 14px',
              borderRadius: '9999px',
              fontWeight: 800,
              fontSize: '0.85rem'
            }}>
              Shirt Color
            </span>
          </div>
        </div>

        {/* Tab Selection */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', justifyContent: 'center' }}>
          {['hats', 'pets', 'colors'].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                soundService.playPop();
                setActiveTab(tab);
              }}
              className={`btn-fun ${activeTab === tab ? 'btn-fun-sky' : 'btn-fun-coral'}`}
              style={{ padding: '8px 18px', fontSize: '0.95rem' }}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Tab Content: Hats */}
        {activeTab === 'hats' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
            {hats.map((hat) => (
              <div
                key={hat.id}
                onClick={() => {
                  soundService.playPop();
                  setCurrentAvatar({ ...currentAvatar, hat: hat.id });
                }}
                className={`option-card ${currentAvatar.hat === hat.id ? 'selected' : ''}`}
                style={{ padding: '12px', flexDirection: 'column', fontSize: '1rem' }}
              >
                <span style={{ fontSize: '32px' }}>{hat.emoji}</span>
                <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>{hat.name}</span>
              </div>
            ))}
          </div>
        )}

        {/* Tab Content: Pets */}
        {activeTab === 'pets' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
            {pets.map((pet) => (
              <div
                key={pet.id}
                onClick={() => {
                  soundService.playPop();
                  setCurrentAvatar({ ...currentAvatar, pet: pet.id });
                }}
                className={`option-card ${currentAvatar.pet === pet.id ? 'selected' : ''}`}
                style={{ padding: '12px', flexDirection: 'column', fontSize: '1rem' }}
              >
                <span style={{ fontSize: '32px' }}>{pet.emoji}</span>
                <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>{pet.name}</span>
              </div>
            ))}
          </div>
        )}

        {/* Tab Content: Colors */}
        {activeTab === 'colors' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
            <div>
              <label style={{ fontWeight: 700, display: 'block', marginBottom: '8px' }}>Skin Tone:</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                {skinColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      soundService.playPop();
                      setCurrentAvatar({ ...currentAvatar, skinColor: color });
                    }}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: color,
                      border: currentAvatar.skinColor === color ? '4px solid #0284c7' : '2px solid #cbd5e1',
                      cursor: 'pointer'
                    }}
                  />
                ))}
              </div>
            </div>

            <div>
              <label style={{ fontWeight: 700, display: 'block', marginBottom: '8px' }}>Outfit Color:</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                {outfitColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      soundService.playPop();
                      setCurrentAvatar({ ...currentAvatar, outfitColor: color });
                    }}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: color,
                      border: currentAvatar.outfitColor === color ? '4px solid #0284c7' : '2px solid #cbd5e1',
                      cursor: 'pointer'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="btn-fun btn-fun-mint anim-pulse"
          style={{ width: '100%', padding: '16px', fontSize: '1.2rem' }}
        >
          <Check size={24} />
          <span>Save My Style!</span>
        </button>
      </div>
    </div>
  );
};

export default AvatarCustomizer;
