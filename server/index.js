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

  function generateCustomers(numberOfCustomers, testHelper) {
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var customers = [];
    var roads = [];
    var postcodes = [];

    for (var i = 0; i < numberOfCustomers; i++) {
      var char = possible.charAt(i % 26);
      var road = char + char + possible.charAt(i % 25) + possible.charAt(i % 24) + " RANDOM ROAD";
      var postcode = char + char + (i % 29) + " " + (i % 9) + char + char;

      roads.push({
        id: i + 1,
        name: road
      });
      postcodes.push({
        id: i + 1,
        postcode: postcode
      });
      customers.push({
        id: i + 1,
        addressOne: (i + 1) + "",
        addressTwo: road,
        postcode: postcode,
        telephone: "0" + (2090000000 - i)
      });
    }

    testHelper.roads = roads;
    testHelper.postcodes = postcodes;
    testHelper.customers = customers;
    testHelper.genericError = function (status, message) {
      var statusMap = {};
      statusMap["400"] = "Bad Request";
      statusMap["502"] = "Bad Gateway";

      return {
        errors: [{
          error: statusMap[status],
          exception: "com.lovetalaythai.eposdataservice.generic.exception",
          message: message,
          status: parseInt(status),
          timestamp: 1445811517596
        }]
      }
    }
  }

  app.testHelper = {}
  generateCustomers(100, app.testHelper);

  mocks.forEach(function(route) { route(app); });
  proxies.forEach(function(route) { route(app); });

};
