const mongoose = require('mongoose');
const Product = require('./../0_models/productModel');

// Middleware to retrieve all products for a specific user
exports.getProducts = async (req, res, next) => {
  const isDeleteMode = req.query.delete === 'true';
  // res.redirect('/');
  res.render('home', { content: '_products', isDeleteMode: isDeleteMode });
};

// Middleware to create a product for a specific user
exports.createProduct = async (req, res, next) => {
  try {
    // Extract product details from request body
    const { name, description, price } = req.body;

    // Check that required fields are present; return an error if any are missing
    if (!name || !description || !price) {
      return res.status(400).json({
        status: 'Fail',
        message: 'Name, description and price are required fields',
      });
    }
    // Create a new product in the database with the specified fields
    // Associate the product with the current user's ID as the owner
    const newProduct = await Product.create({
      name,
      description,
      price,
      owner: req.session.userID,
      image: '', // TODO
      tags: '', // TODO
    });

    //
    const products = await Product.find({ owner: req.session.userID });

    //Updatethe products in the session
    req.session.userProducts = products;

    // Send a success response with the created product data
    // res.status(201).json({
    //   status: 'Success',
    //   data: newProduct,
    // });

    //
    res.redirect('/');
  } catch (error) {
    // Handle any errors that occur during product creation and send an error response
    res.status(500).json({
      status: 'Fail',
      message: `Error creating product:${error.message}`,
    });
  }
};

// Middleware to delete a product by ID
exports.deleteProduct = async (req, res, next) => {
  try {
    // Extract the product ID from the request parameters
    const productID = req.params.productId;
    // Attempt to delete the product from the database using the product ID
    await Product.deleteOne({ _id: productID });

    //
    const products = await Product.find({ owner: req.session.userID });

    //
    req.session.userProducts = products;

    //
    res.redirect('/');
    // Send a success response if the product was successfully deleted
    // res.status(200).json({ status: 'Success', message: 'Product deleted' });
  } catch (error) {
    // Handle any errors that occur during deletion and send a failure response
    res.status(500).json({ status: 'Fail', message: error.message });
  }
};

// Middleware to check if the user is logged in
exports.checkAuth = async (req, res, next) => {
  // If the user is not logged in (userID is not in session)
  if (!req.session.userID)
    // Respond with a 401 Unauthorized error
    // return res.status(401).json({
    //   status: 'Fail',
    //   message: 'Please log in to access this resource',
    // });
    return res.status(200).render('home', { content: '_loginForm' });

  // If the user is logged in, continue to the next middleware or route handler
  next();
};

// Middleware to check if the user is the owner of a specific product
exports.checkProductOwnership = async (req, res, next) => {
  try {
    const userID = req.session.userID;
    const productID = req.params.productId;

    // Check if the productID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(productID)) {
      console.warn(
        `WARNING - user: ${userID} is trying to delete an invalid product ID: ${productID}`,
      );
      // throw new Error('Invalid product ID format');
      throw new Error('Product not found');
    }

    // Find the product by ID
    const product = await Product.findOne({ _id: productID });

    // If the product is not found, log a warning and return a 404 error
    if (!product) {
      console.warn(
        `WARNING - user: ${userID} is trying to delete product: ${productID}`,
      );
      throw new Error('Product not found');
    }

    // Check if the product owner matches the logged-in user
    if (product.owner.toString() !== userID) {
      console.warn(
        `WARNING - user: ${userID} is trying to delete product: ${productID}`,
      );
      throw new Error('You are not the owner of this product');
    }
    // Proceed if the ownership check passed
    next();
  } catch (error) {
    res.status(500).json({
      status: 'Fail',
      message: error.message,
    });
  }
};
