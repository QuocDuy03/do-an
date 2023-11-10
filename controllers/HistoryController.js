class HistoryController {
    index(req, res) {
        res.render('history');
    }
}

module.exports = new HistoryController;
