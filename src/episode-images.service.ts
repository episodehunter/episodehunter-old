'use strict';

import {EpisodeImageJob} from 'eh-domain/model/ingest/image';
import {autoInject} from 'autoinject';
import DatabaseRepo from './database.repository';
import {logger} from './lib/index';
import config from './config';
import {imageDownloader} from './lib/image-downloader';

@autoInject
class EpisodeImageService {
    databaseRepo: DatabaseRepo;
    downloader;

    constructor(databaseRepo: DatabaseRepo, downloader = imageDownloader) {
        this.databaseRepo = databaseRepo;
        this.downloader = downloader;
    }

    async setOrUpdateEpisodeImage(job: EpisodeImageJob) {
        const episode = await this.databaseRepo.getEpisodeImageByTvdbId(job.ids.tvdbId);
        if (episode === undefined) {
            logger.info(`Can't find episode in database, will not download image`);
            return;
        } else if (episode.image) {
            logger.info(`We have a image and it's fine for now`);
            return;
        }

        const from = `${config.image.tvdb.imageBaseUrl}${job.fileName}`;

        return await this.downloader(from, config.image.savePath.show.episode)
            .then(imageName => this.databaseRepo.updateEpisodeImage(episode.id, imageName));
    }

}

export default EpisodeImageService;
