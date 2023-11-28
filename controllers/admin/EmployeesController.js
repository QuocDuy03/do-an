const database = require('../../config/database');
const jwt = require('jsonwebtoken');
class EmployeesController {
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
                    res.render('employees');
                else 
                    res.redirect('/');
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    async getEmployees(req, res) {
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
                    return res.status(200).json({ employees: results });
                }
                else {
                    return res.status(404).json({ message: "User not found" });
                }
            })
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}

module.exports = new EmployeesController;
