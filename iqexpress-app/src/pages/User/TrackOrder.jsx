// iqexpress-app/src/pages/TrackOrder.jsx

import React, { useState } from 'react';
// import Fade from 'react-reveal/Fade'; // Removed if not used

function TrackOrder() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [shipmentData, setShipmentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTrackSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior (page reload)
    setLoading(true);
    setError(null);
    setShipmentData(null); // Clear previous data

    try {
      // --- UPDATED FETCH CALL HERE ---
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/track/${trackingNumber}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch shipment details.');
      }

      setShipmentData(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching shipment:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="track-order py-5 bg-light">
      <div className="container">
        {/* Removed Fade components if not used */}
        <h2 className="text-center mb-4">Track Your Shipment</h2>
        <p className="text-center lead mb-5">
          Enter your tracking number below to get the latest status update on your package.
        </p>

        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">
                <form onSubmit={handleTrackSubmit}>
                  <div className="mb-3">
                    <label htmlFor="trackingNumber" className="form-label">Tracking Number</label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="trackingNumber"
                      placeholder="e.g., IQX123456789"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      required
                    />
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                      {loading ? 'Tracking...' : 'Track Shipment'}
                    </button>
                  </div>
                </form>

                {loading && (
                  <div className="text-center mt-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">Loading shipment data...</p>
                  </div>
                )}

                {error && (
                  <div className="alert alert-danger mt-4" role="alert">
                    {error}
                  </div>
                )}

                {shipmentData && (
                  <div className="mt-4 p-3 bg-white border rounded">
                    <h4 className="mb-3 text-primary">Shipment Details</h4>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <strong>Tracking Number:</strong>
                        <span>{shipmentData.trackingNumber}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <strong>Current Status:</strong>
                        <span className={`badge ${
                            shipmentData.status === 'Delivered' ? 'bg-success' :
                            shipmentData.status === 'In Transit' ? 'bg-info' :
                            'bg-warning'
                          }`}>{shipmentData.status}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <strong>Origin:</strong>
                        <span>{shipmentData.origin}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <strong>Destination:</strong>
                        <span>{shipmentData.destination}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <strong>Sender:</strong>
                        <span>{shipmentData.senderName || 'N/A'}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <strong>Receiver:</strong>
                        <span>{shipmentData.receiverName}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <strong>Weight:</strong>
                        <span>{shipmentData.weight} kg</span>
                      </li>
                      <li className="list-group-item">
                        <strong>Location History:</strong>
                        {shipmentData.locationHistory && shipmentData.locationHistory.length > 0 ? (
                          <ul className="list-group list-group-flush mt-2">
                            {shipmentData.locationHistory.map((entry, index) => (
                              <li key={index} className="list-group-item py-1">
                                <small>
                                  <strong>{new Date(entry.timestamp).toLocaleString()}:</strong> {entry.location} - {entry.statusUpdate}
                                </small>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-muted mt-2">No detailed location history available yet.</p>
                        )}
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <strong>Last Updated:</strong>
                        <span>{new Date(shipmentData.updatedAt).toLocaleString()}</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrackOrder;