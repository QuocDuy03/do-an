const loginRouter = require('./guest/login');
const registerRouter = require('./guest/register');
const accountRouter = require('./guest/account');
const cartRouter = require('./guest/cart');
const editRouter = require('./guest/edit');
const historyRouter = require('./guest/history');
const myOrderRouter = require('./guest/myorder');
const paymentRouter = require('./guest/payment');
const siteRouter = require('./guest/site');
const productsRouter = require('./guest/products');
const customersRouter = require('./admin/customers');
const dashboardRouter = require('./admin/dashboard');
const employeesRouter = require('./admin/employees');
const ordersRouter = require('./admin/orders');
const productsManageRouter = require('./admin/products');

const authenticateToken = require('../middleware/authenticateToken');

function route(app) {

    app.use('/admin/login', loginRouter);
    app.use('/admin/register', registerRouter);
    app.use('/admin/employees',authenticateToken, employeesRouter);
    app.use('/admin/orders',authenticateToken, ordersRouter);
    app.use('/admin/products',authenticateToken, productsManageRouter);
    app.use('/admin/customers',authenticateToken, customersRouter);
    app.use('/admin/dashboard',authenticateToken, dashboardRouter);

    app.use('/login', loginRouter);
    app.use('/register', registerRouter);
    app.use('/products', productsRouter);
    app.use('/account',authenticateToken, accountRouter);
    app.use('/cart',authenticateToken, cartRouter);
    app.use('/edit',authenticateToken, editRouter);
    app.use('/history',authenticateToken, historyRouter);
    app.use('/myorder',authenticateToken, myOrderRouter);
    app.use('/payment',authenticateToken, paymentRouter);
    app.use('/' ,siteRouter);
}

module.exports = route;