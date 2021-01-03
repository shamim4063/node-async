import Redis from 'ioredis';

export default () => {
    const client = Redis.createClient({
        port: process.env.REDIS_PORT || 6379,
        host: process.env.REDIS_HOST || 'localhost',
    })
    client.on('connect', function () {
        console.log('Redis Server connected.');
    });
    return client;
}