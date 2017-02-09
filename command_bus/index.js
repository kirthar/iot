require('seneca')(  { errhandler: function( err ) { console.log(err); } } )
  .use(require('./roles/light'), {lightApiUrl: 'http://localhost:3001/api'})
  .listen();
