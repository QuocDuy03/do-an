const express = require('express');
const router = express.Router();

const myOrderController = require("../../controllers/guest/MyOrderController");

router.get('/', myOrderController.index);
router.get('/getOrderDetails', myOrderController.getOrderDetails);

module.exports = router;