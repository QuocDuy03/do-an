const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();

dotenv.config();
const port = process.env.PORT || 3000;

const route = require('./routes');
const db = require('./config/database');

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
db.connect();
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
app.set('views', [
    path.join(__dirname, 'views/admin'),
    path.join(__dirname, 'views/clients'),
    path.join(__dirname, 'views/auth')
]);

route(app);

app.listen(port, function (err) {
    if (err) {
        console.log('Something went wrong', err);
    } else {
        console.log('Server is listening on port ' + port);
    }
});
