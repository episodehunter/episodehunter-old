'use strict';

import Hapi = require('hapi');
import {autoInject} from 'autoinject';
import {UpcomingEpiosdes} from './upcoming-episodes';
import {notFound, badImplementation} from 'boom';

@autoInject
class UpcomingController {
    episodeService: UpcomingEpiosdes;

    constructor(episodeService: UpcomingEpiosdes) {
        this.episodeService = episodeService;
    }

    episodes(request: Hapi.Request, reply: Hapi.IReply) {
        let userId = request.auth.credentials.id;
        this.episodeService
            .upcoming(userId)
            .then(episodes => reply({episodes}));
    }

}

export {UpcomingController};
