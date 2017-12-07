const express = require('express');
const routes = express.Router();
const User = require('../model/user.model');
const Shift = require('../model/shift.model');
const auth = require('../auth/authentication');

routes.get('/shifts', function (req, res) {
    User.findOne({"_id": getIdFromHeaders(req)})
        .then(user => {
            console.log(user);
            return Shift.find({'user': user}).populate(['user', 'client', 'activity'])
        })
        .then(shifts => {
            console.log(shifts);
            res.status(200).json(shifts)
        })
        .catch(error => res.status(400).json(error));
});

routes.get('/shifts/:id', function (req, res) {
    Shift.findOne({"_id": req.params.id})
        .then(shift => res.status(200).json(shift))
        .catch(error => res.status(400).json(error))
});

routes.post('/shifts', function (req, res) {
    Shift.create(req.body)
        .then(shift => res.status(200).send(shift))
        .catch(error => res.status(400).json(error))
    ;
});

routes.put('/shifts/:id', function (req, res, next) {
    Shift.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true})
        .then(shift => res.status(200).send(shift))
        .catch(next);
});

routes.delete('/shifts/:id', function (req, res, next) {
    Shift.findByIdAndRemove({_id: req.params.id})
        .then(shift => res.status(200).send(shift))
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