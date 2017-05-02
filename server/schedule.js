const CronJob = require('cron').CronJob;
const timeZone = 'America/New_York';
const smsAlert = require('./smsAlert');


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


//const schdule_wakeup = '1 55 15 * * 1-5';

const schdule_wakeup = '1 40 9 * * 1-5'; //every weekday at 9:40.01  am
const schdule_sleep = '1 02,15,25 16 * * 1-5'; //every weekday at 4:02.01, 4:15.01, 4:25.01  pm

let interval;

module.exports = function () {

  console.log('smsAlert.checker.count: ' + smsAlert.checker.count);

  new CronJob(
    schdule_wakeup,
    () => {
      // tasks
      console.log("Schedule job started. checking price now. ");
      interval = setInterval(() => {
        smsAlert.checker.run();
      }, 1000 * 60);

    },
    () => {
      /* This function is executed when the job stops */

    },
    true, /* Start the job right now */
    timeZone /* Time zone of this job. */
  ); //end CronJob


  new CronJob(
    schdule_sleep,
    () => {
      // tasks
      clearInterval(interval);
      smsAlert.checker.reset();
    },
    () => {
      /* This function is executed when the job stops */

    },
    true, /* Start the job right now */
    timeZone /* Time zone of this job. */
  ); //end CronJob


}
