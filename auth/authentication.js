const error = require('util');
const config = require('../config/env/env');
const moment = require('moment');
const jwt = require('jwt-simple');

function encodeToken(id) {
    const payload = {
        exp: moment().add(2, 'days').unix(),
        iat: moment().unix(),
        sub: id
    };
    return jwt.encode(payload, config.env.secretKey, null, null);
}

function decodeToken(token) {
    try {
        const payload = jwt.decode(token, config.env.secretKey, null, null);
        if (moment().unix() > payload.exp) {
            console.log('Token has expired.');
        }
        return payload;
    } catch (err) {
        return err;
    }
}

function getIdFromHeaders(req) {
    return decodeToken(getToken(req)).sub;
}

function getToken(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    }
    return null;
}

module.exports = {
    encodeToken,
    decodeToken,
    getIdFromHeaders
};