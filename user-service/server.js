// this file starts the server

require('dotenv').config();
const app = require('./src/app');
const { sequelize, testConnection } = require('./src/config/database');
const User = require('./src/models/User');

const PORT = process.env.PORT || 3000;

// Start server function
const startServer = async () => {
  try {
    // Test database connection
    await testConnection();
    
    // Sync database (creates tables if they don't exist)
    await sequelize.sync({ alter: true });
    console.log('✅ Database synced successfully');
    
    // Start listening
    app.listen(PORT, () => {
      console.log(`🚀 User Service running on http://localhost:${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();
