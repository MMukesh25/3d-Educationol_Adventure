import React, { useState, useEffect } from 'react';
import { Shield, Users, Award, BookOpen, Database, ArrowLeft, Trash2, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import soundService from '../services/soundService';
import gameService from '../services/gameService';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 3,
    totalChildren: 1,
    totalParents: 1,
    totalActivities: 6,
    totalQuestions: 12,
    totalAttempts: 18,
    totalCoinsCirculating: 150,
    totalAchievementsUnlocked: 3,
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await gameService.getAdminStats();
        if (data) setStats(data);
      } catch (e) {
        console.warn('Using admin demo stats');
      }
    };
    loadStats();
  }, []);

  return (
    <div style={{ padding: '20px 24px 80px', maxWidth: '1020px', margin: '0 auto' }}>
      {/* Navigation */}
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
          <span>Back to Adventure</span>
        </button>

        <div className="glass-panel" style={{
          padding: '8px 20px',
          background: 'white',
          borderRadius: '9999px',
          fontWeight: 800,
          fontSize: '1.05rem',
          color: '#e11d48',
          border: '2px solid #fecdd3'
        }}>
          🛡️ Administrator Control Center
        </div>
      </div>

      {/* Hero Stats */}
      <div className="glass-panel" style={{
        padding: '32px',
        borderRadius: '32px',
        background: 'linear-gradient(135deg, #ffe4e6, #fecdd3)',
        marginBottom: '28px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
          <Shield size={32} color="#e11d48" />
          <h2 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#881337' }}>
            System Analytics & Content Management
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {[
            { label: 'Registered Users', val: stats.totalUsers, icon: <Users size={22} color="#e11d48" /> },
            { label: 'Educational Activities', val: stats.totalActivities, icon: <BookOpen size={22} color="#e11d48" /> },
            { label: 'Total Quests Completed', val: stats.totalAttempts, icon: <Award size={22} color="#e11d48" /> },
            { label: 'Circulating Coins', val: `${stats.totalCoinsCirculating} 🪙`, icon: <Database size={22} color="#e11d48" /> },
          ].map((item, idx) => (
            <div key={idx} className="glass-panel" style={{ padding: '18px', background: 'white', borderRadius: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                {item.icon}
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748b' }}>{item.label}</span>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0f172a' }}>{item.val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Content & System Management Modules */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* Activity Manager */}
        <div className="glass-panel" style={{ padding: '24px', background: 'white', borderRadius: '28px', border: '3px solid #e2e8f0' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1e293b', marginBottom: '14px' }}>
            📚 Educational Modules Active
          </h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>🧮 Math Island (Fruit Counting, Scales)</span>
              <span style={{ color: '#16a34a', fontWeight: 800 }}>Active</span>
            </li>
            <li style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>🔍 Mystery House (Detective Clues)</span>
              <span style={{ color: '#16a34a', fontWeight: 800 }}>Active</span>
            </li>
            <li style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>💻 Coding Lab (Block Algorithms)</span>
              <span style={{ color: '#16a34a', fontWeight: 800 }}>Active</span>
            </li>
            <li style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>🧠 Brain Forest (Memory Pairs)</span>
              <span style={{ color: '#16a34a', fontWeight: 800 }}>Active</span>
            </li>
          </ul>
        </div>

        {/* User Roles & Security */}
        <div className="glass-panel" style={{ padding: '24px', background: 'white', borderRadius: '28px', border: '3px solid #e2e8f0' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1e293b', marginBottom: '14px' }}>
            👥 Security & Demo Roles
          </h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '14px', display: 'flex', justifyContent: 'space-between' }}>
              <span>⭐ leo_explorer (Child Profile)</span>
              <span style={{ color: '#0284c7', fontWeight: 800 }}>ROLE_CHILD</span>
            </li>
            <li style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '14px', display: 'flex', justifyContent: 'space-between' }}>
              <span>👨‍👩‍👧 parent_sarah (Parent Monitor)</span>
              <span style={{ color: '#0d9488', fontWeight: 800 }}>ROLE_PARENT</span>
            </li>
            <li style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '14px', display: 'flex', justifyContent: 'space-between' }}>
              <span>🛡️ admin (Platform Master)</span>
              <span style={{ color: '#e11d48', fontWeight: 800 }}>ROLE_ADMIN</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
