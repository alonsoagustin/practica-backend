const Product = require('./../0_models/productModel');

// Middleware to check if the user is logged in
exports.checkAuth = async (req, res, next) => {
  // If the user is not logged in (userID is not in session)
  if (!req.session.userID)
    // Respond with a 401 Unauthorized error
    return res.status(401).json({
      status: 'Fail',
      message: 'Please log in to access this resource',
    });

  // If the user is logged in, continue to the next middleware or route handler
  next();
};
