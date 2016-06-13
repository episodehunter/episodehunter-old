import { autoInject } from 'autoinject';
import { sign } from 'jsonwebtoken';
import { UserRepository } from './auth-repository';
import config from '../../config';
import { compareUserPassword } from '../../lib/bcrypt';

@autoInject
class AuthService {
    rep: UserRepository;

    constructor(rep: UserRepository) {
        this.rep = rep;
    }

    async generateToken(username: string, password: string): Promise<string> {
        const user = await this.rep.getUserByUsername(username);
        if (!user) {
            return undefined;
        }
        const passwordMatch = await compareUserPassword(user, password);
        if (passwordMatch === true) {
            return await sign(user, config.jwt.salt);
        } else {
            return undefined;
        }
    }
}

export { AuthService };
