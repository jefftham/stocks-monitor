var twilioClient = require('./twilioClient');
var fs = require('fs');
var admins = require('./administrators.json');

function formatMessage(errorToReport) {
  return 'ALERT! It appears the server is' +
    'having issues. Exception: ' + errorToReport;
};

exports.notifyOnError = function (appError, request, response, next) {
  admins.forEach(function (admin) {
    var messageToSend = formatMessage(appError.message);
    twilioClient.sendSms(admin.phoneNumber, messageToSend);
  });
  next(appError);
};

function formatMessagePrice(stock) {
  return 'ALERT! ' + stock['symbol'] +
    ' price changed attention!! It is ' + stock['close'] + ' now ';
}

exports.notifyOnPrice = function (stock) {
  admins.forEach(function (admin) {
    var messageToSend = formatMessagePrice(stock);
    twilioClient.sendSms(admin.phoneNumber, messageToSend);
  });
  console.log('message sent: ' + stock['symbol'] + ' ' + stock['close']);
}
