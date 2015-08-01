'use strict';

import Hapi = require('hapi');
const jwt = require('hapi-auth-jwt2');
import {config} from '../../config/index';

const jwtSecret = config.jwt.salt;

var validate = (decoded, request, next) => {
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
            key: jwtSecret,
            validateFunc: validate
        });
    });
};

export {registerJWT};
