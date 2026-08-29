import React, { useState, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import soundService from '../../services/soundService';

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('adventure_theme') === 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark-mode');
      root.style.setProperty('--bg-gradient-sky', 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)');
      root.style.setProperty('--card-glass', 'rgba(30, 41, 59, 0.85)');
      root.style.setProperty('--card-border', 'rgba(100, 116, 139, 0.3)');
    } else {
      root.classList.remove('dark-mode');
      root.style.setProperty('--bg-gradient-sky', 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)');
      root.style.setProperty('--card-glass', 'rgba(255, 255, 255, 0.75)');
      root.style.setProperty('--card-border', 'rgba(255, 255, 255, 0.6)');
    }
    localStorage.setItem('adventure_theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => {
    soundService.playPop();
    setIsDark(!isDark);
  };

  return (
    <button
      onClick={toggleTheme}
      className="btn-fun"
      style={{
        background: isDark
          ? 'linear-gradient(135deg, #1e293b, #334155)'
          : 'linear-gradient(135deg, #fef3c7, #fde68a)',
        color: isDark ? '#fbbf24' : '#92400e',
        padding: '10px 14px',
        fontSize: '1rem',
        border: isDark ? '2px solid #475569' : '2px solid #fcd34d',
        borderRadius: '50%',
        width: '44px',
        height: '44px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {isDark ? '🌙' : '☀️'}
    </button>
  );
};

export default DarkModeToggle;
