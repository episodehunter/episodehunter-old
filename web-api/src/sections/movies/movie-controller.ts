import { Request, IReply } from 'hapi';
import { notFound, badImplementation } from 'boom';
import { autoInject } from 'autoinject';
import { int } from '../../lib/utility/type-conversion';
import { MovieService } from './movie-service';

@autoInject
class MovieController {
    service: MovieService;

    constructor(service: MovieService) {
        this.service = service;
    }

    get(request: Request, reply: IReply) {
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

export { MovieController };
