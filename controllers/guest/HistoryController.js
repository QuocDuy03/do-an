const jwt = require('jsonwebtoken');
const OrderModel = require('../../models/orderModels')
class HistoryController {
    index(req, res) {
        try {
            const user = req.user; // Kiểm tra thông tin người dùng từ middleware authenticateToken
            if (!user) {
                return res.redirect('/login');
            }

            // Sử dụng thông tin người dùng để kiểm tra quyền truy cập
            if (user.role_id === 2)
                res.render('history');
            else
                res.redirect('/admin/dashboard');
        } catch (err) {
            console.log(err);
            return res.redirect('/login');
        }
    }

    async getOrderHistory(req, res) {
        try {
            const user = req.user;
            const orderHistory = await OrderModel.getOrderHistory(user.id);
            return res.status(200).json({ orderHistory });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}

module.exports = new HistoryController;
