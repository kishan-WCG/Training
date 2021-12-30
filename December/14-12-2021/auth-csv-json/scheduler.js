// THIS ONLY DEMO
const mongoose = require('mongoose');
var express = require('express');
global.config = require('./config/config.json');
let isActive = true
    // mongoose.connect('mongodb://admin:admin@localhost:27017/Auth')
    //     .then(() => { console.log(`Server Start On`) })
    //     .catch((error) => { console.log(error) })
var app = express();

async function connectiondb() {
    try {
        await mongoose.connect(
            `mongodb://${config.mongodb.username}:${config.mongodb.password}@${config.mongodb.localhost}:${config.mongodb.port}/${config.mongodb.database}`);
        console.log(`Server Start On ${config.cronDB.cPort}`);
        app.listen(config.cronDB.cPort, async function() {
            console.log('App Starting');
            require('./services/admin');
        });

    } catch (error) {
        console.log(error);
        console.log('Databse Connection Errro');
    }
}
connectiondb();

console.log(config.cron.scheduler)
if (config.cron.scheduler === "on") {

    console.log('aaaaaaa')



} else {
    console.log('No Scheduler On That Time')
}