import { Request, IReply } from 'hapi';
import { autoInject } from 'autoinject';
import { badImplementation } from 'boom';
import { int } from '../../../lib/utility/type-conversion';
import { EpisodesService } from './episodes-service';
import { logger } from '../../../lib/logger';

@autoInject
class EpisodesController {
    service: EpisodesService;

    constructor(service: EpisodesService) {
        this.service = service;
    }

    get(request: Request, reply: IReply) {
        const showId = int(request.params['id']);
        const userId = request.auth.credentials.id;
        this.service
            .getEpisodesForShow(showId, userId)
            .then(seasons => reply({seasons}))
            .catch(error => {
                logger.error(error);
                reply(badImplementation());
            });
    }

}

export { EpisodesController };
