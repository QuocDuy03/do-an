const database = require('../../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
class EditController {
    index(req, res) {
        try {
            const user = req.user; // Kiểm tra thông tin người dùng từ middleware authenticateToken
            if (!user) {
                return res.redirect('/login');
            }

            // Sử dụng thông tin người dùng để kiểm tra quyền truy cập
            if (user.role_id === 2)
                res.render('edit');
            else
                res.redirect('/admin/dashboard');
        } catch (err) {
            console.log(err);
            return res.redirect('/login');
        }
    }

    async changeInfomation(req, res) {
        const db = await database.connect();
        const formData = req.body;

        const query = "SELECT * FROM users WHERE email = ?";

        db.query(query, [formData.email], async (error, results) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Internal server error" });
            }

            if (results.length > 0) {
                return res.status(401).json({
                    message: "Email này đã được sử dụng",
                })

            } else {
                db.query("UPDATE users SET ? WHERE id = ?",
                    [{ fullname: formData.userName, email: formData.userEmail, phone_number: formData.userPhone, address: formData.userAddress }, formData.userId],
                    async (error, results) => {
                        if (error) {
                            console.log(error);
                            return res.status(500).json({ message: "Internal server error" });
                        }
                        else {
                            res.status(200).json({ message: "Updated user" });
                        }

                    })
            }
        });
        await database.disconnect(db);
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

module.exports = new EditController;
