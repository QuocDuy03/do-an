const database = require('../../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
class LoginController {
    index(req, res) {
        const token = req.cookies.token; 
        if (!token)
            res.render('login');
        else
            res.redirect('/account');
    }

    async signIn(req, res) {
        try {
            const db = await database.connect();
            const formData = req.body;

            const query = "SELECT * FROM users WHERE email = ?";

            db.query(query, [formData.email], async (error, results) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ message: "Internal server error" });
                }

                if (results.length > 0) {
                    const user = results[0];

                    const isValidPassword = await bcrypt.compare(formData.pass, user.password);

                    if (isValidPassword) {
                        const token = jwt.sign({ email: user.email, name: user.fullname }, process.env.JWT_SECRET, { expiresIn: 86400 });

                        req.user = { email: user.email, name: user.fullname };
                        res.cookie('token', token, {
                            expires: new Date(Date.now() + 86400000),
                            httpOnly: true
                        });

                        return res.status(200).json({
                            message: "User successfully Logged in",
                            name: user.fullname,
                            email: user.email,
                        });
                    } else {
                        return res.status(401).json({ message: "Invalid password" });
                    }
                } else {
                    return res.status(404).json({ message: "User not found" });
                }
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async getUserInfo(req, res) {
        try {
            const token = req.cookies.token; // Đọc token từ cookie
            if (!token) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            // Giải mã token để lấy thông tin người dùng
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(401).json({ message: "Unauthorized" });
                }

                // Trả về thông tin người dùng đã giải mã từ token
                return res.status(200).json({
                    name: decoded.name,
                    email: decoded.email
                    // Các thông tin khác của người dùng có thể truy cập từ decoded object
                });
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

}

module.exports = new LoginController;
