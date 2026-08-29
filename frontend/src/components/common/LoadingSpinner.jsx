import React from 'react';

const LoadingSpinner = ({ message = 'Loading adventure...', size = 'large' }) => {
  const spinnerSize = size === 'large' ? 64 : size === 'medium' ? 48 : 32;
  const textSize = size === 'large' ? '1.3rem' : size === 'medium' ? '1.1rem' : '0.95rem';

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: size === 'large' ? '60vh' : '200px',
      gap: '20px',
    }}>
      {/* Animated Emoji Spinner */}
      <div
        className="anim-spin"
        style={{
          fontSize: `${spinnerSize}px`,
          lineHeight: 1,
        }}
      >
        🌟
      </div>

      {/* Loading Bar */}
      <div style={{
        width: `${spinnerSize * 2}px`,
        height: '8px',
        background: '#e2e8f0',
        borderRadius: '9999px',
        overflow: 'hidden',
      }}>
        <div
          className="anim-slide-up"
          style={{
            width: '60%',
            height: '100%',
            background: 'linear-gradient(90deg, #ff6b6b, #ffd166, #06d6a0)',
            borderRadius: '9999px',
            animation: 'loadingBar 1.5s ease-in-out infinite',
          }}
        />
      </div>

      {/* Message */}
      <p style={{
        fontSize: textSize,
        fontWeight: 700,
        color: '#475569',
        animation: 'pulseGlow 2s infinite',
      }}>
        {message}
      </p>

      <style>{`
        @keyframes loadingBar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(80%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
