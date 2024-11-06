// Import the User model to interact with the users collection in the database
const User = require('./../0_models/userModel');

exports.signup = async (req, res, next) => {
  try {
    // Create a new user based on the request body
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    // Store the user ID and name in the session after successful login
    req.session.userID = newUser._id;
    req.session.userName = newUser.name;

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

exports.login = async (req, res, next) => {
  try {
    // Extract email and password from the request body
    const { email, password } = req.body;

    // Check if both email and password are provided
    if (!email || !password) throw new Error('Please provide email and password');

    // Look for the user in the database by email (case-insensitive)
    const user = await User.findOne({ email: email.toLowerCase() });

    // Verify that the user exists and that the provided password is correct
    if (!user || !(await user.comparePassword(password))) {
      // Throw an error if credentials are invalid
      throw new Error('Invalid credentials');
    }

    // Store the user ID and name in the session after successful login
    req.session.userID = user._id;
    req.session.userName = user.name;

    // Send a successful response
    res.status(200).json({ status: 'success' });
  } catch (error) {
    // Handle errors, such as validation errors
    res.status(401).json({
      status: 'Fail',
      message: error.message, // Send back the error message
    });
  }
};
