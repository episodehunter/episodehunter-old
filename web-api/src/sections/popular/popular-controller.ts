import { Request, IReply } from 'hapi';
import { autoInject } from 'autoinject';
import { badImplementation } from 'boom';
import { PopularService } from './popular-service';
import { logger } from '../../lib/logger';

@autoInject
class PopularController {
    service: PopularService;

    constructor(service: PopularService) {
        this.service = service;
    }

    getShows(request: Request, reply: IReply) {
        const since = request.params['since'];
        return this.service
            .getPopularShows(since)
            .then(shows => reply({shows}))
            .catch(error => {
                logger.error(error);
                reply(badImplementation());
            });
    }

    getMovies(request: Request, reply: IReply) {
        const since = request.params['since'];
        return this.service
            .getPopularMovies(since)
            .then(movies => reply({movies}))
            .catch(error => {
                logger.error(error);
                reply(badImplementation());
            });
    }

}

export { PopularController };
