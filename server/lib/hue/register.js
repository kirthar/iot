var config = require('../config/hue.json');

var HueApi = require("node-hue-api").HueApi;

var hostname = config.bridge_ip,
    userDescription = "IoT webapp";

var displayUserResult = function(result) {
    console.log("Created user: " + JSON.stringify(result));
};

var displayError = function(err) {
    console.log(err);
};

var hue = new HueApi();

// --------------------------
// Using a promise
hue.registerUser(hostname, userDescription)
    .then(displayUserResult)
    .fail(displayError)
    .done();
