// Import the User model to interact with the users collection in the database
const User = require('./../0_models/userModel');

exports.signup = async (req, res, next) => {
  try {
    // Create a new user based on the request body
    const newUser = await User.create(req.body);

    // Respond with a success status and the newly created user
    res.status(201).json({
      status: 'success',
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    // Handle errors, such as validation errors
    res.status(400).json({
      status: 'Fail',
      message: error.message, // Send back the error message
    });
    next(error); // Pass the error to the next middleware for centralized error handling
  }
};
