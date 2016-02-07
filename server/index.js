// To use it create some files under `mocks/`
// e.g. `server/mocks/ember-hamsters.js`
//
// module.exports = function(app) {
//   app.get('/ember-hamsters', function(req, res) {
//     res.send('hello');
//   });
// };

module.exports = function(app) {
  var globSync   = require('glob').sync;
  var mocks      = globSync('./mocks/**/*.js', { cwd: __dirname }).map(require);
  var proxies    = globSync('./proxies/**/*.js', { cwd: __dirname }).map(require);

  // Log proxy requests
  var morgan  = require('morgan');
  app.use(morgan('dev'));

  if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(searchString, position) {
      position = position || 0;
      return this.indexOf(searchString, position) === position;
    };
  }

  function genericError(status, message) {
    var status = {};
    status["400"] = "Bad Request";
    status["502"] = "Bad Gateway";

    return {
      errors: [{
        error: status[400],
        exception: "com.lovetalaythai.eposdataservice.generic.exception",
        message: message,
        status: status,
        timestamp: 1445811517596
      }]
    }
  }

  mocks.forEach(function(route) { route(app); });
  proxies.forEach(function(route) { route(app); });

};
