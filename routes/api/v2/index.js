import express, { Router } from 'express';
const v2Router = express.Router();

import publicRouter from './public/index.js';
import adminRouter from './admin/index.js';

export default (app) => {
        
    v2Router.use('/public', publicRouter(app));
    v2Router.use('/admin', adminRouter(app));

    return v2Router
}