const express = require('express');
const router = express.Router();

const dashboardController = require("../../controllers/admin/DashboardController");

router.get('/', dashboardController.index);
router.get('/profile', dashboardController.profile);
router.get('/getProfile', dashboardController.getProfile);
router.put('/change-password', dashboardController.changePassword);
router.get('/countCustomers', dashboardController.countCustomers);
router.get('/countEmployees', dashboardController.countEmployees);
router.get('/countProducts', dashboardController.countProducts);

module.exports = router;