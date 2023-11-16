const express = require('express');
const router = express.Router();

const paymentController = require("../../controllers/guest/PaymentController");

router.get('/', paymentController.index)

module.exports = router;