'use strict';

import {autoInject} from 'autoinject';
import {ShowIds, EpisodesIds} from 'eh-domain/model/handler/new';
import logger from './lib/logger';
import TvDbRepository from './thetvdb/tvdb-repository';
import ShowDbReposetory from './database.repository';
import imageService from './image.service';

@autoInject
class ShowService {

    theTvDbRepo: TvDbRepository;
    showDbRepo: ShowDbReposetory;

    constructor(theTvDbRepo: TvDbRepository, showDbRepo: ShowDbReposetory) {
        this.theTvDbRepo = theTvDbRepo;
        this.showDbRepo = showDbRepo;
    }

    async addNewShow(ids: ShowIds): Promise<any> {
        const {tvdbId} = ids;

        if (await this.showDbRepo.serieExistWithTvdbId(tvdbId)) {
            logger.info(`Show alrady exist, the tv db: ${tvdbId}`);
            return;
        }

        return await this.theTvDbRepo
            .getShowAndEpisode(tvdbId)
            .then(show => this.showDbRepo.insertShowWithEpisodes(show))
            .then(imageService.requestDownload);
    }

    async updateShow(ids: ShowIds) {
        const {tvdbId} = ids;

        const id = await this.showDbRepo.getShowIdByTvdbId(tvdbId);
        if (id === undefined) {
            logger.info(`Can't find show with tv db id ${tvdbId} in the database`);
            return;
        }

        const newShow = await this.theTvDbRepo.getShow(tvdbId);

        return await this.showDbRepo.updateShow(id, newShow);
    }

    updateEpisode(ids: EpisodesIds) {
        throw new Error('Not implemented');
    }

}

export {ShowService};
export default ShowService;
