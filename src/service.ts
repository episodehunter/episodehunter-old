'use strict';

import {autoInject} from 'autoinject';
import {ShowIds, EpisodesIds} from 'eh-domain/model/handler/new';
import logger from './lib/logger';
import TvDbRepository from './thetvdb/tvdb-repository';
import ShowDbReposetory from './database.repository';

import {TvdbShow} from './thetvdb/tvdb.model';
import queue from './lib/queue';
import imageIngestor from './episodehunter-messages/queue/image-ingestor';


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
            .then(show => this.requestImageDownload(show));
    }

    requestImageDownload(show: TvdbShow) {
        if (show.fanart) {
            queue.addToQueue(imageIngestor.addOrUpdate.show.fanart, {
                filename: show.fanart
            }, {
                attempts: 2
            });
        }

        if (show.poster) {
            queue.addToQueue(imageIngestor.addOrUpdate.show.poster, {
                filename: show.poster
            }, {
                attempts: 2
            });
        }

        show.episodes.forEach(episode => {
            if (episode.thumbnail) {
                queue.addToQueue(imageIngestor.addOrUpdate.show.episode, {
                    filename: episode.thumbnail
                }, {
                    attempts: 2
                });
            }
        });

        return true;
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
