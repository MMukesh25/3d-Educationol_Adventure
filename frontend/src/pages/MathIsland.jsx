import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check, Sparkles, RefreshCw } from '../components/common/Icons';
import { useNavigate } from 'react-router-dom';
import MiniWorldScene from '../components/3d/MiniWorldScene';
import MascotGuide from '../components/common/MascotGuide';
import { useGame } from '../context/GameContext';
import soundService from '../services/soundService';
import gameService from '../services/gameService';

const MathIsland = () => {
  const navigate = useNavigate();
  const { showCelebration } = useGame();

  const [questions, setQuestions] = useState([
    {
      id: 1,
      prompt: '🍎 Count the juicy red apples!',
      visual: '🍎 🍎 🍎',
      options: ['2', '3', '4', '5'],
      correct: '3',
      hint: 'Count them: one, two, three!',
    },
    {
      id: 2,
      prompt: '⭐ How many stars in total?',
      visual: '⭐ ⭐ + ⭐ ⭐ ⭐ = ?',
      options: ['4', '5', '6', '7'],
      correct: '5',
      hint: '2 plus 3 makes 5!',
    },
    {
      id: 3,
      prompt: '🌟 What comes next in the pattern?',
      visual: '⭐ 🔵 ⭐ 🔵 ⭐ ?',
      options: ['⭐', '🔵', '🔺', '🟢'],
      correct: '🔵',
      hint: 'Star, Circle, Star, Circle, Star...',
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [userAnswers, setUserAnswers] = useState({});

  const currentQ = questions[currentIndex];

  const handleSelectOption = (opt) => {
    if (isAnswered) return;
    soundService.playPop();
    setSelectedAnswer(opt);
  };

  const handleCheckAnswer = async () => {
    if (!selectedAnswer) return;

    const isCorrect = selectedAnswer === currentQ.correct;
    setIsAnswered(true);

    const updatedAnswers = { ...userAnswers, [currentQ.id]: selectedAnswer };
    setUserAnswers(updatedAnswers);

    if (isCorrect) {
      soundService.playCorrect();
      setFeedback('🎉 Great Job! That is correct! ⭐');

      setTimeout(() => {
        if (currentIndex < questions.length - 1) {
          setCurrentIndex((prev) => prev + 1);
          setSelectedAnswer(null);
          setIsAnswered(false);
          setFeedback('');
        } else {
          // Finished all questions in this stage
          submitAttempt(updatedAnswers);
        }
      }, 1400);
    } else {
      soundService.playTryAgain();
      setFeedback('😊 Almost there! Try again!');
      setTimeout(() => {
        setIsAnswered(false);
        setSelectedAnswer(null);
        setFeedback('');
      }, 1500);
    }
  };

  const submitAttempt = async (finalAnswers) => {
    try {
      const result = await gameService.submitAttempt(1, finalAnswers, 25);
      showCelebration({
        title: '🧮 Math Island Conquered!',
        message: 'You solved all the fruit & number puzzles!',
        coinsEarned: result.coinsEarned || 20,
        starsEarned: result.starsEarned || 2,
        leveledUp: result.leveledUp,
      });
    } catch (e) {
      showCelebration({
        title: '🧮 Math Island Conquered!',
        message: 'Awesome counting skills!',
        coinsEarned: 20,
        starsEarned: 2,
      });
    }
    navigate('/');
  };

  return (
    <div style={{ position: 'relative', minHeight: '85vh', padding: '20px 24px 60px' }}>
      <MiniWorldScene theme="math" />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '780px', margin: '0 auto' }}>
        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <button
            onClick={() => {
              soundService.playPop();
              navigate('/');
            }}
            className="btn-fun btn-fun-coral"
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
            color: '#c2410c',
            border: '2px solid #fdba74'
          }}>
            Question {currentIndex + 1} of {questions.length}
          </div>
        </div>

        {/* Main Challenge Card */}
        <div className="glass-panel anim-float" style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '36px',
          padding: '36px',
          border: '4px solid #ff7043',
          boxShadow: '0 20px 50px rgba(255, 112, 67, 0.2)',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '20px' }}>
            {currentQ.prompt}
          </h2>

          {/* Big Visual Math Presentation */}
          <div style={{
            background: 'linear-gradient(135deg, #fff7ed, #ffedd5)',
            border: '3px dashed #fb923c',
            borderRadius: '24px',
            padding: '32px 20px',
            fontSize: '3rem',
            fontWeight: 800,
            letterSpacing: '8px',
            marginBottom: '32px',
            boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.05)',
            color: '#ea580c'
          }} className="anim-pulse">
            {currentQ.visual}
          </div>

          {/* Option Answer Buttons */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px',
            marginBottom: '30px'
          }}>
            {currentQ.options.map((opt) => {
              const isSelected = selectedAnswer === opt;
              let statusClass = '';
              if (isAnswered && isSelected) {
                statusClass = opt === currentQ.correct ? 'correct' : 'incorrect';
              } else if (isSelected) {
                statusClass = 'selected';
              }

              return (
                <button
                  key={opt}
                  onClick={() => handleSelectOption(opt)}
                  className={`option-card ${statusClass}`}
                  style={{
                    fontSize: '2rem',
                    padding: '24px',
                    borderRadius: '24px',
                    borderWidth: '3px',
                  }}
                >
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Feedback Text Banner */}
          {feedback && (
            <div style={{
              fontSize: '1.4rem',
              fontWeight: 800,
              color: feedback.includes('Great') ? '#15803d' : '#b91c1c',
              marginBottom: '20px',
            }} className="anim-wiggle">
              {feedback}
            </div>
          )}

          {/* Check / Next Button */}
          <button
            onClick={handleCheckAnswer}
            disabled={!selectedAnswer || isAnswered}
            className={`btn-fun ${selectedAnswer ? 'btn-fun-mint anim-pulse' : 'btn-fun-coral'}`}
            style={{
              width: '100%',
              padding: '18px',
              fontSize: '1.35rem',
              borderRadius: '9999px',
              opacity: !selectedAnswer ? 0.6 : 1,
              cursor: !selectedAnswer ? 'not-allowed' : 'pointer'
            }}
          >
            <Check size={26} />
            <span>Check My Answer!</span>
          </button>
        </div>
      </div>

      {/* Mascot Guide with contextual hint */}
      <MascotGuide
        name="Math Monkey 🐒"
        emoji="🐒"
        message={currentQ.hint}
      />
    </div>
  );
};

export default MathIsland;
