import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabase/supabaseClient.js';
import { authAPI } from '../api/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On app load: if a Supabase session exists, sync the token and fetch profile from backend
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          localStorage.setItem('agrichain_token', session.access_token);
          const profile = await authAPI.getProfile();
          setUser(profile);
        }
      } catch (err) {
        console.error('Auth init error:', err);
        localStorage.removeItem('agrichain_token');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Keep agrichain_token in sync when Supabase refreshes the JWT
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      try {
        if (event === 'TOKEN_REFRESHED' && session) {
          localStorage.setItem('agrichain_token', session.access_token);
        } else if (event === 'SIGNED_OUT') {
          localStorage.removeItem('agrichain_token');
          setUser(null);
        }
      } catch (err) {
        console.error('Auth state change error:', err);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = useCallback(async (email, password) => {
    // Route through backend — backend does Supabase signIn + profile fetch
    const { token, refreshToken, user: userData } = await authAPI.login(email, password);

    localStorage.setItem('agrichain_token', token);

    // Sync Supabase client so it can auto-refresh the token later
    if (refreshToken) {
      await supabase.auth.setSession({ access_token: token, refresh_token: refreshToken });
    }

    setUser(userData);
    return userData;
  }, []);

  const logout = useCallback(async () => {
    localStorage.removeItem('agrichain_token');
    await supabase.auth.signOut();
    setUser(null);
  }, []);

  const register = useCallback(async ({ email, password, fullName, role, phoneNo, address, dob }) => {
    // Route through backend — backend does Supabase signUp + profile insert
    const { token, refreshToken, user: userData } = await authAPI.register({
      name: fullName,
      email,
      password,
      role,
      phoneNo,
      address,
      dob,
    });

    localStorage.setItem('agrichain_token', token);

    // Sync Supabase client for session management
    if (refreshToken) {
      await supabase.auth.setSession({ access_token: token, refresh_token: refreshToken });
    }

    setUser(userData);
    return userData;
  }, []);

  const updateUser = useCallback((updates) => {
    setUser(prev => prev ? { ...prev, ...updates } : prev);
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      register,
      updateUser,
      isAuthenticated: !!user,
      loading
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
