const express = require('express');
const router = express.Router();

const editController = require("../../controllers/guest/EditController");

router.get('/', editController.index);
router.post('/change-information', editController.store);

module.exports = router;