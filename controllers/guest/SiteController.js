const user = require('../../models/user');
const jwt = require("jsonwebtoken");

class SiteController {
    async index(req, res) {
        const token = await req.cookies.token;
        if (token) {
            jwt.verify(req.cookies.token, process.env.JWT_SECRET, (err, user) => {
                if (err) {
                    return res.send('Xin chào! Đây là trang chủ');
                }
                res.render('home', {
                    user: user
                })

            });
        }
        else {
            res.render('home', {
                user: null
            })
        }
    }
    logOut(req, res) {
        res.clearCookie('token');
        console.log('logout completed');
        res.redirect('/');
    }



}

module.exports = new SiteController;