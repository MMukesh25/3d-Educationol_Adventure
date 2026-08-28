import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import soundService from '../services/soundService';
import gameService from '../services/gameService';
import { useAuth } from './AuthContext';

const GameContext = createContext(null);

export const GameProvider = ({ children }) => {
  const { user, updateUserProfile } = useAuth();

  const [coins, setCoins] = useState(user?.coins || 150);
  const [stars, setStars] = useState(user?.stars || 12);
  const [level, setLevel] = useState(user?.currentLevel || 2);
  const [streakDays, setStreakDays] = useState(user?.streakDays || 3);
  const [soundMuted, setSoundMuted] = useState(false);

  // Avatar state
  const [avatar, setAvatar] = useState({
    skinColor: '#ffcc80',
    hairStyle: 'spiky',
    hairColor: '#3e2723',
    outfitColor: '#29b6f6',
    hat: 'royal_crown',
    accessory: 'none',
    pet: 'baby_dragon',
  });

  // Modal celebration state
  const [celebration, setCelebration] = useState({
    isOpen: false,
    title: '',
    message: '',
    coinsEarned: 0,
    starsEarned: 0,
    leveledUp: false,
  });

  useEffect(() => {
    if (user) {
      if (user.coins !== undefined) setCoins(user.coins);
      if (user.stars !== undefined) setStars(user.stars);
      if (user.currentLevel !== undefined) setLevel(user.currentLevel);
      if (user.streakDays !== undefined) setStreakDays(user.streakDays);

      if (user.avatarData) {
        try {
          const parsed = typeof user.avatarData === 'string' ? JSON.parse(user.avatarData) : user.avatarData;
          setAvatar(parsed);
        } catch (e) {
          console.error('Failed to parse avatar data', e);
        }
      }
    }
  }, [user]);

  const toggleSound = () => {
    const next = !soundMuted;
    setSoundMuted(next);
    soundService.setMuted(next);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ffd166', '#ff6b6b', '#06d6a0', '#118ab2', '#9d4edd'],
    });
  };

  const showCelebration = ({ title, message, coinsEarned = 0, starsEarned = 0, leveledUp = false }) => {
    soundService.playFanfare();
    triggerConfetti();

    // Increment local counters
    if (coinsEarned > 0) {
      setCoins((prev) => {
        const next = prev + coinsEarned;
        updateUserProfile({ coins: next });
        return next;
      });
    }
    if (starsEarned > 0) {
      setStars((prev) => {
        const next = prev + starsEarned;
        updateUserProfile({ stars: next });
        return next;
      });
    }
    if (leveledUp) {
      setLevel((prev) => {
        const next = prev + 1;
        updateUserProfile({ currentLevel: next });
        return next;
      });
    }

    setCelebration({
      isOpen: true,
      title: title || '🎉 Great Job Explorer!',
      message: message || 'You completed the challenge!',
      coinsEarned,
      starsEarned,
      leveledUp,
    });
  };

  const closeCelebration = () => {
    setCelebration((prev) => ({ ...prev, isOpen: false }));
  };

  const updateAvatarSettings = async (newAvatar) => {
    setAvatar(newAvatar);
    updateUserProfile({ avatarData: JSON.stringify(newAvatar) });
    try {
      await gameService.updateAvatar(newAvatar);
    } catch (e) {
      console.warn('Backend avatar update saved locally');
    }
  };

  return (
    <GameContext.Provider
      value={{
        coins,
        setCoins,
        stars,
        setStars,
        level,
        setLevel,
        streakDays,
        avatar,
        updateAvatarSettings,
        soundMuted,
        toggleSound,
        celebration,
        showCelebration,
        closeCelebration,
        triggerConfetti,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
