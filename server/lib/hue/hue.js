var hue = require("node-hue-api");
var HueApi = hue.HueApi;

function Hue(config) {
    this.api = new HueApi(config.bridge_ip, config.token);
    this.state = hue.lightState.create();
}

Hue.prototype.findLights = function(callbackOk, callbackError) {

    this.api.lights()
        .then(callbackOk)
        .fail(callbackError || callbackOk)
        .done();
};

lightStates = {
  'party': function(light, callback){ callback();},
  'on': function(light, callback){ this.api.setLightState(light, this.state.on())
    .then(callback)
    .fail(callback)
    .done();},
  'off': function(light, callback){ this.api.setLightState(light, this.state.off())
    .then(callback)
    .fail(callback)
    .done();},
};

Hue.prototype.setLightState = function(light, state, callback) {
  lightStates[state](callback);
};

Hue.prototype.setLightStateAll = function(state, callback) {
  this.findLights(function(lights){
    for(var i = 0;  i < lights.length; i++) {
      lightStates[state](lights[i].id, callback);
    }
  }, function(){console.log("Error finding lights")});
};


module.exports = Hue;
