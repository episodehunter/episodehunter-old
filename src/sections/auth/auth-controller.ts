'use strict';

import Hapi = require('hapi');
import {UserRepository} from './auth-repository';
import {sign} from 'jsonwebtoken';

var secret = 'asdfghjklpoiy';

class AuthController {

    static inject = [UserRepository]
    rep: UserRepository;

    constructor(rep: UserRepository) {
        this.rep = rep;
    }

    login(request: Hapi.Request, reply: Hapi.IReply): void {
        let username = request.params['username'];
        let password = request.params['password'];
        this.rep.getUser(username, password)
            .then(user => {
                reply({
                    token: sign(user, secret)
                })
                .type('application/json');
            })
            .catch(() => reply('No user :('));
    }

}

export {AuthController};
