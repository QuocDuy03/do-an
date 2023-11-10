const express = require('express');
const router = express.Router();

const loginController = require('../controllers/LoginController');

router.use('/', loginController.index)

module.exports = router;