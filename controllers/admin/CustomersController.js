class CustomersController {
    index(req, res) {
        res.render('customers');
    }
}

module.exports = new CustomersController;
