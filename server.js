const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

app.use(express.static('public'));
app.use(express.json());


app.get('/', (req, res) => {
    res.sendFile('home.html', {root: 'public'});
});

app.listen(port, function(err) {
    if (err) {
        console.log('Something went wrong', err);
    } else {
        console.log('Server is listening on port ' + port);
    }
});
