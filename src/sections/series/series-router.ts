'use strict';

import {number} from 'joi';
import {dependencyInjection} from 'autoinject';
import {SeriesController} from './series-controller';

let controller: SeriesController = dependencyInjection(SeriesController);

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
