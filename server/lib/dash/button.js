var hueConfig = require('../config/hue.json');
    dashConfig = require('../config/dash.json');

var dash_button = require('node-dash-button');

var buttons = [dashConfig.on, dashConfig.nerf];

var dash = dash_button(buttons, null, 1000, 'all'); //address from step above

var hue = require("node-hue-api"),
    HueApi = hue.HueApi,
    lightState = hue.lightState;

var displayResult = function(result) {
    console.log(result);
};

var displayError = function(err) {
    console.error(err);
};

var host = hueConfig.bridge_ip,
    username = hueConfig.token,
    api = new HueApi(host, username),
    state = lightState.create();


var status = false;


dash.on("detected", function (){
    console.log('Button pushed');
    if (!status) {
        console.log('Turning lights off');
        for(var i = 1; i < 7; i++) {
            api.setLightState(i, state.off())
                .then(displayResult)
                .fail(displayError)
                .done();
        }
    } else {
        console.log('Turning lights on');
        // Turn on all the lamps
        for(var i = 1; i < 7; i++) {
            api.setLightState(i, state.on())
                .then(displayResult)
                .fail(displayError)
                .done();
        }
    }

    status = !status;


});
