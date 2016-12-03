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

api.setLightState(3, state.on())
    .then(displayResult)
    .fail(displayError)
    .done();

api.setLightState(3, state.colorLoop())
    .then(displayResult)
    .fail(displayError)
    .done();
