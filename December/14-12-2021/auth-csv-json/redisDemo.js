// import { redis } from 'redis';
const redis = require('redis');

(async() => {
    global.client = redis.createClient();
    client.on('error', (err) => {
        console.log('Redis Client Error', err)
    });


    await client.connect();
    console.log('Connection Done');

    // client.publish("user-notify", "Hello World");
    // res.send("Publishing an Event using Redis");

})();