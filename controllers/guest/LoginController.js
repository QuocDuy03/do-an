const database = require('../../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
class LoginController {
    index(req, res) {
        res.render('login');
    }

    async signIn(req, res) {
        const db = await database.connect();
        const formData = req.body;

        const query = "SELECT * FROM users WHERE email = ?";

        db.query(query, [formData.email], async (error, results) => {
            if (error)
                console.log(error);
            
            if (results.length > 0) {
                const user = results[0];

                const isValidPassword = await bcrypt.compare(formData.pass, user.password);
                let hashedPass = await bcrypt.hash(formData.pass, 8);
                console.log(hashedPass, user.password);

                if (isValidPassword) {
                    const token = jwt.sign({ email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: 86400 });

                    req.user = { email: user.email, name: user.name };

                    res.cookie('token', token, {
                        expires: new Date(Date.now() + 86400000),
                        httpOnly: true
                    });

                    res.status(201).json({
                        message: "User successfully Logged in",
                        name: user.name,
                        email: user.email,
                    });
                }
                else {
                    res.render('login', console.log("saimk"))
                }
            }
            else {
                res.render('login', console.log("khong co tk"))
            }
        })
    }

}

module.exports = new LoginController;
