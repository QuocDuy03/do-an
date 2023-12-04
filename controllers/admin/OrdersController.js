const jwt = require('jsonwebtoken');
const OrderModel = require('../../models/orderModels');
class OrdersController {
    index(req, res) {
        try {
            const user = req.user; // Kiểm tra thông tin người dùng từ middleware authenticateToken
            if (!user) {
                return res.redirect('/login');
            }

            // Sử dụng thông tin người dùng để kiểm tra quyền truy cập
            if (user.role_id === 1)
                res.render('orders');
            else
                res.redirect('/');
        } catch (err) {
            console.log(err);
            return res.redirect('/login');
        }
    }

    async getOrders(req, res) {
        try {
            const orders = await OrderModel.getOrders();
            if (orders.length) {
                return res.status(200).json({ orders });
            } else {
                return res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}

module.exports = new OrdersController;
