const loginRouter = require('./login');
const registerRouter = require('./register');
const accountRouter = require('./account');
const cartRouter = require('./cart');
const editRouter = require('./edit');
const historyRouter = require('./history');
const myOrderRouter = require('./myorder');
const paymentRouter = require('./payment');
const siteRouter = require('./site');

function route(app) {
    app.use('/login', loginRouter);
    app.use('/register', registerRouter);
    app.use('/account', accountRouter);
    app.use('/cart', cartRouter);
    app.use('/edit', editRouter);
    app.use('/history', historyRouter);
    app.use('/myorder', myOrderRouter);
    app.use('/payment', paymentRouter);
    app.use('/', siteRouter);
}

module.exports = route;