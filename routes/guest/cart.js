const express = require('express');
const router = express.Router();

const cartController = require("../../controllers/guest/CartController");

router.get('/', cartController.index);
router.get('/showCart', cartController.showCart);

module.exports = router;