var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.send('' +
        '<a href="/allon"><button>ON !!!</button></a>' +
        '</br>' +
        '<a href="/alloff"><button>OFF</button></a>')
});