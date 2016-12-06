var HueApi = require("node-hue-api").HueApi;

function Hue(config) {
    this.api = new HueApi(config.bridge_ip, config.token);
}

var displayResult = function(result) {
    //console.log(JSON.stringify(result, null, 2));
    return result;
};

Hue.prototype.findLights = function(callback) {

    this.api.lights()
        .then(function(result) {
            callback(result);
        })
        .done();
};

module.exports = Hue;