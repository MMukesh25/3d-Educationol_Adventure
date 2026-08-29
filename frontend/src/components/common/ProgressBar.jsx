import React from 'react';

const ProgressBar = ({
  value = 0,
  max = 100,
  color = '#06d6a0',
  label = '',
  showPercentage = true,
  height = 14,
  animated = true,
}) => {
  const percentage = Math.min(Math.round((value / max) * 100), 100);

  return (
    <div style={{ width: '100%' }}>
      {/* Label Row */}
      {(label || showPercentage) && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '6px',
          alignItems: 'center',
        }}>
          {label && (
            <span style={{
              fontSize: '0.9rem',
              fontWeight: 700,
              color: '#1e293b',
            }}>
              {label}
            </span>
          )}
          {showPercentage && (
            <span style={{
              fontSize: '0.85rem',
              fontWeight: 800,
              color: color,
            }}>
              {percentage}%
            </span>
          )}
        </div>
      )}

      {/* Track */}
      <div style={{
        width: '100%',
        height: `${height}px`,
        background: '#e2e8f0',
        borderRadius: '9999px',
        overflow: 'hidden',
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)',
      }}>
        {/* Fill */}
        <div style={{
          width: `${percentage}%`,
          height: '100%',
          background: `linear-gradient(90deg, ${color}, ${color}dd)`,
          borderRadius: '9999px',
          transition: animated ? 'width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none',
          boxShadow: `0 2px 8px ${color}44`,
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Shine effect */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '50%',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 100%)',
            borderRadius: '9999px',
          }} />
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
