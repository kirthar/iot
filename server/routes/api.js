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
  api.setLightState(light, state.on()).then(callback).fail(function(err){console.log('Error:', err)})
    .done();
};

var lightOff = function (light, callback) {
  api.setLightState(light, state.off()).then(callback).fail(function(err){console.log('Error:', err)})
};

var setBri = function (light, bri, callback) {
  api.setLightState(light, state.on().brightness(bri)).then(callback).fail(function(err){console.log('Error:', err)})
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
  }, function(err){console.log(err)});
});

router.get('/lights/:light', function (req, res) {
  api.lightStatus(req.params['light']).then(function(result) {
    res.status(200).json(result);
  }).done();
});

router.get('/lights/:light/on', function (req, res) {
  lightOn(req.params['light'], function(){
    api.lightStatus(req.params['light']).then(function(result) {
      res.status(200).json(result);
    }).done();
  });
});

router.get('/lights/:light/off', function (req, res) {
  lightOff(req.params['light'], function() {
    api.lightStatus(req.params['light']).then(function(result) {
      res.status(200).json(result);
    }).fail(function(err){console.log('Error:', err)}).done();
  });
});

router.get('/lights/:light/bri/:bri', function (req, res) {
  setBri(req.params['light'], req.params['bri'], function() {
    api.lightStatus(req.params['light']).then(function(result) {
      res.status(200).json(result);
    }).fail(function(err){console.log('Error:', err)}).done();
  });
});


module.exports = router;
