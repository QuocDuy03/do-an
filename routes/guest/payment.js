const express = require('express');
const router = express.Router();

const paymentController = require("../../controllers/guest/PaymentController");

router.get('/', paymentController.index)
router.post('/thanhToan', paymentController.thanhToan)

module.exports = router;