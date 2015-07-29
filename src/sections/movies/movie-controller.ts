'use strict';

import Hapi = require('hapi');
import {MovieService} from './movie-service';

class MovieController {
    static inject = [MovieService];
    service: MovieService;

    constructor(service: MovieService) {
        this.service = service;
    }

    get(request: Hapi.Request, reply: Hapi.IReply) {
        console.log('Okej, using: ' + request.headers['authorization']);
        this.service
            .getMovie(5)
            .then(result => {
                reply(result)
                .type('application/json');
            });
    }

}

export {MovieController};
