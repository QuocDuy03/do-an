const express = require('express');
const router = express.Router();

const editController = require("../../controllers/guest/EditController");

router.get('/', editController.index)

module.exports = router;