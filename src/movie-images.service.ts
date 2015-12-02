'use strict';

import {MovieImageJob} from "eh-domain/model/ingest/image";
import {autoInject} from 'autoinject';
import DatabaseRepo from './database.repository';
import {logger} from './lib/index';
import config from './config';
import theMovieDb from './lib/the-movie-database';
import {imageDownloader} from './lib/image-downloader';

const posterSize = 'w185';
const fanartSize = 'original';

@autoInject
class MovieImageService {
    databaseRepo: DatabaseRepo;
    downloader;
    theMovieDb;

    constructor(databaseRepo: DatabaseRepo, downloader = imageDownloader, movieDb = theMovieDb) {
        this.databaseRepo = databaseRepo;
        this.downloader = downloader;
        this.theMovieDb = movieDb;
    }

    async setOrUpdateMovieFanart(job: MovieImageJob) {
        const movie = await this.databaseRepo.getMovieFanartByTmdbId(job.ids.tmdbId);
        if (movie === undefined) {
            logger.info(`Can't find movie in database, will not download fanart`);
            return;
        } else if (movie.fanart) {
            logger.info(`We have a fanart and it's fine for now`);
            return;
        }

        const from = `${await this.theMovieDb.getBaseImageUrl()}${fanartSize}/${job.fileName}`;

        return await this.downloader(from, config.image.savePath.movie.fanart)
            .then(fanart => this.databaseRepo.updateMovieFanart(movie.id, fanart));
    }

    async setOrUpdateMoviePoster(job: MovieImageJob) {
        const movie = await this.databaseRepo.getMoviePosterByTmdbId(job.ids.tmdbId);
        if (movie === undefined) {
            logger.info(`Can't find movie in database, will not download poster`);
            return;
        } else if (movie.poster) {
            logger.info(`We have a poster and it's fine for now`);
            return;
        }

        const from = `${await this.theMovieDb.getBaseImageUrl()}${posterSize}/${job.fileName}`;

        return await this.downloader(from, config.image.savePath.movie.poster)
            .then(poster => this.databaseRepo.updateMoviePoster(movie.id, poster));
    }
}

export default MovieImageService;
