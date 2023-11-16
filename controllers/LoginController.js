const database = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
class LoginController {
    index(req, res) {
        res.render('login');
    }

    async signIn(req, res) {
        const db = await database.connect();
        const formData = req.body;

        console.log(formData);

        const query = "SELECT * FROM user WHERE email = ?";

        db.query(query, [formData.email], async (error, results) => {
            if (error)
                console.log(error);

            if (results.length > 0) {
                const user = results[0];

                const isValidPassword = await bcrypt.compare(formData.pass, user.pass);
                
                console.log(user);

                if (isValidPassword) {
                    res.render('home', { name: user.name});
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
