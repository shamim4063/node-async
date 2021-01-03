import express from 'express';
const adminRouter = express.Router();

import userRoutes from './user.router.js';
import collectionRoutes from './collection.router.js';

export default (app) => {

    userRoutes(app, adminRouter);
    collectionRoutes(app, adminRouter);

    return adminRouter;
}