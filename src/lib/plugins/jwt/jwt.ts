'use strict';

import Hapi = require('hapi');
const jwt = require('hapi-auth-jwt2');
import {config} from '../../../config/index';
import {UserRepository} from '../../../sections/auth/auth-repository';
import {dependencyInjection} from '../../ioc';

interface Decoded {
    id: number;
    username: string;
}

let userRepository = dependencyInjection<UserRepository>(UserRepository);
const jwtSecret = config.jwt.salt;

let validate = (decoded: Decoded, request, next) => {
    userRepository.getUserById(decoded.id)
        .then(user => {
            if (user.username === decoded.username) {
                return user;
            } else {
                return Promise.reject(user);
            }
        })
        .then(() => next(null, true, decoded))
        .catch(() => next(new Error('Not a valid user'), false));
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
