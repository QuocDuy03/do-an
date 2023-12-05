const express = require('express');
const router = express.Router();

const historyController = require("../../controllers/guest/HistoryController");

router.get('/', historyController.index)
router.get('/getOrderHistory', historyController.getOrderHistory);

module.exports = router;