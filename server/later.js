  const later = require('later');
  later.date.localTime();
  const smsAlert = require('./smsAlert');

  const schdule_wakeup = later.parse.recur().every(1).minute().after('09:31').time().before('16:01').time().onWeekday();
  const schdule_sleep = later.parse.recur().on('16:02').time().onWeekday();


  module.exports = function () {

    console.log('smsAlert.checker.count: ' + smsAlert.checker.count);

    const wakeup = later.setInterval(
      () => {
        // tasks
        console.log("Schedule job started. checking price now. ");
        smsAlert.checker.run();
      }, schdule_wakeup);


    const sleep = later.setInterval(
      () => {
        // tasks
        console.log("Reset the smsAlert now ");
        smsAlert.checker.reset();
      }, schdule_sleep);

  };
