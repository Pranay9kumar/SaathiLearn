import React, { createContext, useState, useEffect } from 'react';
import { getMe } from '../api/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem('saathilearn_token');
  const initialToken = storedToken && storedToken !== 'undefined' && storedToken !== 'null' ? storedToken : null;
  if (!initialToken && storedToken) {
    localStorage.removeItem('saathilearn_token');
  }

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(initialToken);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
