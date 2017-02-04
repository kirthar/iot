function init(seneca) {
  seneca.add('role:light,cmd:on', (msg, reply) => {
    reply(null, {answer: (msg.light_id)});
  });

  seneca.add('role:light,cmd:off', (msg, reply) => {
    reply(null, {answer: (msg.light_id)});
  });

  seneca.add('role:light,cmd:bri', (msg, reply) => {
    reply(null, {answer: (msg.light_id)});
  });
}

module.exports = function(seneca) {
  init(seneca);
};


