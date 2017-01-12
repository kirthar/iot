const express = require('express');
const router = express.Router();

var config = require('../../config/hue.json');
var customHue = require('../lib/hue/hue');

var hue = require("node-hue-api"),
  HueApi = hue.HueApi,
  lightState = hue.lightState;

var host = config.bridge_ip,
  username = config.token,
  api = new HueApi(host, username),
  state = lightState.create();


var lightOn = function (light, callback) {
  api.setLightState(light, state.on()).then(callback)
    .done();
};

var lightOff = function (light, callback) {
  api.setLightState(light, state.off()).then(callback)
};

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

/* GET Lights */
router.get('/lights', function (req, res) {
  var newHue = new customHue(config);

  newHue.findLights(function(result) {
    res.status(200).json(result);
  });
});

router.get('/lights/:light', function (req, res) {
  api.lightStatusWithRGB(req.params['light']).then(function(result) {
    res.status(200).json(result);
  }).done();
});

router.get('/lights/:light/on', function (req, res) {
  lightOn(req.params['light'], function(){
    api.lightStatusWithRGB(req.params['light']).then(function(result) {
      res.status(200).json(result);
    }).done();
  });
});

router.get('/lights/:light/off', function (req, res) {
  lightOff(req.params['light'], function() {
    api.lightStatusWithRGB(req.params['light']).then(function(result) {
      res.status(200).json(result);
    }).done();
  });
});

module.exports = router;
