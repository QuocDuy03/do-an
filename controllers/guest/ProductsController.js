const jwt = require('jsonwebtoken');

class ProductsController {
    async male(req, res) {
        const token = await req.cookies.token;
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
                if (err) {
                    return res.send('Xin chào! Đây là trang chủ');
                }
                if (user.role_id === 2)
                    res.render('Nam', {
                        user: user
                    })
                else
                    res.redirect('/admin/dashboard');
            });
        }
        else {
            res.render('Nam', {
                user: null
            })
        }
    }

    async female(req, res) {
        const token = await req.cookies.token;
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
                if (err) {
                    return res.send('Xin chào! Đây là trang chủ');
                }
                if (user.role_id === 2)
                    res.render('Nu', {
                        user: user
                    })
                else
                    res.redirect('/admin/dashboard');
            });
        }
        else {
            res.render('Nu', {
                user: null
            })
        }
    }

    async baby(req, res) {
        const token = await req.cookies.token;
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
                if (err) {
                    return res.send('Xin chào! Đây là trang chủ');
                }
                if (user.role_id === 2)
                    res.render('Tre_em', {
                        user: user
                    })
                else
                    res.redirect('/admin/dashboard');
            });
        }
        else {
            res.render('Tre_em', {
                user: null
            })
        }
    }
}

module.exports = new ProductsController;
