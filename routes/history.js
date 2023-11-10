const express = require('express');
const router = express.Router();

const historyController = require('../controllers/HistoryController');

router.use('/', historyController.index)

module.exports = router;