import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Sparkles } from './Icons';
import soundService from '../../services/soundService';

const steps = [
  {
    emoji: '🌟',
    title: 'Welcome to Adventure Land!',
    message: 'This is a magical 3D world where you learn by playing fun games!',
    color: '#ffd166',
  },
  {
    emoji: '🌍',
    title: 'Explore 6 Worlds',
    message: 'Click any portal on the 3D island to visit Math Island, Mystery House, Coding Lab, and more!',
    color: '#ff6b6b',
  },
  {
    emoji: '🪙',
    title: 'Earn Coins & Stars',
    message: 'Complete challenges to earn coins and stars. Spend them in the Reward Shop!',
    color: '#06d6a0',
  },
  {
    emoji: '🏆',
    title: 'Win Trophies!',
    message: 'Unlock achievements and build your trophy collection. Can you get them all?',
    color: '#9d4edd',
  },
  {
    emoji: '🚀',
    title: 'Ready to Start?',
    message: 'Click any world portal below to begin your first adventure!',
    color: '#118ab2',
  },
];

const WelcomeTour = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isShowing, setIsShowing] = useState(true);

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('adventure_tour_seen');
    if (hasSeenTour) {
      setIsShowing(false);
      if (onComplete) onComplete();
    }
  }, [onComplete]);

  if (!isShowing) return null;

  const step = steps[currentStep];

  const handleNext = () => {
    soundService.playPop();
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      localStorage.setItem('adventure_tour_seen', 'true');
      setIsShowing(false);
      if (onComplete) onComplete();
    }
  };

  const handlePrev = () => {
    soundService.playPop();
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    soundService.playPop();
    localStorage.setItem('adventure_tour_seen', 'true');
    setIsShowing(false);
    if (onComplete) onComplete();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 200,
      padding: '20px',
    }}>
      <div className="glass-panel anim-bounce-in" style={{
        background: 'white',
        borderRadius: '36px',
        maxWidth: '520px',
        width: '100%',
        padding: '40px',
        border: `4px solid ${step.color}`,
        boxShadow: '0 25px 60px rgba(0,0,0,0.25)',
        textAlign: 'center',
      }}>
        {/* Step Indicator */}
        <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginBottom: '20px' }}>
          {steps.map((_, idx) => (
            <div
              key={idx}
              style={{
                width: idx === currentStep ? '24px' : '10px',
                height: '10px',
                borderRadius: '9999px',
                background: idx === currentStep ? step.color : '#e2e8f0',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>

        {/* Emoji */}
        <div style={{ fontSize: '64px', marginBottom: '12px' }} className="anim-float">
          {step.emoji}
        </div>

        {/* Title */}
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>
          {step.title}
        </h2>

        {/* Message */}
        <p style={{ fontSize: '1.1rem', fontWeight: 600, color: '#475569', marginBottom: '28px', lineHeight: 1.5 }}>
          {step.message}
        </p>

        {/* Navigation Buttons */}
        <div style={{ display: 'flex', gap: '12px' }}>
          {currentStep > 0 && (
            <button
              onClick={handlePrev}
              className="btn-fun btn-fun-sky"
              style={{ flex: 1, padding: '14px', fontSize: '1rem' }}
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
          )}

          <button
            onClick={handleNext}
            className="btn-fun btn-fun-mint anim-pulse"
            style={{ flex: 2, padding: '14px', fontSize: '1.1rem' }}
          >
            <Sparkles size={20} />
            <span>{currentStep === steps.length - 1 ? "Let's Go! 🚀" : 'Next'}</span>
            <ArrowRight size={20} />
          </button>
        </div>

        {/* Skip Link */}
        <button
          onClick={handleSkip}
          style={{
            marginTop: '14px',
            background: 'none',
            border: 'none',
            color: '#94a3b8',
            fontWeight: 700,
            fontSize: '0.9rem',
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
        >
          Skip Tour
        </button>
      </div>
    </div>
  );
};

export default WelcomeTour;
