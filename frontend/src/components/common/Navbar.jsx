import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, Trophy, BarChart3, Shield, Volume2, VolumeX, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useGame } from '../../context/GameContext';
import soundService from '../../services/soundService';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { soundMuted, toggleSound } = useGame();
  const location = useLocation();

  const handleNavClick = () => {
    soundService.playPop();
  };

  return (
    <header className="glass-panel" style={{
      margin: '12px 24px',
      padding: '12px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'relative',
      zIndex: 50
    }}>
      {/* Brand Logo */}
      <Link to="/" onClick={handleNavClick} style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        textDecoration: 'none',
        color: '#1e293b'
      }}>
        <div style={{
          width: '46px',
          height: '46px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #ffd166, #ff6b6b)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          boxShadow: '0 4px 12px rgba(255, 107, 107, 0.4)'
        }} className="anim-float">
          ⭐
        </div>
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>
            ADVENTURE LAND
          </h1>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#ff6b6b' }}>
            3D Kids Learning Quest
          </span>
        </div>
      </Link>

      {/* Navigation Links */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <Link
          to="/"
          onClick={handleNavClick}
          className={`btn-fun ${location.pathname === '/' ? 'btn-fun-sky' : 'btn-fun-coral'}`}
          style={{ padding: '10px 18px', fontSize: '1rem' }}
        >
          <Home size={20} />
          <span>Home</span>
        </Link>

        <Link
          to="/shop"
          onClick={handleNavClick}
          className={`btn-fun ${location.pathname === '/shop' ? 'btn-fun-sky' : 'btn-fun-gold'}`}
          style={{ padding: '10px 18px', fontSize: '1rem' }}
        >
          <ShoppingBag size={20} />
          <span>Shop</span>
        </Link>

        <Link
          to="/achievements"
          onClick={handleNavClick}
          className={`btn-fun ${location.pathname === '/achievements' ? 'btn-fun-sky' : 'btn-fun-purple'}`}
          style={{ padding: '10px 18px', fontSize: '1rem' }}
        >
          <Trophy size={20} />
          <span>Trophies</span>
        </Link>

        {/* Parent Portal Link */}
        <Link
          to="/parent"
          onClick={handleNavClick}
          className={`btn-fun ${location.pathname === '/parent' ? 'btn-fun-sky' : 'btn-fun-mint'}`}
          style={{ padding: '10px 18px', fontSize: '1rem' }}
        >
          <BarChart3 size={20} />
          <span>Parents</span>
        </Link>

        {/* Admin Portal Link */}
        {user?.role === 'ROLE_ADMIN' && (
          <Link
            to="/admin"
            onClick={handleNavClick}
            className="btn-fun btn-fun-coral"
            style={{ padding: '10px 18px', fontSize: '1rem' }}
          >
            <Shield size={20} />
            <span>Admin</span>
          </Link>
        )}
      </nav>

      {/* Utility buttons (Sound, Logout) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          onClick={() => {
            toggleSound();
            soundService.playPop();
          }}
          className="btn-fun"
          style={{
            background: soundMuted ? '#cbd5e1' : '#e0f2fe',
            color: soundMuted ? '#64748b' : '#0284c7',
            padding: '10px 14px',
            fontSize: '1rem',
            border: '2px solid #bae6fd',
          }}
          title={soundMuted ? 'Unmute Sounds' : 'Mute Sounds'}
        >
          {soundMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>

        {user && (
          <button
            onClick={() => {
              soundService.playPop();
              logout();
            }}
            className="btn-fun"
            style={{
              background: '#fee2e2',
              color: '#dc2626',
              padding: '10px 14px',
              fontSize: '1rem',
              border: '2px solid #fecaca',
            }}
            title="Log Out"
          >
            <LogOut size={20} />
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
