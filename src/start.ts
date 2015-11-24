'use strict';

require('dotenv').load();
import './lib/polyfill';
import {dependencyInjection} from 'autoinject';
import {logger, queue} from './lib/index';
import MovieService from './movie.service';
import movieIngest from './episodehunter-messages/queue/movie-ingest';

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
    const q = queue.connect();
    q.process(movieIngest.add, 1, processJob(addMovie));
    q.process(movieIngest.update, 1, processJob(updateMovie));

    logger.info('Hello friend');
}

if (require.main === module) {
    main();
}

export {addMovie, updateMovie};
