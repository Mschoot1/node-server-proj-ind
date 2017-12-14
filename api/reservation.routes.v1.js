const express = require('express');
const routes = express.Router();
const User = require('../model/user.model');
const Reservation = require('../model/reservation.model');
const auth = require('../auth/authentication');

routes.get('/reservations', function (req, res) {
    User.findOne({"_id": auth.getIdFromHeaders(req)})
        .then(user => {
            console.log(user._id);
            return Reservation.find({"user": user._id}).populate([{
                path: 'schedule',
                populate: [{path: 'hall', populate: {path: 'cinema'}}]
            }, {path: 'user'}])
        })
        .then(reservations => res.status(200).json(reservations))
        .catch(error => res.status(400).json(error));
});

routes.get('/reservations/:id', function (req, res) {
    User.findOne({"_id": auth.getIdFromHeaders(req)})
        .then(user => {
            return Reservation.findOne({"_id": req.params.id}).populate([{
                path: 'schedule',
                populate: [{path: 'hall', populate: {path: 'cinema'}}]
            }, {path: 'user'}]);
        })
        .then(reservation => res.status(200).json(reservation))
        .catch(error => res.status(400).json(error))
});

routes.post('/reservations', function (req, res) {
    Reservation.create(req.body)
        .then(reservation => {
            return Reservation.findOne({"_id": reservation._id}).populate([{
                path: 'schedule',
                populate: [{path: 'hall', populate: {path: 'cinema'}}]
            }, {path: 'user'}])
        })
        .then(reservation => res.status(200).send(reservation))
        .catch(error => res.status(400).json(error));
});

routes.put('/reservations/:id', function (req, res, next) {
    Reservation.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true}).populate([{
        path: 'schedule',
        populate: [{path: 'hall', populate: {path: 'cinema'}}]
    }, {path: 'user'}])
        .then(reservation => res.status(200).send(reservation))
        .catch(next);
});

routes.delete('/reservations/:id', function (req, res, next) {
    Reservation.findByIdAndRemove({_id: req.params.id}).populate([{
        path: 'schedule',
        populate: [{path: 'hall', populate: {path: 'cinema'}}]
    }, {path: 'user'}])
        .then(reservation => res.status(200).send(reservation))
        .catch(next);
});

module.exports = routes;