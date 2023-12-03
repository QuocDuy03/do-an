const jwt = require('jsonwebtoken');

class ProductsController {
    async male(req, res) {
        const user = req.user; // Kiểm tra thông tin người dùng từ middleware authenticateToken
        if (!user) {
            return res.render('Nam', {
                user: null
            })
        }
        // Sử dụng thông tin người dùng để kiểm tra quyền truy cập
        if (user.role_id === 2)
            res.render('Nam', {
                user: user
            });
        else
            res.redirect('/admin/dashboard');
    }

    async female(req, res) {
        const user = req.user; // Kiểm tra thông tin người dùng từ middleware authenticateToken
        if (!user) {
            return res.render('Nu', {
                user: null
            })
        }
        // Sử dụng thông tin người dùng để kiểm tra quyền truy cập
        if (user.role_id === 2)
            res.render('Nu', {
                user: user
            });
        else
            res.redirect('/admin/dashboard');
    }

    async baby(req, res) {
        const user = req.user; // Kiểm tra thông tin người dùng từ middleware authenticateToken
        if (!user) {
            return res.render('Tre_em', {
                user: null
            })
        }
        // Sử dụng thông tin người dùng để kiểm tra quyền truy cập
        if (user.role_id === 2)
            res.render('Tre_em', {
                user: user
            });
        else
            res.redirect('/admin/dashboard');
    }
}

module.exports = new ProductsController;
