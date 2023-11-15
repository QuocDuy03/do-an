const user = require('../models/user');

class SiteController {
    async index(req, res) {

        const allUser = await user.getAllUsers();
        res.json(allUser)
        // res.render('home');
    }

}

module.exports = new SiteController;