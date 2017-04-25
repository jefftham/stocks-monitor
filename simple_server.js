const path = require('path');
const request = require('request');
const express = require('express');
const app = express();
const server = require('http').Server(app);

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


// get the stock api
app.get('/api/:query', function (req, res) {
  console.log(req.params.query);
  const url = 'https://www.alphavantage.co/query?function=' + req.params.query;

  request({
    url: url,
    json: true,
    rejectUnauthorized: false
  }, function (error, response, body) {

    if (!error && response.statusCode === 200) {
      //console.log(body) // Print the json response
      res.send(body);
    }
    if (error) {
      console.log('error: ', error);
      console.log('unable to get data!!!!!!!!');
    }
  });

});


// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));

// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});


server.listen(process.env.PORT || 8080);
