// iqexpress-backend/server.js

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/database'); // Import connectDB from the new database.js

// Call the database connection function
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic route for testing
app.get('/', (req, res) => {
  res.send('iQexpress Backend API is running!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Environment:', process.env.NODE_ENV);
});