import express, { Router } from 'express';
const v1Router = express.Router();

import publicRouter from './public/index.js';
import adminRouter from './admin/index.js';

export default (app) => {
        
    v1Router.use('/public', publicRouter(app));
    v1Router.use('/admin', adminRouter(app));

    return v1Router
}
