import Hapi = require('hapi');
import {autoInject} from 'autoinject';
import {notFound, badImplementation} from 'boom';
import {int} from '../../lib/utility/type-conversion';
import {ServiesService} from './series-service';

@autoInject
class SeriesController {
    service: ServiesService;

    constructor(service: ServiesService) {
        this.service = service;
    }

    get(request: Hapi.Request, reply: Hapi.IReply) {
        let seriesId = int(request.params['id']);
        this.service
            .getSeries(seriesId)
            .then(series => reply({series}))
            .catch(code => {
                if (code === 404) {
                    reply(notFound());
                } else {
                    reply(badImplementation());
                }
            });
    }

}

export {SeriesController};
