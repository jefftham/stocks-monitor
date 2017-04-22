var http = require('http'); //importing http

var options = {
  host: 'jeff-stocks-monitor.herokuapp.com',
  port: 80,
  path: '/wake_up'
};
console.log("======Dyno is Waking Up======");
http.get(options, function (res) {
  res.on('data', function (chunk) {
    try {
      // optional logging... disable after it's working
      console.log("======HEROKU RESPONSE: " + chunk);
    } catch (err) {
      console.log(err.message);
    }
  });
}).on('error', function (err) {
  console.log("Error: " + err.message);
});
