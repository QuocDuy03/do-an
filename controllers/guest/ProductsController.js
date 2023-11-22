class ProductsController {
    male(req, res) {
        res.render('Nam');
    }

    female(req, res) {
        res.render('Nu');
    }

    baby(req, res) {
        res.render('Tre_em');
    }
}

module.exports = new ProductsController;
