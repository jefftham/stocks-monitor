#!/usr/bin/env nodejs

var http = require('http');
var config = require('./server/config');

// Create Express web app
var app = require('./server/webapp');

// const server = require('http').Server(app);

// check if it running in Heroku
if (process.env.NODE && ~process.env.NODE.indexOf("heroku")) {
  // If an incoming request uses
  // a protocol other than HTTPS,
  // redirect that request to the
  // same url but with HTTPS
  const forceSSL = function () {
    return function (req, res, next) {
      if (req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect(['https://', req.get('Host'), req.url].join(''));
      }
      next();
    };
  };

  // Instruct the app
  // to use the forceSSL
  // middleware
  app.use(forceSSL());


  // Start the app by listening on the default
  // Heroku port
  app.listen(process.env.PORT || 8080);

} else {

  var server = http.createServer(app);
  server.listen(config.port, () => {
    console.log("Server running......")
    console.log("http://localhost:" + config.port + "/");
  });
}
