'use strict';

import Hapi = require('hapi');
import {autoInject} from 'autoinject';
import {ServiesService} from './series-service';
import {notFound, badImplementation} from 'boom';

let int = (obj): number => obj | 0;

@autoInject
class SeriesController {
    service: ServiesService;

    constructor(service: ServiesService) {
        this.service = service;
    }

    get(request: Hapi.Request, reply: Hapi.IReply) {
        let seriesId = int(request.params['id']);
        this.service
            .getSeries(seriesId)
            .then(series => reply({series}))
            .catch(code => {
                if (code === 404) {
                    reply(notFound());
                } else {
                    reply(badImplementation())
                }
            });
    }

}

export {SeriesController};
