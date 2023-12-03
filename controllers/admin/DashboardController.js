const jwt = require('jsonwebtoken');
const database = require('../../config/database');
const bcrypt = require('bcryptjs');

class DashboardController {
    index(req, res) {
        try {
            const user = req.user; // Kiểm tra thông tin người dùng từ middleware authenticateToken
            if (!user) {
                return res.redirect('/login');
            }
            // Sử dụng thông tin người dùng để kiểm tra quyền truy cập
            if (user.role_id === 1)
                res.render('dashboard');
            else
                res.redirect('/');
        } catch (err) {
            console.log(err);
            return res.redirect('/login');
        }
    }

    profile(req, res) {
        try {
            const user = req.user; // Kiểm tra thông tin người dùng từ middleware authenticateToken
            if (!user) {
                return res.redirect('/login');
            }
            // Sử dụng thông tin người dùng để kiểm tra quyền truy cập
            if (user.role_id === 1)
                res.render('profile');
            else
                res.redirect('/');
        } catch (err) {
            console.log(err);
            return res.redirect('/login');
        }
    }

    getProfile(req, res) {
        try {
            const user = req.user; // Kiểm tra thông tin người dùng từ middleware authenticateToken
            if (!user) {
                return res.redirect('/login');
            }
            // Sử dụng thông tin người dùng để kiểm tra quyền truy cập
            return res.status(200).json({
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
            });
        } catch (err) {
            console.log(err);
            return res.redirect('/login');
        }
    }

    async changePassword(req, res) {
        const db = await database.connect();
        const formData = req.body;

        const query = "SELECT * FROM users WHERE id = ?";

        db.query(query, [formData.id], async (error, results) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Internal server error" });
            }

            const user = results[0];

            let isValidPassword = await bcrypt.compare(formData.oldPassword, user.password);
            if (!isValidPassword) {
                return res.status(401).json({
                    message: "Mật khẩu cũ không đúng",
                })
            }

            if (formData.newPassword !== formData.confirmNewPassword) {
                return res.status(401).json({
                    message: "Mật khẩu không khớp",
                })
            }

            let hashedPass = await bcrypt.hash(formData.newPassword, 8);

            db.query('UPDATE users SET password = ? WHERE id = ?', [hashedPass, formData.id], async (error, results) => {
                if (error) {
                    console.log(error);
                }
                else
                    res.status(200).json({ message: "Thay đổi mật khẩu thành công" })
            })
        });
        await database.disconnect(db);
    }
}

module.exports = new DashboardController;
