var CronJob = require('cron').CronJob;
var timeZone = 'America/New_York';
var request = require('request');

/* cron-alike syntax
*    *    *    *    *    *
┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    |
│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL)
*/

function getStockUrl(symbol) {
  return 'http://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + symbol + '&outputsize=compact&interval=1min&apikey=1537';
}


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
      data = JSON.parse(body);

      if (Object.keys(data).length) {
        resolve(data);
      } else {
        reject('No data in the Database.');
      }
    });
  });
}

function getPrice(stock) {
  const stockUrl = getStockUrl(stock.symbol);
  return new Promise((resolve, reject) => {
    request(stockUrl,
      (error, res, body) => {
        // console.log(res.statusCode) // 200
        if (error) {
          reject(error);
        }

        let data = JSON.parse(body);
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

// getPrice({symbol: 'KO'})
// .then( data => console.log(data))

module.exports = {

  run: function () {


    var schdule_wakup = '1 32,45,55 9 * * 1-5'; //every weekday at 9:32.01, 9:45.01, 9:55.01  am
    var schdule_sleep = '1 32,45,55 16 * * 1-5'; //every weekday at 4:32.01, 4:45.01, 4:55.01  pm

    var purchaseDB = 'https://stocks-dd1e5.firebaseio.com/purchase.json';
    var favoriteDB = 'https://stocks-dd1e5.firebaseio.com/favorite.json';

    var purchasedStockList = [];
    var favoriteStockList = [];
    var purDone = false;
    var favDone = false;

    var alertList = [];

    // get data from database
    getStockData(this.purchaseDB)
      .then((data) => {
        this.purchasedStockList = data;
        //console.log(data);

        for (const stock of data) {
          if (stock.alert) {
            this.alertList.push(stock);
          }
        }
        purDone = true;


      })
      .catch(err => {
        console.log(err);
      });

    getStockData(this.favoriteDB)
      .then((data) => {
        this.favoriteStockList = data;

        for (const stock of data) {
          if (stock.alert) {
            this.alertList.push(stock);
          }
        }
        favDone = true;

      })
      .catch(err => console.log(err));

    while (purDone && favDone) {
      purDone = favDone = false;

      // get price based on alertList
      for (const stock of alertList) {
        getPrice(stock)
          .then(data => {
            console.log(stock.symbol + '  : ' + data);
          });
      }

    }




  } //run

}
