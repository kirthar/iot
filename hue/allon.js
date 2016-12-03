var hue = require("node-hue-api"),
    HueApi = hue.HueApi,
    lightState = hue.lightState;

var displayResult = function(result) {
    console.log(result);
};

var displayError = function(err) {
    console.error(err);
};

var host = "192.168.1.39",
    username = "l-0MvFqQ8DGcYb7CRKvumOAgUviEM8-Vbb1pRLRN",
    api = new HueApi(host, username),
    state = lightState.create();

// --------------------------
// Using a promise

for(var i = 1; i < 7; i++) {
    api.setLightState(i, state.on())
        .then(displayResult)
        .fail(displayError)
        .done();
}
