import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/User/Home'; // We'll create these later
import ProductDetails from './pages/User/ProductDetails';
import TrackOrder from './pages/User/TrackOrder';
import Dashboard from './pages/Admin/Dashboard';
import GenerateTracking from './pages/Admin/GenerateTracking';
import UpdateStatus from './pages/Admin/UpdateStatus';

function App() {
  return (
    <Router>
      <div>

        {/* Define the routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/track" element={<TrackOrder />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/generate-tracking" element={<GenerateTracking />} />
          <Route path="/admin/update-status" element={<UpdateStatus />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;