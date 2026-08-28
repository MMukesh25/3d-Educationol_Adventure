import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { GameProvider } from './context/GameContext';
import Navbar from './components/common/Navbar';
import FloatingHUD from './components/common/FloatingHUD';
import CelebrationModal from './components/common/CelebrationModal';

import AdventureHome from './pages/AdventureHome';
import MathIsland from './pages/MathIsland';
import MysteryHouse from './pages/MysteryHouse';
import CodingLab from './pages/CodingLab';
import BrainForest from './pages/BrainForest';
import PuzzleCastle from './pages/PuzzleCastle';
import CreativityZone from './pages/CreativityZone';
import ShopPage from './pages/ShopPage';
import AchievementsPage from './pages/AchievementsPage';
import ParentDashboard from './pages/ParentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function AppContent() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <FloatingHUD />
      <CelebrationModal />

      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<AdventureHome />} />
          <Route path="/math" element={<MathIsland />} />
          <Route path="/mystery" element={<MysteryHouse />} />
          <Route path="/coding" element={<CodingLab />} />
          <Route path="/brain" element={<BrainForest />} />
          <Route path="/puzzle" element={<PuzzleCastle />} />
          <Route path="/creative" element={<CreativityZone />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/parent" element={<ParentDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <GameProvider>
          <AppContent />
        </GameProvider>
      </AuthProvider>
    </Router>
  );
}
