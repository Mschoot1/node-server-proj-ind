const express = require('express');
const routes = express.Router();
const area = require('../model/area.model');

routes.get('/areas', function (req, res) {
    area.find({})
        .then(areas => res.status(200).json(areas))
        .catch(error => res.status(400).json(error))
});

routes.get('/areas/:id', function (req, res) {
    area.findOne({"_id": req.params.id})
        .then(area => res.status(200).json(area))
        .catch(error => res.status(400).json(error))
});

routes.post('/areas', function (req, res) {
    area.create(req.body)
        .then(area => res.status(200).send(area))
        .catch(error => res.status(400).json(error))
    ;
});

routes.put('/areas/:id', function (req, res, next) {
    area.findByIdAndUpdate({_id: req.params.id}, req.body)
        .then(area => res.status(200).send(area))
        .catch(next);
});

routes.delete('/areas/:id', function (req, res, next) {
    area.findByIdAndRemove({_id: req.params.id})
        .then(area => res.status(200).send(area))
        .catch(next);
});

module.exports = routes;