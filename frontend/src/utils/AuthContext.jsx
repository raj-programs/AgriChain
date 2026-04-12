import { createContext, useContext, useState, useCallback } from 'react';
import { authAPI } from '../api/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('agrichain_user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = useCallback(async (email, password, role) => {
    const { token, user: userData } = await authAPI.login(email, password, role);
    localStorage.setItem('agrichain_token', token);
    localStorage.setItem('agrichain_user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('agrichain_token');
    localStorage.removeItem('agrichain_user');
    setUser(null);
  }, []);

  const register = useCallback(async (data) => {
    const { token, user: userData } = await authAPI.register(data);
    localStorage.setItem('agrichain_token', token);
    localStorage.setItem('agrichain_user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  }, []);

  const updateUser = useCallback((updatedData) => {
    const updated = { ...user, ...updatedData };
    localStorage.setItem('agrichain_user', JSON.stringify(updated));
    setUser(updated);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout, register, updateUser, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
