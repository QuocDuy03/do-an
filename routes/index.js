const loginRouter = require('./login');
const registerRouter = require('./register');
const accountRouter = require('./account');
const cartRouter = require('./cart');
const editRouter = require('./edit');
const historyRouter = require('./history');
const myOrderRouter = require('./myorder');
const paymentRouter = require('./payment');
const siteRouter = require('./site');
const authenticateToken = require('../middleware/authenticateToken');

function route(app) {
    app.use('/login', loginRouter);
    app.use('/register', registerRouter);
    app.use('/account', accountRouter);
    app.use('/cart', cartRouter);
    app.use('/edit', editRouter);
    app.use('/history', historyRouter);
    app.use('/myorder', myOrderRouter);
    app.use('/payment', paymentRouter);
    // app.use('/account',authenticateToken, accountRouter);
    // app.use('/cart',authenticateToken, cartRouter);
    // app.use('/edit',authenticateToken, editRouter);
    // app.use('/history',authenticateToken, historyRouter);
    // app.use('/myorder',authenticateToken, myOrderRouter);
    // app.use('/payment',authenticateToken, paymentRouter);
    app.use('/', siteRouter);
}

module.exports = route;