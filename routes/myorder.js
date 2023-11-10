const express = require('express');
const router = express.Router();

const myOrderController = require('../controllers/MyOrderController');

router.use('/', myOrderController.index)

module.exports = router;