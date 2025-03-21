const express = require('express');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const httpStatus = require('http-status');
const config = require('./config/config')
const { authLimiter } = require('./middlewares/rateLimiter');
const routes = require('./routes');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');
const { default: mongoose } = require('mongoose');

const app = express();

app.use(helmet());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


const connect = async () => {
    await mongoose.connect(config.database_url);
    console.log('database connected')
}
// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
    app.use('/api/auth', authLimiter);
}

app.use((req, res, next) => {
    if (!req.path.endsWith('/') && req.method === 'GET') {
        return res.redirect(301, req.path + '/');
    }
    next();
});

// v1 api routes
app.use('/api', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

app.listen(config.port, () => {
    connect();
    console.log(`server listening on port ${config.port}`)
});
