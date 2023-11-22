const express = require('express');
const router = express.Router();

const loginController = require("../../controllers/guest/LoginController");

router.get('/', loginController.index);
router.post('/', loginController.signIn);
// router.get('/logout', loginController.logOut)

module.exports = router;