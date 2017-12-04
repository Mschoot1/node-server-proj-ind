const express = require('express');
const routes = express.Router();
const User = require('../model/user.model');
const Client = require('../model/client.model');
const auth = require('../auth/authentication');

routes.get('/clients', function (req, res) {
    // User.findOne({"_id": getIdFromHeaders(req)})
    //     .then(user => {
    //         return Client.find({'area': user.area}).populate('area')
    //     })
        Client.find().populate('area')
        .then(clients => res.status(200).json(clients))
        .catch(error => res.status(400).json(error));
});

routes.get('/clients/:id', function (req, res) {
    Client.findOne({"_id": req.params.id})
        .populate('area')
        .then(client => res.status(200).json(client))
        .catch(error => res.status(400).json(error))
});

routes.post('/clients', function (req, res) {
    Client.create(req.body)
        .then(client => res.status(200).send(client))
        .catch(error => res.status(400).json(error))
    ;
});

routes.put('/clients/:id', function (req, res, next) {
    Client.findByIdAndUpdate({_id: req.params.id}, req.body)
        .then(client => res.status(200).send(client))
        .catch(next);
});

routes.delete('/clients/:id', function (req, res, next) {
    Client.findByIdAndRemove({_id: req.params.id})
        .then(client => res.status(200).send(client))
        .catch(next);
});

function getIdFromHeaders(req) {
    return auth.decodeToken(getToken(req)).sub;
}

function getToken(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    }
    return null;
}

module.exports = routes;