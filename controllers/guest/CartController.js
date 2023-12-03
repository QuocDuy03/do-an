const jwt = require('jsonwebtoken');

class CartController {
    index(req, res) {
        try {
            const user = req.user; // Kiểm tra thông tin người dùng từ middleware authenticateToken
            if (!user) {
                return res.redirect('/login');
            }

            // Sử dụng thông tin người dùng để kiểm tra quyền truy cập
            if (user.role_id === 2) {
                return res.render('cart');
            } else {
                return res.redirect('/admin/dashboard');
            }
        } catch (err) {
            console.log(err);
            return res.redirect('/login');
        }
    }
}

module.exports = new CartController;
