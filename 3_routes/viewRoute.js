const express = require('express');
const viewController = require('./../2_controllers/viewsController');

const router = express.Router();

router.get('/', viewController.getHome);
router.get('/users/login', viewController.getLogIn);
router.get('/users/signup', viewController.getSignUp);

module.exports = router;
