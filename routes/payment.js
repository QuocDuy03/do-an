const express = require('express');
const router = express.Router();

const paymentController = require('../controllers/PaymentController');

router.use('/', paymentController.index)

module.exports = router;