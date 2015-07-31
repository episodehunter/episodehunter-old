'use strict';

import Hapi = require('hapi');
const jwt = require('hapi-auth-jwt2');

var secret = 'asdfghjklpoiy';

var validate = function (decoded, request, next) {
    next(null, true);
    // db.getUser(decoded.id)
    //     .then(() => next(null, true))
    //     .catch(() => next(new Error('Not a valid user'), false));
};

function registerJWT(server: Hapi.Server) {
    server.register(jwt, err => {
        if (err) {
            throw err;
        }

        server.auth.strategy('jwt', 'jwt', true, {
            key: secret,
            validateFunc: validate
        });
    });
};

export {registerJWT};
