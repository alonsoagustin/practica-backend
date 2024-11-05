// Import the required libraries
const mongoose = require('mongoose'); // Mongoose for MongoDB interactions
const dotenv = require('dotenv'); // dotenv to manage environment variables
const app = require('./app'); // Import the main application module

// Use the "dotenv" library to load environment variables from the "config.env" file
dotenv.config({ path: './config.env' });

// Construct the database connection URI by replacing <PASSWORD> with the actual password from environment variables
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

// Connect to the MongoDB database using Mongoose
mongoose
  .connect(DB)
  .then(() => console.log('DB connection successful'))
  .catch(() => console.log('Error connecting to DB', err));

// Set the port for the application to run on, defaulting to 3000 if not specified in environment variables
const port = process.env.PORT || 3000;

// Start the Express server and log a message indicating which port it is running on
const server = app.listen(port, () => console.log(`App running on port ${port}...`));
