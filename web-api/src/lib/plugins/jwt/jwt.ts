import { Server } from 'hapi';
const jwt = require('hapi-auth-jwt2');
import { dependencyInjection } from 'autoinject';
import config from '../../../config';
import { UserRepository } from '../../../sections/auth/auth-repository';

const userRepository: UserRepository = dependencyInjection(UserRepository);
const jwtSecret = config.jwt.salt;

const validate = (decoded: {id: number, username: string}, request, next) => {
    userRepository.getUserById(decoded.id)
        .then(user => {
            if (user.username === decoded.username) {
                next(null, true, decoded);
            } else {
                next(new Error('Not a valid user'), false);
            }
        });
};

function registerJWT(server: Server) {
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

export { registerJWT };
