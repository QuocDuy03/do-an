const jwt = require('jsonwebtoken');
const database = require('../../config/database');
const userModel = require('../../models/userModels');
class AccountController {
    index(req, res) {
        try {
            const user = req.user; // Kiểm tra thông tin người dùng từ middleware authenticateToken
            if (!user) {
                return res.redirect('/login');
            }

            // Sử dụng thông tin người dùng để kiểm tra quyền truy cập
            if (user.role_id === 2)
                res.render('account');
            else
                res.redirect('/admin/dashboard');
        } catch (err) {
            console.log(err);
            return res.redirect('/login');
        }
    }

    async getUserInfo(req, res) {
        try {
            const user = req.user; // Kiểm tra thông tin người dùng từ middleware authenticateToken
            if (!user) {
                return res.redirect('/login');
            }

            // Gọi phương thức từ model để lấy thông tin người dùng
            const userInfo = await userModel.getUserById(user.id);

            return res.status(200).json({
                id: user.id,
                name: userInfo.fullname,
                email: userInfo.email,
                phone: userInfo.phone_number,
                address: userInfo.address,
            });
        } catch (err) {
            console.log(err);
            return res.redirect('/login');
        }
    }
}

module.exports = new AccountController;
