const jwt = require('jsonwebtoken');

class CustomersController {
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
                    res.render('customers');
                else 
                    res.redirect('/');
            });
        }
        catch (err) {
            console.log(err);
        }
    }
}

module.exports = new CustomersController;
