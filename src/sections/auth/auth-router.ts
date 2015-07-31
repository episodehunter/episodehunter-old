'use strict';

import Hapi = require('hapi');
import {AuthController} from './auth-controller';
import {dependencyInjection} from '../../lib/ioc';
let controller = dependencyInjection<AuthController>(AuthController);

const authRouts = [
    {
        method: 'POST',
        path: '/auth/login',
        handler: controller.login,
        config : {
            bind: controller,
            auth: false
        }
    }
];

export {authRouts};
