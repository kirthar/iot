var dashConfig = require('./dash.json');
var dash_button = require('node-dash-button');
var request = require('request');
var buttons = [dashConfig.on, dashConfig.nerf];

var dash = dash_button(buttons, null, 1000, 'all'); //address from step above


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
