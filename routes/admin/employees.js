const express = require('express');
const router = express.Router();

const employeesController = require("../../controllers/admin/EmployeesController");

router.get('/', employeesController.index)

module.exports = router;