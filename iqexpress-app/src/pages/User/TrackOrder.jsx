import React, { useState } from 'react';

function TrackOrder() {
  const [trackingNumberInput, setTrackingNumberInput] = useState('');
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setTrackingNumberInput(event.target.value);
  };

  const handleTrackSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    if (!trackingNumberInput) {
      setError('Please enter a tracking number.');
      setTrackingData(null);
      return;
    }

    setLoading(true);
    setError('');
    setTrackingData(null); // Clear previous tracking data

    try {
      // Make API call to your Node.js backend
      const response = await fetch(`/api/track?trackingNumber=${trackingNumberInput}`); // Using GET for tracking lookup

      if (!response.ok) {
        // If response is not 2xx, it's an error
        const errorData = await response.json(); // Try to parse error message from backend
        throw new Error(errorData.message || 'Could not fetch tracking information. Please try again.');
      }

      const data = await response.json();
      if (data && data.trackingNumber) { // Ensure tracking data is returned
        setTrackingData(data);
      } else {
        setError('Tracking number not found or no details available.');
      }

    } catch (err) {
      console.error('Error tracking order:', err);
      setError(err.message || 'An unexpected error occurred while tracking your order.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Track Your Order</h2>

      <form onSubmit={handleTrackSubmit} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Enter your tracking number"
            value={trackingNumberInput}
            onChange={handleInputChange}
            disabled={loading}
            required
          />
          <button
            type="submit"
            className="btn btn-primary btn-lg"
            disabled={loading}
          >
            {loading ? 'Tracking...' : 'Track'}
          </button>
        </div>
        {error && <div className="text-danger mt-2">{error}</div>}
      </form>

      {trackingData && (
        <div className="card shadow-sm">
          <div className="card-header bg-primary text-white">
            <h3>Tracking Details for: {trackingData.trackingNumber}</h3>
          </div>
          <div className="card-body">
            <p><strong>Status:</strong> <span className={`badge ${trackingData.status === 'Delivered' ? 'bg-success' : 'bg-warning text-dark'}`}>{trackingData.status}</span></p>
            <p><strong>Last Updated:</strong> {new Date(trackingData.updatedAt).toLocaleString()}</p>
            {trackingData.productId && <p><strong>Product ID:</strong> {trackingData.productId}</p>}
            {/* Add more details as your backend provides them, e.g., location history */}
            {trackingData.locationHistory && trackingData.locationHistory.length > 0 && (
              <div>
                <h4>History:</h4>
                <ul className="list-group list-group-flush">
                  {trackingData.locationHistory.map((item, index) => (
                    <li key={index} className="list-group-item">
                      <strong>{new Date(item.timestamp).toLocaleString()}:</strong> {item.location} - {item.statusUpdate}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {!trackingData && !loading && !error && (
        <div className="alert alert-info text-center" role="alert">
          Enter a tracking number above to see your shipment's status.
        </div>
      )}
    </div>
  );
}

export default TrackOrder;