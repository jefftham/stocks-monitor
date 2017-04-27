var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');
var morgan = require('morgan');
var csurf = require('csurf');

var config = require('./config');
var twilioNotifications = require('./twilioNotifications');
var schedule = require('./schedule')();

// Create Express web app
var app = express();

// Use morgan for HTTP request logging in dev and prod
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'));
}

// Serve static assets
// app.use(express.static(path.join(__dirname, 'public')));

// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + './../dist'));

// Parse incoming form-encoded HTTP bodies
app.use(bodyParser.urlencoded({
  extended: true
}));

// Create and manage HTTP sessions for all requests
app.use(session({
  secret: config.secret,
  resave: false,
  saveUninitialized: true
}));

// Use connect-flash to persist informational messages across redirects
app.use(flash());

app.use(function (req, res, next) {
  //  res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Expose-Headers', 'Content-Length');
  res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');

  if (req.method === 'OPTIONS') {
    return res.send(200);
  } else {
    return next();
  }
});


// Configure application routes
var routes = require('./router');


// Add CSRF protection for web routes
if (process.env.NODE_ENV !== 'test') {
  app.use(csurf());
  app.use(function (request, response, next) {
    response.locals.csrftoken = request.csrfToken();
    next();
  });
}

app.use(routes);

// Handle 404
// app.use(function (request, response, next) {
//   response.status(404);
//   response.sendFile(path.join(__dirname, './../dist/index.html'));
// });

// 404 catch
// app.all('*', (req, res) => {
//   console.log(`[TRACE] Server 404 request: ${req.originalUrl}`);
//   res.status(200).sendFile(path.join(__dirname, './../dist/index.html'));
// });

// Mount middleware to notify Twilio of errors
// app.use(twilioNotifications.notifyOnError);

// Handle Errors
// app.use(function (err, request, response, next) {
//   console.error('An application error has occurred:');
//   console.error(err.stack);
//   response.status(500);
//   response.sendFile(path.join(__dirname, 'public', '500.html'));
// });

// Export Express app
module.exports = app;
