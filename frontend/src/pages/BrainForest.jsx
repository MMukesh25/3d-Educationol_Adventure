import React, { useState, useEffect } from 'react';
import { ArrowLeft, RefreshCw, Check, Sparkles } from '../components/common/Icons';
import { useNavigate } from 'react-router-dom';
import MiniWorldScene from '../components/3d/MiniWorldScene';
import MascotGuide from '../components/common/MascotGuide';
import { useGame } from '../context/GameContext';
import soundService from '../services/soundService';
import gameService from '../services/gameService';

const BrainForest = () => {
  const navigate = useNavigate();
  const { showCelebration } = useGame();

  const initialCards = [
    { id: 1, value: '🐶', flipped: false, matched: false },
    { id: 2, value: '🐱', flipped: false, matched: false },
    { id: 3, value: '⭐', flipped: false, matched: false },
    { id: 4, value: '🐶', flipped: false, matched: false },
    { id: 5, value: '🐱', flipped: false, matched: false },
    { id: 6, value: '⭐', flipped: false, matched: false },
  ];

  const [cards, setCards] = useState(initialCards);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);

  const handleCardClick = (card) => {
    if (card.flipped || card.matched || selectedCards.length === 2) return;

    soundService.playPop();
    const updated = cards.map((c) => (c.id === card.id ? { ...c, flipped: true } : c));
    setCards(updated);

    const newSelected = [...selectedCards, card];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      if (newSelected[0].value === newSelected[1].value) {
        soundService.playCorrect();
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) => (c.value === newSelected[0].value ? { ...c, matched: true } : c))
          );
          setSelectedCards([]);
          setMatchedPairs((p) => {
            const next = p + 1;
            if (next === 3) {
              // Completed all 3 pairs!
              finishMemoryGame();
            }
            return next;
          });
        }, 500);
      } else {
        soundService.playTryAgain();
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === newSelected[0].id || c.id === newSelected[1].id ? { ...c, flipped: false } : c
            )
          );
          setSelectedCards([]);
        }, 900);
      }
    }
  };

  const finishMemoryGame = async () => {
    try {
      const result = await gameService.submitAttempt(4, { 1: 'Card 1 and Card 3' }, 20);
      showCelebration({
        title: '🧠 Memory Master!',
        message: 'You found all matching forest friends with photographic memory!',
        coinsEarned: result.coinsEarned || 20,
        starsEarned: result.starsEarned || 2,
        leveledUp: result.leveledUp,
      });
    } catch (e) {
      showCelebration({
        title: '🧠 Memory Master!',
        message: 'You found all matching forest friends!',
        coinsEarned: 20,
        starsEarned: 2,
      });
    }
    navigate('/');
  };

  return (
    <div style={{ position: 'relative', minHeight: '85vh', padding: '20px 24px 60px' }}>
      <MiniWorldScene theme="brain" />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '780px', margin: '0 auto' }}>
        {/* Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <button
            onClick={() => {
              soundService.playPop();
              navigate('/');
            }}
            className="btn-fun btn-fun-mint"
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
            color: '#15803d',
            border: '2px solid #86efac'
          }}>
            Matched Pairs: {matchedPairs} / 3 🌟
          </div>
        </div>

        {/* Memory Grid Board */}
        <div className="glass-panel anim-float" style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '36px',
          padding: '36px',
          border: '4px solid #4caf50',
          boxShadow: '0 20px 50px rgba(76, 175, 80, 0.25)',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>
            🧠 Enchanted Memory Forest
          </h2>
          <p style={{ fontSize: '1.15rem', fontWeight: 600, color: '#475569', marginBottom: '28px' }}>
            Flip cards to find the matching animal and star pairs!
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '18px',
            maxWidth: '520px',
            margin: '0 auto'
          }}>
            {cards.map((card) => (
              <div
                key={card.id}
                onClick={() => handleCardClick(card)}
                className={`anim-wiggle ${card.matched ? 'anim-pulse' : ''}`}
                style={{
                  height: '130px',
                  borderRadius: '24px',
                  background: card.flipped || card.matched
                    ? 'linear-gradient(135deg, #dcfce7, #bbf7d0)'
                    : 'linear-gradient(135deg, #86efac, #4ade80)',
                  border: card.matched ? '4px solid #16a34a' : '3px solid white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: card.flipped || card.matched ? '50px' : '36px',
                  cursor: card.matched ? 'default' : 'pointer',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}
              >
                {card.flipped || card.matched ? card.value : '🍄'}
              </div>
            ))}
          </div>
        </div>
      </div>

      <MascotGuide
        name="Wise Owl 🦉"
        emoji="🦉"
        message="Take your time to memorize the cards as they flip! Find all 3 pairs to win!"
      />
    </div>
  );
};

export default BrainForest;
