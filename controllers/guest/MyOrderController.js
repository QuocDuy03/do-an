class MyOrderController {
    index(req, res) {
        res.render('myorder');
    }
}

module.exports = new MyOrderController;
