// Import the Express library
const express = require('express');

// Import the 'express-session' module to handle session management
const session = require('express-session');

// Import the user route module
const userRouter = require('./3_routes/userRoute');

// Create an instance of an Express application
const app = express();

// Global Middleware to parse incoming JSON requests
app.use(express.json());

// Global Middleware for managing user sessions
app.use(
  session({
    // Name of the session cookie
    name: 'nodepop-session',

    // Secret key for signing the session ID cookie, stored securely in environment variables
    secret: process.env.SESSION_SECRET_KEY,

    // Save uninitialized sessions to the store (useful for login-related functionality)
    saveUninitialized: true,

    // Prevents session resaving if nothing has changed, optimizing performance
    resave: false,

    // Sets the maximum age for the session cookie, after which it will expire
    cookie: { maxAge: process.env.SESSION_EXPIRATION },
  }),
);

// Routes
// Define the routes for user-related operations
app.use('/users', userRouter);

// Export the Express application for use in other modules
module.exports = app;
