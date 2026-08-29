import React, { useState, useEffect } from 'react';
import { BarChart3, Clock, Award, Flame, BookOpen, CheckCircle, ArrowLeft } from '../components/common/Icons';
import { useNavigate } from 'react-router-dom';
import soundService from '../services/soundService';
import gameService from '../services/gameService';

const ParentDashboard = () => {
  const navigate = useNavigate();
  const [report, setReport] = useState(null);

  useEffect(() => {
    const loadReport = async () => {
      try {
        const data = await gameService.getParentReport();
        setReport(data);
      } catch (e) {
        // Fallback demo parent report
        setReport({
          parentId: 1,
          parentName: 'Sarah Jenkins',
          children: [
            {
              childId: 1,
              displayName: 'Leo The Explorer',
              level: 2,
              totalCoins: 150,
              totalStars: 12,
              streakDays: 3,
              totalActivitiesCompleted: 6,
              totalStudyTimeMinutes: 24,
              subjectMasteryPercentage: {
                MATH: 85,
                MYSTERY: 90,
                CODING: 75,
                BRAIN: 100,
                PUZZLE: 80,
                CREATIVE: 95,
              },
              recentActivities: [
                { activityTitle: '🍎 Apple Orchard Counting', subjectName: 'Mathematics', score: 100, coinsEarned: 15, completedAt: 'Today' },
                { activityTitle: '🗝️ The Golden Key Mystery', subjectName: 'Mystery House', score: 100, coinsEarned: 20, completedAt: 'Today' },
                { activityTitle: '🤖 Help Robo-Buddy Reach the Star', subjectName: 'Coding Lab', score: 100, coinsEarned: 25, completedAt: 'Yesterday' },
              ]
            }
          ]
        });
      }
    };
    loadReport();
  }, []);

  const child = report?.children?.[0];

  return (
    <div style={{ padding: '20px 24px 80px', maxWidth: '1020px', margin: '0 auto' }}>
      {/* Top Navigation */}
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
          <span>Back to 3D Adventure</span>
        </button>

        <div className="glass-panel" style={{
          padding: '8px 20px',
          background: 'white',
          borderRadius: '9999px',
          fontWeight: 800,
          fontSize: '1.05rem',
          color: '#0f766e',
          border: '2px solid #99f6e4'
        }}>
          👨‍👩‍👧 Parent Learning Insights
        </div>
      </div>

      {/* Overview Card */}
      <div className="glass-panel" style={{
        padding: '32px',
        borderRadius: '32px',
        marginBottom: '28px',
        background: 'linear-gradient(135deg, #ccfbf1, #99f6e4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f766e', textTransform: 'uppercase' }}>
            Student Progress Dashboard
          </span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#134e4a' }}>
            {child?.displayName || 'Child'}
          </h2>
          <p style={{ fontSize: '1.1rem', fontWeight: 600, color: '#115e59' }}>
            Active Explorer • Level {child?.level || 1}
          </p>
        </div>

        {/* 4 Stat Highlights */}
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
          <div className="glass-panel" style={{ padding: '14px 20px', background: 'white', borderRadius: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f766e' }}>{child?.totalActivitiesCompleted || 0}</div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b' }}>Quests Done</div>
          </div>
          <div className="glass-panel" style={{ padding: '14px 20px', background: 'white', borderRadius: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#d97706' }}>{child?.totalCoins || 0} 🪙</div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b' }}>Earned Coins</div>
          </div>
          <div className="glass-panel" style={{ padding: '14px 20px', background: 'white', borderRadius: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#ea580c' }}>{child?.streakDays || 1} 🔥</div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b' }}>Day Streak</div>
          </div>
          <div className="glass-panel" style={{ padding: '14px 20px', background: 'white', borderRadius: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#2563eb' }}>{child?.totalStudyTimeMinutes || 20}m ⏱️</div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b' }}>Study Time</div>
          </div>
        </div>
      </div>

      {/* Subject Mastery Progress Bars */}
      <div className="glass-panel" style={{
        padding: '30px',
        borderRadius: '32px',
        background: 'white',
        marginBottom: '28px',
        border: '3px solid #e2e8f0'
      }}>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BarChart3 size={24} color="#0f766e" />
          <span>Subject Mastery Breakdown</span>
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {[
            { key: 'MATH', label: 'Mathematics Island', icon: '🧮', color: '#ff5722' },
            { key: 'MYSTERY', label: 'Mystery & Logic House', icon: '🔍', color: '#9c27b0' },
            { key: 'CODING', label: 'Coding Lab & Algorithms', icon: '💻', color: '#00bcd4' },
            { key: 'BRAIN', label: 'Brain Memory Forest', icon: '🧠', color: '#4caf50' },
            { key: 'PUZZLE', label: 'Puzzle & Tangram Castle', icon: '🧩', color: '#ff9800' },
            { key: 'CREATIVE', label: 'Creativity & Building', icon: '🎨', color: '#e91e63' },
          ].map((subj) => {
            const percent = child?.subjectMasteryPercentage?.[subj.key] || 80;
            return (
              <div key={subj.key} style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 800, color: '#1e293b' }}>
                    {subj.icon} {subj.label}
                  </span>
                  <span style={{ fontWeight: 800, color: subj.color }}>{percent}%</span>
                </div>
                {/* Progress Meter */}
                <div style={{ height: '12px', background: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${percent}%`,
                    height: '100%',
                    background: subj.color,
                    borderRadius: '9999px',
                    transition: 'width 1s ease'
                  }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity History */}
      <div className="glass-panel" style={{
        padding: '30px',
        borderRadius: '32px',
        background: 'white',
        border: '3px solid #e2e8f0'
      }}>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Clock size={24} color="#0f766e" />
          <span>Recent Activity History</span>
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {child?.recentActivities?.map((act, idx) => (
            <div
              key={idx}
              style={{
                padding: '16px 20px',
                background: '#f8fafc',
                borderRadius: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: '1px solid #e2e8f0'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <CheckCircle size={22} color="#10b981" />
                <div>
                  <div style={{ fontWeight: 800, color: '#1e293b', fontSize: '1.05rem' }}>{act.activityTitle}</div>
                  <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>{act.subjectName} • {act.completedAt}</div>
                </div>
              </div>
              <div style={{ fontWeight: 800, color: '#d97706', background: '#fef3c7', padding: '6px 14px', borderRadius: '12px' }}>
                +{act.coinsEarned} 🪙
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
