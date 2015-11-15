'use strict';

import {ShowImageJob} from "eh-domain/model/ingest/image";
import {autoInject} from 'autoinject';
import DatabaseRepo from './database.repository';
import {logger} from './lib/index';
import config from './config';
import {resize, imageDownloader} from './lib/image-downloader';

@autoInject
class ShowImageService {
    databaseRepo: DatabaseRepo;

    constructor(databaseRepo: DatabaseRepo) {
        this.databaseRepo = databaseRepo;
    }

    async getOrUpdateShowFanart(job: ShowImageJob) {
        const show = await this.databaseRepo.getShowFanartByTvdbId(job.ids.tvdbId);
        if (show === undefined) {
            logger.info(`Can't find show in database, will not download fanart`);
            return;
        } else if (show.fanart) {
            logger.info(`We have a fanart and it's fine for now`);
            return;
        }

        const from = `${config.image.tvdb.imageBaseUrl}${job.fileName}`;

        return await imageDownloader(from, config.image.savePath.show.fanart)
            .then(fanartName => this.databaseRepo.updateShowFanart(show.id, fanartName));
    }

    async getOrUpdateShowPoster(job: ShowImageJob) {
        const show = await this.databaseRepo.getShowPosterByTvdbId(job.ids.tvdbId);
        if (show === undefined) {
            logger.info(`Can't find show in database, will not download poster`);
            return;
        } else if (show.poster) {
            logger.info(`We have a poster and it's fine for now`);
            return;
        }

        const from = `${config.image.tvdb.imageBaseUrl}${job.fileName}`;

        return await resize(from, config.image.savePath.show.poster, 185, 274)
            .then(posterName => this.databaseRepo.updateShowPoster(show.id, posterName));
    }
}

export default ShowImageService;
