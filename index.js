var config = require('./config/config.json');

var dash_button = require('node-dash-button');

var buttons = [config.buttons.on, config.buttons.nerf];

var dash = dash_button(buttons, null, 1000, 'all'); //address from step above

var customHue = require('./lib/hue/hue');

var hue = require("node-hue-api"),
    HueApi = hue.HueApi,
    lightState = hue.lightState;

var displayResult = function(result) {
    console.log(result);
};

var displayError = function(err) {
    console.error(err);
};

var host = config.hue.bridge_ip,
    username = config.hue.token,
    api = new HueApi(host, username),
    state = lightState.create();


var status = false;


var lightsOn = function () {
    console.log('Turning lights on');
    // Turn on all the lamps
    for(var i = 1; i < 7; i++) {
        api.setLightState(i, state.on())
            .then(displayResult)
            .fail(displayError)
            .done();
    }
};

var lightsOff = function () {
    console.log('Turning lights off');
    for(var i = 1; i < 7; i++) {
        api.setLightState(i, state.off())
            .then(displayResult)
            .fail(displayError)
            .done();
    }
};

dash.on("detected", function (){
    console.log('Button pushed');
    if (!status) {
        lightsOff();
    } else {
        lightsOn();
    }

    status = !status;
});


// WEB APP
var express = require('express');
var app = express();

app.use('/', require('./routes/index'));


app.get('/findlights', function (req, res) {
    var newHue = new customHue(config.hue);

    newHue.findLights(function(result) {
        var lights = result.lights;
        for(var i = 0, len = lights.length; i < len; i++){
            newHue.off(lights[i].id, function(result){console.log("light ", i, " off")});
        }
        res.send(result.lights);
    });
});


app.get('/alloff', function (req, res) {
    lightsOff();
    res.send('' +
        '<a href="/allon"><button>ON !!!</button></a>' +
        '</br>' +
        '<a href="/alloff"><button>OFF</button></a>')
});
// ROUTES
app.get('/allon', function (req, res) {
    lightsOn();
    res.send('' +
        '<a href="/allon"><button>ON !!!</button></a>' +
        '</br>' +
        '<a href="/alloff"><button>OFF</button></a>')
});

app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
});