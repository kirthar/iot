var hue = require("node-hue-api"),
    HueApi = hue.HueApi,
    lightState = hue.lightState;

var displayResult = function(result) {
    console.log(result);
};

var displayError = function(err) {
    console.error(err);
};

var host = "192.168.1.34",
    username = "l-0MvFqQ8DGcYb7CRKvumOAgUviEM8-Vbb1pRLRN",
    api = new HueApi(host, username),
    state = lightState.create();

// --------------------------
// Using a promise

// Turn off all the lamps
api.setLightState(1, state.off())
    .then(displayResult)
    .fail(displayError)
    .done();

api.setLightState(2, state.off())
    .then(displayResult)
    .fail(displayError)
    .done();

api.setLightState(3, state.off())
    .then(displayResult)
    .fail(displayError)
    .done();


// Turn on all the lamps
api.setLightState(1, state.on())
    .then(displayResult)
    .fail(displayError)
    .done();

api.setLightState(2, state.on())
    .then(displayResult)
    .fail(displayError)
    .done();

api.setLightState(3, state.on())
    .then(displayResult)
    .fail(displayError)
    .done();