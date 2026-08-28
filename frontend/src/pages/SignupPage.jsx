import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Sparkles, ArrowRight, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import soundService from '../services/soundService';

const SignupPage = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('ROLE_CHILD');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    soundService.playPop();
    setError('');

    const res = await signup({
      username,
      email,
      password,
      role,
      displayName: displayName || username,
    });

    if (res.success) {
      soundService.playFanfare();
      if (role === 'ROLE_PARENT') {
        navigate('/parent');
      } else {
        navigate('/');
      }
    } else {
      soundService.playTryAgain();
      setError('Registration failed. Please verify your details.');
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
        maxWidth: '540px',
        width: '100%',
        padding: '40px',
        border: '4px solid #38bdf8',
        boxShadow: '0 25px 60px rgba(0,0,0,0.12)',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '56px',
          width: '84px',
          height: '84px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #38bdf8, #818cf8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px',
          boxShadow: '0 10px 25px rgba(56, 189, 248, 0.35)'
        }} className="anim-pulse">
          🚀
        </div>

        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
          Create Your Adventure Account
        </h2>
        <p style={{ color: '#64748b', fontWeight: 600, fontSize: '1.05rem', marginBottom: '24px' }}>
          Choose your explorer role and join the fun!
        </p>

        {/* Role Selector Tabs */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
          {[
            { id: 'ROLE_CHILD', label: '⭐ Child Explorer', emoji: '👦' },
            { id: 'ROLE_PARENT', label: '👨‍👩‍👧 Parent Monitor', emoji: '👩' },
          ].map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => {
                soundService.playPop();
                setRole(r.id);
              }}
              className={`btn-fun ${role === r.id ? 'btn-fun-sky' : 'btn-fun-coral'}`}
              style={{ flex: 1, padding: '12px', fontSize: '0.95rem' }}
            >
              <span>{r.emoji}</span>
              <span>{r.label}</span>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px', textAlign: 'left' }}>
          <div>
            <label style={{ fontSize: '0.9rem', fontWeight: 800, color: '#334155', display: 'block', marginBottom: '6px' }}>
              Username:
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. star_explorer"
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '16px',
                border: '2px solid #cbd5e1',
                fontFamily: 'inherit',
                fontSize: '1rem',
                fontWeight: 600,
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.9rem', fontWeight: 800, color: '#334155', display: 'block', marginBottom: '6px' }}>
              Display Name (What should friends call you?):
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="e.g. Captain Sparkles"
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '16px',
                border: '2px solid #cbd5e1',
                fontFamily: 'inherit',
                fontSize: '1rem',
                fontWeight: 600,
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.9rem', fontWeight: 800, color: '#334155', display: 'block', marginBottom: '6px' }}>
              Email Address:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="explorer@adventure.com"
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '16px',
                border: '2px solid #cbd5e1',
                fontFamily: 'inherit',
                fontSize: '1rem',
                fontWeight: 600,
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.9rem', fontWeight: 800, color: '#334155', display: 'block', marginBottom: '6px' }}>
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '16px',
                border: '2px solid #cbd5e1',
                fontFamily: 'inherit',
                fontSize: '1rem',
                fontWeight: 600,
                outline: 'none'
              }}
            />
          </div>

          {error && (
            <div style={{ color: '#dc2626', fontWeight: 700, fontSize: '0.9rem', textAlign: 'center' }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn-fun btn-fun-mint anim-pulse"
            style={{ width: '100%', padding: '16px', fontSize: '1.25rem', marginTop: '10px', borderRadius: '9999px' }}
          >
            <span>Create My Account! ✨</span>
            <ArrowRight size={22} />
          </button>
        </form>

        <div style={{ marginTop: '20px', fontSize: '0.95rem', fontWeight: 600, color: '#64748b' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#0284c7', fontWeight: 800, textDecoration: 'none' }}>
            Log In Here!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
