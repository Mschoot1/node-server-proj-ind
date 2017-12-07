const express = require('express');
const router = express.Router();
const bCrypt = require('bcryptjs');
const salt = bCrypt.genSaltSync(10);
const auth = require('../auth/authentication');
const config = require('../config/env/env');
const User = require('../model/user.model');

router.post('/login', function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({"username": username})
        .then(user => {
            if (user && bCrypt.compareSync(password, user.password)) {
                res.status(200).json({
                    "token": auth.encodeToken(user._id),
                    "username": user.username
                });
            } else {
                res.status(401).json({"error": "Invalid credentials, bye"})
            }
        })
        .catch((error) => {
            res.status(400).json(error);
        });
});

router.post('/register', function (req, res) {
    console.log(req.body);
    const username = req.body.username;
    req.body.password = bCrypt.hashSync(req.body.password, salt);

    User.findOne({"username": username})
        .then(user => {
            if (!user && config.env.appUsername !== username) {
                User.create(req.body)
                    .then(user => res.send(user))
                    .catch(error => res.status(400).json(error))
            } else {
                res.status(409).json({"error": "Username already exists"});
            }
        })
        .catch((error) => {
            res.status(400).json(error);
        });
});

module.exports = router;