// Import the Express library
const express = require('express');

// Import the user route module
const userRouter = require('./3_routes/userRoute');

// Create an instance of an Express application
const app = express();

// Routes
// Define the routes for user-related operations
app.use('/users', userRouter);

// Export the Express application for use in other modules
module.exports = app;
