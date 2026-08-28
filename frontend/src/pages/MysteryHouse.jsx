import React, { useState } from 'react';
import { ArrowLeft, Check, Search, Key, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MiniWorldScene from '../components/3d/MiniWorldScene';
import MascotGuide from '../components/common/MascotGuide';
import { useGame } from '../context/GameContext';
import soundService from '../services/soundService';
import gameService from '../services/gameService';

const MysteryHouse = () => {
  const navigate = useNavigate();
  const { showCelebration } = useGame();

  const [mysteries] = useState([
    {
      id: 1,
      title: '🗝️ The Golden Lock & Key Mystery',
      clue: 'The glowing treasure chest has a STAR shaped lock ⭐. Which key will unlock the magic chest?',
      lockEmoji: '🔒 ⭐',
      options: [
        { label: 'Circle Key ⚪', value: 'Circle Key ⚪', isCorrect: false },
        { label: 'Square Key 🟦', value: 'Square Key 🟦', isCorrect: false },
        { label: 'Star Key ⭐', value: 'Star Key ⭐', isCorrect: true },
      ],
      hint: 'Look at the shape inside the lock hole! ⭐ matches ⭐!',
    },
    {
      id: 2,
      title: '🐾 The Footprint Clue Trail',
      clue: 'Follow the happy paw prints! Who is hiding behind the cozy bookshelf?',
      lockEmoji: '🐾 🐾 🐾 ➔ ?',
      options: [
        { label: 'Playful Puppy 🐶', value: 'Playful Puppy 🐶', isCorrect: true },
        { label: 'Green Frog 🐸', value: 'Green Frog 🐸', isCorrect: false },
        { label: 'Little Fish 🐟', value: 'Little Fish 🐟', isCorrect: false },
      ],
      hint: 'Dogs leave soft paw prints on the rug! 🐾',
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedback, setFeedback] = useState('');

  const currentMystery = mysteries[currentIndex];

  const handleSelect = (opt) => {
    if (isAnswered) return;
    soundService.playPop();
    setSelectedOpt(opt);
  };

  const handleCheck = async () => {
    if (!selectedOpt) return;
    setIsAnswered(true);

    if (selectedOpt.isCorrect) {
      soundService.playCorrect();
      setFeedback('🎉 Great Detective Work! You solved the mystery! 🔍✨');

      setTimeout(() => {
        if (currentIndex < mysteries.length - 1) {
          setCurrentIndex((prev) => prev + 1);
          setSelectedOpt(null);
          setIsAnswered(false);
          setFeedback('');
        } else {
          submitAttempt();
        }
      }, 1500);
    } else {
      soundService.playTryAgain();
      setFeedback('😊 Look closer with your magnifying glass! Try again!');
      setTimeout(() => {
        setIsAnswered(false);
        setSelectedOpt(null);
        setFeedback('');
      }, 1500);
    }
  };

  const submitAttempt = async () => {
    try {
      const result = await gameService.submitAttempt(2, { 1: selectedOpt.value }, 25);
      showCelebration({
        title: '🔍 Master Detective Badge!',
        message: 'You cracked all the Mystery House secrets!',
        coinsEarned: result.coinsEarned || 25,
        starsEarned: result.starsEarned || 2,
        leveledUp: result.leveledUp,
      });
    } catch (e) {
      showCelebration({
        title: '🔍 Master Detective Badge!',
        message: 'You cracked all the Mystery House secrets!',
        coinsEarned: 25,
        starsEarned: 2,
      });
    }
    navigate('/');
  };

  return (
    <div style={{ position: 'relative', minHeight: '85vh', padding: '20px 24px 60px' }}>
      <MiniWorldScene theme="mystery" />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '780px', margin: '0 auto' }}>
        {/* Top Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <button
            onClick={() => {
              soundService.playPop();
              navigate('/');
            }}
            className="btn-fun btn-fun-purple"
            style={{ padding: '10px 18px', fontSize: '1rem' }}
          >
            <ArrowLeft size={20} />
            <span>Island Map</span>
          </button>

          <div className="glass-panel" style={{
            padding: '8px 20px',
            background: 'white',
            borderRadius: '9999px',
            fontWeight: 800,
            fontSize: '1.1rem',
            color: '#7e22ce',
            border: '2px solid #d8b4fe'
          }}>
            Case #{currentIndex + 1} of {mysteries.length}
          </div>
        </div>

        {/* Detective Case Card */}
        <div className="glass-panel anim-float" style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '36px',
          padding: '36px',
          border: '4px solid #ab47bc',
          boxShadow: '0 20px 50px rgba(171, 71, 188, 0.25)',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#0f172a', marginBottom: '14px' }}>
            {currentMystery.title}
          </h2>

          <p style={{ fontSize: '1.25rem', fontWeight: 600, color: '#475569', marginBottom: '24px' }}>
            {currentMystery.clue}
          </p>

          {/* Clue Center Display */}
          <div style={{
            background: 'linear-gradient(135deg, #faf5ff, #f3e8ff)',
            border: '3px dashed #c084fc',
            borderRadius: '24px',
            padding: '30px',
            fontSize: '3rem',
            fontWeight: 800,
            marginBottom: '32px',
            color: '#6b21a8'
          }} className="anim-pulse">
            {currentMystery.lockEmoji}
          </div>

          {/* Option Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '28px' }}>
            {currentMystery.options.map((opt) => {
              const isSelected = selectedOpt?.value === opt.value;
              let statusClass = '';
              if (isAnswered && isSelected) {
                statusClass = opt.isCorrect ? 'correct' : 'incorrect';
              } else if (isSelected) {
                statusClass = 'selected';
              }

              return (
                <button
                  key={opt.value}
                  onClick={() => handleSelect(opt)}
                  className={`option-card ${statusClass}`}
                  style={{
                    padding: '20px',
                    fontSize: '1.25rem',
                    borderRadius: '20px',
                  }}
                >
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {feedback && (
            <div style={{
              fontSize: '1.35rem',
              fontWeight: 800,
              color: feedback.includes('Great') ? '#15803d' : '#b91c1c',
              marginBottom: '20px',
            }} className="anim-wiggle">
              {feedback}
            </div>
          )}

          {/* Action Button */}
          <button
            onClick={handleCheck}
            disabled={!selectedOpt || isAnswered}
            className={`btn-fun ${selectedOpt ? 'btn-fun-mint anim-pulse' : 'btn-fun-purple'}`}
            style={{
              width: '100%',
              padding: '18px',
              fontSize: '1.35rem',
              borderRadius: '9999px',
              opacity: !selectedOpt ? 0.6 : 1,
              cursor: !selectedOpt ? 'not-allowed' : 'pointer'
            }}
          >
            <Search size={24} />
            <span>Use Clue to Unlock!</span>
          </button>
        </div>
      </div>

      <MascotGuide
        name="Detective Sherlock Hound 🕵️"
        emoji="🕵️"
        message={currentMystery.hint}
      />
    </div>
  );
};

export default MysteryHouse;
