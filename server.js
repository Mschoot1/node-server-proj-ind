const http = require('http');
const app = require('express')();
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongodb = require('./config/mongo.db');
const area_routes_v1 = require('./api/area.routes.v1');
const auth_routes_v1 = require('./api/authentication.routes.v1');
const client_routes_v1 = require('./api/client.routes.v1');
const config = require('./config/env/env');
const expressJWT = require('express-jwt');

app.use(bodyParser.urlencoded({
    'extended': 'true'
}));

app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));

app.use(expressJWT({
    secret: config.env.secretKey
}).unless({
    path: [
        {url: '/api/v1/login', methods: ['POST']},
        {url: '/api/v1/register', methods: ['POST']}
    ]
}));

app.set('port', (config.env.webPort));
app.set('env', (config.env.env));

app.use(logger('dev'));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', config.env.allowOrigin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/api/v1', area_routes_v1);
app.use('/api/v1', auth_routes_v1);
app.use('/api/v1', client_routes_v1);

app.use(function (err, req, res, next) {
    console.dir(err);
    const error = {
        message: err.message,
        code: err.code,
        name: err.name,
        status: err.status
    };
    res.status(401).send(error);
});

app.use('*', function (req, res) {
    res.status(400);
    res.json({
        'error': 'The URL you have entered is invalid. Please check your URL and try again.'
    });
});

app.listen(config.env.webPort);

module.exports = app;