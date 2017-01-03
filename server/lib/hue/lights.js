var config = require('../config/config.json');

var HueApi = require("node-hue-api").HueApi;

var displayResult = function(result) {
    console.log(JSON.stringify(result, null, 2));
};

var host = config.hue.bridge_ip,
    username = config.hue.token,
    api;

api = new HueApi(host, username);

// --------------------------
// Using a promise
api.lights()
    .then(displayResult)
    .done();