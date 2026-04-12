import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabase/supabaseClient.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize: Check for an existing session when the app loads
  useEffect(() => {
    const initializeAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // Fetch the role from the profiles table for the existing session
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        setUser({ ...session.user, ...profile });
      }
      setLoading(false);
    };

    initializeAuth();

    // Listen for auth changes (sign in, sign out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        setUser({ ...session.user, ...profile });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = useCallback(async (email, password) => {
    // 1. Auth Login
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // 2. Role Detection (Fetch from profiles table)
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single();

    if (profileError) throw profileError;

    // Return the combined object so your Login.js can navigate
    const userData = { ...data.user, role: profile.role };
    setUser(userData);
    return userData;
  }, []);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
  }, []);

  const register = useCallback(async ({ email, password, fullName, role, phoneNo, address, dob }) => {
    // 1. Sign up the user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName }
      }
    });

    if (error) throw error;

    // 2. Create profile in profiles table with role and additional info
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: data.user.id,
        role: role,
        full_name: fullName,
        phone_no: phoneNo,
        address: address,
        email: email,
        dob: dob
      });

    if (profileError) throw profileError;

    // Return user with role for immediate navigation
    return { ...data.user, role };
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      register, 
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