import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Compass, CheckCircle2, ArrowRight } from '../components/common/Icons';
import AdventureWorld3D from '../components/3d/AdventureWorld3D';
import MascotGuide from '../components/common/MascotGuide';
import { useGame } from '../context/GameContext';
import { useAuth } from '../context/AuthContext';
import soundService from '../services/soundService';
import gameService from '../services/gameService';

const AdventureHome = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { streakDays } = useGame();
  const [dailyChallenges, setDailyChallenges] = useState([]);

  useEffect(() => {
    const loadChallenges = async () => {
      try {
        const data = await gameService.getDailyChallenges();
        setDailyChallenges(data);
      } catch (e) {
        // Fallback default quests
        setDailyChallenges([
          { id: 1, title: 'Count the Apple Orchard', description: 'Complete 1 Math quest!', iconEmoji: '🍎', rewardCoins: 25, rewardStars: 1 },
          { id: 2, title: 'Detective Lock Picker', description: 'Solve 1 clue mystery!', iconEmoji: '🗝️', rewardCoins: 25, rewardStars: 1 },
          { id: 3, title: 'Robo Navigator', description: 'Guide Robo-Buddy to the star!', iconEmoji: '🤖', rewardCoins: 30, rewardStars: 2 },
        ]);
      }
    };
    loadChallenges();
  }, []);

  const worlds = [
    { title: 'Math Island', code: 'MATH_ISLAND', path: '/math', emoji: '🧮', desc: 'Counting & addition fun!', bg: 'linear-gradient(135deg, #ff7043, #ffab91)', border: '#ff5722' },
    { title: 'Mystery House', code: 'MYSTERY_HOUSE', path: '/mystery', emoji: '🔍', desc: 'Clue hunts & keys!', bg: 'linear-gradient(135deg, #ab47bc, #ce93d8)', border: '#9c27b0' },
    { title: 'Coding Lab', code: 'CODING_LAB', path: '/coding', emoji: '💻', desc: 'Program Robo-Buddy!', bg: 'linear-gradient(135deg, #26c6da, #80deea)', border: '#00bcd4' },
    { title: 'Brain Forest', code: 'BRAIN_FOREST', path: '/brain', emoji: '🧠', desc: 'Memory card matching!', bg: 'linear-gradient(135deg, #66bb6a, #a5d6a7)', border: '#4caf50' },
    { title: 'Puzzle Castle', code: 'PUZZLE_CASTLE', path: '/puzzle', emoji: '🧩', desc: 'Shapes & castle bridges!', bg: 'linear-gradient(135deg, #ffa726, #ffcc80)', border: '#ff9800' },
    { title: 'Creativity Zone', code: 'CREATIVITY_ZONE', path: '/creative', emoji: '🎨', desc: 'Build & decorate rooms!', bg: 'linear-gradient(135deg, #ec407a, #f48fb1)', border: '#e91e63' },
  ];

  const handleWorldSelect = (path) => {
    soundService.playPop();
    navigate(path);
  };

  return (
    <div style={{ padding: '0 24px 60px', position: 'relative' }}>
      {/* Top Welcome Banner */}
      <div className="glass-panel" style={{
        padding: '24px 32px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(224,242,254,0.9))'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            fontSize: '44px',
            background: '#fef08a',
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 16px rgba(254,240,138,0.5)'
          }} className="anim-float">
            🌟
          </div>
          <div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>
              Welcome back, {user?.displayName || 'Adventurer'}!
            </h2>
            <p style={{ fontSize: '1.05rem', fontWeight: 600, color: '#475569' }}>
              Spin the 3D world or click a portal below to start your learning quest!
            </p>
          </div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #f97316, #ef4444)',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '9999px',
          fontWeight: 800,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 6px 15px rgba(249, 115, 22, 0.35)'
        }}>
          <span>🔥 {streakDays}-Day Adventure Streak!</span>
        </div>
      </div>

      {/* Main 3D Floating Adventure Hub */}
      <div className="glass-panel" style={{
        height: '540px',
        position: 'relative',
        marginBottom: '32px',
        overflow: 'hidden',
        border: '3px solid rgba(255,255,255,0.8)'
      }}>
        <div style={{
          position: 'absolute',
          top: '16px',
          left: '20px',
          zIndex: 10,
          background: 'rgba(255,255,255,0.85)',
          padding: '8px 16px',
          borderRadius: '9999px',
          fontWeight: 700,
          fontSize: '0.9rem',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          color: '#0369a1'
        }}>
          <Compass size={18} />
          <span>Click & Drag to rotate 3D Island • Click any portal to jump in!</span>
        </div>

        <AdventureWorld3D />
      </div>

      {/* Daily Quest Board */}
      <div className="glass-panel" style={{
        padding: '24px 32px',
        marginBottom: '32px',
        background: 'rgba(255,255,255,0.88)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <span style={{ fontSize: '28px' }}>🎯</span>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>
            Daily Quest Board
          </h3>
          <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#059669', background: '#d1fae5', padding: '4px 10px', borderRadius: '9999px' }}>
            Bonus Rewards
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {dailyChallenges.map((quest) => (
            <div
              key={quest.id}
              className="glass-panel anim-wiggle"
              style={{
                padding: '16px 20px',
                background: 'white',
                border: '2px solid #e2e8f0',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '32px' }}>{quest.iconEmoji}</span>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e293b' }}>
                    {quest.title}
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>
                    {quest.description}
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, color: '#b45309', background: '#fef3c7', padding: '6px 12px', borderRadius: '14px' }}>
                <span>🪙 +{quest.rewardCoins}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fast Portal Selection Cards */}
      <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '18px' }}>
        🌍 Choose Your Adventure Zone
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {worlds.map((w) => (
          <div
            key={w.code}
            onClick={() => handleWorldSelect(w.path)}
            className="glass-panel anim-wiggle"
            style={{
              padding: '24px',
              background: w.bg,
              border: `3px solid ${w.border}`,
              borderRadius: '28px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '160px',
              color: 'white',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '42px' }}>{w.emoji}</span>
              <span className="btn-fun" style={{
                background: 'rgba(255,255,255,0.3)',
                color: 'white',
                padding: '6px 14px',
                fontSize: '0.85rem',
                border: 'none'
              }}>
                Enter 🚀
              </span>
            </div>

            <div>
              <h4 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '4px' }}>
                {w.title}
              </h4>
              <p style={{ fontSize: '0.95rem', fontWeight: 600, opacity: 0.95 }}>
                {w.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Mascot Guide */}
      <MascotGuide message="Welcome to Adventure Land! Click any world portal to begin playing!" />
    </div>
  );
};

export default AdventureHome;
