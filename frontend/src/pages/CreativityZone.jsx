import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Palette, Plus, Trash2, Heart } from '../components/common/Icons';
import { useNavigate } from 'react-router-dom';
import MiniWorldScene from '../components/3d/MiniWorldScene';
import MascotGuide from '../components/common/MascotGuide';
import { useGame } from '../context/GameContext';
import soundService from '../services/soundService';

const CreativityZone = () => {
  const navigate = useNavigate();
  const { showCelebration } = useGame();

  const [wallColor, setWallColor] = useState('#fed7aa');
  const [decorations, setDecorations] = useState([
    { id: 1, emoji: '🛋️', name: 'Cozy Sofa', x: 20, y: 55 },
    { id: 2, emoji: '🚀', name: 'Toy Rocket', x: 75, y: 30 },
    { id: 3, emoji: '🪴', name: 'Magic Plant', x: 80, y: 65 },
  ]);

  const decorItems = [
    { emoji: '🧸', name: 'Teddy Bear' },
    { emoji: '🎨', name: 'Easel' },
    { emoji: '🛸', name: 'Flying Drone' },
    { emoji: '🌈', name: 'Rainbow Lamp' },
    { emoji: '⭐', name: 'Star Rug' },
    { emoji: '🎂', name: 'Party Cake' },
  ];

  const colors = ['#fed7aa', '#fbcfe8', '#bfdbfe', '#bbf7d0', '#ddd6fe', '#fef08a'];

  const handleAddDecor = (item) => {
    soundService.playPop();
    const newDecor = {
      id: Date.now(),
      emoji: item.emoji,
      name: item.name,
      x: 30 + Math.random() * 40,
      y: 30 + Math.random() * 40,
    };
    setDecorations([...decorations, newDecor]);
  };

  const handleRemoveDecor = (id) => {
    soundService.playPop();
    setDecorations(decorations.filter((d) => d.id !== id));
  };

  const handleSaveMasterpiece = () => {
    showCelebration({
      title: '🎨 Masterpiece Created!',
      message: 'Your creative room studio looks magnificent!',
      coinsEarned: 25,
      starsEarned: 2,
    });
    navigate('/');
  };

  return (
    <div style={{ position: 'relative', minHeight: '85vh', padding: '20px 24px 60px' }}>
      <MiniWorldScene theme="creative" />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '880px', margin: '0 auto' }}>
        {/* Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <button
            onClick={() => {
              soundService.playPop();
              navigate('/');
            }}
            className="btn-fun btn-fun-coral"
            style={{ padding: '10px 18px', fontSize: '1rem' }}
          >
            <ArrowLeft size={20} />
            <span>Island Map</span>
          </button>

          <div className="glass-panel" style={{
            padding: '8px 20px',
            background: 'white',
            borderRadius: '9999px',
            fontWeight: 800,
            fontSize: '1.1rem',
            color: '#db2777',
            border: '2px solid #fbcfe8'
          }}>
            🎨 Creative Sandbox Studio
          </div>
        </div>

        {/* 3D Dream Room Canvas Viewport */}
        <div className="glass-panel" style={{
          background: wallColor,
          borderRadius: '36px',
          padding: '24px',
          border: '4px solid white',
          boxShadow: '0 20px 50px rgba(233, 30, 99, 0.25)',
          minHeight: '380px',
          position: 'relative',
          marginBottom: '24px',
          overflow: 'hidden',
          transition: 'background 0.4s ease'
        }}>
          {/* Room Floor Perspective */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '40%',
            background: 'linear-gradient(180deg, #d97706, #92400e)',
            borderTop: '6px solid #b45309',
            opacity: 0.85
          }} />

          {/* Placed Room Decor Items */}
          {decorations.map((d) => (
            <div
              key={d.id}
              onClick={() => handleRemoveDecor(d.id)}
              className="anim-float"
              style={{
                position: 'absolute',
                left: `${d.x}%`,
                top: `${d.y}%`,
                fontSize: '56px',
                cursor: 'pointer',
                filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.25))',
                transform: 'translate(-50%, -50%)',
              }}
              title="Click to remove"
            >
              {d.emoji}
            </div>
          ))}

          <div style={{
            position: 'absolute',
            top: '16px',
            right: '20px',
            background: 'rgba(255,255,255,0.9)',
            padding: '6px 14px',
            borderRadius: '9999px',
            fontWeight: 700,
            fontSize: '0.85rem',
            color: '#64748b'
          }}>
            💡 Tap any placed item to remove it!
          </div>
        </div>

        {/* Studio Controls */}
        <div className="glass-panel" style={{
          background: 'white',
          borderRadius: '32px',
          padding: '28px',
          border: '3px solid #e2e8f0'
        }}>
          {/* Wall Paint Palette */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontWeight: 800, fontSize: '1.1rem', color: '#1e293b', display: 'block', marginBottom: '10px' }}>
              🖌️ Choose Room Wall Color:
            </label>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {colors.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    soundService.playPop();
                    setWallColor(c);
                  }}
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    backgroundColor: c,
                    border: wallColor === c ? '4px solid #db2777' : '2px solid #cbd5e1',
                    cursor: 'pointer',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Add Decor Items */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ fontWeight: 800, fontSize: '1.1rem', color: '#1e293b', display: 'block', marginBottom: '10px' }}>
              🛋️ Tap to Place Room Accessories:
            </label>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {decorItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleAddDecor(item)}
                  className="btn-fun btn-fun-gold anim-wiggle"
                  style={{ padding: '10px 18px', fontSize: '1rem', borderRadius: '18px' }}
                >
                  <span style={{ fontSize: '24px' }}>{item.emoji}</span>
                  <span>{item.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSaveMasterpiece}
            className="btn-fun btn-fun-mint anim-pulse"
            style={{ width: '100%', padding: '16px', fontSize: '1.3rem', borderRadius: '9999px' }}
          >
            <Heart size={24} />
            <span>Finish My Dream Room! 🌟</span>
          </button>
        </div>
      </div>

      <MascotGuide
        name="Artistic Cat 🐱"
        emoji="🐱"
        message="Paint the walls and arrange cute items to design your cozy adventure bedroom!"
      />
    </div>
  );
};

export default CreativityZone;
