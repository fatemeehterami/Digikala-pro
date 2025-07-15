// AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [mobile, setMobile] = useState(null);

  useEffect(() => {
    const savedMobile = localStorage.getItem('mobile');
    if (savedMobile) {
      setMobile(savedMobile);
    }
  }, []);

  const login = (mobileNumber) => {
    setMobile(mobileNumber);
    localStorage.setItem('mobile', mobileNumber);
  };

  const logout = () => {
    setMobile(null);
    localStorage.removeItem('mobile');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ mobile, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
