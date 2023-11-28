const jwt = require('jsonwebtoken');

class ProductsController {
    index(req, res) {
        try {
            const token = req.cookies.token;
            if (!token) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(401).json({ message: "Unauthorized" });
                }
                // Trả về thông tin người dùng đã giải mã từ token
                if (decoded.role_id === 1)
                    res.render('products');
                else 
                    res.redirect('/');
            });
        }
        catch (err) {
            console.log(err);
        }
    }
}

module.exports = new ProductsController;
