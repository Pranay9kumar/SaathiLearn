import React, { createContext, useState, useEffect } from 'react';
import { getMe } from '../api/auth';

// ⚠️ DEV ONLY: Set to true to bypass auth and preview
const DEV_ADMIN_MODE = false;
const DEV_STUDENT_MODE = false;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem('saathilearn_token');
  const initialToken = storedToken && storedToken !== 'undefined' && storedToken !== 'null' ? storedToken : null;
  if (!initialToken && storedToken) {
    localStorage.removeItem('saathilearn_token');
  }

  const devMode = DEV_ADMIN_MODE || DEV_STUDENT_MODE;
  const devUser = DEV_ADMIN_MODE ? { name: 'NGO Admin', role: 'ADMIN', email: 'admin@saathi.in' } : DEV_STUDENT_MODE ? { name: 'Rahul Verma', role: 'STUDENT', email: 'rahul@saathi.in' } : null;
  const [user, setUser] = useState(devMode ? devUser : null);
  const [token, setToken] = useState(devMode ? 'dev-token' : initialToken);
  const [loading, setLoading] = useState(devMode ? false : true);

  useEffect(() => {
    if (devMode) return;
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
