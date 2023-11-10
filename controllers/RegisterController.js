class RegisterController {
    index(req, res) {
        res.render('register');
    }
}

module.exports = new RegisterController;

