import {autoInject} from 'autoinject';
import {sign} from 'jsonwebtoken';
import {UserRepository} from './auth-repository';
import config from '../../config';
import {compareUserPassword} from '../../lib/bcrypt';

@autoInject
class AuthService {
    rep: UserRepository;

    constructor(rep: UserRepository) {
        this.rep = rep;
    }

    generateToken(username: string, password: string): Promise<string> {
        return this.rep
            .getUserByUsername(username)
            .then(user => compareUserPassword(user, password))
            .then(user => {
                // Remove the password
                user.password = undefined;
                return sign(user, config.jwt.salt);
            });
    }
}

export {AuthService};
