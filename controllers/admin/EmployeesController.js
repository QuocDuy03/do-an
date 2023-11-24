const database = require('../../config/database');
class EmployeesController {
    index(req, res) {
        res.render('employees');
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
                    // res.json(results)
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
