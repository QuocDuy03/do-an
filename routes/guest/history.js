const express = require('express');
const router = express.Router();

const historyController = require("../../controllers/guest/HistoryController");

router.get('/', historyController.index)

module.exports = router;