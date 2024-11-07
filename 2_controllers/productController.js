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

exports.createProduct = async (req, res, next) => {
  try {
    // Extract product details from request body
    const { name, description, price, image, tags } = req.body;

    // Check that required fields are present; return an error if any are missing
    if (!name || !description || !price || !image) {
      return res
        .status(400)
        .json({ status: 'Fail', message: 'Name, description, price and image are required fields' });
    }
    // Create a new product in the database with the specified fields
    // Associate the product with the current user's ID as the owner
    const newProduct = await Product.create({
      name,
      description,
      price,
      owner: req.session.userID,
      image,
      tags,
    });

    // Send a success response with the created product data
    res.status(201).json({
      status: 'Success',
      data: newProduct,
    });
  } catch (error) {
    // Handle any errors that occur during product creation and send an error response
    res.status(500).json({ status: 'Fail', message: `Error creating product:${error.message}` });
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
