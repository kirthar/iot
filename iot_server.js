var seneca = require('seneca')();
require('./roles/light')(seneca);

var command = {role: 'math', cmd: 'sum', light_id: 1};

seneca.act(command, function (err, result) {
  if (err) return console.error(err);
  console.log(result);
});
