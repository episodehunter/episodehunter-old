'use strict';

import {autoInject} from 'autoinject';
import {ShowIds, EpisodesIds} from 'eh-domain/model/handler/new';
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
            .getShowAndEpisode(tvdbId)
            .then(show => this.showDbRepo.insertShowWithEpisodes(show));
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

    async updateEpisode(ids: EpisodesIds) {
        const {tvdbId} = ids;

        const id = this.showDbRepo.getEpisodeIdByTvdbId(tvdbId);
        if (id === undefined) {
            logger.info(`Can't find episode with tv db id ${tvdbId} in the database`);
        }

        const newEpisode = await this.theTvDbRepo.getEpisode(tvdbId);

        // Do something
    }

}

export {ShowService};
export default ShowService;
