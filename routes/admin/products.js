const express = require('express');
const router = express.Router();

const productsController = require("../../controllers/admin/ProductsController");

router.get('/', productsController.index)
router.get('/getProducts', productsController.getProducts)

module.exports = router;