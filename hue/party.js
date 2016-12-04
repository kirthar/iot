var config = require('../config/config.json');

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

// --------------------------
// Using a promise

api.setLightState(1, state.on())
    .then(displayResult)
    .fail(displayError)
    .done();

api.setLightState(1, state.transitionInstant())
    .then(displayResult)
    .fail(displayError)
    .done();

var i = 0;


setInterval(function() {
    if (i % 3 === 0)
        api.setLightState(1, state.rgb(255, 0, 0))
        .then(displayResult)
        .fail(displayError)
        .done();

    else if (i % 3 === 1)
        api.setLightState(1, state.rgb(0, 255, 0))
            .then(displayResult)
            .fail(displayError)
            .done();

    else if (i % 3 === 2)
        api.setLightState(1, state.rgb(0, 0, 255))
            .then(displayResult)
            .fail(displayError)
            .done();

    i++;
}, 100);



