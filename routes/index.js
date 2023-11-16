const loginRouter = require('./guest/login');
const registerRouter = require('./guest/register');
const accountRouter = require('./guest/account');
const cartRouter = require('./guest/cart');
const editRouter = require('./guest/edit');
const historyRouter = require('./guest/history');
const myOrderRouter = require('./guest/myorder');
const paymentRouter = require('./guest/payment');
const siteRouter = require('./guest/site');
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