const express = require('express');
const routes = express.Router();
const User = require('../model/user.model');
const Activity = require('../model/activity.model');
const auth = require('../auth/authentication');

routes.get('/activities', function (req, res) {
        Activity.find().populate('area')
        .then(activities => res.status(200).json(activities))
        .catch(error => res.status(400).json(error));
});

routes.get('/activities/:id', function (req, res) {
    Activity.findOne({"_id": req.params.id})
        .populate('area')
        .then(activity => res.status(200).json(activity))
        .catch(error => res.status(400).json(error))
});

routes.post('/activities', function (req, res) {
    Activity.create(req.body)
        .then(activity => res.status(200).send(activity))
        .catch(error => res.status(400).json(error))
    ;
});

routes.put('/activities/:id', function (req, res, next) {
    Activity.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true})
        .then(activity => res.status(200).send(activity))
        .catch(next);
});

routes.delete('/activities/:id', function (req, res, next) {
    Activity.findByIdAndRemove({_id: req.params.id})
        .then(activity => res.status(200).send(activity))
        .catch(next);
});

module.exports = routes;