
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

// Create Express app
const app = express();

// Middleware
app.use(cors());                    
app.use(express.json());            
app.use(express.urlencoded({ extended: true })); 

// Health check endpoint (useful for Docker and monitoring)
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    service: 'User Service',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/users', userRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
});

module.exports = app;
