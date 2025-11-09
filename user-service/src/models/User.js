// This file defines the structure of our User table in the database

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const bcrypt = require('bcryptjs');

// Define the User model
const User = sequelize.define('User', {
  // id is created automatically by Sequelize
  
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,      // Username is required
    unique: true,          // No two users can have the same username
    validate: {
      len: [3, 50],        // Username must be 3-50 characters
      notEmpty: true
    }
  },
  
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,          // No two users can have the same email
    validate: {
      isEmail: true,       // Must be a valid email format
      notEmpty: true
    }
  },
  
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      len: [6, 255]        // Password must be at least 6 characters
    }
  }
}, {
  // Model options
  tableName: 'users',
  timestamps: true,        // Automatically adds createdAt and updatedAt fields
  
  // Hooks are functions that run automatically at certain times
  hooks: {
    // Before saving a user to database, hash their password
    beforeCreate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10); // Generate a salt (random data)
        user.password = await bcrypt.hash(user.password, salt); // Hash the password
      }
    },
    // Also hash password when updating
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  }
});

// Instance method to check if entered password matches hashed password
User.prototype.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Don't send password in JSON responses
User.prototype.toJSON = function() {
  const values = { ...this.get() };
  delete values.password;
  return values;
};

module.exports = User;
