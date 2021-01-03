import express from 'express';
const publicRouter = express.Router();

import supporterRoutes from './supporter.router.js';
import userRoutes from './user.router.js';

export default (app) => {

    let publicAuth = (req, res, next) => {
        console.log("Auth Checking");
        next();
    }

    supporterRoutes(app, publicRouter, publicAuth);
    userRoutes(app, publicRouter, publicAuth);

    return publicRouter;
}