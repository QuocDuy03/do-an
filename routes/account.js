const express = require('express');
const router = express.Router();

const accountController = require('../controllers/AccountController');

router.get('/', accountController.index)

module.exports = router;