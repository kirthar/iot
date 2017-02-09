var dashConfig = require('../../../config/dash.json');
var hueConfig = require('../../../config/hue.json');
var dash_button = require('node-dash-button');
var buttons = [dashConfig.on, dashConfig.nerf];

var dash = dash_button(buttons, null, 1000, 'all'); //address from step above

var hue = require("../hue/hue");
var hueService = new hue(hueConfig);

var state = false;

dash.on("detected", function (){

    console.log('Button pushed', state);
    if (!state) {
      hueService.setLightStateAll('on', function(){ });
    } else {
      hueService.setLightStateAll('off', function(){ });
    }
    state = !state;
});

console.log('Listening for buttons');
