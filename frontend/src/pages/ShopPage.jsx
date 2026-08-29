import React, { useState, useEffect } from 'react';
import { ShoppingBag, Sparkles, Check, Lock, AlertCircle } from '../components/common/Icons';
import { useGame } from '../context/GameContext';
import soundService from '../services/soundService';
import gameService from '../services/gameService';

const ShopPage = () => {
  const { coins, setCoins, showCelebration } = useGame();
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [rewards, setRewards] = useState([]);
  const [unlockedIds, setUnlockedIds] = useState(new Set([1])); // default crown unlocked

  useEffect(() => {
    const loadRewards = async () => {
      try {
        const data = await gameService.getShopRewards();
        if (data && data.length > 0) {
          setRewards(data);
        } else {
          loadFallbackRewards();
        }
      } catch (e) {
        loadFallbackRewards();
      }
    };
    loadRewards();
  }, []);

  const loadFallbackRewards = () => {
    setRewards([
      { id: 1, name: 'Golden Royal Crown', category: 'HATS', coinCost: 50, iconEmoji: '👑', colorHex: '#ffd700', description: 'Shining royal crown!' },
      { id: 2, name: 'Wizard Star Hat', category: 'HATS', coinCost: 40, iconEmoji: '🧙‍♂️', colorHex: '#7e57c2', description: 'Embroidered with magic stars!' },
      { id: 3, name: 'Detective Cap', category: 'HATS', coinCost: 30, iconEmoji: '🕵️', colorHex: '#8d6e63', description: 'For sharp mystery solvers!' },
      { id: 4, name: 'Baby Dragon Companion', category: 'PETS', coinCost: 80, iconEmoji: '🐉', colorHex: '#26a69a', description: 'Tiny dragon breathing bubbles!' },
      { id: 5, name: 'Robot Drone Pal', category: 'PETS', coinCost: 60, iconEmoji: '🛸', colorHex: '#42a5f5', description: 'Hovering cyber companion!' },
      { id: 6, name: 'Fluffy Bunny', category: 'PETS', coinCost: 40, iconEmoji: '🐰', colorHex: '#ffffff', description: 'Hops along on quests!' },
      { id: 7, name: 'Super Explorer Cape', category: 'CLOTHES', coinCost: 45, iconEmoji: '🦸', colorHex: '#e53935', description: 'Heroic flutter cape!' },
      { id: 8, name: 'Cyber Space Suit', category: 'CLOTHES', coinCost: 75, iconEmoji: '👨‍🚀', colorHex: '#00e676', description: 'Glowing astronaut armor!' },
    ]);
  };

  const handlePurchase = async (reward) => {
    if (coins < reward.coinCost) {
      soundService.playTryAgain();
      alert(`😊 You need ${reward.coinCost} coins to unlock this item! Play more mini-games to earn coins! 🪙`);
      return;
    }

    try {
      await gameService.purchaseReward(reward.id);
    } catch (e) {
      console.warn('Simulating purchase locally');
    }

    soundService.playCoin();
    setCoins((prev) => prev - reward.coinCost);
    setUnlockedIds((prev) => new Set(prev).add(reward.id));

    showCelebration({
      title: `🛍️ Unlocked ${reward.name}!`,
      message: `You spent ${reward.coinCost} coins and equipped your new style!`,
      coinsEarned: 0,
      starsEarned: 0,
    });
  };

  const filteredRewards = activeCategory === 'ALL'
    ? rewards
    : rewards.filter((r) => r.category.toUpperCase() === activeCategory);

  return (
    <div style={{ padding: '20px 24px 80px', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header Banner */}
      <div className="glass-panel" style={{
        padding: '30px',
        borderRadius: '32px',
        marginBottom: '28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        background: 'linear-gradient(135deg, #fef3c7, #fde68a)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            fontSize: '48px',
            background: 'white',
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 20px rgba(245, 158, 11, 0.3)'
          }} className="anim-float">
            🛍️
          </div>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>
              Adventure Reward Shop
            </h2>
            <p style={{ fontSize: '1.1rem', fontWeight: 600, color: '#92400e' }}>
              Spend your earned coins on cool hats, loyal pets, and hero outfits!
            </p>
          </div>
        </div>

        {/* Current Coin Balance Display */}
        <div className="glass-panel anim-pulse" style={{
          padding: '12px 24px',
          background: 'white',
          borderRadius: '9999px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          border: '3px solid #f59e0b',
          boxShadow: '0 8px 20px rgba(245, 158, 11, 0.25)'
        }}>
          <span style={{ fontSize: '32px' }}>🪙</span>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#b45309', lineHeight: 1 }}>{coins}</div>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#92400e' }}>Your Coins</div>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '28px', flexWrap: 'wrap' }}>
        {[
          { id: 'ALL', label: '🌟 All Items' },
          { id: 'HATS', label: '👑 Cool Hats' },
          { id: 'PETS', label: '🐉 Cute Pets' },
          { id: 'CLOTHES', label: '🦸 Outfits' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              soundService.playPop();
              setActiveCategory(cat.id);
            }}
            className={`btn-fun ${activeCategory === cat.id ? 'btn-fun-gold' : 'btn-fun-coral'}`}
            style={{ padding: '12px 22px', fontSize: '1.05rem', borderRadius: '20px' }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Shop Items Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '22px' }}>
        {filteredRewards.map((reward) => {
          const isUnlocked = unlockedIds.has(reward.id);
          const canAfford = coins >= reward.coinCost;

          return (
            <div
              key={reward.id}
              className="glass-panel anim-wiggle"
              style={{
                padding: '24px',
                background: 'white',
                borderRadius: '28px',
                border: isUnlocked ? '3px solid #10b981' : '3px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                boxShadow: '0 10px 25px rgba(0,0,0,0.06)'
              }}
            >
              {/* Item Emoji Display */}
              <div style={{
                fontSize: '64px',
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: `linear-gradient(135deg, #f8fafc, ${reward.colorHex || '#fef3c7'})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
                boxShadow: '0 8px 16px rgba(0,0,0,0.08)'
              }}>
                {reward.iconEmoji}
              </div>

              <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e293b', marginBottom: '6px' }}>
                {reward.name}
              </h4>
              <p style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 600, marginBottom: '18px', minHeight: '38px' }}>
                {reward.description}
              </p>

              {/* Purchase / Unlocked Button */}
              {isUnlocked ? (
                <button
                  disabled
                  className="btn-fun"
                  style={{
                    width: '100%',
                    background: '#d1fae5',
                    color: '#065f46',
                    border: '2px solid #a7f3d0',
                    padding: '12px',
                    borderRadius: '9999px',
                    cursor: 'default',
                    boxShadow: 'none'
                  }}
                >
                  <Check size={20} />
                  <span>Unlocked & Equipped!</span>
                </button>
              ) : (
                <button
                  onClick={() => handlePurchase(reward)}
                  className={`btn-fun ${canAfford ? 'btn-fun-gold anim-pulse' : 'btn-fun-coral'}`}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '9999px',
                    opacity: canAfford ? 1 : 0.7
                  }}
                >
                  <span style={{ fontSize: '20px' }}>🪙</span>
                  <span>Buy for {reward.coinCost} Coins</span>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShopPage;
