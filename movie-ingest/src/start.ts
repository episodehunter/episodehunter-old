'use strict';

import queue from 'episodehunter-queue';
import {dependencyInjection} from 'autoinject';
import config from './config';
import {logger} from './lib/index';
import MovieService from './movie.service';
import movieIngest from 'messages/queue/movie-ingest';

function addMovie(job): Promise<any> {
    const movieService: MovieService = dependencyInjection(MovieService);
    return movieService.addNewMovie(job.data.ids);
}

function updateMovie(job): Promise<any> {
    const movieService: MovieService = dependencyInjection(MovieService);
    return movieService.updateMovie(job.data.ids);
}

function processJob(fun) {
    return (job, done) => {
        logger.debug('Getting job', job.data);
        if (!job || !job.data || !job.data.ids) {
            return Promise.reject(`Invalid job data: jobId: ${job.id}`);
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
    q.process(movieIngest.add, 1, processJob(addMovie));
    q.process(movieIngest.update, 1, processJob(updateMovie));

    logger.info('Hello friend');
}

if (require.main === module) {
    main();
}

export {addMovie, updateMovie};
