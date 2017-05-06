  const later = require('later');
  later.date.localTime();
  const smsAlert = require('./smsAlert');
  const http = require('http'); //importing http
  var config = require('./config');

  const time_up = '09:31';
  const time_down = '16:01';


  const schdule_check_up = later.parse.recur().every(1).minute().after(time_up).time().before(time_down).time().onWeekday();
  const schdule_check_down = later.parse.recur().on(time_down).time().onWeekday();

  const schdule_wake_up = later.parse.recur().every(15).minute().after(time_up).time().before(time_down).time().onWeekday();

  module.exports = function () {

    console.log('smsAlert.checker.count: ' + smsAlert.checker.count);

    const check_up = later.setInterval(
      () => {
        // tasks
        console.log("Schedule job started. checking price now. ");
        smsAlert.checker.run();
      }, schdule_check_up);


    const check_down = later.setInterval(
      () => {
        // tasks
        console.log("Reset the smsAlert now ");
        smsAlert.checker.reset();
      }, schdule_check_down);

    // shedule an interval to visit heroku dyno to prevent it sleeping/ idle
    // https://elements.heroku.com/addons/scheduler  mush be use to wake up heroku dyno first
    // it should run as  $ node wake_up_dyno.js
    // at time 13:30 UTC
    if (process.env.NODE && ~process.env.NODE.indexOf("heroku")) {
      const wake_up = later.setInterval(
        () => {
          // tasks
          console.log("======Dyno is Waking Up======");
          http.get({
            hostname: config.HEROKU_HOST,
            port: 80,
            path: '/'
          }, function (res) {
            res.on('data', function (chunk) {
              try {
                // optional logging... disable after it's working
                console.log("======SERVER RESPONSE: " + chunk);
              } catch (err) {
                console.log(err.message);
              }
            });
          }).on('error', function (err) {
            console.log("Error: " + err.message);
          });
        }, schdule_wake_up);
    }


  };
