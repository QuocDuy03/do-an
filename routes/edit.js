const express = require('express');
const router = express.Router();

const editController = require('../controllers/EditController');

router.get('/', editController.index)

module.exports = router;