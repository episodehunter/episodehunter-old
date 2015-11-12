'use strict';

import {autoInject} from 'autoinject';
import {ShowIds} from 'eh-domain/model/handler/new';
import logger from './lib/logger';
import TvDbRepository from './thetvdb/tvdb-repository';
import ShowDbReposetory from './database.repository';
import transformer from './thetvdb.transformer';


@autoInject
class ShowService {

    theTvDbRepo: TvDbRepository;
    showDbRepo: ShowDbReposetory;

    constructor(theTvDbRepo: TvDbRepository, showDbRepo: ShowDbReposetory) {
        this.theTvDbRepo = theTvDbRepo;
        this.showDbRepo = showDbRepo;
    }

    async addNewShow(ids: ShowIds): Promise<string|any[]> {
        const id = ids.tvdbId;

        if (await this.showDbRepo.serieExistWithTvdbId(id)) {
            logger.info(`Show alrady exist, the tv db: ${id}`);
            return;
        }

        return await this.theTvDbRepo.getShow(ids.tvdbId)
            .then(show => this.insertTheTvDbModelInToDb(show))
            .then(({showId, show}) => this.insertTheTvDbEpisodesInToDb({showId, show}));
    }

    insertTheTvDbModelInToDb(show) {
        return this.showDbRepo.insertNewShow(
            transformer.transformShowForDbInsert(show)
        )
        .then(showId => {
            return {showId, show}
        });
    }

    insertTheTvDbEpisodesInToDb({showId, show}) {
        const ids: ShowIds = {
            id: showId,
            tvdbId: show.id,
            imdbId: show.imdb
        };
        return this.showDbRepo.insertNewEpisodes(
            transformer.transformEpisodesForDBinsert(ids, show.episodes)
        );
    }
}

export {ShowService};
export default ShowService;
