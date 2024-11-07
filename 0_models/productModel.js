const mongoose = require('mongoose');

// Define the product schema with various fields and validations
const productSchema = new mongoose.Schema({
  // Product name with required validation and length constraints
  name: {
    type: String,
    required: [true, 'Please provide a product name'], // Ensure the product name is provided
    minLength: [5, ' A product name must have more or equal then 5 characters'], // Minimum length for the name
    maxLength: [50, 'A product name must haver less or equal then 50 characters'], // Maximum length for the name
    trim: true, // Automatically trim whitespace from both ends of the string
  },

  // Product description with required validation and length constraint
  description: {
    type: String,
    required: [true, ' Please provide a product description'], // Ensure the product description is provided
    maxLength: [120, 'A product description must have less or equal then 120 characters'], // Maximum length for the description
  },

  // Product price with a minimum value validation to ensure it's positive
  price: { type: Number, min: [0, 'Price must be a positive number'] }, // Price must be greater than or equal to 0

  // Owner field to associate the product with a user
  owner: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User model (ObjectId)
    ref: 'User', // Reference to the 'User' model, establishing a relationship
    required: [true, 'A product must have an owner'], // Ensure the product has an owner
  },

  // Optional image field to store the product's image URL or filename
  image: String,

  // Tags field to categorize products, with a validation to limit the number of tags
  tags: {
    type: [String],
    // Custom validator to limit the number of tags to 3
    validate: {
      validator: function (value) {
        return value.length <= 3; // Tags array should not exceed 3 elements
      },
    },
  },
});

// Create a model for the Product using the defined schema
const Product = mongoose.model('Product', productSchema);

// Export the Product model to be used in other parts of the application
module.exports = Product;
