'use strict';

import Hapi = require('hapi');
import {ServiesService} from './series-service';

class SeriesController {

    static inject = [ServiesService];
    service: ServiesService;

    constructor(service: ServiesService) {
        this.service = service;
    }

    get(request: Hapi.Request, reply: Hapi.IReply) {
        console.log('Okej, using: ' + request.headers['authorization']);
        reply({'hej': 'hej'}).type('application/json');
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
