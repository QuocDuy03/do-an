class CartController {
    async index(req, res) {
        res.render('cart', {
            user: req.user
        });
    }
}

module.exports = new CartController;
