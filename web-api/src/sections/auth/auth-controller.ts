import { Request, IReply } from 'hapi';
import { forbidden, badImplementation } from 'boom';
import { autoInject } from 'autoinject';
import { AuthService } from './auth-service';

@autoInject
class AuthController {
    service: AuthService;

    constructor(service: AuthService) {
        this.service = service;
    }

    createToken(request: Request, reply: IReply): void {
        const username = request.payload.username;
        const password = request.payload.password;
        this.service.generateToken(username, password)
            .then(token => {
                if (token) {
                    reply({token});
                } else {
                    reply(forbidden('Invalid username or password :('));
                }
            })
            .catch(error => reply(badImplementation(error)));
    }

}

export {AuthController};
