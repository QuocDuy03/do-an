const express = require('express');
const router = express.Router();

const customersController = require("../../controllers/admin/CustomersController");

router.get('/', customersController.index)

module.exports = router;