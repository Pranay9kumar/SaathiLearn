import React, { createContext, useState, useEffect } from 'react';
import { getMe } from '../api/auth';

// ⚠️ DEV ONLY: Set to true to bypass auth and preview as ADMIN
const DEV_ADMIN_MODE = false;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem('saathilearn_token');
  const initialToken = storedToken && storedToken !== 'undefined' && storedToken !== 'null' ? storedToken : null;
  if (!initialToken && storedToken) {
    localStorage.removeItem('saathilearn_token');
  }

  const [user, setUser] = useState(DEV_ADMIN_MODE ? { name: 'NGO Admin', role: 'ADMIN', email: 'admin@saathi.in' } : null);
  const [token, setToken] = useState(DEV_ADMIN_MODE ? 'dev-token' : initialToken);
  const [loading, setLoading] = useState(DEV_ADMIN_MODE ? false : true);

  useEffect(() => {
    if (DEV_ADMIN_MODE) return;
    const initAuth = async () => {
      if (token) {
        try {
          const profile = await getMe();
          setUser(profile);
        } catch (err) {
          console.error("Failed to fetch user:", err);
          logout();
        }
      }
      setLoading(false);
    };
    initAuth();
  }, [token]);

  const loginUser = (newToken, userData) => {
    localStorage.setItem('saathilearn_token', newToken);
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('saathilearn_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
