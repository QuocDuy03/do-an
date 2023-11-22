const express = require('express');
const router = express.Router();

const myOrderController = require("../../controllers/guest/MyOrderController");

router.get('/', myOrderController.index)

module.exports = router;