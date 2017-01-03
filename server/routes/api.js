const express = require('express');
const router = express.Router();

// declare axios for making http requests
const axios = require('axios');
const API = 'https://jsonplaceholder.typicode.com';

var config = require('../../config/config.json');
var customHue = require('../lib/hue/hue');

var hue = require("node-hue-api"),
  HueApi = hue.HueApi,
  lightState = hue.lightState;


var host = config.hue.bridge_ip,
  username = config.hue.token,
  api = new HueApi(host, username),
  state = lightState.create();


var lightOn = function (light) {
  api.setLightState(light, state.on())
    .done();
};

var lightOff = function (light) {
  api.setLightState(light, state.off())
    .done();
};

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

// Get all posts
router.get('/posts', (req, res) => {
  // Get posts from the mock api
  // This should ideally be replaced with a service that connects to MongoDB
  axios.get(`${API}/posts`)
  .then(posts => {
  res.status(200).json(posts.data);
})
.catch(error => {
  res.status(500).send(error);
});
});


router.get('/lights', function (req, res) {
  var newHue = new customHue(config.hue);

  newHue.findLights(function(result) {
    res.status(200).json(result);
  });
});


router.get('/on/:light', function (req, res) {
  lightOn(req.params['light']);
  res.status(200).send();
});
// ROUTES
router.get('/off/:light', function (req, res) {
  lightOff(req.params['light']);
  res.status(200).send();
});

module.exports = router;
