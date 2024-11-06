// Import Mongoose, which is a library for working with MongoDB
const mongoose = require('mongoose');

// Import the validator library for validating data
const validator = require('validator');

// Import the bcryptjs library for hashing passwords securely
const bcrypt = require('bcryptjs');

// Define the user schema using Mongoose
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name'],
    minlength: [5, 'A user name must have less or equal then 5 characters'],
    maxlength: [50, 'A user name must have more or equal then 50 characters'],
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
    required: [true, ' Please confirm your password'],
    validate: {
      //This only works on CREATE and SAVE
      validator: function (element) {
        return element === this.password;
      },
    },
  },
});

// 'pre' middleware that runs before saving a user
userSchema.pre('save', async function (next) {
  // Check if the 'password' field has been modified
  // If it hasn't been modified, skip the hashing process and continue with the operation
  if (!this.isModified('password')) return next();

  // If the password has been modified, hash it using bcrypt
  // A salt of 12 rounds is used for the hashing operation
  this.password = await bcrypt.hash(this.password, 12);

  // Remove the 'passwordConfirm' field from the document before saving
  // This ensures that the password confirmation field is not stored in the database
  this.passwordConfirm = undefined;

  // Call 'next()' to allow the save operation to proceed
  next();
});

// Method to compare a provided password with the user's hashed password in the database
userSchema.methods.comparePassword = async function (clearPassword) {
  // Using bcrypt to securely compare the passwords
  return await bcrypt.compare(clearPassword, this.password);
};

// Create a user model based on the defined schema, which allows interaction with the 'users' collection in MongoDB.
const User = mongoose.model('User', userSchema);

// Export the model for use in other parts of the application
module.exports = User;
