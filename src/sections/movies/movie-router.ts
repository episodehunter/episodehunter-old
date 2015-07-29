'use strict';

import {MovieController} from './movie-controller';
import {dependencyInjection} from '../../lib/ioc';
let controller = dependencyInjection<MovieController>(MovieController);

module.exports = (function() {
    return [
        {
            method: 'GET',
            path: '/movies',
            config: {
                handler: controller.get,
                auth: 'jwt',
                bind: controller
            }
        }
    ];
}());
