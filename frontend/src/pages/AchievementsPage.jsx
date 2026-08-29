import React, { useState, useEffect } from 'react';
import { Trophy, Star, Sparkles, CheckCircle2, Lock } from '../components/common/Icons';
import soundService from '../services/soundService';
import gameService from '../services/gameService';

const AchievementsPage = () => {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const loadAchievements = async () => {
      try {
        const data = await gameService.getAchievements();
        if (data && data.length > 0) {
          setAchievements(data);
        } else {
          loadFallback();
        }
      } catch (e) {
        loadFallback();
      }
    };
    loadAchievements();
  }, []);

  const loadFallback = () => {
    setAchievements([
      { id: 1, code: 'FIRST_ADVENTURE', title: 'First Adventure', description: 'Completed your very first learning quest!', iconEmoji: '🏆', coinBonus: 30, starBonus: 2, unlocked: true },
      { id: 2, code: 'MATH_STAR', title: 'Math Superstar', description: 'Solved 2 exciting Mathematics challenges!', iconEmoji: '🧮', coinBonus: 40, starBonus: 3, unlocked: true },
      { id: 3, code: 'SUPER_DETECTIVE', title: 'Super Detective', description: 'Unraveled 2 secret mysteries with clues!', iconEmoji: '🔍', coinBonus: 40, starBonus: 3, unlocked: false },
      { id: 4, code: 'ROBOT_MASTER', title: 'Robot Master', description: 'Guided Robo-Buddy through programming lab puzzles!', iconEmoji: '🤖', coinBonus: 50, starBonus: 3, unlocked: false },
      { id: 5, code: 'COIN_COLLECTOR_100', title: 'Treasure Hoarder', description: 'Saved up 100 shiny gold coins in your purse!', iconEmoji: '💰', coinBonus: 50, starBonus: 5, unlocked: true },
      { id: 6, code: 'STREAK_5', title: '5-Day Adventure Streak', description: 'Explored the adventure world 5 days in a row!', iconEmoji: '🔥', coinBonus: 100, starBonus: 10, unlocked: false },
    ]);
  };

  return (
    <div style={{ padding: '20px 24px 80px', maxWidth: '960px', margin: '0 auto' }}>
      {/* Header Banner */}
      <div className="glass-panel" style={{
        padding: '30px',
        borderRadius: '32px',
        marginBottom: '32px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        background: 'linear-gradient(135deg, #ede9fe, #ddd6fe)'
      }}>
        <div style={{
          fontSize: '48px',
          background: 'white',
          width: '76px',
          height: '76px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 20px rgba(124, 58, 237, 0.3)'
        }} className="anim-float">
          🏆
        </div>
        <div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>
            Trophy Hall & Badges
          </h2>
          <p style={{ fontSize: '1.1rem', fontWeight: 600, color: '#5b21b6' }}>
            Complete quests and solve puzzles to fill your royal trophy cabinet!
          </p>
        </div>
      </div>

      {/* Badges Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {achievements.map((ach) => (
          <div
            key={ach.id}
            className={`glass-panel anim-wiggle ${ach.unlocked ? 'anim-pulse' : ''}`}
            style={{
              padding: '24px',
              background: ach.unlocked ? 'white' : 'rgba(241, 245, 249, 0.85)',
              borderRadius: '28px',
              border: ach.unlocked ? '3px solid #8b5cf6' : '2px dashed #cbd5e1',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: ach.unlocked ? '0 12px 30px rgba(139, 92, 246, 0.2)' : 'none',
              opacity: ach.unlocked ? 1 : 0.75
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <span style={{ fontSize: '48px', filter: ach.unlocked ? 'none' : 'grayscale(1)' }}>
                {ach.iconEmoji}
              </span>
              {ach.unlocked ? (
                <span style={{
                  background: '#dcfce7',
                  color: '#15803d',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <CheckCircle2 size={16} /> Unlocked
                </span>
              ) : (
                <span style={{
                  background: '#f1f5f9',
                  color: '#64748b',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <Lock size={16} /> Locked
                </span>
              )}
            </div>

            <div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e293b', marginBottom: '6px' }}>
                {ach.title}
              </h4>
              <p style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 600, marginBottom: '16px' }}>
                {ach.description}
              </p>
            </div>

            <div style={{
              display: 'flex',
              gap: '10px',
              background: '#f8fafc',
              padding: '10px 14px',
              borderRadius: '16px',
              fontWeight: 800,
              fontSize: '0.9rem',
              justifyContent: 'space-around',
              color: '#475569'
            }}>
              <span>🪙 +{ach.coinBonus} Coins</span>
              <span>⭐ +{ach.starBonus} Stars</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsPage;
