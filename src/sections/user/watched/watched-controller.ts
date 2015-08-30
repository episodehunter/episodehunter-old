'use strict';

import Hapi = require('hapi');
import {autoInject} from 'autoinject';
import {WatchedService} from './watched-service';
import {badImplementation} from 'boom';

@autoInject
class WatchedController {
    watchedService: WatchedService;

    constructor(watchedService: WatchedService) {
        this.watchedService = watchedService;
    }

    getMovies(request: Hapi.Request, reply: Hapi.IReply) {
        let userId = request.auth.credentials.id;
        this.watchedService
            .getWatchedMovies(userId)
            .then(movies => reply({movies}))
            .catch(error => {
                console.log(error);
                reply(badImplementation());
            });
    }

    getSeries(request: Hapi.Request, reply: Hapi.IReply) {
        let userId = request.auth.credentials.id;
        this.watchedService
            .getWatchedSeries(userId)
            .then(series => reply({series}))
            .catch(error => {
                console.log(error);
                reply(badImplementation());
            });
    }

}

export {WatchedController};
