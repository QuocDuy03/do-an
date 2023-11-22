class CartController {
    index(req, res) {
        res.render('cart');
    }
}

module.exports = new CartController;
