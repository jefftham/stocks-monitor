var twilioClient = require('./twilioClient');
var admins = require('./administrators.json');
var request = require('request');

function formatMessagePrice(stock) {
  return 'ALERT! ' + stock['symbol'] +
    ' price changed attention!! It is ' + stock['close'] + ' now ';
}

function notifyOnPrice (stock) {
  admins.forEach(function (admin) {
    var messageToSend = formatMessagePrice(stock);
    twilioClient.sendSms(admin.phoneNumber, messageToSend);
  });
  console.log('message sent: ' + stock['symbol'] + ' ' + stock['close']);
}


var stock = {symbol:'testStock', close:15.00};

notifyOnPrice(stock)



var purchaseDB = 'https://stocks-dd1e5.firebaseio.com/purchase.json';
var favoriteDB = 'https://stocks-dd1e5.firebaseio.com/favorite.json';


function getStockData(db) {

  return new Promise((resolve, reject) => {
    request(db, function (error, response, body) {
      // console.log('error:', error); // Print the error if one occurred
      //  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      // console.log('body:', body); // Print the HTML for the Google homepage.
      data = JSON.parse(body);

      if (Object.keys(data).length) {
        resolve(data);
      } else {
        reject('No data in the Database.');
      }
    });
  });
}


// https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=KO&outputsize=compact&interval=1min&apikey=1537

function getStockUrl(symbol){
    return 'http://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+symbol+'&outputsize=compact&interval=1min&apikey=1537';
}

const stockEnum = {
    '1. open': 'open',

    '2. high': 'high',

    '3. low': 'low',

    '4. close': 'close',

    '5. volume': 'volume'
};

function getPrice(stock){
const stockUrl = getStockUrl(stock.symbol);
 return new Promise((resolve, reject) => {
    request(stockUrl,
            (error, res, body) =>{
                // console.log(res.statusCode) // 200
                if(error){ reject(error); }

                    let data = JSON.parse( body );
                    // parse data, just return the latest stock price
                    // console.log('latest data of ' + symbol + ' : ', Object.keys(data['Time Series (Daily)'])[0]);
                    data = data['Time Series (Daily)'][Object.keys(data['Time Series (Daily)'])[0]];

                    // change the data key with stockEnum
                    const newData = {};
                    // tslint:disable-next-line:forin
                    for (const key in data) {
                        newData[stockEnum[key]] = parseFloat(parseFloat(data[key]).toFixed(2));
                    }
                        console.log(newData);
                        resolve(newData);
            });
    });
}

getPrice({symbol: 'KO'})
.then( data => console.log(data))
