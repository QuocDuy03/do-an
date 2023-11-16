const user = require('../../models/user');

class SiteController {
    async index(req, res) {
        res.render('home', {
            name: req.body.name
        });
    }

}

module.exports = new SiteController;