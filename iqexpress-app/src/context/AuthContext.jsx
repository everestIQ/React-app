// iqexpress-app/src/context/AuthContext.jsx

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Ensure this is correctly imported

// 1. IMPORTANT FIX: Define a default structured object for the context
const AuthContext = createContext({
  user: null,
  token: null,
  isLoggedIn: false,        // Default to false
  userRole: undefined,      // Default to undefined
  loading: true,            // Default to true
  loginUser: async () => {}, // Provide dummy functions
  logoutUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const decodeToken = useCallback((t) => {
    try {
      const decoded = jwtDecode(t);
      return {
        id: decoded.user.id,
        role: decoded.user.role,
        email: decoded.user.email,
      };
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }, []);

  useEffect(() => {
    console.log('AuthContext: useEffect running. Token present:', !!token);
    const loadUserFromToken = () => {
      if (token) {
        const decoded = decodeToken(token);
        if (decoded) {
          setUser(decoded);
          console.log('AuthContext: Initial load - User set:', decoded);
        } else {
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
          console.log('AuthContext: Invalid token found, cleared.');
        }
      } else {
        setUser(null);
        console.log('AuthContext: No token found on initial load.');
      }
      setLoading(false);
      console.log('AuthContext: Loading complete.');
    };
    loadUserFromToken();
  }, [token, decodeToken]);

  const isLoggedIn = !!user; // This will now always be true or false

  const loginUser = useCallback(async (credentials) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      console.log('Login API response data:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('token', data.token);
      setToken(data.token); // Will trigger useEffect, but setUser is also done here
      const decodedUser = decodeToken(data.token);
      setUser(decodedUser); // Set user state immediately for correct propagation

      console.log('Login successful! Token stored.');
      console.log('Decoded user after login:', decodedUser);
      console.log('User role after login:', decodedUser?.role);

      if (decodedUser && decodedUser.role === 'admin') {
        console.log('AuthContext: Attempting redirect to /admin/dashboard');
        navigate('/admin/dashboard');
      } else {
        console.log('AuthContext: Attempting redirect to /');
        navigate('/');
      }

    } catch (error) {
      console.error('Login error:', error.message);
      alert('Login failed: ' + error.message);
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
    }
  }, [decodeToken, navigate]);

  const logoutUser = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    navigate('/login');
  }, [navigate]);

  const authContextValue = useMemo(() => ({
    user,
    token,
    isLoggedIn,
    userRole: user?.role,
    loading,
    loginUser,
    logoutUser,
  }), [user, token, isLoggedIn, loading, loginUser, logoutUser]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};