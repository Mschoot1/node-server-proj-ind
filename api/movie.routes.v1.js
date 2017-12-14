const express = require('express');
const routes = express.Router();
const neo4j = require('neo4j-driver').v1;
const Movie = require('../model/movie.model');

const driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('root', 'neo4j'));
const session = driver.session();

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
    Movie.create(req.body)
        .then(movie => res.status(200).send(movie))
        .catch(error => res.status(400).json(error))
    ;
});

routes.put('/movies/:id', function (req, res, next) {
    Movie.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true})
        .then(movie => res.status(200).send(movie))
        .catch(next);
});

routes.delete('/movies/:id', function (req, res, next) {
    Movie.findByIdAndRemove({_id: req.params.id})
        .then(movie => res.status(200).send(movie))
        .catch(next);
});

module.exports = routes;