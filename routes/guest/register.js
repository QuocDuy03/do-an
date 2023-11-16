const express = require('express');
const router = express.Router();

const registerController = require("../../controllers/guest/RegisterController");

router.get('/', registerController.index);
router.post('/', registerController.store );

module.exports = router;