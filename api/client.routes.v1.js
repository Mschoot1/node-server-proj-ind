const express = require('express');
const routes = express.Router();
const User = require('../model/user.model');
const Client = require('../model/client.model');
const auth = require('../auth/authentication');

routes.get('/clients', function (req, res) {
        Client.find().populate('area')
        .then(clients => res.status(200).json(clients))
        .catch(error => res.status(400).json(error));
});

routes.get('/clients/:id', function (req, res) {
    Client.findOne({"_id": req.params.id})
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
    Client.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true})
        .then(client => res.status(200).send(client))
        .catch(next);
});

routes.delete('/clients/:id', function (req, res, next) {
    Client.findByIdAndRemove({_id: req.params.id})
        .then(client => res.status(200).send(client))
        .catch(next);
});

module.exports = routes;