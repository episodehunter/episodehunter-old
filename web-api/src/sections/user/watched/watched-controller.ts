import { Request, IReply } from 'hapi';
import { autoInject } from 'autoinject';
import { badImplementation, badRequest } from 'boom';
import { logger, traceFunCall } from '../../../lib/logger';
import { statusCodes } from '../../../lib/constant/status-codes';
import { WatchedService } from './watched-service';

@autoInject
class WatchedController {
    watchedService: WatchedService;

    constructor(watchedService: WatchedService) {
        this.watchedService = watchedService;
    }

    getWatchedMovies(request: Request, reply: IReply) {
        let userId = request.auth.credentials.id;
        this.watchedService
            .getWatchedMovies(userId)
            .then(movies => reply({movies}))
            .catch(error => {
                reply(badImplementation());
            });
    }

    @traceFunCall
    getWatchedShows(request: Request, reply: IReply) {
        let userId = request.auth.credentials.id;
        this.watchedService
            .getWatchedShows(userId)
            .then(series => reply({series}))
            .catch(error => {
                logger.error(error);
                reply(badImplementation());
            });
    }

    setShowsAsWatched(request: Request, reply: IReply) {
        let userId = request.auth.credentials.id;
        let shows = request.payload['shows'];

        if (!Array.isArray(shows)) {
            return reply(badRequest('shows must be an instance of Array'));
        }

        this.watchedService.setShowsAsWatched(userId, shows);

        reply({}).code(statusCodes.ACCEPTED);
    }

    setMoviesAsWatched(request: Request, reply: IReply) {
        let userId = request.auth.credentials.id;
        let movies = request.payload['movies'];

        if (!Array.isArray(movies)) {
            return reply(badRequest('movies must be an instance of Array'));
        }

        this.watchedService.setMovieAsWatched(userId, movies);

        reply({}).code(statusCodes.ACCEPTED);
    }

}

export { WatchedController };
