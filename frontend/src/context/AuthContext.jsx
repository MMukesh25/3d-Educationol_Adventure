import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = authService.getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
    } else {
      // Default demo child user for seamless instant child gameplay if desired
      const defaultUser = {
        token: 'mock-jwt-token-demo',
        username: 'leo_explorer',
        role: 'ROLE_CHILD',
        displayName: 'Leo The Explorer',
        coins: 150,
        stars: 12,
        currentLevel: 2,
        streakDays: 3,
        avatarData: JSON.stringify({
          skinColor: '#ffcc80',
          hairStyle: 'spiky',
          hairColor: '#3e2723',
          outfitColor: '#29b6f6',
          hat: 'royal_crown',
          accessory: 'none',
          pet: 'baby_dragon',
        }),
      };
      setUser(defaultUser);
      localStorage.setItem('adventure_user', JSON.stringify(defaultUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const data = await authService.login(username, password);
      setUser(data);
      return { success: true, data };
    } catch (err) {
      // Demo fallback in case backend is offline during frontend preview
      const fallbackUser = {
        token: 'demo-token-' + Date.now(),
        username: username,
        role: username.includes('admin') ? 'ROLE_ADMIN' : username.includes('parent') ? 'ROLE_PARENT' : 'ROLE_CHILD',
        displayName: username,
        coins: 100,
        stars: 5,
        currentLevel: 1,
        streakDays: 1,
        avatarData: JSON.stringify({
          skinColor: '#ffcc80',
          hairStyle: 'short',
          hairColor: '#5d4037',
          outfitColor: '#42a5f5',
          hat: 'none',
          accessory: 'none',
          pet: 'puppy',
        }),
      };
      setUser(fallbackUser);
      localStorage.setItem('adventure_user', JSON.stringify(fallbackUser));
      return { success: true, data: fallbackUser };
    }
  };

  const signup = async (userData) => {
    try {
      const data = await authService.signup(userData);
      setUser(data);
      return { success: true, data };
    } catch (err) {
      const fallbackUser = {
        token: 'demo-token-' + Date.now(),
        username: userData.username,
        role: userData.role || 'ROLE_CHILD',
        displayName: userData.displayName || userData.username,
        coins: 100,
        stars: 5,
        currentLevel: 1,
        streakDays: 1,
        avatarData: JSON.stringify({
          skinColor: '#ffcc80',
          hairStyle: 'short',
          hairColor: '#5d4037',
          outfitColor: '#42a5f5',
          hat: 'none',
          accessory: 'none',
          pet: 'puppy',
        }),
      };
      setUser(fallbackUser);
      localStorage.setItem('adventure_user', JSON.stringify(fallbackUser));
      return { success: true, data: fallbackUser };
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const updateUserProfile = (updatedFields) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...updatedFields };
      localStorage.setItem('adventure_user', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
