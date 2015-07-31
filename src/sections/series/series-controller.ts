'use strict';

import Hapi = require('hapi');
import {autoInject} from 'autoinject';
import {ServiesService} from './series-service';

@autoInject
class SeriesController {
    service: ServiesService;

    constructor(service: ServiesService) {
        this.service = service;
    }

    get(request: Hapi.Request, reply: Hapi.IReply) {
        console.log('Okej, using: ' + request.headers['authorization']);
        reply(this.service.rep.db.model.seriesModel).type('application/json');
    }

    upcoming(request: Hapi.Request, reply: Hapi.IReply) {
        var userId = 2;
        this.service.upcoming(userId)
            .then(data => {
                reply({
                    episodes: data
                });
            });
    }

}

export {SeriesController};
