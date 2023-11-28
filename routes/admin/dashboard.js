const express = require('express');
const router = express.Router();

const dashboardController = require("../../controllers/admin/DashboardController");

router.get('/', dashboardController.index);
router.get('/profile', dashboardController.profile);
router.get('/getProfile', dashboardController.getProfile);
router.put('/change-password', dashboardController.changePassword)
module.exports = router;