/* @flow */
'use strict';

var jwt = require('hapi-auth-jwt2');
// var db = require('../db');

var secret = 'asdfghjklpoiy';

var validate = function (decoded, request, next) {
    next(null, true);
    // db.getUser(decoded.id)
    //     .then(() => next(null, true))
    //     .catch(() => next(new Error('Not a valid user'), false));
};

module.exports = function(server: hapiServer) {
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
