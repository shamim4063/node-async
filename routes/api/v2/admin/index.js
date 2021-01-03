import express from 'express';
const adminRouter = express.Router();

import userRoutes from './user.router.js';

export default (app) => {

    let adminAuth = (req, res, next) => {
        console.log("Admin Auth Checking");
        next();
    }

    userRoutes(app, adminRouter, adminAuth);
    
    return adminRouter;
}