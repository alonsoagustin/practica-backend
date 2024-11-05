// Import the Express library
const express = require('express');

// Import the authentication controller module
const authController = require('./../2_controllers/authController');

// Create a new router instance from Express
const router = express.Router();

// Export the router for use in other modules
module.exports = router;
