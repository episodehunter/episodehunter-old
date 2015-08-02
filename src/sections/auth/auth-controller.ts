'use strict';

import {Request, IReply} from 'hapi';
import {forbidden} from 'boom';
import {autoInject} from 'autoinject';
import {AuthService} from './auth-service';

@autoInject
class AuthController {

    constructor(public service: AuthService) {}

    createToken(request: Request, reply: IReply): void {
        let username = request.payload['username'];
        let password = request.payload['password'];
        this.service.generateToken(username, password)
            .then(token => reply({token}))
            .catch(() => reply(forbidden('Invalid username or password')));
    }

}

export {AuthController};
