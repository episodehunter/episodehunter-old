'use strict';

import {number} from 'joi';
import {SeriesController} from './series-controller';
import {dependencyInjection} from '../../lib/ioc';
let controller = dependencyInjection<SeriesController>(SeriesController);

const seriesRouts = [
    {
        method: 'GET',
        path: '/series/{id}',
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

export {seriesRouts};
