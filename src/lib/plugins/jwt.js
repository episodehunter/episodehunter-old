var jwt = require('hapi-auth-jwt2');
var db = include('/src/lib/db');

var secret = 'asdfghjklpoiy';

var validate = function (decoded, request, next) {
    db.getUser(decoded.id)
        .then(() => next(null, true))
        .catch(() => next(new Error('Not a valid user'), false));
};

module.exports = function(server) {
    'use strict';
    server.register(jwt, function(err) {
        if (err) {
            throw err;
        }

        server.auth.strategy('jwt', 'jwt', true, {
            key: secret,
            validateFunc: validate
        });
    });
};

