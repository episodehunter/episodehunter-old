import { Request, IReply } from 'hapi';
import { autoInject } from 'autoinject';
import { UpcomingEpiosdes } from './upcoming-episodes';

@autoInject
class UpcomingController {
    episodeService: UpcomingEpiosdes;

    constructor(episodeService: UpcomingEpiosdes) {
        this.episodeService = episodeService;
    }

    episodes(request: Request, reply: IReply) {
        let userId = request.auth.credentials.id;
        this.episodeService
            .upcoming(userId)
            .then(episodes => reply({episodes}));
    }

}

export {UpcomingController};
