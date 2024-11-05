const mongoose = require('mongoose'); // Import Mongoose, which is a library for working with MongoDB
const validator = require('validator'); // Import the validator library for validating data

// Define the user schema using Mongoose
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name'],
    maxlength: [5, 'A user name must have less or equal then 5 characters'],
    minlength: [50, 'A user name must have more or equal then 50 characters'],
    lowercase: true,
    trim: true, // Remove whitespace from both ends
    unique: true, // The name value must be unique in the collection
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
    trim: true, // Remove whitespace from both ends
    unique: true, // The name value must be unique in the collection
  },
  password: {
    type: String,
    required: [true, 'Please provide your password'],
    minlength: [8, 'A password must have at least 8 characters'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
  },
});

// Create a user model based on the defined schema, which allows interaction with the 'users' collection in MongoDB.
const User = mongoose.model('User', userSchema);

module.exports = User; // Export the model for use in other parts of the application
