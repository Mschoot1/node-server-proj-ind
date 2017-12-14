const express = require('express');
const routes = express.Router();
const Hall = require('../model/hall.model');

routes.get('/halls', function (req, res) {
    Hall.find().populate('area')
        .then(halls => res.status(200).json(halls))
        .catch(error => res.status(400).json(error));
});

routes.get('/halls/:id', function (req, res) {
    Hall.findOne({"_id": req.params.id})
        .then(hall => res.status(200).json(hall))
        .catch(error => res.status(400).json(error))
});

routes.post('/halls', function (req, res) {
    Hall.create(req.body)
        .then(hall => res.status(200).send(hall))
        .catch(error => res.status(400).json(error))
    ;
});

routes.put('/halls/:id', function (req, res, next) {
    Hall.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true})
        .then(hall => res.status(200).send(hall))
        .catch(next);
});

routes.delete('/halls/:id', function (req, res, next) {
    Hall.findByIdAndRemove({_id: req.params.id})
        .then(hall => res.status(200).send(hall))
        .catch(next);
});

module.exports = routes;