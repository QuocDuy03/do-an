const user = require('../../models/user');
const jwt = require("jsonwebtoken");

class SiteController {
    async index(req, res) {
        const user = req.user; // Kiểm tra thông tin người dùng từ middleware authenticateToken
        if (!user) {
            return res.render('home', {
                user: null
            })
        }
        console.log(user)
        // Sử dụng thông tin người dùng để kiểm tra quyền truy cập
        if (user.role_id === 2)
            res.render('home', {
                user: user
            });
        else
            res.redirect('/admin/dashboard');
    }
    logOut(req, res) {
        res.clearCookie('token');
        console.log('logout completed');
        res.redirect('/login');
    }



}

module.exports = new SiteController;