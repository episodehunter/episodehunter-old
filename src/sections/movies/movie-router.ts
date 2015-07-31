'use strict';

import {MovieController} from './movie-controller';
import {dependencyInjection} from '../../lib/ioc';
let controller = dependencyInjection<MovieController>(MovieController);

const movieRouts = [
    {
        method: 'GET',
        path: '/movies',
        handler: controller.get,
        config: {
            auth: 'jwt',
            bind: controller
        }
    }
];

export {movieRouts};
