// ============================================================
// GEMPAR v2.1 — useAuth Hook
// Auth operations: login, logout, refresh, check session
// ============================================================

import { useCallback, useEffect, useState } from 'react';
import { useAuthStore } from '@/store';
import { getSupabaseBrowser } from '@/lib/supabase/client';
import type { User, Role } from '@/types';

export function useAuth() {
  const {
    user,
    isAuthenticated,
    role,
    isLoading,
    setUser,
    setToken,
    setRole,
    setAuthenticated,
    setLoading,
    logout: storeLogout,
  } = useAuthStore();

  const [error, setError] = useState<string | null>(null);

  // Check session on mount
  useEffect(() => {
    async function checkSession() {
      setLoading(true);
      try {
        const supabase = getSupabaseBrowser();
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError || !session) {
          setAuthenticated(false);
          setUser(null);
          setRole(null);
          return;
        }

        const { data: { user: authUser }, error: userError } = await supabase.auth.getUser();
        if (userError || !authUser) {
          setAuthenticated(false);
          setUser(null);
          setRole(null);
          return;
        }

        // Map Supabase user to GEMPAR User type
        const mappedUser: User = {
          id: authUser.id,
          email: authUser.email || '',
          nama_lengkap: authUser.user_metadata?.nama_lengkap || '',
          role: (authUser.user_metadata?.role as Role) || 'anggota',
          created_at: authUser.created_at,
          updated_at: authUser.updated_at || authUser.created_at,
        };

        setUser(mappedUser);
        setRole(mappedUser.role);
        setToken(session.access_token);
        setAuthenticated(true);
      } catch (err) {
        console.error('Auth check error:', err);
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }

    checkSession();
  }, [setUser, setRole, setToken, setAuthenticated, setLoading]);

  // Login
  const login = useCallback(
    async (email: string, password: string) => {
      setError(null);
      setLoading(true);
      try {
        const supabase = getSupabaseBrowser();
        const { data, error: loginError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (loginError) throw loginError;
        if (!data.user || !data.session) throw new Error('Login gagal');

        const mappedUser: User = {
          id: data.user.id,
          email: data.user.email || '',
          nama_lengkap: data.user.user_metadata?.nama_lengkap || '',
          role: (data.user.user_metadata?.role as Role) || 'anggota',
          created_at: data.user.created_at,
          updated_at: data.user.updated_at || data.user.created_at,
        };

        setUser(mappedUser);
        setRole(mappedUser.role);
        setToken(data.session.access_token);
        setRefreshToken(data.session.refresh_token);
        setAuthenticated(true);

        return { success: true };
      } catch (err: any) {
        const message = err.message || 'Login gagal. Silakan coba lagi.';
        setError(message);
        return { success: false, error: message };
      } finally {
        setLoading(false);
      }
    },
    [setUser, setRole, setToken, setAuthenticated, setLoading]
  );

  // Logout
  const logout = useCallback(async () => {
    setLoading(true);
    try {
      const supabase = getSupabaseBrowser();
      await supabase.auth.signOut();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      storeLogout();
      setLoading(false);
    }
  }, [storeLogout, setLoading]);

  // Refresh token
  const refreshToken = useCallback(async () => {
    try {
      const supabase = getSupabaseBrowser();
      const { data, error } = await supabase.auth.refreshSession();
      if (error || !data.session) {
        logout();
        return false;
      }
      setToken(data.session.access_token);
      return true;
    } catch {
      logout();
      return false;
    }
  }, [setToken, logout]);

  return {
    user,
    isAuthenticated,
    role,
    isLoading,
    error,
    login,
    logout,
    refreshToken,
  };
}

// Helper untuk setRefreshToken (diperlukan oleh login)
function setRefreshToken(token: string) {
  useAuthStore.getState().setRefreshToken(token);
}
