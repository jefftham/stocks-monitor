var path = require('path');
var dotenv = require('dotenv');
var cfg = {};

// did not specific whether the server is production or test ot development
if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'development') {
  dotenv.config({
    path: path.join(__dirname, './../.env')
  });
} else {
  dotenv.config({
    path: path.join(__dirname, './../.env.test'),
    silent: true
  });
}

// console.log('path: ' + path.join(__dirname, './../.env'));

// HTTP Port to run our web application
cfg.port = process.env.PORT || 8080;

// A random string that will help generate secure one-time passwords and
// HTTP sessions
cfg.secret = process.env.APP_SECRET || 'keyboard cat';

// Your Twilio account SID and auth token, both found at:
// https://www.twilio.com/user/account
//
// A good practice is to store these string values as system environment
// variables, and load them from there as we are doing below. Alternately,
// you could hard code these values here as strings.
cfg.accountSid = process.env.TWILIO_ACCOUNT_SID;
cfg.authToken = process.env.TWILIO_AUTH_TOKEN;
cfg.sendingNumber = process.env.TWILIO_NUMBER;

cfg.purchasedDB = process.env.purchasedDB;
cfg.favoriteDB = process.env.favoriteDB;

cfg.HEROKU_HOST = process.env.HEROKU_HOST;

var requiredConfig = [cfg.accountSid, cfg.authToken, cfg.sendingNumber];
var isConfigured = requiredConfig.every(function (configValue) {
  return configValue || false;
});

if (!isConfigured) {
  var errorMessage =
    'TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_NUMBER must be set.';

  throw new Error(errorMessage);
}

// Export configuration object
module.exports = cfg;
