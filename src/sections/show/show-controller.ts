import Hapi = require('hapi');
import {autoInject} from 'autoinject';
import {notFound, badImplementation} from 'boom';
import {int} from '../../lib/utility/type-conversion';
import {ShowService} from './show-service';

@autoInject
class ShowController {
    service: ShowService;

    constructor(service: ShowService) {
        this.service = service;
    }

    get(request: Hapi.Request, reply: Hapi.IReply) {
        let showId = int(request.params['id']);
        this.service
            .getShow(showId)
            .then(show => reply({show}))
            .catch(code => {
                if (code === 404) {
                    reply(notFound());
                } else {
                    reply(badImplementation());
                }
            });
    }

}

export {ShowController};
