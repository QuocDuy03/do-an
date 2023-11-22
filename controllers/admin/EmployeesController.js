class EmployeesController {
    index(req, res) {
        res.render('employees');
    }
}

module.exports = new EmployeesController;
