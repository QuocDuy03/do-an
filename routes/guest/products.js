const express = require('express');
const router = express.Router();

const productsController = require("../../controllers/guest/ProductsController");

router.get('/male', productsController.male)
router.get('/female', productsController.female)
router.get('/baby', productsController.baby)

module.exports = router;