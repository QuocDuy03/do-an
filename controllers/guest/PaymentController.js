const jwt = require('jsonwebtoken');

class PaymentController {
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
                if (decoded.role_id === 2)
                    res.render('payment');
                else 
                    res.redirect('/admin/dashboard');
            });
        }
        catch (err) {
            console.log(err);
        }
    }
}

module.exports = new PaymentController;
