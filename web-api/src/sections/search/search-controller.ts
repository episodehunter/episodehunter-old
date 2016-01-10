import Hapi = require('hapi');
import {autoInject} from 'autoinject';
import {badImplementation} from 'boom';
import {SearchService} from './search-service';
import {logger} from '../../lib/logger';

@autoInject
class SearchController {
    service: SearchService;

    constructor(service: SearchService) {
        this.service = service;
    }

    search(request: Hapi.Request, reply: Hapi.IReply) {
        const term = request.params['term'];
        return this.service.search(term)
            .then(result => reply({result}))
            .catch(error => {
                logger.error(error);
                reply(badImplementation());
            });
    }

}

export {SearchController};
