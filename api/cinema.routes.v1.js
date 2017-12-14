const express = require('express');
const routes = express.Router();
const Cinema = require('../model/cinema.model');

routes.get('/cinemas', function (req, res) {
    Cinema.find().populate('area')
        .then(cinemas => res.status(200).json(cinemas))
        .catch(error => res.status(400).json(error));
});

routes.get('/cinemas/:id', function (req, res) {
    Cinema.findOne({"_id": req.params.id})
        .then(cinema => res.status(200).json(cinema))
        .catch(error => res.status(400).json(error))
});

routes.post('/cinemas', function (req, res) {
    Cinema.create(req.body)
        .then(cinema => res.status(200).send(cinema))
        .catch(error => res.status(400).json(error))
    ;
});

routes.put('/cinemas/:id', function (req, res, next) {
    Cinema.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true})
        .then(cinema => res.status(200).send(cinema))
        .catch(next);
});

routes.delete('/cinemas/:id', function (req, res, next) {
    Cinema.findByIdAndRemove({_id: req.params.id})
        .then(cinema => res.status(200).send(cinema))
        .catch(next);
});

module.exports = routes;