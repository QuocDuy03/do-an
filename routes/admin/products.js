const express = require('express');
const router = express.Router();

const productsController = require("../../controllers/admin/ProductsController");

router.get('/', productsController.index)

module.exports = router;