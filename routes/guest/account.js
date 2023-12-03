const express = require('express');
const router = express.Router();

const accountController = require("../../controllers/guest/AccountController");

router.get('/', accountController.index)
router.get('/user-info', accountController.getUserInfo);

module.exports = router;