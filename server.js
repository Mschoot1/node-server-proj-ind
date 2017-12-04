var http = require('http');
var app = require('express')();
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongodb = require('./config/mongo.db');
var area_routes_v1 = require('./api/area.routes.v1');
var auth_routes_v1 = require('./api/authentication.routes.v1');
var client_routes_v1 = require('./api/client.routes.v1');
var config = require('./config/env/env');
var expressJWT = require('express-jwt');

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
    var error = {
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