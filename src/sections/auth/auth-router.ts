'use strict';

import Hapi = require('hapi');
import {string as validateString} from 'joi';
import {AuthController} from './auth-controller';
import {dependencyInjection} from '../../lib/ioc';
let controller = dependencyInjection<AuthController>(AuthController);

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
