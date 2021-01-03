import config from './config.js';

export default (path) => {
    if (!process.env.DIR_NAME)
        process.env.DIR_NAME = path.resolve(path.dirname(''));
    
    if (!process.env.NODE_ENV)
        process.env.NODE_ENV = config.ENV;

    if (!process.env.MONGO_URI) {
        if (process.env.NODE_ENV == "prod") {
            process.env.MONGO_URI = config.DB_URI.PROD;
        } else {
            process.env.MONGO_URI = config.DB_URI.DEV;
        }
    }

    if (!process.env.SERVER_PORT) {
        if (process.env.NODE_ENV == "prod")
            process.env.SERVER_PORT = config.SERVER_PORT.PROD;
        else
            process.env.SERVER_PORT = config.SERVER_PORT.DEV;
    }

    if (!process.env.REDIS_PORT) {
        if (process.env.NODE_ENV == "prod")
            process.env.REDIS_PORT = config.REDIS_PORT.PROD;
        else
            process.env.REDIS_PORT = config.REDIS_PORT.DEV;
    }


    if (!process.env.REDIS_HOST) {
        if (process.env.NODE_ENV == "prod")
            process.env.REDIS_HOST = config.REDIS_HOST.PROD;
        else
            process.env.REDIS_HOST = config.REDIS_HOST.DEV;
    }

};