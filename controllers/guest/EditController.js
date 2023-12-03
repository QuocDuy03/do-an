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

    async store(req, res) {
        const db = await database.connect();
        const formData = req.body;

        const query = "SELECT * FROM users WHERE email = ?";

        db.query(query, [formData.email], async (error, results) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Internal server error" });
            }

            if (formData.pass !== formData.cpass)
                return res.status(401).json({
                    message: "Mật khẩu không khớp",
                })

            if (results.length > 0) {
                const user = results[0];

                let hashedPass = await bcrypt.hash(formData.pass, 8);

                const query = "UPDATE users SET password =? WHERE id =?";
                db.query(query, [hashedPass, user.id], async (error, results) => {
                    if (error)
                        console.log(error);
                    else
                        res.status(200).json({ message: "Thay đổi mật khẩu thành công" })
                })
            } else {
                return res.status(404).json({ message: "User not found" });
            }
        });
        await database.disconnect(db);
    }
}

module.exports = new EditController;
