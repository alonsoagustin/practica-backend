const express = require('express');
const productController = require('./../2_controllers/productController');

const router = express.Router();

router
  .route('/')
  .get(productController.checkAuth, productController.getProducts)
  .post(productController.checkAuth, productController.createProduct);

module.exports = router;
