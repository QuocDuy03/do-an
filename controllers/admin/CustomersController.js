const jwt = require('jsonwebtoken');
const database = require('../../config/database');
class CustomersController {
    index(req, res) {
        try {
            const user = req.user; // Kiểm tra thông tin người dùng từ middleware authenticateToken
            if (!user) {
                return res.redirect('/login');
            }

            // Sử dụng thông tin người dùng để kiểm tra quyền truy cập
            if (user.role_id === 1)
                res.render('customers');
            else
                res.redirect('/');
        } catch (err) {
            console.log(err);
            return res.redirect('/login');
        }
    }

    async getCustomers(req, res) {
        try {
            const db = await database.connect();
            const roleId = 2;
            const query = `
                            SELECT users.id, fullname, email, phone_number, address, name
                            FROM users
                            INNER JOIN roles ON users.role_id = roles.id
                            WHERE role_id = ?
                        `;
            db.query(query, [roleId], (error, results) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ message: "Internal server error" });
                }
                if (results.length) {
                    return res.status(200).json({ customers: results });
                }
                else {
                    return res.status(404).json({ message: "User not found" });
                }
            })
            await database.disconnect(db);
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}

module.exports = new CustomersController;
