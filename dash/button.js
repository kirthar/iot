var config = {};
config.BUTTON_MAC = "ac:63:be:d3:84:f7";
config.HUE_BRIDGE_IP = "192.168.1.39";
config.HUE_BRIDGE_TOKEN = "l-0MvFqQ8DGcYb7CRKvumOAgUviEM8-Vbb1pRLRN";

var dash_button = require('node-dash-button');

var dash = dash_button(config.BUTTON_MAC, null, 1000, 'all'); //address from step above

var hue = require("node-hue-api"),
    HueApi = hue.HueApi,
    lightState = hue.lightState;

var displayResult = function(result) {
    console.log(result);
};

var displayError = function(err) {
    console.error(err);
};

var host = config.HUE_BRIDGE_IP,
    username = config.HUE_BRIDGE_TOKEN,
    api = new HueApi(host, username),
    state = lightState.create();


var status = false;


dash.on("detected", function (){
    console.log('Button pushed');
    if (!status) {
        console.log('Turning lights off');
        for(var i = 1; i < 7; i++) {
            api.setLightState(i, state.of())
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