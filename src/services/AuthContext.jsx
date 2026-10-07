import React, { createContext, useContext, useEffect, useState } from 'react'
import { fetchWithAuth, login as apiLogin } from './api'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadUserProfile = async () => {
    try {
      const data = await fetchWithAuth('/api/v1/auth/me/');
      if (data && data.id) {
        setUser({ id: data.id, email: data.email });
        setProfile(data);
      } else {
        setUser(null);
        setProfile(null);
      }
    } catch (error) {
      console.error("Error loading profile:", error);
      setUser(null);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      loadUserProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      await apiLogin(email, password);
      await loadUserProfile();
    } catch (error) {
      setLoading(false);
      throw error;
    }
  }

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
    setProfile(null);
    window.location.href = '/onboarding';
  }

  return (
    <AuthContext.Provider value={{ user, profile, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
