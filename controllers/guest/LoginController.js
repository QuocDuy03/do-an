const database = require('../../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../../models/userModels');
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
            const formData = req.body;
            const user = await userModel.getUserByEmail(formData.email);

            if (user) {
                const isValidPassword = await userModel.comparePassword(formData.pass, user.password);

                if (isValidPassword) {
                    const token = userModel.generateToken({
                        id: user.id,
                        email: user.email,
                        name: user.fullname,
                        phone: user.phone_number,
                        address: user.address,
                        role_id: user.role_id,
                    });

                    req.user = {
                        id: user.id,
                        email: user.email,
                        name: user.fullname,
                        phone: user.phone_number,
                        address: user.address,
                        role_id: user.role_id,
                    };

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
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

}

module.exports = new LoginController;
