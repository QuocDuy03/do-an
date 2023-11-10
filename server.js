const express = require('express');
const path = require('path');
const app = express();

const port = 8080;

const route = require('./routes');
const db = require('./config/database');

db.connect();


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

route(app);

app.listen(port, function(err) {
    if (err) {
        console.log('Something went wrong', err);
    } else {
        console.log('Server is listening on port ' + port);
    }
});
