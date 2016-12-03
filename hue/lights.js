var HueApi = require("node-hue-api").HueApi;

var displayResult = function(result) {
    console.log(JSON.stringify(result, null, 2));
};

var host = "192.168.1.39",
    username = "l-0MvFqQ8DGcYb7CRKvumOAgUviEM8-Vbb1pRLRN",
    api;

api = new HueApi(host, username);

// --------------------------
// Using a promise
api.lights()
    .then(displayResult)
    .done();

// --------------------------
// Using a callback
api.lights(function(err, lights) {
    if (err) throw err;
    displayResult(lights);
});