const path = require('path');
const request = require('request');
const express = require('express');
const router = express.Router();

// Map routes to controller functions

// get the stock api
router.get('/api/:query', function (req, res) {
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


router.get('/error', function (req, resp) {
  throw new Error('Derp. An error occurred.');
});

// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
router.get('**', function (req, res) {
  res.sendFile(path.join(__dirname + './../dist/index.html'));
});




module.exports = router;
