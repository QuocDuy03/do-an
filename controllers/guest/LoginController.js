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
                        const token = jwt.sign({ id: user.id, email: user.email, name: user.fullname, phone: user.phone_number, address: user.address, role_id: user.role_id,  }, process.env.JWT_SECRET, { expiresIn: 86400 });

                        req.user = { id: user.id, email: user.email, name: user.fullname, phone: user.phone_number, address: user.address, role_id: user.role_id,  };
                        res.cookie('token', token, {
                            expires: new Date(Date.now() + 86400000),
                            httpOnly: true
                        });

                        return res.status(200).json({
                            message: "User successfully Logged in",
                            id: user.id,
                            name: user.fullname,
                            email: user.email,
                            phone: user.phone_number,
                            address: user.address,
                            role_id: user.role_id
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
                    id: decoded.id,
                    name: decoded.name,
                    email: decoded.email,
                    phone: decoded.phone,
                });
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

}

module.exports = new LoginController;
