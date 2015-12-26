import Hapi = require('hapi');
const jwt = require('hapi-auth-jwt2');
import {dependencyInjection} from 'autoinject';
import config from '../../../config';
import {UserRepository} from '../../../sections/auth/auth-repository';

interface IDecoded {
    id: number;
    username: string;
}

let userRepository: UserRepository = dependencyInjection(UserRepository);
const jwtSecret = config.jwt.salt;

let validate = (decoded: IDecoded, request, next) => {
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
