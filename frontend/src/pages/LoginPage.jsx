import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Sparkles, Key, User, ArrowRight, Shield, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import soundService from '../services/soundService';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState('leo_explorer');
  const [password, setPassword] = useState('child123');
  const [selectedRole, setSelectedRole] = useState('CHILD');
  const [error, setError] = useState('');

  const demoAccounts = [
    { name: 'Leo The Explorer', user: 'leo_explorer', pass: 'child123', emoji: '🌟', role: 'CHILD', color: '#ff6b6b' },
    { name: 'Sarah (Parent)', user: 'parent_sarah', pass: 'parent123', emoji: '👨‍👩‍👧', role: 'PARENT', color: '#06d6a0' },
    { name: 'Platform Admin', user: 'admin', pass: 'admin123', emoji: '🛡️', role: 'ADMIN', color: '#118ab2' },
  ];

  const handleSelectDemo = (acc) => {
    soundService.playPop();
    setUsername(acc.user);
    setPassword(acc.pass);
    setSelectedRole(acc.role);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    soundService.playPop();
    setError('');

    const res = await login(username, password);
    if (res.success) {
      soundService.playFanfare();
      if (res.data.role === 'ROLE_PARENT') {
        navigate('/parent');
      } else if (res.data.role === 'ROLE_ADMIN') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } else {
      soundService.playTryAgain();
      setError('Invalid username or password');
    }
  };

  return (
    <div style={{
      minHeight: '85vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px 24px 60px'
    }}>
      <div className="glass-panel anim-float" style={{
        background: 'white',
        borderRadius: '36px',
        maxWidth: '520px',
        width: '100%',
        padding: '40px',
        border: '4px solid #ffd166',
        boxShadow: '0 25px 60px rgba(0,0,0,0.12)',
        textAlign: 'center'
      }}>
        {/* Animated Brand Icon */}
        <div style={{
          fontSize: '56px',
          width: '84px',
          height: '84px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #ffd166, #ff6b6b)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px',
          boxShadow: '0 10px 25px rgba(255, 107, 107, 0.35)'
        }} className="anim-pulse">
          🌟
        </div>

        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
          Welcome to Adventure!
        </h2>
        <p style={{ color: '#64748b', fontWeight: 600, fontSize: '1.05rem', marginBottom: '24px' }}>
          Choose a character or enter your secret login:
        </p>

        {/* Quick Demo Character Badges */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '24px' }}>
          {demoAccounts.map((acc) => (
            <div
              key={acc.user}
              onClick={() => handleSelectDemo(acc)}
              className={`option-card ${username === acc.user ? 'selected' : ''}`}
              style={{
                padding: '12px 8px',
                flexDirection: 'column',
                borderRadius: '18px',
                borderWidth: '2px',
                fontSize: '0.85rem'
              }}
            >
              <span style={{ fontSize: '32px' }}>{acc.emoji}</span>
              <span style={{ fontWeight: 800, marginTop: '4px' }}>{acc.name}</span>
            </div>
          ))}
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
          <div>
            <label style={{ fontSize: '0.9rem', fontWeight: 800, color: '#334155', display: 'block', marginBottom: '6px' }}>
              Username / Explorer Name:
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: '16px',
                  border: '2px solid #cbd5e1',
                  fontFamily: 'inherit',
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.9rem', fontWeight: 800, color: '#334155', display: 'block', marginBottom: '6px' }}>
              Secret Password:
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: '16px',
                  border: '2px solid #cbd5e1',
                  fontFamily: 'inherit',
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {error && (
            <div style={{ color: '#dc2626', fontWeight: 700, fontSize: '0.9rem', textAlign: 'center' }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn-fun btn-fun-coral anim-pulse"
            style={{ width: '100%', padding: '16px', fontSize: '1.25rem', marginTop: '10px', borderRadius: '9999px' }}
          >
            <span>Let's Play! 🚀</span>
            <ArrowRight size={22} />
          </button>
        </form>

        <div style={{ marginTop: '20px', fontSize: '0.95rem', fontWeight: 600, color: '#64748b' }}>
          New adventurer?{' '}
          <Link to="/signup" style={{ color: '#ff6b6b', fontWeight: 800, textDecoration: 'none' }}>
            Create Free Account!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
