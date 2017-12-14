const express = require('express');
const routes = express.Router();
const neo4j = require('neo4j-driver').v1;
const User = require('../model/user.model');
const Schedule = require('../model/schedule.model');
const auth = require('../auth/authentication');

const driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('root', 'neo4j'));
const session = driver.session();

routes.get('/schedules', function (req, res) {
    Schedule.find().sort({dateTime: 1}).populate([{path: 'hall', populate: {path: 'cinema'}}])
        .then(schedules => res.status(200).json(schedules))
        .catch(error => res.status(400).json(error));
});

routes.get('/schedules/:id', function (req, res) {
    let s;
    Schedule.findOne({"_id": req.params.id}).populate([{path: 'hall', populate: {path: 'cinema'}}])
        .then(schedule => {
            s = schedule;
            console.log(s.movie.title);
            return session.run('MATCH(movie:Movie) WHERE movie.title = "' + s.movie.title + '" RETURN movie');
        })
        .then(result => {
            s.movie = result.records[0]._fields[0].properties;
            res.status(200).json(s)
        })
        .catch(error => res.status(400).json(error))
});

routes.post('/schedules', function (req, res) {
    Schedule.create(req.body)
        .then(schedule => {
            return Schedule.findOne({"_id": schedule._id}).populate([{path: 'hall', populate: {path: 'cinema'}}]);
        })
        .then(schedule => res.status(200).send(schedule))
        .catch(error => res.status(400).json(error))
    ;
});

routes.put('/schedules/:id', function (req, res, next) {
    Schedule.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true}).populate([{
        path: 'hall',
        populate: {path: 'cinema'}
    }])
        .then(schedule => res.status(200).send(schedule))
        .catch(next);
});

routes.delete('/schedules/:id', function (req, res, next) {
    Schedule.findByIdAndRemove({_id: req.params.id})
        .then(schedule => res.status(200).send(schedule))
        .catch(next);
});

module.exports = routes;