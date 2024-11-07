const Product = require('./../0_models/productModel');

// Middleware to retrieve all products for a specific user
exports.getProducts = async (req, res, next) => {
  try {
    // Find all products where the owner field matches the logged-in user's ID
    const products = await Product.find({ owner: req.session.userID });
    // Send a 200 response with the retrieved products if successful
    res.status(200).json({ status: 'success', data: products });
  } catch (error) {
    // If an error occurs, send a 500 response with an error message
    res.status(500).json({ status: 'Fail', message: `Error retrieving products: ${error.message}` });
  }
};

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
