import express from 'express';
const publicRouter = express.Router();

import supporterRoutes from './supporter.router.js';
import userRoutes from './user.router.js';
import paymentRoutes from './payment.router.js';

export default (app) => {

    let publicAuth = (req, res, next) => {
        console.log("Auth Checking");
        req.user=true;
        next();
    }

    supporterRoutes(app, publicRouter, publicAuth);
    userRoutes(app, publicRouter, publicAuth);
    paymentRoutes(app, publicRouter, publicAuth);

    return publicRouter;
}