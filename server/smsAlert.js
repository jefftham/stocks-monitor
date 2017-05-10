const request = require('request');
const twilio = require('./twilioNotifications');
const EventEmitter = require('events');
class StockEventEmitter extends EventEmitter {}
const stockAlert = new StockEventEmitter();
const config = require('./config');


// console.log('process.env.TWILIO_SENT_SMS  ', process.env.TWILIO_SENT_SMS);
// console.log('typeof  ', typeof process.env.TWILIO_SENT_SMS);
const sendSMS = (('' + process.env.TWILIO_SENT_SMS).toLowerCase() == 'true');
console.log('sendSMS : ', sendSMS);


function getStockUrl(symbol) {
  return 'http://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + symbol + '&outputsize=compact&interval=1min&apikey=1537';
}


const purchaseDB = config.purchasedDB || 'https://stocks-dd1e5.firebaseio.com/purchase.json';
const favoriteDB = config.favoriteDB || 'https://stocks-dd1e5.firebaseio.com/favorite.json';

const stockEnum = {
  '1. open': 'open',

  '2. high': 'high',

  '3. low': 'low',

  '4. close': 'close',

  '5. volume': 'volume'
};

function getStockData(db) {
  return new Promise((resolve, reject) => {
    request(db, function (error, response, body) {
      // console.log('error:', error); // Print the error if one occurred
      //  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      // console.log('body:', body); // Print the HTML for the Google homepage.

      if (!error && response.statusCode == 200) {
        data = JSON.parse(body);

        if (data) {
          resolve(data);
        } else {
          reject('No data in the Database.');
        }
      }

    });
  });
}

function getPrice(stock) {
  const stockUrl = getStockUrl(stock.symbol);
  // console.log("Stock URL: ", stockUrl);
  return new Promise((resolve, reject) => {
    request(stockUrl,
      (error, response, body) => {
        // console.log(res.statusCode) // 200
        if (error) {
          reject(error);
        }

        if (!error && response.statusCode == 200) {
          let data = JSON.parse(body);
          // parse data, just return the latest stock price
          // console.log('latest data of ' + symbol + ' : ', Object.keys(data['Time Series (Daily)'])[0]);
          if (data && data['Time Series (Daily)'] && data['Time Series (Daily)'][Object.keys(data['Time Series (Daily)'])[0]]) {
            data = data['Time Series (Daily)'][Object.keys(data['Time Series (Daily)'])[0]];

            // change the data key with stockEnum
            const newData = {};
            // tslint:disable-next-line:forin
            for (const key in data) {
              newData[stockEnum[key]] = parseFloat(parseFloat(data[key]).toFixed(2));
            }
            //  console.log(newData);
            resolve(newData);
          }
        }
      });
  });
}

// getPrice({symbol: 'KO'})
// .then( data => console.log(data))

function Checker() {

  const self = this;
  this.stockSent = [];
  const purchasedStockList = [];
  const favoriteStockList = [];
  this.count = 0;

  this.run = function () {

    // get data from database
    getStockData(purchaseDB)
      .then((data) => {
        this.purchasedStockList = data;
        // console.log('purchasedStockList : ', this.purchasedStockList);

        for (const stock of data) {
          if (stock.alert) {
            stockAlert.emit('addStock', stock);
          }
        }
      })
      .catch(err => {
        console.log(err);
      });

    getStockData(favoriteDB)
      .then((data) => {
        this.favoriteStockList = data;
        //  console.log('favoriteStockList : ',  this.favoriteStockList);

        for (const stock of data) {
          if (stock.alert) {
            stockAlert.emit('addStock', stock);
          }
        }
      })
      .catch(err => console.log(err));

  }; //run


  this.reset = function () {
    console.log('Before: length of stockSent = ' + self.stockSent.length);
    this.stockSent = [];
    this.purchasedStockList = [];
    this.favoriteStockList = [];

    console.log('reseting... ');
    console.log('After: length of stockSent = ' + self.stockSent.length);

  };

  // self execution function as listener
  function listener() {
    //  console.log("self execution function is running...")
    stockAlert.on('addStock', (stock) => {
      ++self.count;
      console.log(new Date().toLocaleString() + '  listener called ' + self.count);
      // console.log('stockAlert on addStock: ', stock.symbol);
      // get price based on alertList

      getPrice(stock)
        .then(data => {
          // console.log('getPrice : ' + stock.symbol + '  : ' + JSON.stringify(data));

          // build latest stock price into stock object
          for (const key of Object.keys(data)) {
            stock[key] = data[key];
          }

          // console.log('latest stock detail: ', JSON.stringify(stock));

          // minPrice  drop alert
          if (stock.close <= stock.minPrice) {
            console.log(new Date().toLocaleString() + ' price DROP alert: ' + stock.symbol + ' has dropped at ' + stock.close);

            if (self.stockSent.indexOf(stock.symbol) === -1) {
              // did not send sms today
              self.stockSent.push(stock.symbol);
              console.log(new Date().toLocaleString() + ' Sending sms now for ' + stock.symbol);

              if (sendSMS) {
                twilio.notifyOnPriceDrop(stock);
              }

            } else {
              console.log(new Date().toLocaleString() + ' Already sent sms today for ' + stock.symbol);
            }

          }

          // minPrice  rise alert
          if (stock.close >= stock.maxPrice) {
            console.log(new Date().toLocaleString() + ' price RISE alert: ' + stock.symbol + ' has risen at ' + stock.close);


            if (self.stockSent.indexOf(stock.symbol) === -1) {
              // did not send sms today
              self.stockSent.push(stock.symbol);
              console.log(new Date().toLocaleString() + ' Sending sms now for ' + stock.symbol);

              if (sendSMS) {
                twilio.notifyOnPriceRise(stock);
              }


            } else {
              console.log(new Date().toLocaleString() + ' Already sent sms today for ' + stock.symbol);
            }

          }


        });


    });
    // anonymous end
  }
  listener();

} // Checker end


var checkerInstance = new Checker();

module.exports = {

  // just pass the instance
  checker: checkerInstance

};
