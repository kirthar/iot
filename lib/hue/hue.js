var hue = require("node-hue-api");
var HueApi = hue.HueApi;

function Hue(config) {
    this.api = new HueApi(config.bridge_ip, config.token);
    this.state = hue.lightState.create();
}

Hue.prototype.findLights = function(callback) {

    this.api.lights()
        .then(callback)
        .done();
};

Hue.prototype.off = function(light, callback) {
    this.api.setLightState(light, this.state.off())
        .then(callback)
        .fail(callback)
        .done();
};

module.exports = Hue;