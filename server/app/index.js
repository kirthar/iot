// WEB APP
var express = require('express');
var app = express();

// ROUTES
app.get('/', function (req, res) {
    res.send('<a href="/alloff">OFF !</a><br /><a href="/allon">ON !!!</a>')
});

app.get('/alloff', function (req, res) {
    res.send('Hello World!')
});
// ROUTES
app.get('/allon', function (req, res) {
    res.send('Hello World!')
});

app.get('/alloff', function (req, res) {
    res.send('Hello World!')
});

app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
});