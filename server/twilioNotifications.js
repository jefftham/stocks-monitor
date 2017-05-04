var twilioClient = require('./twilioClient');
var fs = require('fs');
var admins = require('./administrators.json');

function formatMessage(errorToReport) {
  return new Date().toLocaleString() + ' ALERT! It appears the server is' +
    'having issues. Exception: ' + errorToReport;
}

exports.notifyOnError = function (appError, request, response, next) {
  admins.forEach(function (admin) {
    var messageToSend = formatMessage(appError.message);
    twilioClient.sendSms(admin.phoneNumber, messageToSend);
  });
  next(appError);
};

function formatMessagePriceDrop(stock) {
  return new Date().toLocaleString() + ' ALERT! ' + stock['symbol'] +
    ' is dropping to ' + stock['close'] + ' now ';
}


exports.notifyOnPriceDrop = function (stock) {
  admins.forEach(function (admin) {
    var messageToSend = formatMessagePriceDrop(stock);
    twilioClient.sendSms(admin.phoneNumber, messageToSend);
  });
  console.log(new Date().toLocaleString() + ' message sent: ' + stock['symbol'] + ' ' + stock['close']);
};

function formatMessagePriceRise(stock) {
  return new Date().toLocaleString() + ' ALERT! ' + stock['symbol'] +
    ' is rising to ' + stock['close'] + ' now ';
}

exports.notifyOnPriceRise = function (stock) {
  admins.forEach(function (admin) {
    var messageToSend = formatMessagePriceRise(stock);
    twilioClient.sendSms(admin.phoneNumber, messageToSend);
  });
  console.log(new Date().toLocaleString() + ' message sent: ' + stock['symbol'] + ' ' + stock['close']);
};
