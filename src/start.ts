'use strict';

import './lib/polyfill';
import {dependencyInjection} from 'autoinject';
import queue from 'episodehunter-queue';
import logger from './lib/logger';
import config from './config';
import imageIngest from './episodehunter-messages/queue/image-ingest';
import EpisodeImageService from './episode-images.service';
import MovieImageService from './movie-images.service';
import ShowImageService from './show-images.service';


function addOrUpdateShowFanart(job): Promise<any> {
    const showImageService: ShowImageService = dependencyInjection(ShowImageService);
    return showImageService.getOrUpdateShowFanart(job.data);
}

function addOrUpdateShowPoster(job): Promise<any> {
    const showImageService: ShowImageService = dependencyInjection(ShowImageService);
    return showImageService.getOrUpdateShowPoster(job.data);
}

function addOrUpdateMovieFanart(job): Promise<any> {
    const movieImageService: MovieImageService = dependencyInjection(MovieImageService);
    return movieImageService.getOrUpdateMovieFanart(job.data);
}

function addOrUpdateMoviePoster(job): Promise<any> {
    const movieImageService: MovieImageService = dependencyInjection(MovieImageService);
    return movieImageService.getOrUpdateMoviePoster(job.data);
}

function addOrUpdateEpisodeImage(job): Promise<any> {
    const episodeImageService: EpisodeImageService = dependencyInjection(EpisodeImageService);
    return episodeImageService.getOrUpdateEpisodeImage(job.data);
}

function processJob(fun) {
    return (job, done) => {
        logger.debug('Getting job', job.data);
        if (!job || !job.data) {
            done(`Invalid job data: jobId: ${job.id}`);
        }

        fun(job)
            .then(result => {
                done(undefined, result);
            })
            .catch(error => {
                logger.fatal(error);
                done(error);
            });
    };
}

function main() {
    const q = queue.connect(config.redis);
    q.process(imageIngest.addOrUpdate.show.fanart, 1, processJob(addOrUpdateShowFanart));
    q.process(imageIngest.addOrUpdate.show.poster, 1, processJob(addOrUpdateShowPoster));
    q.process(imageIngest.addOrUpdate.movie.fanart, 1, processJob(addOrUpdateMovieFanart));
    q.process(imageIngest.addOrUpdate.movie.poster, 1, processJob(addOrUpdateMoviePoster));
    q.process(imageIngest.addOrUpdate.episode, 1, processJob(addOrUpdateEpisodeImage));

    logger.info('Hello friend');
}

if (require.main === module) {
    main();
}

export {
    addOrUpdateShowFanart,
    addOrUpdateShowPoster,
    addOrUpdateMovieFanart,
    addOrUpdateMoviePoster,
    addOrUpdateEpisodeImage
};
