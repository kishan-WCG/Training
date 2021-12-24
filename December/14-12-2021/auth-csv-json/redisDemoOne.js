// import { redis } from 'redis';
const redis = require('redis');
// 
(async() => {
    const subscribe = redis.createClient();
    subscribe.on('error', (err) => {
        console.log('Redis Client Error', err)
    });

    await subscribe.connect();
    console.log('Connection Done');

    await subscribe.subscribe("user-notify", (payload) => {
        console.log('payload' + payload)
    })



})();