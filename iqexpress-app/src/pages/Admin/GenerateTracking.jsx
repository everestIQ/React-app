import React, { useState } from 'react';
import random from 'random';

function GenerateTracking() {
  const [productId, setProductId] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setProductId(event.target.value);
  };

  const handleGenerateTracking = async () => {
    setLoading(true);
    setError('');
    setTrackingNumber('');

    try {

    
       const response = await fetch('/api/admin/generate-tracking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }), // Send product ID to backend if needed
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to generate tracking number');
      }

      const data = await response.json();
      setTrackingNumber(data.trackingNumber);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Generate Tracking Number</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleGenerateTracking(); }}>
        <div className="mb-3">
          <label htmlFor="productId" className="form-label">Product ID (Optional)</label>
          <input
            type="text"
            className="form-control"
            id="productId"
            value={productId}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Tracking Number'}
        </button>
      </form>

      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {trackingNumber && (
        <div className="alert alert-success mt-3">
          Tracking Number Generated: <strong>{trackingNumber}</strong>
        </div>
      )}
    </div>
  );
}

export default GenerateTracking;