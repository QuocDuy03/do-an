const express = require('express');
const router = express.Router();

const editController = require("../../controllers/guest/EditController");

router.get('/', editController.index);
router.put('/change-information', editController.changeInfomation);
router.put('/change-password', editController.changePassword);

module.exports = router;