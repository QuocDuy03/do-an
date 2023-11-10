const express = require('express');
const router = express.Router();

const editController = require('../controllers/EditController');

router.use('/', editController.index)

module.exports = router;