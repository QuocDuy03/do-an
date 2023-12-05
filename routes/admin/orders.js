const express = require('express');
const router = express.Router();

const ordersController = require("../../controllers/admin/OrdersController");

router.get('/', ordersController.index);
router.get('/getOrders',ordersController.getOrders);
router.put('/updateStatus/:orderId', ordersController.updateOrderStatus)

module.exports = router;