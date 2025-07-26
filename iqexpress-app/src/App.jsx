// iqexpress-app/src/App.jsx

import { Routes, Route, useLocation } from 'react-router-dom'; // <--- Ensure useLocation is here
import Navbar from './components/Layout/Navigation';
import Footer from './components/Layout/Footer';
import Home from './pages/User/Home';
import About from './pages/User/About';
import Services from './pages/User/Services';
import TrackOrder from './pages/User/TrackOrder';
import Contact from './pages/User/Contact';
import AdminDashboard from './pages/Admin/Dashboard';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const location = useLocation(); // <--- This line
  console.log('App.jsx rendering, current path:', location.pathname); // <--- And this line

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/track" element={<TrackOrder />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;