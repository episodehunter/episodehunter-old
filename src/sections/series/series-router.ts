'use strict';

import {SeriesController} from './series-controller';
import {dependencyInjection} from '../../lib/ioc';
let controller = dependencyInjection<SeriesController>(SeriesController);

module.exports = (function() {
    return [
        {
            method: 'GET',
            path: '/series',
            config: {
                handler: controller.get,
                bind: controller
            }
        }, {
            method: 'GET',
            path: '/series/upcoming',
            config: {
                handler: controller.upcoming,
                bind: controller
            }
        }
    ];
}());
