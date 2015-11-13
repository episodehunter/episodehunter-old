'use strict';

import {autoInject} from 'autoinject';
import {ShowIds} from 'eh-domain/model/handler/new';
import logger from './lib/logger';
import TvDbRepository from './thetvdb/tvdb-repository';
import ShowDbReposetory from './database.repository';


@autoInject
class ShowService {

    theTvDbRepo: TvDbRepository;
    showDbRepo: ShowDbReposetory;

    constructor(theTvDbRepo: TvDbRepository, showDbRepo: ShowDbReposetory) {
        this.theTvDbRepo = theTvDbRepo;
        this.showDbRepo = showDbRepo;
    }

    async addNewShow(ids: ShowIds): Promise<string|any[]> {
        const {tvdbId} = ids;

        if (await this.showDbRepo.serieExistWithTvdbId(tvdbId)) {
            logger.info(`Show alrady exist, the tv db: ${tvdbId}`);
            return;
        }

        return await this.theTvDbRepo
            .getShow(ids.tvdbId)
            .then(show => this.showDbRepo.insertShowWithEpisodes(show));
    }

}

export {ShowService};
export default ShowService;
