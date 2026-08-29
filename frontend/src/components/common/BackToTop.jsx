import React, { useState, useEffect } from 'react';
import soundService from '../../services/soundService';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    soundService.playPop();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="anim-bounce-in"
      style={{
        position: 'fixed',
        bottom: '100px',
        right: '24px',
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #ff6b6b, #ff5252)',
        color: 'white',
        border: '3px solid #ff9e9e',
        fontSize: '24px',
        cursor: 'pointer',
        boxShadow: '0 8px 24px rgba(255, 82, 82, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 35,
        transition: 'all 0.3s ease',
      }}
      title="Back to top"
    >
      ⬆️
    </button>
  );
};

export default BackToTop;
