'use strict';

import {number} from 'joi';
import {UpcomingController} from './upcoming/upcoming-controller';
import {dependencyInjection} from '../../lib/ioc';
let controller = dependencyInjection<UpcomingController>(UpcomingController);

const userRouts = [
    {
        method: 'GET',
        path: '/user/upcoming/episodes',
        handler: controller.episodes,
        config: {
            bind: controller
        }
    }
];

export {userRouts};
