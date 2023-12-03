const express = require('express');
const router = express.Router();

const customersController = require("../../controllers/admin/CustomersController");

router.get('/', customersController.index);
router.get('/getCustomers', customersController.getCustomers);

module.exports = router;