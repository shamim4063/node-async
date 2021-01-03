import morgan from 'morgan';
import rfs from 'rotating-file-stream';

export default (app, path) => {
    
    var accessLogStream = rfs.createStream('access.log', {
        interval: '1d',
        path: path.join(process.env.DIR_NAME, 'loggs')
    })
    var errorLogStream = rfs.createStream('error.log', {
        interval: '1d',
        path: path.join(process.env.DIR_NAME, 'loggs')
    })

    if (process.env.NODE_ENV == 'prod'){
        app.use(morgan('combined', { stream: accessLogStream }));
        app.use(morgan('combined', { skip: (req, res) => res.statusCode < 400, stream: errorLogStream }));
    }
    else
        app.use(morgan('dev'));
}