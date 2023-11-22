class OrdersController {
    index(req, res) {
        res.render('orders');
    }
}

module.exports = new OrdersController;
