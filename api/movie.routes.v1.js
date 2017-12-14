const express = require('express');
const routes = express.Router();
const Movie = require('../model/movie.model');
const session = require('../config/neo4j.db');
const util = require('util');

routes.get('/movies', function (req, res) {
    const searchQuery = req.query.searchQuery;
    session.run(searchQuery ? 'MATCH(movie:Movie) WHERE movie.title =~ \'.*' + searchQuery + '.*\' RETURN movie' : 'MATCH(movie:Movie) RETURN movie')
        .then(result => res.status(200).json(result.records.map(r => r._fields[0].properties)))
        .catch(error => res.status(400).json(error));
    // Movie.find(searchQuery ? {"title": {$regex: searchQuery, $options: 'i'}} : {}).limit(10)
    //     .then(movies => res.status(200).json(movies))
    //     .catch(error => res.status(400).json(error));
});

routes.get('/movies/:title', function (req, res) {
    session.run('MATCH(movie:Movie) WHERE movie.title = "' + req.params.title + '" RETURN movie')
        .then(result => res.status(200).json(result.records[0]._fields[0].properties))
        .catch(error => res.status(400).json(error));
    // Movie.findOne({"_id": req.params.id})
    //     .then(movie => res.status(200).json(movie))
    //     .catch(error => res.status(400).json(error))
});

routes.post('/movies', function (req, res) {
    session.run(
        'CREATE (movie:Movie {title:\'' + body.title + '\', released:' + body.released + ', tagline:\'' + body.tagline + '\'}) ' +
        'RETURN movie')
        .then(movie => res.status(200).send(movie))
        .catch(error => res.status(400).json(error));
    // Movie.create(req.body)
    //     .then(movie => res.status(200).send(movie))
    //     .catch(error => res.status(400).json(error));
});

routes.put('/movies/:title', function (req, res, next) {
    const body = req.body;
    session.run(
        'MATCH (movie { title: "' + req.params.title + '" }) SET movie = ' + util.inspect(req.body) + ' RETURN movie')
        .then(result => res.status(200).json(result.records.map(r => r._fields[0].properties)))
        .catch(next);
    // Movie.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true})
    //     .then(movie => res.status(200).send(movie))
    //     .catch(next);
});

routes.delete('/movies/:id', function (req, res, next) {
    Movie.findByIdAndRemove({_id: req.params.id})
        .then(movie => res.status(200).send(movie))
        .catch(next);
});

module.exports = routes;