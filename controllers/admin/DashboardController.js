const jwt = require('jsonwebtoken');
const database = require('../../config/database');
const bcrypt = require('bcryptjs');

class DashboardController {
    index(req, res) {
        try {
            const token = req.cookies.token;
            if (!token) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(401).json({ message: "Unauthorized" });
                }
                // Trả về thông tin người dùng đã giải mã từ token
                if (decoded.role_id === 1)
                    res.render('dashboard');
                else
                    res.redirect('/');
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    profile(req, res) {
        try {
            const token = req.cookies.token;
            if (!token) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(401).json({ message: "Unauthorized" });
                }
                // Trả về thông tin người dùng đã giải mã từ token
                if (decoded.role_id === 1)
                    res.render('profile');
                else
                    res.redirect('/');
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    getProfile(req, res) {
        try {
            const token = req.cookies.token;
            if (!token) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(401).json({ message: "Unauthorized" });
                }

                return res.status(200).json({
                    id: decoded.id,
                    name: decoded.name,
                    email: decoded.email,
                    phone: decoded.phone,
                    address: decoded.address,
                });

            });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal server error" });
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

    }
}

module.exports = new DashboardController;
