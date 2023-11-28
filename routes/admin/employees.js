const express = require('express');
const router = express.Router();

const employeesController = require("../../controllers/admin/EmployeesController");

router.get('/', employeesController.index);
router.get('/getEmployees', employeesController.getEmployees)

module.exports = router;