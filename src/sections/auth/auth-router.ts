'use strict';

import Hapi = require('hapi');
import {string as validateString} from 'joi';
import {dependencyInjection} from 'autoinject';
import {AuthController} from './auth-controller';

let controller: AuthController = dependencyInjection(AuthController);

const authRouts = [
    {
        method: 'POST',
        path: '/auth/create-token',
        handler: controller.createToken,
        config : {
            bind: controller,
            auth: false,
            validate: {
                payload: {
                    username: validateString().required(),
                    password: validateString().required()
                }
            }
        }
    }
];

export {authRouts};
