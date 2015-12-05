'use strict';

import {autoInject} from 'autoinject';
import {sign} from 'jsonwebtoken';
import {UserRepository} from './auth-repository';
import config from '../../config';
import {compareUserPassword} from '../../lib/bcrypt';

const jwtSecret = config.jwt.salt;

@autoInject
class AuthService {

    constructor(public rep: UserRepository) {}

    generateToken(username: string, password: string): Promise<string> {
        return this.rep
            .getUserByUsername(username)
            .then(user => compareUserPassword(user, password))
            .then(user => {
                // Remove the password
                user.password = undefined;
                return sign(user, config.jwt.salt)
            });
    }
}

export {AuthService};
