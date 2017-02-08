var hue = require("node-hue-api");
var HueApi = hue.HueApi;

class Hue {

  constructor(config) {
    this.api = new HueApi(config.bridge_ip, config.token);
    this.state = hue.lightState.create();

    this.lightModes = {
      'party': this.partyMode,
      'on': this.onMode,
      'off': this.offMode
    };
  }

  partyMode(hue, light, callback) {
    callback();
  }

  onMode(hue, light, callback) {
    hue.api.setLightState(light, hue.state.on())
      .then(callback)
      .fail(callback)
      .done();
  }

  offMode(hue, light, callback) {
    hue.api.setLightState(light, hue.state.off())
      .then(callback)
      .fail(callback)
      .done();
  }

  findLights(callbackOk, callbackError) {
    this.api.lights()
      .then(callbackOk)
      .fail(callbackError || callbackOk)
      .done();
  };

  setLightState(light, state, callback) {
    this.lightModes[state](this, light, callback);
  };

  setLightStateAll(state, callback) {
    console.log('Set all lights to ', state);
    let that = this;
    this.findLights(function(data){
      let lights = data.lights;
      console.log(`Found ${lights.length} lights`);
      for(var i = 0;  i < lights.length; i++) {
        that.lightModes[state](that, lights[i].id, callback);
      }
    }, function(error){
      console.log(error);
      console.log("Error finding lights")});
  };
}
module.exports = Hue;
