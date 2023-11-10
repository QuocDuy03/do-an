class PaymentController {
    index(req, res) {
        res.render('payment');
    }
}

module.exports = new PaymentController;
