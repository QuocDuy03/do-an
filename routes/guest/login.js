const express = require('express');
const router = express.Router();

const loginController = require("../../controllers/guest/LoginController");

router.get('/', loginController.index);
router.post('/', loginController.signIn);
router.get('/user-info', loginController.getUserInfo);

module.exports = router;