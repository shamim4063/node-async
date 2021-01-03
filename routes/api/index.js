import express from 'express';
import v1Router from './v1/index.js';
import v2Router from './v2/index.js';

const apiRouter = express.Router();

export default (app) => {

    app.use((req, res, next) => {
        next();
    })

    apiRouter.use('/v1', v1Router(app));
    apiRouter.use('/v2', v2Router(app));

    app.use('/api', apiRouter);
}