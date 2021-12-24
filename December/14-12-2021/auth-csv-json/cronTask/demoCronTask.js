const cron = require("node-cron");
module.exports = function(time) {
    cron.schedule(time, async function() {
        console.log('DemoCronTask');
    })
}