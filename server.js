import express from 'express';
import mongoose from 'mongoose';

import bodyParser from 'body-parser';
import schedule from 'node-schedule';

import setEnv from './config/env.conf.js';
import connectDb from './config/db.connect.js';
import connectRedis from './config/redis.connect.js';
import logHandler from './middleware/handle.logs.js';
import nodejobs from './scheduler.js';
import appRoutes from './routes/api/index.js';
import handleErrors from './middleware/handleErrors.js';
import rateLimiter from './middleware/rate.limitter.js';
import path from 'path';

let app = express();

setEnv(path);
connectDb(mongoose);
const redisClient = connectRedis();
// nodejobs(schedule);
logHandler(app, path);
rateLimiter(app, redisClient);


app.use(bodyParser.json({ limit: '25mb', extended: true }));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ limit: '25mb', extended: true }));

appRoutes(app);

app.get('/', (req, res) => {
    res.render('pages/index');
});

app.set('view engine', 'ejs');
app.use(handleErrors);
app.use((req, res, next) => {
    res.status(404).send('Unable to find the requested resource!');
});

process.on('uncaughtException', (error) => {
    errorHandler.handleError(error);
    if (!errorHandler.isTrustedError(error)) {
        console.log("Process Exit");
        process.exit(1);
    }
});

app.listen(process.env.SERVER_PORT, () => {
    console.log("Server listening on port", process.env.SERVER_PORT);
})