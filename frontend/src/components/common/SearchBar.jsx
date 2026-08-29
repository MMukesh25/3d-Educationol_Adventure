import React, { useState } from 'react';
import { Search } from './Icons';
import soundService from '../../services/soundService';

const SearchBar = ({ onSearch, placeholder = 'Search adventures...' }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (onSearch) onSearch(value);
  };

  const handleFocus = () => {
    soundService.playPop();
    setIsFocused(true);
  };

  const handleClear = () => {
    soundService.playPop();
    setQuery('');
    if (onSearch) onSearch('');
  };

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      maxWidth: '480px',
    }}>
      {/* Search Icon */}
      <div style={{
        position: 'absolute',
        left: '16px',
        top: '50%',
        transform: 'translateY(-50%)',
        color: isFocused ? '#0284c7' : '#94a3b8',
        transition: 'color 0.2s',
        pointerEvents: 'none',
      }}>
        <Search size={20} />
      </div>

      {/* Input */}
      <input
        type="text"
        value={query}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '14px 44px 14px 48px',
          borderRadius: '9999px',
          border: isFocused ? '3px solid #38bdf8' : '2px solid #e2e8f0',
          fontFamily: 'inherit',
          fontSize: '1rem',
          fontWeight: 600,
          outline: 'none',
          background: 'white',
          boxShadow: isFocused ? '0 0 0 4px rgba(56, 189, 248, 0.15)' : 'none',
          transition: 'all 0.2s ease',
        }}
      />

      {/* Clear Button */}
      {query && (
        <button
          onClick={handleClear}
          style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: '#f1f5f9',
            border: 'none',
            borderRadius: '50%',
            width: '28px',
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#64748b',
            fontSize: '1rem',
            fontWeight: 800,
          }}
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchBar;
