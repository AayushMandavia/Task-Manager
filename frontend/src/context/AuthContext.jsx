import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for existing session
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
      setUser({ email: savedEmail });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check if user exists in local DB
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (!users[email] || users[email] !== password) {
      throw { response: { data: { detail: 'Invalid email or password. Please sign up if you do not have an account.' } } };
    }

    localStorage.setItem('token', 'mock-jwt-token');
    localStorage.setItem('userEmail', email);
    setUser({ email });
  };

  const register = async (email, password) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[email]) {
      throw { response: { data: { detail: 'Account already exists! Please sign in.' } } };
    }
    
    // Save user
    users[email] = password;
    localStorage.setItem('users', JSON.stringify(users));
    
    return login(email, password);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
