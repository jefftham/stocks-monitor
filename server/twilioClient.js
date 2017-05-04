var config = require('./config');
var client = require('twilio')(config.accountSid, config.authToken);

module.exports.sendSms = function (to, message) {
  client.messages.create({
    body: message,
    to: to,
    from: config.sendingNumber
    //  mediaUrl: imageUrl
  }, function (err, data) {
    if (err) {
      console.error(new Date().toLocaleString() + ' Could not notify administrator');
      console.error(err);
    } else {
      console.log(new Date().toLocaleString() + ' Administrator notified');
    }
  });
};
