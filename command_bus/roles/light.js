module.exports = function (options) {
  let baseUrl = options.lightApiUrl;
  this.add('role:light,cmd:list', (msg, reply) => {
    request.get(baseUrl + 'lights', function (err, response, body) {
      reply(err, JSON.parse(body));
    });
  });

  this.add('role:light,cmd:on', (msg, reply) => {
    request.get(`${baseUrl}/lights/${msg.light_id}/on`, function (err, response, body) {
      reply(err, JSON.parse(body));
    });
  });

  this.add('role:light,cmd:off', (msg, reply) => {
    request.get(`${baseUrl}/lights/${msg.light_id}/off`, function (err, response, body) {
      reply(err, JSON.parse(body));
    });
  });

  this.add('role:light,cmd:bri', (msg, reply) => {
    request.get(`${baseUrl}/lights/${msg.light_id}/bri/${msg.bri}`, function (err, response, body) {
      reply(err, JSON.parse(body));
    });
  });
}
