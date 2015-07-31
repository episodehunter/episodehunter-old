'use strict';

import {SeriesController} from './series-controller';
import {dependencyInjection} from '../../lib/ioc';
let controller = dependencyInjection<SeriesController>(SeriesController);

const seriesRouts = [
    {
        method: 'GET',
        path: '/series',
        handler: controller.get,
        config: {
            bind: controller,
            auth: false
        }
    }, {
        method: 'GET',
        path: '/series/upcoming',
        handler: controller.upcoming,
        config: {
            bind: controller
        }
    }
];

export {seriesRouts};
