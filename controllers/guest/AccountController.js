const jwt = require('jsonwebtoken');
const database = require('../../config/database');
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
            const db = await database.connect();
            const user = req.user; // Kiểm tra thông tin người dùng từ middleware authenticateToken
            if (!user) {
                return res.redirect('/login');
            }

            // Sử dụng thông tin người dùng để kiểm tra quyền truy cập
            db.query("SELECT * FROM users WHERE id = ?", [user.id], (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    return res.status(200).json({
                        id: user.id,
                        name: result[0].fullname,
                        email: result[0].email,
                        phone: result[0].phone_number,
                        address: result[0].address,
                    });
                }
            })
            await database.disconnect(db);
        } catch (err) {
            console.log(err);
            return res.redirect('/login');
        }
    }
}

module.exports = new AccountController;
