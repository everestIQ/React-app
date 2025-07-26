// iqexpress-app/src/pages/admin/Dashboard.jsx

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

function AdminDashboard() {
  const { token } = useAuth();
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for the new shipment form
  const [newShipment, setNewShipment] = useState({
    trackingNumber: '',
    status: 'Pending',
    origin: '',
    destination: '',
    senderName: '',
    receiverName: '',
    weight: '',
    dimensions: '',
    locationHistory: '[]' // Initialize as stringified empty array for text area
  });
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // --- States for Edit Modal ---
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentShipmentToEdit, setCurrentShipmentToEdit] = useState(null); // Stores the shipment being edited
  const [editFormError, setEditFormError] = useState(null);
  const [editFormSuccess, setEditFormSuccess] = useState(null);
  const [updating, setUpdating] = useState(false);


  // Function to fetch all shipments
  const fetchShipments = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/shipments`, { // UPDATED HERE
        headers: {
          'x-auth-token': token
        }
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch shipments.');
      }
      setShipments(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching shipments:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch shipments on component mount or when token changes
  useEffect(() => {
    if (token) {
      fetchShipments();
    } else {
      setLoading(false);
      setError('Not authenticated. Please log in.');
    }
  }, [token]);

  // Handle input changes for the Add Shipment form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewShipment({ ...newShipment, [name]: value });
  };

  // Handle new shipment form submission
  const handleAddShipmentSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);
    setFormSuccess(null);

    try {
        if (!newShipment.trackingNumber || !newShipment.origin || !newShipment.destination || !newShipment.receiverName || !newShipment.weight) {
            throw new Error('Please fill in all required fields (Tracking No., Origin, Destination, Receiver, Weight).');
        }

        let parsedLocationHistory = [];
        try {
            if (newShipment.locationHistory && newShipment.locationHistory.trim() !== '') {
                parsedLocationHistory = JSON.parse(newShipment.locationHistory);
                if (!Array.isArray(parsedLocationHistory)) {
                    throw new Error('Location History must be a valid JSON array.');
                }
            }
        } catch (jsonError) {
            throw new Error(`Invalid Location History JSON: ${jsonError.message}`);
        }

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/shipments`, { // UPDATED HERE
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify({
            ...newShipment,
            weight: parseFloat(newShipment.weight),
            locationHistory: parsedLocationHistory
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to add shipment.');
      }

      setFormSuccess('Shipment added successfully!');
      setNewShipment({
        trackingNumber: '', status: 'Pending', origin: '', destination: '',
        senderName: '', receiverName: '', weight: '', dimensions: '', locationHistory: '[]'
      });
      fetchShipments(); // Refresh the list
    } catch (err) {
      setFormError(err.message);
      console.error('Error adding shipment:', err);
    } finally {
      setSubmitting(false);
    }
  };

  // --- Edit Modal Functions ---
  const handleEditClick = (shipment) => {
    // Convert locationHistory array back to stringified JSON for the textarea
    setCurrentShipmentToEdit({
      ...shipment,
      locationHistory: JSON.stringify(shipment.locationHistory || [])
    });
    setShowEditModal(true);
    setEditFormError(null); // Clear previous errors
    setEditFormSuccess(null); // Clear previous success
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setCurrentShipmentToEdit(null); // Clear the selected shipment
  };

  // Handle input changes for the Edit Shipment form
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentShipmentToEdit({ ...currentShipmentToEdit, [name]: value });
  };

  // Handle update shipment form submission
  const handleUpdateShipmentSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setEditFormError(null);
    setEditFormSuccess(null);

    try {
        if (!currentShipmentToEdit.trackingNumber || !currentShipmentToEdit.origin || !currentShipmentToEdit.destination || !currentShipmentToEdit.receiverName || !currentShipmentToEdit.weight) {
            throw new Error('Please fill in all required fields (Tracking No., Origin, Destination, Receiver, Weight).');
        }

        let parsedLocationHistory = [];
        try {
            if (currentShipmentToEdit.locationHistory && currentShipmentToEdit.locationHistory.trim() !== '') {
                parsedLocationHistory = JSON.parse(currentShipmentToEdit.locationHistory);
                if (!Array.isArray(parsedLocationHistory)) {
                    throw new Error('Location History must be a valid JSON array.');
                }
            }
        } catch (jsonError) {
            throw new Error(`Invalid Location History JSON: ${jsonError.message}`);
        }

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/shipments/${currentShipmentToEdit.trackingNumber}`, { // UPDATED HERE
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify({
          ...currentShipmentToEdit,
          weight: parseFloat(currentShipmentToEdit.weight), // Ensure weight is number
          locationHistory: parsedLocationHistory // Send parsed array
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update shipment.');
      }

      setEditFormSuccess('Shipment updated successfully!');
      fetchShipments(); // Refresh the list of shipments
      // No need to close modal immediately, let user see success message
      // setTimeout(() => setShowEditModal(false), 2000); // Optional: close after 2 seconds
    } catch (err) {
      setEditFormError(err.message);
      console.error('Error updating shipment:', err);
    } finally {
      setUpdating(false);
    }
  };


  return (
    <section className="admin-dashboard py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-4">Admin Dashboard</h2>
        <p className="text-center lead mb-5">
          Manage all shipments in the system.
        </p>

        {/* Add New Shipment Form */}
        <div className="card shadow-sm mb-5">
          <div className="card-header bg-primary text-white">
            <h4>Add New Shipment</h4>
          </div>
          <div className="card-body">
            <form onSubmit={handleAddShipmentSubmit}>
              {formSuccess && <div className="alert alert-success">{formSuccess}</div>}
              {formError && <div className="alert alert-danger">{formError}</div>}

              <div className="row g-3">
                  <div className="col-md-6">
                      <label htmlFor="trackingNumber" className="form-label">Tracking Number <span className="text-danger">*</span></label>
                      <input type="text" className="form-control" id="trackingNumber" name="trackingNumber" value={newShipment.trackingNumber} onChange={handleInputChange} required />
                  </div>
                  <div className="col-md-6">
                      <label htmlFor="status" className="form-label">Status <span className="text-danger">*</span></label>
                      <select className="form-select" id="status" name="status" value={newShipment.status} onChange={handleInputChange} required>
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="In Transit">In Transit</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Delayed">Delayed</option>
                          <option value="Cancelled">Cancelled</option>
                      </select>
                  </div>
                  <div className="col-md-6">
                      <label htmlFor="origin" className="form-label">Origin <span className="text-danger">*</span></label>
                      <input type="text" className="form-control" id="origin" name="origin" value={newShipment.origin} onChange={handleInputChange} required />
                  </div>
                  <div className="col-md-6">
                      <label htmlFor="destination" className="form-label">Destination <span className="text-danger">*</span></label>
                      <input type="text" className="form-control" id="destination" name="destination" value={newShipment.destination} onChange={handleInputChange} required />
                  </div>
                  <div className="col-md-6">
                      <label htmlFor="senderName" className="form-label">Sender Name</label>
                      <input type="text" className="form-control" id="senderName" name="senderName" value={newShipment.senderName} onChange={handleInputChange} />
                  </div>
                  <div className="col-md-6">
                      <label htmlFor="receiverName" className="form-label">Receiver Name <span className="text-danger">*</span></label>
                      <input type="text" className="form-control" id="receiverName" name="receiverName" value={newShipment.receiverName} onChange={handleInputChange} required />
                  </div>
                  <div className="col-md-6">
                      <label htmlFor="weight" className="form-label">Weight (kg) <span className="text-danger">*</span></label>
                      <input type="number" step="0.01" className="form-control" id="weight" name="weight" value={newShipment.weight} onChange={handleInputChange} required />
                  </div>
                  <div className="col-md-6">
                      <label htmlFor="dimensions" className="form-label">Dimensions (e.g., LxWxH cm)</label>
                      <input type="text" className="form-control" id="dimensions" name="dimensions" value={newShipment.dimensions} onChange={handleInputChange} />
                  </div>
                  <div className="col-12">
                      <label htmlFor="locationHistory" className="form-label">Location History (JSON Array String)</label>
                      <textarea className="form-control" id="locationHistory" name="locationHistory" rows="3" value={newShipment.locationHistory} onChange={handleInputChange} placeholder='e.g., [{"timestamp": "2025-07-15T10:00:00Z", "location": "Warehouse A", "statusUpdate": "Picked up"}]'></textarea>
                      <small className="form-text text-muted">Must be a valid JSON array string. Optional.</small>
                  </div>
              </div>
              <div className="d-grid mt-4">
                  <button type="submit" className="btn btn-success btn-lg" disabled={submitting}>
                      {submitting ? 'Adding Shipment...' : 'Add Shipment'}
                  </button>
              </div>
            </form>
          </div>
        </div>

        {/* Display Shipments Table */}
        <div className="card shadow-sm">
          <div className="card-header bg-primary text-white">
            <h4>All Shipments</h4>
          </div>
          <div className="card-body">
            {loading ? (
              <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Loading shipments data...</p>
              </div>
            ) : error ? (
              <div className="alert alert-danger" role="alert">
                Error: {error}
              </div>
            ) : shipments.length === 0 ? (
              <div className="alert alert-info">No shipments found. Add one above!</div>
            ) : (
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Tracking No.</th>
                      <th>Status</th>
                      <th>Origin</th>
                      <th>Destination</th>
                      <th>Receiver</th>
                      <th>Weight</th>
                      <th>Last Updated</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shipments.map((shipment) => (
                      <tr key={shipment.id}>
                        <td>{shipment.trackingNumber}</td>
                        <td>
                          <span className={`badge ${
                              shipment.status === 'Delivered' ? 'bg-success' :
                              shipment.status === 'In Transit' ? 'bg-info' :
                              'bg-warning'
                            }`}>
                            {shipment.status}
                          </span>
                        </td>
                        <td>{shipment.origin}</td>
                        <td>{shipment.destination}</td>
                        <td>{shipment.receiverName}</td>
                        <td>{shipment.weight} kg</td>
                        <td>{new Date(shipment.updatedAt).toLocaleDateString()}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-info me-2"
                            onClick={() => handleEditClick(shipment)}
                          >
                            Edit
                          </button>
                          {/* Delete button will go here later */}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>


      {/* --- Edit Shipment Modal --- */}
      {showEditModal && currentShipmentToEdit && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Edit Shipment: {currentShipmentToEdit.trackingNumber}</h5>
                <button type="button" className="btn-close btn-close-white" onClick={handleCloseEditModal} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {editFormSuccess && <div className="alert alert-success">{editFormSuccess}</div>}
                {editFormError && <div className="alert alert-danger">{editFormError}</div>}
                <form onSubmit={handleUpdateShipmentSubmit}>
                  <div className="row g-3">
                    {/* Tracking Number - often not editable or needs special handling if it's the primary identifier for updates */}
                    <div className="col-md-6">
                        <label htmlFor="editTrackingNumber" className="form-label">Tracking Number <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="editTrackingNumber" name="trackingNumber" value={currentShipmentToEdit.trackingNumber || ''} onChange={handleEditInputChange} required />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="editStatus" className="form-label">Status <span className="text-danger">*</span></label>
                        <select className="form-select" id="editStatus" name="status" value={currentShipmentToEdit.status || 'Pending'} onChange={handleEditInputChange} required>
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="In Transit">In Transit</option>
                            <option value="Out for Delivery">Out for Delivery</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Delayed">Delayed</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="editOrigin" className="form-label">Origin <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="editOrigin" name="origin" value={currentShipmentToEdit.origin || ''} onChange={handleEditInputChange} required />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="editDestination" className="form-label">Destination <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="editDestination" name="destination" value={currentShipmentToEdit.destination || ''} onChange={handleEditInputChange} required />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="editSenderName" className="form-label">Sender Name</label>
                        <input type="text" className="form-control" id="editSenderName" name="senderName" value={currentShipmentToEdit.senderName || ''} onChange={handleEditInputChange} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="editReceiverName" className="form-label">Receiver Name <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="editReceiverName" name="receiverName" value={currentShipmentToEdit.receiverName || ''} onChange={handleEditInputChange} required />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="editWeight" className="form-label">Weight (kg) <span className="text-danger">*</span></label>
                        <input type="number" step="0.01" className="form-control" id="editWeight" name="weight" value={currentShipmentToEdit.weight || ''} onChange={handleEditInputChange} required />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="editDimensions" className="form-label">Dimensions (e.g., LxWxH cm)</label>
                        <input type="text" className="form-control" id="editDimensions" name="dimensions" value={currentShipmentToEdit.dimensions || ''} onChange={handleEditInputChange} />
                    </div>
                    <div className="col-12">
                        <label htmlFor="editLocationHistory" className="form-label">Location History (JSON Array String)</label>
                        <textarea className="form-control" id="editLocationHistory" name="locationHistory" rows="5" value={currentShipmentToEdit.locationHistory || '[]'} onChange={handleEditInputChange} placeholder='e.g., [{"timestamp": "2025-07-15T10:00:00Z", "location": "Warehouse A", "statusUpdate": "Picked up"}]'></textarea>
                        <small className="form-text text-muted">Must be a valid JSON array string. Add new entries to update tracking progress.</small>
                    </div>
                  </div>
                  <div className="modal-footer mt-4">
                    <button type="button" className="btn btn-secondary" onClick={handleCloseEditModal}>Close</button>
                    <button type="submit" className="btn btn-primary" disabled={updating}>
                      {updating ? 'Updating...' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}

export default AdminDashboard;