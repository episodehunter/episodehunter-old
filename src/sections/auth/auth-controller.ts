'use strict';

import Hapi = require('hapi');
import {autoInject} from 'autoinject';
import {AuthService} from './auth-service';

@autoInject
class AuthController {

    constructor(public service: AuthService) {}

    createToken(request: Hapi.Request, reply: Hapi.IReply): void {
        let username = request.payload['username'];
        let password = request.payload['password'];
        this.service.generateToken(username, password)
            .then(token => reply({token}))
            .catch(error => {
                reply({
                    id: 'forbidden',
                    reason: 'Forbidden: Invalid username or password'
                });
            });
    }

}

export {AuthController};
