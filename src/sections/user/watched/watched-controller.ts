'use strict';

import Hapi = require('hapi');
import {autoInject} from 'autoinject';
import {badImplementation, badRequest} from 'boom';
import {statusCodes} from '../../../lib/constant/status-codes';
import {WatchedService} from './watched-service';

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

    setSeriesAsWatched(request: Hapi.Request, reply: Hapi.IReply) {
        let userId = request.auth.credentials.id;
        let shows = request.payload['shows'];

        if (!Array.isArray(shows)) {
            return reply(badRequest('Shows must be an instance of Array'));
        }

        this.watchedService.setShowsAsWatched(userId, shows);

        reply({}).code(statusCodes.ACCEPTED);
    }

}

export {WatchedController};
