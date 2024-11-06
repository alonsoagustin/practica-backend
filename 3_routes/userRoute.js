// Import the Express library
const express = require('express');

// Import the authentication controller module
const authController = require('./../2_controllers/authController');

// Create a new router instance from Express
const router = express.Router();

// Define a POST route for user signup that triggers the signup method in the authController
router.post('/signup', authController.signup);

// Define a POST route for user login that triggers the login method in the authController
router.post('/login', authController.login);

/// Handle all HTTP methods for the '/logout' route, delegating to the logout middleware
router.all('/logout', authController.logout);

// Export the router for use in other modules
module.exports = router;
