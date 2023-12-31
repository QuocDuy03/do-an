const database = require('../../config/database');
const bcrypt = require('bcryptjs');
const { route } = require('../../routes/guest/login');

class RegisterController {
    index(req, res) {
        const token = req.cookies.token; 
        if (!token)
            res.render('register');
        else
            res.redirect('/account');
    }

    async store(req, res) {
        const db = await database.connect();
        const formData = req.body;

        db.query("SELECT email FROM users WHERE email = ?", [formData.email], async (error, results) => {
            if (error)
                console.log(error);
            else if (results.length > 0)
                return res.status(401).json({
                    message: "Email này đã được sử dụng",
                })
            else if (formData.pass !== formData.cpass)
                return res.status(401).json({
                    message: "Mật khẩu không khớp",
                })
            else {
                let hashedPass = await bcrypt.hash(formData.pass, 8);
                let role = 2;
                if (formData.email.includes('@g5.shop.com'))
                    role = 1;
                db.query("INSERT INTO users SET ?",
                    { fullname: formData.fullname, phone_number: formData.phone, email: formData.email, address: formData.address, password: hashedPass, role_id: role },
                    (error, results) => {
                        if (error)
                            console.log(error);
                        else {
                            res.status(201).json({
                                message: "User successfully registered",
                            });
                        }
                    })
            }
        })
    }
}

module.exports = new RegisterController;

