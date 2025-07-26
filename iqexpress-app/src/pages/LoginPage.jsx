// iqexpress-app/src/pages/Auth/LoginPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext"; // Import useAuth hook

function LoginPage() {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Get the loginUser function from AuthContext
  const { loginUser } = useAuth(); // Use the auth context here!

  // No need for useNavigate directly in this function anymore if AuthContext handles it,
  // but it's fine to keep if other parts of LoginPage use it.
  // const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Clear previous errors

    try {
      // Call the central loginUser function from AuthContext
      // This function already handles the fetch, token storage, and redirection
      const result = await loginUser({ emailOrUsername, password });

      if (!result.success) {
        throw new Error(result.message || 'Login failed via AuthContext.');
      }

      // If loginUser handles navigation internally, you don't need navigate here.
      // If AuthContext's loginUser returns success but doesn't navigate (e.g., for user types),
      // then you might add a fallback navigate here.
      // For now, let's assume AuthContext handles all navigation.

      console.log('Login request sent to AuthContext successfully.');

    } catch (err) {
      setError(err.message || 'An unexpected error occurred during login.');
      console.error('Login error in LoginPage:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-page py-5 bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow-sm p-4">
              <h2 className="text-center mb-4">Admin Login</h2>
              <form onSubmit={handleSubmit}>
                {error && <div className="alert alert-danger">{error}</div>}

                <div className="mb-3">
                  <label htmlFor="emailOrUsername" className="form-label">Email or Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="emailOrUsername"
                    value={emailOrUsername}
                    onChange={(e) => setEmailOrUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;