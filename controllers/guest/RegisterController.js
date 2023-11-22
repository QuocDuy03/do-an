const database = require('../../config/database');
const bcrypt = require('bcryptjs');

class RegisterController {
    index(req, res) {
        res.render('register', {
            message: null,
            success: null,
        });
    }

    async store(req, res) {
        const db = await database.connect();
        const formData = req.body;

        db.query("SELECT email FROM user WHERE email = ?", [formData.email], async (error, results) => {
            if (error)
                console.log(error);
            else if (results.length > 0)
                return res.render('register', {
                    message: "Email này đã được sử dụng",
                    success: null,
                })
            else if (formData.pass !== formData.cpass)
                return res.render('register', {
                    message: "Mật khẩu không khớp",
                    success: null,
                })
            else {
                let hashedPass = await bcrypt.hash(formData.pass, 8);
                db.query("INSERT INTO user SET ?",
                    { name: formData.name, phone: formData.phone, email: formData.email, pass: hashedPass },
                    (error, results) => {
                        if (error)
                            console.log(error);
                        else {
                            return res.render('register', {
                                success: "Đăng ký thành công!!!",
                                message: null,
                            })
                        }
                    })
            }
        })
    }
}

module.exports = new RegisterController;

