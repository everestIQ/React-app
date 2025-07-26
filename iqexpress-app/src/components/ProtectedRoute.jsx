// iqexpress-app/src/components/ProtectedRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isLoggedIn, userRole, loading } = useAuth();

  console.log('ProtectedRoute rendered:'); // <--- ADD THIS LOG
  console.log('  isLoggedIn:', isLoggedIn); // <--- ADD THIS LOG
  console.log('  userRole:', userRole);     // <--- ADD THIS LOG
  console.log('  loading (from AuthContext):', loading); // <--- ADD THIS LOG
  console.log('  Required Role:', requiredRole); // <--- ADD THIS LOG

  if (loading) {
    console.log('ProtectedRoute: AuthContext is still loading, showing loading message.'); // <--- ADD THIS LOG
    return <div>Loading authentication...</div>;
  }

  if (!isLoggedIn) {
    console.log('ProtectedRoute: Not logged in, redirecting to /login.'); // <--- ADD THIS LOG
    return <Navigate to="/login" replace />;
  }

  // Optional: Check for specific roles
  if (requiredRole && userRole !== requiredRole) {
    console.log(`ProtectedRoute: Logged in but role mismatch. User: ${userRole}, Required: ${requiredRole}. Redirecting to /.`); // <--- ADD THIS LOG
    return <Navigate to="/" replace />;
  }

  console.log('ProtectedRoute: User is authorized, rendering children.'); // <--- ADD THIS LOG
  return children;
};

export default ProtectedRoute;