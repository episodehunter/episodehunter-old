import Hapi = require('hapi');
import {autoInject} from 'autoinject';
import {notFound, badImplementation} from 'boom';
import {int} from '../../lib/utility/type-conversion';
import {MovieService} from './movie-service';

@autoInject
class MovieController {
    service: MovieService;

    constructor(service: MovieService) {
        this.service = service;
    }

    get(request: Hapi.Request, reply: Hapi.IReply) {
        let movieId = int(request.params['id']);
        this.service
            .getMovie(movieId)
            .then(movie => reply({movie}))
            .catch(code => {
                if (code === 404) {
                    reply(notFound());
                } else {
                    reply(badImplementation());
                }
            });
    }

}

export {MovieController};
