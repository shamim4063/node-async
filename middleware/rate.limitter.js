import RateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';

export default (app, redisClient) => {
    const limiter = new RateLimit({
        store: new RedisStore({
            client: redisClient
        }),
        windowMs: 5 * 60 * 1000,
        message: { success: false, message: "Too many requests, Please try again later." },
        max: 500, //limit each IP to 100 requests per windowMs
    });

    app.use(limiter);
}

