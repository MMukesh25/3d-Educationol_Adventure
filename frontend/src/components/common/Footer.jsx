import React from 'react';
import { Heart, Compass } from './Icons';

const Footer = () => {
  return (
    <footer style={{
      background: 'linear-gradient(135deg, rgba(255,255,255,0.85), rgba(224,242,254,0.85))',
      backdropFilter: 'blur(12px)',
      borderTop: '3px solid rgba(255, 255, 255, 0.6)',
      padding: '28px 24px',
      marginTop: '40px',
      textAlign: 'center',
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '14px'
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '28px' }}>⭐</span>
          <span style={{
            fontSize: '1.2rem',
            fontWeight: 800,
            color: '#0f172a',
          }}>
            Adventure Land
          </span>
          <Compass size={20} color="#ff6b6b" />
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="/" style={{ color: '#0284c7', fontWeight: 700, textDecoration: 'none', fontSize: '0.95rem' }}>
            🏠 Home
          </a>
          <a href="/shop" style={{ color: '#0284c7', fontWeight: 700, textDecoration: 'none', fontSize: '0.95rem' }}>
            🛍️ Shop
          </a>
          <a href="/achievements" style={{ color: '#0284c7', fontWeight: 700, textDecoration: 'none', fontSize: '0.95rem' }}>
            🏆 Trophies
          </a>
          <a href="/parent" style={{ color: '#0284c7', fontWeight: 700, textDecoration: 'none', fontSize: '0.95rem' }}>
            👨‍👩‍👧 Parents
          </a>
        </div>

        {/* Copyright */}
        <div style={{
          fontSize: '0.85rem',
          fontWeight: 600,
          color: '#64748b',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <span>Made with</span>
          <Heart size={14} color="#ef4444" />
          <span>for young explorers everywhere</span>
        </div>

        <div style={{
          fontSize: '0.75rem',
          fontWeight: 600,
          color: '#94a3b8',
        }}>
          © 2026 Adventure Land — 3D Educational Learning Platform
        </div>
      </div>
    </footer>
  );
};

export default Footer;
