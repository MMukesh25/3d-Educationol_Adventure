import React, { useState } from 'react';
import { ArrowLeft, Check, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MiniWorldScene from '../components/3d/MiniWorldScene';
import MascotGuide from '../components/common/MascotGuide';
import { useGame } from '../context/GameContext';
import soundService from '../services/soundService';
import gameService from '../services/gameService';

const PuzzleCastle = () => {
  const navigate = useNavigate();
  const { showCelebration } = useGame();

  const [puzzles] = useState([
    {
      id: 1,
      title: '🏰 Tangram Castle Bridge Gap',
      prompt: 'The castle bridge needs a TRIANGLE piece 🔺 to let the royal carriage pass!',
      gapVisual: '🏰 ── [ ❓ ] ── 🏰',
      options: [
        { label: 'Triangle 🔺', value: 'Triangle 🔺', isCorrect: true },
        { label: 'Square 🟦', value: 'Square 🟦', isCorrect: false },
        { label: 'Circle 🔵', value: 'Circle 🔵', isCorrect: false },
      ],
      hint: 'Find the shape with 3 pointy corners! 🔺',
    },
    {
      id: 2,
      title: '💎 Magic Gem Pattern Lock',
      prompt: 'Which gem completes the enchanted castle shield?',
      gapVisual: '💎 🟢 💎 🟢 💎 [ ❓ ]',
      options: [
        { label: 'Green Emerald 🟢', value: 'Green Emerald 🟢', isCorrect: true },
        { label: 'Red Ruby 🔴', value: 'Red Ruby 🔴', isCorrect: false },
        { label: 'Yellow Sun 🟡', value: 'Yellow Sun 🟡', isCorrect: false },
      ],
      hint: 'Diamond, Emerald, Diamond, Emerald... what comes next? 🟢',
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedback, setFeedback] = useState('');

  const currentPuzzle = puzzles[currentIndex];

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
      setFeedback('🎉 Great Job! The shape fit perfectly! 🏰✨');

      setTimeout(() => {
        if (currentIndex < puzzles.length - 1) {
          setCurrentIndex((prev) => prev + 1);
          setSelectedOpt(null);
          setIsAnswered(false);
          setFeedback('');
        } else {
          submitAttempt();
        }
      }, 1400);
    } else {
      soundService.playTryAgain();
      setFeedback('😊 That shape does not fit this gap! Try another shape!');
      setTimeout(() => {
        setIsAnswered(false);
        setSelectedOpt(null);
        setFeedback('');
      }, 1500);
    }
  };

  const submitAttempt = async () => {
    try {
      const result = await gameService.submitAttempt(5, { 1: selectedOpt.value }, 20);
      showCelebration({
        title: '🧩 Puzzle Castle Unlocked!',
        message: 'You restored all castle shape bridges and gem locks!',
        coinsEarned: result.coinsEarned || 20,
        starsEarned: result.starsEarned || 2,
        leveledUp: result.leveledUp,
      });
    } catch (e) {
      showCelebration({
        title: '🧩 Puzzle Castle Unlocked!',
        message: 'You restored all castle shape bridges and gem locks!',
        coinsEarned: 20,
        starsEarned: 2,
      });
    }
    navigate('/');
  };

  return (
    <div style={{ position: 'relative', minHeight: '85vh', padding: '20px 24px 60px' }}>
      <MiniWorldScene theme="puzzle" />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '780px', margin: '0 auto' }}>
        {/* Top Nav */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <button
            onClick={() => {
              soundService.playPop();
              navigate('/');
            }}
            className="btn-fun btn-fun-gold"
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
            color: '#b45309',
            border: '2px solid #fde68a'
          }}>
            Puzzle #{currentIndex + 1} of {puzzles.length}
          </div>
        </div>

        {/* Puzzle Card */}
        <div className="glass-panel anim-float" style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '36px',
          padding: '36px',
          border: '4px solid #ff9800',
          boxShadow: '0 20px 50px rgba(255, 152, 0, 0.25)',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#0f172a', marginBottom: '14px' }}>
            {currentPuzzle.title}
          </h2>

          <p style={{ fontSize: '1.25rem', fontWeight: 600, color: '#475569', marginBottom: '24px' }}>
            {currentPuzzle.prompt}
          </p>

          <div style={{
            background: 'linear-gradient(135deg, #fffbeb, #fef3c7)',
            border: '3px dashed #f59e0b',
            borderRadius: '24px',
            padding: '30px',
            fontSize: '2.5rem',
            fontWeight: 800,
            marginBottom: '32px',
            color: '#d97706'
          }} className="anim-pulse">
            {currentPuzzle.gapVisual}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '28px' }}>
            {currentPuzzle.options.map((opt) => {
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
                  style={{ padding: '20px', fontSize: '1.25rem', borderRadius: '20px' }}
                >
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>

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

          <button
            onClick={handleCheck}
            disabled={!selectedOpt || isAnswered}
            className={`btn-fun ${selectedOpt ? 'btn-fun-mint anim-pulse' : 'btn-fun-gold'}`}
            style={{
              width: '100%',
              padding: '18px',
              fontSize: '1.35rem',
              borderRadius: '9999px',
              opacity: !selectedOpt ? 0.6 : 1,
              cursor: !selectedOpt ? 'not-allowed' : 'pointer'
            }}
          >
            <Check size={24} />
            <span>Fit Shape Into Castle!</span>
          </button>
        </div>
      </div>

      <MascotGuide
        name="Castle Knight 🛡️"
        emoji="🛡️"
        message={currentPuzzle.hint}
      />
    </div>
  );
};

export default PuzzleCastle;
