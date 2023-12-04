const jwt = require('jsonwebtoken');
const database = require('../../config/database');
const userModel = require('../../models/userModels');
class CustomersController {
    index(req, res) {
        try {
            const user = req.user; // Kiểm tra thông tin người dùng từ middleware authenticateToken
            if (!user) {
                return res.redirect('/login');
            }

            // Sử dụng thông tin người dùng để kiểm tra quyền truy cập
            if (user.role_id === 1)
                res.render('customers');
            else
                res.redirect('/');
        } catch (err) {
            console.log(err);
            return res.redirect('/login');
        }
    }

    async getCustomers(req, res) {
        try {
            const customers = await userModel.getCustomers();
            if (customers.length) {
                return res.status(200).json({ customers });
            } else {
                return res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}

module.exports = new CustomersController;
