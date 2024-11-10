const express = require('express');
const productController = require('./../2_controllers/productController');
const viewsController = require('./../2_controllers/viewsController');

const router = express.Router();

router
  .route('/')
  .get(productController.checkAuth, productController.getProducts);

router
  .route('/create')
  .get(productController.checkAuth, viewsController.createProduct)
  .post(productController.checkAuth, productController.createProduct);

router
  .route('/delete/:productId')
  .get(
    productController.checkAuth,
    productController.checkProductOwnership,
    productController.deleteProduct,
  );

module.exports = router;
