'use strict';

import {number} from 'joi';
import {dependencyInjection} from '../../lib/ioc';
import {MovieController} from './movie-controller';
let controller = dependencyInjection<MovieController>(MovieController);

const movieRouts = [
    {
        method: 'GET',
        path: '/movie/{id}',
        handler: controller.get,
        config: {
            bind: controller,
            validate: {
                params: {
                    id: number().required()
                }
            }
        }
    }
];

export {movieRouts};
