const redis = require('redis');
let mongoose = require('mongoose');

global.config = require('./config/config.json');

async function connectiondb() {
    try {
        // CONNECTION ON REDIS AND PUBLISH NOTIFY 
        await mongoose.connect(
            `mongodb://${config.mongodb.username}:${config.mongodb.password}@${config.mongodb.localhost}:${config.mongodb.port}/${config.mongodb.database}`);
        (async() => {
            global.publisher = redis.createClient({
                url: "redis://localhost:6379/0"
            });
            await publisher.connect();
            console.log('Connection Done CRON.JS');
        })();

        //  Self Function Call for Scheduler
        (function Cronrun() {
            if (config.cron.scheduler === "on") {
                for (const file of Object.keys(config.cron.files)) {
                    publisher.publish('cronNotification', JSON.stringify({ message: "CronStarting" }))
                    if (config.cron.files[file].active) {
                        require(`./cronTask/${file}`)(config.cron.files[file].time)
                    }
                }
            }
        })();
    } catch (error) {
        console.log(error);
        console.log('Databse Connection Errro');
    }
}

connectiondb();