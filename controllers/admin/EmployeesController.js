const userModel = require('../../models/userModels');
class EmployeesController {
    index(req, res) {
        try {
            const user = req.user; // Kiểm tra thông tin người dùng từ middleware authenticateToken
            if (!user) {
                return res.redirect('/login');
            }

            // Sử dụng thông tin người dùng để kiểm tra quyền truy cập
            if (user.role_id === 1)
                res.render('employees');
            else
                res.redirect('/');
        } catch (err) {
            console.log(err);
            return res.redirect('/login');
        }
    }

    async getEmployees(req, res) {
        try {
            const employees = await userModel.getEmployees();
            if (employees.length) {
                return res.status(200).json({ employees });
            } else {
                return res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}

module.exports = new EmployeesController;
