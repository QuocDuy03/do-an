class ProductsController {
    index(req, res) {
        res.render('products');
    }
}

module.exports = new ProductsController;
